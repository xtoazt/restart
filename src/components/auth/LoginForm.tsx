'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useAuth, INTERNAL_USERS } from '@/contexts/AuthContext'
import { toast } from 'sonner'
import Icon from '@/components/ui/icon'

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showUsers, setShowUsers] = useState(false)
  const { signIn } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Please fill in all fields')
      return
    }

    setIsLoading(true)
    try {
      await signIn(email, password)
      toast.success('Successfully signed in!')
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUserSelect = (userEmail: string, userPassword: string) => {
    setEmail(userEmail)
    setPassword(userPassword)
    setShowUsers(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background/80 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Icon type="agno" size="lg" />
          </div>
          <h2 className="text-3xl font-bold text-primary">Welcome Back</h2>
          <p className="mt-2 text-sm text-muted">
            Sign in to access the chat interface
          </p>
        </div>

        <div className="bg-accent rounded-xl p-6 border border-primary/15">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full border border-primary/15 bg-primaryAccent px-4 py-3 text-sm text-primary focus:border-accent rounded-xl"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-primary mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full border border-primary/15 bg-primaryAccent px-4 py-3 text-sm text-primary focus:border-accent rounded-xl"
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-background hover:bg-primary/80 py-3"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          <div className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowUsers(!showUsers)}
              className="w-full border-primary/15 text-primary hover:bg-accent"
            >
              {showUsers ? 'Hide' : 'Show'} Available Users
            </Button>

            {showUsers && (
              <div className="mt-4 space-y-2">
                <p className="text-xs text-muted text-center mb-3">
                  Click on any user to auto-fill credentials:
                </p>
                {INTERNAL_USERS.map((user, index) => (
                  <div
                    key={index}
                    onClick={() => handleUserSelect(user.email, user.password)}
                    className="p-3 rounded-lg border border-primary/10 bg-primaryAccent cursor-pointer hover:bg-accent transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-primary">{user.name}</p>
                        <p className="text-xs text-muted">{user.email}</p>
                      </div>
                      <div className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">
                        {user.role}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs text-muted">
            This application uses internal authentication. 
            <br />
            Please use one of the provided user accounts above.
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
