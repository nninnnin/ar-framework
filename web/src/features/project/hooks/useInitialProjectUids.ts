import { useEffect, useRef } from "react";
import { ProjectFormatted } from "@/features/project/types/project";

const useInitialProjectUids = (
  projects: ProjectFormatted[] | undefined
) => {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (projects !== undefined && !isInitialized.current) {
      isInitialized.current = true;
    }
  }, [projects]);

  return isInitialized;
};

export default useInitialProjectUids;
