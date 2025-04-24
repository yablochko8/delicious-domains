import { deepseekClient } from "./clientDeepseek";
import { openaiClient } from "./clientOpenai";

const SUPPORTED_MODELS = [
  "gpt-4o-mini",
  "gpt-4.1-mini",
  // "o1-mini",
  "deepseek-chat",
  // "deepseek-reasoner",
];

const getClient = (model: string) => {
  if (!SUPPORTED_MODELS.includes(model)) {
    throw new Error(`Invalid model: ${model}`);
  }
  return model.startsWith("deepseek") ? deepseekClient : openaiClient;
};

export const sendLLMRequest = async (
  model: string,
  systemPrompt: string,
  userPrompt: string
): Promise<string> => {
  // Most models expect the first message to be a system message
  // Models that start with o1 need the first message to be a user message
  const firstMessageRole = model.startsWith("o1") ? "user" : "system";

  try {
    const completion = await getClient(model).chat.completions.create({
      messages: [
        { role: firstMessageRole, content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      model: model,
    });

    // console.log("Raw API response:", JSON.stringify(completion, null, 2));

    const response = completion.choices[0];
    console.log("First choice:", response);

    if (!response?.message?.content) {
      console.error("No content in response");
      return "";
    }

    const content = response.message.content;
    console.log("Content to parse:", content);

    // Remove any markdown code block syntax, handling various formats
    const cleanedContent = content
      .replace(/```(?:json)?\n?/g, "")
      .replace(/`/g, "")
      .trim();

    console.log("Cleaned content:", cleanedContent);

    return cleanedContent;
  } catch (error) {
    console.error("Error calling LLM:", error);
    return "";
  }
};
