'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'

interface UserContextType {
  userName: string | null
  setUserName: (name: string) => void
  clearUserName: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userName, setUserNameState] = useState<string | null>(null)

  useEffect(() => {
    // Load name from localStorage on mount
    const storedName = localStorage.getItem('userName')
    if (storedName) {
      setUserNameState(storedName)
    }
  }, [])

  const setUserName = (name: string) => {
    localStorage.setItem('userName', name)
    setUserNameState(name)
  }

  const clearUserName = () => {
    localStorage.removeItem('userName')
    setUserNameState(null)
  }

  const value: UserContextType = {
    userName,
    setUserName,
    clearUserName
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
