import { useEditableGlbModels } from "@/features/glbModel/store/editableGlbModels";
import { useEffect, useRef, useState } from "react";

const useProjectModelDifference = () => {
  const [differenceDirection, setdifferenceDirection] =
    useState<null | "increase" | "decrease">(null);

  const { editableGlbModels } = useEditableGlbModels();

  const prevNumberOfGlbModels = useRef<number | null>(
    null
  );

  useEffect(() => {
    if (prevNumberOfGlbModels.current) {
      const direction =
        editableGlbModels.length >
        prevNumberOfGlbModels.current
          ? "increase"
          : "decrease";

      setdifferenceDirection(direction);
    }

    prevNumberOfGlbModels.current =
      editableGlbModels.length;
  }, [editableGlbModels]);

  return {
    differenceDirection,
  };
};

export default useProjectModelDifference;
