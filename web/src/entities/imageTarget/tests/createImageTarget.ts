import { z } from "zod";
import { TestItem } from "@/shared/types/test";
import { createImageTarget } from "@/entities/imageTarget/utils/createImageTarget";
import { removeImageTarget } from "@/entities/imageTarget/utils/removeImageTarget";

export const createImageTargetTest: TestItem = {
  name: "이미지 타겟 생성하기",
  input: {
    paramKey: "imageTargetName",
    placeholder: "이름을 입력하세요",
  },
  code: async ({ imageTargetName }) => {
    return createImageTarget(imageTargetName, "");
  },
  tester: (result) => {
    return z.string().min(1).safeParse(result).success;
  },
  cleanup: async (uid) => {
    await removeImageTarget(uid);
  },
};
