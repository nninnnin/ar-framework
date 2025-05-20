import { createMemexFetcher } from "@rebel9/memex-fetcher";

import { UpdateBody } from "@/shared/types";

const memexFetcher = createMemexFetcher(
  process.env.MEMEX_TOKEN ?? ""
);

export const updateImageTarget = async (
  body: UpdateBody
) => {
  return await memexFetcher.updateItem(
    process.env.MEMEX_PROJECT_ID ?? "",
    "imageTargets",
    body
  );
};
