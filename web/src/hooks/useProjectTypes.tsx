import { useQuery } from "@tanstack/react-query";

import { QueryKeys } from "@/constants/queryKeys";
import { getProjectTypes } from "@/utils";
import { mapListItems, pipe, pluckList } from "@rebel9/memex-fetcher";
import { CategoryInterface } from "@/types/memex";
import { last } from "lodash";
import { FormattedCategory } from "@/types";

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
        mapListItems((list: { categories: CategoryInterface[] }) =>
          list.categories.map((category: CategoryInterface) => {
            return {
              id: category.id,
              name: category.languageMap.KO,
            };
          })
        ),
        last
      );
    },
  });
};

export default useProjectTypes;
