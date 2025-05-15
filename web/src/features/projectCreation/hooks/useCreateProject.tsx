import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { QueryKeys } from "@/shared/constants/queryKeys";
import { createProject } from "@/entities/project/utils/fetchers";
import { ProjectBody } from "@/features/project/types/project";

const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (projectBody: ProjectBody) => {
      const res = await createProject(projectBody);

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
