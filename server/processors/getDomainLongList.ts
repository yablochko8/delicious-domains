import { sendLLMRequest } from "utils/sendLLMRequest";
import { validTlds } from "../tlds";
import { jsonToArray } from "utils/jsonToArray";
import { Feedback } from "shared/types";

const generateSystemPrompt = (
  allowedTlds: string[]
) => `You are a brand name suggestion engine. Your task is to generate domain name suggestions that are both practical and memorable.

Rules for domain names:
1. Format: Each name must be "root.tld". Alliteration across these two words (e.g. "liffey.life") is encouraged.
2. Root requirements:
   - Single word
   - Maximum 10 characters
   - Must be pronounceable (although it doesn't have to be a "real" word from the dictionary)
   - No special characters or numbers
3. TLD (domain extension) must be one of: ${allowedTlds.join(", ")}

Return the results in this exact JSON format:
{
  "domains": ["example.com", "example.net"]
}

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
    ? `\nThe user has already viewed these domains: ${feedback.viewed.join(
        ", "
      )}. They liked these domains: ${feedback.liked.join(
        ", "
      )}. They rejected these domains: ${feedback.rejected.join(
        ", "
      )}. Learn from this, and don't suggest any of the above domains again.`
    : "";

  return `Generate ${targetQuantity} domain names with these requirements:
- Purpose: ${purpose}
- Desired vibe: ${vibe}${themeInsertion}

The domains should be:
- Memorable and brandable
- Reflect the stated purpose and vibe
- Use appropriate TLDs from the provided list
- Currently feasible (avoid obvious trademarks)
- Quirky, we're looking for available domains that are not already taken

${shortlistInsertion}
${tldInsertion}
${feedbackInsertion}

Remember the most important input here is the purpose of the project, which is:
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

  console.log("Sending prompts:", { systemPrompt, userPrompt });

  const response = await sendLLMRequest(model, systemPrompt, userPrompt);

  console.log("Response:", response);

  return jsonToArray(response, "domains");
};
