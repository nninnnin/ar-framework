import { createMemexFetcher } from "@rebel9/memex-fetcher";

import {
  Project,
  ProjectBody,
} from "@/features/project/types/project";
import { ProjectFilter } from "@/entities/project/types";
import { UpdateBody } from "@/shared/types";

const memexFetcher = createMemexFetcher(
  process.env.MEMEX_TOKEN ?? ""
);

export const getProjectItem = async (
  projectItemUid: string
): Promise<Project> => {
  const res = await memexFetcher.getItem(
    process.env.MEMEX_PROJECT_ID ?? "",
    "arProjects",
    projectItemUid
  );

  const result = await res.json();

  return result;
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

export const getProjects = async (
  filter: ProjectFilter
) => {
  return await memexFetcher.getList(
    process.env.MEMEX_PROJECT_ID ?? "",
    "arProjects",
    {
      page: 0,
      size: 1000,
      searchConds: filter.groupName
        ? [
            {
              componentType: "RELATION",
              devKey: "groupName",
              condition: `{ "type": "SAME", "language": "KO", "keyword": "${decodeURIComponent(
                filter.groupName
              )}" }`,
            },
          ]
        : filter.templateId
        ? [
            {
              componentType: "SINGLE_LINE_TEXT_MONO",
              devKey: "templateId",
              condition: `{ "type": "SAME", "keyword": "${decodeURIComponent(
                filter.templateId
              )}" }`,
            },
          ]
        : [],
    }
  );
};

export const getProjectTypes = async () => {
  return await memexFetcher.getCategories(
    process.env.MEMEX_PROJECT_ID ?? "",
    "arProjects"
  );
};

export const updateProject = async (
  body: UpdateBody
) => {
  return await memexFetcher.updateItem(
    process.env.MEMEX_PROJECT_ID ?? "",
    "arProjects",
    body
  );
};
