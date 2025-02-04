import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";

import { ProjectType } from "@/types/project";

export const useSelectedProjectType = create<{
  selectedProjectType: ProjectType | null;
  setSelectedProjectType: (projectType: ProjectType) => void;
}>((set) => ({
  selectedProjectType: null,
  setSelectedProjectType: (projectType: ProjectType) =>
    set({ selectedProjectType: projectType }),
}));

export const useSelectedModelIndex = create<{
  selectedModelIndex: number;
  setSelectedModelIndex: (index: number) => void;
}>((set) => ({
  selectedModelIndex: 0,
  setSelectedModelIndex: (index: number) => set({ selectedModelIndex: index }),
}));

export const useAddedModels = create<{
  addedModels: Array<{
    id: string;
    file: File;
  } | null>;
  addModel: (model: File) => void;
  removeModel: (model: File) => void;
}>((set) => ({
  addedModels: [null],
  addModel: (model: File) =>
    set((state) => {
      const newModel = {
        id: uuidv4(),
        file: model,
      };

      return {
        addedModels: [...state.addedModels.filter((m) => m), newModel, null],
      };
    }),
  removeModel: (model: File) =>
    set((state) => ({
      addedModels: state.addedModels.filter((m) => m?.file !== model),
    })),
}));
