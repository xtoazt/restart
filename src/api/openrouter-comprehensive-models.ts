import { OpenRouterModel } from '@/types/openrouter'

// Comprehensive list of OpenRouter models with pricing information
export const COMPREHENSIVE_OPENROUTER_MODELS: OpenRouterModel[] = [
  // Free Models
  {
    id: "x-ai/grok-4-fast:free",
    name: "xAI: Grok 4 Fast",
    description: "xAI's Grok 4 Fast model with 2M token context",
    context_length: 2000000,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "grok", instruct_type: "chat" },
    top_provider: { context_length: 2000000, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "2000000", completion_tokens: "8192" },
    isFree: true
  },
  {
    id: "nvidia/nemotron-nano-9b-v2:free",
    name: "NVIDIA: Nemotron Nano 9B V2",
    description: "NVIDIA's Nemotron Nano 9B V2 model with 128K token context",
    context_length: 128000,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "nemotron", instruct_type: "chat" },
    top_provider: { context_length: 128000, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "128000", completion_tokens: "4096" },
    isFree: true
  },
  {
    id: "deepseek/deepseek-chat-v3.1:free",
    name: "DeepSeek: DeepSeek V3.1",
    description: "DeepSeek V3.1 with 163K token context",
    context_length: 163840,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "deepseek", instruct_type: "chat" },
    top_provider: { context_length: 163840, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "163840", completion_tokens: "8192" },
    isFree: true
  },
  {
    id: "openai/gpt-oss-120b:free",
    name: "OpenAI: gpt-oss-120b",
    description: "OpenAI's open source 120B parameter model",
    context_length: 32768,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "gpt", instruct_type: "chat" },
    top_provider: { context_length: 32768, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "32768", completion_tokens: "4096" },
    isFree: true
  },
  {
    id: "openai/gpt-oss-20b:free",
    name: "OpenAI: gpt-oss-20b",
    description: "OpenAI's open source 20B parameter model",
    context_length: 131072,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "gpt", instruct_type: "chat" },
    top_provider: { context_length: 131072, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "131072", completion_tokens: "4096" },
    isFree: true
  },
  {
    id: "z-ai/glm-4.5-air:free",
    name: "Z.AI: GLM 4.5 Air",
    description: "Z.AI's GLM 4.5 Air model with 131K token context",
    context_length: 131072,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "glm", instruct_type: "chat" },
    top_provider: { context_length: 131072, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "131072", completion_tokens: "4096" },
    isFree: true
  },
  {
    id: "qwen/qwen3-coder:free",
    name: "Qwen: Qwen3 Coder 480B A35B",
    description: "Qwen3 Coder model with 262K token context",
    context_length: 262144,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "qwen", instruct_type: "chat" },
    top_provider: { context_length: 262144, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "262144", completion_tokens: "8192" },
    isFree: true
  },
  {
    id: "moonshotai/kimi-k2:free",
    name: "MoonshotAI: Kimi K2 0711",
    description: "MoonshotAI's Kimi K2 model with 32K token context",
    context_length: 32768,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "kimi", instruct_type: "chat" },
    top_provider: { context_length: 32768, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "32768", completion_tokens: "4096" },
    isFree: true
  },
  {
    id: "cognitivecomputations/dolphin-mistral-24b-venice-edition:free",
    name: "Venice: Uncensored",
    description: "Venice uncensored model based on Mistral 24B",
    context_length: 32768,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "mistral", instruct_type: "chat" },
    top_provider: { context_length: 32768, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "32768", completion_tokens: "4096" },
    isFree: true
  },
  {
    id: "google/gemma-3n-e2b-it:free",
    name: "Google: Gemma 3n 2B",
    description: "Google's Gemma 3n 2B model with 8K token context",
    context_length: 8192,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "gemma", instruct_type: "chat" },
    top_provider: { context_length: 8192, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "8192", completion_tokens: "2048" },
    isFree: true
  }
]

// Premium Models (non-free)
export const PREMIUM_OPENROUTER_MODELS: OpenRouterModel[] = [
  {
    id: "openai/gpt-5",
    name: "OpenAI: GPT-5",
    description: "OpenAI's most advanced model with 400K token context",
    context_length: 400000,
    pricing: { prompt: "1.25", completion: "10" },
    architecture: { modality: "text", tokenizer: "gpt", instruct_type: "chat" },
    top_provider: { context_length: 400000, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "400000", completion_tokens: "16384" },
    isFree: false
  },
  {
    id: "openai/gpt-5-chat",
    name: "OpenAI: GPT-5 Chat",
    description: "OpenAI's GPT-5 optimized for chat with 128K token context",
    context_length: 128000,
    pricing: { prompt: "1.25", completion: "10" },
    architecture: { modality: "text", tokenizer: "gpt", instruct_type: "chat" },
    top_provider: { context_length: 128000, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "128000", completion_tokens: "16384" },
    isFree: false
  },
  {
    id: "openai/gpt-5-mini",
    name: "OpenAI: GPT-5 Mini",
    description: "OpenAI's efficient GPT-5 Mini with 400K token context",
    context_length: 400000,
    pricing: { prompt: "0.25", completion: "2" },
    architecture: { modality: "text", tokenizer: "gpt", instruct_type: "chat" },
    top_provider: { context_length: 400000, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "400000", completion_tokens: "16384" },
    isFree: false
  },
  {
    id: "anthropic/claude-opus-4.1",
    name: "Anthropic: Claude Opus 4.1",
    description: "Anthropic's most capable model with 200K token context",
    context_length: 200000,
    pricing: { prompt: "15", completion: "75" },
    architecture: { modality: "text", tokenizer: "claude", instruct_type: "chat" },
    top_provider: { context_length: 200000, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "200000", completion_tokens: "8192" },
    isFree: false
  },
  {
    id: "google/gemini-2.5-pro",
    name: "Google: Gemini 2.5 Pro",
    description: "Google's most advanced Gemini model with 1M token context",
    context_length: 1048576,
    pricing: { prompt: "1.25", completion: "10" },
    architecture: { modality: "text", tokenizer: "gemini", instruct_type: "chat" },
    top_provider: { context_length: 1048576, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "1048576", completion_tokens: "32768" },
    isFree: false
  },
  {
    id: "mistralai/mistral-medium-3.1",
    name: "Mistral: Mistral Medium 3.1",
    description: "Mistral's medium model with 131K token context",
    context_length: 131072,
    pricing: { prompt: "0.40", completion: "2" },
    architecture: { modality: "text", tokenizer: "mistral", instruct_type: "chat" },
    top_provider: { context_length: 131072, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "131072", completion_tokens: "8192" },
    isFree: false
  }
]

// Combine all models
export const ALL_OPENROUTER_MODELS = [
  ...COMPREHENSIVE_OPENROUTER_MODELS,
  ...PREMIUM_OPENROUTER_MODELS
]

// Helper functions
export const getFreeModels = () => ALL_OPENROUTER_MODELS.filter(model => model.isFree)
export const getPremiumModels = () => ALL_OPENROUTER_MODELS.filter(model => !model.isFree)
export const searchModels = (query: string) => {
  const lowercaseQuery = query.toLowerCase()
  return ALL_OPENROUTER_MODELS.filter(model => 
    model.name.toLowerCase().includes(lowercaseQuery) ||
    model.id.toLowerCase().includes(lowercaseQuery) ||
    (model.description && model.description.toLowerCase().includes(lowercaseQuery))
  )
}
