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
        // Only add domains that aren't already in the longlist
        // Add these domains to inProgress also
        set((state) => {
          const newDomains = domains.filter((d) => !state.longlist.includes(d));
          return {
            ...state,
            longlist: [...state.longlist, ...newDomains],
            assessments: {
              ...state.assessments,
              inProgress: [...state.assessments.inProgress, ...newDomains],
            },
          };
        }),
      addAssessment: (domainAssessment: DomainAssessment) =>
        // Remove the domain from inProgress
        // Add the domain to completed
        set((state) => ({
          ...state,
          assessments: {
            ...state.assessments,
            inProgress: state.assessments.inProgress.filter(
              (d) => d !== domainAssessment.domain
            ),
            completed: [...state.assessments.completed, domainAssessment],
          },
        })),
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
