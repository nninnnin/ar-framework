import { findImageTargetById } from "@/app/imageTargets/api/handlers/queries";

export const getTargetImage = async (targetImageUid: string) => {
  return findImageTargetById(targetImageUid);
};
