'use client'
import { useState } from 'react'
import { toast } from 'sonner'
import { TextArea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useStore } from '@/store'
import useMultiProviderStreamHandler from '@/hooks/useMultiProviderStreamHandler'
import Icon from '@/components/ui/icon'

const ChatInput = () => {
  const { chatInputRef } = useStore()

  const { handleStreamResponse } = useMultiProviderStreamHandler()
  const selectedModel = useStore((state) => state.selectedModel)
  const [inputMessage, setInputMessage] = useState('')
  const isStreaming = useStore((state) => state.isStreaming)
  const handleSubmit = async () => {
    if (!inputMessage.trim()) return

    const currentMessage = inputMessage
    setInputMessage('')

    try {
      await handleStreamResponse(currentMessage)
    } catch (error) {
      toast.error(
        `Error in handleSubmit: ${
          error instanceof Error ? error.message : String(error)
        }`
      )
    }
  }

  return (
    <div className="relative mx-auto mb-6 flex w-full max-w-2xl items-end justify-center gap-x-3 font-geist">
      <div className="relative flex-1">
        <TextArea
          placeholder={'Ask anything...'}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => {
            if (
              e.key === 'Enter' &&
              !e.nativeEvent.isComposing &&
              !e.shiftKey &&
              !isStreaming
            ) {
              e.preventDefault()
              handleSubmit()
            }
          }}
          className="w-full min-h-[52px] max-h-32 border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all duration-200 resize-none"
          disabled={!selectedModel}
          ref={chatInputRef}
        />
      </div>
      <Button
        onClick={handleSubmit}
        disabled={
          !selectedModel || !inputMessage.trim() || isStreaming
        }
        size="icon"
        className="h-[52px] w-[52px] rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
      >
        {isStreaming ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <Icon type="send" className="text-white" size="sm" />
        )}
      </Button>
    </div>
  )
}

export default ChatInput
