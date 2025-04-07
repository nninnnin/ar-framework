import { create } from "zustand";

import { InteractionItem } from "@/features/interactionEditor/types";

interface InteractionEditorStore {
  isOpen: boolean;
  interactionItems: InteractionItem[];
  setInteractionItems: (
    items: InteractionItem[]
  ) => void;
}

export const interactionEditorStore =
  create<InteractionEditorStore>((set) => ({
    isOpen: true,
    interactionItems: [],
    setInteractionItems: (items) =>
      set(() => ({
        interactionItems: items,
      })),
  }));
