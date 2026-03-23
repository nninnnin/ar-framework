import { UpdateBody } from "@/shared/types";
import { uploadToS3 } from "@/shared/utils/uploadToS3";

const BASE_URL = () =>
  `${process.env.NEXT_URL}/glbModels/api`;

export type GlbModelUploadResult = {
  url: string;
  name: string;
};

export const uploadGlbModels = (
  models: Array<File>
): Promise<GlbModelUploadResult[]> => {
  return Promise.all(
    models.map(async (file) => ({
      url: await uploadToS3(file),
      name: file.name,
    }))
  );
};

export const getGlbModel = async (uid: string) => {
  const res = await fetch(
    `${BASE_URL()}?glbModelId=${uid}`
  );
  return res.json();
};

export const getGlbModels = async () => {
  const res = await fetch(BASE_URL());
  return res.json();
};

export const postGlbModels = async (
  uploadedResult: GlbModelUploadResult[]
) => {
  return Promise.all(
    uploadedResult.map(async (item) => {
      const res = await fetch(BASE_URL(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            name: { KO: item.name },
            mediaPath: item.url,
          },
        }),
      });
      return res.text();
    })
  );
};

export const updateGlbModel = async (body: UpdateBody) => {
  return fetch(
    `${BASE_URL()}?glbModelId=${body.uid}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );
};
