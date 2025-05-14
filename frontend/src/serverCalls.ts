import {
  CandidatesRequest,
  DomainAssessment,
  DomainWithStatus,
  Survey,
  SurveyVoteRequest,
} from "shared/types";

const SERVER_PATH = import.meta.env.VITE_SERVER_URL;

export const getDomainCandidates = async (
  userInput: CandidatesRequest
): Promise<string[]> => {
  const response = await fetch(`${SERVER_PATH}/domain-candidates`, {
    method: "POST",
    body: JSON.stringify({ userInput }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  return json.domains;
};

export const getDomainAssessment = async (
  domain: string
): Promise<DomainAssessment> => {
  const response = await fetch(`${SERVER_PATH}/domain-assessment`, {
    method: "POST",
    body: JSON.stringify({ domain }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  return json.domainAssessment;
};

export const getDomainWithStatus = async (
  domain: string
): Promise<DomainWithStatus> => {
  const response = await fetch(`${SERVER_PATH}/domain-with-status`, {
    method: "POST",
    body: JSON.stringify({ domain }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  return json.domainWithStatus;
};

export const createSurvey = async (options: string[]): Promise<Survey> => {
  const response = await fetch(`${SERVER_PATH}/survey-create`, {
    method: "POST",
    body: JSON.stringify({ options }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  return json.survey;
};

export const postSurveyVote = async (
  vote: SurveyVoteRequest
): Promise<boolean> => {
  const response = await fetch(`${SERVER_PATH}/survey-vote`, {
    method: "POST",
    body: JSON.stringify(vote),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  return json.success;
};

export const getSurvey = async (surveyId: string): Promise<Survey> => {
  const response = await fetch(`${SERVER_PATH}/survey/${surveyId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  return json.survey;
};
