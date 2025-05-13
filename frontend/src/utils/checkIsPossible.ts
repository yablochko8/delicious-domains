import { DomainWithStatus } from "shared/types";

export const checkIsPossible = (domainWithStatus: DomainWithStatus) => {
  if (domainWithStatus.status === "impossible") return false;
  if (domainWithStatus.status === "unavailable") return false;
  if (domainWithStatus.status === "premium") return false;
  return true;
};
