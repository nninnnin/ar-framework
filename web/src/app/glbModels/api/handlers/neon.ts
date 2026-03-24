import { NextResponse } from "next/server";
import { generateUid } from "@/shared/utils/generateUid";

import { getSearchParam } from "@/features/project/utils/index";
import {
  findAllGlbModels,
  findGlbModelById,
  createGlbModel,
  updateGlbModel,
} from "./queries/index";
import { toGlbModelValues } from "./transform";

const CORS_HEADERS = {
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods":
    "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  "Access-Control-Allow-Headers":
    "X-CSRF-Token, X-Requested-With, Accept, Content-Type, Authorization",
};

function toFormatted(
  row: Awaited<ReturnType<typeof findGlbModelById>>,
) {
  if (!row) return null;
  return {
    uid: row.uid,
    name: row.name?.KO ?? null,
    mediaPath: row.mediaPath,
    isDeleted: row.isDeleted,
    latitude: row.latitude,
    longitude: row.longitude,
    scale: row.scale,
    rotation: row.rotation,
    position: row.position,
    interactions: row.interactions,
    visibility: row.visibility,
  };
}

const corsJson = (data: unknown) =>
  new NextResponse(JSON.stringify(data), {
    status: 200,
    headers: CORS_HEADERS,
  });

export async function GET(request: Request) {
  const glbModelId = getSearchParam(
    request,
    "glbModelId",
  );

  if (glbModelId) {
    const row = await findGlbModelById(glbModelId);
    if (!row)
      return new Response("Not found", {
        status: 404,
      });
    return corsJson(toFormatted(row));
  }

  const rows = await findAllGlbModels();
  return corsJson(rows.map(toFormatted));
}

export async function POST(request: Request) {
  const { data } = await request.json();
  const uid = generateUid();

  await createGlbModel({
    uid,
    createdAt: new Date().toISOString(),
    ...toGlbModelValues(data),
    isDeleted: false,
    visibility: true,
  });

  return new Response(uid, { status: 201 });
}

export async function PUT(request: Request) {
  const glbModelId = getSearchParam(
    request,
    "glbModelId",
  );
  if (!glbModelId)
    return new Response("glbModelId is required", {
      status: 400,
    });

  const { data } = await request.json();
  await updateGlbModel(glbModelId, {
    ...toGlbModelValues(data),
    updatedAt: new Date().toISOString(),
  });
  return corsJson({ uid: glbModelId });
}
