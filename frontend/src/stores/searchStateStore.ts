import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DomainAssessment } from "shared/types";

export type SearchState = {
  longlist: string[];
  assessments: {
    inProgress: string[];
    completed: DomainAssessment[];
    failed: Array<{
      domain: string;
      error: string;
    }>;
  };
};

type SearchStateStore = SearchState & {
  getState: () => SearchState;
  addToLonglist: (domains: string[]) => void;
  addAssessment: (domainAssessment: DomainAssessment) => void;
  addFailure: (domain: string, error: string) => void;
};

export const useSearchStateStore = create<SearchStateStore>()(
  persist(
    (set) => ({
      longlist: [],
      assessments: {
        inProgress: [],
        completed: [],
        failed: [],
      },
      getState: () => ({
        longlist: [],
        assessments: {
          inProgress: [],
          completed: [],
          failed: [],
        },
      }),
      addToLonglist: (domains: string[]) =>
        set((state) => ({
          ...state,
          longlist: [...state.longlist, ...domains],
        })),
      addAssessment: (domainAssessment: DomainAssessment) => {
        console.log("INFUNCTION - Adding domain assessment:", domainAssessment);
        return set((state) => ({
          ...state,
          assessments: {
            ...state.assessments,
            completed: [...state.assessments.completed, domainAssessment],
          },
        }));
      },
      addFailure: (domain: string, error: string) =>
        set((state) => ({
          ...state,
          assessments: {
            ...state.assessments,
            failed: [...state.assessments.failed, { domain, error }],
          },
        })),
    }),
    { name: "search-state" }
  )
);
