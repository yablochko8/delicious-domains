import { DomainAssessment } from "shared/types";
import { getTotalScore } from "./getTotalScore";

/** Pass this an array of assessments, and it will return the top domain. */
export const getTopDomain = (assessments: DomainAssessment[]): string => {
  if (assessments.length === 0) {
    console.error("Empty array passed to getTopDomain");
    return "error-empty-array-getTopDomain";
  }
  const topDomain = assessments.reduce((highest, current) => {
    const highestScore = getTotalScore(highest);
    const currentScore = getTotalScore(current);
    return currentScore > highestScore ? current : highest;
  }, assessments[0]);

  return topDomain.domain;
};
