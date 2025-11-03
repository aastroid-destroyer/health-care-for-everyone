"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Heart, Mail, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { loginUser, registerUser } from "@/lib/auth"
import { useAuth } from "@/components/auth-provider"

export default function LoginPage() {
  const router = useRouter()
  const { setUser, setIsAuthenticated } = useAuth()
  const [mode, setMode] = useState("login")
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      let result

      if (mode === "register") {
        result = await registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        })
      } else {
        result = await loginUser(formData.email, formData.password)
      }

      if (result.success) {
        setUser(result.user)
        setIsAuthenticated(true)
        router.push("/")
      } else {
        setError(result.error || "Authentication failed")
      }
    } catch (err) {
      setError(err.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="rounded-2xl bg-gradient-to-br from-primary to-accent p-3 shadow-lg">
            <Heart className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>

        {/* Auth Card */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">{mode === "login" ? "Welcome back" : "Create account"}</CardTitle>
            <CardDescription>
              {mode === "login" ? "Login to access your health dashboard" : "Sign up to get started with ShasthoSheba"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field - Register Only */}
              {mode === "register" && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Full Name</label>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
              )}

              {/* Email Field */}
              <div>
                <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>

              {/* Error Message */}
              {error && <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}

              {/* Submit Button */}
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Loading..." : mode === "login" ? "Login" : "Create Account"}
              </Button>

              {/* Toggle Mode */}
              <p className="text-center text-sm text-muted-foreground">
                {mode === "login" ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => {
                    setMode(mode === "login" ? "register" : "login")
                    setError("")
                  }}
                  className="text-primary hover:underline font-medium"
                >
                  {mode === "login" ? "Sign up" : "Login"}
                </button>
              </p>
            </form>
          </CardContent>
        </Card>

        {/* Demo Info */}
        <Card className="mt-4 border-0 bg-primary/5">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              <strong>Demo credentials:</strong> Use any email and password to test the authentication system.
            </p>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link href="/">
            <Button variant="ghost">Back to Home</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
