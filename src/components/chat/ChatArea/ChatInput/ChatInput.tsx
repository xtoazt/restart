'use client'
import { useState, useRef } from 'react'
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
  const [attachedFiles, setAttachedFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const isStreaming = useStore((state) => state.isStreaming)
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    const validFiles = files.filter(file => {
      const maxSize = 10 * 1024 * 1024 // 10MB
      const validTypes = ['image/', 'text/', 'application/pdf', 'application/json']
      
      if (file.size > maxSize) {
        toast.error(`File ${file.name} is too large. Maximum size is 10MB.`)
        return false
      }
      
      if (!validTypes.some(type => file.type.startsWith(type))) {
        toast.error(`File type ${file.type} is not supported.`)
        return false
      }
      
      return true
    })
    
    setAttachedFiles(prev => [...prev, ...validFiles])
    if (validFiles.length > 0) {
      toast.success(`${validFiles.length} file(s) attached successfully!`)
    }
  }

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    if (!inputMessage.trim() && attachedFiles.length === 0) return

    const currentMessage = inputMessage
    const currentFiles = attachedFiles
    setInputMessage('')
    setAttachedFiles([])

    try {
      // For now, just send the text message
      // TODO: Implement file handling in the stream response
      if (currentFiles.length > 0) {
        toast.info(`Files attached: ${currentFiles.map(f => f.name).join(', ')}. File processing coming soon!`)
      }
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
    <div className="relative mx-auto mb-6 flex w-full max-w-4xl flex-col gap-3 font-geist">
      {/* Attached Files Display */}
      {attachedFiles.length > 0 && (
        <div className="flex flex-wrap gap-2 p-3 bg-white/5 rounded-xl border border-white/10">
          {attachedFiles.map((file, index) => (
            <div key={index} className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
              <Icon type="file" size="sm" className="text-white/70" />
              <span className="text-sm text-white/80 truncate max-w-[200px]">{file.name}</span>
              <button
                onClick={() => removeFile(index)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <Icon type="x" size="sm" />
              </button>
            </div>
          ))}
        </div>
      )}
      
      {/* Input Area */}
      <div className="flex items-end justify-center gap-x-3">
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
        
        {/* File Upload Button */}
        <Button
          onClick={() => fileInputRef.current?.click()}
          disabled={!selectedModel || isStreaming}
          size="icon"
          variant="outline"
          className="h-[52px] w-[52px] rounded-xl"
        >
          <Icon type="paperclip" className="text-white" size="sm" />
        </Button>
        
        {/* Send Button */}
        <Button
          onClick={handleSubmit}
          disabled={
            !selectedModel || (!inputMessage.trim() && attachedFiles.length === 0) || isStreaming
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
      
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,text/*,.pdf,.json,.txt,.md"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  )
}

export default ChatInput
