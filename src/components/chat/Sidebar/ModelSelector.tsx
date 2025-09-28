'use client'
import { useState, useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Icon from '@/components/ui/icon'
import { getProviderIcon, getProviderFromModelId } from '@/lib/modelProvider'
import useOpenRouterActions from '@/hooks/useOpenRouterActions'
import { useStore } from '@/store'
import { Skeleton } from '@/components/ui/skeleton'

const ModelSelector = () => {
  const { loadModels, selectModel, availableModels, selectedOpenRouterModel } = useOpenRouterActions()
  const isModelsLoading = useStore((state) => state.isModelsLoading)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (availableModels.length === 0) {
      loadModels()
    }
  }, [availableModels.length, loadModels])


  const selectedModel = availableModels.find(m => m.id === selectedOpenRouterModel)

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
      <Select open={isOpen} onOpenChange={setIsOpen}>
        <SelectTrigger 
          className="h-9 w-full rounded-xl border border-primary/15 bg-accent p-3 text-xs font-medium uppercase text-muted hover:bg-accent/80"
        >
          <div className="flex items-center gap-3">
            {selectedModel && (() => {
              const provider = getProviderFromModelId(selectedModel.id)
              const icon = getProviderIcon(provider)
              return icon ? <Icon type={icon} className="shrink-0" size="xs" /> : null
            })()}
            <SelectValue placeholder="Select Model">
              {selectedModel ? selectedModel.name : 'Select Model'}
            </SelectValue>
          </div>
        </SelectTrigger>
        <SelectContent className="max-h-60">
          {availableModels.map((model) => {
            const provider = getProviderFromModelId(model.id)
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
                    <span className="text-sm font-medium">{model.name}</span>
                    {model.description && (
                      <span className="text-xs text-muted-foreground">
                        {model.description}
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
