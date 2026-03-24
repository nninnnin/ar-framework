import { TestItem } from "@/shared/types/test";
import GlbModelService from "@/entities/glbModel/service";
import { createGlbPostBody } from "@/entities/glbModel/utils/formatter";
import { validateGlbModelItemFormatted } from "@/entities/glbModel/utils/validator";

export const removeGlbModel: TestItem = {
  name: "GLB 모델 삭제하기",
  input: {
    paramKey: "glbModelUid",
    placeholder: "uid를 입력해주세요",
  },
  code: async ({ glbModelUid }) => {
    const service = new GlbModelService();
    const glbItem = validateGlbModelItemFormatted(
      await service.getGlbModel(glbModelUid),
    );

    const updateRes = await service.updateGlbModel(
      glbModelUid,
      {
        ...createGlbPostBody(glbItem),
        isDeleted: "true",
      },
    );

    console.log("Update Response", updateRes);

    return updateRes.ok;
  },
  tester: (result) => {
    console.log("test result: ", result);
    return true;
  },
};
