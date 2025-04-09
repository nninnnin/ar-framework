import { pipe } from "@rebel9/memex-fetcher";

import GlbModelService from "@/entities/glbModel/service";
import { getSearchParam } from "@/features/project/utils/index";
import {
  formatGLBModelItem,
  formatGLBModelItems,
} from "@/entities/glbModel/utils/formatter";
import {
  validateGlbModelItemFormatted,
  validateGlbModelListFormatted,
} from "@/entities/glbModel/utils/validator";

const glbModelService = new GlbModelService();

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const response = NextResponse.json(
    {},
    {
      status: 200,
    }
  );

  response.headers.set(
    "Access-Control-Allow-Credentials",
    "true"
  );
  response.headers.set(
    "Access-Control-Allow-Origin",
    "*"
  );
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Content-Type, Authorization"
  );

  const glbModelId = getSearchParam(
    request,
    "glbModelId"
  );

  // 한개만
  if (glbModelId) {
    const res = await glbModelService.getGlbModel(
      glbModelId
    );

    const result = await res.json();

    const formatted = pipe(
      result,
      formatGLBModelItem,
      validateGlbModelItemFormatted
    );

    return new NextResponse(
      JSON.stringify(formatted),
      {
        status: 200,
        headers: response.headers,
      }
    );
  }

  // 여러개
  const res = await glbModelService.getGlbModels();
  const result = await res.json();

  const formatted = pipe(
    result,
    formatGLBModelItems,
    validateGlbModelListFormatted
  );

  return new NextResponse(JSON.stringify(formatted), {
    status: 200,
    headers: response.headers,
  });
}

export async function PUT(request: Request) {
  const glbModelId = getSearchParam(
    request,
    "glbModelId"
  );

  if (!glbModelId) {
    throw new Error("GlbModel id is required");
  }

  const body = await request.json();

  const res = await glbModelService.updateGlbModel(
    glbModelId,
    body
  );

  return Response.json(res);
}
