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

export const useAddedModels = create<{
  addedModels: Array<AddedModel | null>;
  addModel: (model: {
    id: string;
    file: File;
  }) => void;
  addModels: (
    models: { id: string; file: File }[]
  ) => void;
  resetAddedModels: () => void;
}>((set) => ({
  addedModels: [null],
  addModel: (newModel: { id: string; file: File }) =>
    set((state) => {
      return {
        addedModels: [
          ...state.addedModels.filter((m) => m),
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
        addedModels: [
          ...state.addedModels.filter((m) => m),
          ...newModels,
          null,
        ],
      };
    });
  },
  resetAddedModels: () => set({ addedModels: [null] }),
}));
