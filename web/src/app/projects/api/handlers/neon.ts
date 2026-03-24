import { getSearchParam } from "@/features/project/utils/index";
import { generateUid } from "@/shared/utils/generateUid";
import { arProjects } from "@/shared/lib/schema";
import { ProjectFormatted } from "@/features/project/types/project";
import {
  findProjectById,
  findProjectsByGroup,
  createProject,
  updateProject,
} from "./queries/index";
import { toProjectValues } from "./transform";

type ProjectRow = typeof arProjects.$inferSelect;

function rowToFormatted(row: ProjectRow): ProjectFormatted {
  const projectType = row.projectType?.[0];
  const groupName = row.groupName?.[0];
  const glbModels = row.glbModels ?? [];
  const imageTarget = row.imageTarget;

  return {
    uid: row.uid,
    name: row.name?.KO ?? "",
    projectType: {
      id: projectType?._id ?? 0,
      name: projectType?.languageMap?.KO ?? "",
    },
    groupName: {
      id: groupName?.uid ?? "",
      name: groupName?.languageMap?.KO ?? "",
    },
    glbModels: glbModels.map((m) => ({
      uid: m.uid,
      name: m.languageMap?.KO ?? "",
    })),
    imageTarget: imageTarget?.map((t) => ({
      uid: t.uid,
      name: t.languageMap?.KO ?? "",
    })),
    isDeleted: row.isDeleted ?? false,
    templateId: row.templateId ?? "",
    isLocked: row.isLocked ?? false,
  };
}

export async function GET(request: Request) {
  const projectId = getSearchParam(request, "projectId");

  if (projectId) {
    const row = await findProjectById(projectId);
    if (!row)
      return new Response("Not found", { status: 404 });
    return Response.json(rowToFormatted(row));
  }

  const groupName = getSearchParam(request, "groupName");
  if (!groupName)
    return new Response("groupName is required", { status: 400 });

  const rows = await findProjectsByGroup(groupName);
  return Response.json(rows.map(rowToFormatted));
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
