import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DomainAssessment } from "shared/types";

export type SearchState = {
  longlist: string[];
  liked: string[];
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
  likeDomain: (domain: string) => void;
  unlikeDomain: (domain: string) => void;
};

export const useSearchStateStore = create<SearchStateStore>()(
  persist(
    (set) => ({
      longlist: [],
      liked: [],
      assessments: {
        inProgress: [],
        completed: [],
        failed: [],
      },
      getState: () => ({
        longlist: [],
        liked: [],
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
      likeDomain: (domain: string) =>
        set((state) => ({
          ...state,
          liked: [...state.liked, domain],
        })),
      unlikeDomain: (domain: string) =>
        set((state) => ({
          ...state,
          liked: state.liked.filter((d) => d !== domain),
        })),
    }),
    { name: "search-state" }
  )
);
