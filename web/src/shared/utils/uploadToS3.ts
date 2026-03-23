type PresignedUpload = {
  presignedUrl: string;
  key: string;
  fileUrl: string;
};

const getPresignedUpload = async (
  fileName: string,
  contentType: string,
): Promise<PresignedUpload> => {
  const res = await fetch("/upload/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fileName, contentType }),
  });
  return res.json();
};

const uploadFileWithPresignedUrl = async (
  presignedUrl: string,
  file: File,
): Promise<void> => {
  await fetch(presignedUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });
};

export const uploadToS3 = async (
  file: File,
): Promise<string> => {
  const { presignedUrl, fileUrl } =
    await getPresignedUpload(file.name, file.type);
  await uploadFileWithPresignedUrl(presignedUrl, file);
  return fileUrl;
};
