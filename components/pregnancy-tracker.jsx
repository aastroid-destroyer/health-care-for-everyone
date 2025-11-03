"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Baby, Calendar } from "lucide-react"

export default function PregnancyTracker() {
  const weekOfPregnancy = 24
  const totalWeeks = 40
  const progressPercentage = (weekOfPregnancy / totalWeeks) * 100

  return (
    <Card className="border-0 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-pink-500 p-2">
            <Baby className="h-6 w-6 text-white" />
          </div>
          <div>
            <CardTitle>Pregnancy Progress</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Week {weekOfPregnancy} of {totalWeeks}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">Trimester 2</span>
            <span className="text-sm font-bold text-pink-600">{progressPercentage.toFixed(0)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
        </div>

        {/* Pregnancy Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-white/50 dark:bg-black/20 text-center">
            <p className="text-2xl font-bold text-pink-600">16</p>
            <p className="text-xs text-muted-foreground mt-1">Weeks left</p>
          </div>
          <div className="p-4 rounded-lg bg-white/50 dark:bg-black/20 text-center">
            <p className="text-2xl font-bold text-rose-600">3</p>
            <p className="text-xs text-muted-foreground mt-1">Check-ups done</p>
          </div>
          <div className="p-4 rounded-lg bg-white/50 dark:bg-black/20 text-center">
            <p className="text-2xl font-bold text-pink-600">2</p>
            <p className="text-xs text-muted-foreground mt-1">Vitamins taken</p>
          </div>
        </div>

        {/* Next Milestone */}
        <div className="flex items-center gap-3 p-4 rounded-lg bg-white/50 dark:bg-black/20">
          <Calendar className="h-5 w-5 text-pink-600" />
          <div>
            <p className="text-sm font-medium">Next milestone</p>
            <p className="text-xs text-muted-foreground">Third trimester begins - Week 28</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
