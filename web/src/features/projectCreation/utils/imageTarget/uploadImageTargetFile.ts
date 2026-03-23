import { uploadToS3 } from "@/shared/utils/uploadToS3";

export const uploadImageTargetFile = async (
  file: File | undefined
): Promise<string> => {
  if (!file) {
    throw new Error(
      "업로드 에러: 마커파일이 존재하지 않습니다."
    );
  }

  return uploadToS3(file);
};
