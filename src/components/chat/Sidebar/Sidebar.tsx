'use client'
import { Button } from '@/components/ui/button'
import ModelSearch from '@/components/chat/Sidebar/ModelSearch'
import UserProfile from '@/components/chat/Sidebar/UserProfile'
import useChatActions from '@/hooks/useChatActions'
import useProviderActions from '@/hooks/useProviderActions'
import { useStore } from '@/store'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Icon from '@/components/ui/icon'

const SidebarHeader = () => (
  <div className="flex items-center gap-3 px-2">
    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-lg">
      <Icon type="agno" size="sm" className="text-black" />
    </div>
    <span className="text-sm font-bold text-primary">Agent UI</span>
  </div>
)

const NewChatButton = ({
  disabled,
  onClick
}: {
  disabled: boolean
  onClick: () => void
}) => (
  <Button
    onClick={onClick}
    disabled={disabled}
    size="lg"
    className="w-full h-11 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
  >
    <Icon type="plus-icon" size="sm" className="text-white" />
    <span>New Chat</span>
  </Button>
)



const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { clearChat, focusChatInput } = useChatActions()
  const { 
    selectedProvider, 
    selectModel, 
    availableModels, 
    selectedModel, 
    selectProvider
  } = useProviderActions()
  const {
    messages,
    hydrated
  } = useStore()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [hydrated])

  const handleNewChat = () => {
    clearChat()
    focusChatInput()
  }

  return (
    <motion.aside
      className="relative flex h-screen shrink-0 grow-0 flex-col overflow-hidden border-r border-primary/10 bg-background/50 backdrop-blur-sm px-4 py-6 font-dmmono"
      initial={{ width: '18rem' }}
      animate={{ width: isCollapsed ? '3rem' : '18rem' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <motion.button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute right-3 top-3 z-10 p-2 rounded-lg hover:bg-accent/50 transition-colors"
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        type="button"
        whileTap={{ scale: 0.95 }}
      >
        <Icon
          type="sheet"
          size="sm"
          className={`transform transition-transform duration-200 ${isCollapsed ? 'rotate-180' : 'rotate-0'}`}
        />
      </motion.button>
      <motion.div
        className="w-full space-y-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: isCollapsed ? 0 : 1, x: isCollapsed ? -20 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{
          pointerEvents: isCollapsed ? 'none' : 'auto'
        }}
      >
        <SidebarHeader />
        <NewChatButton
          disabled={messages.length === 0}
          onClick={handleNewChat}
        />
        {isMounted && (
          <>
            <motion.div
              className="flex w-full flex-col items-start gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <ModelSearch
                selectedModel={selectedModel}
                selectedProvider={selectedProvider}
                onModelSelect={selectModel}
                onProviderSelect={selectProvider}
                availableModels={availableModels}
              />
            </motion.div>
            <UserProfile />
          </>
        )}
      </motion.div>
    </motion.aside>
  )
}

export default Sidebar
