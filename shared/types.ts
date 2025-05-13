import { ScoreId } from "../frontend/src/assets/scoreExplanations";

export type DomainScores = {
  [key in ScoreId]: number;
};

export type DomainStatus =
  | "fetching"
  | "unratedNew"
  | "unratedOld"
  | "liked"
  | "rejected"
  | "impossible"
  | "unavailable"
  | "premium"
  | "error";

export type DomainWithStatus = {
  domain: string;
  status: DomainStatus;
  scores?: DomainScores;
  error?: string;
};

export type DomainAssessment = {
  domain: string;
  isPossible: boolean;
  isAvailable: boolean;
  isCheap: boolean;
  scores?: DomainScores;
  status?: string;
  error?: string;
};

export type Feedback = {
  viewed: string[];
  liked: string[];
  rejected: string[];
};

// This should match the schema.prisma CandidatesRequest type (except for id, createdAt etc)
export type CandidatesRequest = {
  purpose: string;
  vibe: string;
  model: string;
  targetQuantity: number;
  preferredTlds?: string[];
  likedDomains?: string[];
  rejectedDomains?: string[];
  unratedDomains?: string[];
};
