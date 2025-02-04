import { ProjectType } from "@/types/project";
import { create } from "zustand";

export const useSelectedProjectType = create<{
  selectedProjectType: ProjectType | null;
  setSelectedProjectType: (projectType: ProjectType) => void;
}>((set) => ({
  selectedProjectType: null,
  setSelectedProjectType: (projectType: ProjectType) =>
    set({ selectedProjectType: projectType }),
}));
