"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

const checkInHistory = [
  { date: "Today/আজ", mood: "Good/ভালো", score: 7 },
  { date: "Yesterday/গতকাল", mood: "Neutral/নিরপেক্ষ", score: 6 },
  { date: "2 days ago/২ দিন আগে", mood: "Good/ভালো", score: 7 },
  { date: "3 days ago/৩ দিন আগে", mood: "Excellent/চমৎকার", score: 8 },
  { date: "4 days ago/৪ দিন আগে", mood: "Good/ভালো", score: 7 },
]

function getMoodColor(mood) {
  switch (mood) {
    case "Stressed/উদ্বিগ্ন":
      return "bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-200"
    case "Anxious/উদ্বেগিত":
      return "bg-orange-100 text-orange-800 dark:bg-orange-950/40 dark:text-orange-200"
    case "Neutral/নিরপেক্ষ":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/40 dark:text-yellow-200"
    case "Good/ভালো":
      return "bg-lime-100 text-lime-800 dark:bg-lime-950/40 dark:text-lime-200"
    case "Excellent/চমৎকার":
      return "bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-200"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

// Custom tooltip for the chart
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-md shadow-md p-2">
        <p className="text-sm font-medium">{`${payload[0].payload.date}`}</p>
        <p className="text-sm">{`Mood Score/মেজাজ স্কোর: ${payload[0].value}/10`}</p>
        <p className="text-sm">{`Mood/মেজাজ: ${payload[0].payload.mood}`}</p>
      </div>
    )
  }
  return null
}

// Mental Health Chart Component
function MentalHealthChart() {
  // Transform data for the chart
  const chartData = [...checkInHistory].reverse().map((entry, index) => ({
    ...entry,
    // Shorten the date for better display on the chart
    shortDate: entry.date.includes("Today/আজ") ? "T/আ" : 
               entry.date.includes("Yesterday/গতকাল") ? "Y/গ" : 
               entry.date.includes("days ago/দিন আগে") ? `${entry.date.split(" ")[0]}d/দি` : 
               entry.date
  }))

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis 
            dataKey="shortDate" 
            tick={{ fontSize: 12 }}
            tickLine={false}
          />
          <YAxis 
            domain={[0, 10]} 
            tick={{ fontSize: 12 }}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="score" 
            stroke="#8884d8" 
            fillOpacity={1} 
            fill="url(#colorScore)" 
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

// Export function for mental health data
const exportMentalHealthData = () => {
  // Create CSV content
  let csvContent = "data:text/csv;charset=utf-8,"
  csvContent += "Date/তারিখ,Mood/মেজাজ,Score/স্কোর\n"
  
  // Add each entry to the CSV
  checkInHistory.forEach(entry => {
    csvContent += `"${entry.date}","${entry.mood}",${entry.score}\n`
  })
  
  // Create a download link and trigger the download
  const encodedUri = encodeURI(csvContent)
  const link = document.createElement("a")
  link.setAttribute("href", encodedUri)
  link.setAttribute("download", `mental_health_history_${new Date().toISOString().split('T')[0]}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export default function CheckinHistory() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Check-in History/চেক-ইন ইতিহাস</CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={exportMentalHealthData}
          className="flex items-center gap-1"
        >
          <Download className="h-4 w-4" />
          Export/রপ্তানি
        </Button>
      </CardHeader>
      <CardContent>
        {/* Chart Section */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Mood Trend/মেজাজের প্রবণতা</h3>
          <MentalHealthChart />
        </div>
        
        {/* History List */}
        <div className="space-y-3">
          {checkInHistory.map((entry, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors"
            >
              <div>
                <p className="text-sm font-medium">{entry.date}</p>
                <p className="text-xs text-muted-foreground">Score/স্কোর: {entry.score}/10</p>
              </div>
              <Badge className={getMoodColor(entry.mood)}>{entry.mood}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}