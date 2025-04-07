export type DomainScores = {
  evoc: number;
  brev: number;
  grep: number;
  goog: number;
  pron: number;
  spel: number;
  verb: number;
};

export const blankScores: DomainScores = {
  evoc: 0,
  brev: 0,
  grep: 0,
  goog: 0,
  pron: 0,
  spel: 0,
  verb: 0,
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

export const exampleValid: DomainAssessment = {
  domain: "example.com",
  isPossible: true,
  isAvailable: true,
  isCheap: true,
  scores: blankScores,
};

export const exampleExpensive: DomainAssessment = {
  domain: "table.com",
  isPossible: true,
  isAvailable: true,
  isCheap: false,
  scores: blankScores,
};

export const exampleUnavailable: DomainAssessment = {
  domain: "google.com",
  isPossible: true,
  isAvailable: false,
  isCheap: false,
  scores: blankScores,
};

export const exampleImpossible: DomainAssessment = {
  domain: "kandy.kettle",
  isPossible: false,
  isAvailable: false,
  isCheap: false,
  scores: blankScores,
};
