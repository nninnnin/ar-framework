import { create } from "zustand";

import {
  Actions,
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
  selectedAction: Actions | null;
  setSelectedAction: (action: Actions | null) => void;
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
    selectedAction: null,
    setSelectedAction: (action) =>
      set(() => ({
        selectedAction: action,
      })),
  }));
