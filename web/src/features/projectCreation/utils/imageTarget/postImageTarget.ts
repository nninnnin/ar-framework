import { MediaUploadResult } from "@/shared/types";
import { createMemexFetcher } from "@rebel9/memex-fetcher";

const TOKEN = process.env.MEMEX_TOKEN ?? "";
const PROJECT_ID = process.env.MEMEX_PROJECT_ID ?? "";
const MODEL_NAME = "imageTargets";

const memexFetcher = createMemexFetcher(TOKEN);

export const postImageTarget = async (
  mediaUploadResult: MediaUploadResult
) => {
  const name = {
    KO: mediaUploadResult.file.name,
  };
  const path = mediaUploadResult.file.path;

  const response = await memexFetcher.postItem(
    PROJECT_ID,
    MODEL_NAME,
    {
      publish: true,
      data: {
        name,
        path,
      },
    },
    {
      "Content-Type": "application/json",
    }
  );

  return await response.text();
};
