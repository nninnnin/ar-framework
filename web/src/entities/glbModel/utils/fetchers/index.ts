import {
  MediaUploadResult,
  UpdateBody,
} from "@/shared/types";

import { createMemexFetcher } from "@rebel9/memex-fetcher";

const TOKEN = process.env.MEMEX_TOKEN ?? "";
const PROJECT_ID = process.env.MEMEX_PROJECT_ID ?? "";
const MODEL_NAME = "glbModels";

const memexFetcher = createMemexFetcher(TOKEN);

export const uploadGlbModels = (
  models: Array<File>
) => {
  return Promise.all(
    models.map(async (file) => {
      return await memexFetcher.postMedia(
        PROJECT_ID,
        file
      );
    })
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
  uploadedResult: MediaUploadResult[]
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
              KO: item.value,
            },
            mediaPath: item.file.path,
            isDeleted: "false",
            visibility: "true",
            latitude: "",
            longitude: "",
            scale: "",
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
