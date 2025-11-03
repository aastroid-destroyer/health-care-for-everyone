"use client"

import { ArrowLeft, Brain } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import MentalHealthCheckin from "@/components/mental-health-checkin"
import CheckinHistory from "@/components/checkin-history"

export default function MentalHealthPage() {
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
              <div className="rounded-xl bg-gradient-to-br from-secondary to-primary p-2.5 shadow-md">
                <Brain className="h-6 w-6 text-secondary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">আজ আপনার কেমন লাগছে বলে দিন</h1>
                <p className="text-sm text-muted-foreground">আপনার প্রতিদিনের মানসিক অবস্থার রেকর্ড রাখুন</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Check-in Form */}
          <div className="lg:col-span-2">
            <MentalHealthCheckin />
          </div>

          {/* Sidebar - History */}
          <div>
            <CheckinHistory />
          </div>
        </div>
      </div>
    </main>
  )
}
