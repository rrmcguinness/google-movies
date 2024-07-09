import { Config } from "../model/config";

import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";

export const getGeminiModel = (config: Config): GenerativeModel => {
  const genAI = new GoogleGenerativeAI(config.generativeConfig.genAIToken)

  const model = genAI.getGenerativeModel({ 
    model: config.generativeConfig.modelName,
    systemInstruction: config.generativeConfig.instructions
  })

  model.generationConfig = {
    responseMimeType: "application/json",
    temperature: config.generativeConfig.temperature,
    topP: config.generativeConfig.topP,
    topK: config.generativeConfig.topK,
    maxOutputTokens: config.generativeConfig.maxTokenCount
  }
  return model
}