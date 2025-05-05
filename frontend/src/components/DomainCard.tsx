import { getTotalScore } from "../utils/getTotalScore";
import { ActionIcons } from "../assets/Icons";
import { DomainAssessment } from "shared/types";
import { useSearchStateStore } from "../stores/searchStateStore";
import { NETIM_PARTNER_ID } from "../config";
import { trackEventSafe } from "../utils/plausible";
import {
  scoreExplanationDict,
  ScoreId,
  scoreIds,
} from "../assets/scoreExplanations";
import { useDisplayStateStore } from "../stores/displayStateStore";

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
          <div className="text-base-content/80">{positiveScore}</div>
          <div className="text-xs text-base-content/40">%</div>
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
  isRejected,
  isLiked,
}: {
  isPossible: boolean;
  isAvailable: boolean;
  isCheap: boolean;
  isRejected: boolean;
  isLiked: boolean;
}) => {
  const message = (() => {
    switch (true) {
      // case isRejected:
      //   return "rejected";
      // case isLiked:
      //   return "liked";
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

  const styling = (() => {
    switch (true) {
      case isRejected:
        return "text-error";
      case isLiked:
        return "text-success";
      case !isPossible:
        return "text-base-content/40";
      case !isAvailable:
        return "text-base-content/40";
      case !isCheap:
        return "text-base-content/40";
      default:
        return " ";
    }
  })();

  return <div className={styling}>{message}</div>;
};

export const RejectCircle = ({
  domain,
  isRejected,
}: {
  domain: string;
  isRejected: boolean;
}) => {
  const { rejectDomain, unrejectDomain } = useSearchStateStore();
  const handleClick = () =>
    isRejected ? unrejectDomain(domain) : rejectDomain(domain);

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
  const { likeDomain, unlikeDomain } = useSearchStateStore();
  const handleClick = () =>
    isLiked ? unlikeDomain(domain) : likeDomain(domain);

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
      className={`pill-button register-button`}
      onClick={handleClick}
      title={hoverText}
    >
      {ActionIcons.register}
      <div className="text-sm pl-2">Register</div>
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
      <div className="flex flex-row text-description px-4">
        {scoreExplanationDict[scoreId].shortDescription}
      </div>
    </div>
  );
};

const ScoreDetails = ({ assessment }: { assessment: DomainAssessment }) => {
  return (
    <>
      {assessment.scores &&
        [...scoreIds]
          .sort(
            (a: ScoreId, b: ScoreId) =>
              (assessment.scores?.[b] ?? 0) - (assessment.scores?.[a] ?? 0)
          )
          .map((scoreId: ScoreId) => (
            <SingleScoreDetail
              scoreId={scoreId}
              score={assessment.scores ? assessment.scores[scoreId] : 0}
              domain={assessment.domain}
            />
          ))}
      <div className="flex flex-row justify-end w-full p-4">
        <RegisterButton domain={assessment.domain} />
      </div>
    </>
  );
};

export const DomainCard = (assessment: DomainAssessment) => {
  const { domain, isPossible, isAvailable, isCheap } = assessment;
  const { expandedDomain, setExpandedDomain } = useDisplayStateStore();
  const { rejected, liked } = useSearchStateStore();

  const isRejected = rejected.includes(domain);
  const isLiked = liked.includes(domain);
  const isValid = isPossible && isAvailable && isCheap;
  const isExpanded = expandedDomain === domain;

  const validStyling =
    "input-background text-base-content border-base-content hover:bg-base-200 hover:border-base-content/80";
  const likedStyling =
    "liked-background text-base-content border-base-content hover:bg-base-200 hover:border-base-content/80";
  const rejectedStyling =
    "rejected-background text-base-content border-base-content hover:bg-base-200 hover:border-base-content/80";
  const invalidStyling =
    "bg-base-200 border-base-300 text-base-content/40 hover:bg-base-200 hover:border-base-content/40";

  const colorStyling = (() => {
    if (!isValid) return invalidStyling;
    if (isRejected) return rejectedStyling;
    if (isLiked) return likedStyling;
    return validStyling;
  })();

  const handleClick = () => {
    if (!isExpanded) {
      // Scroll so that the DomainCard that is expanded is flush with the top of the viewport
      const card = document.querySelector(".domain-card");
      if (card) {
        card.scrollIntoView({ behavior: "smooth" });
      }
    }
    setExpandedDomain(isExpanded ? null : domain);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Check if the clicked element or its parents has a class that reveals it's an action button
    // Only if it isn't should we treat this as a card click
    const clickedCircle = (e.target as HTMLElement).closest(".circle-button");
    const clickedRegister = (e.target as HTMLElement).closest(
      ".register-button"
    );
    if (!clickedCircle && !clickedRegister) {
      handleClick();
    }
  };

  return (
    <div
      className={`domain-card flex flex-row w-full rounded-3xl cursor-pointer drop-shadow-md ${colorStyling}`}
      onClick={(e) => {
        handleCardClick(e);
      }}
    >
      <div className="flex flex-col w-full">
        <div
          className={`flex flex-row w-full max-w-2xl items-center gap-3 px-3`}
        >
          <TotalScoreTile
            totalScore={getTotalScore(assessment, true)}
            onClick={handleClick}
          />
          <div className="flex-grow text-left py-2 font-normal text-lg tracking-tight hover:text-primary-focus transition-colors truncate">
            {domain}
          </div>
          <StatusMessage
            isPossible={isPossible}
            isAvailable={isAvailable}
            isCheap={isCheap}
            isRejected={isRejected}
            isLiked={isLiked}
          />
          {isValid && (
            <>
              <RejectCircle domain={domain} isRejected={isRejected} />
              <LikeCircle domain={domain} isLiked={isLiked} />
            </>
          )}
        </div>
        <div
          className={`overflow-hidden transition-all duration-200 ease-in-out ${
            isExpanded ? "max-h-[500px] opacity-100 pt-2" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-row" />
          <ScoreDetails assessment={assessment} />
        </div>
      </div>
    </div>
  );
};
