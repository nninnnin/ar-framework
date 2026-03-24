import { TestItem } from "@/shared/types/test";
import { removeImageTarget } from "@/entities/imageTarget/utils/removeImageTarget";

export const removeImageTargetTest: TestItem = {
  name: "이미지 타겟 삭제하기",
  input: {
    paramKey: "imageTargetUid",
    placeholder: "uid를 입력하세요",
  },
  code: async ({ imageTargetUid }) => {
    const res = await removeImageTarget(imageTargetUid);
    return res.ok;
  },
  tester: (result) => {
    return result === true;
  },
};
