import OpenAI, { ClientOptions } from "openai";

const apiKey = process.env.DEEPSEEK_API_KEY;
if (!apiKey) {
  throw new Error("OPENAI_API_KEY is not set");
}

const opts: ClientOptions = {
  baseURL: "https://api.deepseek.com",
  apiKey,
};
export const deepseekClient = new OpenAI(opts);
