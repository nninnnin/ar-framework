import { useQueryClient } from "@tanstack/react-query";

import { QueryKeys } from "@/constants/queryKeys";
import { formatProjectList } from "@/utils/formatters";
import {
  Project,
  ProjectFormatted,
} from "@/types/project";

const useProjectItem = (
  projectUid: string,
  groupName: string
) => {
  const queryClient = useQueryClient();

  if (!groupName) return { projectItem: undefined };

  const projects = queryClient.getQueryData<Project[]>(
    [QueryKeys.Projects, groupName]
  );

  if (!projects) return { projectItem: undefined };

  const formatted: ProjectFormatted[] =
    formatProjectList(projects);

  return {
    projectItem: formatted.find(
      (p) => p.uid === projectUid
    ),
  };
};

export default useProjectItem;
