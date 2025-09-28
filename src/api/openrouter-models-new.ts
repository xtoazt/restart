import { OpenRouterModel } from '@/types/openrouter'

// Complete list of free OpenRouter models
export const FREE_OPENROUTER_MODELS: OpenRouterModel[] = [
  {
    id: "x-ai/grok-4-fast:free",
    name: "xAI: Grok 4 Fast",
    description: "xAI's Grok 4 Fast model with 2M token context",
    context_length: 2000000,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "grok", instruct_type: "chat" },
    top_provider: { context_length: 2000000, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "2000000", completion_tokens: "8192" }
  },
  {
    id: "nvidia/nemotron-nano-9b-v2:free",
    name: "NVIDIA: Nemotron Nano 9B V2",
    description: "NVIDIA's Nemotron Nano 9B V2 model with 128K token context",
    context_length: 128000,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "nemotron", instruct_type: "chat" },
    top_provider: { context_length: 128000, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "128000", completion_tokens: "4096" }
  },
  {
    id: "deepseek/deepseek-chat-v3.1:free",
    name: "DeepSeek: DeepSeek V3.1",
    description: "DeepSeek V3.1 with 163K token context",
    context_length: 163840,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "deepseek", instruct_type: "chat" },
    top_provider: { context_length: 163840, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "163840", completion_tokens: "8192" }
  },
  {
    id: "openai/gpt-oss-120b:free",
    name: "OpenAI: gpt-oss-120b",
    description: "OpenAI's open source 120B parameter model",
    context_length: 32768,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "gpt", instruct_type: "chat" },
    top_provider: { context_length: 32768, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "32768", completion_tokens: "4096" }
  },
  {
    id: "openai/gpt-oss-20b:free",
    name: "OpenAI: gpt-oss-20b",
    description: "OpenAI's open source 20B parameter model",
    context_length: 131072,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "gpt", instruct_type: "chat" },
    top_provider: { context_length: 131072, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "131072", completion_tokens: "4096" }
  },
  {
    id: "z-ai/glm-4.5-air:free",
    name: "Z.AI: GLM 4.5 Air",
    description: "Z.AI's GLM 4.5 Air model with 131K token context",
    context_length: 131072,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "glm", instruct_type: "chat" },
    top_provider: { context_length: 131072, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "131072", completion_tokens: "4096" }
  },
  {
    id: "qwen/qwen3-coder:free",
    name: "Qwen: Qwen3 Coder 480B A35B",
    description: "Qwen3 Coder model with 262K token context",
    context_length: 262144,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "qwen", instruct_type: "chat" },
    top_provider: { context_length: 262144, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "262144", completion_tokens: "8192" }
  },
  {
    id: "moonshotai/kimi-k2:free",
    name: "MoonshotAI: Kimi K2 0711",
    description: "MoonshotAI's Kimi K2 model with 32K token context",
    context_length: 32768,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "kimi", instruct_type: "chat" },
    top_provider: { context_length: 32768, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "32768", completion_tokens: "4096" }
  },
  {
    id: "cognitivecomputations/dolphin-mistral-24b-venice-edition:free",
    name: "Venice: Uncensored",
    description: "Venice uncensored model based on Mistral 24B",
    context_length: 32768,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "mistral", instruct_type: "chat" },
    top_provider: { context_length: 32768, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "32768", completion_tokens: "4096" }
  },
  {
    id: "google/gemma-3n-e2b-it:free",
    name: "Google: Gemma 3n 2B",
    description: "Google's Gemma 3n 2B model with 8K token context",
    context_length: 8192,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "gemma", instruct_type: "chat" },
    top_provider: { context_length: 8192, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "8192", completion_tokens: "2048" }
  },
  {
    id: "tencent/hunyuan-a13b-instruct:free",
    name: "Tencent: Hunyuan A13B Instruct",
    description: "Tencent's Hunyuan A13B Instruct model",
    context_length: 32768,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "hunyuan", instruct_type: "chat" },
    top_provider: { context_length: 32768, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "32768", completion_tokens: "4096" }
  },
  {
    id: "tngtech/deepseek-r1t2-chimera:free",
    name: "TNG: DeepSeek R1T2 Chimera",
    description: "TNG's DeepSeek R1T2 Chimera model with 163K token context",
    context_length: 163840,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "deepseek", instruct_type: "chat" },
    top_provider: { context_length: 163840, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "163840", completion_tokens: "8192" }
  },
  {
    id: "mistralai/mistral-small-3.2-24b-instruct:free",
    name: "Mistral: Mistral Small 3.2 24B",
    description: "Mistral Small 3.2 24B model with 131K token context",
    context_length: 131072,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "mistral", instruct_type: "chat" },
    top_provider: { context_length: 131072, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "131072", completion_tokens: "8192" }
  },
  {
    id: "moonshotai/kimi-dev-72b:free",
    name: "MoonshotAI: Kimi Dev 72B",
    description: "MoonshotAI's Kimi Dev 72B model with 131K token context",
    context_length: 131072,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "kimi", instruct_type: "chat" },
    top_provider: { context_length: 131072, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "131072", completion_tokens: "8192" }
  },
  {
    id: "deepseek/deepseek-r1-0528-qwen3-8b:free",
    name: "DeepSeek: Deepseek R1 0528 Qwen3 8B",
    description: "DeepSeek R1 0528 Qwen3 8B model with 131K token context",
    context_length: 131072,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "deepseek", instruct_type: "chat" },
    top_provider: { context_length: 131072, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "131072", completion_tokens: "8192" }
  },
  {
    id: "deepseek/deepseek-r1-0528:free",
    name: "DeepSeek: R1 0528",
    description: "DeepSeek R1 0528 model with 163K token context",
    context_length: 163840,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "deepseek", instruct_type: "chat" },
    top_provider: { context_length: 163840, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "163840", completion_tokens: "8192" }
  },
  {
    id: "mistralai/devstral-small-2505:free",
    name: "Mistral: Devstral Small 2505",
    description: "Mistral Devstral Small 2505 model with 32K token context",
    context_length: 32768,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "mistral", instruct_type: "chat" },
    top_provider: { context_length: 32768, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "32768", completion_tokens: "4096" }
  },
  {
    id: "google/gemma-3n-e4b-it:free",
    name: "Google: Gemma 3n 4B",
    description: "Google's Gemma 3n 4B model with 8K token context",
    context_length: 8192,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "gemma", instruct_type: "chat" },
    top_provider: { context_length: 8192, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "8192", completion_tokens: "2048" }
  },
  {
    id: "meta-llama/llama-3.3-8b-instruct:free",
    name: "Meta: Llama 3.3 8B Instruct",
    description: "Meta's Llama 3.3 8B Instruct model with 128K token context",
    context_length: 128000,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "llama", instruct_type: "chat" },
    top_provider: { context_length: 128000, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "128000", completion_tokens: "8192" }
  },
  {
    id: "qwen/qwen3-4b:free",
    name: "Qwen: Qwen3 4B",
    description: "Qwen3 4B model with 40K token context",
    context_length: 40960,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "qwen", instruct_type: "chat" },
    top_provider: { context_length: 40960, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "40960", completion_tokens: "4096" }
  },
  {
    id: "qwen/qwen3-30b-a3b:free",
    name: "Qwen: Qwen3 30B A3B",
    description: "Qwen3 30B A3B model with 40K token context",
    context_length: 40960,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "qwen", instruct_type: "chat" },
    top_provider: { context_length: 40960, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "40960", completion_tokens: "4096" }
  },
  {
    id: "qwen/qwen3-8b:free",
    name: "Qwen: Qwen3 8B",
    description: "Qwen3 8B model with 40K token context",
    context_length: 40960,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "qwen", instruct_type: "chat" },
    top_provider: { context_length: 40960, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "40960", completion_tokens: "4096" }
  },
  {
    id: "qwen/qwen3-14b:free",
    name: "Qwen: Qwen3 14B",
    description: "Qwen3 14B model with 40K token context",
    context_length: 40960,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "qwen", instruct_type: "chat" },
    top_provider: { context_length: 40960, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "40960", completion_tokens: "4096" }
  },
  {
    id: "qwen/qwen3-235b-a22b:free",
    name: "Qwen: Qwen3 235B A22B",
    description: "Qwen3 235B A22B model with 131K token context",
    context_length: 131072,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "qwen", instruct_type: "chat" },
    top_provider: { context_length: 131072, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "131072", completion_tokens: "8192" }
  },
  {
    id: "tngtech/deepseek-r1t-chimera:free",
    name: "TNG: DeepSeek R1T Chimera",
    description: "TNG's DeepSeek R1T Chimera model with 163K token context",
    context_length: 163840,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "deepseek", instruct_type: "chat" },
    top_provider: { context_length: 163840, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "163840", completion_tokens: "8192" }
  },
  {
    id: "microsoft/mai-ds-r1:free",
    name: "Microsoft: MAI DS R1",
    description: "Microsoft's MAI DS R1 model with 163K token context",
    context_length: 163840,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "microsoft", instruct_type: "chat" },
    top_provider: { context_length: 163840, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "163840", completion_tokens: "8192" }
  },
  {
    id: "shisa-ai/shisa-v2-llama3.3-70b:free",
    name: "Shisa AI: Shisa V2 Llama 3.3 70B",
    description: "Shisa AI's Shisa V2 Llama 3.3 70B model with 32K token context",
    context_length: 32768,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "llama", instruct_type: "chat" },
    top_provider: { context_length: 32768, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "32768", completion_tokens: "4096" }
  },
  {
    id: "arliai/qwq-32b-arliai-rpr-v1:free",
    name: "ArliAI: QwQ 32B RpR v1",
    description: "ArliAI's QwQ 32B RpR v1 model with 32K token context",
    context_length: 32768,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "arliai", instruct_type: "chat" },
    top_provider: { context_length: 32768, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "32768", completion_tokens: "4096" }
  },
  {
    id: "agentica-org/deepcoder-14b-preview:free",
    name: "Agentica: Deepcoder 14B Preview",
    description: "Agentica's Deepcoder 14B Preview model with 96K token context",
    context_length: 96000,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "agentica", instruct_type: "chat" },
    top_provider: { context_length: 96000, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "96000", completion_tokens: "8192" }
  },
  {
    id: "moonshotai/kimi-vl-a3b-thinking:free",
    name: "MoonshotAI: Kimi VL A3B Thinking",
    description: "MoonshotAI's Kimi VL A3B Thinking model with 131K token context",
    context_length: 131072,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "kimi", instruct_type: "chat" },
    top_provider: { context_length: 131072, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "131072", completion_tokens: "8192" }
  },
  {
    id: "meta-llama/llama-4-maverick:free",
    name: "Meta: Llama 4 Maverick",
    description: "Meta's Llama 4 Maverick model with 128K token context",
    context_length: 128000,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "llama", instruct_type: "chat" },
    top_provider: { context_length: 128000, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "128000", completion_tokens: "8192" }
  },
  {
    id: "meta-llama/llama-4-scout:free",
    name: "Meta: Llama 4 Scout",
    description: "Meta's Llama 4 Scout model with 128K token context",
    context_length: 128000,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "llama", instruct_type: "chat" },
    top_provider: { context_length: 128000, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "128000", completion_tokens: "8192" }
  },
  {
    id: "qwen/qwen2.5-vl-32b-instruct:free",
    name: "Qwen: Qwen2.5 VL 32B Instruct",
    description: "Qwen2.5 VL 32B Instruct model with 8K token context",
    context_length: 8192,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "qwen", instruct_type: "chat" },
    top_provider: { context_length: 8192, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "8192", completion_tokens: "2048" }
  },
  {
    id: "deepseek/deepseek-chat-v3-0324:free",
    name: "DeepSeek: DeepSeek V3 0324",
    description: "DeepSeek V3 0324 model with 163K token context",
    context_length: 163840,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "deepseek", instruct_type: "chat" },
    top_provider: { context_length: 163840, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "163840", completion_tokens: "8192" }
  },
  {
    id: "mistralai/mistral-small-3.1-24b-instruct:free",
    name: "Mistral: Mistral Small 3.1 24B",
    description: "Mistral Small 3.1 24B model with 128K token context",
    context_length: 128000,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "mistral", instruct_type: "chat" },
    top_provider: { context_length: 128000, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "128000", completion_tokens: "8192" }
  },
  {
    id: "google/gemma-3-4b-it:free",
    name: "Google: Gemma 3 4B",
    description: "Google's Gemma 3 4B model with 32K token context",
    context_length: 32768,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "gemma", instruct_type: "chat" },
    top_provider: { context_length: 32768, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "32768", completion_tokens: "4096" }
  },
  {
    id: "google/gemma-3-12b-it:free",
    name: "Google: Gemma 3 12B",
    description: "Google's Gemma 3 12B model with 32K token context",
    context_length: 32768,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "gemma", instruct_type: "chat" },
    top_provider: { context_length: 32768, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "32768", completion_tokens: "4096" }
  },
  {
    id: "google/gemma-3-27b-it:free",
    name: "Google: Gemma 3 27B",
    description: "Google's Gemma 3 27B model with 96K token context",
    context_length: 96000,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "gemma", instruct_type: "chat" },
    top_provider: { context_length: 96000, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "96000", completion_tokens: "8192" }
  },
  {
    id: "nousresearch/deephermes-3-llama-3-8b-preview:free",
    name: "Nous: DeepHermes 3 Llama 3 8B Preview",
    description: "Nous Research's DeepHermes 3 Llama 3 8B Preview model with 131K token context",
    context_length: 131072,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "llama", instruct_type: "chat" },
    top_provider: { context_length: 131072, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "131072", completion_tokens: "8192" }
  },
  {
    id: "cognitivecomputations/dolphin3.0-r1-mistral-24b:free",
    name: "Dolphin3.0 R1 Mistral 24B",
    description: "Dolphin3.0 R1 Mistral 24B model with 32K token context",
    context_length: 32768,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "mistral", instruct_type: "chat" },
    top_provider: { context_length: 32768, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "32768", completion_tokens: "4096" }
  },
  {
    id: "cognitivecomputations/dolphin3.0-mistral-24b:free",
    name: "Dolphin3.0 Mistral 24B",
    description: "Dolphin3.0 Mistral 24B model with 32K token context",
    context_length: 32768,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "mistral", instruct_type: "chat" },
    top_provider: { context_length: 32768, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "32768", completion_tokens: "4096" }
  },
  {
    id: "qwen/qwen2.5-vl-72b-instruct:free",
    name: "Qwen: Qwen2.5 VL 72B Instruct",
    description: "Qwen2.5 VL 72B Instruct model with 131K token context",
    context_length: 131072,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "qwen", instruct_type: "chat" },
    top_provider: { context_length: 131072, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "131072", completion_tokens: "8192" }
  },
  {
    id: "mistralai/mistral-small-24b-instruct-2501:free",
    name: "Mistral: Mistral Small 3",
    description: "Mistral Small 3 model with 32K token context",
    context_length: 32768,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "mistral", instruct_type: "chat" },
    top_provider: { context_length: 32768, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "32768", completion_tokens: "4096" }
  },
  {
    id: "deepseek/deepseek-r1-distill-llama-70b:free",
    name: "DeepSeek: R1 Distill Llama 70B",
    description: "DeepSeek R1 Distill Llama 70B model with 8K token context",
    context_length: 8192,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "deepseek", instruct_type: "chat" },
    top_provider: { context_length: 8192, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "8192", completion_tokens: "2048" }
  },
  {
    id: "deepseek/deepseek-r1:free",
    name: "DeepSeek: R1",
    description: "DeepSeek R1 model with 163K token context",
    context_length: 163840,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "deepseek", instruct_type: "chat" },
    top_provider: { context_length: 163840, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "163840", completion_tokens: "8192" }
  },
  {
    id: "google/gemini-2.0-flash-exp:free",
    name: "Google: Gemini 2.0 Flash Experimental",
    description: "Google's Gemini 2.0 Flash Experimental model with 1M token context",
    context_length: 1048576,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "gemini", instruct_type: "chat" },
    top_provider: { context_length: 1048576, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "1048576", completion_tokens: "32768" }
  },
  {
    id: "meta-llama/llama-3.3-70b-instruct:free",
    name: "Meta: Llama 3.3 70B Instruct",
    description: "Meta's Llama 3.3 70B Instruct model with 65K token context",
    context_length: 65536,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "llama", instruct_type: "chat" },
    top_provider: { context_length: 65536, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "65536", completion_tokens: "4096" }
  },
  {
    id: "qwen/qwen-2.5-coder-32b-instruct:free",
    name: "Qwen2.5 Coder 32B Instruct",
    description: "Qwen2.5 Coder 32B Instruct model with 32K token context",
    context_length: 32768,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "qwen", instruct_type: "chat" },
    top_provider: { context_length: 32768, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "32768", completion_tokens: "4096" }
  },
  {
    id: "meta-llama/llama-3.2-3b-instruct:free",
    name: "Meta: Llama 3.2 3B Instruct",
    description: "Meta's Llama 3.2 3B Instruct model with 131K token context",
    context_length: 131072,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "llama", instruct_type: "chat" },
    top_provider: { context_length: 131072, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "131072", completion_tokens: "8192" }
  },
  {
    id: "qwen/qwen-2.5-72b-instruct:free",
    name: "Qwen2.5 72B Instruct",
    description: "Qwen2.5 72B Instruct model with 32K token context",
    context_length: 32768,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "qwen", instruct_type: "chat" },
    top_provider: { context_length: 32768, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "32768", completion_tokens: "4096" }
  },
  {
    id: "mistralai/mistral-nemo:free",
    name: "Mistral: Mistral Nemo",
    description: "Mistral Nemo model with 131K token context",
    context_length: 131072,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "mistral", instruct_type: "chat" },
    top_provider: { context_length: 131072, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "131072", completion_tokens: "8192" }
  },
  {
    id: "google/gemma-2-9b-it:free",
    name: "Google: Gemma 2 9B",
    description: "Google's Gemma 2 9B model with 8K token context",
    context_length: 8192,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "gemma", instruct_type: "chat" },
    top_provider: { context_length: 8192, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "8192", completion_tokens: "2048" }
  },
  {
    id: "mistralai/mistral-7b-instruct:free",
    name: "Mistral: Mistral 7B Instruct",
    description: "Mistral 7B Instruct model with 32K token context",
    context_length: 32768,
    pricing: { prompt: "0", completion: "0" },
    architecture: { modality: "text", tokenizer: "mistral", instruct_type: "chat" },
    top_provider: { context_length: 32768, max_completion_tokens: undefined },
    per_request_limits: { prompt_tokens: "32768", completion_tokens: "4096" }
  }
]
