"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Stethoscope,
  Syringe,
  Heart,
  Filter,
  Download,
  Check,
  X,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// --- Mock Data ---
// In a real application, this would be fetched from an API
const MOCK_EVENTS = [
  {
    id: "1",
    title: "Free Diabetes Screening Camp / বিনামূল্যে ডায়াবেটিস স্ক্রিনিং ক্যাম্প",
    type: "screening",
    description: "Get your blood sugar checked and receive expert advice on managing diabetes. / আপনার রক্তের শর্করা পরীক্ষা করুন এবং ডায়াবেটিস পরিচালনার জন্য বিশেষজ্ঞ পরামর্শ নিন।",
    date: new Date(new Date().setDate(new Date().getDate() + 5)), // 5 days from now
    time: "9:00 AM - 1:00 PM",
    location: "Mirpur Community Clinic, Dhaka / মিরপুর কমিউনিটি ক্লিনিক, ঢাকা",
    organizer: "Bangladesh Diabetes Association / বাংলাদেশ ডায়াবেটিস সমিতি",
    attendees: 45,
    capacity: 100,
    isFree: true,
    contact: "+880-1712-345678"
  },
  {
    id: "2",
    title: "Children's Vaccination Drive / শিশুদের টিকাদান কর্মসূচি",
    type: "drive",
    description: "Essential immunizations for children under 5. Bring your vaccination card. / ৫ বছরের নিচের শিশুদের জন্য প্রয়োজনীয় টিকা। আপনার টিকা কার্ড নিয়ে আসুন।",
    date: new Date(new Date().setDate(new Date().getDate() + 10)), // 10 days from now
    time: "10:00 AM - 3:00 PM",
    location: "Dhanmondi Maternal & Child Health Center / ধানমণ্ডি মাতৃ ও শিশু স্বাস্থ্য কেন্দ্র",
    organizer: "UNICEF & Ministry of Health / ইউনিসেফ ও স্বাস্থ্য মন্ত্রণালয়",
    attendees: 120,
    capacity: 150,
    isFree: true,
    contact: "+880-2-8616661"
  },
  {
    id: "3",
    title: "Maternal Health Workshop / মাতৃস্বাস্থ্য কর্মশালা",
    type: "workshop",
    description: "Learn about nutrition, prenatal care, and postnatal support for mothers. / মায়েদের পুষ্টি, প্রসবপূর্ব যত্ন এবং প্রসবোত্তর সহায়তা সম্পর্কে জানুন।",
    date: new Date(new Date().setDate(new Date().getDate() + 12)), // 12 days from now
    time: "2:00 PM - 4:00 PM",
    location: "Kurmitola General Hospital, Dhaka / কুর্মিটোলা জেনারেল হাসপাতাল, ঢাকা",
    organizer: "Bangladesh Women's Health Coalition / বাংলাদেশ নারী স্বাস্থ্য জোট",
    attendees: 25,
    capacity: 40,
    isFree: true,
    contact: "+880-2-55012345"
  },
  {
    id: "4",
    title: "General Health Check-up Camp / সাধারণ স্বাস্থ্য পরীক্ষা ক্যাম্প",
    type: "camp",
    description: "Comprehensive health check-ups including blood pressure, weight, and basic consultations. / রক্তচাপ, ওজন এবং প্রাথমিক পরামর্শ সহ বিস্তৃত স্বাস্থ্য পরীক্ষা।",
    date: new Date(new Date().setDate(new Date().getDate() - 10)), // 10 days ago
    time: "8:00 AM - 12:00 PM",
    location: "Uttara Health Center / উত্তরা স্বাস্থ্য কেন্দ্র",
    organizer: "Red Crescent Society / রেড ক্রিসেন্ট সোসাইটি",
    attendees: 200,
    capacity: 200,
    isFree: true,
    contact: "+880-1810-123456"
  },
  {
    id: "5",
    title: "Mental Health Awareness Session / মানসিক স্বাস্থ্য সচেতনতা সেশন",
    type: "workshop",
    description: "A safe space to discuss stress, anxiety, and learn coping mechanisms. / চাপ, উদ্বেগ নিয়ে আলোচনা এবং মোকাবেলার কৌশল শেখার একটি নিরাপদ জায়গা।",
    date: new Date(new Date().setDate(new Date().getDate() + 20)), // 20 days from now
    time: "4:00 PM - 6:00 PM",
    location: "Online via Zoom / অনলাইনে জুমের মাধ্যমে",
    organizer: "Moner Bondhu / মনের বন্ধু",
    attendees: 80,
    capacity: 200,
    isFree: true,
    contact: "info@monerbondhu.com"
  }
];

// --- Helper Functions ---

// Function to get icon for event type
function getEventIcon(type) {
  switch (type) {
    case 'camp': return <Stethoscope className="h-5 w-5" />;
    case 'screening': return <Heart className="h-5 w-5" />;
    case 'drive': return <Syringe className="h-5 w-5" />;
    case 'workshop': return <Users className="h-5 w-5" />;
    default: return <Calendar className="h-5 w-5" />;
  }
}

// Function to format date for display
function formatDate(date) {
  return date.toLocaleDateString('en-BD', { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

// Function to generate an ICS file for calendar integration
function generateICSFile(event) {
  const formatDateForICS = (date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const startDate = new Date(event.date);
  const endDate = new Date(event.date);
  // Assuming a 4-hour duration for simplicity
  endDate.setHours(endDate.getHours() + 4); 

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Community Health Events//Health Events//EN',
    'BEGIN:VEVENT',
    `UID:${event.id}@communityhealth.events`,
    `DTSTART:${formatDateForICS(startDate)}`,
    `DTEND:${formatDateForICS(endDate)}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description.replace(/,/g, '\\,')}`,
    `LOCATION:${event.location.replace(/,/g, '\\,')}`,
    `END:VEVENT`,
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${event.title.replace(/\s+/g, '_')}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// --- Sub-Components ---

function EventCard({ event, isRSVPed, onRSVP }) {
  const isPast = event.date < new Date();
  
  return (
    <Card className={`flex flex-col h-full ${isPast ? 'opacity-75' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-primary/10 text-primary">
              {getEventIcon(event.type)}
            </div>
            <div>
              <CardTitle className="text-lg leading-tight">{event.title}</CardTitle>
              <CardDescription className="text-sm mt-1">
                {event.organizer}
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 space-y-3">
        <p className="text-sm text-muted-foreground">{event.description}</p>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="break-words">{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{event.attendees} / {event.capacity} attending / অংশগ্রহণকারী</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-3">
        <div className="flex gap-2 w-full">
          {!isPast && (
            <Button 
              onClick={() => onRSVP(event.id)} 
              variant={isRSVPed ? "secondary" : "default"}
              className="flex-1"
            >
              {isRSVPed ? <><Check className="w-4 h-4 mr-2" /> Going / যাবেন</> : 'Interested / আগ্রহী'}
            </Button>
          )}
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => generateICSFile(event)}
            title="Add to Calendar / ক্যালেন্ডারে যোগ করুন"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

// --- Main Page Component ---

export default function CommunityHealthEventsPage() {
  const [events] = useState(MOCK_EVENTS);
  const [filter, setFilter] = useState("all");
  const [showPastEvents, setShowPastEvents] = useState(false);
  const [rsvpStatus, setRsvpStatus] = useState({});

  // Load RSVP status from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("eventRSVPs");
      if (saved) {
        setRsvpStatus(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load RSVP status");
    }
  }, []);

  // Save RSVP status to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("eventRSVPs", JSON.stringify(rsvpStatus));
    } catch (e) {
      console.error("Failed to save RSVP status");
    }
  }, [rsvpStatus]);

  // Handle RSVP click
  const handleRSVP = (eventId) => {
    setRsvpStatus(prev => ({
      ...prev,
      [eventId]: !prev[eventId]
    }));
  };

  // Filter events based on user selection
  const filteredEvents = useMemo(() => {
    const now = new Date();
    return events.filter(event => {
      const matchesFilter = filter === "all" || event.type === filter;
      const matchesTime = showPastEvents || event.date >= now;
      return matchesFilter && matchesTime;
    });
  }, [events, filter, showPastEvents]);

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
              <div className="rounded-xl bg-gradient-to-br from-green-500 to-teal-500 p-2.5 shadow-md">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                  Community Health Events / সম্প্রদায় স্বাস্থ্য ইভেন্ট
                </h1>
                <p className="text-sm text-muted-foreground">
                  Discover health camps, screenings, and workshops near you / আপনার কাছাকাছি স্বাস্থ্য ক্যাম্প, স্ক্রিনিং এবং কর্মশালা আবিষ্কার করুন
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Filter Controls */}
        <Card className="mb-6">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Find Events / ইভেন্ট খুঁজুন
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="event-filter" className="text-sm font-medium">Event Type / ইভেন্টের ধরন</Label>
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger id="event-filter">
                    <SelectValue placeholder="All types / সব ধরন" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Events / সব ইভেন্ট</SelectItem>
                    <SelectItem value="camp">Health Camp / স্বাস্থ্য ক্যাম্প</SelectItem>
                    <SelectItem value="screening">Screening / স্ক্রিনিং</SelectItem>
                    <SelectItem value="drive">Vaccination Drive / টিকাদান কর্মসূচি</SelectItem>
                    <SelectItem value="workshop">Workshop / কর্মশালা</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                isRSVPed={!!rsvpStatus[event.id]}
                onRSVP={handleRSVP}
              />
            ))}
          </div>
        ) : (
          <Alert className="mt-10">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No Events Found / কোন ইভেন্ট পাওয়া যায়নি</AlertTitle>
            <AlertDescription>
              There are no events matching your current filters. Try adjusting the event type or including past events. / আপনার বর্তমান ফিল্টারের সাথে মেলে এমন কোন ইভেন্ট নেই। ইভেন্টের ধরন সামঞ্জস্য করার চেষ্টা করুন বা অতীত ইভেন্ট অন্তর্ভুক্ত করুন।
            </AlertDescription>
          </Alert>
        )}
      </div>
    </main>
  );
}