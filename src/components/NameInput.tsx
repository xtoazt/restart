'use client'
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'

const NameInput: React.FC = () => {
  const [name, setName] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    // Check if name is already stored
    const storedName = localStorage.getItem('userName')
    if (storedName) {
      setName(storedName)
      setIsSubmitted(true)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      localStorage.setItem('userName', name.trim())
      setIsSubmitted(true)
    }
  }

  const handleEdit = () => {
    setIsSubmitted(false)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-xl">
                <Icon type="agno" size="lg" className="text-black" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-primary mb-2">Welcome, {name}!</h2>
            <p className="text-muted">
              Ready to start chatting with AI
            </p>
          </div>

          <div className="glass-effect rounded-2xl p-8 text-center">
            <p className="text-primary mb-6">
              You&apos;re all set to start chatting with AI models.
            </p>
            <Button
              onClick={handleEdit}
              variant="outline"
              className="w-full"
            >
              Change Name
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-xl">
              <Icon type="agno" size="lg" className="text-black" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-primary mb-2">Welcome!</h2>
          <p className="text-muted">
            What should we call you?
          </p>
        </div>

        <div className="glass-effect rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-primary mb-3">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-white/50 focus:ring-2 focus:ring-white/20 rounded-xl transition-all duration-200"
                autoFocus
              />
            </div>

            <Button
              type="submit"
              disabled={!name.trim()}
              className="w-full"
            >
              Continue
            </Button>
          </form>
        </div>

        <div className="text-center">
          <p className="text-xs text-muted">
            Your name will be stored locally and used to personalize your experience.
          </p>
        </div>
      </div>
    </div>
  )
}

export default NameInput
