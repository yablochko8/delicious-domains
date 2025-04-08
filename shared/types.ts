export type DomainScores = {
  evoc: number;
  brev: number;
  grep: number;
  goog: number;
  pron: number;
  spel: number;
  verb: number;
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
