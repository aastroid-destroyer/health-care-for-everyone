"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin } from "lucide-react"

const appointments = [
  { id: 1, type: "Checkup", date: "Nov 15", time: "2:00 PM", location: "Community Health Center", status: "Upcoming" },
  { id: 2, type: "Ultrasound", date: "Nov 22", time: "10:00 AM", location: "Maternal Care Clinic", status: "Upcoming" },
  { id: 3, type: "Lab Tests", date: "Nov 8", time: "9:00 AM", location: "Hospital Lab", status: "Completed" },
]

export default function AppointmentScheduler() {
  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-base">Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {appointments.map((apt) => (
            <div
              key={apt.id}
              className={`p-3 rounded-lg border-l-4 ${
                apt.status === "Upcoming"
                  ? "border-l-primary bg-primary/5"
                  : "border-l-green-500 bg-green-50 dark:bg-green-950/20"
              }`}
            >
              <p className="font-medium text-sm">{apt.type}</p>
              <div className="space-y-1 mt-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {apt.date}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {apt.time}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {apt.location}
                </div>
              </div>
              <Button variant="ghost" size="sm" className="w-full mt-3 text-xs">
                {apt.status === "Upcoming" ? "Reschedule" : "View Details"}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
