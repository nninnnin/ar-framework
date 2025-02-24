import { MediaUploadResult } from "@/types";

import { createMemexFetcher } from "@rebel9/memex-fetcher";

const memexFetcher = createMemexFetcher(
  process.env.MEMEX_TOKEN ?? ""
);

export const uploadGlbModels = (
  models: Array<File>
) => {
  return Promise.all(
    models.map(async (file) => {
      return await memexFetcher.postMedia(
        process.env.MEMEX_PROJECT_ID ?? "",
        file
      );
    })
  );
};

export const postGlbModels = async (
  uploadedResult: MediaUploadResult[]
) => {
  return Promise.all(
    uploadedResult.map(async (item) => {
      const res = await memexFetcher.postItem(
        process.env.MEMEX_PROJECT_ID ?? "",
        "glbModels",
        {
          publish: true,
          data: {
            name: {
              KO: item.value,
            },
            mediaPath: item.file.path,
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
