import { useCallback } from 'react'
import { useStore } from '../store'
import { sendStreamingChatCompletion } from '@/api/openrouter'
import { sendLLM7StreamingChatCompletion } from '@/api/llm7'
import { OpenRouterChatRequest } from '@/types/openrouter'
import { LLM7ChatRequest } from '@/types/llm7'
import { type ChatMessage } from '@/types/os'

const useMultiProviderStreamHandler = () => {
  const setMessages = useStore((state) => state.setMessages)
  const setIsStreaming = useStore((state) => state.setIsStreaming)
  const setStreamingErrorMessage = useStore((state) => state.setStreamingErrorMessage)
  const selectedProvider = useStore((state) => state.selectedProvider)
  const selectedModel = useStore((state) => state.selectedModel)

  const handleStreamResponse = useCallback(
    async (input: string) => {
      setIsStreaming(true)
      setStreamingErrorMessage('')

      // Add user message
      const userMessage: ChatMessage = {
        role: 'user',
        content: input,
        created_at: Math.floor(Date.now() / 1000)
      }

      // Add assistant message placeholder
      const assistantMessage: ChatMessage = {
        role: 'agent',
        content: '',
        created_at: Math.floor(Date.now() / 1000) + 1
      }

      setMessages((prevMessages) => [...prevMessages, userMessage, assistantMessage])

      try {
        // Get current messages from store
        const currentMessages = useStore.getState().messages
        
        // Convert existing messages to the appropriate format
        const formattedMessages = currentMessages.map(msg => ({
          role: msg.role === 'agent' ? 'assistant' as const : msg.role as 'user' | 'system',
          content: msg.content
        }))

        // Add the new user message
        formattedMessages.push({
          role: 'user',
          content: input
        })

        let response: Response

        if (selectedProvider === 'openrouter') {
          const request: OpenRouterChatRequest = {
            model: selectedModel,
            messages: formattedMessages,
            stream: true,
            temperature: 0.7,
            max_tokens: 4000
          }
          response = await sendStreamingChatCompletion(request)
        } else {
          const request: LLM7ChatRequest = {
            model: selectedModel,
            messages: formattedMessages,
            stream: true,
            temperature: 0.7,
            max_tokens: 4000
          }
          response = await sendLLM7StreamingChatCompletion(request)
        }

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error?.message || 'Failed to get response')
        }

        if (!response.body) {
          throw new Error('No response body')
        }

        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let buffer = ''

        const processStream = async (): Promise<void> => {
          const { done, value } = await reader.read()
          
          if (done) {
            setIsStreaming(false)
            return
          }

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() || '' // Keep incomplete line in buffer

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6)
              
              if (data === '[DONE]') {
                setIsStreaming(false)
                return
              }

              try {
                const chunk = JSON.parse(data)
                
                if (chunk.choices && chunk.choices[0]?.delta?.content) {
                  const content = chunk.choices[0].delta.content
                  
                  setMessages((prevMessages) => {
                    const newMessages = [...prevMessages]
                    const lastMessage = newMessages[newMessages.length - 1]
                    
                    if (lastMessage && lastMessage.role === 'agent') {
                      lastMessage.content += content
                    }
                    
                    return newMessages
                  })
                }
              } catch (error) {
                console.error('Error parsing stream chunk:', error)
              }
            }
          }

          await processStream()
        }

        await processStream()
      } catch (error) {
        console.error('Streaming error:', error)
        setStreamingErrorMessage(error instanceof Error ? error.message : 'Unknown error')
        
        // Mark the last message as having an error
        setMessages((prevMessages) => {
          const newMessages = [...prevMessages]
          const lastMessage = newMessages[newMessages.length - 1]
          if (lastMessage && lastMessage.role === 'agent') {
            lastMessage.streamingError = true
          }
          return newMessages
        })
      } finally {
        setIsStreaming(false)
      }
    },
    [
      setMessages,
      setIsStreaming,
      setStreamingErrorMessage,
      selectedProvider,
      selectedModel
    ]
  )

  return { handleStreamResponse }
}

export default useMultiProviderStreamHandler
