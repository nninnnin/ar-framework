import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { QueryKeys } from "@/constants/queryKeys";
import { createGroup } from "@/utils/fetchers/group";

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
