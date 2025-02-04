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

export const createProject = async (projectName: string) => {
  return await memexFetcher.postItem(
    process.env.MEMEX_PROJECT_ID ?? "",
    "arProjects",
    {
      publish: true,
      data: {
        name: {
          KO: projectName,
        },
        glbModels: [],
      },
    }
  );
};

export const getProjects = async () => {
  return await memexFetcher.getList(
    process.env.MEMEX_PROJECT_ID ?? "",
    "arProjects",
    {
      page: 0,
      size: 1000,
    }
  );
};

export const getProjectTypes = async () => {
  return await memexFetcher.getCategories(
    process.env.MEMEX_PROJECT_ID ?? "",
    "arProjects"
  );
};
