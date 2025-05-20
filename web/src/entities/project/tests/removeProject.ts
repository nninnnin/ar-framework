import ProjectService from "@/entities/project/service";

import { formatProjectItem } from "@/entities/project/utils/formatters";
import {
  ProjectFormatted,
  ProjectType,
} from "@/features/project/types/project";

import { createUpdateBody } from "@/shared/utils/createUpdateBody";
import { mapObjectProps } from "@rebel9/memex-fetcher";

export const removeProject = {
  name: "프로젝트 삭제하기",
  code: async ({
    projectId,
  }: Record<string, string>) => {
    const service = new ProjectService();

    const projectToDelete = await service.getProject({
      projectId,
    });

    const projectData = formatProjectItem(
      projectToDelete
    );

    const updateBody = createUpdateBody(
      mapObjectProps(
        projectData,
        ["projectType"],
        (value: { id: number; name: ProjectType }) => {
          return [value.id];
        }
      ),
      {
        name: "title",
        projectType: "category",
        glbModels: "relation",
        imageTarget: "relation",
      }
    );

    console.log("updateBody", updateBody);

    const result = await service.updateProject({
      publish: true,
      uid: projectId,
      data: {
        ...projectToDelete.data,
        isDeleted: true,
      },
    });

    console.log("삭제 결과", result);

    return projectToDelete;
  },
  tester: (result: any) => {
    return true;
  },
  input: {
    placeholder: "삭제할 프로젝트 uid를 입력하세요",
    paramKey: "projectId",
  },
};
