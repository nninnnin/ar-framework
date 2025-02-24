import { useQuery } from "@tanstack/react-query";

import { QueryKeys } from "@/constants/queryKeys";
import {
  Project,
  ProjectFormatted,
} from "@/types/project";

import { formatProjectList } from "@/utils/formatters";
import { getProjects } from "@/utils/fetchers/project";

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
