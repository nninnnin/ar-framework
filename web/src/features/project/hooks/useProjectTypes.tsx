import { last } from "lodash";
import {
  mapListItems,
  pipe,
  pluckList,
} from "@rebel9/memex-fetcher";
import { useQuery } from "@tanstack/react-query";

import { QueryKeys } from "@/shared/constants/queryKeys";
import { CategoryInterface } from "@/shared/types/memex";
import { FormattedCategory } from "@/shared/types";
import { getProjectTypes } from "@/features/project/fetchers/project";

const useProjectTypes = () => {
  return useQuery<any, any, FormattedCategory[]>({
    queryKey: [QueryKeys.ProjectTypes],
    queryFn: async () => {
      const res = await getProjectTypes();
      return await res.json();
    },
    select: (data) => {
      return pipe(
        data,
        pluckList,
        mapListItems(
          (list: {
            categories: CategoryInterface[];
          }) =>
            list.categories.map(
              (category: CategoryInterface) => {
                return {
                  id: category.id,
                  name: category.languageMap.KO,
                };
              }
            )
        ),
        last
      );
    },
  });
};

export default useProjectTypes;
