import { createMemexFetcher } from "@rebel9/memex-fetcher";

const TOKEN = process.env.MEMEX_TOKEN ?? "";
const PROJECT_ID = process.env.MEMEX_PROJECT_ID ?? "";

const memexFetcher = createMemexFetcher(TOKEN);

export const getImageTargetItem = async (
  uid: string
) => {
  return await memexFetcher.getItem(
    PROJECT_ID,
    "imageTargets",
    uid
  );
};
