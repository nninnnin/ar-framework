import { FormattedCategory } from "@/types";

export const isGLBFile = (file: File) => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      const bytes = new Uint8Array(
        event.target?.result as ArrayBuffer
      );
      const signature = new TextDecoder().decode(
        bytes.slice(0, 4)
      );

      resolve(signature === "glTF");
    };

    reader.readAsArrayBuffer(file.slice(0, 4));
  });
};

export type ProjectBody = {
  publish: boolean;
  data: {
    name: {
      KO: string;
    };
    projectType: number[];
    glbModels: number[];
    groupName: string[];
  };
};

export const createProjectBody = (
  projectName: string,
  projectTypeId: number,
  postedModelIds: number[],
  groupId: string
): ProjectBody => {
  return {
    publish: true,
    data: {
      name: {
        KO: projectName,
      },
      projectType: [projectTypeId],
      glbModels: postedModelIds,
      groupName: [groupId],
    },
  };
};

export const getProjectTypeId = (
  projectTypeName: string,
  projectTypes: FormattedCategory[] | undefined
) => {
  if (!projectTypes) return;

  const projectType = projectTypes.find(
    (item) => item.name === projectTypeName
  );

  return projectType?.id;
};
