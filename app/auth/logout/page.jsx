"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { logoutUser } from "@/lib/auth"
import { useAuth } from "@/components/auth-provider"

export default function LogoutPage() {
  const router = useRouter()
  const { setUser, setIsAuthenticated } = useAuth()

  useEffect(() => {
    async function logout() {
      logoutUser()
      setUser(null)
      setIsAuthenticated(false)
      router.push("/")
    }

    logout()
  }, [router, setUser, setIsAuthenticated])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Logging out...</p>
    </div>
  )
}
