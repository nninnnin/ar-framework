import { last } from "lodash";
import {
  mapListItems,
  pipe,
  pluckList,
  mapObjectProps,
  deconstructLanguageMap,
} from "@rebel9/memex-fetcher";

import { FormattedCategory } from "@/shared/types";
import {
  Project,
  ProjectData,
  ProjectFormatted,
} from "@/features/project/types/project";
import {
  CategoryInterface,
  LanguageMap,
  RelationInterface,
} from "@/shared/types/memex";

export const formatProjectList = (data: Project[]) => {
  return pipe(
    data,
    pluckList,
    (projectList: Project[]) =>
      mapListItems(formatProjectItem, projectList)
  );
};

export const formatProjectItem = (
  item: Project
): ProjectFormatted => {
  return {
    uid: item.uid,
    ...pipe(
      item.data,
      (data: ProjectData) =>
        mapObjectProps(
          data,
          ["name"],
          (name: LanguageMap) => name.KO
        ),
      (data: ProjectData) =>
        mapObjectProps(
          data,
          ["groupName"],
          (groupName: RelationInterface[]) =>
            deconstructLanguageMap(groupName[0], "KO")
        ),
      (data: ProjectData) =>
        mapObjectProps(
          data,
          ["projectType"],
          (projectType: CategoryInterface[]) =>
            deconstructLanguageMap(
              projectType[0],
              "KO"
            )
        ),
      (data: ProjectData) =>
        mapObjectProps(
          data,
          ["glbModels"],
          (glbModels: RelationInterface[]) => {
            return glbModels.map((glbModel) => ({
              uid: glbModel.uid,
              name: deconstructLanguageMap(
                glbModel,
                "KO"
              ),
            }));
          }
        )
    ),
  };
};

export const formatProjectTypes = (data: {
  list: Array<{
    categories: CategoryInterface[];
  }>;
}): FormattedCategory[] => {
  return pipe(
    data,
    pluckList,
    mapListItems(
      (list: { categories: CategoryInterface[] }) =>
        list.categories.map(
          (category: CategoryInterface) => {
            return {
              id: category.id,
              name: category.languageMap.KO,
            };
          }
        )
    ),
    last
  );
};
