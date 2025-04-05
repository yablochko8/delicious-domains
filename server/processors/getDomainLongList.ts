import { validTlds } from "../tlds";
import { getAIClient } from "../utils/ClientFactory";

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
  preferredTlds?: string[]
) => {
  const themeInsertion = theme
    ? `\nIdeally choose examples relevant to this theme: ${theme}`
    : "";
  const shortlistInsertion = shortlist
    ? `\nNote the user has already drafted this list of ideas: ${shortlist} (though we don't need to stick to these).`
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

Remember the most important input here is the purpose of the project, which is:
${purpose}

${shortlistInsertion}
`;
};

export const getDomainLongList = async (
  purpose: string,
  vibe: string,
  shortlist: string,
  theme: string,
  model: string,
  targetQuantity: number,
  preferredTlds?: string[]
): Promise<string[]> => {
  const tldList = preferredTlds?.length ? preferredTlds : validTlds;
  const systemPrompt = generateSystemPrompt(tldList);
  const userPrompt = generateUserPrompt(
    purpose,
    vibe,
    shortlist,
    theme,
    targetQuantity
  );

  console.log("Sending prompts:", { systemPrompt, userPrompt });

  // Models that start with o1 need the first message to be a user message
  const firstMessageRole = model.startsWith("o1") ? "user" : "system";

  try {
    const completion = await getAIClient(model).chat.completions.create({
      messages: [
        { role: firstMessageRole, content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      model: model,
    });

    console.log("Raw API response:", JSON.stringify(completion, null, 2));

    const response = completion.choices[0];
    console.log("First choice:", response);

    if (!response?.message?.content) {
      console.error("No content in response");
      return [];
    }

    const content = response.message.content;
    console.log("Content to parse:", content);

    // Remove any markdown code block syntax, handling various formats
    const cleanedContent = content
      .replace(/```(?:json)?\n?/g, "")
      .replace(/`/g, "")
      .trim();

    console.log("Cleaned content:", cleanedContent);

    const json = JSON.parse(cleanedContent);
    return Array.isArray(json.domains) ? json.domains : [];
  } catch (error) {
    console.error("Error in getDomainLongList:", error);
    return [];
  }
};
