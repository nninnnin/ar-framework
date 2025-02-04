import { GroupFormatted } from "@/types/group";
import { create } from "zustand";

interface SelectedGroupState {
  selectedGroup: GroupFormatted | null;
  setSelectedGroup: (group: GroupFormatted) => void;
}

export const useSelectedGroup = create<SelectedGroupState>((set) => ({
  selectedGroup: null,
  setSelectedGroup: (group: GroupFormatted) => set({ selectedGroup: group }),
}));
