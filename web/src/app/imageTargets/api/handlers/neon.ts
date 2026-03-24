import { generateUid } from "@/shared/utils/generateUid";
import { getSearchParam } from "@/features/project/utils/index";
import {
  findAllImageTargets,
  findImageTargetById,
  createImageTarget,
  updateImageTarget,
} from "./queries/index";

export async function GET(request: Request) {
  const imageTargetId = getSearchParam(request, "imageTargetId");

  if (!imageTargetId) {
    const rows = await findAllImageTargets();
    return Response.json(rows);
  }

  const row = await findImageTargetById(imageTargetId);
  if (!row)
    return new Response("Not found", { status: 404 });

  return Response.json(row);
}

export async function POST(request: Request) {
  const { name, path } = await request.json();
  const uid = generateUid();

  await createImageTarget({
    uid,
    createdAt: new Date().toISOString(),
    name: { KO: name },
    path,
    isDeleted: false,
  });

  return new Response(uid, { status: 201 });
}

export async function PUT(request: Request) {
  const imageTargetId = getSearchParam(request, "imageTargetId");
  if (!imageTargetId)
    return new Response("imageTargetId is required", { status: 400 });

  const { data } = await request.json();
  await updateImageTarget(imageTargetId, {
    ...data,
    updatedAt: new Date().toISOString(),
  });

  return Response.json({ uid: imageTargetId });
}
