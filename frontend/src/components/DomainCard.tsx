import { getTotalScore } from "../utils/getTotalScore";
import { useState } from "react";
import {
  MdFavorite as LikedIcon,
  MdFavoriteBorder as UnlikedIcon,
} from "react-icons/md";
import { DomainAssessment } from "shared/types";

const ScoreTile = ({ label, score }: { label: string; score: number }) => {
  const backgroundColor = (() => {
    switch (score) {
      case 1:
        return "bg-red-400";
      case 2:
        return "bg-yellow-400";
      case 3:
        return "bg-green-400";
      default:
        return "bg-gray-400";
    }
  })();

  const hoverText = (() => {
    switch (label.toLowerCase()) {
      case "evoc":
        return "Evocativity: Conveys at least a hint of what it’s naming";
      case "brev":
        return "Brevity: Shorter = better";
      case "grep":
        return "Greppability: Not a substring of common words";
      case "goog":
        return "Googlability: Reasonably unique";
      case "pron":
        return "Pronounceability: You can read it out loud when you see it. Bonus points for alliteration or related patterns, including classy consonance, arrogant assonance, and explosive plosives.";
      case "spel":
        return "Spellability: You know how it's spelled when you hear it";
      case "verb":
        return "Verbability: The core name - the first part of the domain name - can be used as a verb";
      default:
        return undefined;
    }
  })();

  return (
    <div
      className={`h-full w-full text-xs md:text-sm font-semibold content-center ${backgroundColor}`}
      title={hoverText}
    >
      {label.toUpperCase()}
    </div>
  );
};

const TotalScoreTile = ({ totalScore }: { totalScore: number }) => {
  return (
    <div className="h-full w-full text-lg font-semibold content-center bg-gray-200 text-gray-800">
      {totalScore}
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

export const DomainCard = (assessment: DomainAssessment) => {
  const [isLiked, setIsLiked] = useState(false);
  const { domain, isPossible, isAvailable, isCheap, scores } = assessment;

  const isValid = isPossible && isAvailable && isCheap;

  const styling = isValid ? "text-gray-800" : " text-gray-400";

  return (
    <div className={`grid grid-cols-11 bg-base-100 shadow-md ${styling}`}>
      <div className="col-span-2">{domain}</div>
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
          <div className="col-span-1">
            <TotalScoreTile totalScore={getTotalScore(assessment)} />
          </div>
        </>
      ) : (
        <ImpossibleBanner
          isPossible={isPossible}
          isAvailable={isAvailable}
          isCheap={isCheap}
        />
      )}
      <div className="col-span-1 flex justify-center items-center">
        <div className="cursor-pointer" onClick={() => setIsLiked(!isLiked)}>
          {isLiked ? (
            <LikedIcon className="text-2xl text-red-500" />
          ) : (
            <UnlikedIcon className="text-2xl text-gray-500" />
          )}
        </div>
      </div>
    </div>
  );
};
