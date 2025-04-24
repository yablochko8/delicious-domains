import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DomainAssessment, DomainScores } from "shared/types";

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
  nudgeScore: (domain: string, scoreType: keyof DomainScores) => void;
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
      likeDomain: (domain: string) =>
        set((state) => ({
          ...state,
          liked: [...state.liked, domain],
          rejected: state.rejected.filter((d) => d !== domain),
        })),
      unlikeDomain: (domain: string) =>
        set((state) => ({
          ...state,
          liked: state.liked.filter((d) => d !== domain),
        })),
      rejectDomain: (domain: string) =>
        set((state) => ({
          ...state,
          rejected: [...state.rejected, domain],
          liked: state.liked.filter((d) => d !== domain),
        })),
      unrejectDomain: (domain: string) =>
        set((state) => ({
          ...state,
          rejected: state.rejected.filter((d) => d !== domain),
        })),

      nudgeScore: (domain: string, scoreType: keyof DomainScores) =>
        set((state) => {
          const assessment = state.assessments.completed.find(
            (a) => a.domain === domain
          );
          if (!assessment || !assessment.scores) return state;

          const oldScore = assessment.scores[scoreType] || 0;
          const newScore = oldScore >= 3 ? 1 : oldScore + 1;

          return {
            ...state,
            assessments: {
              ...state.assessments,
              completed: state.assessments.completed.map((a) =>
                a.domain === domain
                  ? {
                      ...a,
                      scores: {
                        evoc: a.scores?.evoc || 0,
                        brev: a.scores?.brev || 0,
                        pron: a.scores?.pron || 0,
                        spel: a.scores?.spel || 0,
                        legs: a.scores?.legs || 0,
                        find: a.scores?.find || 0,
                        [scoreType]: newScore,
                      },
                    }
                  : a
              ),
            },
          };
        }),
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
