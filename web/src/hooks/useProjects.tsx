import { useQuery } from "@tanstack/react-query";

import { QueryKeys } from "@/constants/queryKeys";
import { getProjects } from "@/utils";

const useProjects = () => {
  return useQuery({
    queryKey: [QueryKeys.Projects],
    queryFn: async () => {
      const res = await getProjects();
      return res.json();
    },
    select: (data) => {
      console.log(data);

      return data.items;
    },
  });
};

export default useProjects;
