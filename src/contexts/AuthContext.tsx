'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { 
  User, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { simpleAuth, SimpleUser } from '@/lib/simpleAuth'

interface AuthContextType {
  user: User | SimpleUser | null
  loading: boolean
  signIn: (username: string, password: string) => Promise<void>
  signUp: (username: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Internal email system - convert username to email
const createInternalEmail = (username: string): string => {
  return `${username.toLowerCase()}@restart.com`
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | SimpleUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [useFirebase, setUseFirebase] = useState(true)

  useEffect(() => {
    // Try Firebase first, fallback to simple auth if Firebase fails
    const initializeAuth = async () => {
      if (!auth) {
        console.warn('Firebase auth not available, using simple auth')
        setUseFirebase(false)
        
        // Use simple auth
        const currentUser = simpleAuth.getCurrentUser()
        setUser(currentUser)
        setLoading(false)
        
        // Set up simple auth listener
        const unsubscribe = simpleAuth.onAuthStateChanged((user) => {
          setUser(user)
        })
        
        return unsubscribe
      }
      
      try {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user && db) {
            // Get user data from Firestore
            const userDoc = await getDoc(doc(db, 'users', user.uid))
            if (userDoc.exists()) {
              setUser(user)
            } else {
              // Create user document if it doesn't exist
              await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                name: user.displayName || 'User',
                role: 'user',
                createdAt: new Date().toISOString()
              })
              setUser(user)
            }
          } else {
            setUser(user)
          }
          setLoading(false)
        })

        return () => unsubscribe()
      } catch (error) {
        console.warn('Firebase auth not available, using simple auth:', error)
        setUseFirebase(false)
        
        // Use simple auth
        const currentUser = simpleAuth.getCurrentUser()
        setUser(currentUser)
        setLoading(false)
        
        // Set up simple auth listener
        const unsubscribe = simpleAuth.onAuthStateChanged((user) => {
          setUser(user)
        })
        
        return unsubscribe
      }
    }

    const cleanup = initializeAuth()
    return () => {
      cleanup.then(cleanupFn => cleanupFn && cleanupFn())
    }
  }, [])

  const signIn = async (username: string, password: string) => {
    try {
      if (useFirebase && auth) {
        // Convert username to internal email
        const email = createInternalEmail(username)
        
        // Check if user exists in Firebase, if not create them
        try {
          await signInWithEmailAndPassword(auth, email, password)
        } catch (error: unknown) {
          if (error instanceof Error && 'code' in error && error.code === 'auth/user-not-found') {
            // Create the user if they don't exist
            await createUserWithEmailAndPassword(auth, email, password)
            // Update the user profile
            if (db && auth.currentUser) {
              await setDoc(doc(db, 'users', auth.currentUser.uid), {
                email: email,
                name: username,
                role: 'user',
                createdAt: new Date().toISOString()
              })
            }
          } else {
            throw error
          }
        }
      } else {
        // Use simple auth
        await simpleAuth.signIn(username)
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign in'
      throw new Error(errorMessage)
    }
  }

  const signUp = async (username: string, password: string, name: string) => {
    try {
      if (useFirebase && auth) {
        // Convert username to internal email
        const email = createInternalEmail(username)
        
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        
        // Create user document in Firestore
        if (db) {
          await setDoc(doc(db, 'users', userCredential.user.uid), {
            email: email,
            name: name,
            role: 'user',
            createdAt: new Date().toISOString()
          })
        }
      } else {
        // Use simple auth
        await simpleAuth.signUp(username)
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign up'
      throw new Error(errorMessage)
    }
  }

  const logout = async () => {
    try {
      if (useFirebase && auth) {
        await signOut(auth)
      } else {
        await simpleAuth.signOut()
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign out'
      throw new Error(errorMessage)
    }
  }

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    logout,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Export helper function for the login UI
export { createInternalEmail }
