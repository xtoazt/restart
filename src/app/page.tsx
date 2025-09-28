'use client'
import Sidebar from '@/components/chat/Sidebar/Sidebar'
import { ChatArea } from '@/components/chat/ChatArea'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import { Suspense } from 'react'

export default function Home() {
  return (
    <ProtectedRoute>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex h-screen bg-background/80">
          <Sidebar />
          <ChatArea />
        </div>
      </Suspense>
    </ProtectedRoute>
  )
}
