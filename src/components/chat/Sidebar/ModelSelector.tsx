'use client'
import { useState, useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Icon from '@/components/ui/icon'
import { getProviderIcon, getProviderFromModel } from '@/lib/modelProvider'
import useProviderActions from '@/hooks/useProviderActions'
import { Skeleton } from '@/components/ui/skeleton'
import { BaseModel } from '@/types/llm7'

const ModelSelector = () => {
  const { 
    selectedProvider, 
    selectModel, 
    availableModels, 
    selectedModel, 
    loadModels,
    isModelsLoading 
  } = useProviderActions()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (availableModels.length === 0) {
      loadModels(selectedProvider)
    }
  }, [availableModels.length, loadModels, selectedProvider])

  const currentModel = availableModels.find(m => m.id === selectedModel) as BaseModel | undefined

  if (isModelsLoading) {
    return (
      <div className="flex h-11 w-full items-center gap-3 rounded-xl border border-primary/10 bg-background/50 backdrop-blur-sm p-3">
        <Skeleton className="h-5 w-5 rounded-full" />
        <Skeleton className="h-4 w-32" />
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="text-xs font-semibold uppercase tracking-wider text-primary/70 mb-3">
        Model
      </div>
      <Select open={isOpen} onOpenChange={setIsOpen}>
        <SelectTrigger 
          className="h-11 w-full rounded-xl border border-primary/10 bg-background/50 backdrop-blur-sm p-3 text-sm font-medium text-primary hover:bg-background/70 hover:border-primary/20 transition-all duration-200 focus:ring-2 focus:ring-brand/20"
        >
          <div className="flex items-center gap-3">
            {currentModel && (() => {
              const provider = getProviderFromModel(currentModel.id, selectedProvider)
              const icon = getProviderIcon(provider)
              return icon ? <Icon type={icon} className="shrink-0" size="sm" /> : null
            })()}
            <SelectValue placeholder="Select Model">
              {currentModel ? currentModel.name || currentModel.id : 'Select Model'}
            </SelectValue>
          </div>
        </SelectTrigger>
        <SelectContent className="max-h-60 bg-background/95 backdrop-blur-xl border border-primary/10 text-primary shadow-xl">
          {availableModels.map((model) => {
            const baseModel = model as BaseModel
            const provider = getProviderFromModel(model.id, selectedProvider)
            const icon = getProviderIcon(provider)
            
            return (
              <SelectItem 
                key={model.id} 
                value={model.id}
                className="flex items-center gap-3 p-3 text-primary hover:bg-accent/50 focus:bg-accent/50 transition-colors"
                onSelect={() => selectModel(model.id)}
              >
                <div className="flex items-center gap-3">
                  {icon && <Icon type={icon} className="shrink-0" size="sm" />}
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{baseModel.name || model.id}</span>
                    {baseModel.description && (
                      <span className="text-xs text-muted">
                        {baseModel.description}
                      </span>
                    )}
                  </div>
                </div>
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </div>
  )
}

export default ModelSelector