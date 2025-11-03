"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { CheckCircle2, AlertCircle, TrendingUp } from "lucide-react"

const healthData = [
  { date: "Mon", score: 72, checkups: 1 },
  { date: "Tue", score: 75, checkups: 0 },
  { date: "Wed", score: 78, checkups: 1 },
  { date: "Thu", score: 76, checkups: 0 },
  { date: "Fri", score: 80, checkups: 1 },
  { date: "Sat", score: 82, checkups: 2 },
  { date: "Sun", score: 78, checkups: 0 },
]

export default function HealthOverview() {
  return (
    <div className="space-y-6">
      {/* Health Score Card */}
      <Card className="border-0 bg-gradient-to-br from-primary/10 to-accent/10 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Health Score Trend</CardTitle>
            </div>
            <div className="text-3xl font-bold text-primary">78</div>
          </div>
          <p className="text-sm text-muted-foreground mt-1">Week average - Improving trend</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={healthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="date" stroke="var(--muted-foreground)" style={{ fontSize: "12px" }} />
              <YAxis stroke="var(--muted-foreground)" style={{ fontSize: "12px" }} domain={[60, 85]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
                cursor={{ stroke: "var(--primary)" }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="var(--primary)"
                strokeWidth={3}
                dot={{ fill: "var(--primary)", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Health Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">4</div>
            <p className="text-xs text-muted-foreground mt-1">This week</p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">2</div>
            <p className="text-xs text-muted-foreground mt-1">Follow-ups needed</p>
          </CardContent>
        </Card>
      </div>

      {/* Activity Breakdown */}
      <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-base">Weekly Activity</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">Checkups and activities per day</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={healthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="date" stroke="var(--muted-foreground)" style={{ fontSize: "12px" }} />
              <YAxis stroke="var(--muted-foreground)" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="checkups" fill="var(--accent)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
