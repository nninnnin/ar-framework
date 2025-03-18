import {
  useProjectGlbModels,
  useSelectedProjectType,
} from "@/features/project/store";

const useResetProjectFunnelStates = () => {
  const { resetAddedModels } = useProjectGlbModels();
  const { resetSelectedProjectType } =
    useSelectedProjectType();

  return {
    resetProjectFunnelStates: () => {
      resetSelectedProjectType();
      resetAddedModels();
    },
  };
};

export default useResetProjectFunnelStates;
