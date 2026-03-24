import { z } from "zod";
import { TestItem } from "@/shared/types/test";
import { getImageTargets } from "@/entities/imageTarget/utils/getImageTargets";

const ImageTargetFormattedSchema = z.object({
  uid: z.string().min(1),
  name: z.string(),
  path: z.string(),
  isDeleted: z.boolean(),
});

export const getImageTargetList: TestItem = {
  name: "이미지 타겟 리스트 가져오기",
  code: async () => {
    return getImageTargets();
  },
  tester: (result) => {
    z.array(ImageTargetFormattedSchema).parse(result);
    return true;
  },
};
