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
  'meta-llama': 'open-ai', // Use OpenAI icon for Meta Llama
  'google': 'gemini',
  'microsoft': 'azure',
  'perplexity': 'open-ai', // Use OpenAI icon for Perplexity
  'qwen': 'open-ai', // Use OpenAI icon for Qwen
  'mistralai': 'mistral',
  // LLM7 specific providers
  'llm7': 'open-ai', // Use OpenAI icon for LLM7
  'nebulablock': 'open-ai', // Use OpenAI icon for NebulaBlock
  'nebius': 'open-ai' // Use OpenAI icon for Nebius
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

export const getProviderFromModel = (modelId: string, provider: string): string => {
  // For LLM7 models, use the owned_by field or infer from model name
  if (provider === 'llm7') {
    if (modelId.includes('deepseek')) return 'deepseek'
    if (modelId.includes('gemini')) return 'google'
    if (modelId.includes('mistral')) return 'mistralai'
    if (modelId.includes('gpt')) return 'openai'
    if (modelId.includes('qwen')) return 'open-ai' // Use OpenAI icon for Qwen
    if (modelId.includes('gemma')) return 'google'
    return 'llm7'
  }
  
  // For OpenRouter models
  if (modelId.includes('/')) {
    const [modelProvider] = modelId.split('/')
    return modelProvider
  }
  
  return provider
}
