import { useSearchStateStore } from "../stores/searchStateStore";
import { useInputStateStore } from "../stores/inputStateStore";
import { useDisplayStateStore } from "../stores/displayStateStore";
import { getDomainAssessment, getLongList } from "../serverCalls";
import { closeModal } from "../utils/openModal";
import { trackEventSafe } from "../utils/plausible";
import { SELECTED_MODEL } from "../config";

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

  const { purpose, vibe, seriousDomainsOnly } = useInputStateStore();
  const { setIsRefining } = useDisplayStateStore();

  const generateDomains = async () => {
    setIsLoading(true);
    setIsRefining(false);
    closeModal("refine-modal");
    trackEventSafe("ClickGenerate");

    try {
      const feedback =
        longlist.length > 0
          ? {
              viewed: longlist,
              liked: liked,
              rejected: rejected,
            }
          : undefined;

      const fetchedLonglist = await getLongList({
        purpose,
        vibe,
        shortlist: null,
        model: SELECTED_MODEL,
        preferredTlds: seriousDomainsOnly ? ["com", "ai", "io"] : undefined,
        feedback,
      });

      addToLonglist(fetchedLonglist);

      // Process assessments sequentially with delay
      await Promise.all(
        fetchedLonglist.map(async (domain, index) => {
          try {
            await new Promise((resolve) => setTimeout(resolve, index * 200));
            const assessment = await getDomainAssessment(domain);
            console.log("Adding Assessment:", assessment);
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
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    generateDomains,
    isDisabled: !purpose || !vibe,
  };
};
