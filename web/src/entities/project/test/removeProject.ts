import ProjectService from "@/entities/project/service";
import { getProjectTypes } from "@/entities/project/utils/fetchers";
import { formatProjectItem } from "@/entities/project/utils/formatters";
import { ProjectFormatted } from "@/features/project/types/project";
import { getProjectTypeId } from "@/features/project/utils";
import { createUpdateBody } from "@/shared/utils/createUpdateBody";
import { formatProjectTypes } from "@/features/project/utils/formatter";

export const removeProject = {
  name: "프로젝트 삭제하기",
  code: async ({
    projectId,
  }: Record<string, string>) => {
    const service = new ProjectService();

    // 일단 가져와
    const projectToDelete = await service.getProject({
      projectId,
    });

    const projectData = formatProjectItem(
      projectToDelete
    );

    console.log("지우려고 가져온", projectData);

    const updateBody = createUpdateBody<
      Omit<ProjectFormatted, "uid">
    >(projectData, {
      name: "title",
      projectType: "category",
      glbModels: "relation",
      groupName: "relation",
    });

    console.log("updateBody", updateBody);

    const res = await getProjectTypes();
    const projectTypes = await res.json();
    const formatted = formatProjectTypes(projectTypes);

    const projectTypeId = getProjectTypeId(
      updateBody.projectType as string,
      formatted
    );

    updateBody.projectType = [projectTypeId];

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
