import { useQuery } from "@tanstack/react-query";

import { getGroups } from "@/utils";
import { GroupResult } from "@/types";
import { GroupFormatted } from "@/types/index";
import { QueryKeys } from "@/constants/queryKeys";

const useGroups = () => {
  return useQuery<GroupResult, null, GroupFormatted[]>({
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
          projects: item.data.projects.map((item) => item.languageMap.KO ?? ""),
        };
      });
    },
  });
};

export default useGroups;
