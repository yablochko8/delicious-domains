import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DomainWithStatus } from "shared/types";
import { trackEventSafe } from "../utils/plausible";

export type SearchState = {
  domains: DomainWithStatus[];
};

type SearchStateStore = SearchState & {
  getLiked: () => string[];
  getRejected: () => string[];
  getAllUnrated: () => string[];
  addDomainsFetching: (domains: string[]) => void;
  updateStatus: (domainWithStatus: DomainWithStatus) => void;
  addError: (domain: string, error: string) => void;
  likeDomain: (domain: string) => void;
  rejectDomain: (domain: string) => void;
  unrateDomain: (domain: string) => void;
  archiveUnrated: () => void;
  clearAll: () => void;
};

export const useSearchStateStore = create<SearchStateStore>()(
  persist<SearchStateStore>(
    (set) => ({
      domains: [] as DomainWithStatus[],
      getLiked: (): string[] => {
        const state = useSearchStateStore.getState();
        return state.domains
          .filter((domainWithStatus) => domainWithStatus.status === "liked")
          .map((domainWithStatus) => domainWithStatus.domain);
      },
      getRejected: (): string[] => {
        const state = useSearchStateStore.getState();
        return state.domains
          .filter((domainWithStatus) => domainWithStatus.status === "rejected")
          .map((domainWithStatus) => domainWithStatus.domain);
      },
      getAllUnrated: (): string[] => {
        const state = useSearchStateStore.getState();
        return state.domains
          .filter(
            (domainWithStatus) =>
              domainWithStatus.status === "unratedNew" ||
              domainWithStatus.status === "unratedOld"
          )
          .map((domainWithStatus) => domainWithStatus.domain);
      },
      addDomainsFetching: (domains: string[]) =>
        set((state) => {
          const newDomains = domains.map((domain) => ({
            domain,
            status: "fetching" as const,
          }));

          return {
            domains: [...state.domains, ...newDomains],
          };
        }),
      updateStatus: (domainWithStatus: DomainWithStatus) =>
        set((state) => ({
          domains: state.domains.map((domain) =>
            domain.domain === domainWithStatus.domain
              ? { ...domain, status: domainWithStatus.status }
              : domain
          ),
        })),
      addError: (domain: string, error: string) =>
        set((state) => ({
          domains: state.domains.map((d) =>
            d.domain === domain ? { ...d, error, status: "error" } : d
          ),
        })),
      likeDomain: (domain: string) => {
        trackEventSafe("ClickLike", { domain });
        set((state) => ({
          domains: state.domains.map((d) =>
            d.domain === domain ? { ...d, status: "liked" } : d
          ),
        }));
      },
      rejectDomain: (domain: string) => {
        trackEventSafe("ClickReject", { domain });
        set((state) => ({
          domains: state.domains.map((d) =>
            d.domain === domain ? { ...d, status: "rejected" } : d
          ),
        }));
      },
      unrateDomain: (domain: string) =>
        set((state) => ({
          domains: state.domains.map((d) =>
            d.domain === domain ? { ...d, status: "unratedNew" } : d
          ),
        })),
      archiveUnrated: () =>
        set((state) => ({
          domains: state.domains.map((d) =>
            d.status === "unratedNew" ? { ...d, status: "unratedOld" } : d
          ),
        })),
      clearAll: () =>
        set(() => ({
          domains: [],
        })),
    }),
    { name: "search-state-25-05-13" }
  )
);
