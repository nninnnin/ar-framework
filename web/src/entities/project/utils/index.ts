import { ProjectBody } from "@/features/project/types/project";

export const createProjectBody = (
  projectName: string,
  projectTypeId: number,
  postedModelIds: string[],
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
