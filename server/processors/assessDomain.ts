import { DomainAssessment, DomainScores } from "shared/types";
import { sendLLMRequest } from "utils/sendLLMRequest";
import { scoreExplanationDict } from "../../frontend/src/assets/scoreExplanations";

const assessmentPromptSystem = `
You are a brand name assessor. Your task is to assess a domain name and provide a score for each of the following criteria:

  evoc (${scoreExplanationDict.evoc.name}): ${scoreExplanationDict.evoc.description},
  brev (${scoreExplanationDict.brev.name}): ${scoreExplanationDict.brev.description},
  pron (${scoreExplanationDict.pron.name}): ${scoreExplanationDict.pron.description},
  find (${scoreExplanationDict.find.name}): ${scoreExplanationDict.find.description},
  spel (${scoreExplanationDict.spel.name}): ${scoreExplanationDict.spel.description},
  legs (${scoreExplanationDict.legs.name}): ${scoreExplanationDict.legs.description},

  Each score should be between 1 and 3.

  The scores should be returned in a JSON format.
  Example:
  {
    "evoc": 3,
    "brev": 2,
    "pron": 2,
    "find": 3
    "spel": 3,
    "legs": 1,
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

  let parsedScores;
  try {
    parsedScores = JSON.parse(attemptedScores);
  } catch (error) {
    console.error("Failed to parse LLM response as JSON:", error);
    parsedScores = {};
  }

  const aiScores = {
    evoc: Number(parsedScores?.evoc) || 0,
    brev: Number(parsedScores?.brev) || 0,
    pron: Number(parsedScores?.pron) || 0,
    find: Number(parsedScores?.find) || 0,
    spel: Number(parsedScores?.spel) || 0,
    legs: Number(parsedScores?.legs) || 0,
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
