import { DomainAssessment } from "shared/types";
import { DomainCard } from "./DomainCard";
import { getTotalScore } from "../utils/getTotalScore";

export const DomainList = ({
  domainOptions,
}: {
  domainOptions: DomainAssessment[];
}) => {
  const sortedDomainOptions = domainOptions.sort(
    (a, b) => getTotalScore(b) - getTotalScore(a)
  );

  console.log({ domainOptions, sortedDomainOptions });
  return (
    <div>
      {sortedDomainOptions.map((domainAssessment, index) => (
        <DomainCard key={index} {...domainAssessment} />
      ))}
    </div>
  );
};
