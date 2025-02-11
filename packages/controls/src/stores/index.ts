import { create } from "zustand";
import { ModelInterface } from "../types";

export const useMenuStore = create<{
  isOpen: boolean;
  toggle: () => void;
  selectedMenu: string | null;
}>((set) => ({
  isOpen: false,
  toggle: () =>
    set((state) => ({ isOpen: !state.isOpen })),
  selectedMenu: null,
}));

export const useModelStore = create<{
  models: Array<ModelInterface>;
  setModels: (models: Array<ModelInterface>) => void;
  selectedModelName: string | null;
  setSelectedModelName: (model: string) => void;
}>((set) => ({
  models: [],
  setModels: (models) => set({ models }),
  selectedModelName: null,
  setSelectedModelName: (modelName: string) =>
    set({ selectedModelName: modelName }),
}));
