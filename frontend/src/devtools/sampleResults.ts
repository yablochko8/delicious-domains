import { DomainAssessment, DomainScores } from "shared/types";

const blankScores: DomainScores = {
  evoc: 4,
  brev: 6,
  pron: 8,
  spel: 9,
  legs: 3,
  find: 7,
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
