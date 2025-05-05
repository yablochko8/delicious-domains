import { create } from "zustand";
import { persist } from "zustand/middleware";

export type DisplayState = {
  isRefining: boolean;
  isLoading: boolean;
  expandedDomain: string | null;
};

type DisplayStateStore = DisplayState & {
  setIsRefining: (isRefining: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setExpandedDomain: (expandedDomain: string | null) => void;
};

export const useDisplayStateStore = create<DisplayStateStore>()(
  persist(
    (set) => ({
      isRefining: false,
      isLoading: false,
      expandedDomain: null,
      setIsRefining: (isRefining: boolean) => set({ isRefining }),
      setIsLoading: (isLoading: boolean) => set({ isLoading }),
      setExpandedDomain: (expandedDomain: string | null) =>
        set({ expandedDomain }),
    }),
    { name: "display-state-25-04-24" }
  )
);
