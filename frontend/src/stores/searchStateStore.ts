import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DomainAssessment } from "shared/types";
import { trackEventSafe } from "../utils/plausible";

export type SearchState = {
  longlist: string[];
  liked: string[];
  rejected: string[];
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
  addToLonglist: (domains: string[]) => void;
  addAssessment: (domainAssessment: DomainAssessment) => void;
  addFailure: (domain: string, error: string) => void;
  likeDomain: (domain: string) => void;
  unlikeDomain: (domain: string) => void;
  rejectDomain: (domain: string) => void;
  unrejectDomain: (domain: string) => void;
  clearAll: () => void;
};

export const useSearchStateStore = create<SearchStateStore>()(
  persist(
    (set) => ({
      longlist: [],
      liked: [],
      rejected: [],
      assessments: {
        inProgress: [],
        completed: [],
        failed: [],
      },
      addToLonglist: (domains: string[]) =>
        set((state) => {
          const allDomains = new Set([...state.longlist, ...domains]);
          const newDomains = domains.filter((d) => !state.longlist.includes(d));
          return {
            ...state,
            longlist: Array.from(allDomains),
            assessments: {
              ...state.assessments,
              inProgress: [...state.assessments.inProgress, ...newDomains],
            },
          };
        }),
      addAssessment: (domainAssessment: DomainAssessment) =>
        // Remove the domain from inProgress
        // Add the domain to completed
        // Replace any existing assessment for the domain
        set((state) => ({
          ...state,
          assessments: {
            ...state.assessments,
            inProgress: state.assessments.inProgress.filter(
              (d) => d !== domainAssessment.domain
            ),
            completed: [
              ...state.assessments.completed.filter(
                (a) => a.domain !== domainAssessment.domain
              ),
              domainAssessment,
            ],
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
      likeDomain: (domain: string) => {
        trackEventSafe("ClickLike", { domain });
        set((state) => ({
          ...state,
          liked: [...state.liked, domain],
          rejected: state.rejected.filter((d) => d !== domain),
        }));
      },
      unlikeDomain: (domain: string) =>
        set((state) => ({
          ...state,
          liked: state.liked.filter((d) => d !== domain),
        })),
      rejectDomain: (domain: string) => {
        trackEventSafe("ClickReject", { domain });
        set((state) => ({
          ...state,
          rejected: [...state.rejected, domain],
          liked: state.liked.filter((d) => d !== domain),
        }));
      },
      unrejectDomain: (domain: string) =>
        set((state) => ({
          ...state,
          rejected: state.rejected.filter((d) => d !== domain),
        })),
      clearAll: () =>
        set(() => ({
          longlist: [],
          liked: [],
          assessments: {
            inProgress: [],
            completed: [],
            failed: [],
          },
        })),
    }),
    { name: "search-state-25-04-24" }
  )
);
