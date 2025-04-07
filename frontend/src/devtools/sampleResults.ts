import { DomainAssessment, DomainScores } from "shared/types";

const blankScores: DomainScores = {
  evoc: 3,
  brev: 2,
  grep: 1,
  goog: 3,
  pron: 2,
  spel: 1,
  verb: 2,
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
