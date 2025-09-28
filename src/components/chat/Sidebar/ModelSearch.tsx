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
    if (!searchQuery.trim()) {
      return showAllModels ? allModels : (availableModels as UnifiedModel[])
    }

    const query = searchQuery.toLowerCase()
    return allModels.filter(model => {
      const modelName = 'name' in model ? model.name : model.id
      const description = 'description' in model ? model.description : undefined
      return modelName.toLowerCase().includes(query) ||
        model.id.toLowerCase().includes(query) ||
        (description && description.toLowerCase().includes(query))
    })
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
        <div className="text-xs font-semibold uppercase tracking-wider text-primary/70 mb-3">
          Provider
        </div>
        <Select value={selectedProvider} onValueChange={(value) => onProviderSelect(value as Provider)}>
          <SelectTrigger className="h-11 w-full rounded-xl border border-primary/10 bg-background/50 backdrop-blur-sm p-3 text-sm font-medium text-primary hover:bg-background/70 hover:border-primary/20 transition-all duration-200 focus:ring-2 focus:ring-blue-500/20">
            <div className="flex items-center gap-3">
              <Icon type="open-ai" className="shrink-0" size="sm" />
              <SelectValue placeholder="Select Provider">
                {providers.find(p => p.value === selectedProvider)?.label}
              </SelectValue>
            </div>
          </SelectTrigger>
          <SelectContent className="max-h-60 bg-background/95 backdrop-blur-xl border border-primary/10 text-primary shadow-xl">
            {providers.map((provider) => (
              <SelectItem 
                key={provider.value} 
                value={provider.value}
                className="flex items-center gap-3 p-3 text-primary hover:bg-white/10 focus:bg-white/10 transition-colors cursor-pointer"
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
        <div className="text-xs font-semibold uppercase tracking-wider text-primary/70 mb-3">
          Search Models
        </div>
        <div className="relative">
          <Input
            type="text"
            placeholder="Search models by name, ID, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-11 w-full rounded-xl border border-primary/10 bg-background/50 backdrop-blur-sm px-4 py-3 text-sm text-primary placeholder:text-muted focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
          />
          <Icon 
            type="search" 
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted" 
            size="sm" 
          />
        </div>
      </div>

      {/* Show All Models Toggle */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="showAllModels"
          checked={showAllModels}
          onChange={(e) => setShowAllModels(e.target.checked)}
          className="rounded border-primary/20 bg-background/50 text-blue-500 focus:ring-blue-500/20"
        />
        <label htmlFor="showAllModels" className="text-xs text-primary/70 cursor-pointer">
          Show all available models (including premium)
        </label>
      </div>

      {/* Model Selector */}
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-primary/70 mb-3">
          Model
        </div>
        <Select value={selectedModel} onValueChange={onModelSelect}>
          <SelectTrigger className="h-11 w-full rounded-xl border border-primary/10 bg-background/50 backdrop-blur-sm p-3 text-sm font-medium text-primary hover:bg-background/70 hover:border-primary/20 transition-all duration-200 focus:ring-2 focus:ring-blue-500/20">
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
              <SelectValue placeholder="Select Model">
                  {selectedModel ? 
                  (() => {
                    const model = allModels.find(m => m.id === selectedModel)
                    return model ? (('name' in model && model.name) || model.id) : selectedModel
                  })() : 
                  'Select Model'
                }
              </SelectValue>
            </div>
          </SelectTrigger>
          <SelectContent className="max-h-80 bg-background/95 backdrop-blur-xl border border-primary/10 text-primary shadow-xl">
            {Object.entries(groupedModels).map(([provider, models]) => (
              <div key={provider}>
                <div className="px-3 py-2 text-xs font-semibold text-primary/50 uppercase tracking-wider border-b border-primary/10">
                  {provider === 'openrouter' ? 'OpenRouter' : 'LLM7'} ({models.length} models)
                </div>
                {models.map((model) => {
                  const icon = getProviderIcon(model.provider || provider)
                  
                  return (
                    <SelectItem 
                      key={model.id} 
                      value={model.id}
                      className={`flex items-center gap-3 p-3 text-primary transition-colors cursor-pointer ${
                        model.isFree === false 
                          ? 'opacity-60 hover:bg-white/5 focus:bg-white/5' 
                          : 'hover:bg-white/10 focus:bg-white/10'
                      }`}
                      onSelect={() => onModelSelect(model.id)}
                    >
                      <div className="flex items-center gap-3 w-full">
                        {icon && <Icon type={icon} className="shrink-0" size="sm" />}
                        <div className="flex flex-col flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{('name' in model && model.name) || model.id}</span>
                            {model.isFree === false && (
                              <span className="text-xs bg-blue-900/30 text-blue-300 px-2 py-0.5 rounded-full">
                                Premium
                              </span>
                            )}
                            {model.isFree === true && (
                              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                                Free
                              </span>
                            )}
                          </div>
                          {'description' in model && model.description && (
                            <span className="text-xs text-muted">
                              {model.description}
                            </span>
                          )}
                          {'pricing' in model && model.pricing && (
                            <span className="text-xs text-muted">
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
