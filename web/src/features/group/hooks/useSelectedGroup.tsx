import { create } from "zustand";

import { GroupFormatted } from "@/features/group/types/group";

interface SelectedGroupState {
  selectedGroup: GroupFormatted | null;
  setSelectedGroup: (group: GroupFormatted) => void;
}

export const useSelectedGroup =
  create<SelectedGroupState>((set) => ({
    selectedGroup: null,
    setSelectedGroup: (group: GroupFormatted) =>
      set({ selectedGroup: group }),
  }));
