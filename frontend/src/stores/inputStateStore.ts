import { create } from "zustand";
import { persist } from "zustand/middleware";

export type InputState = {
  purpose: string;
  vibeArray: string[];
  preferredTlds: string[];
};

type InputStateStore = InputState & {
  setPurpose: (purpose: string) => void;
  toggleVibe: (vibe: string) => void;
  togglePreferredTld: (tld: string) => void;
  clearVibes: () => void;
  clearPreferredTlds: () => void;
};

export const useInputStateStore = create<InputStateStore>()(
  persist(
    (set) => ({
      purpose: "",
      vibeArray: [],
      preferredTlds: [],
      setPurpose: (purpose: string) => set({ purpose }),
      toggleVibe: (vibe: string) =>
        set((state) => ({
          vibeArray: state.vibeArray.includes(vibe)
            ? state.vibeArray.filter((v) => v !== vibe)
            : [...state.vibeArray, vibe],
        })),
      togglePreferredTld: (tld: string) =>
        set((state) => ({
          preferredTlds: state.preferredTlds.includes(tld)
            ? state.preferredTlds.filter((t) => t !== tld)
            : [...state.preferredTlds, tld],
        })),
      clearVibes: () => set({ vibeArray: [] }),
      clearPreferredTlds: () => set({ preferredTlds: [] }),
    }),
    { name: "input-state-25-04-24" }
  )
);
