import { toast } from 'sonner'
import { APIRoutes } from './routes'
import { 
  OpenRouterChatRequest, 
  OpenRouterModel 
} from '@/types/openrouter'

const OPENROUTER_API_KEY = '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'

// Curated list of free OpenRouter models
const FREE_OPENROUTER_MODELS: OpenRouterModel[] = [
  {
    id: "meta-llama/llama-3.3-70b-instruct",
    name: "Meta: Llama 3.3 70B Instruct",
    description: "The Meta Llama 3.3 multilingual large language model (LLM) is a pretrained and instruction tuned generative model in 70B (text in/text out). The Llama 3.3 instruction tuned text only model is optimized for multilingual dialogue use cases and outperforms many of the available open source and closed chat models on common industry benchmarks. Supported languages: English, German, French, Italian, Portuguese, Hindi, Spanish, and Thai.",
    context_length: 66000,
    pricing: {
      prompt: "0",
      completion: "0"
    },
    architecture: {
      modality: "text",
      tokenizer: "llama",
      instruct_type: "chat"
    },
    top_provider: {
      context_length: 66000,
      max_completion_tokens: undefined
    },
    per_request_limits: {
      prompt_tokens: undefined,
      completion_tokens: undefined
    }
  },
  {
    id: "qwen/qwen-2.5-coder-32b-instruct",
    name: "Qwen2.5 Coder 32B Instruct",
    description: "Qwen2.5-Coder is the latest series of Code-Specific Qwen large language models (formerly known as CodeQwen). Qwen2.5-Coder brings significantly improvements in code generation, code reasoning and code fixing. A more comprehensive foundation for real-world applications such as Code Agents. Not only enhancing coding capabilities but also maintaining its strengths in mathematics and general competencies.",
    context_length: 33000,
    pricing: {
      prompt: "0",
      completion: "0"
    },
    architecture: {
      modality: "text",
      tokenizer: "qwen",
      instruct_type: "chat"
    },
    top_provider: {
      context_length: 33000,
      max_completion_tokens: undefined
    },
    per_request_limits: {
      prompt_tokens: undefined,
      completion_tokens: undefined
    }
  },
  {
    id: "meta-llama/llama-3.2-3b-instruct",
    name: "Meta: Llama 3.2 3B Instruct",
    description: "Llama 3.2 3B is a 3-billion-parameter multilingual large language model, optimized for advanced natural language processing tasks like dialogue generation, reasoning, and summarization. Designed with the latest transformer architecture, it supports eight languages, including English, Spanish, and Hindi, and is adaptable for additional languages. Trained on 9 trillion tokens, the Llama 3.2 3B model excels in instruction-following, complex reasoning, and tool use.",
    context_length: 131000,
    pricing: {
      prompt: "0",
      completion: "0"
    },
    architecture: {
      modality: "text",
      tokenizer: "llama",
      instruct_type: "chat"
    },
    top_provider: {
      context_length: 131000,
      max_completion_tokens: undefined
    },
    per_request_limits: {
      prompt_tokens: undefined,
      completion_tokens: undefined
    }
  },
  {
    id: "qwen/qwen-2.5-72b-instruct",
    name: "Qwen2.5 72B Instruct",
    description: "Qwen2.5 72B is the latest series of Qwen large language models. Qwen2.5 brings significantly more knowledge and has greatly improved capabilities in coding and mathematics, thanks to specialized expert models in these domains. Significant improvements in instruction following, generating long texts (over 8K tokens), understanding structured data (e.g, tables), and generating structured outputs especially JSON. Long-context Support up to 128K tokens and can generate up to 8K tokens. Multilingual support for over 29 languages.",
    context_length: 33000,
    pricing: {
      prompt: "0",
      completion: "0"
    },
    architecture: {
      modality: "text",
      tokenizer: "qwen",
      instruct_type: "chat"
    },
    top_provider: {
      context_length: 33000,
      max_completion_tokens: undefined
    },
    per_request_limits: {
      prompt_tokens: undefined,
      completion_tokens: undefined
    }
  },
  {
    id: "mistralai/mistral-nemo",
    name: "Mistral: Mistral Nemo",
    description: "A 12B parameter model with a 128k token context length built by Mistral in collaboration with NVIDIA. The model is multilingual, supporting English, French, German, Spanish, Italian, Portuguese, Chinese, Japanese, Korean, Arabic, and Hindi. It supports function calling and is released under the Apache 2.0 license.",
    context_length: 131000,
    pricing: {
      prompt: "0",
      completion: "0"
    },
    architecture: {
      modality: "text",
      tokenizer: "mistral",
      instruct_type: "chat"
    },
    top_provider: {
      context_length: 131000,
      max_completion_tokens: undefined
    },
    per_request_limits: {
      prompt_tokens: undefined,
      completion_tokens: undefined
    }
  },
  {
    id: "google/gemma-2-9b-it",
    name: "Google: Gemma 2 9B",
    description: "Gemma 2 9B by Google is an advanced, open-source language model that sets a new standard for efficiency and performance in its size class. Designed for a wide variety of tasks, it empowers developers and researchers to build innovative applications, while maintaining accessibility, safety, and cost-effectiveness.",
    context_length: 8000,
    pricing: {
      prompt: "0",
      completion: "0"
    },
    architecture: {
      modality: "text",
      tokenizer: "gemma",
      instruct_type: "chat"
    },
    top_provider: {
      context_length: 8000,
      max_completion_tokens: undefined
    },
    per_request_limits: {
      prompt_tokens: undefined,
      completion_tokens: undefined
    }
  },
  {
    id: "mistralai/mistral-7b-instruct",
    name: "Mistral: Mistral 7B Instruct",
    description: "A high-performing, industry-standard 7.3B parameter model, with optimizations for speed and context length. Mistral 7B Instruct has multiple version variants, and this is intended to be the latest version.",
    context_length: 33000,
    pricing: {
      prompt: "0",
      completion: "0"
    },
    architecture: {
      modality: "text",
      tokenizer: "mistral",
      instruct_type: "chat"
    },
    top_provider: {
      context_length: 33000,
      max_completion_tokens: undefined
    },
    per_request_limits: {
      prompt_tokens: undefined,
      completion_tokens: undefined
    }
  }
]

export const getOpenRouterModels = async (): Promise<OpenRouterModel[]> => {
  try {
    // Return the curated list of free models
    return FREE_OPENROUTER_MODELS
    
    // Uncomment below to fetch from API instead (if you want dynamic model fetching)
    /*
    const response = await fetch(APIRoutes.Models, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      }
    })
    
    if (!response.ok) {
      toast.error(`Failed to fetch models: ${response.statusText}`)
      return FREE_OPENROUTER_MODELS // Fallback to curated list
    }
    
    const data: OpenRouterModelsResponse = await response.json()
    return data.data
    */
  } catch (error) {
    console.error('Error fetching OpenRouter models:', error)
    toast.error('Error fetching models')
    return FREE_OPENROUTER_MODELS // Fallback to curated list
  }
}

export const sendChatCompletion = async (
  request: OpenRouterChatRequest
): Promise<Response> => {
  return fetch(APIRoutes.ChatCompletions, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request)
  })
}

export const sendStreamingChatCompletion = async (
  request: OpenRouterChatRequest
): Promise<Response> => {
  return fetch(APIRoutes.ChatCompletions, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...request,
      stream: true
    })
  })
}