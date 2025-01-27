import { validTlds } from "../tlds";
import { openaiClient } from "../utils/openaiClient";

const generateDomainListPrompt = (
  purpose: string,
  vibe: string,
  theme: string,
  preferredTlds?: string[]
) => {
  const themeInsertion = theme
    ? `

Ideally choose examples relevant to this theme: ${theme}`
    : "";

  const preferredTldsInsertion = preferredTlds
    ? `

The following TLDs are preferred: ${preferredTlds.join(", ")}`
    : "";

  const prompt = `You are a brand name suggestion engine. Your task is to generate domain name suggestions that are both practical and memorable.

Rules for domain names:
1. Format: Each name must be "root.tld". Alliteration across these two words (e.g. "liffey.life") is encouraged.
2. Root requirements:
   - Single word
   - Maximum 10 characters
   - Must be pronounceable (although it doesn't have to be a "real" word from the dictionary)
   - No special characters or numbers
3. TLD (domain extension) must be one of: ${validTlds.join(", ")}

${preferredTldsInsertion}

Context:
- Purpose: ${purpose}
- Desired vibe: ${vibe}

Generate a list of 50 domain names that:
- Are memorable and brandable
- Reflect the stated purpose and vibe
- Use appropriate TLDs from the provided list
- Are currently feasible as domain names (avoid obvious trademarks)
- Be quirky, we're looking for available domains that are not already taken

${themeInsertion}

Return the results in this exact JSON format:
{
  "domains": ["example.com", "example.net"]
}

Important: Ensure the response is valid JSON and all TLDs are from the provided list.`;

  return prompt;
};

/**
 * Takes in a messy description.
 * Sends it to LLM.
 * Returns a cleaned version.
 */
export const getDomainLongList = async (
  purpose: string,
  vibe: string,
  theme: string,
  preferredTlds?: string[]
): Promise<string[]> => {
  const prompt = generateDomainListPrompt(purpose, vibe, theme, preferredTlds);
  console.log("Prompt:", prompt);

  const completion = await openaiClient.chat.completions.create({
    messages: [{ role: "system", content: prompt }],
    model: "gpt-4o-mini",
  });

  const response = completion.choices[0];

  console.log("Response:", response);

  try {
    const content = response.message.content || "{}";
    // Remove markdown code block syntax including backticks
    const cleanedContent = content.replace(/^```json\n|\n```$|`/g, "");

    const json = JSON.parse(cleanedContent);
    return Array.isArray(json.domains) ? json.domains : [];
  } catch (error) {
    console.error("Error parsing domain list response:", error);
    return [];
  }
};
