import { DomainAssessment } from "shared/types";

const SERVER_PATH = import.meta.env.VITE_SERVER_URL;

type UserInput = {
  purpose: string;
  vibe: string;
  shortlist: string | null;
  model: string;
  preferredTlds?: string[];
};

export const sendInputsAndReturnDomains = async (
  userInput: UserInput
): Promise<DomainAssessment[]> => {
  const response = await fetch(`${SERVER_PATH}/find-domains`, {
    method: "POST",
    body: JSON.stringify({ userInput }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  const results: DomainAssessment[] = json.domainAssessments;
  console.log("The json response was:", json);
  console.log("The processed response was:", results);
  return results;
};

export const getLongList = async (userInput: UserInput): Promise<string[]> => {
  const response = await fetch(`${SERVER_PATH}/domain-longlist`, {
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

export const checkLimits = async (): Promise<number> => {
  const response = await fetch(`${SERVER_PATH}/limits`);
  const json = await response.json();
  return json.maxDomains;
};
