"use client"

import { ArrowLeft, MapPin } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import HealthMap from "@/components/health-map"
import ResourceList from "@/components/resource-list"

export default function HealthMapPage() {
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
              <div className="rounded-xl bg-gradient-to-br from-accent to-secondary p-2.5 shadow-md">
                <MapPin className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">Health Resources Map</h1>
                <p className="text-sm text-muted-foreground">Find clinics and services near you</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Map */}
          <div className="lg:col-span-3">
            <HealthMap />
          </div>

          {/* Resource List Sidebar */}
          <div>
            <ResourceList />
          </div>
        </div>
      </div>
    </main>
  )
}
