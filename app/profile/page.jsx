"use client"

import { ArrowLeft, User, Mail, Phone, MapPin, Edit2 } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/components/auth-provider"
import { updateUserProfile } from "@/lib/auth"

export default function ProfilePage() {
  const { user, isAuthenticated, setUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  })

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
      })
    }
  }, [user])

  const handleSubmit = async () => {
    if (!user) return

    const result = await updateUserProfile(user.userId, formData)
    if (result.success) {
      setUser(result.user)
      setIsEditing(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </header>
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">Please log in to view your profile.</p>
              <div className="flex justify-center mt-4">
                <Link href="/auth/login">
                  <Button>Log In</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="rounded-xl bg-gradient-to-br from-primary to-accent p-2.5 shadow-md">
                <User className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">My Profile</h1>
                <p className="text-sm text-muted-foreground">Manage your account information</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* User Avatar Card */}
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <User className="h-10 w-10 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{formData.name || "User"}</h2>
                  <p className="text-sm text-muted-foreground">
                    Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Information */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Personal Information</CardTitle>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    if (isEditing) {
                      handleSubmit()
                    } else {
                      setIsEditing(true)
                    }
                  }}
                  className="gap-2"
                >
                  <Edit2 className="h-4 w-4" />
                  {isEditing ? "Save" : "Edit"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Name */}
              <div>
                <label className="text-sm font-medium mb-2 block">Full Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!isEditing}
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={!isEditing}
                  placeholder="Enter your email"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone
                </label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={!isEditing}
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Location */}
              <div>
                <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location
                </label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  disabled={!isEditing}
                  placeholder="Enter your location"
                />
              </div>
            </CardContent>
          </Card>

          {/* Account Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Check-ins</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">12</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-accent">5</div>
              </CardContent>
            </Card>
          </div>

          {/* Logout Button */}
          <Link href="/auth/logout">
            <Button variant="destructive" className="w-full">
              Logout
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
