import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createGroup } from "@/utils";
import { QueryKeys } from "@/constants/queryKeys";

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
