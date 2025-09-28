'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { SimpleUser } from '@/lib/simpleAuth'
import Icon from '@/components/ui/icon'
import { toast } from 'sonner'

const UserProfile: React.FC = () => {
  const { user, logout } = useAuth()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await logout()
      toast.success('Successfully signed out!')
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      toast.error(errorMessage)
    } finally {
      setIsLoggingOut(false)
    }
  }

  if (!user) return null

  return (
    <div className="flex items-center justify-between p-3 border-t border-primary/15">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <Icon type="user" size="xs" className="text-background" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium text-primary">
            {'displayName' in user ? user.displayName || user.email?.split('@')[0] || 'User' : (user as SimpleUser).username}
          </span>
          <span className="text-xs text-muted">
            {'email' in user ? user.email?.replace('@restart.com', '') || 'User' : (user as SimpleUser).username}
          </span>
        </div>
      </div>
      <Button
        onClick={handleLogout}
        disabled={isLoggingOut}
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 hover:bg-accent"
        title="Sign Out"
      >
        {isLoggingOut ? (
          <div className="w-4 h-4 border-2 border-muted border-t-transparent rounded-full animate-spin" />
        ) : (
          <Icon type="x" size="xs" />
        )}
      </Button>
    </div>
  )
}

export default UserProfile
