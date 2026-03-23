import { useQuery } from "@tanstack/react-query";

import { QueryKeys } from "@/shared/constants/queryKeys";
import { GroupFormatted } from "@/features/group/types/group";
import { getGroups } from "@/features/group/fetchers/group";

const useGroups = () => {
  return useQuery<GroupFormatted[]>({
    queryKey: [QueryKeys.Groups],
    queryFn: getGroups,
  });
};

export default useGroups;
