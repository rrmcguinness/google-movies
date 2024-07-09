
export interface GenerativeConfig {
  modelName: string
  genAIToken: string
  instructions: string
  temperature: number
  topP: number
  topK: number
  maxTokenCount: number
}

export interface Config {
  customerName: string
  engineerLdap: string
  generativeConfig: GenerativeConfig
  defaultLanguage: string
  supportedLanguages: string[]

  promptDetectCategories: string

  promptExtractProductDetail: string

  promptTranslateProductDetail: string
}

export interface ConfigContext {
  config: Config
  setConfig: (config: Config) => null
}

export const defaultConfig = (): Config => {
  const api_key = import.meta.env.VITE_GEMINI_API_KEY
  const conf = {} as Config
  conf.defaultLanguage = "EN"
  conf.customerName = ""
  conf.engineerLdap = ""
  
  conf.generativeConfig = {
    modelName: "gemini-1.5-flash",
    genAIToken: (api_key) ? api_key : "",
    instructions: "You are an cinephile, a movie buff in knowledgeable about all generas and categories of movies and will answer the following questions",
    temperature: 0.9,
    topP: 0.94,
    topK: 32,
    maxTokenCount: 10000
  } as GenerativeConfig


  // The more categories, the longer it will take to generate
  conf.promptDetectCategories = `
- Suggest the top 4 categories and their top 15 attributes from the image.
    
Example JSON Output: [\${category_model}]
  `.trim()

  conf.promptExtractProductDetail = `Execute the following instructions:
- Extract the movie title as the attribute 'name'.
- Extract a list of actors and actresses and their character names into the attribute 'actors' using {name: "", characterName: ""} as the values
- Write an enriched movie description including plot and subplots in markdown format for an online catalog as the attribute 'description'.
- Write the HTML SEO description and keywords for the product as 'seoHtmlHeader'
- Extract the movie specific values from the following attributes: \${category_attributes} as a json array named attributeValues like: \${product_attribute_value_model}
- Example JSON Output: \${product_json}`.trim()
  
  conf.promptTranslateProductDetail = `Translate the json values in this JSON Object: \${product_json} from language: \${base_language} to: \${target_language}`.trim()
  
  return conf
}

