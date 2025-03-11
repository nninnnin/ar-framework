import { pipe } from "@rebel9/memex-fetcher";

import { ProjectFilter } from "@/entities/project/types";
import {
  getProjectItem,
  getProjects,
  updateProject,
  createProject as fetchCreateProject,
} from "@/entities/project/utils/fetchers";
import {
  Project,
  ProjectBody,
  ProjectFormatted,
} from "@/features/project/types/project";
import { formatProjectList } from "@/entities/project/utils/formatters";
import { UpdateBody } from "@/shared/types";

class ProjectService {
  constructor() {}

  async createProject(body: ProjectBody) {
    return await fetchCreateProject(body);
  }

  async getProject({
    projectId,
  }: {
    projectId: string;
  }): Promise<Project> {
    return pipe(projectId, getProjectItem);
  }

  async getProjects(
    filter: ProjectFilter
  ): Promise<ProjectFormatted[]> {
    const res = await getProjects(filter);
    const result = await res.json();

    return pipe(result, formatProjectList);
  }

  async updateProject(body: UpdateBody) {
    return await updateProject(body);
  }

  async removeProject(uid: string) {}
}

export default ProjectService;
