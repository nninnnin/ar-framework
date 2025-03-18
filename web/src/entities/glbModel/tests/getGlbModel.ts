import GlbModelService from "@/entities/glbModel/service";
import { formatGLBModelItem } from "@/entities/glbModel/utils/formatter";
import { validateGlbModelItemFormatted } from "@/entities/glbModel/utils/validator";
import { TestItem } from "@/shared/types/test";
import { pipe } from "@rebel9/memex-fetcher";

export const getGlbModel: TestItem = {
  name: "GLB 모델 가져오기",
  input: {
    paramKey: "glbModelUid",
    placeholder: "uid를 입력하세요",
  },
  code: async ({ glbModelUid }) => {
    const service = new GlbModelService();

    const res = await service.getGlbModel(glbModelUid);
    const result = await res.json();

    return pipe(
      result,
      formatGLBModelItem,
      validateGlbModelItemFormatted
    );
  },
  tester: (result) => {
    console.log("test result", result);

    return true;
  },
};
