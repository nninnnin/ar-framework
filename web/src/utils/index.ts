import { MediaUploadResult } from "@/types";

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

export const createProject = async (
  projectName: string,
  projectTypeId: number,
  postedModelIds: number[]
) => {
  return await memexFetcher.postItem(
    process.env.MEMEX_PROJECT_ID ?? "",
    "arProjects",
    {
      publish: true,
      data: {
        name: {
          KO: projectName,
        },
        projectType: [projectTypeId],
        glbModels: postedModelIds,
      },
    }
  );
};

export const getProjects = async (filter: { groupName: string }) => {
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

export const isGLBFile = (file: File) => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      const bytes = new Uint8Array(event.target?.result as ArrayBuffer);
      const signature = new TextDecoder().decode(bytes.slice(0, 4));

      resolve(signature === "glTF");
    };

    reader.readAsArrayBuffer(file.slice(0, 4));
  });
};

export const uploadGlbModels = (models: Array<File>) => {
  return Promise.all(
    models.map(async (file) => {
      return await memexFetcher.postMedia(
        process.env.MEMEX_PROJECT_ID ?? "",
        file
      );
    })
  );
};

export const postGlbModels = async (uploadedResult: MediaUploadResult[]) => {
  return Promise.all(
    uploadedResult.map(async (item) => {
      const res = await memexFetcher.postItem(
        process.env.MEMEX_PROJECT_ID ?? "",
        "glbModels",
        {
          publish: true,
          data: {
            name: {
              KO: item.value,
            },
            mediaPath: item.file.path,
          },
        },
        {
          "Content-Type": "application/json",
        }
      );

      return await res.text();
    })
  );
};
