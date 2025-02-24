import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { QueryKeys } from "@/constants/queryKeys";
import { createProject } from "@/utils/fetchers/project";
import { ProjectBody } from "@/utils";

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
