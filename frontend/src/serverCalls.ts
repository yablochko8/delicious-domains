const PORT = 4101; // change this to an import before doing anything serious
const serverPath = `http://localhost:${PORT}`;

type UserInput = {
  purpose: string;
  vibe: string;
  shortlist: string | null;
  theme: string | null;
  model: string;
  preferredTlds?: string[];
};

export const sendInputsAndReturnDomains = async (
  userInput: UserInput
): Promise<string[]> => {
  const response = await fetch(`${serverPath}/find-domains`, {
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

export const getAvailableTlds = async (): Promise<string[]> => {
  const response = await fetch(`${serverPath}/tlds/all`);
  const json = await response.json();
  console.log("The server response was:", json);
  const tlds: string[] = json.tlds;
  return tlds;
};

export const getRelevantTlds = async (
  userInput: UserInput
): Promise<string[]> => {
  const response = await fetch(`${serverPath}/tlds/relevant`, {
    method: "POST",
    body: JSON.stringify({ userInput }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  console.log("The server response was:", json);
  const tlds: string[] = json.tlds;
  return tlds;
};
