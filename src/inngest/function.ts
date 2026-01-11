import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { inngest } from "./client";

const googleAI = createGoogleGenerativeAI();
const anthropicAI = createAnthropic();
const openAI = createOpenAI();

export const execute = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ event, step }) => {
    const { steps: geminiSteps } = await step.ai.wrap(
      "gemini-generate-text",
      generateText,
      {
        model: googleAI("gemini-2.5-flash"),
        system: "You are a helpful assistant",
        prompt: "What is 22 + 44",
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      }
    );

    const { steps: openAISteps } = await step.ai.wrap(
      "openAI-generate-text",
      generateText,
      {
        model: openAI("gpt-5.1"),
        system: "You are a helpful assistant",
        prompt: "What is 22 + 44",
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      }
    );

    const { steps: anthropicSteps } = await step.ai.wrap(
      "anthropic-generate-text",
      generateText,
      {
        model: anthropicAI("claude-sonnet-4-5"),
        system: "You are a helpful assistant",
        prompt: "What is 22 + 44",
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      }
    );
    return { geminiSteps, openAISteps, anthropicSteps };
  }
);
