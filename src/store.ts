import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import {
  AgentDetails,
  SessionEntry,
  TeamDetails,
  type ChatMessage
} from '@/types/os'
import { OpenRouterModel } from '@/types/openrouter'
import { LLM7Model, Provider } from '@/types/llm7'

export interface ChatSession {
  id: string
  title: string
  messages: ChatMessage[]
  provider: Provider
  model: string
  createdAt: Date
  updatedAt: Date
}

interface Store {
  hydrated: boolean
  setHydrated: () => void
  streamingErrorMessage: string
  setStreamingErrorMessage: (streamingErrorMessage: string) => void
  endpoints: {
    endpoint: string
    id__endpoint: string
  }[]
  setEndpoints: (
    endpoints: {
      endpoint: string
      id__endpoint: string
    }[]
  ) => void
  isStreaming: boolean
  setIsStreaming: (isStreaming: boolean) => void
  isEndpointActive: boolean
  setIsEndpointActive: (isActive: boolean) => void
  isEndpointLoading: boolean
  setIsEndpointLoading: (isLoading: boolean) => void
  messages: ChatMessage[]
  setMessages: (
    messages: ChatMessage[] | ((prevMessages: ChatMessage[]) => ChatMessage[])
  ) => void
  chatInputRef: React.RefObject<HTMLTextAreaElement | null>
  selectedEndpoint: string
  setSelectedEndpoint: (selectedEndpoint: string) => void
  // Legacy AgentOS fields (kept for compatibility)
  agents: AgentDetails[]
  setAgents: (agents: AgentDetails[]) => void
  teams: TeamDetails[]
  setTeams: (teams: TeamDetails[]) => void
  mode: 'agent' | 'team'
  setMode: (mode: 'agent' | 'team') => void
  sessionsData: SessionEntry[] | null
  setSessionsData: (
    sessionsData:
      | SessionEntry[]
      | ((prevSessions: SessionEntry[] | null) => SessionEntry[] | null)
  ) => void
  isSessionsLoading: boolean
  setIsSessionsLoading: (isSessionsLoading: boolean) => void
  // Provider and model fields
  selectedProvider: Provider
  setSelectedProvider: (provider: Provider) => void
  availableOpenRouterModels: OpenRouterModel[]
  setAvailableOpenRouterModels: (models: OpenRouterModel[]) => void
  availableLLM7Models: LLM7Model[]
  setAvailableLLM7Models: (models: LLM7Model[]) => void
  selectedModel: string
  setSelectedModel: (model: string) => void
  isModelsLoading: boolean
  setIsModelsLoading: (isLoading: boolean) => void
  // Chat sessions
  chatSessions: ChatSession[]
  setChatSessions: (sessions: ChatSession[] | ((prev: ChatSession[]) => ChatSession[])) => void
  currentSessionId: string | null
  setCurrentSessionId: (sessionId: string | null) => void
  saveCurrentChat: () => void
  loadChatSession: (sessionId: string) => void
  deleteChatSession: (sessionId: string) => void
  clearAllChats: () => void
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      hydrated: false,
      setHydrated: () => set({ hydrated: true }),
      streamingErrorMessage: '',
      setStreamingErrorMessage: (streamingErrorMessage) =>
        set(() => ({ streamingErrorMessage })),
      endpoints: [],
      setEndpoints: (endpoints) => set(() => ({ endpoints })),
      isStreaming: false,
      setIsStreaming: (isStreaming) => set(() => ({ isStreaming })),
      isEndpointActive: false,
      setIsEndpointActive: (isActive) =>
        set(() => ({ isEndpointActive: isActive })),
      isEndpointLoading: true,
      setIsEndpointLoading: (isLoading) =>
        set(() => ({ isEndpointLoading: isLoading })),
      messages: [],
      setMessages: (messages) =>
        set((state) => ({
          messages:
            typeof messages === 'function' ? messages(state.messages) : messages
        })),
      chatInputRef: { current: null },
      selectedEndpoint: 'http://localhost:7777',
      setSelectedEndpoint: (selectedEndpoint) =>
        set(() => ({ selectedEndpoint })),
      agents: [],
      setAgents: (agents) => set({ agents }),
      teams: [],
      setTeams: (teams) => set({ teams }),
      mode: 'agent',
      setMode: (mode) => set(() => ({ mode })),
      sessionsData: null,
      setSessionsData: (sessionsData) =>
        set((state) => ({
          sessionsData:
            typeof sessionsData === 'function'
              ? sessionsData(state.sessionsData)
              : sessionsData
        })),
      isSessionsLoading: false,
      setIsSessionsLoading: (isSessionsLoading) =>
        set(() => ({ isSessionsLoading })),
      // Provider and model fields
      selectedProvider: 'openrouter',
      setSelectedProvider: (selectedProvider) => set(() => ({ selectedProvider })),
      availableOpenRouterModels: [],
      setAvailableOpenRouterModels: (availableOpenRouterModels) => 
        set(() => ({ availableOpenRouterModels })),
      availableLLM7Models: [],
      setAvailableLLM7Models: (availableLLM7Models) => 
        set(() => ({ availableLLM7Models })),
      selectedModel: 'meta-llama/llama-3.3-70b-instruct',
      setSelectedModel: (selectedModel) => set(() => ({ selectedModel })),
      isModelsLoading: false,
      setIsModelsLoading: (isModelsLoading) =>
        set(() => ({ isModelsLoading })),
      // Chat sessions
      chatSessions: [],
      setChatSessions: (sessions) =>
        set((state) => ({
          chatSessions:
            typeof sessions === 'function' ? sessions(state.chatSessions) : sessions
        })),
      currentSessionId: null,
      setCurrentSessionId: (currentSessionId) => set(() => ({ currentSessionId })),
      saveCurrentChat: () =>
        set((state) => {
          if (state.messages.length === 0) return state
          
          const title = state.messages[0]?.content?.substring(0, 50) + '...' || 'New Chat'
          const sessionId = state.currentSessionId || `session-${Date.now()}`
          
          const newSession: ChatSession = {
            id: sessionId,
            title,
            messages: state.messages,
            provider: state.selectedProvider,
            model: state.selectedModel,
            createdAt: state.currentSessionId 
              ? state.chatSessions.find(s => s.id === state.currentSessionId)?.createdAt || new Date()
              : new Date(),
            updatedAt: new Date()
          }
          
          const existingIndex = state.chatSessions.findIndex(s => s.id === sessionId)
          const updatedSessions = existingIndex >= 0
            ? state.chatSessions.map((s, i) => i === existingIndex ? newSession : s)
            : [...state.chatSessions, newSession]
          
          return {
            chatSessions: updatedSessions,
            currentSessionId: sessionId
          }
        }),
      loadChatSession: (sessionId) =>
        set((state) => {
          const session = state.chatSessions.find(s => s.id === sessionId)
          if (!session) return state
          
          return {
            messages: session.messages,
            selectedProvider: session.provider,
            selectedModel: session.model,
            currentSessionId: sessionId
          }
        }),
      deleteChatSession: (sessionId) =>
        set((state) => ({
          chatSessions: state.chatSessions.filter(s => s.id !== sessionId),
          currentSessionId: state.currentSessionId === sessionId ? null : state.currentSessionId
        })),
      clearAllChats: () =>
        set(() => ({
          chatSessions: [],
          currentSessionId: null,
          messages: []
        }))
    }),
    {
      name: 'endpoint-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        selectedEndpoint: state.selectedEndpoint,
        chatSessions: state.chatSessions,
        currentSessionId: state.currentSessionId,
        selectedProvider: state.selectedProvider,
        selectedModel: state.selectedModel
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated?.()
      }
    }
  )
)
