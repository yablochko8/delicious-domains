import { DomainAssessment, DomainScores } from "shared/types";
import { sendLLMRequest } from "utils/sendLLMRequest";
import { scoreExplanationDict } from "../../frontend/src/assets/scoreExplanations";
import {
  addDomainScoresCache,
  checkDomainScoresCache,
} from "caching/domainScoresCache";

const assessmentPromptSystem = `
You are a brand name assessor. Your task is to assess a domain name and provide a score for each of the following criteria:

  evoc (${scoreExplanationDict.evoc.name}): ${scoreExplanationDict.evoc.description},
  pron (${scoreExplanationDict.pron.name}): ${scoreExplanationDict.pron.description},
  find (${scoreExplanationDict.find.name}): ${scoreExplanationDict.find.description},
  spel (${scoreExplanationDict.spel.name}): ${scoreExplanationDict.spel.description},
  legs (${scoreExplanationDict.legs.name}): ${scoreExplanationDict.legs.description},

  Each score should be between 0 and 10.

  The scores should be returned in a JSON format.
  Example:
  {
    "evoc": 8,
    "pron": 6,
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
  //0th pass - check cache
  const cachedScores = checkDomainScoresCache(domain);
  if (cachedScores) {
    console.log("Success! Cached domain scores found for:", domain);
    return cachedScores;
  }

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
    // brev: Number(parsedScores?.brev) || 0,
    pron: Number(parsedScores?.pron) || 0,
    find: Number(parsedScores?.find) || 0,
    spel: Number(parsedScores?.spel) || 0,
    legs: Number(parsedScores?.legs) || 0,
  };

  // Everything at 8 letters or lower is considered ideal
  // Max score is 10, min score is 0
  // Each letter beyond 8 letters reduces the score by 1
  const calculatedBrevScore = Math.min(
    Math.max(10 - (domain.length - 8), 0),
    10
  );

  const finalScores = { ...aiScores, brev: calculatedBrevScore };

  addDomainScoresCache(domain, finalScores);

  return finalScores;
};
