'use client'
import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import LoginForm from './LoginForm'
import { Skeleton } from '@/components/ui/skeleton'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background/80">
        <div className="space-y-4">
          <Skeleton className="h-8 w-64 mx-auto" />
          <Skeleton className="h-4 w-48 mx-auto" />
          <div className="space-y-2">
            <Skeleton className="h-10 w-80" />
            <Skeleton className="h-10 w-80" />
            <Skeleton className="h-10 w-80" />
          </div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginForm />
  }

  return <>{children}</>
}

export default ProtectedRoute
