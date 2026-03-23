import { createMemexFetcher } from "@rebel9/memex-fetcher";

import { UpdateBody } from "@/shared/types";
import { uploadToS3 } from "@/shared/utils/uploadToS3";

const TOKEN = process.env.MEMEX_TOKEN ?? "";
const PROJECT_ID = process.env.MEMEX_PROJECT_ID ?? "";
const MODEL_NAME = "glbModels";

const memexFetcher = createMemexFetcher(TOKEN);

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
  return await memexFetcher.getItem(
    PROJECT_ID,
    MODEL_NAME,
    uid
  );
};

export const getGlbModels = async () => {
  return await memexFetcher.getList(
    PROJECT_ID,
    MODEL_NAME,
    {
      page: 0,
      size: 1000,
      searchConds: [
        {
          componentType: "BOOLEAN",
          devKey: "isDeleted",
          condition: "{ value: false }",
        },
      ],
    }
  );
};

export const postGlbModels = async (
  uploadedResult: GlbModelUploadResult[]
) => {
  return Promise.all(
    uploadedResult.map(async (item) => {
      const res = await memexFetcher.postItem(
        PROJECT_ID,
        MODEL_NAME,
        {
          publish: true,
          data: {
            name: {
              KO: item.name,
            },
            mediaPath: item.url,
            isDeleted: "false",
            visibility: "true",
            latitude: "",
            longitude: "",
            scale: JSON.stringify({ x: 1, y: 1, z: 1 }),
            position: "",
            rotation: "",
            interactions: "",
          },
        },
        {
          "Content-Type": "application/json",
        }
      );

      return await res.text();
    })
  );
};

export const updateGlbModel = async (
  body: UpdateBody
) => {
  return await memexFetcher.updateItem(
    PROJECT_ID,
    MODEL_NAME,
    body
  );
};
