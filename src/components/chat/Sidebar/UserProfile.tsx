'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useUser } from '@/contexts/UserContext'
import Icon from '@/components/ui/icon'
import { toast } from 'sonner'

const UserProfile: React.FC = () => {
  const { userName, clearUserName } = useUser()
  const [isClearing, setIsClearing] = useState(false)

  const handleClearName = async () => {
    setIsClearing(true)
    try {
      clearUserName()
      toast.success('Name cleared! Please refresh to set a new name.')
    } catch {
      toast.error('Failed to clear name')
    } finally {
      setIsClearing(false)
    }
  }

  if (!userName) return null

  return (
    <div className="flex items-center justify-between p-4 border-t border-primary/10 bg-background/50 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center shadow-lg">
          <Icon type="user" size="sm" className="text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-primary">
            {userName}
          </span>
          <span className="text-xs text-muted">
            Local User
          </span>
        </div>
      </div>
      <Button
        onClick={handleClearName}
        disabled={isClearing}
        variant="ghost"
        size="icon"
        className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive transition-colors"
        title="Clear Name"
      >
        {isClearing ? (
          <div className="w-4 h-4 border-2 border-muted border-t-transparent rounded-full animate-spin" />
        ) : (
          <Icon type="x" size="xs" />
        )}
      </Button>
    </div>
  )
}

export default UserProfile