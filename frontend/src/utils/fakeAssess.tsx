import { DomainAssessment } from "shared/types";

export const exampleImpossibleDomain: DomainAssessment = {
    domain: "borgen.borgen",
    isPossible: false,
    isAvailable: false,
    isCheap: false,
    evoc: 0,
    brev: 0,
    grep: 0,
    goog: 0,
    pron: 0,
    spel: 0,
    verb: 0,
}

export const exampleUnavailableDomain: DomainAssessment = {
    domain: "google.com",
    isPossible: true,
    isAvailable: false,
    isCheap: false,
    evoc: 0,
    brev: 0,
    grep: 0,
    goog: 0,
    pron: 0,
    spel: 0,
    verb: 0,
}

export const exampleExpensiveDomain: DomainAssessment = {
    domain: "table.com",
    isPossible: true,
    isAvailable: true,
    isCheap: false,
    evoc: 0,
    brev: 0,
    grep: 0,
    goog: 0,
    pron: 0,
    spel: 0,
    verb: 0,
}
/** 0 is unassessed. 1 is red, 2 is yellow, 3 is green */
export const fakeAssess = (domain: string): DomainAssessment => {

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