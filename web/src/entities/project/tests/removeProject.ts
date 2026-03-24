import ProjectService from "@/entities/project/service";

export const removeProject = {
  name: "프로젝트 삭제하기",
  code: async ({
    projectId,
  }: Record<string, string>) => {
    const service = new ProjectService();

    const projectToDelete = await service.getProject({
      projectId,
    });

    await service.updateProject({
      uid: projectId,
      publish: true,
      data: {
        name: { KO: projectToDelete.name },
        projectType: [projectToDelete.projectType.id],
        glbModels: projectToDelete.glbModels.map(
          (m) => m.uid,
        ),
        groupName: [projectToDelete.groupName.id],
        imageTarget: projectToDelete.imageTarget?.map(
          (t) => t.uid,
        ),
        isDeleted: true,
      },
    });

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
