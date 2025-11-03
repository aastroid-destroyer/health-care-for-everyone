"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const checkInHistory = [
  { date: "Today", mood: "Good", score: 7 },
  { date: "Yesterday", mood: "Neutral", score: 6 },
  { date: "2 days ago", mood: "Good", score: 7 },
  { date: "3 days ago", mood: "Excellent", score: 8 },
  { date: "4 days ago", mood: "Good", score: 7 },
]

function getMoodColor(mood) {
  switch (mood) {
    case "Stressed":
      return "bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-200"
    case "Anxious":
      return "bg-orange-100 text-orange-800 dark:bg-orange-950/40 dark:text-orange-200"
    case "Neutral":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/40 dark:text-yellow-200"
    case "Good":
      return "bg-lime-100 text-lime-800 dark:bg-lime-950/40 dark:text-lime-200"
    case "Excellent":
      return "bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-200"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function CheckinHistory() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-base">Check-in History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {checkInHistory.map((entry, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors"
            >
              <div>
                <p className="text-sm font-medium">{entry.date}</p>
                <p className="text-xs text-muted-foreground">Score: {entry.score}/10</p>
              </div>
              <Badge className={getMoodColor(entry.mood)}>{entry.mood}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
