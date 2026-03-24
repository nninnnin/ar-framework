import { z } from "zod";
import { TestItem } from "@/shared/types/test";
import { getImageTargetItem } from "@/entities/imageTarget/utils/getImageTarget";

const ImageTargetFormattedSchema = z.object({
  uid: z.string().min(1),
  name: z.string(),
  path: z.string(),
  isDeleted: z.boolean(),
});

export const getImageTarget: TestItem = {
  name: "이미지 타겟 가져오기",
  input: {
    paramKey: "imageTargetUid",
    placeholder: "uid를 입력하세요",
  },
  code: async ({ imageTargetUid }) => {
    return getImageTargetItem(imageTargetUid);
  },
  tester: (result) => {
    ImageTargetFormattedSchema.parse(result);
    return true;
  },
};
