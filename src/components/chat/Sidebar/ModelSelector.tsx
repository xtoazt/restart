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
      <div className="flex h-9 w-full items-center gap-3 rounded-xl border border-primary/15 bg-accent p-3">
        <Skeleton className="h-4 w-4 rounded" />
        <Skeleton className="h-3 w-24" />
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="text-xs font-medium uppercase text-primary mb-2">
        Model
      </div>
      <Select open={isOpen} onOpenChange={setIsOpen}>
        <SelectTrigger 
          className="h-9 w-full rounded-xl border border-primary/15 bg-accent p-3 text-xs font-medium uppercase text-muted hover:bg-accent/80"
        >
          <div className="flex items-center gap-3">
            {currentModel && (() => {
              const provider = getProviderFromModel(currentModel.id, selectedProvider)
              const icon = getProviderIcon(provider)
              return icon ? <Icon type={icon} className="shrink-0" size="xs" /> : null
            })()}
            <SelectValue placeholder="Select Model">
              {currentModel ? currentModel.name || currentModel.id : 'Select Model'}
            </SelectValue>
          </div>
        </SelectTrigger>
        <SelectContent className="max-h-60">
          {availableModels.map((model) => {
            const baseModel = model as BaseModel
            const provider = getProviderFromModel(model.id, selectedProvider)
            const icon = getProviderIcon(provider)
            
            return (
              <SelectItem 
                key={model.id} 
                value={model.id}
                className="flex items-center gap-3 p-3"
                onSelect={() => selectModel(model.id)}
              >
                <div className="flex items-center gap-3">
                  {icon && <Icon type={icon} className="shrink-0" size="xs" />}
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{baseModel.name || model.id}</span>
                    {baseModel.description && (
                      <span className="text-xs text-muted-foreground">
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