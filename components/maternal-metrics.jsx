"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp } from "lucide-react"

const maternalData = [
  { week: "W20", weight: 68, systolic: 120, diastolic: 78 },
  { week: "W21", weight: 68.5, systolic: 118, diastolic: 76 },
  { week: "W22", weight: 69.2, systolic: 122, diastolic: 79 },
  { week: "W23", weight: 70, systolic: 121, diastolic: 78 },
  { week: "W24", weight: 70.8, systolic: 119, diastolic: 77 },
]

export default function MaternalMetrics() {
  return (
    <div className="space-y-6">
      {/* Weight Tracking */}
      <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <CardTitle>Weight & Blood Pressure</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={maternalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="week" stroke="var(--muted-foreground)" style={{ fontSize: "12px" }} />
              <YAxis yAxisId="left" stroke="var(--muted-foreground)" style={{ fontSize: "12px" }} />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="var(--muted-foreground)"
                style={{ fontSize: "12px" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="weight"
                stroke="var(--primary)"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="systolic"
                stroke="var(--accent)"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Nutrition */}
      <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle>Daily Nutrition</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { nutrient: "Folic Acid", status: "On Track", percentage: 85 },
              { nutrient: "Iron", status: "On Track", percentage: 78 },
              { nutrient: "Calcium", status: "Needs Attention", percentage: 45 },
              { nutrient: "Protein", status: "On Track", percentage: 92 },
            ].map((item) => (
              <div key={item.nutrient}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{item.nutrient}</span>
                  <span className="text-xs text-muted-foreground">{item.status}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
