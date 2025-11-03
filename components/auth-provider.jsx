"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { getCurrentUser, isAuthenticated as checkAuth } from "@/lib/auth"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    async function initAuth() {
      try {
        if (checkAuth()) {
          const currentUser = await getCurrentUser()
          setUser(currentUser)
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error("[v0] Auth initialization error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated, setUser, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
