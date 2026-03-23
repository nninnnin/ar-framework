import { NextResponse } from "next/server";
import { pipe } from "@rebel9/memex-fetcher";

import GlbModelService from "@/entities/glbModel/service";
import { getSearchParam } from "@/features/project/utils/index";
import { formatGLBModelItem, formatGLBModelItems } from "@/entities/glbModel/utils/formatter";
import {
  validateGlbModelItemFormatted,
  validateGlbModelListFormatted,
} from "@/entities/glbModel/utils/validator";

// ─── Constants ───────────────────────────────────────────────────────────────

const CORS_HEADERS = {
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  "Access-Control-Allow-Headers":
    "X-CSRF-Token, X-Requested-With, Accept, Content-Type, Authorization",
};

// ─── Service ──────────────────────────────────────────────────────────────────

const glbModelService = new GlbModelService();

// ─── HTTP Handlers ────────────────────────────────────────────────────────────

export async function GET(request: Request) {
  const glbModelId = getSearchParam(request, "glbModelId");

  if (glbModelId) {
    const res = await glbModelService.getGlbModel(glbModelId);
    const result = await res.json();
    const formatted = pipe(result, formatGLBModelItem, validateGlbModelItemFormatted);
    return new NextResponse(JSON.stringify(formatted), { status: 200, headers: CORS_HEADERS });
  }

  const res = await glbModelService.getGlbModels();
  const result = await res.json();
  const formatted = pipe(result, formatGLBModelItems, validateGlbModelListFormatted);
  return new NextResponse(JSON.stringify(formatted), { status: 200, headers: CORS_HEADERS });
}

export async function PUT(request: Request) {
  const glbModelId = getSearchParam(request, "glbModelId");
  if (!glbModelId) throw new Error("GlbModel id is required");

  const body = await request.json();
  const res = await glbModelService.updateGlbModel(glbModelId, body);
  return Response.json(res);
}