import { useQuery } from "@tanstack/react-query";

import { QueryKeys } from "@/shared/constants/queryKeys";
import { ProjectFormatted } from "@/entities/project/types";
import createNextApiFetcher from "@/shared/utils/nextApiFetcher";

const apiFetcher = createNextApiFetcher({
  entity: "project",
});

const useProjects = (filter: {
  groupName: string;
}) => {
  return useQuery<ProjectFormatted[], null>({
    queryKey: [QueryKeys.Projects, filter.groupName],
    enabled: !!filter.groupName,
    queryFn: async () => {
      const { data } = await apiFetcher.getItems<
        ProjectFormatted[]
      >(filter);

      return data.filter(({ isDeleted }) => {
        return !isDeleted;
      });
    },
  });
};

export default useProjects;
