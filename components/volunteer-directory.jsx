"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Star, MapPin, Phone, MessageCircle } from "lucide-react"
import { useState } from "react"

const volunteers = [
  {
    id: 1,
    name: "Khoyrul",
    specialization: "General Physician / সাধারণ চিকিৎসক",
    bio: "20+ years of experience in primary care / প্রাথমিক স্বাস্থ্যসেবায় ২০+ বছরের অভিজ্ঞতা",
    location: "Dhaka / ঢাকা",
    rating: 4.9,
    distance: "1.2 km / ১.২ কিমি",
    phone: "+880-17-1234567",
  },
  {
    id: 2,
    name: "Samia Porosh",
    specialization: "Maternal Health / মাতৃস্বাস্থ্য",
    bio: "Specialized in prenatal and postnatal care / প্রসবপূর্ব ও প্রসবোত্তর যত্নে বিশেষজ্ঞ",
    location: "Dhaka / ঢাকা",
    rating: 4.8,
    distance: "2.1 km / ২.১ কিমি",
    phone: "+880-17-9876543",
  },
  {
    id: 3,
    name: "Maleha",
    specialization: "Mental Health / মানসিক স্বাস্থ্য",
    bio: "Certified therapist and counselor / সার্টিফাইড থেরাপিস্ট এবং কাউন্সেলর",
    location: "Dhaka / ঢাকা",
    rating: 4.9,
    distance: "1.5 km / ১.৫ কিমি",
    phone: "+880-17-5555555",
  },
  {
    id: 4,
    name: "Protim",
    specialization: "Community Health / সম্প্রদায় স্বাস্থ্য",
    bio: "Health education and community outreach / স্বাস্থ্য শিক্ষা এবং সম্প্রদায়ভিত্তিক কার্যক্রম",
    location: "Dhaka / ঢাকা",
    rating: 4.7,
    distance: "2.5 km / ২.৫ কিমি",
    phone: "+880-17-7777777",
  },
]

export default function VolunteerDirectory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialization, setSelectedSpecialization] = useState("All / সব")

  const filteredVolunteers = volunteers.filter((vol) => {
    const matchesSearch =
      vol.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vol.bio.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialization = selectedSpecialization === "All / সব" || vol.specialization === selectedSpecialization
    return matchesSearch && matchesSpecialization
  })

  const specializations = [
    "All / সব",
    "General Physician / সাধারণ চিকিৎসক",
    "Maternal Health / মাতৃস্বাস্থ্য",
    "Mental Health / মানসিক স্বাস্থ্য",
    "Community Health / সম্প্রদায় স্বাস্থ্য",
  ]

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Find Volunteers / স্বেচ্ছাসেবক খুঁজুন</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Search by name or expertise... / নাম বা দক্ষতার ভিত্তিতে অনুসন্ধান করুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex flex-wrap gap-2">
            {specializations.map((spec) => (
              <Button
                key={spec}
                variant={selectedSpecialization === spec ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSpecialization(spec)}
                className={selectedSpecialization === spec ? "" : "bg-transparent"}
              >
                {spec}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Volunteer Cards */}
      <div className="grid gap-4">
        {filteredVolunteers.map((volunteer) => (
          <Card key={volunteer.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-base">{volunteer.name}</h3>
                  <p className="text-sm text-primary font-medium mt-1">{volunteer.specialization}</p>
                </div>
                <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/20 px-3 py-1 rounded-lg">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-medium">{volunteer.rating}</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4">{volunteer.bio}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {volunteer.location} ({volunteer.distance})
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  {volunteer.phone}
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1 gap-2">
                  <Phone className="h-4 w-4" />
                  Call / কল করুন
                </Button>
                <Button size="sm" variant="outline" className="flex-1 gap-2 bg-transparent">
                  <MessageCircle className="h-4 w-4" />
                  Message / বার্তা
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}