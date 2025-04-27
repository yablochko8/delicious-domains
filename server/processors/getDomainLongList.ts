import { sendLLMRequest } from "utils/sendLLMRequest";
import { validTlds } from "../tlds";
import { jsonToArray } from "utils/jsonToArray";
import { Feedback } from "shared/types";

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

const generateUserPrompt = (
  purpose: string,
  vibe: string,
  shortlist: string,
  theme: string,
  targetQuantity: number,
  preferredTlds?: string[],
  feedback?: Feedback
) => {
  const themeInsertion = theme
    ? `\nIdeally choose examples relevant to this theme: ${theme}`
    : "";
  const shortlistInsertion = shortlist
    ? `\nNote the user has already drafted this list of ideas: ${shortlist} (though we don't need to stick to these).`
    : "";

  const tldInsertion = preferredTlds?.length
    ? `\nIf possible, use these TLDs: ${preferredTlds}`
    : "";

  const feedbackInsertion = feedback
    ? `\nPreviously viewed domains: ${feedback.viewed.join(", ")} 
      \n- Liked: ${feedback.liked.join(", ")} 
      \n- Rejected: ${feedback.rejected.join(", ")} 
      \nAvoid all of the above in your suggestions..`
    : "";

  return `Generate ${targetQuantity} domain names with these requirements:
- Purpose: ${purpose}
- Desired vibe: ${vibe}${themeInsertion}

The domains should be:
- Memorable and brandable
- Reflect the stated purpose and vibe
- Use appropriate TLDs from the provided list
- Currently feasible (avoid obvious trademarks)

Prioritize originality and names that are unlikely to already be registered. Avoid obvious or popular trademarks. Some of the suggestions can be quirky, but not all.

${shortlistInsertion}
${tldInsertion}
${feedbackInsertion}

Focus on the purpose above — this is the most critical input. Make sure every domain name clearly aligns with this purpose:
${purpose}
`;
};

export const getDomainLongList = async (
  purpose: string,
  vibe: string,
  shortlist: string,
  theme: string,
  model: string,
  targetQuantity: number,
  preferredTlds?: string[],
  feedback?: Feedback
): Promise<string[]> => {
  const tldList = preferredTlds?.length ? preferredTlds : validTlds;
  const systemPrompt = generateSystemPrompt(tldList);
  const userPrompt = generateUserPrompt(
    purpose,
    vibe,
    shortlist,
    theme,
    targetQuantity,
    preferredTlds,
    feedback
  );

  const response = await sendLLMRequest(model, systemPrompt, userPrompt);

  return jsonToArray(response, "domains");
};
