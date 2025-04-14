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


const TotalScoreTile = ({
  totalScore,
  onClick,
}: {
  totalScore: number;
  onClick: () => void;
}) => {
  //   If the score is negative, we want to display zero
  const positiveScore = totalScore < 0 ? 0 : totalScore;
  const normalizedScore = (positiveScore * 10 / 18)
  const displayScore = Math.round(normalizedScore)



  return (
    <div className="h-8 w-8 flex align-middle justify-center items-center" onClick={onClick}>
      {displayScore > 0 ? displayScore : ""}
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


const RejectButton = ({ domain, isLiked, isRejected }: { domain: string, isLiked: boolean, isRejected: boolean }) => {
  const { rejectDomain, unrejectDomain } = useSearchStateStore();
  const handleClick = () =>
    isRejected ? unrejectDomain(domain) : rejectDomain(domain);

  const hoverText = `${isRejected ? "Add back" : "Reject"} ${domain}`;

  const styling = (() => {
    switch (true) {
      case isLiked:
        return "btn-soft";
      case isRejected:
        return "btn-soft btn-error";
      default:
        return "btn-error";
    }
  })();
  return (
    <div className={`btn btn-square ${styling}`} onClick={handleClick} title={hoverText}>
      {isRejected ? (
        <UnrejectIcon className="text-2xl" />
      ) : (
        <RejectIcon className="text-2xl" />
      )}
    </div>
  );
};

const LikeButton = ({ domain, isLiked, isRejected }: { domain: string, isLiked: boolean, isRejected: boolean }) => {
  const { likeDomain, unlikeDomain } = useSearchStateStore();
  const handleClick = () =>
    isLiked ? unlikeDomain(domain) : likeDomain(domain);

  const hoverText = `${isLiked ? "Unlike" : "Like"} ${domain}`;

  const styling = (() => {
    switch (true) {
      case isLiked:
        return "btn-soft  btn-success";
      case isRejected:
        return "btn-soft";
      default:
        return "btn-success";
    }
  })();

  return (
    <div
      className={`btn btn-square ${styling}`}
      onClick={handleClick}
      title={hoverText}
    >
      {isLiked ? (
        <LikedIcon className="text-2xl" />
      ) : (
        <UnlikedIcon className="text-2xl" />
      )}
    </div>
  );
};

export const DomainCard = (assessment: DomainAssessment) => {
  const { domain, isPossible, isAvailable, isCheap } = assessment;

  const { rejected, liked } = useSearchStateStore();

  const isRejected = rejected.includes(domain);
  const isLiked = liked.includes(domain);
  const isValid = isPossible && isAvailable && isCheap;

  const validStyling = "bg-base-100 text-gray-800 border-base-content";
  const likedStyling = "bg-green-50 border-green-200";
  const rejectedStyling = "bg-red-50 border-red-200";
  const invalidStyling = "bg-base-200 border-base-300 text-gray-400";

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
      className={`flex flex-row w-full max-w-2xl items-center gap-3 p-3 border-2 rounded-xl cursor-pointer hover:bg-yellow-100 hover:border-yellow-200 ${colorStyling}`}
      onClick={(e) => {
        handleCardClick(e);
      }}
    >
      <TotalScoreTile
        totalScore={getTotalScore(assessment)}
        onClick={openScoreModal}
      />
      <div className="flex-grow text-left p-2 font-semibold text-lg tracking-tight hover:text-primary-focus transition-colors">
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
