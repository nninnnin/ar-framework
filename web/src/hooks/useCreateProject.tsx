import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createProject } from "@/utils";
import { QueryKeys } from "@/constants/queryKeys";

const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      projectName: string;
      projectTypeId: number;
      postedModelIds: number[];
      groupName: string;
    }) => {
      const { projectName, projectTypeId, postedModelIds, groupName } = params;

      const res = await createProject(
        projectName,
        projectTypeId,
        postedModelIds,
        groupName
      );

      return await res.text();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Projects],
      });
    },
  });
};

export default useCreateProject;
