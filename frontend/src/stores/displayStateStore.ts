import { create } from "zustand";
import { persist } from "zustand/middleware";

export type DisplayState = {
  isRefining: boolean;
  isLoading: boolean;
};

type DisplayStateStore = DisplayState & {
  setIsRefining: (isRefining: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
};

export const useDisplayStateStore = create<DisplayStateStore>()(
  persist(
    (set) => ({
      isRefining: false,
      isLoading: false,
      setIsRefining: (isRefining: boolean) => set({ isRefining }),
      setIsLoading: (isLoading: boolean) => set({ isLoading }),
    }),
    { name: "display-state-25-04-24" }
  )
);
