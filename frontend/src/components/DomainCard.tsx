import { getTotalScore } from "../utils/getTotalScore";
import {
  MdFavorite as LikedIcon,
  MdFavoriteBorder as UnlikedIcon,
  MdClose as RejectIcon,
  MdAdd as UnrejectIcon,
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
  const displayScore = totalScore < 0 ? 0 : totalScore;

  const styling = (() => {
    switch (true) {
      case displayScore >= 16:
        return "btn-outline";
      case displayScore >= 14:
        return "btn-outline";
      default:
        return "btn-outline";
    }
  })();

  return (
    <div className={`btn btn-sm btn-circle ${styling}`} onClick={onClick}>
      {displayScore}
    </div>
  );
};

export const StatusMessage = ({
  isPossible,
  isAvailable,
  isCheap,
  isRejected,
}: {
  isPossible: boolean;
  isAvailable: boolean;
  isCheap: boolean;
  isRejected: boolean;
}) => {
  const message = (() => {
    switch (true) {
      case isRejected:
        return "rejected";
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
        return "text-gray-500";
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


const RejectButton = ({ domain }: { domain: string }) => {
  const { rejected, rejectDomain, unrejectDomain } = useSearchStateStore();
  const isRejected = rejected.includes(domain);
  const handleClick = () =>
    isRejected ? unrejectDomain(domain) : rejectDomain(domain);

  const hoverText = `${isRejected ? "Add back" : "Reject"} ${domain}`;

  return (
    <div className="btn btn-square btn-outline btn-error bg-red-100" onClick={handleClick} title={hoverText}>
      {isRejected ? (
        <UnrejectIcon className="text-2xl" />
      ) : (
        <RejectIcon className="text-2xl" />
      )}
    </div>
  );
};

const LikeButton = ({ domain }: { domain: string }) => {
  const { liked, likeDomain, unlikeDomain } = useSearchStateStore();
  const isLiked = liked.includes(domain);
  const handleClick = () =>
    isLiked ? unlikeDomain(domain) : likeDomain(domain);

  const hoverText = `${isLiked ? "Unlike" : "Like"} ${domain}`;

  return (
    <div
      className="btn btn-square btn-outline btn-success"
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

  const validStyling = "text-gray-800 border-gray-200";
  const likedStyling = "bg-green-50 border-green-200";
  const rejectedStyling = "bg-red-50 border-red-200";
  const invalidStyling = "bg-base-200 border-base-content";

  const styling = (() => {
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

  return (
    <div
      className={`flex flex-row w-full max-w-2xl items-center gap-3 p-3 border border-2 rounded-md ${styling}`}
    >
      <TotalScoreTile
        totalScore={getTotalScore(assessment)}
        onClick={openScoreModal}
      />
      <div className="flex-grow text-left p-2">
        {domain}
      </div>
      <StatusMessage
        isPossible={isPossible}
        isAvailable={isAvailable}
        isCheap={isCheap}
        isRejected={isRejected}
      />
      {isValid && (
        <>
          <RejectButton domain={domain} />
          <LikeButton domain={domain} />
        </>
      )}
      <DomainScoreModal assessment={assessment} />
    </div>
  );
};
