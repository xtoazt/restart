import { toast } from 'sonner'
import { LLM7ChatRequest, LLM7Model } from '@/types/llm7'

// Hardcoded list of available LLM7 models
export const LLM7_MODELS: LLM7Model[] = [
  {
    id: "deepseek-v3.1",
    object: "model",
    created: 1758891961,
    owned_by: "",
    modalities: { input: ["text"] }
  },
  {
    id: "deepseek-reasoning",
    object: "model",
    created: 1758891961,
    owned_by: "",
    modalities: { input: ["text"] }
  },
  {
    id: "gemini-2.5-flash-lite",
    object: "model",
    created: 1758891961,
    owned_by: "",
    modalities: { input: ["text", "image"] }
  },
  {
    id: "gemini-search",
    object: "model",
    created: 1758891961,
    owned_by: "",
    modalities: { input: ["text", "image"] }
  },
  {
    id: "mistral-small-3.1-24b-instruct-2503",
    object: "model",
    created: 1758891961,
    owned_by: "",
    modalities: { input: ["text"] }
  },
  {
    id: "nova-fast",
    object: "model",
    created: 1758891961,
    owned_by: "",
    modalities: { input: ["text"] }
  },
  {
    id: "gpt-5-mini",
    object: "model",
    created: 1758891961,
    owned_by: "",
    modalities: { input: ["text", "image"] }
  },
  {
    id: "gpt-5-nano-2025-08-07",
    object: "model",
    created: 1758891961,
    owned_by: "",
    modalities: { input: ["text", "image"] }
  },
  {
    id: "gpt-5-chat",
    object: "model",
    created: 1758891961,
    owned_by: "",
    modalities: { input: ["text", "image"] }
  },
  {
    id: "gpt-o4-mini-2025-04-16",
    object: "model",
    created: 1758891961,
    owned_by: "",
    modalities: { input: ["text", "image"] }
  },
  {
    id: "qwen2.5-coder-32b-instruct",
    object: "model",
    created: 1758891961,
    owned_by: "",
    modalities: { input: ["text"] }
  },
  {
    id: "roblox-rp",
    object: "model",
    created: 1758891961,
    owned_by: "",
    modalities: { input: ["text"] }
  },
  {
    id: "bidara",
    object: "model",
    created: 1758891961,
    owned_by: "",
    modalities: { input: ["text", "image"] }
  },
  {
    id: "rtist",
    object: "model",
    created: 1758891961,
    owned_by: "",
    modalities: { input: ["text"] }
  },
  {
    id: "mistral-small-2503",
    object: "model",
    created: 1758891961,
    owned_by: "mistral",
    modalities: { input: ["text"] }
  },
  {
    id: "open-mixtral-8x7b",
    object: "model",
    created: 1758891961,
    owned_by: "mistral",
    modalities: { input: ["text"] }
  },
  {
    id: "deepseek-ai/DeepSeek-R1-0528",
    object: "model",
    created: 1758891961,
    owned_by: "nebulablock",
    modalities: { input: ["text"] }
  },
  {
    id: "deepseek-v3-0324",
    object: "model",
    created: 1758891961,
    owned_by: "nebulablock",
    modalities: { input: ["text"] }
  },
  {
    id: "deepseek-r1",
    object: "model",
    created: 1758891961,
    owned_by: "nebulablock",
    modalities: { input: ["text"] }
  },
  {
    id: "l3.3-ms-nevoria-70b",
    object: "model",
    created: 1758891961,
    owned_by: "nebulablock",
    modalities: { input: ["text"] }
  },
  {
    id: "l3-70b-euryale-v2.1",
    object: "model",
    created: 1758891961,
    owned_by: "nebulablock",
    modalities: { input: ["text"] }
  },
  {
    id: "l3-8b-stheno-v3.2",
    object: "model",
    created: 1758891961,
    owned_by: "nebulablock",
    modalities: { input: ["text"] }
  },
  {
    id: "gemma-2-2b-it",
    object: "model",
    created: 1758891961,
    owned_by: "nebius",
    modalities: { input: ["text"] }
  }
]

export const getLLM7Models = async (): Promise<LLM7Model[]> => {
  try {
    // Try to fetch from API first, fallback to hardcoded list
    const response = await fetch('/api/llm7/models')
    
    if (response.ok) {
      const data = await response.json()
      return data.data || LLM7_MODELS
    } else {
      // Fallback to hardcoded list if API fails
      return LLM7_MODELS
    }
  } catch (error) {
    console.error('Error fetching LLM7 models:', error)
    toast.error('Error loading llm7 models')
    return LLM7_MODELS // Return hardcoded list as fallback
  }
}

export const sendLLM7ChatCompletion = async (
  request: LLM7ChatRequest
): Promise<Response> => {
  return fetch('/api/llm7/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request)
  })
}

export const sendLLM7StreamingChatCompletion = async (
  request: LLM7ChatRequest
): Promise<Response> => {
  return fetch('/api/llm7/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...request,
      stream: true
    })
  })
}

