import { z } from "zod";
import { pipe } from "@rebel9/memex-fetcher";

import GlbModelService from "@/entities/glbModel/service";
import { formatGLBModelItems } from "@/entities/glbModel/utils/formatter";
import { TestItem } from "@/shared/types/test";
import { GlbModelItemFormatted } from "@/entities/glbModel/types";

const GlbModelItemFormattedValidator = z.object({
  uid: z.string(),
  name: z.string(),
  mediaPath: z.string(),
  isDeleted: z.boolean(),
});

const validateGlbModelItemFormatted = (
  formattedGlbModelItems: GlbModelItemFormatted[]
) => {
  return z
    .array(GlbModelItemFormattedValidator)
    .parse(formattedGlbModelItems);
};

export const getGlbModels: TestItem = {
  name: "GLB 모델 리스트 가져오기",
  code: async () => {
    const service = new GlbModelService();
    const res = await service.getGlbModels();
    const result = await res.json();

    return pipe(
      result,
      formatGLBModelItems,
      validateGlbModelItemFormatted
    );
  },
  tester: (result) => {
    console.log("test result: ", result);

    return true;
  },
};
