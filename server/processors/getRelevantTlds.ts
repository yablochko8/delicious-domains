import { validTlds } from "../tlds";
import { getAIClient } from "../utils/ClientFactory";

/**
 * This is only called when a user calls /tlds/relevant
 * It is NOT in the main suggestion flow.
 */
const getRelevantTldsPrompt = (
  purpose: string,
  vibe: string,
  shortlist: string,
  theme: string
) => {
  const themeInsertion = theme
    ? `Ideally choose examples relevant to this theme: ${theme}`
    : "";

  const shortlistInsertion = shortlist
    ? `Note the user has already drafted this list of ideas: ${shortlist} (though we don't need to stick to these).`
    : "";

  const prompt = `You are a Top Level Domain suggestion engine. Your task is to choose the top 10-20 TLDs that are both practical and marketable for a brand. The brand is going to build a website with the purpose of ${purpose} and the vibe of ${vibe}.

Please choose the top 10-20 TLDs that are both practical and marketable for a brand from the following list: ${validTlds.join(
    ", "
  )}

${themeInsertion}

${shortlistInsertion}

Return the results in this exact JSON format:
{
  "tlds": ["com", "net"]
}

Important: Ensure the response is valid JSON and all TLDs are from the provided list.`;
  return prompt;
};

export const getRelevantTlds = async (
  purpose: string,
  vibe: string,
  shortlist: string,
  theme: string,
  model: string
): Promise<string[]> => {
  const prompt = getRelevantTldsPrompt(purpose, vibe, shortlist, theme);
  console.log("Prompt:", prompt);

  const completion = await getAIClient(model).chat.completions.create({
    messages: [{ role: "system", content: prompt }],
    model: model,
  });

  const response = completion.choices[0];

  console.log("Response:", response);

  try {
    const content = response.message.content || "{}";
    // Remove markdown code block syntax including backticks
    const cleanedContent = content.replace(/^```json\n|\n```$|`/g, "");

    const json = JSON.parse(cleanedContent);
    return Array.isArray(json.tlds) ? json.tlds : [];
  } catch (error) {
    console.error("Error parsing domain list response:", error);
    return [];
  }
};
