import {
  mapListItems,
  pipe,
  pluckList,
  mapObjectProps,
  deconstructLanguageMap,
} from "@rebel9/memex-fetcher";
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

export const formatProjectItem = (item: Project) => {
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

export const formatProjectList = (
  data: Project[]
): ProjectFormatted[] => {
  return pipe(
    data,
    pluckList,
    (projectList: Project[]) =>
      mapListItems(formatProjectItem, projectList)
  );
};
