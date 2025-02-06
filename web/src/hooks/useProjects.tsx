import { useQuery } from "@tanstack/react-query";
import {
  mapListItems,
  pipe,
  pluckList,
  mapObjectProps,
} from "@rebel9/memex-fetcher";

import { QueryKeys } from "@/constants/queryKeys";
import { Project, ProjectFormatted } from "@/types/project";
import { LanguageMap } from "@/types/memex";
import { getProjects } from "@/utils";

const useProjects = (filter: { groupName: string }) => {
  return useQuery<Project[], null, ProjectFormatted[]>({
    queryKey: [QueryKeys.Projects, filter.groupName],
    queryFn: async () => {
      const res = await getProjects(filter);
      return res.json();
    },
    select: (data) => {
      return pipe(
        data,
        pluckList,
        mapListItems((item: Project) => {
          return {
            uid: item.uid,
            ...mapObjectProps(
              item.data,
              ["name"],
              (name: LanguageMap) => name.KO
            ),
          };
        })
      );
    },
  });
};

export default useProjects;
