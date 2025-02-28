import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { QueryKeys } from "@/shared/constants/queryKeys";
import { createGroup } from "@/features/group/fetchers/group";

const useCreateGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (groupName: string) => {
      return await createGroup(groupName);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Groups],
      });
    },
  });
};

export default useCreateGroup;
