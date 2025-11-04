"use client"

import { ArrowLeft, Users } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import VolunteerDirectory from "@/components/volunteer-directory"
import VolunteerStats from "@/components/volunteer-stats"

export default function VolunteersPage() {
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
              <div className="rounded-xl bg-gradient-to-br from-secondary to-accent p-2.5 shadow-md">
                <Users className="h-6 w-6 text-secondary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">Volunteer Network/স্বেচ্ছাসেবক নেটওয়ার্ক</h1>
                <p className="text-sm text-muted-foreground">Connect with health volunteers in your community/আপনার সম্প্রদায়ের স্বাস্থ্য স্বেচ্ছাসেবকদের সাথে যোগাযোগ করুন</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-6">
          {/* Stats */}
          <VolunteerStats />

          {/* Directory */}
          <VolunteerDirectory />
        </div>
      </div>
    </main>
  )
}