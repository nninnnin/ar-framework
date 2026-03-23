import { ProjectFilter } from "@/entities/project/types";
import {
  ProjectBody,
  ProjectFormatted,
} from "@/features/project/types/project";
import { UpdateBody } from "@/shared/types";
import {
  getProjectItem,
  getProjects,
  updateProject,
  createProject as fetchCreateProject,
} from "@/entities/project/utils/fetchers";

class ProjectService {
  constructor() {}

  async createProject(body: ProjectBody) {
    return fetchCreateProject(body);
  }

  async getProject({
    projectId,
  }: {
    projectId: string;
  }): Promise<ProjectFormatted> {
    return getProjectItem(projectId);
  }

  async getProjects(
    filter: ProjectFilter
  ): Promise<ProjectFormatted[]> {
    return getProjects(filter);
  }

  async updateProject(body: UpdateBody) {
    return updateProject(body);
  }

  async removeProject(_uid: string) {}
}

export default ProjectService;
