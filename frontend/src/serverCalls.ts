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
): Promise<string[]> => {
  const response = await fetch(`${SERVER_PATH}/find-domains`, {
    method: "POST",
    body: JSON.stringify({ userInput }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  const domainList: string[] = json.domains;
  console.log("The server response was:", domainList);
  return domainList;
};

export const checkHeartbeat = async (): Promise<void> => {
  const response = await fetch(`${SERVER_PATH}/heartbeat`);
  const json = await response.json();
  console.log("The server response was:", json);
};
