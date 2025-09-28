import { useCallback } from 'react'
import { toast } from 'sonner'
import { useStore } from '../store'
import { getOpenRouterModels } from '@/api/openrouter'

const useOpenRouterActions = () => {
  const setAvailableModels = useStore((state) => state.setAvailableModels)
  const setIsModelsLoading = useStore((state) => state.setIsModelsLoading)
  const setSelectedOpenRouterModel = useStore((state) => state.setSelectedOpenRouterModel)
  const availableModels = useStore((state) => state.availableModels)
  const selectedOpenRouterModel = useStore((state) => state.selectedOpenRouterModel)

  const loadModels = useCallback(async () => {
    setIsModelsLoading(true)
    try {
      const models = await getOpenRouterModels()
      setAvailableModels(models)
      
      // Set default model if none selected
      if (!selectedOpenRouterModel && models.length > 0) {
        // Prefer GPT-4o if available, otherwise use the first model
        const gpt4o = models.find(m => m.id === 'openai/gpt-4o')
        const defaultModel = gpt4o || models[0]
        setSelectedOpenRouterModel(defaultModel.id)
      }
      
      return models
    } catch (error) {
      console.error('Error loading OpenRouter models:', error)
      toast.error('Failed to load models')
      return []
    } finally {
      setIsModelsLoading(false)
    }
  }, [setAvailableModels, setIsModelsLoading, setSelectedOpenRouterModel, selectedOpenRouterModel])

  const selectModel = useCallback((modelId: string) => {
    setSelectedOpenRouterModel(modelId)
  }, [setSelectedOpenRouterModel])

  return {
    loadModels,
    selectModel,
    availableModels,
    selectedOpenRouterModel
  }
}

export default useOpenRouterActions
