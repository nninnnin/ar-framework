import {
  createMemexFetcher,
  pipe,
  pluckData,
} from "@rebel9/memex-fetcher";

const TOKEN = process.env.MEMEX_TOKEN ?? "";
const PROJECT_ID = process.env.MEMEX_PROJECT_ID ?? "";
const MODEL_ID = "imageTargets";

const memexFetcher = createMemexFetcher(TOKEN);

export const getTargetImage = async (
  targetImageUid: string
) => {
  const response = await memexFetcher.getItem(
    PROJECT_ID,
    MODEL_ID,
    targetImageUid
  );

  const result = await response.json();

  return pipe(result, pluckData);
};
