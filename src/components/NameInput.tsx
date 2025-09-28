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
      <div className="min-h-screen flex items-center justify-center bg-background/80 px-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Icon type="agno" size="lg" />
            </div>
            <h2 className="text-3xl font-bold text-primary">Welcome, {name}!</h2>
            <p className="mt-2 text-sm text-muted">
              Ready to start chatting with AI
            </p>
          </div>

          <div className="bg-accent rounded-xl p-6 border border-primary/15 text-center">
            <p className="text-sm text-primary mb-4">
              You&apos;re all set to start chatting with AI models.
            </p>
            <Button
              onClick={handleEdit}
              variant="outline"
              className="border-primary/15 text-primary hover:bg-accent"
            >
              Change Name
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background/80 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Icon type="agno" size="lg" />
          </div>
          <h2 className="text-3xl font-bold text-primary">Welcome!</h2>
          <p className="mt-2 text-sm text-muted">
            What should we call you?
          </p>
        </div>

        <div className="bg-accent rounded-xl p-6 border border-primary/15">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full border border-primary/15 bg-primaryAccent px-4 py-3 text-sm text-primary focus:border-accent rounded-xl"
                autoFocus
              />
            </div>

            <Button
              type="submit"
              disabled={!name.trim()}
              className="w-full bg-primary text-background hover:bg-primary/80 py-3"
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
