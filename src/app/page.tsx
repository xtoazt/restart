'use client'
import Sidebar from '@/components/chat/Sidebar/Sidebar'
import { ChatArea } from '@/components/chat/ChatArea'
import NameInput from '@/components/NameInput'
import { useUser } from '@/contexts/UserContext'
import { Suspense } from 'react'

export default function Home() {
  const { userName } = useUser()

  if (!userName) {
    return <NameInput />
  }

  return (
    <Suspense fallback={
      <div className="flex h-screen bg-background items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <ChatArea />
      </div>
    </Suspense>
  )
}
