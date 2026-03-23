import { useQuery } from "@tanstack/react-query";

import { FormattedCategory } from "@/shared/types";
import { QueryKeys } from "@/shared/constants/queryKeys";
import { CategoryItemInterface } from "@/shared/types/memex";
import { getProjectTypes } from "@/entities/project/utils/fetchers";
import { formatProjectTypes } from "@/entities/project/utils/formatters";

const useProjectTypes = () => {
  return useQuery<
    {
      list: Array<{
        categories: CategoryItemInterface[];
      }>;
    },
    any,
    FormattedCategory[]
  >({
    queryKey: [QueryKeys.ProjectTypes],
    queryFn: async () => {
      return await getProjectTypes();
    },
    select: formatProjectTypes,
  });
};

export default useProjectTypes;
