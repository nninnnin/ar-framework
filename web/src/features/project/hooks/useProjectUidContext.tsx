import { ProjectFormatted } from "@/entities/project/types";
import { createContext, useContext } from "react";

export const ProjectItemContext = createContext<{
  projectItem: ProjectFormatted | null;
}>({
  projectItem: null,
});

const useProjectItemContext = () => {
  return useContext(ProjectItemContext);
};

export default useProjectItemContext;
