import ProjectService from "@/entities/project/service";
import { ProjectFormatted } from "@/features/project/types/project";
import { z } from "zod";

const ProjectValidator = z.object({
  uid: z.string(),
  name: z.string(),
  groupName: z.string(),
});

export const getProjects = {
  name: "프로젝트 가져오기",
  code: async () => {
    const projectService = new ProjectService();

    return await projectService.getProjects({
      groupName: "수변갤러리",
    });
  },
  tester: (projects: ProjectFormatted[]) => {
    projects.forEach((project) => {
      ProjectValidator.parse(project);
    });

    return projects.length > 0;
  },
};
