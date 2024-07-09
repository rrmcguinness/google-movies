import { Config } from "../model/config";
import { Product } from "../model/model";

import { GenerativeContentBlob, GenerativeModel, GoogleGenerativeAI, InlineDataPart, TextPart } from "@google/generative-ai";

var generativeModel: GenerativeModel|null = null

export const getGeminiModel = (config: Config): GenerativeModel => {
  if (generativeModel === null) {
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
    generativeModel = model
  }
  return generativeModel
}

export const generateProductInformation = async (
  imgBase64: string,
  config: Config,
  product: Product): Promise<Product> => {

  const model = getGeminiModel(config)

  let prompt = config.promptExtractProductDetail
  prompt = prompt.replace("${product_json}", JSON.stringify(product))

  console.log(`Prompt: ${prompt}`)

  const result = await model.generateContent([
    {text: prompt} as TextPart,
    {inlineData: {data: imgBase64, mimeType: "image/jpeg"} as GenerativeContentBlob} as InlineDataPart
  ])

  return JSON.parse(result.response.text()) as Product;
}