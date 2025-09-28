'use client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Icon from '@/components/ui/icon'
import useProviderActions from '@/hooks/useProviderActions'
import { Provider } from '@/types/llm7'

const ProviderSelector = () => {
  const { selectedProvider, selectProvider } = useProviderActions()

  const providers: { value: Provider; label: string; icon: string }[] = [
    { value: 'openrouter', label: 'OpenRouter', icon: 'open-ai' },
    { value: 'llm7', label: 'LLM7', icon: 'open-ai' }
  ]

  return (
    <div className="w-full">
      <div className="text-xs font-medium uppercase text-primary mb-2">
        Provider
      </div>
      <Select value={selectedProvider} onValueChange={selectProvider}>
        <SelectTrigger className="h-9 w-full rounded-xl border border-primary/15 bg-accent p-3 text-xs font-medium uppercase text-primary hover:bg-accent/80">
          <div className="flex items-center gap-3">
            <Icon type="open-ai" className="shrink-0" size="xs" />
            <SelectValue>
              {providers.find(p => p.value === selectedProvider)?.label}
            </SelectValue>
          </div>
        </SelectTrigger>
        <SelectContent className="max-h-60 bg-background border border-primary/15 text-primary">
          {providers.map((provider) => (
            <SelectItem 
              key={provider.value} 
              value={provider.value}
              className="flex items-center gap-3 p-3 text-primary hover:bg-accent focus:bg-accent"
            >
              <div className="flex items-center gap-3">
                <Icon type={provider.icon as 'open-ai'} className="shrink-0" size="xs" />
                <span className="text-sm font-medium">{provider.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default ProviderSelector
