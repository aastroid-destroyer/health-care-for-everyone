"use client"

import { ArrowLeft, MapPin, Phone, Clock, Star, Search, X } from "lucide-react"
import Link from "next/link"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import HealthMap from "@/components/health-map"
import ResourceList from "@/components/resource-list"

// Mock data for demonstration
const mockResources = [
  {
    id: 1,
    name: "City General Hospital",
    type: "Hospital",
    address: "123 Main St, Dhaka",
    distance: "0.5 km",
    rating: 4.5,
    phone: "+880 2 1234567",
    hours: "24/7",
    lat: 23.8103,
    lng: 90.4125
  },
  {
    id: 2,
    name: "Community Health Center",
    type: "Clinic",
    address: "456 Park Ave, Dhaka",
    distance: "1.2 km",
    rating: 4.2,
    phone: "+880 2 7654321",
    hours: "8AM - 8PM",
    lat: 23.8153,
    lng: 90.4175
  },
  {
    id: 3,
    name: "MediCare Pharmacy",
    type: "Pharmacy",
    address: "789 Market Rd, Dhaka",
    distance: "0.8 km",
    rating: 4.7,
    phone: "+880 2 9876543",
    hours: "9AM - 10PM",
    lat: 23.8053,
    lng: 90.4075
  },
  {
    id: 4,
    name: "Dental Care Plus",
    type: "Dental Clinic",
    address: "321 Health St, Dhaka",
    distance: "2.0 km",
    rating: 4.8,
    phone: "+880 2 1112223",
    hours: "10AM - 6PM",
    lat: 23.8203,
    lng: 90.4225
  },
  {
    id: 5,
    name: "Women's Health Clinic",
    type: "Specialty Clinic",
    address: "555 Wellness Blvd, Dhaka",
    distance: "3.5 km",
    rating: 4.9,
    phone: "+880 2 5556667",
    hours: "9AM - 5PM",
    lat: 23.8253,
    lng: 90.4275
  }
]

export default function HealthMapPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter resources based on search query
  const filteredResources = useMemo(() => {
    if (!searchQuery) return mockResources
    
    const query = searchQuery.toLowerCase()
    return mockResources.filter(resource => 
      resource.name.toLowerCase().includes(query) ||
      resource.type.toLowerCase().includes(query) ||
      resource.address.toLowerCase().includes(query)
    )
  }, [searchQuery])

  const handleSearch = (e) => {
    e.preventDefault()
  }

  const clearSearch = () => {
    setSearchQuery("")
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-3">
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
                <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                  Health Resources Map/স্বাস্থ্য সম্পদ মানচিত্র
                </h1>
                <p className="text-xs text-muted-foreground sm:text-sm">
                  Find clinics and services near you/আপনার কাছাকাছি ক্লিনিক এবং পরিষেবাগুলি খুঁজুন
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="container mx-auto px-4 py-6">
        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
          <div className="relative flex items-center">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by location, clinic name, or service type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 h-12 text-base shadow-sm"
            />
            {searchQuery && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={clearSearch}
                className="absolute right-1 h-8 w-8 hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Button type="submit" className="mt-3 w-full sm:mt-0 sm:w-auto sm:absolute sm:right-0 sm:top-0 sm:h-12 sm:rounded-l-none">
            Search
          </Button>
        </form>
      </div>

      {/* Main Map and List Content */}
      <div className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Map */}
          <div className="lg:col-span-3">
            <div className="h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-lg">
              {/* Pass filtered resources to the map component if it supports it */}
              <HealthMap resources={filteredResources} />
            </div>
          </div>

          {/* Resource List Sidebar */}
          <div className="lg:col-span-1">
            <div className="h-[400px] md:h-[500px] overflow-y-auto">
              {/* Pass filtered resources to the list component if it supports it */}
              <ResourceList resources={filteredResources} />
            </div>
          </div>
        </div>
      </div>

      {/* Location Cards Section */}
      <section className="container mx-auto px-4 pb-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">
            {searchQuery ? `Search Results` : `All Health Resources`}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {searchQuery 
              ? `Found ${filteredResources.length} result${filteredResources.length !== 1 ? 's' : ''} for "${searchQuery}"`
              : `Showing ${mockResources.length} resources near you`
            }
          </p>
        </div>

        {/* Responsive Grid for Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="group rounded-lg border bg-card p-6 shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {resource.name}
                  </h3>
                  <span className="inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground">
                    {resource.type}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm font-medium">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  {resource.rating}
                </div>
              </div>
              
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{resource.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{resource.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{resource.hours}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                <span className="text-sm font-medium text-foreground">{resource.distance}</span>
                <Button size="sm" className="view-on-map-btn">
                  View on Map
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No resources found for your search.</p>
            <Button variant="outline" onClick={clearSearch} className="mt-4">
              Clear Search
            </Button>
          </div>
        )}
      </section>
    </main>
  )
}