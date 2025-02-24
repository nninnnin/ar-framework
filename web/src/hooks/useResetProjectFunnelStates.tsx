import {
  useAddedModels,
  useSelectedProjectType,
} from "@/stores";

const useResetProjectFunnelStates = () => {
  const { resetAddedModels } = useAddedModels();
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
