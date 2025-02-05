import { deepseekClient } from "./deepseekClient";
import { openaiClient } from "./openaiClient";

const models = ["gpt-4o-mini", "o1-mini", "deepseek-chat", "deepseek-reasoner"];

export const getAIClient = (model: string) => {
  if (!models.includes(model)) {
    throw new Error(`Invalid model: ${model}`);
  }
  return model.startsWith("deepseek") ? deepseekClient : openaiClient;
};
