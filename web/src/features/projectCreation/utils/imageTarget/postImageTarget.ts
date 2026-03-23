import { createMemexFetcher } from "@rebel9/memex-fetcher";

const TOKEN = process.env.MEMEX_TOKEN ?? "";
const PROJECT_ID = process.env.MEMEX_PROJECT_ID ?? "";
const MODEL_NAME = "imageTargets";

const memexFetcher = createMemexFetcher(TOKEN);

export const postImageTarget = async (
  fileUrl: string,
  fileName: string
) => {
  const response = await memexFetcher.postItem(
    PROJECT_ID,
    MODEL_NAME,
    {
      publish: true,
      data: {
        name: { KO: fileName },
        path: fileUrl,
      },
    },
    {
      "Content-Type": "application/json",
    }
  );

  return await response.text();
};
