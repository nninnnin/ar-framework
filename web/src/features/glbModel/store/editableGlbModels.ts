import { create } from "zustand";

import {
  GlbModelEditable,
  GlbModelFormatted,
} from "@/features/glbModel/types/glbModel";

type EditableGlbModelsStore = {
  editableGlbModels: Array<GlbModelEditable>;
  addEditableGlbModel: (
    model: GlbModelEditable
  ) => void;
  setEditables: (models: GlbModelFormatted[]) => void;
  resetEditables: () => void;
  removeEditables: (index: string) => void;
};

export const useEditableGlbModels =
  create<EditableGlbModelsStore>((set) => ({
    editableGlbModels: [],
    addEditableGlbModel: (
      newModel: GlbModelEditable
    ) =>
      set((state) => {
        const previousModels = state.editableGlbModels;

        return {
          editableGlbModels: [
            ...previousModels,
            newModel,
          ],
        };
      }),
    setEditables: (models: GlbModelFormatted[]) => {
      set({
        editableGlbModels: models.map(
          (glbModel: GlbModelFormatted) => {
            const editableGlbModel: GlbModelEditable =
              {
                ...glbModel,
                file: null,
              };

            return editableGlbModel;
          }
        ),
      });
    },
    resetEditables: () =>
      set({ editableGlbModels: [] }),
    removeEditables: (modelId: string) => {
      return set((state) => {
        const filtered =
          state.editableGlbModels.filter(
            (model) => model && model.uid !== modelId
          );

        return {
          editableGlbModels: filtered,
        };
      });
    },
  }));
