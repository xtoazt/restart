// LLM7 API types
export interface LLM7Message {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface LLM7ChatRequest {
  model: string
  messages: LLM7Message[]
  stream?: boolean
  temperature?: number
  max_tokens?: number
  top_p?: number
  frequency_penalty?: number
  presence_penalty?: number
}

export interface LLM7ChatResponse {
  id: string
  object: string
  created: number
  model: string
  choices: Array<{
    index: number
    message: LLM7Message
    finish_reason: string | null
  }>
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

export interface LLM7StreamChunk {
  id: string
  object: string
  created: number
  model: string
  choices: Array<{
    index: number
    delta: {
      role?: string
      content?: string
    }
    finish_reason: string | null
  }>
}

export interface LLM7Model {
  id: string
  object: string
  created: number
  owned_by: string
  modalities: {
    input: string[]
  }
}

export interface LLM7ModelsResponse {
  data: LLM7Model[]
}

// Provider types
export type Provider = 'openrouter' | 'llm7'

export interface ProviderConfig {
  name: string
  baseUrl: string
  apiKeys: string[]
  currentKeyIndex: number
}

// Union type for models from different providers
export interface BaseModel {
  id: string
  name?: string
  description?: string
}
