import { createMemexFetcher } from "@rebel9/memex-fetcher";

const memexFetcher = createMemexFetcher(process.env.MEMEX_TOKEN ?? "");

export const createGroup = async (groupName: string) => {
  return await memexFetcher.postItem("a5154341", "groups", {
    publish: true,
    data: {
      groupName: {
        KO: groupName,
      },
      projects: [],
    },
  });
};
