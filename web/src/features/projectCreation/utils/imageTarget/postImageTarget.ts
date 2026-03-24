import { createImageTarget } from "@/entities/imageTarget/utils/createImageTarget";

export const postImageTarget = async (
  fileUrl: string,
  fileName: string
) => {
  return createImageTarget(fileName, fileUrl);
};
