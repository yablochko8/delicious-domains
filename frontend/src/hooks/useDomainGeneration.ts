import { useSearchStateStore } from "../stores/searchStateStore";
import { useInputStateStore } from "../stores/inputStateStore";
import { useDisplayStateStore } from "../stores/displayStateStore";
import { getDomainAssessment, getDomainCandidates } from "../serverCalls";
import { closeModal } from "../utils/openModal";
import { trackEventSafe } from "../utils/plausible";
import { SELECTED_MODEL } from "../config";
import { getTopDomain } from "../utils/getTopDomain";

export const useDomainGeneration = () => {
  const { isLoading, setIsLoading } = useDisplayStateStore();

  const {
    longlist,
    liked,
    rejected,
    addToLonglist,
    addAssessment,
    addFailure,
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

    // Generate the domains
    const vibe = vibeArray.join(", ");

    try {
      const fetchedLonglist = await getDomainCandidates({
        purpose,
        vibe,
        model: SELECTED_MODEL,
        targetQuantity: 10,
        preferredTlds: preferredTlds,
        likedDomains: liked,
        rejectedDomains: rejected,
        unratedDomains: longlist,
      });

      addToLonglist(fetchedLonglist);

      // Process assessments sequentially with delay
      await Promise.all(
        fetchedLonglist.map(async (domain, index) => {
          try {
            await new Promise((resolve) => setTimeout(resolve, index * 200));
            const assessment = await getDomainAssessment(domain);
            addAssessment(assessment);
          } catch (error) {
            console.error(`Failed to assess domain ${domain}:`, error);
            addFailure(
              domain,
              error instanceof Error ? error.message : String(error)
            );
          }
        })
      );
      // Open the top performing domain
      const { assessments } = useSearchStateStore.getState();
      const topValidDomain = getTopDomain(assessments.completed);

      if (topValidDomain) {
        console.log("Opening top domain", topValidDomain);
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
