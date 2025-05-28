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
  CategoryItemInterface,
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
          (groupName: RelationInterface[]) => {
            return {
              id: groupName[0].uid,
              name: deconstructLanguageMap(
                groupName[0],
                "KO"
              ),
            };
          }
        ),
      (data: ProjectData) =>
        mapObjectProps(
          data,
          ["projectType"],
          (projectType: CategoryInterface[]) => {
            return {
              id: projectType[0]._id,
              name: deconstructLanguageMap(
                projectType[0],
                "KO"
              ),
            };
          }
        ),
      (data: ProjectData) =>
        mapObjectProps(
          data,
          ["glbModels", "imageTarget"],
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
    categories: CategoryItemInterface[];
  }>;
}): FormattedCategory[] => {
  return pipe(
    data,
    pluckList,
    mapListItems(
      (list: {
        categories: CategoryItemInterface[];
      }) =>
        list.categories.map(
          (category: CategoryItemInterface) => {
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
