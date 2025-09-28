// OpenRouter API types
export interface OpenRouterMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface OpenRouterChatRequest {
  model: string
  messages: OpenRouterMessage[]
  stream?: boolean
  temperature?: number
  max_tokens?: number
  top_p?: number
  frequency_penalty?: number
  presence_penalty?: number
}

export interface OpenRouterChatResponse {
  id: string
  object: string
  created: number
  model: string
  choices: Array<{
    index: number
    message: OpenRouterMessage
    finish_reason: string | null
  }>
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

export interface OpenRouterStreamChunk {
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

export interface OpenRouterModel {
  id: string
  name: string
  description?: string
  context_length: number
  pricing: {
    prompt: string
    completion: string
  }
  architecture: {
    modality: string
    tokenizer: string
    instruct_type?: string
  }
  top_provider: {
    context_length: number
    max_completion_tokens?: number
  }
  per_request_limits: {
    prompt_tokens?: string
    completion_tokens?: string
  }
  isFree?: boolean
  features?: string[]
  capabilities?: string[]
  useCases?: string[]
}

export interface OpenRouterModelsResponse {
  data: OpenRouterModel[]
}
