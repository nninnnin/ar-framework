import { useQueryClient } from "@tanstack/react-query";

import { QueryKeys } from "@/shared/constants/queryKeys";
import { ProjectFormatted } from "@/features/project/types/project";

const useProjectItem = (
  projectUid: string,
  groupName: string
) => {
  const queryClient = useQueryClient();

  if (!groupName) return { projectItem: undefined };

  const projects = queryClient.getQueryData<
    ProjectFormatted[]
  >([QueryKeys.Projects, groupName]);

  if (!projects) return { projectItem: undefined };

  return {
    projectItem: projects.find(
      (p) => p.uid === projectUid
    ),
  };
};

export default useProjectItem;
