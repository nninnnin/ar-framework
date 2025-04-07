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
