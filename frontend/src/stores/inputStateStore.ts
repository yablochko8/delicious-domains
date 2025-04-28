import { create } from "zustand";
import { persist } from "zustand/middleware";

export type InputState = {
  purpose: string;
  vibe: string;
  preferredTlds: string[];
};

type InputStateStore = InputState & {
  setPurpose: (purpose: string) => void;
  setVibe: (vibe: string) => void;
  togglePreferredTld: (tld: string) => void;
};

export const useInputStateStore = create<InputStateStore>()(
  persist(
    (set) => ({
      purpose: "",
      vibe: "",
      preferredTlds: [],
      setPurpose: (purpose: string) => set({ purpose }),
      setVibe: (vibe: string) => set({ vibe }),
      togglePreferredTld: (tld: string) =>
        set((state) => ({
          preferredTlds: state.preferredTlds.includes(tld)
            ? state.preferredTlds.filter((t) => t !== tld)
            : [...state.preferredTlds, tld],
        })),
    }),
    { name: "input-state-25-04-24" }
  )
);
