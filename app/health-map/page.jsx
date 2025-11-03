"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, MapPin, Search, Navigation, Phone, Star, Clock, Accessibility, Globe, User, Home, Pill, Stethoscope, Users, ChevronRight, AlertCircle, Download, Info } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

// Mock data for healthcare facilities
const HEALTH_FACILITIES = [
  {
    id: 1,
    name: "Dhaka Medical College Hospital",
    type: "hospital",
    address: "Shahbagh, Dhaka",
    lat: 23.7383,
    lng: 90.3939,
    phone: "+880-2-8616661",
    rating: 4.2,
    hours: "24/7",
    accessibility: true,
    services: ["Emergency", "Surgery", "Maternity", "Pediatrics"],
    distance: 2.5,
    travelTime: "15 min"
  },
  {
    id: 2,
    name: "Community Health Worker - Rahima",
    type: "chw",
    address: "Mirpur, Dhaka",
    lat: 23.8041,
    lng: 90.3659,
    phone: "+880-1712345678",
    rating: 4.8,
    hours: "9am-5pm",
    accessibility: true,
    services: ["Basic checkup", "Health education", "Referral"],
    distance: 1.2,
    travelTime: "8 min"
  },
  {
    id: 3,
    name: "Amena Pharmacy",
    type: "pharmacy",
    address: "Dhanmondi, Dhaka",
    lat: 23.7465,
    lng: 90.3760,
    phone: "+880-2-8618787",
    rating: 4.0,
    hours: "8am-10pm",
    accessibility: false,
    services: ["Medicines", "Basic health products"],
    distance: 0.8,
    travelTime: "5 min"
  },
  {
    id: 4,
    name: "Maternal Health Clinic",
    type: "clinic",
    address: "Mohammadpur, Dhaka",
    lat: 23.7573,
    lng: 90.3599,
    phone: "+880-2-9123456",
    rating: 4.5,
    hours: "9am-6pm",
    accessibility: true,
    services: ["Prenatal care", "Postnatal care", "Family planning"],
    distance: 3.1,
    travelTime: "20 min"
  },
  {
    id: 5,
    name: "Trained Birth Attendant - Fatema",
    type: "non-traditional",
    address: "Uttara, Dhaka",
    lat: 23.8723,
    lng: 90.3976,
    phone: "+880-1912345678",
    rating: 4.7,
    hours: "On call",
    accessibility: true,
    services: ["Home delivery support", "Postnatal care"],
    distance: 4.5,
    travelTime: "30 min"
  }
]

// Mock HealthMap Component
function HealthMap({ facilities, userLocation, selectedFacility, setSelectedFacility, locationPermissionStatus }) {
  const [mapView, setMapView] = useState("map") // "map" or "list"

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <CardTitle className="text-lg">Health Resources Near You</CardTitle>
          <div className="flex gap-2">
            <Button
              variant={mapView === "map" ? "default" : "outline"}
              size="sm"
              onClick={() => setMapView("map")}
            >
              Map View
            </Button>
            <Button
              variant={mapView === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setMapView("list")}
            >
              List View
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {mapView === "map" ? (
          <div className="relative h-96 bg-slate-100 rounded-lg overflow-hidden">
            {/* Mock map - in a real app, this would be an actual map component */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Interactive Map View</p>
                <p className="text-sm text-muted-foreground">Showing {facilities.length} facilities</p>
                {locationPermissionStatus === "denied" && (
                  <p className="text-xs text-amber-600 mt-2 flex items-center justify-center gap-1">
                    <Info className="h-3 w-3" />
                    Location permission denied - showing default location
                  </p>
                )}
                {locationPermissionStatus === "unavailable" && (
                  <p className="text-xs text-amber-600 mt-2 flex items-center justify-center gap-1">
                    <Info className="h-3 w-3" />
                    Location unavailable - showing default location
                  </p>
                )}
              </div>
            </div>

            {/* Mock map markers */}
            {facilities.map((facility) => (
              <div
                key={facility.id}
                className={`absolute w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                  selectedFacility?.id === facility.id ? "bg-primary" :
                  facility.type === "hospital" ? "bg-red-500" :
                  facility.type === "clinic" ? "bg-blue-500" :
                  facility.type === "pharmacy" ? "bg-green-500" :
                  facility.type === "chw" ? "bg-purple-500" :
                  "bg-orange-500"
                }`}
                style={{
                  left: `${20 + (facility.lng - 90.35) * 100}%`,
                  top: `${50 - (facility.lat - 23.7) * 100}%`
                }}
                onClick={() => setSelectedFacility(facility)}
              >
                <MapPin className="h-4 w-4 text-white" />
              </div>
            ))}

            {/* User location marker */}
            {userLocation && (
              <div
                className="absolute w-4 h-4 rounded-full bg-blue-600 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
                style={{
                  left: `${20 + (userLocation.lng - 90.35) * 100}%`,
                  top: `${50 - (userLocation.lat - 23.7) * 100}%`
                }}
              />
            )}
          </div>
        ) : (
          <div className="h-96 overflow-y-auto p-4">
            <div className="space-y-3">
              {facilities.map((facility) => (
                <div
                  key={facility.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedFacility?.id === facility.id ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedFacility(facility)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{facility.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {facility.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{facility.address}</p>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {facility.distance} km
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {facility.travelTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          {facility.rating}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Mock ResourceList Component
function ResourceList({ facilities, selectedFacility, setSelectedFacility, filters, setFilters }) {
  const [bengaliMode, setBengaliMode] = useState(false)

  const bengaliText = {
    "Where can I get help near me?": "আমার কাছে কোথায় সাহায্য পাব?",
    "Search for healthcare facilities": "স্বাস্থ্যসেবা সুবিধা অনুসন্ধান করুন",
    "Filter by type": "ধরন অনুযায়ী ফিল্টার করুন",
    "Show accessible only": "শুধুমাত্র অ্যাক্সেসযোগ্য দেখান",
    "All types": "সব ধরন",
    "Hospital": "হাসপাতাল",
    "Clinic": "ক্লিনিক",
    "Pharmacy": "ফার্মেসি",
    "Community Health Worker": "সম্প্রদায় স্বাস্থ্যকর্মী",
    "Non-traditional Support": "অ-ঐতিহ্যবাহী সমর্থন",
    "No facilities found": "কোন সুবিধা পাওয়া যায়নি",
    "Directions": "নির্দেশনা",
    "Call": "কল করুন",
    "Services": "সেবা",
    "Hours": "সময়",
    "Accessibility": "অ্যাক্সেসযোগ্যতা",
    "Available": "উপলব্ধ",
    "Not available": "অনুপলব্ধ"
  }

  const t = (key) => bengaliMode ? (bengaliText[key] || key) : key

  const filteredFacilities = facilities.filter(facility => {
    if (filters.type && filters.type !== "all" && facility.type !== filters.type) return false
    if (filters.accessibleOnly && !facility.accessibility) return false
    return true
  })

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <CardTitle className="text-lg">{t("Where can I get help near me?")}</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setBengaliMode(!bengaliMode)}
            className="flex items-center gap-1"
          >
            <Globe className="h-3 w-3" />
            {bengaliMode ? "EN" : "BN"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("Search for healthcare facilities")}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        <div className="space-y-3">
          <div>
            <Label className="text-xs font-medium">{t("Filter by type")}</Label>
            <Select value={filters.type || "all"} onValueChange={(value) => setFilters({...filters, type: value})}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("All types")}</SelectItem>
                <SelectItem value="hospital">{t("Hospital")}</SelectItem>
                <SelectItem value="clinic">{t("Clinic")}</SelectItem>
                <SelectItem value="pharmacy">{t("Pharmacy")}</SelectItem>
                <SelectItem value="chw">{t("Community Health Worker")}</SelectItem>
                <SelectItem value="non-traditional">{t("Non-traditional Support")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-xs font-medium">{t("Show accessible only")}</Label>
            <div className="flex items-center space-x-2">
              <Accessibility className="h-4 w-4 text-muted-foreground" />
              <input
                type="checkbox"
                checked={filters.accessibleOnly}
                onChange={(e) => setFilters({...filters, accessibleOnly: e.target.checked})}
                className="rounded"
              />
            </div>
          </div>
        </div>

        {/* Facility List */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredFacilities.length === 0 ? (
            <div className="text-center py-8">
              <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">{t("No facilities found")}</p>
            </div>
          ) : (
            filteredFacilities.map((facility) => (
              <div
                key={facility.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedFacility?.id === facility.id ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                }`}
                onClick={() => setSelectedFacility(facility)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      facility.type === "hospital" ? "bg-red-100 text-red-600" :
                      facility.type === "clinic" ? "bg-blue-100 text-blue-600" :
                      facility.type === "pharmacy" ? "bg-green-100 text-green-600" :
                      facility.type === "chw" ? "bg-purple-100 text-purple-600" :
                      "bg-orange-100 text-orange-600"
                    }`}>
                      {facility.type === "hospital" ? <Stethoscope className="h-4 w-4" /> :
                       facility.type === "clinic" ? <Home className="h-4 w-4" /> :
                       facility.type === "pharmacy" ? <Pill className="h-4 w-4" /> :
                       facility.type === "chw" ? <Users className="h-4 w-4" /> :
                       <User className="h-4 w-4" />}
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{facility.name}</h3>
                      <p className="text-xs text-muted-foreground">{facility.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs">{facility.rating}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between text-xs text-muted-foreground mb-2 gap-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {facility.distance} km ({facility.travelTime})
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {facility.hours}
                  </span>
                </div>

                {facility.accessibility && (
                  <div className="flex items-center gap-1 text-xs text-green-600 mb-2">
                    <Accessibility className="h-3 w-3" />
                    {t("Available")}
                  </div>
                )}

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 text-xs h-7">
                    <Navigation className="h-3 w-3 mr-1" />
                    {t("Directions")}
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 text-xs h-7">
                    <Phone className="h-3 w-3 mr-1" />
                    {t("Call")}
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Selected Facility Details */}
        {selectedFacility && (
          <Card className="mt-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{selectedFacility.name}</CardTitle>
              <CardDescription>{selectedFacility.address}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-xs font-medium mb-1">{t("Services")}</p>
                <div className="flex flex-wrap gap-1">
                  {selectedFacility.services.map((service, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="font-medium">{t("Hours")}</p>
                  <p className="text-muted-foreground">{selectedFacility.hours}</p>
                </div>
                <div>
                  <p className="font-medium">{t("Accessibility")}</p>
                  <p className="text-muted-foreground">
                    {selectedFacility.accessibility ? t("Available") : t("Not available")}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1">
                  <Navigation className="h-3 w-3 mr-1" />
                  {t("Directions")}
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Phone className="h-3 w-3 mr-1" />
                  {t("Call")}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Download Offline Map */}
        <Button variant="outline" className="w-full mt-4">
          <Download className="h-4 w-4 mr-2" />
          Download Offline Map
        </Button>
      </CardContent>
    </Card>
  )
}

export default function HealthMapPage() {
  const [userLocation, setUserLocation] = useState(null)
  const [selectedFacility, setSelectedFacility] = useState(null)
  const [filters, setFilters] = useState({
    type: "all",
    accessibleOnly: false
  })
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [locationPermissionStatus, setLocationPermissionStatus] = useState("prompt") // "prompt", "granted", "denied", "unavailable"

  // Get user's current location
  const getCurrentLocation = () => {
    setIsLoadingLocation(true)
    
    if (!navigator.geolocation) {
      // Geolocation is not supported by this browser
      setLocationPermissionStatus("unavailable")
      setUserLocation({
        lat: 23.8103,
        lng: 90.4125
      })
      setIsLoadingLocation(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Success - location obtained
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
        setLocationPermissionStatus("granted")
        setIsLoadingLocation(false)
      },
      (error) => {
        // Handle different error types gracefully
        setIsLoadingLocation(false)
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            setLocationPermissionStatus("denied")
            // Silently use default location without console.error
            setUserLocation({
              lat: 23.8103,
              lng: 90.4125
            })
            break
          case error.POSITION_UNAVAILABLE:
            setLocationPermissionStatus("unavailable")
            // Silently use default location without console.error
            setUserLocation({
              lat: 23.8103,
              lng: 90.4125
            })
            break
          case error.TIMEOUT:
            setLocationPermissionStatus("unavailable")
            // Silently use default location without console.error
            setUserLocation({
              lat: 23.8103,
              lng: 90.4125
            })
            break
          default:
            setLocationPermissionStatus("unavailable")
            // Silently use default location without console.error
            setUserLocation({
              lat: 23.8103,
              lng: 90.4125
            })
            break
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    )
  }

  // Get user location on component mount
  useEffect(() => {
    getCurrentLocation()
  }, [])

  // Sort facilities by distance and accessibility
  const sortedFacilities = [...HEALTH_FACILITIES].sort((a, b) => {
    // Prioritize accessible facilities
    if (a.accessibility && !b.accessibility) return -1
    if (!a.accessibility && b.accessibility) return 1

    // Then sort by distance
    return a.distance - b.distance
  })

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="rounded-xl bg-gradient-to-br from-accent to-secondary p-2.5 shadow-md">
                <MapPin className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">Health Resources Map</h1>
                <p className="text-sm text-muted-foreground">Find clinics and services near you</p>
              </div>
            </div>
            <div className="ml-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={getCurrentLocation}
                disabled={isLoadingLocation}
                className="flex items-center gap-2"
              >
                <Navigation className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {isLoadingLocation ? "Getting location..." : 
                   locationPermissionStatus === "denied" ? "Location denied" :
                   locationPermissionStatus === "unavailable" ? "Location unavailable" :
                   "My Location"}
                </span>
                <span className="sm:hidden">
                  {isLoadingLocation ? "..." : 
                   locationPermissionStatus === "denied" ? "Denied" :
                   locationPermissionStatus === "unavailable" ? "Unavailable" :
                   "Location"}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Map */}
          <div className="lg:col-span-3">
            <HealthMap
              facilities={sortedFacilities}
              userLocation={userLocation}
              selectedFacility={selectedFacility}
              setSelectedFacility={setSelectedFacility}
              locationPermissionStatus={locationPermissionStatus}
            />
          </div>

          {/* Resource List Sidebar */}
          <div className="lg:col-span-1">
            <ResourceList
              facilities={sortedFacilities}
              selectedFacility={selectedFacility}
              setSelectedFacility={setSelectedFacility}
              filters={filters}
              setFilters={setFilters}
            />
          </div>
        </div>
      </div>
    </main>
  )
}