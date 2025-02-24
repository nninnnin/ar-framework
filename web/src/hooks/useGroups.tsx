import { useQuery } from "@tanstack/react-query";

import { QueryKeys } from "@/constants/queryKeys";
import {
  GroupFormatted,
  GroupResult,
} from "@/types/group";
import { getGroups } from "@/utils/fetchers/group";

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
