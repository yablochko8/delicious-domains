import { motion, AnimatePresence } from "framer-motion";
import { DomainStatus, DomainWithStatus } from "shared/types";
import { DomainCard } from "./DomainCard";
import { getTotalScoreV2 } from "../utils/getTotalScore";
import { useState } from "react";
import { checkIsHidden, checkIsPossible, checkCanRegister } from "../utils/statusParsers";

const ShowUnavailableDomainsButton = ({
  isShowing,
  howMany,
  onClick,
}: {
  isShowing: boolean;
  howMany: number;
  onClick: () => void;
}) => {
  if (howMany === 0) return null;

  const buttonStyle = "pill-button tertiary-action-button";
  if (isShowing)
    return (
      <button className={buttonStyle} onClick={onClick}>
        Hide Unavailable / Premium
      </button>
    );

  return (
    <button className={buttonStyle} onClick={onClick}>
      Show {howMany} Unavailable / Premium
    </button>
  );
};

export const DomainList = ({
  domainOptions,
}: {
  domainOptions: DomainWithStatus[];
}) => {
  const [isShowingUnavailableDomains, setIsShowingUnavailableDomains] =
    useState(false);
  // Filter out impossible domains (mainly hallucinated TLDs)
  const filteredDomainOptions = domainOptions.filter(
    (domain) => checkIsPossible(domain)
  );

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
    .map((domain, index) => {
      const domainWithStatus: DomainWithStatus = {
        domain: domain.domain,
        status: domain.status as DomainStatus,
        scores: domain.scores
      };
      return {
        ...domain,
        stableId: `${domain.domain}-${index}`, // Add stable ID
        canRegister: checkCanRegister(domainWithStatus),
      };
    })
    .sort((a, b) => {
      // SORT LOGIC - Categories from the bottom up
      // 
      // 0 - STILL FETCHING
      if (a.status === "fetching" && b.status !== "fetching") return -1;
      if (a.status !== "fetching" && b.status === "fetching") return 1;

      // 1 - INVALID
      // First sort by valid/invalid
      // Valid above invalid
      // Valid will be hidden behind a button
      if (a.canRegister && !b.canRegister) return -1;
      if (!a.canRegister && b.canRegister) return 1;

      // 2 - REJECTED
      // Then sort by liked/rejected status
      // Not rejected above rejected
      if ((a.status === "rejected") && (b.status !== "rejected")) return -1;
      if ((a.status !== "rejected") && (b.status === "rejected")) return 1;

      // 3 - UNRATED OLD
      if (a.status === "unratedOld" && b.status !== "unratedOld") return -1;
      if (a.status !== "unratedOld" && b.status === "unratedOld") return 1;

      // 4 - LIKED
      // Liked above not liked
      if ((a.status === "liked") && (b.status !== "liked")) return -1;
      if ((a.status !== "liked") && (b.status === "liked")) return 1;

      // 5 - UNRATED NEW
      // (No need to sort by this, it's the last category)

      // 6 - BY SCORE
      // Then sort by total score
      return getTotalScoreV2({
        domain: b.domain,
        status: b.status as DomainStatus,
        scores: b.scores
      }) - getTotalScoreV2({
        domain: a.domain,
        status: a.status as DomainStatus,
        scores: a.scores
      });
    });

  const howManyHiddenDomains = sortedDomainOptions.filter(
    (domain) => checkIsHidden(domain)
  ).length;
  // console.log({ sortedDomainOptions });

  const displayDomainOptions = isShowingUnavailableDomains
    ? sortedDomainOptions
    : sortedDomainOptions.filter((domain) => domain.canRegister);

  return (
    <div className="flex flex-col gap-3 w-full pb-20">
      <div className="text-form-subheading-white">
        All domain names available and priced under $100/year.
      </div>
      <AnimatePresence>
        {displayDomainOptions.map((domainAssessment) => (
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
        <div className="flex w-full justify-center">
          <ShowUnavailableDomainsButton
            isShowing={isShowingUnavailableDomains}
            howMany={howManyHiddenDomains}
            onClick={() =>
              setIsShowingUnavailableDomains(!isShowingUnavailableDomains)
            }
          />
        </div>
      </AnimatePresence>
    </div>
  );
};
