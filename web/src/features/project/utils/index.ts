import { ProjectBody } from "@/features/project/types/project";
import { FormattedCategory } from "@/shared/types";

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
