import { getTotalScore } from "../utils/getTotalScore";
import { ActionIcons } from "../assets/Icons";
import { DomainAssessment } from "shared/types";
import { useSearchStateStore } from "../stores/searchStateStore";
import { DomainScoreModal } from "./DomainScoreModal";
import { NETIM_PARTNER_ID } from "../config";
import { trackEventSafe } from "../utils/plausible";


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
    <div className="h-8 w-8 flex align-middle justify-center items-center" onClick={onClick}>
      {positiveScore > 0 ? (
        <>
          <div className="text-base-content/80">{positiveScore}</div>
          <div className="text-xs text-base-content/40">%</div>
        </>
      ) : ""}
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
      case isRejected:
        return "rejected";
      case isLiked:
        return "liked";
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

  return (
    <div className={styling}>
      {message}
    </div>
  );
};

export const RejectButton = ({ domain, isLiked, isRejected, showText = false }: { domain: string, isLiked: boolean, isRejected: boolean, showText?: boolean }) => {
  const { rejectDomain, unrejectDomain } = useSearchStateStore();
  const handleClick = () =>
    isRejected ? unrejectDomain(domain) : rejectDomain(domain);

  const actionText = `${isRejected ? "Add back" : "Reject"}`;
  const hoverText = `${actionText} ${domain}`;

  const colorStyling = (() => {
    switch (true) {
      case showText:
        return "btn-soft btn-error border-error";
      case isLiked:
        return "btn-outline btn-success";
      case isRejected:
        return "btn-error";
      default:
        return "btn-soft btn-error border-error";
    }
  })();

  const shapeStyling = showText ? "btn-lg" : "btn-square";

  return (
    <button className={`btn ${shapeStyling} ${colorStyling}`} onClick={handleClick} title={hoverText}>
      {isRejected ? (
        ActionIcons.unreject
      ) : (
        ActionIcons.reject
      )}
      {showText && <div className="text-sm">{actionText}</div>}
    </button>
  );
};

export const LikeButton = ({ domain, isLiked, isRejected, showText = false }: { domain: string, isLiked: boolean, isRejected: boolean, showText?: boolean }) => {
  const { likeDomain, unlikeDomain } = useSearchStateStore();
  const handleClick = () =>
    isLiked ? unlikeDomain(domain) : likeDomain(domain);

  const actionText = `${isLiked ? "Unlike" : "Like"}`;

  const hoverText = `${actionText} ${domain}`;

  const styling = (() => {
    switch (true) {
      case showText:
        return "btn-soft btn-success border-success";
      case isLiked:
        return "btn-success";
      case isRejected:
        return "btn-outline btn-error";
      default:
        return "btn-soft btn-success border-success";
    }
  })();

  const shapeStyling = showText ? "btn-lg" : "btn-square";

  return (
    <button
      className={`btn ${shapeStyling} ${styling}`}
      onClick={handleClick}
      title={hoverText}
    >
      {isLiked ?
        ActionIcons.unlike
        :
        ActionIcons.like
      }
      {showText && <div className="text-sm">{actionText}</div>}
    </button>
  );
};

export const RegisterButton = ({ domain, showText = false }: { domain: string, showText?: boolean }) => {

  const handleClick = () => {
    trackEventSafe("ClickRegister");
  };
  const shapeStyling = showText ? "btn-lg" : "btn-square";
  const hoverText = `Register ${domain}`
  const targetUrl = `https://www.netim.com/en/domain-name/search?partnerid=${NETIM_PARTNER_ID}&domain=${domain}`;


  return (
    <a
      href={targetUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn-primary ${shapeStyling}`}
      onClick={handleClick}
      title={hoverText}
    >
      {ActionIcons.register}
      {showText && <div className="text-sm">Register</div>}
    </a>
  );
};

export const DomainCard = (assessment: DomainAssessment) => {
  const { domain, isPossible, isAvailable, isCheap } = assessment;
  const { rejected, liked } = useSearchStateStore();

  const isRejected = rejected.includes(domain);
  const isLiked = liked.includes(domain);
  const isValid = isPossible && isAvailable && isCheap;

  const validStyling = "bg-base-200/40 text-base-content/80 border-base-content hover:bg-base-200 hover:border-base-content/80";
  const likedStyling = "bg-success/20 border-success/20 hover:bg-success/30 hover:border-success/30";
  const rejectedStyling = "bg-error/20 border-error/20 hover:bg-error/30 hover:border-error/30";
  const invalidStyling = "bg-base-200 border-base-300 text-base-content/40 hover:bg-base-200 hover:border-base-content/40";

  const colorStyling = (() => {
    if (!isValid) return invalidStyling;
    if (isRejected) return rejectedStyling;
    if (isLiked) return likedStyling;
    return validStyling;
  })();

  const openScoreModal = () => {
    const scoreModal = document.getElementById(
      `domain-score-modal-${domain}`
    ) as HTMLDialogElement;
    if (scoreModal) {
      scoreModal.showModal();
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Check if the clicked element or its parents have the 'btn' class
    const clickedButton = (e.target as HTMLElement).closest('.btn');
    if (!clickedButton) {
      openScoreModal();
    }
  };

  return (
    <div className="flex flex-row w-full bg-base-100 border-1 rounded-xl cursor-pointer">

      <div
        className={`flex flex-row w-full max-w-2xl items-center gap-3 p-3 rounded-xl ${colorStyling}`}
        onClick={(e) => {
          handleCardClick(e);
        }}
      >
        <TotalScoreTile
          totalScore={getTotalScore(assessment, true)}
          onClick={openScoreModal}
        />
        <div className="flex-grow text-left py-2 font-semibold text-lg tracking-tight hover:text-primary-focus transition-colors truncate">
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
            <RejectButton domain={domain} isLiked={isLiked} isRejected={isRejected} />
            <LikeButton domain={domain} isLiked={isLiked} isRejected={isRejected} />
          </>
        )}
        <DomainScoreModal assessment={assessment} />
      </div>
    </div>
  );
};
