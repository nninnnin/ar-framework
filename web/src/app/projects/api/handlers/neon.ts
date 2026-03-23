import { getSearchParam } from "@/features/project/utils/index";
import { generateUid } from "@/shared/utils/generateUid";
import { formatProjectItem } from "@/entities/project/utils/formatters";
import { rowToProject } from "@/entities/project/utils/rowMappers";
import {
  findProjectById,
  findProjectsByGroup,
  createProject,
  updateProject,
} from "./queries/index";
import { toProjectValues } from "./transform";

export async function GET(request: Request) {
  const projectId = getSearchParam(
    request,
    "projectId",
  );

  if (projectId) {
    const row = await findProjectById(projectId);
    if (!row)
      return new Response("Not found", {
        status: 404,
      });
    return Response.json(
      formatProjectItem(rowToProject(row)),
    );
  }

  const groupName = getSearchParam(
    request,
    "groupName",
  );
  if (!groupName)
    return new Response("groupName is required", {
      status: 400,
    });

  const rows = await findProjectsByGroup(groupName);
  return Response.json(
    rows.map((row) =>
      formatProjectItem(rowToProject(row)),
    ),
  );
}

export async function POST(request: Request) {
  const { data } = await request.json();
  const uid = generateUid();
  const values = await toProjectValues(data);

  await createProject({
    uid,
    createdAt: new Date().toISOString(),
    ...values,
  });
  return new Response(uid, { status: 201 });
}

export async function PUT(request: Request) {
  const { uid, data } = await request.json();
  if (!uid)
    return new Response("uid is required", {
      status: 400,
    });

  const values = await toProjectValues(data);
  await updateProject(uid, {
    ...values,
    updatedAt: new Date().toISOString(),
  });
  return Response.json({ uid });
}
