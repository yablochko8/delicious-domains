import { DomainAssessment } from "shared/types";

const CACHE_TTL_IN_MS = 1000 * 60 * 60 * 24; // 24 hours

// Simple in-memory cache (will do for now, later we can use Redis)
// Cache key is domain name
export const domainStatusCache = new Map<
  string,
  { domainStatus: DomainAssessment; timestamp: number }
>();

export const checkDomainStatusCache = (
  domain: string
): DomainAssessment | null => {
  const cached = domainStatusCache.get(domain);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_IN_MS) {
    return cached.domainStatus;
  }
  return null;
};

export const addDomainStatusCache = (
  domain: string,
  domainStatus: DomainAssessment
) => {
  domainStatusCache.set(domain, { domainStatus, timestamp: Date.now() });
};
