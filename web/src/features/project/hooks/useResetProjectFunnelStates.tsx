import { useEditableGlbModels } from "@/features/glbModel/store/editableGlbModels";
import { useSelectedProjectType } from "@/features/project/store";

const useResetProjectFunnelStates = () => {
  const { resetEditables } = useEditableGlbModels();
  const { resetSelectedProjectType } =
    useSelectedProjectType();

  return {
    resetProjectFunnelStates: () => {
      resetSelectedProjectType();
      resetEditables();
    },
  };
};

export default useResetProjectFunnelStates;
