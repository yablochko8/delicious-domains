import { useState } from "react";
import { MdFavorite as LikedIcon, MdFavoriteBorder as UnlikedIcon } from "react-icons/md";

type DomainAssessment = {
    domain: string;
    isPossible: boolean;
    isAvailable: boolean;
    isCheap: boolean;
    evoc: number;
    brev: number;
    grep: number;
    goog: number;
    pron: number;
    spel: number;
    verb: number;
}

/** 0 is unassessed. 1 is red, 2 is yellow, 3 is green */
export const assessDomain = (domain: string): DomainAssessment => {

    const brevScore = (() => {
        const domainLength = domain.length;
        switch (true) {
            case domainLength <= 8:
                return 3;
            case domainLength <= 12:
                return 2;
            default:
                return 1
        }
    })();

    /** Throwaway code to consistently fake some scores */
    const randomScore = (stringSeed: string, numberSeed: number = 1) => {
        // Convert the string seed to an integer
        let hash = 0;
        for (let i = 0; i < stringSeed.length; i++) {
            const char = stringSeed.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        // Incorporate the number seed into the hash calculation
        hash = ((hash * numberSeed) ^ (numberSeed << 7)) & 0xFFFFFFFF;
        const percentile = Math.abs(hash % 100);

        if (percentile < 60) {
            return 3; // 60% chance of green
        } else if (percentile < 85) {
            return 2; // 25% chance of yellow
        } else {
            return 1; // 15% chance of red
        }
    };

    return {
        domain,
        isPossible: true,
        isAvailable: true,
        isCheap: true,
        evoc: randomScore(domain, 1),
        brev: brevScore,
        grep: randomScore(domain, 2),
        goog: randomScore(domain, 3),
        pron: randomScore(domain, 4),
        spel: randomScore(domain, 5),
        verb: randomScore(domain, 6),
    }
}

const ScoreTile = ({ label, score }: { label: string, score: number }) => {
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
                return "Googlability: Reasonably unique (and domain name available)";
            case "pron":
                return "Pronounceability: You can read it out loud when you see it";
            case "spel":
                return "Spellability: You know how it's spelled when you hear it";
            case "verb":
                return "Verbability: The name (or variant thereof) can be used as a verb";
            default:
                return undefined;
        }
    })();

    return (
        <div className={`h-full w-full text-sm font-semibold content-center ${backgroundColor}`} title={hoverText}>
            {label.toUpperCase()}
        </div>
    )
}

const TotalScoreTile = ({ totalScore }: { totalScore: number }) => {
    return (
        <div className="h-full w-full text-lg font-semibold content-center bg-gray-200 text-gray-800">
            {totalScore}
        </div>
    )
}
export const DomainCard = ({ domain }: { domain: string }) => {
    const [isLiked, setIsLiked] = useState(false);
    const assessment = assessDomain(domain);
    const totalScore = assessment.evoc + assessment.brev + assessment.grep + assessment.goog + assessment.pron + assessment.spel + assessment.verb;
    return (
        <div className="grid grid-cols-11 bg-base-100 shadow-md">
            <div className="col-span-2">
                {domain}
            </div>
            <div className="col-span-1">
                <ScoreTile label="Evoc" score={assessment.evoc} />
            </div>
            <div className="col-span-1">
                <ScoreTile label="Brev" score={assessment.brev} />
            </div>
            <div className="col-span-1">
                <ScoreTile label="Grep" score={assessment.grep} />
            </div>
            <div className="col-span-1">
                <ScoreTile label="Goog" score={assessment.goog} />
            </div>
            <div className="col-span-1">
                <ScoreTile label="Pron" score={assessment.pron} />
            </div>
            <div className="col-span-1">
                <ScoreTile label="Spel" score={assessment.spel} />
            </div>
            <div className="col-span-1">
                <ScoreTile label="Verb" score={assessment.verb} />
            </div>
            <div className="col-span-1">
                <TotalScoreTile totalScore={totalScore} />
            </div>
            <div className="col-span-1 flex justify-center items-center">
                <div className="cursor-pointer" onClick={() => setIsLiked(!isLiked)}>
                    {isLiked ? <LikedIcon className="text-2xl text-red-500" /> : <UnlikedIcon className="text-2xl text-gray-500" />}
                </div>
            </div>
        </div>
    )
}