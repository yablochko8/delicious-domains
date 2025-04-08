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

  const { liked } = useSearchStateStore();

  const sortedDomainOptions = filteredDomainOptions.sort((a, b) => {
    // First sort by liked status
    if (liked.includes(a.domain) && !liked.includes(b.domain)) return -1;
    if (!liked.includes(a.domain) && liked.includes(b.domain)) return 1;
    // Then sort by total score
    return getTotalScore(b) - getTotalScore(a);
  });

  return (
    <div>
      <AnimatePresence>
        {sortedDomainOptions.map((domainAssessment, _index) => (
          <motion.div
            key={domainAssessment.domain}
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
          >
            <DomainCard {...domainAssessment} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
