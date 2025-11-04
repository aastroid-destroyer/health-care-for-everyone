"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Clock } from "lucide-react"
import { useState } from "react"

const healthResources = [
  {
    id: 1,
    name: "Community Health Center/সম্প্রদায় স্বাস্থ্য কেন্দ্র",
    type: "clinic",
    distance: 0.8,
    lat: 23.8103,
    lng: 90.4125,
    phone: "+880-2-9134567",
    hours: "8:00 AM - 6:00 PM",
    services: ["General Checkup/সাধারণ পরীক্ষা", "Vaccination/টিকাদান", "Maternal Care/মাতৃস্বাস্থ্য সেবা"],
  },
  {
    id: 2,
    name: "Emergency Medical Unit/জরুরি চিকিৎসা ইউনিট",
    type: "hospital",
    distance: 1.2,
    lat: 23.815,
    lng: 90.42,
    phone: "+880-2-9123456",
    hours: "24/7",
    services: ["Emergency/জরুরি", "Surgery/অস্ত্রোপচার", "ICU"],
  },
  {
    id: 3,
    name: "Mental Health Support Center/মানসিক স্বাস্থ্য সহায়তা কেন্দ্র",
    type: "mental-health",
    distance: 1.5,
    lat: 23.805,
    lng: 90.405,
    phone: "+880-2-9145678",
    hours: "10:00 AM - 8:00 PM",
    services: ["Counseling/পরামর্শ", "Therapy/থেরাপি", "Crisis Support/সংকট সহায়তা"],
  },
  {
    id: 4,
    name: "Maternal & Child Health Clinic/মাতৃ ও শিশু স্বাস্থ্য ক্লিনিক",
    type: "maternal",
    distance: 2.1,
    lat: 23.82,
    lng: 90.43,
    phone: "+880-2-9156789",
    hours: "9:00 AM - 5:00 PM",
    services: ["Prenatal Care/প্রসবপূর্ব সেবা", "Vaccination/টিকাদান", "Baby Care/শিশু যত্ন"],
  },
  {
    id: 5,
    name: "Community Health Worker Hub/সম্প্রদায় স্বাস্থ্যকর্মী হাব",
    type: "clinic",
    distance: 2.5,
    lat: 23.795,
    lng: 90.395,
    phone: "+880-2-9167890",
    hours: "8:00 AM - 4:00 PM",
    services: ["Health Education/স্বাস্থ্য শিক্ষা", "Checkups/পরীক্ষা", "Referrals/রেফারেল"],
  },
]

function getTypeColor(type) {
  switch (type) {
    case "hospital":
      return "bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-200"
    case "mental-health":
      return "bg-purple-100 text-purple-800 dark:bg-purple-950/40 dark:text-purple-200"
    case "maternal":
      return "bg-pink-100 text-pink-800 dark:bg-pink-950/40 dark:text-pink-200"
    default:
      return "bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-200"
  }
}

function getTypeLabel(type) {
  switch (type) {
    case "hospital":
      return "Hospital/হাসপাতাল"
    case "mental-health":
      return "Mental Health/মানসিক স্বাস্থ্য"
    case "maternal":
      return "Maternal Care/মাতৃস্বাস্থ্য সেবা"
    default:
      return "Clinic/ক্লিনিক"
  }
}

export default function HealthMap() {
  const [selectedResource, setSelectedResource] = useState(null)

  return (
    <div className="space-y-4">
      {/* Interactive Map Visualization */}
      <Card className="border-0 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle>Community Health Resources/সম্প্রদায় স্বাস্থ্য সম্পদ</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Map Grid Visualization */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-lg p-8 relative w-full h-96">
            {/* Grid background */}
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-px opacity-10">
              {Array(16)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="border border-foreground" />
                ))}
            </div>

            {/* Your Location (center) */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/30 rounded-full blur-md animate-pulse" />
                <div className="w-6 h-6 bg-primary rounded-full border-2 border-primary-foreground relative z-10" />
              </div>
            </div>

            {/* Health Resources */}
            {healthResources.map((resource) => {
              const x = 50 + (resource.lng - 90.4125) * 500
              const y = 50 + (resource.lat - 23.8103) * 500

              return (
                <button
                  key={resource.id}
                  onClick={() => setSelectedResource(resource.id)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 transition-transform hover:scale-125"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-lg cursor-pointer ${
                      resource.type === "hospital"
                        ? "bg-red-500"
                        : resource.type === "mental-health"
                          ? "bg-purple-500"
                          : resource.type === "maternal"
                            ? "bg-pink-500"
                            : "bg-blue-500"
                    }`}
                  >
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                </button>
              )
            })}

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white dark:bg-card rounded-lg p-3 shadow-lg text-xs space-y-1 z-30">
              <p className="font-semibold mb-2">Legend/কিংবদন্তি</p>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <span>Clinic/ক্লিনিক</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <span>Hospital/হাসপাতাল</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full" />
                <span>Mental Health/মানসিক স্বাস্থ্য</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-pink-500 rounded-full" />
                <span>Maternal/মাতৃস্বাস্থ্য</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Resource Details */}
      {selectedResource && (
        <Card className="border-0 bg-gradient-to-br from-primary/5 to-accent/5 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">
                  {healthResources.find((r) => r.id === selectedResource)?.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {getTypeLabel(healthResources.find((r) => r.id === selectedResource)?.type || "")}
                </p>
              </div>
              <button
                onClick={() => setSelectedResource(null)}
                className="text-muted-foreground hover:text-foreground text-2xl"
              >
                ×
              </button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {healthResources.find((r) => r.id === selectedResource) && (
              <>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Distance/দূরত্ব</p>
                    <p className="text-xs text-muted-foreground">
                      {healthResources.find((r) => r.id === selectedResource)?.distance} km away/কিমি দূরে
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Contact/যোগাযোগ</p>
                    <p className="text-xs text-muted-foreground">
                      {healthResources.find((r) => r.id === selectedResource)?.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Hours/সময়</p>
                    <p className="text-xs text-muted-foreground">
                      {healthResources.find((r) => r.id === selectedResource)?.hours}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Services/সেবাসমূহ</p>
                  <div className="flex flex-wrap gap-2">
                    {healthResources
                      .find((r) => r.id === selectedResource)
                      ?.services.map((service, i) => (
                        <span key={i} className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-md">
                          {service}
                        </span>
                      ))}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}