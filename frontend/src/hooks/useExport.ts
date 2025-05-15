import { useSearchStateStore } from "../stores/searchStateStore";
import { WEBSITE_NAME } from "../config";
import { trackEventSafe } from "../utils/plausible";

export const useExport = () => {
  const { domains } = useSearchStateStore();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Liked domains copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy domains to clipboard:", err);
      alert("Failed to copy domains to clipboard. Please try again.");
    }
  };

  const trackEventShared = () => {
    trackEventSafe("ClickExport", { domainCount: domains.length });
  };

  const handleDesktopExport = async () => {
    trackEventShared();
    if (domains.length === 0) return;
    const likedDomainsText = domains
      .filter((domain) => domain.status === "liked")
      .join("\n");
    const copyPrefix = `${WEBSITE_NAME} - My Liked Domains: \n`;
    await copyToClipboard(copyPrefix + likedDomainsText);
  };

  const handleMobileExport = async () => {
    trackEventShared();
    if (domains.length === 0) return;
    const likedDomainsText = domains
      .filter((domain) => domain.status === "liked")
      .join("\n");

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${WEBSITE_NAME} - My Liked Domains`,
          text: likedDomainsText,
        });
      } catch (err) {
        console.error("Error sharing domains:", err);
        // Fallback to clipboard if sharing fails
        await copyToClipboard(likedDomainsText);
      }
    } else {
      // Fallback for browsers that don't support sharing
      await copyToClipboard(likedDomainsText);
    }
  };

  return {
    handleDesktopExport,
    handleMobileExport,
    hasLikedDomains:
      domains.filter((domain) => domain.status === "liked").length > 0,
  };
};
