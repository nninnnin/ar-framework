import { pipe } from "@rebel9/memex-fetcher";

import { TestItem } from "@/shared/types/test";
import GlbModelService from "@/entities/glbModel/service";
import { formatGLBModelItems } from "@/entities/glbModel/utils/formatter";
import { validateGlbModelListFormatted } from "@/entities/glbModel/utils/validator";

export const getGlbModels: TestItem = {
  name: "GLB 모델 리스트 가져오기",
  code: async () => {
    const service = new GlbModelService();
    const res = await service.getGlbModels();
    const result = await res.json();

    return pipe(
      result,
      formatGLBModelItems,
      validateGlbModelListFormatted
    );
  },
  tester: (result) => {
    console.log("test result: ", result);

    return true;
  },
};
