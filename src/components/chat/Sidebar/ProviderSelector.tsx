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
      <div className="text-xs font-semibold uppercase tracking-wider text-primary/70 mb-3">
        Provider
      </div>
      <Select value={selectedProvider} onValueChange={selectProvider}>
        <SelectTrigger className="h-11 w-full rounded-xl border border-primary/10 bg-background/50 backdrop-blur-sm p-3 text-sm font-medium text-primary hover:bg-background/70 hover:border-primary/20 transition-all duration-200 focus:ring-2 focus:ring-brand/20">
          <div className="flex items-center gap-3">
            <Icon type="open-ai" className="shrink-0" size="sm" />
            <SelectValue>
              {providers.find(p => p.value === selectedProvider)?.label}
            </SelectValue>
          </div>
        </SelectTrigger>
        <SelectContent className="max-h-60 bg-background/95 backdrop-blur-xl border border-primary/10 text-primary shadow-xl">
          {providers.map((provider) => (
            <SelectItem 
              key={provider.value} 
              value={provider.value}
              className="flex items-center gap-3 p-3 text-primary hover:bg-accent/50 focus:bg-accent/50 transition-colors"
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
  )
}

export default ProviderSelector
