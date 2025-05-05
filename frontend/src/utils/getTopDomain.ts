import { DomainAssessment } from "shared/types";
import { getTotalScore } from "./getTotalScore";

/** Pass this an array of assessments, and it will return the top domain. */
export const getTopDomain = (assessments: DomainAssessment[]): string => {
  if (assessments.length === 0) {
    console.error("No top domain found");
    return "error-no-domains-found";
  }
  const topDomain = assessments.reduce((highest, current) => {
    const highestScore = getTotalScore(highest);
    const currentScore = getTotalScore(current);
    return currentScore > highestScore ? current : highest;
  }, assessments[0]);

  if (!topDomain) {
    console.error("No top domain found");
    return "error-no-top-domain-found";
  }
  return topDomain.domain;
};
