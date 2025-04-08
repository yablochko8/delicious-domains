import { getTotalScore } from "../utils/getTotalScore";
import {
  MdFavorite as LikedIcon,
  MdFavoriteBorder as UnlikedIcon,
  MdClose as RejectIcon,
  MdAdd as UnrejectIcon,
} from "react-icons/md";
import { ScoreIcons } from "../assets/ScoreIcons";
import { DomainAssessment, DomainScores } from "shared/types";
import { explanations } from "../assets/scoreExplanations";
import { useSearchStateStore } from "../stores/searchStateStore";
import { DomainScoreModal } from "./DomainScoreModal";

const ScoreTile = ({
  label,
  score,
  domain,
}: {
  label: string;
  score: number;
  domain: string;
}) => {
  const { nudgeScore } = useSearchStateStore();

  const handleClick = () => {
    const scoreType: keyof DomainScores =
      label.toLowerCase() as keyof DomainScores;
    nudgeScore(domain, scoreType);
  };

  const backgroundColor = (() => {
    switch (score) {
      case 1:
        return "bg-red-200";
      case 2:
        return "bg-yellow-200";
      case 3:
        return "bg-green-200";
      default:
        return "bg-gray-200";
    }
  })();

  const textColor = (() => {
    switch (score) {
      case 1:
        return "text-red-600";
      case 2:
        return "text-yellow-600";
      case 3:
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  })();

  const hoverText =
    explanations[label.toLowerCase() as keyof typeof explanations];

  const ScoreIcon = ScoreIcons[label.toLowerCase() as keyof typeof ScoreIcons];

  return (
    <div
      className={`h-full w-full text-xs md:text-lg flex justify-center items-center font-semibold cursor-pointer rounded-md ${backgroundColor} ${textColor}`}
      title={hoverText}
      onClick={handleClick}
    >
      {ScoreIcon}
    </div>
  );
};

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
        return "btn-success";
      case displayScore >= 14:
        return "btn-warning";
      default:
        return "btn-error";
    }
  })();

  return (
    <div className={`btn btn-circle ${styling}`} onClick={onClick}>
      {displayScore}
    </div>
  );
};

export const ImpossibleBanner = ({
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
        return "Rejected";
      case !isPossible:
        return "Impossible";
      case !isAvailable:
        return "Unavailable";
      case !isCheap:
        return "Premium Price";
      default:
        return "error";
    }
  })();

  const styling = (() => {
    switch (true) {
      case isRejected:
        return "bg-gray-400 text-gray-500";
      case !isPossible:
        return "bg-gray-300 text-gray-400";
      case !isAvailable:
        return "bg-gray-200 text-gray-400";
      case !isCheap:
        return "bg-gray-100 text-gray-400";
      default:
        return "error";
    }
  })();

  return (
    <div className={`col-span-8 rounded-md ${styling}`}>
      <div className="h-full w-full text-xs content-center">{message}</div>
    </div>
  );
};

export const ScoreRow = ({ assessment }: { assessment: DomainAssessment }) => {
  const { isPossible, isAvailable, isCheap, scores, domain } = assessment;
  const { rejected } = useSearchStateStore();
  const isRejected = rejected.includes(domain);

  const isValid = isPossible && isAvailable && isCheap && !isRejected;

  return (
    <div className="grid grid-cols-7 h-full gap-2 px-2">
      {isValid && scores ? (
        <>
          <div className="col-span-1">
            <ScoreTile label="Evoc" score={scores.evoc} domain={domain} />
          </div>
          <div className="col-span-1">
            <ScoreTile label="Brev" score={scores.brev} domain={domain} />
          </div>
          <div className="col-span-1">
            <ScoreTile label="Grep" score={scores.grep} domain={domain} />
          </div>
          <div className="col-span-1">
            <ScoreTile label="Goog" score={scores.goog} domain={domain} />
          </div>
          <div className="col-span-1">
            <ScoreTile label="Pron" score={scores.pron} domain={domain} />
          </div>
          <div className="col-span-1">
            <ScoreTile label="Spel" score={scores.spel} domain={domain} />
          </div>
          <div className="col-span-1">
            <ScoreTile label="Verb" score={scores.verb} domain={domain} />
          </div>
        </>
      ) : (
        <ImpossibleBanner
          isPossible={isPossible}
          isAvailable={isAvailable}
          isCheap={isCheap}
          isRejected={isRejected}
        />
      )}
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
    <div className="btn btn-square" onClick={handleClick} title={hoverText}>
      {isRejected ? (
        <UnrejectIcon className="text-2xl text-gray-500" />
      ) : (
        <RejectIcon className="text-2xl text-gray-500" />
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
      className="btn btn-square btn-ghost"
      onClick={handleClick}
      title={hoverText}
    >
      {isLiked ? (
        <LikedIcon className="text-2xl text-red-500" />
      ) : (
        <UnlikedIcon className="text-2xl text-gray-500" />
      )}
    </div>
  );
};

export const DomainCard = (assessment: DomainAssessment) => {
  const { domain, isPossible, isAvailable, isCheap } = assessment;

  const { rejected } = useSearchStateStore();

  const isRejected = rejected.includes(domain);

  const isValid = isPossible && isAvailable && isCheap && !isRejected;

  const styling = isValid ? "text-gray-800" : " text-gray-400";

  const openScoreModal = () => {
    const scoreModal = document.getElementById(
      "DomainScoreModal"
    ) as HTMLDialogElement;
    if (scoreModal) {
      scoreModal.showModal();
    }
  };

  return (
    <div
      className={`grid grid-cols-5 md:grid-cols-12 shadow-md p-1 ${styling}`}
    >
      <div className="col-span-3 flex justify-start items-center gap-2 text-lg font-semibold pt-2 pb-1">
        <RejectButton domain={domain} />
        {domain}
      </div>
      <div className="hidden md:block md:col-span-7">
        <ScoreRow assessment={assessment} />
      </div>
      <div className="col-span-1 flex justify-center items-center">
        <TotalScoreTile
          totalScore={getTotalScore(assessment)}
          onClick={openScoreModal}
        />
      </div>

      <div className="col-span-1 flex justify-end items-center">
        <LikeButton domain={domain} />
      </div>
      <DomainScoreModal assessment={assessment} />
    </div>
  );
};
