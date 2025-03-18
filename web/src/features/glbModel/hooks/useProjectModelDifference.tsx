import { useEffect, useRef, useState } from "react";
import { useProjectGlbModels } from "@/features/project/store";

const useProjectModelDifference = () => {
  const [differenceDirection, setdifferenceDirection] =
    useState<null | "increase" | "decrease">(null);

  const { projectGlbModels } = useProjectGlbModels();

  const prevNumberOfGlbModels = useRef<number | null>(
    null
  );

  useEffect(() => {
    if (prevNumberOfGlbModels.current) {
      const direction =
        projectGlbModels.length >
        prevNumberOfGlbModels.current
          ? "increase"
          : "decrease";

      setdifferenceDirection(direction);
    }

    prevNumberOfGlbModels.current =
      projectGlbModels.length;
  }, [projectGlbModels]);

  return {
    differenceDirection,
  };
};

export default useProjectModelDifference;
