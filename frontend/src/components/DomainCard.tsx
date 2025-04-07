import { getTotalScore } from "../utils/getTotalScore";
import { useState } from "react";
import {
  MdFavorite as LikedIcon,
  MdFavoriteBorder as UnlikedIcon,
} from "react-icons/md";
import { ScoreIcons } from "../assets/ScoreIcons";
import { DomainAssessment } from "shared/types";
import { explanations } from "../assets/explanations";

const ScoreTile = ({ label, score }: { label: string; score: number }) => {
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
      className={`h-full w-full text-xs md:text-lg flex justify-center items-center font-semibold ${backgroundColor} ${textColor}`}
      title={hoverText}
    >
      {ScoreIcon}
    </div>
  );
};

const TotalScoreTile = ({ totalScore }: { totalScore: number }) => {
  //   If the score is negative, we want to display zero
  const displayScore = totalScore < 0 ? 0 : totalScore;

  return (
    <div className="h-full w-full text-lg font-semibold content-center bg-gray-200 text-gray-800">
      {displayScore}
    </div>
  );
};

export const ImpossibleBanner = ({
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
    <div className={`col-span-8 ${styling}`}>
      <div className="h-full w-full text-xs content-center">{message}</div>
    </div>
  );
};

const ScoreRow = ({ assessment }: { assessment: DomainAssessment }) => {
  const { isPossible, isAvailable, isCheap, scores } = assessment;

  const isValid = isPossible && isAvailable && isCheap;

  return (
    <div className="grid grid-cols-7 h-full">
      {isValid && scores ? (
        <>
          <div className="col-span-1">
            <ScoreTile label="Evoc" score={scores.evoc} />
          </div>
          <div className="col-span-1">
            <ScoreTile label="Brev" score={scores.brev} />
          </div>
          <div className="col-span-1">
            <ScoreTile label="Grep" score={scores.grep} />
          </div>
          <div className="col-span-1">
            <ScoreTile label="Goog" score={scores.goog} />
          </div>
          <div className="col-span-1">
            <ScoreTile label="Pron" score={scores.pron} />
          </div>
          <div className="col-span-1">
            <ScoreTile label="Spel" score={scores.spel} />
          </div>
          <div className="col-span-1">
            <ScoreTile label="Verb" score={scores.verb} />
          </div>
        </>
      ) : (
        <ImpossibleBanner
          isPossible={isPossible}
          isAvailable={isAvailable}
          isCheap={isCheap}
        />
      )}
    </div>
  );
};

const LikeButton = ({
  isLiked,
  setIsLiked,
}: {
  isLiked: boolean;
  setIsLiked: (isLiked: boolean) => void;
}) => {
  return (
    <div className="cursor-pointer" onClick={() => setIsLiked(!isLiked)}>
      {isLiked ? (
        <LikedIcon className="text-2xl text-red-500" />
      ) : (
        <UnlikedIcon className="text-2xl text-gray-500" />
      )}
    </div>
  );
};

export const DomainCard = (assessment: DomainAssessment) => {
  const [isLiked, setIsLiked] = useState(false);
  const { domain, isPossible, isAvailable, isCheap } = assessment;

  const isValid = isPossible && isAvailable && isCheap;

  const styling = isValid ? "text-gray-800" : " text-gray-400";

  return (
    <div
      className={`grid grid-cols-9 md:grid-cols-11 shadow-md p-1 ${styling}`}
    >
      <div className="col-span-9 md:col-span-2 flex justify-start text-lg font-semibold pt-2 pb-1">
        {domain}
      </div>
      <div className="col-span-7">
        <ScoreRow assessment={assessment} />
      </div>
      <div className="col-span-1">
        <TotalScoreTile totalScore={getTotalScore(assessment)} />
      </div>

      <div className="col-span-1 flex justify-center items-center">
        <LikeButton isLiked={isLiked} setIsLiked={setIsLiked} />
      </div>
    </div>
  );
};
