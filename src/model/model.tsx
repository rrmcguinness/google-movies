
export interface Attribute {
  name: string
  description: string
  valueRange: string[]
}

export interface Category {
  name: string
  attributes: Attribute[]
}

export interface MovieAttributeValue {
  name: string
  value: string
}

export interface Actor {
  name: string
  characterName: string
}

export interface Movie {
  language: string
  name: string
  releaseYear: string
  description: string
  seoHtmlHeader: string
  attributeValues: MovieAttributeValue[]
  actors: Actor[]
}

export interface Image {
  uri: string
  base64: string
  type: string
}

export interface DemoModel {
  default_language: string
  image: Image
  category: Category
  movie: Movie
}

export const ProductAsJsonString = () => {
  return JSON.stringify({} as Movie)
}
