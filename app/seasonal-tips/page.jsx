"use client";

import { useEffect, useState } from "react";
import { 
  Sun, 
  CloudRain, 
  Snowflake, 
  Thermometer, 
  Droplets, 
  Wind, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  Info,
  ExternalLink,
  Calendar,
  Clock,
  MapPin,
  BookOpen,
  Filter,
  ChevronRight,
  X,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Bangladesh-specific seasonal disease data with reliable sources
const seasonalHealthData = {
  Summer: {
    months: "March - June",
    climate: "Hot and humid with temperatures 30-40°C",
    diseases: [
      {
        id: "diarrhea",
        name: "Diarrhea",
        icon: <Droplets className="h-5 w-5" />,
        severity: "high",
        description: "Common during summer due to food and water contamination",
        symptoms: ["Frequent loose stools", "Abdominal cramps", "Dehydration", "Fever"],
        prevention: [
          "Drink only boiled or filtered water",
          "Wash hands with soap before eating",
          "Avoid street food and raw vegetables",
          "Keep food covered to prevent flies",
          "Use ORS solution if dehydration occurs"
        ],
        sources: [
          { name: "Bangladesh Ministry of Health", url: "#" },
          { name: "WHO Diarrhea Prevention", url: "#" },
          { name: "UNICEF Water Safety Guidelines", url: "#" }
        ],
        mythBusters: [
          { myth: "Diarrhea will stop if you stop drinking water", fact: "Continue drinking fluids to prevent dehydration" },
          { myth: "Only children get diarrhea", fact: "Adults are equally susceptible, especially during summer" }
        ]
      },
      {
        id: "heatstroke",
        name: "Heat Stroke",
        icon: <Thermometer className="h-5 w-5" />,
        severity: "high",
        description: "A serious condition caused by overheating of the body",
        symptoms: ["High body temperature (above 40°C)", "Altered mental state", "Nausea", "Headache"],
        prevention: [
          "Stay indoors during peak heat hours (11am-3pm)",
          "Drink plenty of water and oral rehydration solutions",
          "Wear light-colored, loose-fitting clothes",
          "Use umbrellas or hats when outside",
          "Take cool showers to lower body temperature"
        ],
        sources: [
          { name: "Bangladesh Meteorological Department", url: "#" },
          { name: "CDC Heat-Related Illness", url: "#" }
        ],
        mythBusters: [
          { myth: "Drinking ice water causes heat stroke", fact: "Ice water helps cool the body faster" },
          { myth: "Only outdoor workers get heat stroke", fact: "Anyone exposed to high temperatures can be affected" }
        ]
      },
      {
        id: "foodpoisoning",
        name: "Food Poisoning",
        icon: <AlertTriangle className="h-5 w-5" />,
        severity: "medium",
        description: "Illness caused by consuming contaminated food",
        symptoms: ["Nausea", "Vomiting", "Diarrhea", "Abdominal pain"],
        prevention: [
          "Avoid eating cut fruits from street vendors",
          "Ensure food is freshly cooked and hot",
          "Refrigerate leftovers promptly",
          "Wash hands, utensils, and cutting boards",
          "Check expiration dates on packaged foods"
        ],
        sources: [
          { name: "Bangladesh Food Safety Authority", url: "#" },
          { name: "WHO Food Safety", url: "#" }
        ],
        mythBusters: [
          { myth: "Food is safe if it doesn't smell bad", fact: "Harmful bacteria may not change food's smell or appearance" },
          { myth: "Reheating food kills all bacteria", fact: "Some toxins produced by bacteria are heat-resistant" }
        ]
      }
    ]
  },
  Rainy: {
    months: "July - October",
    climate: "Heavy rainfall and high humidity",
    diseases: [
      {
        id: "dengue",
        name: "Dengue",
        icon: <AlertTriangle className="h-5 w-5" />,
        severity: "high",
        description: "Mosquito-borne viral infection common during monsoon",
        symptoms: ["High fever", "Severe headache", "Joint and muscle pain", "Skin rash"],
        prevention: [
          "Remove standing water in and around your home",
          "Use mosquito nets while sleeping",
          "Apply mosquito repellent on exposed skin",
          "Wear long-sleeved clothes, especially at dawn/dusk",
          "Install window screens to keep mosquitoes out"
        ],
        sources: [
          { name: "Bangladesh Directorate General of Health Services", url: "#" },
          { name: "WHO Dengue Prevention", url: "#" },
          { name: "CDC Dengue Facts", url: "#" }
        ],
        mythBusters: [
          { myth: "Dengue mosquitoes only bite during the day", fact: "They bite primarily in early morning and before dusk" },
          { myth: "All mosquito bites cause dengue", fact: "Only Aedes mosquitoes infected with dengue virus transmit the disease" }
        ]
      },
      {
        id: "cholera",
        name: "Cholera",
        icon: <Droplets className="h-5 w-5" />,
        severity: "high",
        description: "Acute diarrheal illness caused by contaminated water",
        symptoms: ["Watery diarrhea", "Dehydration", "Vomiting", "Leg cramps"],
        prevention: [
          "Drink only boiled, filtered, or bottled water",
          "Avoid raw or undercooked seafood",
          "Wash hands thoroughly with soap",
          "Eat hot, freshly cooked foods",
          "Properly dispose of human waste"
        ],
        sources: [
          { name: "Bangladesh Ministry of Health", url: "#" },
          { name: "WHO Cholera Fact Sheet", url: "#" }
        ],
        mythBusters: [
          { myth: "Cholera is caused by eating cold foods", fact: "Cholera is caused by Vibrio cholerae bacteria in contaminated water or food" },
          { myth: "Cholera is not contagious", fact: "It can spread through contaminated water and food" }
        ]
      },
      {
        id: "fungal",
        name: "Fungal Infections",
        icon: <Wind className="h-5 w-5" />,
        severity: "medium",
        description: "Skin infections that thrive in humid conditions",
        symptoms: ["Itching", "Redness", "Rash", "Skin peeling"],
        prevention: [
          "Keep skin dry, especially between toes and skin folds",
          "Change out of wet clothes promptly",
          "Use antifungal powder in prone areas",
          "Wear breathable cotton clothing",
          "Avoid sharing personal items like towels"
        ],
        sources: [
          { name: "Bangladesh Dermatological Society", url: "#" },
          { name: "CDC Fungal Diseases", url: "#" }
        ],
        mythBusters: [
          { myth: "Fungal infections are caused by poor hygiene only", fact: "Even clean people can get fungal infections in humid conditions" },
          { myth: "Fungal infections will clear on their own", fact: "Most require antifungal treatment for complete resolution" }
        ]
      }
    ]
  },
  Winter: {
    months: "November - February",
    climate: "Cool and dry with temperatures 10-25°C",
    diseases: [
      {
        id: "flu",
        name: "Seasonal Flu",
        icon: <Snowflake className="h-5 w-5" />,
        severity: "medium",
        description: "Respiratory infection common in cooler months",
        symptoms: ["Fever", "Cough", "Sore throat", "Body aches"],
        prevention: [
          "Get annual flu vaccination",
          "Wash hands frequently with soap",
          "Cover mouth and nose when coughing/sneezing",
          "Avoid touching your face",
          "Stay home when sick to prevent spread"
        ],
        sources: [
          { name: "Bangladesh Institute of Epidemiology", url: "#" },
          { name: "WHO Seasonal Influenza", url: "#" },
          { name: "CDC Flu Prevention", url: "#" }
        ],
        mythBusters: [
          { myth: "Flu vaccine causes the flu", fact: "The vaccine contains inactivated virus and cannot cause infection" },
          { myth: "You only need a flu shot once in your life", fact: "Annual vaccination is needed as flu viruses change each year" }
        ]
      },
      {
        id: "pneumonia",
        name: "Pneumonia",
        icon: <Wind className="h-5 w-5" />,
        severity: "high",
        description: "Infection that inflames air sacs in one or both lungs",
        symptoms: ["Cough with phlegm", "Fever", "Chest pain", "Difficulty breathing"],
        prevention: [
          "Get vaccinated (flu and pneumococcal vaccines)",
          "Practice good hygiene",
          "Don't smoke",
          "Keep immune system strong with proper nutrition",
          "Treat colds and respiratory infections promptly"
        ],
        sources: [
          { name: "Bangladesh Lung Foundation", url: "#" },
          { name: "WHO Pneumonia", url: "#" }
        ],
        mythBusters: [
          { myth: "Pneumonia is only dangerous for the elderly", fact: "It affects all ages, with children under 5 at highest risk" },
          { myth: "Pneumonia is always caused by getting cold", fact: "Pneumonia is caused by bacteria, viruses, or fungi, not by cold weather itself" }
        ]
      },
      {
        id: "asthma",
        name: "Asthma Attacks",
        icon: <Wind className="h-5 w-5" />,
        severity: "medium",
        description: "Winter can trigger asthma symptoms in sensitive individuals",
        symptoms: ["Wheezing", "Shortness of breath", "Chest tightness", "Coughing"],
        prevention: [
          "Stay indoors on cold, windy days",
          "Cover nose and mouth with a scarf when outside",
          "Use inhalers as prescribed",
          "Keep home environment dust-free",
          "Avoid sudden temperature changes"
        ],
        sources: [
          { name: "Bangladesh Asthma Association", url: "#" },
          { name: "CDC Asthma", url: "#" }
        ],
        mythBusters: [
          { myth: "Asthma is just a psychological condition", fact: "Asthma is a chronic lung disease with physical causes" },
          { myth: "Children outgrow asthma", fact: "Asthma can persist into adulthood, though symptoms may change over time" }
        ]
      }
    ]
  }
};

// Helper function to determine current season based on Bangladesh's climate
function getCurrentSeason() {
  const month = new Date().getMonth() + 1;
  if (month >= 3 && month <= 6) return "Summer";
  if (month >= 7 && month <= 10) return "Rainy";
  return "Winter";
}

// Season icon component
function SeasonIcon({ season, className }) {
  switch (season) {
    case "Summer":
      return <Sun className={`h-5 w-5 ${className}`} />;
    case "Rainy":
      return <CloudRain className={`h-5 w-5 ${className}`} />;
    case "Winter":
      return <Snowflake className={`h-5 w-5 ${className}`} />;
    default:
      return null;
  }
}

// Severity badge component
function SeverityBadge({ severity }) {
  const variant = severity === "high" ? "destructive" : "secondary";
  const text = severity === "high" ? "High Risk" : "Moderate Risk";
  return <Badge variant={variant}>{text}</Badge>;
}

// Disease card component
function DiseaseCard({ disease, season }) {
  const [showDetails, setShowDetails] = useState(false);
  const [activeTab, setActiveTab] = useState("prevention");
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-full ${
              season === "Summer" ? "bg-orange-100 text-orange-600" :
              season === "Rainy" ? "bg-blue-100 text-blue-600" :
              "bg-slate-100 text-slate-600"
            }`}>
              {disease.icon}
            </div>
            <div>
              <CardTitle className="text-lg">{disease.name}</CardTitle>
              <CardDescription className="text-sm mt-1">{disease.description}</CardDescription>
            </div>
          </div>
          <SeverityBadge severity={disease.severity} />
        </div>
      </CardHeader>
      
      <CardContent className="flex-1">
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium mb-2">Common Symptoms</h4>
            <div className="flex flex-wrap gap-1">
              {disease.symptoms.map((symptom, i) => (
                <Badge key={i} variant="outline" className="text-xs">{symptom}</Badge>
              ))}
            </div>
          </div>
          
          <div className="pt-2">
            <Dialog open={showDetails} onOpenChange={setShowDetails}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full text-sm">
                  View Prevention Tips & Facts
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    {disease.icon}
                    {disease.name} Prevention Guide
                  </DialogTitle>
                  <DialogDescription>
                    Reliable information to protect yourself and your family
                  </DialogDescription>
                </DialogHeader>
                
                <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="prevention">Prevention</TabsTrigger>
                    <TabsTrigger value="myths">Myth Busters</TabsTrigger>
                    <TabsTrigger value="sources">Sources</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="prevention" className="space-y-3 mt-4">
                    <h4 className="font-medium">Prevention Tips</h4>
                    <ul className="space-y-2">
                      {disease.prevention.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  
                  <TabsContent value="myths" className="space-y-4 mt-4">
                    <h4 className="font-medium">Common Misconceptions</h4>
                    {disease.mythBusters.map((item, i) => (
                      <div key={i} className="border rounded-lg p-3">
                        <div className="flex items-start gap-2 mb-2">
                          <X className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <p className="text-sm font-medium">Myth: {item.myth}</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <p className="text-sm">Fact: {item.fact}</p>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="sources" className="space-y-3 mt-4">
                    <h4 className="font-medium">Reliable Sources</h4>
                    <div className="space-y-2">
                      {disease.sources.map((source, i) => (
                        <div key={i} className="flex items-center justify-between p-2 border rounded-md">
                          <span className="text-sm">{source.name}</span>
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function SeasonalHealthTips() {
  const [currentSeason, setCurrentSeason] = useState(getCurrentSeason());
  const [selectedSeason, setSelectedSeason] = useState(currentSeason);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const seasonData = seasonalHealthData[selectedSeason];
  const allSeasons = Object.keys(seasonalHealthData);
  
  useEffect(() => {
    setCurrentSeason(getCurrentSeason());
    setSelectedSeason(getCurrentSeason());
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-gradient-to-br from-primary to-secondary p-2.5 shadow-md">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                  Seasonal Disease Prevention
                </h1>
                <p className="text-sm text-muted-foreground">
                  Stay healthy with Bangladesh-specific health tips
                </p>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>
      
      {/* Season selector */}
      <div className="container mx-auto px-4 py-6">
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-lg">Select Season</CardTitle>
                <CardDescription>
                  View disease prevention tips for different seasons in Bangladesh
                </CardDescription>
              </div>
              
              <div className="flex items-center gap-2">
                <Select value={selectedSeason} onValueChange={setSelectedSeason}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Select season" />
                  </SelectTrigger>
                  <SelectContent>
                    {allSeasons.map((season) => (
                      <SelectItem key={season} value={season}>
                        <div className="flex items-center gap-2">
                          <SeasonIcon season={season} />
                          {season}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {selectedSeason !== currentSeason && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedSeason(currentSeason)}
                  >
                    Current Season
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{seasonData.months}</span>
              </div>
              <div className="flex items-center gap-2">
                <Thermometer className="h-4 w-4 text-muted-foreground" />
                <span>{seasonData.climate}</span>
              </div>
              {selectedSeason === currentSeason && (
                <Badge variant="secondary" className="ml-auto">
                  Current Season
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Disease cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {seasonData.diseases.map((disease) => (
            <DiseaseCard key={disease.id} disease={disease} season={selectedSeason} />
          ))}
        </div>
        
        {/* Information banner */}
        <Card className="mt-8 border-blue-200 bg-blue-50/50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-blue-900">About These Health Tips</h3>
                <p className="text-sm text-blue-800 mt-1">
                  These prevention tips are based on guidelines from the Bangladesh Ministry of Health, 
                  WHO, and UNICEF. They are tailored to Bangladesh's climate patterns and common seasonal diseases. 
                  Always consult healthcare professionals for medical advice.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}