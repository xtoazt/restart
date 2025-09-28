import { toast } from 'sonner'
import { LLM7ChatRequest, LLM7ModelsResponse, LLM7Model, ProviderConfig } from '@/types/llm7'

// LLM7 API configuration with rotating keys
const LLM7_CONFIG: ProviderConfig = {
  name: 'LLM7',
  baseUrl: 'https://api.llm7.io/v1',
  apiKeys: process.env.LLM7_API_KEYS ? process.env.LLM7_API_KEYS.split(',') : [],
  currentKeyIndex: 0
}

// Rotate to next API key
const rotateApiKey = (): string => {
  if (LLM7_CONFIG.apiKeys.length === 0) {
    throw new Error('LLM7 API keys are not configured. Please set LLM7_API_KEYS environment variable.')
  }
  LLM7_CONFIG.currentKeyIndex = (LLM7_CONFIG.currentKeyIndex + 1) % LLM7_CONFIG.apiKeys.length
  return LLM7_CONFIG.apiKeys[LLM7_CONFIG.currentKeyIndex]
}

// Get current API key
const getCurrentApiKey = (): string => {
  if (LLM7_CONFIG.apiKeys.length === 0) {
    throw new Error('LLM7 API keys are not configured. Please set LLM7_API_KEYS environment variable.')
  }
  return LLM7_CONFIG.apiKeys[LLM7_CONFIG.currentKeyIndex]
}

export const getLLM7Models = async (): Promise<LLM7Model[]> => {
  try {
    const response = await fetch(`${LLM7_CONFIG.baseUrl}/models`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getCurrentApiKey()}`,
        'Content-Type': 'application/json',
      }
    })
    
    if (!response.ok) {
      // Try rotating key and retry once
      if (response.status === 401 || response.status === 429) {
        rotateApiKey()
        const retryResponse = await fetch(`${LLM7_CONFIG.baseUrl}/models`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${getCurrentApiKey()}`,
            'Content-Type': 'application/json',
          }
        })
        
        if (!retryResponse.ok) {
          toast.error(`Failed to fetch LLM7 models: ${retryResponse.statusText}`)
          return []
        }
        
        const data: LLM7ModelsResponse = await retryResponse.json()
        return data.data
      }
      
      toast.error(`Failed to fetch LLM7 models: ${response.statusText}`)
      return []
    }
    
    const data: LLM7ModelsResponse = await response.json()
    return data.data
  } catch (error) {
    console.error('Error fetching LLM7 models:', error)
    toast.error('Error fetching LLM7 models')
    return []
  }
}

export const sendLLM7ChatCompletion = async (
  request: LLM7ChatRequest
): Promise<Response> => {
  return fetch(`${LLM7_CONFIG.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getCurrentApiKey()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request)
  })
}

export const sendLLM7StreamingChatCompletion = async (
  request: LLM7ChatRequest
): Promise<Response> => {
  const response = await fetch(`${LLM7_CONFIG.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getCurrentApiKey()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...request,
      stream: true
    })
  })

  // If we get a 401 or 429, try with next key
  if ((response.status === 401 || response.status === 429) && !response.ok) {
    rotateApiKey()
    return fetch(`${LLM7_CONFIG.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getCurrentApiKey()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...request,
        stream: true
      })
    })
  }

  return response
}

export { LLM7_CONFIG }
