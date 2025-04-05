import { DomainAssessment } from "shared/types";

export const assessDomain = async (
  domain: string
): Promise<DomainAssessment> => {
  const assessment: DomainAssessment = {
    domain,
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
  };

  return assessment;
};
