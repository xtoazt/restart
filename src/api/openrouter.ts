import { toast } from 'sonner'
import { APIRoutes } from './routes'
import { 
  OpenRouterChatRequest, 
  OpenRouterModelsResponse, 
  OpenRouterModel 
} from '@/types/openrouter'

const OPENROUTER_API_KEY = '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'

export const getOpenRouterModels = async (): Promise<OpenRouterModel[]> => {
  try {
    const response = await fetch(APIRoutes.Models, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      }
    })
    
    if (!response.ok) {
      toast.error(`Failed to fetch models: ${response.statusText}`)
      return []
    }
    
    const data: OpenRouterModelsResponse = await response.json()
    return data.data
  } catch (error) {
    console.error('Error fetching OpenRouter models:', error)
    toast.error('Error fetching models')
    return []
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
