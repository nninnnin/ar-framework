import { useQuery } from "@tanstack/react-query";

import { QueryKeys } from "@/shared/constants/queryKeys";
import {
  GroupFormatted,
  GroupResult,
} from "@/features/group/types/group";
import { getGroups } from "@/features/group/fetchers/group";

const useGroups = () => {
  return useQuery<GroupResult, null, GroupFormatted[]>(
    {
      queryKey: [QueryKeys.Groups],
      queryFn: async () => {
        const res = await getGroups();

        return await res.json();
      },
      select: (data) => {
        const list = data.list;

        return list.map((item) => {
          return {
            uid: item.uid,
            name: item.data.name.KO ?? "",
          };
        });
      },
    }
  );
};

export default useGroups;
