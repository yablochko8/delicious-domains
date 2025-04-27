import { sendLLMRequest } from "utils/sendLLMRequest";
import { validTlds } from "../tlds";
import { jsonToArray } from "utils/jsonToArray";
import { CandidatesRequest } from "shared/types";

const MAX_ROOT_LENGTH = 10;

const generateSystemPrompt = (
  allowedTlds: string[]
) => `You are a domain name suggestion engine. Your task is to generate domain name suggestions that are both practical and memorable.

Rules for domain names:
1. Format: Each name must be "root.tld". Alliteration between the root and TLD (e.g. "liffey.life") is preferred when possible.
2. Root requirements:
   - Single word
   - Maximum ${MAX_ROOT_LENGTH} characters
   - Must be pronounceable (although it doesn't have to be a "real" word from the dictionary)
   - No special characters or numbers
3. TLD (domain extension) must be one of: ${allowedTlds.join(", ")}

If the user mentions a specific name, include it. For example, if the user says "The app is called Yummi" then every domain name you generate should include "yummi" in the root.

Return the results in this exact JSON format:
{
  "domains": ["example.com", "example.net"]
}
All domain names must strictly follow the rules above. If a domain does not meet the requirements, exclude it from the list.

Important: Ensure the response is valid JSON and all TLDs are from the provided list.`;

type GenerateUserPromptParams = Omit<CandidatesRequest, "model">;

const generateUserPrompt = ({
  purpose,
  vibe,
  targetQuantity,
  preferredTlds,
  likedDomains,
  rejectedDomains,
  unratedDomains,
}: GenerateUserPromptParams) => {
  const tldInsertion = preferredTlds?.length
    ? `\nIf possible, use these TLDs: ${preferredTlds}`
    : "";

  const hasFeedback =
    (likedDomains && likedDomains.length > 0) ||
    (rejectedDomains && rejectedDomains.length > 0) ||
    (unratedDomains && unratedDomains.length > 0);

  const likedDomainsInsertion = likedDomains
    ? `\n- Liked domains: ${likedDomains.join(", ")}`
    : "";

  const rejectedDomainsInsertion = rejectedDomains
    ? `\n- Rejected domains: ${rejectedDomains.join(", ")}`
    : "";

  const unratedDomainsInsertion = unratedDomains
    ? `\n- Unrated domains: ${unratedDomains.join(", ")}`
    : "";

  const feedbackInsertion = hasFeedback
    ? `\nThe user has already reviewed these domains:
      ${likedDomainsInsertion}
      ${rejectedDomainsInsertion}
      ${unratedDomainsInsertion}
      \nAvoid all of the above in your suggestions..`
    : "";

  return `Generate ${targetQuantity} domain names with these requirements:
- Purpose: ${purpose}
- Desired vibe: ${vibe}

The domains should be:
- Memorable and brandable
- Reflect the stated purpose and vibe
- Use appropriate TLDs from the provided list (and use a variety of different TLDs)
- Currently feasible (avoid obvious trademarks)

Prioritize originality and names that are unlikely to already be registered. Avoid obvious or popular trademarks. Some of the suggestions can be quirky, but not all.

${tldInsertion}
${feedbackInsertion}

Focus on the purpose above — this is the most critical input. Make sure every domain name clearly aligns with this purpose:
${purpose}
`;
};

export const getDomainCandidates = async ({
  purpose,
  vibe,
  model,
  targetQuantity,
  preferredTlds,
  likedDomains,
  rejectedDomains,
  unratedDomains,
}: CandidatesRequest): Promise<string[]> => {
  const tldList = preferredTlds?.length ? preferredTlds : validTlds;
  const systemPrompt = generateSystemPrompt(tldList);
  const userPrompt = generateUserPrompt({
    purpose,
    vibe,
    targetQuantity,
    preferredTlds,
    likedDomains,
    rejectedDomains,
    unratedDomains,
  });

  const response = await sendLLMRequest(model, systemPrompt, userPrompt);

  return jsonToArray(response, "domains");
};
