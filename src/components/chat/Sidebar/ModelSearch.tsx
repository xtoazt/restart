'use client'
import { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Icon from '@/components/ui/icon'
import { getProviderIcon } from '@/lib/modelProvider'
import { OpenRouterModel } from '@/types/openrouter'
import { BaseModel, LLM7Model, Provider } from '@/types/llm7'
import { ALL_OPENROUTER_MODELS } from '@/api/openrouter-comprehensive-models'
import { LLM7_MODELS } from '@/api/llm7'

// Union type for all possible models
type UnifiedModel = (OpenRouterModel & { provider?: string }) | (LLM7Model & { provider?: string; isFree?: boolean })

interface ModelSearchProps {
  selectedModel: string
  selectedProvider: string
  onModelSelect: (modelId: string) => void
  onProviderSelect: (provider: Provider) => Promise<void>
  availableModels: (OpenRouterModel | BaseModel)[]
}

const ModelSearch = ({
  selectedModel,
  selectedProvider,
  onModelSelect,
  onProviderSelect,
  availableModels
}: ModelSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showAllModels, setShowAllModels] = useState(false)

  // Combine all models from both providers
  const allModels = useMemo((): UnifiedModel[] => {
    const openRouterModels: UnifiedModel[] = ALL_OPENROUTER_MODELS.map(model => ({
      ...model,
      provider: 'openrouter'
    }))
    
    const llm7Models: UnifiedModel[] = LLM7_MODELS.map(model => ({
      ...model,
      provider: 'llm7',
      isFree: true // LLM7 models are generally free
    }))

    return [...openRouterModels, ...llm7Models]
  }, [])

  // Filter models based on search query
  const filteredModels = useMemo((): UnifiedModel[] => {
    // Always start with all models for search functionality
    let modelsToFilter = allModels
    
    // If not showing all models, filter to only available models first
    if (!showAllModels) {
      const availableModelIds = new Set(availableModels.map(m => m.id))
      modelsToFilter = allModels.filter(model => availableModelIds.has(model.id))
    }

    // Apply search filter if there's a query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      const results = modelsToFilter.filter(model => {
        const modelName = 'name' in model ? model.name : model.id
        const description = 'description' in model ? model.description : undefined
        return modelName.toLowerCase().includes(query) ||
          model.id.toLowerCase().includes(query) ||
          (description && description.toLowerCase().includes(query))
      })
      
      return results
    }

    return modelsToFilter
  }, [searchQuery, showAllModels, allModels, availableModels])

  // Group models by provider
  const groupedModels = useMemo(() => {
    const groups: { [key: string]: UnifiedModel[] } = {}
    
    filteredModels.forEach(model => {
      const provider = model.provider || 'unknown'
      if (!groups[provider]) {
        groups[provider] = []
      }
      groups[provider].push(model)
    })

    return groups
  }, [filteredModels])

  const providers = [
    { value: 'openrouter', label: 'OpenRouter', icon: 'open-ai' },
    { value: 'llm7', label: 'LLM7', icon: 'open-ai' }
  ]

  return (
    <div className="w-full space-y-4">
      {/* Provider Selector */}
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-white/70 mb-3">
          Provider
        </div>
        <Select value={selectedProvider} onValueChange={async (value) => {
          try {
            await onProviderSelect(value as Provider)
          } catch (error) {
            console.error('Error selecting provider:', error)
          }
        }}>
          <SelectTrigger className="h-11 w-full rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm p-3 text-sm font-medium text-white hover:bg-white/20 hover:border-white/30 transition-all duration-200 focus:ring-2 focus:ring-white/20">
            <div className="flex items-center gap-3">
              <Icon type="open-ai" className="shrink-0" size="sm" />
              <SelectValue placeholder="Select Provider" className="truncate">
                {providers.find(p => p.value === selectedProvider)?.label}
              </SelectValue>
            </div>
          </SelectTrigger>
          <SelectContent className="max-h-60 w-full min-w-[200px] bg-black/95 backdrop-blur-xl border border-white/20 text-white shadow-xl">
            {providers.map((provider) => (
              <SelectItem 
                key={provider.value} 
                value={provider.value}
                className="flex items-center gap-3 p-3 text-white hover:bg-white/10 focus:bg-white/10 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Icon type={provider.icon as 'open-ai'} className="shrink-0" size="sm" />
                  <span className="text-sm font-medium">{provider.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Search Input */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-white/70">
            Search Models
          </div>
          {searchQuery && (
            <div className="text-xs text-white/60">
              {filteredModels.length} result{filteredModels.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>
        <div className="relative">
          <Input
            type="text"
            placeholder="Search models by name, ID, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-11 w-full rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-3 pr-10 text-sm text-white placeholder:text-white/50 focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all duration-200"
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
            >
              <Icon type="x" size="sm" />
            </button>
          ) : (
            <Icon 
              type="search" 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60" 
              size="sm" 
            />
          )}
        </div>
      </div>

      {/* Show All Models Toggle */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="showAllModels"
          checked={showAllModels}
          onChange={(e) => setShowAllModels(e.target.checked)}
          className="rounded border-white/20 bg-white/10 text-white focus:ring-white/20"
        />
        <label htmlFor="showAllModels" className="text-xs text-white/70 cursor-pointer">
          Show all available models (including premium)
        </label>
      </div>

      {/* Model Selector */}
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-white/70 mb-3">
          Model
        </div>
        <Select value={selectedModel} onValueChange={onModelSelect}>
          <SelectTrigger className="h-11 w-full rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm p-3 text-sm font-medium text-white hover:bg-white/20 hover:border-white/30 transition-all duration-200 focus:ring-2 focus:ring-white/20">
            <div className="flex items-center gap-3">
              {selectedModel && (() => {
                const model = allModels.find(m => m.id === selectedModel)
                if (model) {
                  const provider = model.provider || selectedProvider
                  const icon = getProviderIcon(provider)
                  return icon ? <Icon type={icon} className="shrink-0" size="sm" /> : null
                }
                return null
              })()}
              <SelectValue placeholder="Select Model" className="truncate">
                  {selectedModel ? 
                  (() => {
                    const model = allModels.find(m => m.id === selectedModel)
                    const displayName = model ? (('name' in model && model.name) || model.id) : selectedModel
                    return displayName.length > 30 ? `${displayName.substring(0, 30)}...` : displayName
                  })() : 
                  'Select Model'
                }
              </SelectValue>
            </div>
          </SelectTrigger>
          <SelectContent className="max-h-80 w-full min-w-[300px] bg-black/95 backdrop-blur-xl border border-white/20 text-white shadow-xl">
            {Object.entries(groupedModels).map(([provider, models]) => (
              <div key={provider}>
                <div className="px-3 py-2 text-xs font-semibold text-white/50 uppercase tracking-wider border-b border-white/10">
                  {provider === 'openrouter' ? 'OpenRouter' : 'LLM7'} ({models.length} models)
                </div>
                {models.map((model) => {
                  const icon = getProviderIcon(model.provider || provider)
                  
                  return (
                    <SelectItem 
                      key={model.id} 
                      value={model.id}
                      className={`flex items-center gap-3 p-3 text-white transition-colors cursor-pointer ${
                        model.isFree === false 
                          ? 'opacity-60 hover:bg-white/5 focus:bg-white/5' 
                          : 'hover:bg-white/10 focus:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3 w-full">
                        {icon && <Icon type={icon} className="shrink-0" size="sm" />}
                        <div className="flex flex-col flex-1 min-w-0">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-sm font-medium truncate flex-1">{('name' in model && model.name) || model.id}</span>
                            {model.isFree === false && (
                              <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">
                                Premium
                              </span>
                            )}
                            {model.isFree === true && (
                              <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">
                                Free
                              </span>
                            )}
                          </div>
                          {'description' in model && model.description && (
                            <span className="text-xs text-white/60 truncate">
                              {model.description}
                            </span>
                          )}
                          {'pricing' in model && model.pricing && (
                            <span className="text-xs text-white/60 truncate">
                              ${model.pricing.prompt}/${model.pricing.completion} per 1M tokens
                            </span>
                          )}
                        </div>
                      </div>
                    </SelectItem>
                  )
                })}
              </div>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default ModelSearch
