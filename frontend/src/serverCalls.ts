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

export const checkHeartbeat = async (): Promise<void> => {
  const response = await fetch(`${SERVER_PATH}/heartbeat`);
  const json = await response.json();
  console.log("Warmup ping sent. Server response:", json.message);
};
