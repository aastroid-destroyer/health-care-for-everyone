"use client"

import { Heart, Brain, Baby, MapPin, Users, Activity, LogIn, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import HealthOverview from "@/components/health-overview"
import RecentActivity from "@/components/recent-activity"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"

export default function Home() {
  const { user, isAuthenticated } = useAuth()

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-gradient-to-br from-primary to-accent p-2.5 shadow-md">
                <Heart className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">ShasthoSheba</h1>
                <p className="text-sm text-muted-foreground">Community Health Navigator</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isAuthenticated ? (
                <>
                  <Link href="/profile">
                    <Button variant="outline" className="gap-2 bg-transparent hover:bg-primary/10">
                      <Users className="h-4 w-4" />
                      {user?.name || "Profile"}
                    </Button>
                  </Link>
                  <Link href="/auth/logout">
                    <Button variant="outline" size="icon" className="gap-2 bg-transparent hover:bg-destructive/10">
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </Link>
                </>
              ) : (
                <Link href="/auth/login">
                  <Button className="gap-2">
                    <LogIn className="h-4 w-4" />
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-foreground mb-2">
            {isAuthenticated ? `Welcome back, ${user?.name || "User"}` : "Welcome to ShasthoSheba"}
          </h2>
          <p className="text-muted-foreground">Your personalized health dashboard for better wellness</p>
        </section>

        {/* Quick Actions Grid */}
        <section className="mb-8">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            <Link href="/mental-health" className="h-full">
              <Button
                variant="outline"
                className="h-24 w-full flex flex-col items-center justify-center gap-2 rounded-lg border-2 bg-gradient-to-br from-secondary/5 to-transparent hover:border-primary hover:bg-primary/10 transition-all"
              >
                <Brain className="h-6 w-6 text-primary" />
                <span className="text-xs font-semibold text-center">Mental Check-in</span>
              </Button>
            </Link>
            <Link href="/health-map" className="h-full">
              <Button
                variant="outline"
                className="h-24 w-full flex flex-col items-center justify-center gap-2 rounded-lg border-2 bg-gradient-to-br from-accent/5 to-transparent hover:border-primary hover:bg-primary/10 transition-all"
              >
                <MapPin className="h-6 w-6 text-primary" />
                <span className="text-xs font-semibold text-center">Find Resources</span>
              </Button>
            </Link>
            <Link href="/anonymous-request" className="h-full">
              <Button
                variant="outline"
                className="h-24 w-full flex flex-col items-center justify-center gap-2 rounded-lg border-2 bg-gradient-to-br from-secondary/5 to-transparent hover:border-primary hover:bg-primary/10 transition-all"
              >
                <Brain className="h-6 w-6 text-primary" />
                <span className="text-xs font-semibold text-center">Anonymous</span>
              </Button>
            </Link>
            <Link href="/maternal-health" className="h-full">
              <Button
                variant="outline"
                className="h-24 w-full flex flex-col items-center justify-center gap-2 rounded-lg border-2 bg-gradient-to-br from-pink-50/5 to-transparent hover:border-primary hover:bg-primary/10 transition-all dark:from-pink-950/20"
              >
                <Baby className="h-6 w-6 text-primary" />
                <span className="text-xs font-semibold text-center">Maternal Track</span>
              </Button>
            </Link>
            
            <Button
              variant="outline"
              className="h-24 w-full flex flex-col items-center justify-center gap-2 rounded-lg border-2 bg-gradient-to-br from-accent/5 to-transparent hover:border-primary hover:bg-primary/10 transition-all"
            >
              <Activity className="h-6 w-6 text-primary" />
              <span className="text-xs font-semibold text-center">Health Log</span>
            </Button>

            <Link href="/volunteers" className="h-full">
              <Button
                variant="outline"
                className="h-24 w-full flex flex-col items-center justify-center gap-2 rounded-lg border-2 bg-gradient-to-br from-secondary/5 to-transparent hover:border-primary hover:bg-primary/10 transition-all"
              >
                <Users className="h-6 w-6 text-primary" />
                <span className="text-xs font-semibold text-center">Volunteers</span>
              </Button>
            </Link>

            <Button
              variant="outline"
              className="h-24 w-full flex flex-col items-center justify-center gap-2 rounded-lg border-2 bg-gradient-to-br from-primary/5 to-transparent hover:border-primary hover:bg-primary/10 transition-all"
            >
              <Heart className="h-6 w-6 text-primary" />
              <span className="text-xs font-semibold text-center">Community</span>
            </Button>
          </div>
        </section>

        {/* Authenticated Content */}
        {isAuthenticated ? (
          <>
            {/* Health Overview and Recent Activity */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <HealthOverview />
              </div>
              <div>
                <RecentActivity />
              </div>
            </div>

            {/* Stats Grid */}
            <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-4">
              <Card className="border-0 bg-gradient-to-br from-primary/10 to-accent/5 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Health Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">78/100</div>
                  <p className="text-xs text-muted-foreground mt-1">Good overall health</p>
                </CardContent>
              </Card>
              <Card className="border-0 bg-gradient-to-br from-secondary/10 to-primary/5 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Check-ins</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-secondary">12</div>
                  <p className="text-xs text-muted-foreground mt-1">This month</p>
                </CardContent>
              </Card>
              <Card className="border-0 bg-gradient-to-br from-accent/10 to-secondary/5 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-accent">24</div>
                  <p className="text-xs text-muted-foreground mt-1">Nearby clinics</p>
                </CardContent>
              </Card>
              <Card className="border-0 bg-gradient-to-br from-primary/10 to-secondary/5 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">156</div>
                  <p className="text-xs text-muted-foreground mt-1">Members active</p>
                </CardContent>
              </Card>
            </section>
          </>
        ) : (
          <Card className="border-0 shadow-lg">
            <CardContent className="pt-8 pb-8">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold">Get Started</h3>
                <p className="text-muted-foreground">
                  Create an account or login to access your personalized health dashboard.
                </p>
                <div className="flex gap-4 justify-center pt-4">
                  <Link href="/auth/login">
                    <Button className="gap-2">
                      <LogIn className="h-4 w-4" />
                      Login / Sign Up
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}
