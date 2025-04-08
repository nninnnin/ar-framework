import { useEditableGlbModels } from "@/features/glbModel/store/editableGlbModels";
import { useSelectedModelIndex } from "@/features/project/store";

const useCurrentModel = () => {
  const { editableGlbModels } = useEditableGlbModels();

  const { selectedModelIndex } =
    useSelectedModelIndex();

  const currentModel =
    editableGlbModels[selectedModelIndex];

  return {
    currentModel,
  };
};

export default useCurrentModel;
