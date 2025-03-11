import { useQuery } from "@tanstack/react-query";

import { QueryKeys } from "@/shared/constants/queryKeys";
import {
  Group,
  GroupFormatted,
  GroupResult,
} from "@/features/group/types/group";
import { getGroups } from "@/features/group/fetchers/group";
import {
  mapListItems,
  pipe,
  pluckList,
} from "@rebel9/memex-fetcher";

const useGroups = () => {
  return useQuery<GroupResult, null, GroupFormatted[]>(
    {
      queryKey: [QueryKeys.Groups],
      queryFn: async () => {
        const res = await getGroups();

        return await res.json();
      },
      select: formatGroup,
    }
  );
};

export const formatGroup = (result: GroupResult) => {
  return pipe(
    result,
    pluckList,
    mapListItems((item: Group) => ({
      uid: item.uid,
      name: item.data.name.KO ?? "",
    }))
  );
};

export default useGroups;
