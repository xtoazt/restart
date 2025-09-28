import { IconType } from '@/components/ui/icon'

const PROVIDER_ICON_MAP: Record<string, IconType> = {
  aws: 'aws',
  openai: 'open-ai',
  anthropic: 'anthropic',
  mistral: 'mistral',
  gemini: 'gemini',
  azure: 'azure',
  groq: 'groq',
  fireworks: 'fireworks',
  deepseek: 'deepseek',
  cohere: 'cohere',
  ollama: 'ollama',
  xai: 'xai',
  // OpenRouter specific providers
  'openrouter': 'open-ai', // Use OpenAI icon for OpenRouter
  'meta': 'open-ai', // Use OpenAI icon for Meta
  'google': 'gemini',
  'microsoft': 'azure',
  'perplexity': 'open-ai' // Use OpenAI icon for Perplexity
}

export const getProviderIcon = (provider: string): IconType | null => {
  const normalizedProvider = provider.toLowerCase()
  
  // Handle OpenRouter model IDs (e.g., "openai/gpt-4o", "anthropic/claude-3")
  if (normalizedProvider.includes('/')) {
    const [modelProvider] = normalizedProvider.split('/')
    return (
      Object.entries(PROVIDER_ICON_MAP).find(([key]) =>
        modelProvider.includes(key)
      )?.[1] ?? 'open-ai' // Default to OpenAI icon
    )
  }
  
  return (
    Object.entries(PROVIDER_ICON_MAP).find(([key]) =>
      normalizedProvider.includes(key)
    )?.[1] ?? null
  )
}

export const getProviderFromModelId = (modelId: string): string => {
  if (modelId.includes('/')) {
    const [provider] = modelId.split('/')
    return provider
  }
  return 'openrouter'
}
