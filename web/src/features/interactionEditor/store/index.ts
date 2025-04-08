import { create } from "zustand";

import {
  InteractionItem,
  Triggers,
} from "@/features/interactionEditor/types";

interface InteractionEditorStore {
  isOpen: boolean;
  interactionItems: InteractionItem[];
  setInteractionItems: (
    items: InteractionItem[]
  ) => void;
  selectedTrigger: Triggers | null;
  setSelectedTrigger: (
    trigger: Triggers | null
  ) => void;
}

export const useInteractionEditor =
  create<InteractionEditorStore>((set) => ({
    isOpen: true,
    interactionItems: [],
    setInteractionItems: (items) =>
      set(() => ({
        interactionItems: items,
      })),
    selectedTrigger: null,
    setSelectedTrigger: (trigger) =>
      set(() => ({
        selectedTrigger: trigger,
      })),
  }));
