import { TOTAL_SCORE_MAX } from "../config";
import { DomainAssessment, DomainWithStatus } from "shared/types";

/** Always returns rounded numbers */
export const getTotalScore = (
  assessment: DomainAssessment | undefined,
  percentifyNumber: boolean = false
): number => {
  if (!assessment) return 0;
  if (!assessment.isPossible) return -3;
  if (!assessment.isAvailable) return -2;
  if (!assessment.isCheap) return -1;
  if (!assessment.scores) return 0;

  const absoluteTotal = Object.values(assessment.scores).reduce(
    (sum, score) => sum + score,
    0
  );

  const roundedPercentNumber = Math.round(
    (absoluteTotal / TOTAL_SCORE_MAX) * 100
  );

  return percentifyNumber ? roundedPercentNumber : absoluteTotal;
};

/** Always returns rounded numbers */
export const getTotalScoreV2 = (
  assessment: DomainWithStatus | undefined,
  percentifyNumber: boolean = false
): number => {
  if (!assessment) return 0;
  if (assessment.status === "impossible") return -3;
  if (assessment.status === "unavailable") return -2;
  if (assessment.status === "premium") return -1;
  if (!assessment.scores) return 0;

  const absoluteTotal = Object.values(assessment.scores).reduce(
    (sum, score) => sum + score,
    0
  );

  const roundedPercentNumber = Math.round(
    (absoluteTotal / TOTAL_SCORE_MAX) * 100
  );

  return percentifyNumber ? roundedPercentNumber : absoluteTotal;
};
