'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import { useStore, type ChatSession } from '@/store'
import { toast } from 'sonner'

const ChatSessions = () => {
  const { 
    chatSessions, 
    currentSessionId, 
    loadChatSession, 
    deleteChatSession, 
    clearAllChats,
    saveCurrentChat 
  } = useStore()
  const [expanded, setExpanded] = useState(true)

  const handleLoadSession = (session: ChatSession) => {
    loadChatSession(session.id)
    toast.success(`Loaded chat: ${session.title}`)
  }

  const handleDeleteSession = (sessionId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    deleteChatSession(sessionId)
    toast.success('Chat deleted')
  }

  const handleSaveCurrent = () => {
    saveCurrentChat()
    toast.success('Chat saved!')
  }

  const handleClearAll = () => {
    if (confirm('Are you sure you want to delete all saved chats? This cannot be undone.')) {
      clearAllChats()
      toast.success('All chats cleared')
    }
  }

  if (chatSessions.length === 0) {
    return (
      <div className="w-full space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-xs font-semibold uppercase tracking-wider text-white/70">
            Saved Chats
          </div>
          <Button
            onClick={handleSaveCurrent}
            size="sm"
            variant="ghost"
            className="h-6 px-2 text-xs"
          >
            <Icon type="save" size="xs" />
          </Button>
        </div>
        <div className="text-xs text-white/50 text-center py-4">
          No saved chats yet
        </div>
      </div>
    )
  }

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/70 hover:text-white transition-colors"
        >
          <Icon 
            type={expanded ? "chevron-down" : "chevron-up"} 
            size="xs" 
          />
          Saved Chats ({chatSessions.length})
        </button>
        <div className="flex items-center gap-1">
          <Button
            onClick={handleSaveCurrent}
            size="sm"
            variant="ghost"
            className="h-6 px-2 text-xs"
            title="Save current chat"
          >
            <Icon type="save" size="xs" />
          </Button>
          <Button
            onClick={handleClearAll}
            size="sm"
            variant="ghost"
            className="h-6 px-2 text-xs text-red-400 hover:text-red-300"
            title="Clear all chats"
          >
            <Icon type="trash" size="xs" />
          </Button>
        </div>
      </div>
      
      {expanded && (
        <div className="space-y-1 max-h-60 overflow-y-auto">
          {chatSessions
            .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
            .map((session) => (
            <div
              key={session.id}
              onClick={() => handleLoadSession(session)}
              className={`group flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
                currentSessionId === session.id
                  ? 'bg-white/20 border border-white/30'
                  : 'bg-white/5 hover:bg-white/10 border border-transparent'
              }`}
            >
              <Icon type="file" size="xs" className="text-white/60 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-white truncate">
                  {session.title}
                </div>
                <div className="text-xs text-white/50">
                  {new Date(session.updatedAt).toLocaleDateString()} • {session.provider} • {session.model.split('/').pop()}
                </div>
              </div>
              <button
                onClick={(e) => handleDeleteSession(session.id, e)}
                className="opacity-0 group-hover:opacity-100 text-white/60 hover:text-red-400 transition-all"
              >
                <Icon type="x" size="xs" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ChatSessions
