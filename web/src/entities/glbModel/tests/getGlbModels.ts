import GlbModelService from "@/entities/glbModel/service";
import { TestItem } from "@/shared/types/test";

export const getGlbModels: TestItem = {
  name: "GLB 모델 여러개 가져오기",
  code: async () => {
    const service = new GlbModelService();
    const res = await service.getGlbModels();
    const result = await res.json();

    console.log("GLB model lists", result);

    return result;
  },
  tester: (result) => {
    console.log("reslt", result);

    return true;
  },
};
