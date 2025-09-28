import { useCallback } from 'react'
import { toast } from 'sonner'
import { useStore } from '../store'
import { getOpenRouterModels } from '@/api/openrouter'
import { getLLM7Models } from '@/api/llm7'
import { Provider } from '@/types/llm7'
import { OpenRouterModel } from '@/types/openrouter'
import { LLM7Model } from '@/types/llm7'

const useProviderActions = () => {
  const setSelectedProvider = useStore((state) => state.setSelectedProvider)
  const setAvailableOpenRouterModels = useStore((state) => state.setAvailableOpenRouterModels)
  const setAvailableLLM7Models = useStore((state) => state.setAvailableLLM7Models)
  const setSelectedModel = useStore((state) => state.setSelectedModel)
  const setIsModelsLoading = useStore((state) => state.setIsModelsLoading)
  
  const selectedProvider = useStore((state) => state.selectedProvider)
  const availableOpenRouterModels = useStore((state) => state.availableOpenRouterModels)
  const availableLLM7Models = useStore((state) => state.availableLLM7Models)
  const selectedModel = useStore((state) => state.selectedModel)

  const loadModels = useCallback(async (provider: Provider) => {
    setIsModelsLoading(true)
    try {
      let models: OpenRouterModel[] | LLM7Model[] = []
      
      if (provider === 'openrouter') {
        models = await getOpenRouterModels()
        setAvailableOpenRouterModels(models as OpenRouterModel[])
      } else if (provider === 'llm7') {
        models = await getLLM7Models()
        setAvailableLLM7Models(models as LLM7Model[])
      }
      
      // Set default model if none selected or if provider changed
      if (models && models.length > 0) {
        let defaultModel: string
        
        if (provider === 'openrouter') {
          // Prefer Llama 3.3 70B if available, otherwise use the first model
          const llama33 = models.find(m => m.id === 'meta-llama/llama-3.3-70b-instruct')
          defaultModel = llama33 ? llama33.id : models[0].id
        } else {
          // For LLM7, prefer GPT-5 models or use the first model
          const gpt5 = models.find(m => m.id.includes('gpt-5'))
          defaultModel = gpt5 ? gpt5.id : models[0].id
        }
        
        setSelectedModel(defaultModel)
      }
      
      return models
    } catch (error) {
      console.error(`Error loading ${provider} models:`, error)
      toast.error(`Failed to load ${provider} models`)
      return []
    } finally {
      setIsModelsLoading(false)
    }
  }, [
    setAvailableOpenRouterModels,
    setAvailableLLM7Models,
    setSelectedModel,
    setIsModelsLoading
  ])

  const selectProvider = useCallback(async (provider: Provider) => {
    setSelectedProvider(provider)
    
    // Load models for the selected provider
    const currentModels = provider === 'openrouter' ? availableOpenRouterModels : availableLLM7Models
    
    if (currentModels.length === 0) {
      await loadModels(provider)
    }
  }, [
    setSelectedProvider,
    loadModels,
    availableOpenRouterModels,
    availableLLM7Models
  ])

  const selectModel = useCallback((modelId: string) => {
    setSelectedModel(modelId)
  }, [setSelectedModel])

  const getAvailableModels = useCallback(() => {
    return selectedProvider === 'openrouter' ? availableOpenRouterModels : availableLLM7Models
  }, [selectedProvider, availableOpenRouterModels, availableLLM7Models])

  return {
    selectedProvider,
    selectProvider,
    selectedModel,
    selectModel,
    availableModels: getAvailableModels(),
    loadModels,
    isModelsLoading: useStore((state) => state.isModelsLoading)
  }
}

export default useProviderActions
