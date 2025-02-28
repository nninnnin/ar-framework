import { ProjectBody } from "@/features/project/types/project";

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
