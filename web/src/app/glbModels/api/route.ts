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

export async function GET(request: Request) {
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

    return Response.json(formatted);
  }

  // 여러개
  const res = await glbModelService.getGlbModels();
  const result = await res.json();

  const formatted = pipe(
    result,
    formatGLBModelItems,
    validateGlbModelListFormatted
  );

  return Response.json(formatted);
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
