import { create } from "zustand";
import { persist } from "zustand/middleware";

export type InputState = {
  purpose: string;
  vibe: string;
  seriousDomainsOnly: boolean;
};

type InputStateStore = InputState & {
  setPurpose: (purpose: string) => void;
  setVibe: (vibe: string) => void;
  setSeriousDomainsOnly: (seriousDomainsOnly: boolean) => void;
};

export const useInputStateStore = create<InputStateStore>()(
  persist(
    (set) => ({
      purpose: "",
      vibe: "",
      seriousDomainsOnly: false,
      setPurpose: (purpose: string) => set({ purpose }),
      setVibe: (vibe: string) => set({ vibe }),
      setSeriousDomainsOnly: (seriousDomainsOnly: boolean) =>
        set({ seriousDomainsOnly }),
    }),
    { name: "input-state-25-04-24" }
  )
);
