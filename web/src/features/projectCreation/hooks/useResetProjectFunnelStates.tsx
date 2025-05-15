import { useEditableGlbModels } from "@/features/glbModel/store/editableGlbModels";
import { useSelectedProjectType } from "@/features/project/store";
import { useImageTarget } from "@/features/projectCreation/store/imageTarget";

const useResetProjectFunnelStates = () => {
  const { resetEditables } = useEditableGlbModels();
  const { resetSelectedProjectType } =
    useSelectedProjectType();
  const { resetImageTargetFile } = useImageTarget();

  return {
    resetProjectFunnelStates: () => {
      resetSelectedProjectType();
      resetEditables();
      resetImageTargetFile();
    },
  };
};

export default useResetProjectFunnelStates;
