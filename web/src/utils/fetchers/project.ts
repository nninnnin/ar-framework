import { ProjectBody } from "@/utils";
import { createMemexFetcher } from "@rebel9/memex-fetcher";
const memexFetcher = createMemexFetcher(
  process.env.MEMEX_TOKEN ?? ""
);

export const getProjectItem = async (
  projectItemUid: string
) => {
  const res = await memexFetcher.getItem(
    process.env.MEMEX_PROJECT_ID ?? "",
    "arProjects",
    projectItemUid
  );

  return await res.json();
};

export const createProject = async (
  projectBody: ProjectBody
) => {
  return await memexFetcher.postItem(
    process.env.MEMEX_PROJECT_ID ?? "",
    "arProjects",
    projectBody
  );
};

export const getProjects = async (filter: {
  groupName: string;
}) => {
  return await memexFetcher.getList(
    process.env.MEMEX_PROJECT_ID ?? "",
    "arProjects",
    {
      page: 0,
      size: 1000,
      searchConds: [
        {
          componentType: "RELATION",
          devKey: "groupName",
          condition: `{ "type": "SAME", "language": "KO", "keyword": "${filter.groupName}" }`,
        },
      ],
    }
  );
};

export const getProjectTypes = async () => {
  return await memexFetcher.getCategories(
    process.env.MEMEX_PROJECT_ID ?? "",
    "arProjects"
  );
};

export const updateProject = async (updateBody: {
  uid: string;
  publish: boolean;
  data: unknown;
}) => {
  return await memexFetcher.updateItem(
    process.env.MEMEX_PROJECT_ID ?? "",
    "arProjects",
    { ...updateBody }
  );
};
