import { DomainScores } from "shared/types";

const SCORES_CACHE_TTL = 1000 * 60 * 60 * 24 * 28; // 28 days

// Simple in-memory cache (will do for now, later we can use Redis)
// Cache key is domain name
export const domainScoresCache = new Map<
  string,
  { domainScores: DomainScores; timestamp: number }
>();

export const checkDomainScoresCache = (domain: string): DomainScores | null => {
  const cached = domainScoresCache.get(domain);
  if (cached && Date.now() - cached.timestamp < SCORES_CACHE_TTL) {
    return cached.domainScores;
  }
  return null;
};

export const addDomainScoresCache = (
  domain: string,
  domainScores: DomainScores
) => {
  domainScoresCache.set(domain, {
    domainScores,
    timestamp: Date.now(),
  });
};
