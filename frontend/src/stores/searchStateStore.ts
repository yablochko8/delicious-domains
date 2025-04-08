import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DomainAssessment, DomainScores } from "shared/types";

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
  nudgeScore: (domain: string, scoreType: keyof DomainScores) => void;
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
                        grep: a.scores?.grep || 0,
                        goog: a.scores?.goog || 0,
                        pron: a.scores?.pron || 0,
                        spel: a.scores?.spel || 0,
                        verb: a.scores?.verb || 0,
                        [scoreType]: newScore,
                      },
                    }
                  : a
              ),
            },
          };
        }),
    }),
    { name: "search-state" }
  )
);
