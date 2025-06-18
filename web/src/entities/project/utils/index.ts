import { ProjectBody } from "@/features/project/types/project";

export const createProjectBody = (params: {
  projectName: string;
  projectTypeId: number;
  postedModelIds: string[];
  groupId: string;
  imageTargetId?: string;
  templateId: string;
  isLocked: boolean;
}): ProjectBody => {
  const name = { KO: params.projectName };
  const projectType = [params.projectTypeId];
  const glbModels = params.postedModelIds;
  const groupName = [params.groupId];
  const imageTarget = params.imageTargetId
    ? [params.imageTargetId]
    : undefined;

  const templateId = params.templateId;
  const isLocked = String(params.isLocked);

  return {
    publish: true,
    data: {
      name,
      projectType,
      glbModels,
      groupName,
      imageTarget,
      templateId,
      isLocked,
    },
  };
};
