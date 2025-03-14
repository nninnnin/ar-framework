import { useQuery } from "@tanstack/react-query";

import { QueryKeys } from "@/shared/constants/queryKeys";
import { CategoryInterface } from "@/shared/types/memex";
import { FormattedCategory } from "@/shared/types";
import { getProjectTypes } from "@/entities/project/utils/fetchers";
import { formatProjectTypes } from "@/entities/project/utils/formatters";

const useProjectTypes = () => {
  return useQuery<
    {
      list: Array<{
        categories: CategoryInterface[];
      }>;
    },
    any,
    FormattedCategory[]
  >({
    queryKey: [QueryKeys.ProjectTypes],
    queryFn: async () => {
      const res = await getProjectTypes();

      return await res.json();
    },
    select: formatProjectTypes,
  });
};

export default useProjectTypes;
