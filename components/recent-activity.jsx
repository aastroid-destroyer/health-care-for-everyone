"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, AlertCircle, Heart, Calendar } from "lucide-react"

const activities = [
  { id: 1, type: "checkin", title: "Mental Check-in", time: "2 hours ago", icon: Heart },
  { id: 2, type: "appointment", title: "Clinic Appointment", time: "Yesterday", icon: Calendar },
  { id: 3, type: "reminder", title: "Vaccination Due", time: "3 days", icon: AlertCircle },
  { id: 4, type: "completed", title: "Health Assessment", time: "1 week ago", icon: CheckCircle2 },
]

export default function RecentActivity() {
  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-base">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon
            return (
              <div
                key={activity.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors"
              >
                <div className="rounded-lg bg-primary/20 p-2">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
