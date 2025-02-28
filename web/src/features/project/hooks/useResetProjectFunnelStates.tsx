import {
  useAddedModels,
  useSelectedProjectType,
} from "@/features/project/store";

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
