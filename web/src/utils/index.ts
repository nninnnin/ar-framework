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
