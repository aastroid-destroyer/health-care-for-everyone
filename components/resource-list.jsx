"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star } from "lucide-react"

const resources = [
  { id: 1, name: "Community Health Center/সম্প্রদায় স্বাস্থ্য কেন্দ্র", type: "Clinic/ক্লিনিক", distance: "0.8 km/কিমি", rating: 4.8 },
  { id: 2, name: "Emergency Medical Unit/জরুরি চিকিৎসা ইউনিট", type: "Hospital/হাসপাতাল", distance: "1.2 km/কিমি", rating: 4.5 },
  { id: 3, name: "Mental Health Support/মানসিক স্বাস্থ্য সহায়তা", type: "Counseling/পরামর্শ", distance: "1.5 km/কিমি", rating: 4.9 },
  { id: 4, name: "Maternal & Child Health/মাতৃ ও শিশু স্বাস্থ্য", type: "Clinic/ক্লিনিক", distance: "2.1 km/কিমি", rating: 4.7 },
]

export default function ResourceList() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-base">Nearby Resources/নিকটবর্তী সম্পদ</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="p-3 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="text-sm font-medium line-clamp-2">{resource.name}</p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {resource.distance}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-medium">{resource.rating}</span>
                </div>
              </div>
              <Badge variant="outline" className="mt-2 text-xs">
                {resource.type}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}