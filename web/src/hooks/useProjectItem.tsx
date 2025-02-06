import { useQueryClient } from "@tanstack/react-query";

import { QueryKeys } from "@/constants/queryKeys";
import { formatProjectData } from "@/hooks/useProjects";
import { Project, ProjectFormatted } from "@/types/project";

const useProjectItem = (projectUid: string, groupName: string) => {
  const queryClient = useQueryClient();

  const projects = queryClient.getQueryData<Project[]>([
    QueryKeys.Projects,
    groupName,
  ]);

  if (!projects) return { projectItem: undefined };

  const formatted: ProjectFormatted[] = formatProjectData(projects);

  return {
    projectItem: formatted.find((p) => p.uid === projectUid),
  };
};

export default useProjectItem;
