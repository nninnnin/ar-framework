import { pipe } from "@rebel9/memex-fetcher";

import { ProjectFilter } from "@/entities/project/types";
import {
  getProjectItem,
  getProjects,
  updateProject,
} from "@/entities/project/utils/fetchers";
import { ProjectFormatted } from "@/features/project/types/project";
import {
  formatProjectItem,
  formatProjectList,
} from "@/entities/project/utils/formatters";
import { UpdateBody } from "@/shared/types";

class ProjectService {
  constructor() {}

  async createProject() {}

  async getProject({
    projectId,
  }: {
    projectId: string;
  }): Promise<ProjectFormatted> {
    return pipe(
      projectId,
      getProjectItem,
      formatProjectItem
    );
  }

  async getProjects(filter: ProjectFilter) {
    const res = await getProjects(filter);
    const result = await res.json();

    return pipe(result, formatProjectList);
  }

  async updateProject(body: UpdateBody) {
    return await updateProject(body);
  }

  async removeProject() {}
}

export default ProjectService;
