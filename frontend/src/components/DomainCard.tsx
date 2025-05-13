import { getTotalScore } from "../utils/getTotalScore";
import { ActionIcons } from "../assets/Icons";
import { DomainWithStatus } from "shared/types";
import { useSearchStateStore } from "../stores/searchStateStoreV2";
import { NETIM_PARTNER_ID } from "../config";
import { trackEventSafe } from "../utils/plausible";
import {
  scoreExplanationDict,
  ScoreId,
  scoreIds,
} from "../assets/scoreExplanations";
import { useDisplayStateStore } from "../stores/displayStateStore";
import { useMoreLikeThis } from "../hooks/useDomainGeneration";
import { checkCanRegister } from "../utils/statusParsers";

const TotalScoreTile = ({
  totalScore,
  onClick,
}: {
  totalScore: number;
  onClick: () => void;
}) => {
  //   If the score is negative, we want to display zero
  const positiveScore = totalScore < 0 ? 0 : totalScore;

  return (
    <div
      className="h-8 w-8 flex align-middle justify-center items-center"
      onClick={onClick}
    >
      {positiveScore > 0 ? (
        <>
          <div className="text-neutral/60">{positiveScore}</div>
          <div className="text-xs text-neutral/40">%</div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export const StatusMessage = ({
  isPossible,
  isAvailable,
  isCheap,
}: {
  isPossible: boolean;
  isAvailable: boolean;
  isCheap: boolean;
}) => {
  const message = (() => {
    switch (true) {
      case !isPossible:
        return "impossible";
      case !isAvailable:
        return "unavailable";
      case !isCheap:
        return "premium $$$";
      default:
        return " ";
    }
  })();

  return <div className="text-neutral/20">{message}</div>;
};

export const RejectCircle = ({
  domain,
  isRejected,
}: {
  domain: string;
  isRejected: boolean;
}) => {
  const { rejectDomain, unrateDomain } = useSearchStateStore();
  const { setExpandedDomain } = useDisplayStateStore();
  const handleClick = () => {
    setExpandedDomain(null);
    isRejected ? unrateDomain(domain) : rejectDomain(domain);
  };

  const actionText = `${isRejected ? "Add back" : "Reject"}`;
  const hoverText = `${actionText} ${domain}`;

  return (
    <button
      className="circle-button reject-button"
      onClick={handleClick}
      title={hoverText}
    >
      {ActionIcons.thumbsDown}
    </button>
  );
};

export const LikeCircle = ({
  domain,
  isLiked,
}: {
  domain: string;
  isLiked: boolean;
}) => {
  const { likeDomain, unrateDomain } = useSearchStateStore();
  const { setExpandedDomain } = useDisplayStateStore();
  const handleClick = () => {
    setExpandedDomain(null);
    isLiked ? unrateDomain(domain) : likeDomain(domain);
  };

  const actionText = `${isLiked ? "Unlike" : "Like"}`;
  const hoverText = `${actionText} ${domain}`;

  return (
    <button
      className="circle-button like-button"
      onClick={handleClick}
      title={hoverText}
    >
      {ActionIcons.thumbsUp}
    </button>
  );
};


const MoreLikeThisButton = ({ domain }: { domain: string }) => {
  const { likeAndGenerate } = useMoreLikeThis();
  const handleClick = () => {
    likeAndGenerate(domain);
  };

  return (
    <button className="pill-button accent-action-button bg-neutral bg-opacity-100" onClick={handleClick}>
      {ActionIcons.generate}
      More like this
    </button>
  );
};

const RegisterButton = ({ domain }: { domain: string }) => {
  const handleClick = () => {
    trackEventSafe("ClickRegister");
  };
  const hoverText = `Register ${domain}`;
  const targetUrl = `https://www.netim.com/en/domain-name/search?partnerid=${NETIM_PARTNER_ID}&domain=${domain}`;

  return (
    <a
      href={targetUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="pill-button primary-action-button"
      onClick={handleClick}
      title={hoverText}
    >
      {ActionIcons.register}
      Register {domain}
    </a>
  );
};

const SingleScoreDetail = ({
  scoreId,
  score,
}: {
  scoreId: ScoreId;
  score: number;
  domain: string;
}) => {
  const progressStyle = (() => {
    switch (true) {
      case score < 6:
        return "progress-error";
      case score < 8:
        return "progress-warning";
      default:
        return "progress-success";
    }
  })();

  return (
    <div key={scoreId}>
      <h4 className="flex flex-row items-center justify-between px-4">
        <span>{scoreExplanationDict[scoreId].name}</span>
        <span>{score}/10</span>
      </h4>
      <div className="flex flex-row py-1 px-4">
        <progress
          className={`progress ${progressStyle} w-full`}
          value={score}
          max="10"
        ></progress>
      </div>
      <div className="flex flex-row text-description px-4 text-left">
        {scoreExplanationDict[scoreId].shortDescription}
      </div>
    </div>
  );
};

const ScoreDetails = ({ domainWithStatus }: { domainWithStatus: DomainWithStatus }) => {
  return (
    <>
      {domainWithStatus.scores &&
        [...scoreIds]
          .sort(
            (a: ScoreId, b: ScoreId) =>
              (domainWithStatus.scores?.[b] ?? 0) - (domainWithStatus.scores?.[a] ?? 0)
          )
          .map((scoreId: ScoreId) => (
            <SingleScoreDetail
              scoreId={scoreId}
              score={domainWithStatus.scores ? domainWithStatus.scores[scoreId] : 0}
              domain={domainWithStatus.domain}
            />
          ))}
      <div className="flex flex-row justify-end w-full p-4 gap-2">
        <MoreLikeThisButton domain={domainWithStatus.domain} />
        <RegisterButton domain={domainWithStatus.domain} />
      </div>
    </>
  );
};

export const DomainCard = (domainWithStatus: DomainWithStatus) => {
  console.log({ domainWithStatus });
  const { domain, status } = domainWithStatus;
  const { expandedDomain, setExpandedDomain } = useDisplayStateStore();

  const getDomainCardTag = (domain: string) => {
    // split the domain by the dot
    const parts = domain.split(".");
    // return the parts joined by a dash
    const domainTag = parts.join("-");
    return `domain-card-${domainTag}`;
  };

  const isRejected = status === "rejected";
  const isLiked = status === "liked";
  const isValid = checkCanRegister(domainWithStatus);
  const isExpanded = expandedDomain === domain;

  const validStyling =
    "input-background text-base-content border-base-content hover:bg-base-200 hover:border-base-content/80";
  const likedStyling =
    "liked-background text-base-content border-base-content hover:bg-base-200 hover:border-base-content/80";
  const rejectedStyling =
    "rejected-background text-base-content border-base-content hover:bg-base-200 hover:border-base-content/80";
  const invalidStyling =
    "bg-neutral-content/40 border-base-300 text-base-content/40 hover:bg-base-200 hover:border-base-content/40";

  const colorStyling = (() => {
    if (!isValid) return invalidStyling;
    if (isRejected) return rejectedStyling;
    if (isLiked) return likedStyling;
    return validStyling;
  })();

  const handleClick = () => {
    if (!isExpanded) {
      // Scroll so that the DomainCard that is expanded is flush with the top of the viewport
      // DELETED BECAUSE THE SHRINKING DOMAIN CARD CONFUSES THE SCROLLINTOVIEW CALCULATION
      // const card = document.querySelector(`.${getDomainCardTag(domain)}`);
      // if (card) {
      //   card.scrollIntoView({ behavior: "smooth" });
      // }
    }
    setExpandedDomain(isExpanded ? null : domain);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Check if the clicked element or its parents has a class that reveals it's an action button
    // Only if it isn't should we treat this as a card click
    const clickedCircle = (e.target as HTMLElement).closest(".circle-button");
    const clickedRegister = (e.target as HTMLElement).closest(
      ".primary-action-button"
    );
    if (!clickedCircle && !clickedRegister) {
      handleClick();
    }
  };

  return (
    <div
      className={`flex flex-row w-full rounded-3xl cursor-pointer drop-shadow-md ${colorStyling} ${getDomainCardTag(
        domain
      )}`}
      onClick={(e) => {
        handleCardClick(e);
      }}
    >
      <div className="flex flex-col w-full">
        <div
          className={`flex flex-row w-full max-w-2xl items-center gap-3 px-3`}
        >
          <TotalScoreTile
            totalScore={getTotalScore(domainWithStatus, true)}
            onClick={handleClick}
          />
          <h3 className="flex-grow text-left py-2 font-normal text-lg tracking-tight hover:text-primary-focus transition-colors truncate">
            {domain}
          </h3>
          <StatusMessage
            isPossible={checkCanRegister(domainWithStatus)}
            isAvailable={status !== "unavailable"}
            isCheap={status !== "premium"}
          />
          {isValid && (
            <>
              <RejectCircle domain={domain} isRejected={isRejected} />
              <LikeCircle domain={domain} isLiked={isLiked} />
            </>
          )}
        </div>
        <div
          className={`overflow-hidden transition-all duration-200 ease-in-out ${isExpanded ? "max-h-[500px] opacity-100 pt-2" : "max-h-0 opacity-0"
            }`}
        >
          <div className="flex flex-row" />
          <ScoreDetails domainWithStatus={domainWithStatus} />
        </div>
      </div>
    </div>
  );
};
