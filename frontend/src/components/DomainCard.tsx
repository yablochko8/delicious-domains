import { getTotalScore } from "../utils/getTotalScore";
import {
  MdFavorite as LikedIcon,
  MdFavoriteBorder as UnlikedIcon,
  MdClose as RejectIcon,
  MdClose as UnrejectIcon,
  // MdAdd as UnrejectIcon,
} from "react-icons/md";
import { DomainAssessment } from "shared/types";
import { useSearchStateStore } from "../stores/searchStateStore";
import { DomainScoreModal } from "./DomainScoreModal";
import { TOTAL_SCORE_MAX } from "../config";


const TotalScoreTile = ({
  totalScore,
  onClick,
}: {
  totalScore: number;
  onClick: () => void;
}) => {
  //   If the score is negative, we want to display zero
  const positiveScore = totalScore < 0 ? 0 : totalScore;
  const normalizedScore = (positiveScore * 100 / TOTAL_SCORE_MAX)
  const displayScore = Math.round(normalizedScore)


  return (
    <div className="h-8 w-8 flex align-middle justify-center items-center" onClick={onClick}>
      {displayScore > 0 ? (
        <>
          <div className="text-gray-500">{displayScore}</div>
          <div className="text-xs text-gray-500">%</div>
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
        return "text-gray-400";
      case !isAvailable:
        return "text-gray-400";
      case !isCheap:
        return "text-gray-400";
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
      case isLiked:
        return "btn-soft";
      case isRejected:
        return "btn-soft btn-error";
      default:
        return "btn-soft btn-error";
    }
  })();

  const shapeStyling = showText ? "btn-lg" : "btn-square";

  return (
    <button className={`btn ${shapeStyling} ${colorStyling}`} onClick={handleClick} title={hoverText}>
      {isRejected ? (
        <UnrejectIcon className="text-2xl" />
      ) : (
        <RejectIcon className="text-2xl" />
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
      case isLiked:
        return "btn-soft  btn-success";
      case isRejected:
        return "btn-soft";
      default:
        return "btn-soft btn-success";
    }
  })();

  const shapeStyling = showText ? "btn-lg" : "btn-square";


  return (
    <button
      className={`btn ${shapeStyling} ${styling}`}
      onClick={handleClick}
      title={hoverText}
    >
      {isLiked ? (
        <LikedIcon className="text-2xl" />
      ) : (
        <UnlikedIcon className="text-2xl" />
      )}
      {showText && <div className="text-sm">{actionText}</div>}
    </button>
  );
};

export const DomainCard = (assessment: DomainAssessment) => {
  const { domain, isPossible, isAvailable, isCheap } = assessment;

  const { rejected, liked } = useSearchStateStore();

  const isRejected = rejected.includes(domain);
  const isLiked = liked.includes(domain);
  const isValid = isPossible && isAvailable && isCheap;

  const validStyling = "bg-base-200/40 text-gray-800 border-base-content hover:bg-base-200 hover:border-slate-900";
  const likedStyling = "bg-success/20 border-success/20 hover:bg-success/30 hover:border-success/30";
  const rejectedStyling = "bg-error/20 border-error/20 hover:bg-error/30 hover:border-error/30";
  const invalidStyling = "bg-base-200 border-base-300 text-gray-400 hover:bg-slate-200 hover:border-slate-300";

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
    <div
      className={`flex flex-row w-full max-w-2xl items-center gap-3 p-3 border-1 rounded-xl cursor-pointer  ${colorStyling}`}
      onClick={(e) => {
        handleCardClick(e);
      }}
    >
      <TotalScoreTile
        totalScore={getTotalScore(assessment)}
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
  );
};
