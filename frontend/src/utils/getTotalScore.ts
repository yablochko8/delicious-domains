import { DomainAssessment } from "shared/types";

export const getTotalScore = (
  assessment: DomainAssessment | undefined
): number => {
  if (!assessment) return 0;
  if (!assessment.isPossible) return -3;
  if (!assessment.isAvailable) return -2;
  if (!assessment.isCheap) return -1;
  if (!assessment.scores) return 0;

  const summedScores = Object.values(assessment.scores).reduce(
    (sum, score) => sum + score,
    0
  );

  return summedScores;
};
