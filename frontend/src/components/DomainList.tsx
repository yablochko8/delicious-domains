import { DomainAssessment } from "shared/types";
import { DomainCard } from "./DomainCard";
import { getTotalScore } from "../utils/getTotalScore";

export const DomainList = ({
  domainOptions,
}: {
  domainOptions: DomainAssessment[];
}) => {
  // Filter out impossible domains (mainly hallucinated TLDs)
  const filteredDomainOptions = domainOptions.filter(
    (domain) => domain.isPossible
  );

  const sortedDomainOptions = filteredDomainOptions.sort(
    (a, b) => getTotalScore(b) - getTotalScore(a)
  );

  return (
    <div>
      {sortedDomainOptions.map((domainAssessment, index) => (
        <DomainCard key={index} {...domainAssessment} />
      ))}
    </div>
  );
};
