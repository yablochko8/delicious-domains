import { ScoreId } from "../frontend/src/assets/scoreExplanations";

export type DomainScores = {
  [key in ScoreId]: number;
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
