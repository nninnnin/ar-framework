import { useQuery } from "@tanstack/react-query";

import { QueryKeys } from "@/shared/constants/queryKeys";
import { ProjectFormatted } from "@/entities/project/types";
import { getProjects } from "@/entities/project/utils/fetchers";

const useProjects = (filter: {
  groupName: string;
}) => {
  return useQuery<ProjectFormatted[], null>({
    queryKey: [QueryKeys.Projects, filter.groupName],
    enabled: !!filter.groupName,
    queryFn: async () => {
      const data = await getProjects(filter);
      return data.filter(({ isDeleted }) => !isDeleted);
    },
  });
};

export default useProjects;
