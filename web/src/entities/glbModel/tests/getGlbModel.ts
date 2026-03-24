import GlbModelService from "@/entities/glbModel/service";
import { validateGlbModelItemFormatted } from "@/entities/glbModel/utils/validator";
import { TestItem } from "@/shared/types/test";

export const getGlbModel: TestItem = {
  name: "GLB 모델 가져오기",
  input: {
    paramKey: "glbModelUid",
    placeholder: "uid를 입력하세요",
  },
  code: async ({ glbModelUid }) => {
    const service = new GlbModelService();
    const result = await service.getGlbModel(glbModelUid);
    return validateGlbModelItemFormatted(result);
  },
  tester: (result) => {
    console.log("test result", result);
    return true;
  },
};
