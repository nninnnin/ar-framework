import { useQuery } from "@tanstack/react-query";

import { QueryKeys } from "@/shared/constants/queryKeys";
import {
  Project,
  ProjectFormatted,
} from "@/features/project/types/project";
import { getProjects } from "@/features/project/fetchers/project";
import { formatProjectList } from "@/features/project/utils/formatter";

const useProjects = (filter: {
  groupName: string;
}) => {
  return useQuery<Project[], null, ProjectFormatted[]>(
    {
      queryKey: [QueryKeys.Projects, filter.groupName],
      queryFn: async () => {
        const res = await getProjects(filter);
        return res.json();
      },
      select: (data) => {
        return formatProjectList(data);
      },
    }
  );
};

export default useProjects;
