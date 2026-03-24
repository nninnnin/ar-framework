import { last } from "lodash";

import { FormattedCategory } from "@/shared/types";
import { Project, ProjectFormatted } from "@/entities/project/types";

const toNamedEntry = (entry: { uid: string; languageMap: { KO: string } }) => ({
  uid: entry.uid,
  name: entry.languageMap.KO,
});

export const formatProject = (project: Project): ProjectFormatted => {
  const projectType = project.projectType?.[0];
  const groupName = project.groupName?.[0];

  return {
    uid: project.uid,
    name: project.name?.KO ?? "",
    projectType: {
      id: projectType?._id ?? 0,
      name: projectType?.languageMap.KO ?? "",
    },
    groupName: {
      id: groupName?.uid ?? "",
      name: groupName?.languageMap.KO ?? "",
    },
    glbModels: project.glbModels.map(toNamedEntry),
    imageTarget: project.imageTarget?.map(toNamedEntry),
    isDeleted: project.isDeleted,
    templateId: project.templateId,
    isLocked: project.isLocked,
  };
};

type CategoryItemInterface = {
  id: number;
  order: number;
  languageMap: { KO?: string };
};

export const formatProjectTypes = (data: {
  list: Array<{
    categories: CategoryItemInterface[];
  }>;
}): FormattedCategory[] => {
  const lastList = last(data.list);
  if (!lastList) return [];
  return lastList.categories.map((category) => ({
    id: category.id,
    name: (category.languageMap.KO ?? "") as string,
  }));
};
