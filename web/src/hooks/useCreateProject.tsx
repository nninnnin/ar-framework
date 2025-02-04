import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createProject } from "@/utils";
import { QueryKeys } from "@/constants/queryKeys";

const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (projectName: string) => {
      return await createProject(projectName);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Groups],
      });
    },
  });
};

export default useCreateProject;
