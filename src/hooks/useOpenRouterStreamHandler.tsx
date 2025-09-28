import { useCallback } from 'react'
import { useStore } from '../store'
import { sendStreamingChatCompletion } from '@/api/openrouter'
import { OpenRouterChatRequest, OpenRouterStreamChunk } from '@/types/openrouter'
import { type ChatMessage } from '@/types/os'

const useOpenRouterStreamHandler = () => {
  const setMessages = useStore((state) => state.setMessages)
  const setIsStreaming = useStore((state) => state.setIsStreaming)
  const setStreamingErrorMessage = useStore((state) => state.setStreamingErrorMessage)
  const selectedOpenRouterModel = useStore((state) => state.selectedOpenRouterModel)
  const messages = useStore((state) => state.messages)

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
        // Convert existing messages to OpenRouter format
        const openRouterMessages = messages.map(msg => ({
          role: msg.role === 'agent' ? 'assistant' as const : msg.role as 'user' | 'system',
          content: msg.content
        }))

        // Add the new user message
        openRouterMessages.push({
          role: 'user',
          content: input
        })

        const request: OpenRouterChatRequest = {
          model: selectedOpenRouterModel,
          messages: openRouterMessages,
          stream: true,
          temperature: 0.7,
          max_tokens: 4000
        }

        const response = await sendStreamingChatCompletion(request)

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
                const chunk: OpenRouterStreamChunk = JSON.parse(data)
                
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
      selectedOpenRouterModel,
      messages
    ]
  )

  return { handleStreamResponse }
}

export default useOpenRouterStreamHandler
