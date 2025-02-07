import { createMemexFetcher } from "@rebel9/memex-fetcher";
const memexFetcher = createMemexFetcher(process.env.MEMEX_TOKEN ?? "");

export const getProjectItem = async (projectItemUid: string) => {
  const res = await memexFetcher.getItem(
    process.env.MEMEX_PROJECT_ID ?? "",
    "arProjects",
    projectItemUid
  );

  return await res.json();
};
