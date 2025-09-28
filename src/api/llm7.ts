import { toast } from 'sonner'
import { LLM7ChatRequest, LLM7ModelsResponse, LLM7Model, ProviderConfig } from '@/types/llm7'

// LLM7 API configuration with rotating keys
const LLM7_CONFIG: ProviderConfig = {
  name: 'LLM7',
  baseUrl: 'https://api.llm7.io/v1',
  apiKeys: [
    'jWu2HHhYpFNvFXRKxySq+nPM6MFRh5scJ8N5Mcnr19jdBd5flynfKRFgyTargFWn36Q6e+jzczISigrDIL2OrmjiDUa3R+BNpxDvM/3h5rkobD5BWqIaZQEx',
    'gb75kpKNCb6/n/OwzM1rcXwULeYeDGw2OGFGRt/CevDCCukgacfXWdQh1MxbZFcJsyQMN4u/2Qbma+DyxnbVJHvNrYREo1FVn48qxxtIlOfu3KnXbVtv6KxW',
    'wp3cRRmAesnkhi9n+ZjvHevrqSE59mqAht42fXjaSkCGyK3tgTu1BdKTIBLlA6bVcd1FNAqRQNX/6sxjnXvpOmW8faEMLjE3FjgYp3OPRfyL+XAZhOLzIUKe',
    'LZhbJUXz1MIIBZSNfp7z0iqm6QCfNpEU/P/cLkVWQgUoaTQQhnuQnX0NANpPk8BciqubYxXpqs1g7oT+v5ERrq5AEpE857fFo1HubWwCK/StEekqgWd3Rhe5'
  ],
  currentKeyIndex: 0
}

// Rotate to next API key
const rotateApiKey = (): string => {
  LLM7_CONFIG.currentKeyIndex = (LLM7_CONFIG.currentKeyIndex + 1) % LLM7_CONFIG.apiKeys.length
  return LLM7_CONFIG.apiKeys[LLM7_CONFIG.currentKeyIndex]
}

// Get current API key
const getCurrentApiKey = (): string => {
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
