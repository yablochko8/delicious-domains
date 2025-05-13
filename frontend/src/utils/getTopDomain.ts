import { DomainWithStatus } from "shared/types";
import { getTotalScore } from "./getTotalScore";

// /** Pass this an array of assessments, and it will return the top domain. */
// export const getTopDomain = (assessments: DomainAssessment[]): string => {
//   if (assessments.length === 0) {
//     console.error("Empty array passed to getTopDomain");
//     return "error-empty-array-getTopDomain";
//   }
//   const topDomain = assessments.reduce((highest, current) => {
//     const highestScore = getTotalScore(highest);
//     const currentScore = getTotalScore(current);
//     return currentScore > highestScore ? current : highest;
//   }, assessments[0]);

//   return topDomain.domain;
// };

/** Pass this an array of assessments, and it will return the top domain. */
export const getTopDomain = (assessments: DomainWithStatus[]): string => {
  if (assessments.length === 0) {
    console.error("Empty array passed to getTopDomain");
    return "error-empty-array-getTopDomain";
  }
  const domainsWithStatusUnratedNew = assessments.filter(
    (domain) => domain.status === "unratedNew"
  );

  const topDomain = domainsWithStatusUnratedNew.reduce((highest, current) => {
    const highestScore = getTotalScore(highest);
    const currentScore = getTotalScore(current);
    return currentScore > highestScore ? current : highest;
  }, domainsWithStatusUnratedNew[0]);

  return topDomain.domain;
};
