import { create } from "zustand";

import { ProjectType } from "@/features/project/types/project";

export const useSelectedProjectType = create<{
  selectedProjectType: ProjectType | null;
  setSelectedProjectType: (
    projectType: ProjectType
  ) => void;
  resetSelectedProjectType: () => void;
}>((set) => ({
  selectedProjectType: null,
  setSelectedProjectType: (projectType: ProjectType) =>
    set({ selectedProjectType: projectType }),
  resetSelectedProjectType: () =>
    set({ selectedProjectType: null }),
}));

export const useSelectedModelIndex = create<{
  selectedModelIndex: number;
  setSelectedModelIndex: (index: number) => void;
  resetSelectedModelIndex: () => void;
}>((set) => ({
  selectedModelIndex: 0,
  setSelectedModelIndex: (index: number) =>
    set({ selectedModelIndex: index }),
  resetSelectedModelIndex: () =>
    set({ selectedModelIndex: 0 }),
}));

export type AddedModel = {
  id: string;
  file: File;
};

export const useProjectGlbModels = create<{
  projectGlbModels: Array<AddedModel | null>;
  addModel: (model: {
    id: string;
    file: File;
  }) => void;
  addModels: (
    models: { id: string; file: File }[]
  ) => void;
  resetAddedModels: () => void;
  removeModel: (index: string) => void;
}>((set) => ({
  projectGlbModels: [null],
  addModel: (newModel: { id: string; file: File }) =>
    set((state) => {
      return {
        projectGlbModels: [
          ...state.projectGlbModels.filter((m) => m),
          newModel,
          null,
        ],
      };
    }),
  addModels: (
    newModels: { id: string; file: File }[]
  ) => {
    set((state) => {
      return {
        projectGlbModels: [
          ...state.projectGlbModels.filter((m) => m),
          ...newModels,
          null,
        ],
      };
    });
  },
  resetAddedModels: () =>
    set({ projectGlbModels: [null] }),
  removeModel: (id: string) => {
    return set((state) => {
      const filtered = state.projectGlbModels.filter(
        (model) => model && model.id !== id
      );

      return {
        projectGlbModels: [...filtered, null],
      };
    });
  },
}));
