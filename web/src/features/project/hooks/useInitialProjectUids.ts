import { useEffect, useRef } from "react";
import { ProjectFormatted } from "@/features/project/types/project";

const useInitialProjectUids = (
  projects: ProjectFormatted[] | undefined
) => {
  const initialUids = useRef<Set<string> | null>(null);

  useEffect(() => {
    if (projects && initialUids.current === null) {
      initialUids.current = new Set(
        projects.map((p) => p.uid)
      );
    }
  }, [projects]);

  return initialUids;
};

export default useInitialProjectUids;
