import { updateImageTarget } from "@/entities/imageTarget/utils/updateImageTarget";

export const removeImageTarget = async (imageTargetUid: string) => {
  return updateImageTarget({
    uid: imageTargetUid,
    publish: true,
    data: { isDeleted: true },
  });
};
