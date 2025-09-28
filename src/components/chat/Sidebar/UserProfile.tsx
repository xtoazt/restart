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
    <div className="flex items-center justify-between p-3 border-t border-primary/15">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <Icon type="user" size="xs" className="text-background" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium text-primary">
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
        size="sm"
        className="h-8 w-8 p-0 hover:bg-accent"
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