import { useSearchStateStore } from "../stores/searchStateStoreV2";
import { useInputStateStore } from "../stores/inputStateStore";
import { useDisplayStateStore } from "../stores/displayStateStore";
import { getDomainCandidates, getDomainWithStatus } from "../serverCalls";
import { closeModal } from "../utils/openModal";
import { trackEventSafe } from "../utils/plausible";
import { SELECTED_MODEL } from "../config";
import { getTopDomain } from "../utils/getTopDomain";

export const useDomainGeneration = () => {
  const { isLoading, setIsLoading } = useDisplayStateStore();

  const {
    getLiked,
    getRejected,
    getAllUnrated,
    addDomainsFetching,
    updateStatus,
    addError,
    archiveUnrated,
  } = useSearchStateStore();

  const { purpose, vibeArray, preferredTlds } = useInputStateStore();
  const { setIsRefining } = useDisplayStateStore();

  const generateDomains = async () => {
    // Close things that might be open
    setIsLoading(true);
    setIsRefining(false);
    closeModal("refine-modal");
    const setExpandedDomain = useDisplayStateStore.getState().setExpandedDomain;
    setExpandedDomain(null);

    // Track the event
    trackEventSafe("ClickGenerate");

    // Archive all unrated domains
    archiveUnrated();

    // Generate the domains
    const vibe = vibeArray.join(", ");

    try {
      const domainCandidates = await getDomainCandidates({
        purpose,
        vibe,
        model: SELECTED_MODEL,
        targetQuantity: 10,
        preferredTlds: preferredTlds,
        likedDomains: getLiked(),
        rejectedDomains: getRejected(),
        unratedDomains: getAllUnrated(),
      });

      addDomainsFetching(domainCandidates);

      // Process assessments sequentially with delay
      await Promise.all(
        domainCandidates.map(async (domain, index) => {
          try {
            await new Promise((resolve) => setTimeout(resolve, index * 200));
            const domainWithStatus = await getDomainWithStatus(domain);
            updateStatus(domainWithStatus);
          } catch (error) {
            console.error(`Failed to assess domain ${domain}:`, error);
            addError(
              domain,
              error instanceof Error ? error.message : String(error)
            );
          }
        })
      );
      // Open the top performing domain
      const topValidDomain = getTopDomain(
        useSearchStateStore.getState().domains
      );

      if (topValidDomain) {
        setExpandedDomain(topValidDomain);
      }
      // Scroll to the top of the page
      window.scrollTo(0, 0);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    generateDomains,
    isDisabled: !purpose,
  };
};

/** Adds a domain to liked, and then generates a new list of domains */
export const useMoreLikeThis = () => {
  const { likeDomain } = useSearchStateStore();
  const { generateDomains } = useDomainGeneration();

  const likeAndGenerate = (domain: string) => {
    likeDomain(domain);
    generateDomains();
  };

  return { likeAndGenerate };
};
