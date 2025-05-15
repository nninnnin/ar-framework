import { create } from "zustand";

export const useImageTarget = create<{
  imageTargetFile: File | null;
  setImageTargetFile: (file: File | null) => void;
  resetImageTargetFile: () => void;
}>((set) => ({
  imageTargetFile: null,
  setImageTargetFile: (file: File | null) =>
    set({ imageTargetFile: file }),
  resetImageTargetFile: () =>
    set({ imageTargetFile: null }),
}));
