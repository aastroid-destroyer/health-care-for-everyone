"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Award, TrendingUp, Clock } from "lucide-react"

export default function VolunteerStats() {
  const stats = [
    { label: "Total Volunteers", value: 156, icon: Users, color: "text-blue-600" },
    { label: "Verified Professionals", value: 87, icon: Award, color: "text-green-600" },
    { label: "Active This Month", value: 142, icon: TrendingUp, color: "text-primary" },
    { label: "Avg Response Time", value: "15 min", icon: Clock, color: "text-amber-600" },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.label} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                <div className="rounded-lg bg-muted p-2">
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
