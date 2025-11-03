"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Baby, Calendar, CheckCircle, AlertCircle, Download, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// ANC visit schedule (weeks of pregnancy)
const ANC_VISITS = [
  { id: 1, week: 12, name: "First ANC Visit", description: "Initial checkup and blood tests" },
  { id: 2, week: 20, name: "Second ANC Visit", description: "Anomaly scan and routine checkup" },
  { id: 3, week: 26, name: "Third ANC Visit", description: "Growth assessment and anemia screening" },
  { id: 4, week: 30, name: "Fourth ANC Visit", description: "Routine checkup and birth plan" },
  { id: 5, week: 34, name: "Fifth ANC Visit", description: "Final checkup before delivery" },
]

// EPI vaccination schedule (Bangladesh)
const VACCINE_SCHEDULE = [
  { id: 1, name: "BCG", dueAt: "At birth", description: "Tuberculosis vaccine" },
  { id: 2, name: "OPV-0", dueAt: "At birth", description: "Polio vaccine - birth dose" },
  { id: 3, name: "OPV-1", dueAt: "6 weeks", description: "Polio vaccine - first dose" },
  { id: 4, name: "DPT-HepB-Hib-1", dueAt: "6 weeks", description: "Pentavalent vaccine - first dose" },
  { id: 5, name: "PCV-1", dueAt: "6 weeks", description: "Pneumococcal vaccine - first dose" },
  { id: 6, name: "OPV-2", dueAt: "10 weeks", description: "Polio vaccine - second dose" },
  { id: 7, name: "DPT-HepB-Hib-2", dueAt: "10 weeks", description: "Pentavalent vaccine - second dose" },
  { id: 8, name: "PCV-2", dueAt: "10 weeks", description: "Pneumococcal vaccine - second dose" },
  { id: 9, name: "OPV-3", dueAt: "14 weeks", description: "Polio vaccine - third dose" },
  { id: 10, name: "DPT-HepB-Hib-3", dueAt: "14 weeks", description: "Pentavalent vaccine - third dose" },
  { id: 11, name: "PCV-3", dueAt: "14 weeks", description: "Pneumococcal vaccine - third dose" },
  { id: 12, name: "MR-1", dueAt: "9 months", description: "Measles-Rubella vaccine - first dose" },
  { id: 13, name: "JE-1", dueAt: "9 months", description: "Japanese Encephalitis vaccine - first dose" },
]

// Custom Chart Component for ANC Visits
function ANCVisitChart({ currentWeek, completedVisits }) {
  const maxWeek = 40;
  const chartHeight = 200;
  const chartWidth = 100;
  
  // Generate data points for the chart
  const dataPoints = ANC_VISITS.map(visit => {
    const isCompleted = completedVisits.includes(visit.id);
    const isOverdue = currentWeek > visit.week && !isCompleted;
    const isUpcoming = currentWeek <= visit.week && !isCompleted;
    
    return {
      week: visit.week,
      isCompleted,
      isOverdue,
      isUpcoming,
      name: visit.name
    };
  });
  
  return (
    <div className="w-full h-full p-4">
      <div className="relative h-full">
        {/* Chart Title */}
        <h3 className="text-sm font-medium text-center mb-2">ANC Visit Timeline</h3>
        
        {/* Chart Area */}
        <div className="relative h-40">
          {/* X-axis line */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-300"></div>
          
          {/* Y-axis line */}
          <div className="absolute bottom-0 left-0 top-0 w-0.5 bg-gray-300"></div>
          
          {/* X-axis labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500">
            <span>0</span>
            <span>10</span>
            <span>20</span>
            <span>30</span>
            <span>40</span>
          </div>
          
          {/* Current week indicator */}
          {currentWeek > 0 && (
            <div 
              className="absolute bottom-0 top-0 w-0.5 bg-blue-400"
              style={{ left: `${(currentWeek / maxWeek) * 100}%` }}
            >
              <div className="absolute -top-5 -left-4 text-xs bg-blue-400 text-white px-1 rounded">
                {currentWeek}w
              </div>
            </div>
          )}
          
          {/* Data points */}
          {dataPoints.map((point, index) => {
            const leftPosition = (point.week / maxWeek) * 100;
            const color = point.isCompleted ? "bg-green-500" : 
                         point.isOverdue ? "bg-red-500" : "bg-gray-400";
            
            return (
              <div key={index}>
                {/* Vertical line */}
                <div 
                  className={`absolute bottom-0 w-0.5 ${color}`}
                  style={{ 
                    left: `${leftPosition}%`, 
                    height: point.isCompleted ? "80%" : "40%" 
                  }}
                ></div>
                
                {/* Data point */}
                <div 
                  className={`absolute bottom-0 w-3 h-3 rounded-full ${color} transform -translate-x-1/2`}
                  style={{ left: `${leftPosition}%` }}
                  title={point.name}
                ></div>
              </div>
            );
          })}
        </div>
        
        {/* Legend */}
        <div className="flex justify-center gap-4 mt-4">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs">Completed</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
            <span className="text-xs">Upcoming</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-xs">Overdue</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Custom Chart Component for Vaccinations
function VaccinationChart({ childAgeMonths, completedVaccines }) {
  const maxAge = 12; // Maximum age in months for the chart
  
  // Generate data points for the chart
  const dataPoints = VACCINE_SCHEDULE.map(vaccine => {
    const isCompleted = completedVaccines.includes(vaccine.id);
    const dueMonths = getVaccineDueMonths(vaccine.dueAt);
    const isOverdue = childAgeMonths > dueMonths && !isCompleted;
    const isUpcoming = childAgeMonths <= dueMonths && !isCompleted;
    
    return {
      name: vaccine.name,
      dueMonths,
      isCompleted,
      isOverdue,
      isUpcoming
    };
  });
  
  return (
    <div className="w-full h-full p-4">
      <div className="relative h-full">
        {/* Chart Title */}
        <h3 className="text-sm font-medium text-center mb-2">Vaccination Timeline</h3>
        
        {/* Chart Area */}
        <div className="relative h-40">
          {/* X-axis line */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-300"></div>
          
          {/* Y-axis line */}
          <div className="absolute bottom-0 left-0 top-0 w-0.5 bg-gray-300"></div>
          
          {/* X-axis labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500">
            <span>Birth</span>
            <span>3m</span>
            <span>6m</span>
            <span>9m</span>
            <span>12m</span>
          </div>
          
          {/* Current age indicator */}
          {childAgeMonths > 0 && (
            <div 
              className="absolute bottom-0 top-0 w-0.5 bg-blue-400"
              style={{ left: `${(childAgeMonths / maxAge) * 100}%` }}
            >
              <div className="absolute -top-5 -left-4 text-xs bg-blue-400 text-white px-1 rounded">
                {childAgeMonths}m
              </div>
            </div>
          )}
          
          {/* Data points */}
          {dataPoints.map((point, index) => {
            const leftPosition = (point.dueMonths / maxAge) * 100;
            const color = point.isCompleted ? "bg-green-500" : 
                         point.isOverdue ? "bg-red-500" : "bg-gray-400";
            
            return (
              <div key={index}>
                {/* Vertical line */}
                <div 
                  className={`absolute bottom-0 w-0.5 ${color}`}
                  style={{ 
                    left: `${leftPosition}%`, 
                    height: point.isCompleted ? "80%" : "40%" 
                  }}
                ></div>
                
                {/* Data point */}
                <div 
                  className={`absolute bottom-0 w-3 h-3 rounded-full ${color} transform -translate-x-1/2`}
                  style={{ left: `${leftPosition}%` }}
                  title={point.name}
                ></div>
              </div>
            );
          })}
        </div>
        
        {/* Legend */}
        <div className="flex justify-center gap-4 mt-4">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs">Completed</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
            <span className="text-xs">Upcoming</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-xs">Overdue</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to get vaccine due in months
function getVaccineDueMonths(dueAt) {
  if (dueAt === "At birth") return 0
  if (dueAt === "6 weeks") return 1.5
  if (dueAt === "10 weeks") return 2.5
  if (dueAt === "14 weeks") return 3.5
  if (dueAt === "9 months") return 9
  return 0
}

export default function MaternalHealthPage() {
  // Pregnancy tracker state
  const [lmpDate, setLmpDate] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [currentWeek, setCurrentWeek] = useState(0)
  const [completedAncVisits, setCompletedAncVisits] = useState([])
  
  // Child vaccination tracker state
  const [childDob, setChildDob] = useState("")
  const [childAgeMonths, setChildAgeMonths] = useState(0)
  const [completedVaccines, setCompletedVaccines] = useState([])
  
  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem("maternalHealthData")
      if (savedData) {
        const parsed = JSON.parse(savedData)
        if (parsed.lmpDate) setLmpDate(parsed.lmpDate)
        if (parsed.dueDate) setDueDate(parsed.dueDate)
        if (parsed.currentWeek) setCurrentWeek(parsed.currentWeek)
        if (parsed.completedAncVisits) setCompletedAncVisits(parsed.completedAncVisits)
        if (parsed.childDob) setChildDob(parsed.childDob)
        if (parsed.childAgeMonths) setChildAgeMonths(parsed.childAgeMonths)
        if (parsed.completedVaccines) setCompletedVaccines(parsed.completedVaccines)
      }
    } catch (e) {
      console.error("Error loading saved data:", e)
    }
  }, [])
  
  // Save data to localStorage whenever it changes
  useEffect(() => {
    try {
      const dataToSave = {
        lmpDate,
        dueDate,
        currentWeek,
        completedAncVisits,
        childDob,
        childAgeMonths,
        completedVaccines
      }
      localStorage.setItem("maternalHealthData", JSON.stringify(dataToSave))
    } catch (e) {
      console.error("Error saving data:", e)
    }
  }, [lmpDate, dueDate, currentWeek, completedAncVisits, childDob, childAgeMonths, completedVaccines])
  
  // Calculate due date when LMP changes
  useEffect(() => {
    if (lmpDate) {
      const lmp = new Date(lmpDate)
      const due = new Date(lmp)
      due.setDate(due.getDate() + 280) // 40 weeks
      setDueDate(due.toISOString().split('T')[0])
      
      // Calculate current week
      const today = new Date()
      const diffTime = Math.abs(today - lmp)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      const week = Math.min(Math.floor(diffDays / 7), 40)
      setCurrentWeek(week)
    }
  }, [lmpDate])
  
  // Calculate child's age in months when DOB changes
  useEffect(() => {
    if (childDob) {
      const dob = new Date(childDob)
      const today = new Date()
      const diffTime = Math.abs(today - dob)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      const months = Math.floor(diffDays / 30.44) // Average days in a month
      setChildAgeMonths(months)
    }
  }, [childDob])
  
  // Toggle ANC visit completion
  const toggleAncVisit = (visitId) => {
    setCompletedAncVisits(prev => 
      prev.includes(visitId) 
        ? prev.filter(id => id !== visitId)
        : [...prev, visitId]
    )
  }
  
  // Toggle vaccine completion
  const toggleVaccine = (vaccineId) => {
    setCompletedVaccines(prev => 
      prev.includes(vaccineId) 
        ? prev.filter(id => id !== vaccineId)
        : [...prev, vaccineId]
    )
  }
  
  // Calculate ANC progress
  const ancProgress = Math.round((completedAncVisits.length / ANC_VISITS.length) * 100)
  
  // Calculate vaccine progress
  const vaccineProgress = Math.round((completedVaccines.length / VACCINE_SCHEDULE.length) * 100)
  
  // Export schedule as CSV
  const exportSchedule = () => {
    let csvContent = "data:text/csv;charset=utf-8,"
    
    // ANC visits
    csvContent += "ANC Visit Schedule\n"
    csvContent += "Visit Number,Week,Name,Description,Status\n"
    ANC_VISITS.forEach(visit => {
      const status = completedAncVisits.includes(visit.id) ? "Completed" : 
                    currentWeek >= visit.week ? "Overdue" : "Upcoming"
      csvContent += `${visit.id},${visit.week},"${visit.name}","${visit.description}",${status}\n`
    })
    
    // Vaccines
    csvContent += "\nVaccination Schedule\n"
    csvContent += "Vaccine Name,Due At,Description,Status\n"
    VACCINE_SCHEDULE.forEach(vaccine => {
      const status = completedVaccines.includes(vaccine.id) ? "Completed" : 
                    childAgeMonths >= getVaccineDueMonths(vaccine.dueAt) ? "Overdue" : "Upcoming"
      csvContent += `"${vaccine.name}","${vaccine.dueAt}","${vaccine.description}",${status}\n`
    })
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "maternal_health_schedule.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  
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
              <div className="rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 p-2.5 shadow-md">
                <Baby className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">Maternal & Child Health Tracker</h1>
                <p className="text-sm text-muted-foreground">Monitor pregnancy & child vaccination journey</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="pregnancy" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="pregnancy">Pregnancy Tracker</TabsTrigger>
            <TabsTrigger value="child">Child Vaccination</TabsTrigger>
          </TabsList>
          
          {/* Pregnancy Tracker Tab */}
          <TabsContent value="pregnancy" className="space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Pregnancy Input */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-pink-500" />
                    Pregnancy Details
                  </CardTitle>
                  <CardDescription>
                    Enter your LMP or due date to track your pregnancy
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="lmp">Last Menstrual Period</Label>
                    <Input
                      id="lmp"
                      type="date"
                      value={lmpDate}
                      onChange={(e) => setLmpDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="due">Due Date</Label>
                    <Input
                      id="due"
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                    />
                  </div>
                  {currentWeek > 0 && (
                    <div className="p-3 bg-pink-50 rounded-lg">
                      <p className="text-sm font-medium text-pink-800">
                        Current Week: {currentWeek} of 40
                      </p>
                      <Progress value={(currentWeek / 40) * 100} className="mt-2" />
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* ANC Chart */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-pink-500" />
                    ANC Visit Progress Chart
                  </CardTitle>
                  <CardDescription>
                    Visual timeline of your antenatal care visits
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ANCVisitChart currentWeek={currentWeek} completedVisits={completedAncVisits} />
                </CardContent>
              </Card>
            </div>
            
            {/* ANC Visit List */}
            <Card>
              <CardHeader>
                <CardTitle>ANC Visit Schedule</CardTitle>
                <CardDescription>
                  Track your Antenatal Care visits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium">
                    {completedAncVisits.length} of {ANC_VISITS.length} visits completed
                  </span>
                  <span className="text-sm text-muted-foreground">{ancProgress}%</span>
                </div>
                <Progress value={ancProgress} className="mb-6" />
                
                <div className="space-y-3">
                  {ANC_VISITS.map(visit => {
                    const isCompleted = completedAncVisits.includes(visit.id)
                    const isOverdue = currentWeek > visit.week && !isCompleted
                    const isUpcoming = currentWeek <= visit.week && !isCompleted
                    
                    return (
                      <div key={visit.id} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isCompleted ? 'bg-green-100' : isOverdue ? 'bg-red-100' : 'bg-gray-100'
                          }`}>
                            {isCompleted ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : isOverdue ? (
                              <AlertCircle className="h-5 w-5 text-red-600" />
                            ) : (
                              <span className="text-sm font-medium">{visit.week}w</span>
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium">{visit.name}</h4>
                            <p className="text-sm text-muted-foreground">{visit.description}</p>
                          </div>
                        </div>
                        <Button
                          variant={isCompleted ? "outline" : "default"}
                          size="sm"
                          onClick={() => toggleAncVisit(visit.id)}
                        >
                          {isCompleted ? "Completed" : "Mark as Done"}
                        </Button>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Child Vaccination Tab */}
          <TabsContent value="child" className="space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Child Details */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Baby className="h-5 w-5 text-blue-500" />
                    Child Details
                  </CardTitle>
                  <CardDescription>
                    Enter your child's date of birth to track vaccinations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={childDob}
                      onChange={(e) => setChildDob(e.target.value)}
                    />
                  </div>
                  {childAgeMonths > 0 && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-800">
                        Current Age: {childAgeMonths} months
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Vaccination Chart */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-500" />
                    Vaccination Progress Chart
                  </CardTitle>
                  <CardDescription>
                    Visual timeline of your child's vaccination schedule
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <VaccinationChart childAgeMonths={childAgeMonths} completedVaccines={completedVaccines} />
                </CardContent>
              </Card>
            </div>
            
            {/* Vaccination List */}
            <Card>
              <CardHeader>
                <CardTitle>Vaccination Schedule</CardTitle>
                <CardDescription>
                  Track your child's EPI vaccination schedule (Bangladesh)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium">
                    {completedVaccines.length} of {VACCINE_SCHEDULE.length} vaccines completed
                  </span>
                  <span className="text-sm text-muted-foreground">{vaccineProgress}%</span>
                </div>
                <Progress value={vaccineProgress} className="mb-6" />
                
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {VACCINE_SCHEDULE.map(vaccine => {
                    const isCompleted = completedVaccines.includes(vaccine.id)
                    const dueMonths = getVaccineDueMonths(vaccine.dueAt)
                    const isOverdue = childAgeMonths > dueMonths && !isCompleted
                    const isUpcoming = childAgeMonths <= dueMonths && !isCompleted
                    
                    return (
                      <div key={vaccine.id} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isCompleted ? 'bg-green-100' : isOverdue ? 'bg-red-100' : 'bg-gray-100'
                          }`}>
                            {isCompleted ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : isOverdue ? (
                              <AlertCircle className="h-5 w-5 text-red-600" />
                            ) : (
                              <span className="text-xs font-medium">{vaccine.dueAt}</span>
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium">{vaccine.name}</h4>
                            <p className="text-sm text-muted-foreground">{vaccine.description}</p>
                          </div>
                        </div>
                        <Button
                          variant={isCompleted ? "outline" : "default"}
                          size="sm"
                          onClick={() => toggleVaccine(vaccine.id)}
                        >
                          {isCompleted ? "Completed" : "Mark as Done"}
                        </Button>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Metrics & Reminders */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Metrics & Reminders</CardTitle>
            <CardDescription>
              Overview of your maternal and child health journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="p-4 bg-pink-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-pink-800">ANC Visits</p>
                    <p className="text-2xl font-bold text-pink-900">
                      {completedAncVisits.length}/{ANC_VISITS.length}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-pink-600" />
                  </div>
                </div>
                <Progress value={ancProgress} className="mt-2" />
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-800">Vaccines</p>
                    <p className="text-2xl font-bold text-blue-900">
                      {completedVaccines.length}/{VACCINE_SCHEDULE.length}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Baby className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <Progress value={vaccineProgress} className="mt-2" />
              </div>
              
              <div className="p-4 bg-amber-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-amber-800">Overdue</p>
                    <p className="text-2xl font-bold text-amber-900">
                      {ANC_VISITS.filter(v => currentWeek > v.week && !completedAncVisits.includes(v.id)).length +
                      VACCINE_SCHEDULE.filter(v => childAgeMonths > getVaccineDueMonths(v.dueAt) && !completedVaccines.includes(v.id)).length}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                    <AlertCircle className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
                <p className="text-xs text-amber-700 mt-2">Items requiring attention</p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-800">Completed</p>
                    <p className="text-2xl font-bold text-green-900">
                      {completedAncVisits.length + completedVaccines.length}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <p className="text-xs text-green-700 mt-2">Total items completed</p>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button variant="outline" onClick={exportSchedule} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export Schedule
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}