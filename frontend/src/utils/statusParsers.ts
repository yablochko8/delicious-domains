import { DomainWithStatus } from "shared/types";

/** Checks a domain can be registered (not impossible, unavailable, premium, or error) */
export const checkCanRegister = (domainWithStatus: DomainWithStatus) => {
  if (domainWithStatus.status === "impossible") return false;
  if (domainWithStatus.status === "unavailable") return false;
  if (domainWithStatus.status === "premium") return false;
  if (domainWithStatus.status === "error") return false;
  return true;
};

/** Checks a domain is "possible" (not impossible) */
export const checkIsPossible = (domainWithStatus: DomainWithStatus) => {
  if (domainWithStatus.status === "impossible") return false;
  if (domainWithStatus.status === "error") return false;
  return true;
};

/** Checks a domain is "hidden" (unavailable or premium) */
export const checkIsHidden = (domainWithStatus: DomainWithStatus) => {
  if (domainWithStatus.status === "unavailable") return true;
  if (domainWithStatus.status === "premium") return true;
  return false;
};
