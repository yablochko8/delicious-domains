const SERVER_PATH = import.meta.env.VITE_SERVER_URL;

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

// export const getAvailableTlds = async (): Promise<string[]> => {
//   const response = await fetch(`${SERVER_PATH}/tlds/all`);
//   const json = await response.json();
//   console.log("The server response was:", json);
//   const tlds: string[] = json.tlds;
//   return tlds;
// };

// export const getRelevantTlds = async (
//   userInput: UserInput
// ): Promise<string[]> => {
//   const response = await fetch(`${SERVER_PATH}/tlds/relevant`, {
//     method: "POST",
//     body: JSON.stringify({ userInput }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   const json = await response.json();
//   console.log("The server response was:", json);
//   const tlds: string[] = json.tlds;
//   return tlds;
// };
