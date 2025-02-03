import { createMemexFetcher } from "@rebel9/memex-fetcher";

const memexFetcher = createMemexFetcher(process.env.MEMEX_TOKEN ?? "");

export const createGroup = async (groupName: string) => {
  return await memexFetcher.postItem(
    process.env.MEMEX_PROJECT_ID ?? "",
    "projectGroups",
    {
      publish: true,
      data: {
        name: {
          KO: groupName,
        },
        projects: [],
      },
    }
  );
};

export const getGroups = async () => {
  return await memexFetcher.getList(
    process.env.MEMEX_PROJECT_ID ?? "",
    "projectGroups",
    {
      page: 0,
      size: 1000,
    }
  );
};
