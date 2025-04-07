import { DomainAssessment, DomainScores } from "shared/types";
import { sendLLMRequest } from "utils/sendLLMRequest";

const assessmentPromptSystem = `
You are a brand name assessor. Your task is to assess a domain name and provide a score for each of the following criteria:

  evoc: "Evocativity: Conveys at least a hint of what it's naming",
  brev: "Brevity: Shorter = better",
  grep: "Greppability: Not a substring of common words",
  goog: "Googlability: Reasonably unique",
  pron: "Pronounceability: You can read it out loud when you see it. Bonus points for alliteration or related patterns, including classy consonance, arrogant assonance, and explosive plosives.",
  spel: "Spellability: You know how it's spelled when you hear it",
  verb: "Verbability: The core name - the first part of the domain name - can be used as a verb"

  Each score should be between 1 and 3.

  The scores should be returned in a JSON format.
  Example:
  {
    "evoc": 3,
    "brev": 2,
    "grep": 1,
    "goog": 3,
    "pron": 2,
    "spel": 3,
    "verb": 1
  }
`;

export const addScoresToDomain = async (
  input: DomainAssessment
): Promise<DomainAssessment> => {
  return {
    ...input,
    scores: await scoreDomain(input.domain),
  };
};

/** 0 is unassessed. 1 is red, 2 is yellow, 3 is green */
export const scoreDomain = async (domain: string): Promise<DomainScores> => {
  // First pass - try to get all scores from LLM
  const attemptedScores = await sendLLMRequest(
    "gpt-4o-mini",
    assessmentPromptSystem,
    domain
  );

  const parsedScores = JSON.parse(attemptedScores);

  const aiScores = {
    evoc: Number(parsedScores?.evoc) || 0,
    brev: Number(parsedScores?.brev) || 0,
    grep: Number(parsedScores?.grep) || 0,
    goog: Number(parsedScores?.goog) || 0,
    pron: Number(parsedScores?.pron) || 0,
    spel: Number(parsedScores?.spel) || 0,
    verb: Number(parsedScores?.verb) || 0,
  };

  const calculatedBrevScore = (() => {
    const domainLength = domain.length;
    switch (true) {
      case domainLength <= 8:
        return 3;
      case domainLength <= 12:
        return 2;
      default:
        return 1;
    }
  })();

  console.log("Brev score comparison", calculatedBrevScore, aiScores.brev);

  return { ...aiScores, brev: calculatedBrevScore };
};
