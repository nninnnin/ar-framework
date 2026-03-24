import { TestItem } from "@/shared/types/test";
import GlbModelService from "@/entities/glbModel/service";
import { validateGlbModelListFormatted } from "@/entities/glbModel/utils/validator";

export const getGlbModels: TestItem = {
  name: "GLB 모델 리스트 가져오기",
  code: async () => {
    const service = new GlbModelService();
    const result = await service.getGlbModels();
    return validateGlbModelListFormatted(result);
  },
  tester: (result) => {
    console.log("test result: ", result);
    return true;
  },
};
