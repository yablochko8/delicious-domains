import { motion, AnimatePresence } from "framer-motion";
import { DomainAssessment } from "shared/types";
import { DomainCard } from "./DomainCard";
import { getTotalScore } from "../utils/getTotalScore";
import { useSearchStateStore } from "../stores/searchStateStore";

export const DomainList = ({
  domainOptions,
}: {
  domainOptions: DomainAssessment[];
}) => {
  // Filter out impossible domains (mainly hallucinated TLDs)
  const filteredDomainOptions = domainOptions.filter(
    (domain) => domain.isPossible
  );

  const { liked, rejected } = useSearchStateStore();

  /**
   * WHY DO WE NEED STABLE ID HERE?
   *
   * The domains are unique, but when the list re-sorts, React+Framer Motion needs
   * to know which element is which to animate them properly. Using just the domain
   * as the key means that when an item moves position due to sorting, React sees
   * the same key in a different position.
   *
   * By adding the index to create the stableId, each card maintains its original
   * position information even after sorting. This helps Framer Motion create
   * smoother animations because it can better track the "journey" of each card
   * from its original position to its new position.
   *
   * So the stableId isn't about uniqueness - it's about maintaining a consistent
   * identity for each card that includes information about its original position
   * in the list. This helps Framer Motion create more predictable and smoother
   * animations when the list is reordered.
   */
  const sortedDomainOptions = filteredDomainOptions
    .map((domain, index) => ({
      ...domain,
      stableId: `${domain.domain}-${index}`, // Add stable ID
      isValid: domain.isPossible && domain.isAvailable && domain.isCheap,
    }))
    .sort((a, b) => {
      // First sort by valid/invalid
      // Valid above invalid
      if (a.isValid && !b.isValid) return -1;
      if (!a.isValid && b.isValid) return 1;
      // Then sort by liked/rejected status
      // Not rejected above rejected
      if (!rejected.includes(a.domain) && rejected.includes(b.domain))
        return -1;
      if (rejected.includes(a.domain) && !rejected.includes(b.domain)) return 1;
      // Liked above not liked
      if (liked.includes(a.domain) && !liked.includes(b.domain)) return -1;
      if (!liked.includes(a.domain) && liked.includes(b.domain)) return 1;
      // Then sort by total score
      return getTotalScore(b) - getTotalScore(a);
    });

  // console.log({ sortedDomainOptions });

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="text-sm text-base-content/80">
        Tap the domain to see how it scored.
        Like and reject domains to get better results.
      </div>
      <AnimatePresence>
        {sortedDomainOptions.map((domainAssessment) => (
          <motion.div
            key={domainAssessment.stableId}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.3,
              type: "spring",
              stiffness: 500,
              damping: 30,
              layout: { duration: 0.3 },
            }}
            className="flex w-full justify-center"
          >
            <DomainCard {...domainAssessment} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
