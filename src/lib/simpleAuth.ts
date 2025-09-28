// Simple authentication system as fallback when Firebase Auth is not available
interface SimpleUser {
  id: string
  username: string
  email: string
  role: string
  createdAt: string
}

class SimpleAuth {
  private users: Map<string, SimpleUser> = new Map()
  private currentUser: SimpleUser | null = null

  constructor() {
    // Load users from localStorage on initialization
    this.loadUsersFromStorage()
  }

  private loadUsersFromStorage() {
    try {
      const stored = localStorage.getItem('simpleAuth_users')
      if (stored) {
        const users = JSON.parse(stored)
        this.users = new Map(Object.entries(users))
      }
    } catch (error) {
      console.error('Failed to load users from storage:', error)
    }
  }

  private saveUsersToStorage() {
    try {
      const usersObj = Object.fromEntries(this.users)
      localStorage.setItem('simpleAuth_users', JSON.stringify(usersObj))
    } catch (error) {
      console.error('Failed to save users to storage:', error)
    }
  }

  async signIn(username: string): Promise<SimpleUser> {
    const email = `${username.toLowerCase()}@restart.com`
    const userId = email

    // Check if user exists
    let user = this.users.get(userId)
    
    if (!user) {
      // Create new user
      user = {
        id: userId,
        username: username,
        email: email,
        role: 'user',
        createdAt: new Date().toISOString()
      }
      this.users.set(userId, user)
      this.saveUsersToStorage()
    }

    this.currentUser = user
    localStorage.setItem('simpleAuth_currentUser', JSON.stringify(user))
    
    return user
  }

  async signUp(username: string): Promise<SimpleUser> {
    return this.signIn(username) // Same logic for sign up
  }

  async signOut(): Promise<void> {
    this.currentUser = null
    localStorage.removeItem('simpleAuth_currentUser')
  }

  getCurrentUser(): SimpleUser | null {
    if (this.currentUser) {
      return this.currentUser
    }

    // Try to load from localStorage
    try {
      const stored = localStorage.getItem('simpleAuth_currentUser')
      if (stored) {
        this.currentUser = JSON.parse(stored)
        return this.currentUser
      }
    } catch (error) {
      console.error('Failed to load current user from storage:', error)
    }

    return null
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null
  }

  onAuthStateChanged(callback: (user: SimpleUser | null) => void) {
    // Simple implementation - just call with current user
    callback(this.getCurrentUser())
    
    // Return unsubscribe function
    return () => {}
  }
}

export const simpleAuth = new SimpleAuth()
export type { SimpleUser }
