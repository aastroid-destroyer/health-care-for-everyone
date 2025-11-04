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
  { id: 1, week: 12, name: "First ANC Visit/প্রথম এএনসি সফর", description: "Initial checkup and blood tests/প্রাথমিক পরীক্ষা এবং রক্ত পরীক্ষা" },
  { id: 2, week: 20, name: "Second ANC Visit/দ্বিতীয় এএনসি সফর", description: "Anomaly scan and routine checkup/অস্বাভাবিকতা স্ক্যান এবং নিয়মিত পরীক্ষা" },
  { id: 3, week: 26, name: "Third ANC Visit/তৃতীয় এএনসি সফর", description: "Growth assessment and anemia screening/বৃদ্ধি মূল্যায়ন এবং রক্তস্বল্পতা স্ক্রীনিং" },
  { id: 4, week: 30, name: "Fourth ANC Visit/চতুর্থ এএনসি সফর", description: "Routine checkup and birth plan/নিয়মিত পরীক্ষা এবং প্রসব পরিকল্পনা" },
  { id: 5, week: 34, name: "Fifth ANC Visit/পঞ্চম এএনসি সফর", description: "Final checkup before delivery/প্রসবের আগে চূড়ান্ত পরীক্ষা" },
]

// EPI vaccination schedule (Bangladesh)
const VACCINE_SCHEDULE = [
  { id: 1, name: "BCG", dueAt: "At birth/জন্মের সময়", description: "Tuberculosis vaccine/যক্ষ্মা টিকা" },
  { id: 2, name: "OPV-0", dueAt: "At birth/জন্মের সময়", description: "Polio vaccine - birth dose/পোলিও টিকা - জন্ম ডোজ" },
  { id: 3, name: "OPV-1", dueAt: "6 weeks/৬ সপ্তাহ", description: "Polio vaccine - first dose/পোলিও টিকা - প্রথম ডোজ" },
  { id: 4, name: "DPT-HepB-Hib-1", dueAt: "6 weeks/৬ সপ্তাহ", description: "Pentavalent vaccine - first dose/পেন্টাভ্যালেন্ট টিকা - প্রথম ডোজ" },
  { id: 5, name: "PCV-1", dueAt: "6 weeks/৬ সপ্তাহ", description: "Pneumococcal vaccine - first dose/নিউমোকক্কাল টিকা - প্রথম ডোজ" },
  { id: 6, name: "OPV-2", dueAt: "10 weeks/১০ সপ্তাহ", description: "Polio vaccine - second dose/পোলিও টিকা - দ্বিতীয় ডোজ" },
  { id: 7, name: "DPT-HepB-Hib-2", dueAt: "10 weeks/১০ সপ্তাহ", description: "Pentavalent vaccine - second dose/পেন্টাভ্যালেন্ট টিকা - দ্বিতীয় ডোজ" },
  { id: 8, name: "PCV-2", dueAt: "10 weeks/১০ সপ্তাহ", description: "Pneumococcal vaccine - second dose/নিউমোকক্কাল টিকা - দ্বিতীয় ডোজ" },
  { id: 9, name: "OPV-3", dueAt: "14 weeks/১৪ সপ্তাহ", description: "Polio vaccine - third dose/পোলিও টিকা - তৃতীয় ডোজ" },
  { id: 10, name: "DPT-HepB-Hib-3", dueAt: "14 weeks/১৪ সপ্তাহ", description: "Pentavalent vaccine - third dose/পেন্টাভ্যালেন্ট টিকা - তৃতীয় ডোজ" },
  { id: 11, name: "PCV-3", dueAt: "14 weeks/১৪ সপ্তাহ", description: "Pneumococcal vaccine - third dose/নিউমোকক্কাল টিকা - তৃতীয় ডোজ" },
  { id: 12, name: "MR-1", dueAt: "9 months/৯ মাস", description: "Measles-Rubella vaccine - first dose/হাম-রুবেলা টিকা - প্রথম ডোজ" },
  { id: 13, name: "JE-1", dueAt: "9 months/৯ মাস", description: "Japanese Encephalitis vaccine - first dose/জাপানি এনসেফালাইটিস টিকা - প্রথম ডোজ" },
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
        <h3 className="text-sm font-medium text-center mb-2">ANC Visit Timeline/এএনসি সফরের সময়রেখা</h3>
        
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
            <span className="text-xs">Completed/সম্পন্ন</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
            <span className="text-xs">Upcoming/আসন্ন</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-xs">Overdue/বিলম্বিত</span>
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
        <h3 className="text-sm font-medium text-center mb-2">Vaccination Timeline/টিকাদানের সময়রেখা</h3>
        
        {/* Chart Area */}
        <div className="relative h-40">
          {/* X-axis line */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-300"></div>
          
          {/* Y-axis line */}
          <div className="absolute bottom-0 left-0 top-0 w-0.5 bg-gray-300"></div>
          
          {/* X-axis labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500">
            <span>Birth/জন্ম</span>
            <span>3m/৩মাস</span>
            <span>6m/৬মাস</span>
            <span>9m/৯মাস</span>
            <span>12m/১২মাস</span>
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
            <span className="text-xs">Completed/সম্পন্ন</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
            <span className="text-xs">Upcoming/আসন্ন</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-xs">Overdue/বিলম্বিত</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to get vaccine due in months
function getVaccineDueMonths(dueAt) {
  if (dueAt === "At birth/জন্মের সময়") return 0
  if (dueAt === "6 weeks/৬ সপ্তাহ") return 1.5
  if (dueAt === "10 weeks/১০ সপ্তাহ") return 2.5
  if (dueAt === "14 weeks/১৪ সপ্তাহ") return 3.5
  if (dueAt === "9 months/৯ মাস") return 9
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
    csvContent += "ANC Visit Schedule/এএনসি সফরের সময়সূচী\n"
    csvContent += "Visit Number/সফর নম্বর,Week/সপ্তাহ,Name/নাম,Description/বর্ণনা,Status/অবস্থা\n"
    ANC_VISITS.forEach(visit => {
      const status = completedAncVisits.includes(visit.id) ? "Completed/সম্পন্ন" : 
                    currentWeek >= visit.week ? "Overdue/বিলম্বিত" : "Upcoming/আসন্ন"
      csvContent += `${visit.id},${visit.week},"${visit.name}","${visit.description}",${status}\n`
    })
    
    // Vaccines
    csvContent += "\nVaccination Schedule/টিকাদানের সময়সূচী\n"
    csvContent += "Vaccine Name/টিকার নাম,Due At/তারিখ,Description/বর্ণনা,Status/অবস্থা\n"
    VACCINE_SCHEDULE.forEach(vaccine => {
      const status = completedVaccines.includes(vaccine.id) ? "Completed/সম্পন্ন" : 
                    childAgeMonths >= getVaccineDueMonths(vaccine.dueAt) ? "Overdue/বিলম্বিত" : "Upcoming/আসন্ন"
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
                <h1 className="text-2xl font-bold tracking-tight text-foreground">Maternal & Child Health Tracker/মাতৃ ও শিশু স্বাস্থ্য ট্র্যাকার</h1>
                <p className="text-sm text-muted-foreground">Monitor pregnancy & child vaccination journey/গর্ভাবস্থা এবং শিশু টিকাদান যাত্রা পর্যবেক্ষণ করুন</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="pregnancy" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="pregnancy">Pregnancy Tracker/গর্ভাবস্থা ট্র্যাকার</TabsTrigger>
            <TabsTrigger value="child">Child Vaccination/শিশু টিকাদান</TabsTrigger>
          </TabsList>
          
          {/* Pregnancy Tracker Tab */}
          <TabsContent value="pregnancy" className="space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Pregnancy Input */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-pink-500" />
                    Pregnancy Details/গর্ভাবস্থার বিবরণ
                  </CardTitle>
                  <CardDescription>
                    Enter your LMP or due date to track your pregnancy/আপনার গর্ভাবস্থা ট্র্যাক করতে আপনার LMP বা নির্ধারিত তারিখ লিখুন
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="lmp">Last Menstrual Period/শেষ মাসিক</Label>
                    <Input
                      id="lmp"
                      type="date"
                      value={lmpDate}
                      onChange={(e) => setLmpDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="due">Due Date/নির্ধারিত তারিখ</Label>
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
                        Current Week: {currentWeek} of 40/বর্তমান সপ্তাহ: {currentWeek} এর ৪০
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
                    ANC Visit Progress Chart/এএনসি সফর অগ্রগতি চার্ট
                  </CardTitle>
                  <CardDescription>
                    Visual timeline of your antenatal care visits/আপনার প্রসবপূর্ব যত্নের সফরের ভিজ্যুয়াল সময়রেখা
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
                <CardTitle>ANC Visit Schedule/এএনসি সফরের সময়সূচী</CardTitle>
                <CardDescription>
                  Track your Antenatal Care visits/আপনার প্রসবপূর্ব যত্নের সফর ট্র্যাক করুন
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium">
                    {completedAncVisits.length} of {ANC_VISITS.length} visits completed/সম্পন্ন হয়েছে
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
                          {isCompleted ? "Completed/সম্পন্ন" : "Mark as Done"}
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
                    Child Details/শিশুর বিবরণ
                  </CardTitle>
                  <CardDescription>
                    Enter your child's date of birth to track vaccinations/টিকাদান ট্র্যাক করতে আপনার শিশুর জন্ম তারিখ লিখুন
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth/জন্ম তারিখ</Label>
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
                        Current Age: {childAgeMonths} months/বর্তমান বয়স: {childAgeMonths} মাস
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
                    Vaccination Progress Chart/টিকাদান অগ্রগতি চার্ট
                  </CardTitle>
                  <CardDescription>
                    Visual timeline of your child's vaccination schedule/আপনার শিশুর টিকাদানের সময়সূচীর ভিজ্যুয়াল সময়রেখা
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
                <CardTitle>Vaccination Schedule/টিকাদানের সময়সূচী</CardTitle>
                <CardDescription>
                  Track your child's EPI vaccination schedule (Bangladesh)/আপনার শিশুর ইপিআই টিকাদানের সময়সূচী ট্র্যাক করুন (বাংলাদেশ)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium">
                    {completedVaccines.length} of {VACCINE_SCHEDULE.length} vaccines completed/সম্পন্ন হয়েছে
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
                          {isCompleted ? "Completed/সম্পন্ন" : "Mark as Done"}
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
            <CardTitle>Metrics & Reminders/মেট্রিক্স এবং স্মরণীয়</CardTitle>
            <CardDescription>
              Overview of your maternal and child health journey/আপনার মাতৃ ও শিশু স্বাস্থ্য যাত্রার সারসংক্ষেপ
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="p-4 bg-pink-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-pink-800">ANC Visits/এএনসি সফর</p>
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
                    <p className="text-sm font-medium text-blue-800">Vaccines/টিকা</p>
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
                    <p className="text-sm font-medium text-amber-800">Overdue/বিলম্বিত</p>
                    <p className="text-2xl font-bold text-amber-900">
                      {ANC_VISITS.filter(v => currentWeek > v.week && !completedAncVisits.includes(v.id)).length +
                      VACCINE_SCHEDULE.filter(v => childAgeMonths > getVaccineDueMonths(v.dueAt) && !completedVaccines.includes(v.id)).length}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                    <AlertCircle className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
                <p className="text-xs text-amber-700 mt-2">Items requiring attention/মনোযোগ প্রয়োজনীয় আইটেম</p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-800">Completed/সম্পন্ন</p>
                    <p className="text-2xl font-bold text-green-900">
                      {completedAncVisits.length + completedVaccines.length}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <p className="text-xs text-green-700 mt-2">Total items completed/সর্বমোট সম্পন্ন আইটেম</p>
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