"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft,
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
    months: "March - June/মার্চ - জুন",
    climate: "Hot and humid with temperatures 30-40°C/গরম এবং আর্দ্র, তাপমাত্রা ৩০-৪০°সে",
    diseases: [
      {
        id: "diarrhea",
        name: "Diarrhea/ডায়রিয়া",
        icon: <Droplets className="h-5 w-5" />,
        severity: "high",
        description: "Common during summer due to food and water contamination/খাদ্য এবং জল দূষণের কারণে গ্রীষ্মকালে সাধারণ",
        symptoms: ["Frequent loose stools/ঘন ঘন পাতলা পায়খানা", "Abdominal cramps/পেটে ব্যথা", "Dehydration/নিস্তারণ", "Fever/জ্বর"],
        prevention: [
          "Drink only boiled or filtered water/শুধুমাত্র ফুটানো বা ফিল্টার করা জল পান করুন",
          "Wash hands with soap before eating/খাওয়ার আগে সাবান দিয়ে হাত ধোবেন",
          "Avoid street food and raw vegetables/রাস্তার খাবার এবং কাঁচা সবজি এড়িয়ে চলুন",
          "Keep food covered to prevent flies/মাছি প্রতিরোধ করতে খাবার ঢেকে রাখুন",
          "Use ORS solution if dehydration occurs/নিস্তারণ হলে ORS সমাধান ব্যবহার করুন"
        ],
        sources: [
          { name: "Bangladesh Ministry of Health/বাংলাদেশ স্বাস্থ্য মন্ত্রণালয়", url: "#" },
          { name: "WHO Diarrhea Prevention/ডাব্লিউএইচও ডায়রিয়া প্রতিরোধ", url: "#" },
          { name: "UNICEF Water Safety Guidelines/ইউনিসেফ জল নিরাপত্তা নির্দেশিকা", url: "#" }
        ],
        mythBusters: [
          { myth: "Diarrhea will stop if you stop drinking water/পানি পান করা বন্ধ করলে ডায়রিয়া বন্ধ হবে", fact: "Continue drinking fluids to prevent dehydration/নিস্তারণ প্রতিরোধ করতে তরল পান করা চালিয়ে যান" },
          { myth: "Only children get diarrhea/শুধুমাত্র শিশুরা ডায়রিয়া পায়", fact: "Adults are equally susceptible, especially during summer/প্রাপ্তবয়স্করাও সমানভাবে সংবেদনশীল, বিশেষ করে গ্রীষ্মকালে" }
        ]
      },
      {
        id: "heatstroke",
        name: "Heat Stroke/হিট স্ট্রোক",
        icon: <Thermometer className="h-5 w-5" />,
        severity: "high",
        description: "A serious condition caused by overheating of the body/শরীরের অত্যধিক গরম হওয়ার কারণে একটি গুরুতর অবস্থা",
        symptoms: ["High body temperature (above 40°C)/উচ্চ শরীরের তাপমাত্রা (৪০°সে-এর উপরে)", "Altered mental state/মানসিক অবস্থার পরিবর্তন", "Nausea/বমি বমি ভাব", "Headache/মাথাব্যথা"],
        prevention: [
          "Stay indoors during peak heat hours (11am-3pm)/সর্বোচ্চ তাপমাত্রার সময় (সকাল ১১টা-বিকেল ৩টা) ঘরে থাকুন",
          "Drink plenty of water and oral rehydration solutions/প্রচুর জল এবং ওরাল রিহাইড্রেশন সমাধান পান করুন",
          "Wear light-colored, loose-fitting clothes/হালকা রঙের, ঢিলেঢালা কাপড় পরুন",
          "Use umbrellas or hats when outside/বাইরে থাকাকালীন ছাতা বা টুপি ব্যবহার করুন",
          "Take cool showers to lower body temperature/শরীরের তাপমাত্রা কমাতে ঠান্ডা স্নান করুন"
        ],
        sources: [
          { name: "Bangladesh Meteorological Department/বাংলাদেশ আবহাওয়া অধিদপ্তর", url: "#" },
          { name: "CDC Heat-Related Illness/সিডিসি তাপজনিত অসুস্থতা", url: "#" }
        ],
        mythBusters: [
          { myth: "Drinking ice water causes heat stroke/বরফ ঠান্ডা জল পান করলে হিট স্ট্রোক হয়", fact: "Ice water helps cool the body faster/বরফ ঠান্ডা জল শরীর দ্রুত ঠান্ডা করতে সাহায্য করে" },
          { myth: "Only outdoor workers get heat stroke/শুধুমাত্র বাইরে কাজ করা লোকেরা হিট স্ট্রোক পায়", fact: "Anyone exposed to high temperatures can be affected/উচ্চ তাপমাত্রায় প্রকাশিত যে কেউ প্রভাবিত হতে পারে" }
        ]
      },
      {
        id: "foodpoisoning",
        name: "Food Poisoning/খাদ্য বিষক্রিয়া",
        icon: <AlertTriangle className="h-5 w-5" />,
        severity: "medium",
        description: "Illness caused by consuming contaminated food/দূষিত খাবার গ্রহণের কারণে অসুস্থতা",
        symptoms: ["Nausea/বমি বমি ভাব", "Vomiting/বমি", "Diarrhea/ডায়রিয়া", "Abdominal pain/পেটে ব্যথা"],
        prevention: [
          "Avoid eating cut fruits from street vendors/রাস্তার বিক্রেতাদের কাটা ফল খাওয়া এড়িয়ে চলুন",
          "Ensure food is freshly cooked and hot/নিশ্চিত করুন খাবার তাজা রান্না এবং গরম",
          "Refrigerate leftovers promptly/অবশিষ্টাংশ দ্রুত রেফ্রিজারেটরে রাখুন",
          "Wash hands, utensils, and cutting boards/হাত, বাসনকোসনস এবং কাটিং বোর্ড ধোবেন",
          "Check expiration dates on packaged foods/প্যাকেজযুক্ত খাবারের মেয়াদ শেষ হওয়ার তারিখ পরীক্ষা করুন"
        ],
        sources: [
          { name: "Bangladesh Food Safety Authority/বাংলাদেশ খাদ্য নিরাপত্তা কর্তৃপক্ষ", url: "#" },
          { name: "WHO Food Safety/ডাব্লিউএইচও খাদ্য নিরাপত্তা", url: "#" }
        ],
        mythBusters: [
          { myth: "Food is safe if it doesn't smell bad/খাবার নিরাপদ যদি এটি খারাপ গন্ধ না করে", fact: "Harmful bacteria may not change food's smell or appearance/ক্ষতিকারক ব্যাকটেরিয়া খাবারের গন্ধ বা চেহারা পরিবর্তন করতে পারে না" },
          { myth: "Reheating food kills all bacteria/খাবার পুনরায় গরম করলে সব ব্যাকটেরিয়া মারা যায়", fact: "Some toxins produced by bacteria are heat-resistant/ব্যাকটেরিয়া দ্বারা উৎপাদিত কিছু টক্সিন তাপ-প্রতিরোধী" }
        ]
      }
    ]
  },
  Rainy: {
    months: "July - October/জুলাই - অক্টোবর",
    climate: "Heavy rainfall and high humidity/ভারী বৃষ্টিপাত এবং উচ্চ আর্দ্রতা",
    diseases: [
      {
        id: "dengue",
        name: "Dengue/ডেঙ্গু",
        icon: <AlertTriangle className="h-5 w-5" />,
        severity: "high",
        description: "Mosquito-borne viral infection common during monsoon/মৌসুমি বৃষ্টিপাতের সময় সাধারণ মশা-বাহিত ভাইরাল সংক্রমণ",
        symptoms: ["High fever/উচ্চ জ্বর", "Severe headache/তীব্র মাথাব্যথা", "Joint and muscle pain/জয়েন্ট এবং পেশী ব্যথা", "Skin rash/ত্বকের ফুসকুড়ি"],
        prevention: [
          "Remove standing water in and around your home/আপনার বাড়ির ভিতরে এবং চারপাশে জমে থাকা জল অপসারণ করুন",
          "Use mosquito nets while sleeping/ঘুমানোর সময় মশারি ব্যবহার করুন",
          "Apply mosquito repellent on exposed skin/প্রকাশিত ত্বকে মশা তাড়ানো প্রয়োগ করুন",
          "Wear long-sleeved clothes, especially at dawn/dusk/দীর্ঘ হাতা কাপড় পরুন, বিশেষ করে ভোর/সন্ধ্যায়",
          "Install window screens to keep mosquitoes out/মশা বাইরে রাখতে জানলা স্ক্রিন ইনস্টল করুন"
        ],
        sources: [
          { name: "Bangladesh Directorate General of Health Services/বাংলাদেশ স্বাস্থ্য অধিদপ্তর", url: "#" },
          { name: "WHO Dengue Prevention/ডাব্লিউএইচও ডেঙ্গু প্রতিরোধ", url: "#" },
          { name: "CDC Dengue Facts/সিডিসি ডেঙ্গু তথ্য", url: "#" }
        ],
        mythBusters: [
          { myth: "Dengue mosquitoes only bite during the day/ডেঙ্গু মশা শুধুমাত্র দিনের বেলা কামড়ায়", fact: "They bite primarily in early morning and before dusk/তারা মূলত ভোরে এবং সন্ধ্যার আগে কামড়ায়" },
          { myth: "All mosquito bites cause dengue/সব মশার কামড়া ডেঙ্গু কারণ করে", fact: "Only Aedes mosquitoes infected with dengue virus transmit the disease/শুধুমাত্র ডেঙ্গু ভাইরাসে আক্রান্ত এডিস মশা রোগ ছড়ায়" }
        ]
      },
      {
        id: "cholera",
        name: "Cholera/কলেরা",
        icon: <Droplets className="h-5 w-5" />,
        severity: "high",
        description: "Acute diarrheal illness caused by contaminated water/দূষিত জলের কারণে তীব্র ডায়রিয়া রোগ",
        symptoms: ["Watery diarrhea/জলীয় ডায়রিয়া", "Dehydration/নিস্তারণ", "Vomiting/বমি", "Leg cramps/পায়ের পেশীতে খিঁচুনি"],
        prevention: [
          "Drink only boiled, filtered, or bottled water/শুধুমাত্র ফুটানো, ফিল্টার করা, বা বোতলজাত জল পান করুন",
          "Avoid raw or undercooked seafood/কাঁচা বা অসম্পূর্ণভাবে রান্না করা সামুদ্রিক খাবার এড়িয়ে চলুন",
          "Wash hands thoroughly with soap/সাবান দিয়ে হাত ভালোভাবে ধোবেন",
          "Eat hot, freshly cooked foods/গরম, তাজা রান্না করা খাবার খান",
          "Properly dispose of human waste/মানব বর্জ্য সঠিকভাবে নিষ্কাশন করুন"
        ],
        sources: [
          { name: "Bangladesh Ministry of Health/বাংলাদেশ স্বাস্থ্য মন্ত্রণালয়", url: "#" },
          { name: "WHO Cholera Fact Sheet/ডাব্লিউএইচও কলেরা তথ্য পত্র", url: "#" }
        ],
        mythBusters: [
          { myth: "Cholera is caused by eating cold foods/কলেরা ঠান্ডা খাবার খাওয়ার কারণে হয়", fact: "Cholera is caused by Vibrio cholerae bacteria in contaminated water or food/কলেরা দূষিত জল বা খাবারে ভিব্রিও কলেরি ব্যাকটেরিয়ার কারণে হয়" },
          { myth: "Cholera is not contagious/কলেরা সংক্রামক নয়", fact: "It can spread through contaminated water and food/এটি দূষিত জল এবং খাবারের মাধ্যমে ছড়াতে পারে" }
        ]
      },
      {
        id: "fungal",
        name: "Fungal Infections/ছত্রাক সংক্রমণ",
        icon: <Wind className="h-5 w-5" />,
        severity: "medium",
        description: "Skin infections that thrive in humid conditions/আর্দ্র পরিস্থিতিতে বৃদ্ধি পায় এমন ত্বকের সংক্রমণ",
        symptoms: ["Itching/চুলকানি", "Redness/লালিভা", "Rash/ফুসকুড়ি", "Skin peeling/ত্বক উঠে যাওয়া"],
        prevention: [
          "Keep skin dry, especially between toes and skin folds/ত্বক শুষ্ক রাখুন, বিশেষ করে আঙ্গুলের ফাঁকে এবং ত্বকের ভাঁজে",
          "Change out of wet clothes promptly/ভেজা কাপড় দ্রুত পরিবর্তন করুন",
          "Use antifungal powder in prone areas/ঝুঁকিপূর্ণ এলাকায় অ্যান্টিফাঙ্গাল পাউডার ব্যবহার করুন",
          "Wear breathable cotton clothing/শ্বাস-প্রশ্বাসযোগ্য তুলা কাপড় পরুন",
          "Avoid sharing personal items like towels/তোয়ালের মতো ব্যক্তিগত জিনিস ভাগ করতে এড়িয়ে চলুন"
        ],
        sources: [
          { name: "Bangladesh Dermatological Society/বাংলাদেশ ডার্মাটোলজিক্যাল সোসাইটি", url: "#" },
          { name: "CDC Fungal Diseases/সিডিসি ছত্রাক রোগ", url: "#" }
        ],
        mythBusters: [
          { myth: "Fungal infections are caused by poor hygiene only/ছত্রাক সংক্রমণ শুধুমাত্র খারাপ স্বাস্থ্যবিধির কারণে হয়", fact: "Even clean people can get fungal infections in humid conditions/আর্দ্র পরিস্থিতিতে পরিষ্কার লোকেরাও ছত্রাক সংক্রমণ পেতে পারে" },
          { myth: "Fungal infections will clear on their own/ছত্রাক সংক্রমণ নিজে থেকে সেরে যাবে", fact: "Most require antifungal treatment for complete resolution/সম্পূর্ণ সমাধানের জন্য বেশিরভাগ ক্ষেত্রে অ্যান্টিফাঙ্গাল চিকিৎসা প্রয়োজন" }
        ]
      }
    ]
  },
  Winter: {
    months: "November - February/নভেম্বর - ফেব্রুয়ারি",
    climate: "Cool and dry with temperatures 10-25°C/শীতল এবং শুষ্ক, তাপমাত্রা ১০-২৫°সে",
    diseases: [
      {
        id: "flu",
        name: "Seasonal Flu/মৌসুমি ফ্লু",
        icon: <Snowflake className="h-5 w-5" />,
        severity: "medium",
        description: "Respiratory infection common in cooler months/শীতল মাসগুলিতে সাধারণ শ্বাসযন্ত্রের সংক্রমণ",
        symptoms: ["Fever/জ্বর", "Cough/কাশি", "Sore throat/গলা ব্যথা", "Body aches/শরীর ব্যথা"],
        prevention: [
          "Get annual flu vaccination/বার্ষিক ফ্লু টিকা নিন",
          "Wash hands frequently with soap/সাবান দিয়ে ঘন ঘন হাত ধোবেন",
          "Cover mouth and nose when coughing/sneezing/কাশি বা হাঁচি দেওয়ার সময় মুখ এবং নাক ঢেকে রাখুন",
          "Avoid touching your face/আপনার মুখ স্পর্শ করা এড়িয়ে চলুন",
          "Stay home when sick to prevent spread/ছড়িয়ে পড়া প্রতিরোধ করতে অসুস্থ থাকাকালীন বাড়িতে থাকুন"
        ],
        sources: [
          { name: "Bangladesh Institute of Epidemiology/বাংলাদেশ মহামারী বিজ্ঞান ইনস্টিটিউট", url: "#" },
          { name: "WHO Seasonal Influenza/ডাব্লিউএইচও মৌসুমি ইনফ্লুয়েঞ্জা", url: "#" },
          { name: "CDC Flu Prevention/সিডিসি ফ্লু প্রতিরোধ", url: "#" }
        ],
        mythBusters: [
          { myth: "Flu vaccine causes the flu/ফ্লু টিকা ফ্লু কারণ করে", fact: "The vaccine contains inactivated virus and cannot cause infection/টিকাতে নিষ্ক্রিয় ভাইরাস থাকে এবং সংক্রমণ করতে পারে না" },
          { myth: "You only need a flu shot once in your life/আপনার জীবনে শুধুমাত্র একবার ফ্লু শট প্রয়োজন", fact: "Annual vaccination is needed as flu viruses change each year/ফ্লু ভাইরাস প্রতি বছর পরিবর্তিত হওয়ায় বার্ষিক টিকাদান প্রয়োজন" }
        ]
      },
      {
        id: "pneumonia",
        name: "Pneumonia/নিউমোনিয়া",
        icon: <Wind className="h-5 w-5" />,
        severity: "high",
        description: "Infection that inflames air sacs in one or both lungs/এক বা উভয় ফুসফুসে বায়ু থলিতে প্রদাহ সৃষ্টিকারী সংক্রমণ",
        symptoms: ["Cough with phlegm/কফ সহ কাশি", "Fever/জ্বর", "Chest pain/বুকে ব্যথা", "Difficulty breathing/শ্বাসকষ্ট অসুবিধা"],
        prevention: [
          "Get vaccinated (flu and pneumococcal vaccines)/টিকা দিন (ফ্লু এবং নিউমোকক্কাল টিকা)",
          "Practice good hygiene/ভালো স্বাস্থ্যবিধি অনুশীলন করুন",
          "Don't smoke/ধূমপান করবেন না",
          "Keep immune system strong with proper nutrition/সঠিক পুষ্টির সাথে ইমিউন সিস্টেম শক্তিশালী রাখুন",
          "Treat colds and respiratory infections promptly/সর্দি এবং শ্বাসযন্ত্রের সংক্রমণ দ্রুত চিকিৎসা করুন"
        ],
        sources: [
          { name: "Bangladesh Lung Foundation/বাংলাদেশ ফুসফুস ফাউন্ডেশন", url: "#" },
          { name: "WHO Pneumonia/ডাব্লিউএইচও নিউমোনিয়া", url: "#" }
        ],
        mythBusters: [
          { myth: "Pneumonia is only dangerous for the elderly/নিউমোনিয়া শুধুমাত্র বয়স্কদের জন্য বিপজ্জনক", fact: "It affects all ages, with children under 5 at highest risk/এটি সব বয়সের মানুষকে প্রভাবিত করে, ৫ বছরের নিচের শিশুরা সবচেয়ে বেশি ঝুঁকিতে" },
          { myth: "Pneumonia is always caused by getting cold/নিউমোনিয়া সবসময় ঠান্ডা লাগার কারণে হয়", fact: "Pneumonia is caused by bacteria, viruses, or fungi, not by cold weather itself/নিউমোনিয়া ব্যাকটেরিয়া, ভাইরাস, বা ছত্রাক দ্বারা হয়, ঠান্ডা আবহাওয়া দ্বারা নয়" }
        ]
      },
      {
        id: "asthma",
        name: "Asthma Attacks/হাঁপানি আক্রমণ",
        icon: <Wind className="h-5 w-5" />,
        severity: "medium",
        description: "Winter can trigger asthma symptoms in sensitive individuals/শীতকালে সংবেদনশীল ব্যক্তিদের মধ্যে হাঁপানির লক্ষণগুলি ট্রিগার করতে পারে",
        symptoms: ["Wheezing/শ্বাসকষ্টে হুইসেল", "Shortness of breath/শ্বাসকষ্ট", "Chest tightness/বুকে চাপ", "Coughing/কাশি"],
        prevention: [
          "Stay indoors on cold, windy days/ঠান্ডা, বাতাসযুক্ত দিনে ঘরে থাকুন",
          "Cover nose and mouth with a scarf when outside/বাইরে থাকাকালীন নাক এবং মুখ স্কার্ফ দিয়ে ঢেকে রাখুন",
          "Use inhalers as prescribed/নির্ধারিত হিসাবে ইনহেলার ব্যবহার করুন",
          "Keep home environment dust-free/বাড়ির পরিবেশ ধুলোমুক্ত রাখুন",
          "Avoid sudden temperature changes/হঠাৎ তাপমাত্রা পরিবর্তন এড়িয়ে চলুন"
        ],
        sources: [
          { name: "Bangladesh Asthma Association/বাংলাদেশ হাঁপানি সমিতি", url: "#" },
          { name: "CDC Asthma/সিডিসি হাঁপানি", url: "#" }
        ],
        mythBusters: [
          { myth: "Asthma is just a psychological condition/হাঁপানি শুধুমাত্র একটি মনস্তাত্ত্বিক অবস্থা", fact: "Asthma is a chronic lung disease with physical causes/হাঁপানি একটি দীর্ঘস্থায়ী ফুসফুসের রোগ যার শারীরিক কারণ রয়েছে" },
          { myth: "Children outgrow asthma/শিশুরা হাঁপানি থেকে বেড়ে ওঠে", fact: "Asthma can persist into adulthood, though symptoms may change over time/হাঁপানি প্রাপ্তবয়স্ক অবধি স্থায়ী হতে পারে, যদিও লক্ষণগুলি সময়ের সাথে পরিবর্তিত হতে পারে" }
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
  const text = severity === "high" ? "High Risk/উচ্চ ঝুঁকি" : "Moderate Risk/মাঝারি ঝুঁকি";
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
            <h4 className="text-sm font-medium mb-2">Common Symptoms/সাধারণ উপসর্গ</h4>
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
                  প্রতিরোধ টিপস এবং তথ্য দেখুন
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    {disease.icon}
                    {disease.name} Prevention Guide/প্রতিরোধ গাইড
                  </DialogTitle>
                  <DialogDescription>
                    নিজেকে এবং আপনার পরিবারকে রক্ষা করার জন্য নির্ভরযোগ্য তথ্য
                  </DialogDescription>
                </DialogHeader>
                
                <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="prevention">Prevention/প্রতিরোধ</TabsTrigger>
                    <TabsTrigger value="myths">Myth Busters/মিথ ভাঙা</TabsTrigger>
                    <TabsTrigger value="sources">Sources/উৎস</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="prevention" className="space-y-3 mt-4">
                    <h4 className="font-medium">Prevention Tips/প্রতিরোধ টিপস</h4>
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
                    <h4 className="font-medium">Common Misconceptions/সাধারণ ভুল ধারণা</h4>
                    {disease.mythBusters.map((item, i) => (
                      <div key={i} className="border rounded-lg p-3">
                        <div className="flex items-start gap-2 mb-2">
                          <X className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <p className="text-sm font-medium">Myth/মিথ: {item.myth}</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <p className="text-sm">Fact/সত্য: {item.fact}</p>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="sources" className="space-y-3 mt-4">
                    <h4 className="font-medium">Reliable Sources/নির্ভরযোগ্য উৎস</h4>
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
              <div className="rounded-xl bg-gradient-to-br from-primary to-secondary p-2.5 shadow-md">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                  Seasonal Disease Prevention/মৌসুমি রোগ প্রতিরোধ
                </h1>
                <p className="text-sm text-muted-foreground">
                  Stay healthy with Bangladesh-specific health tips/বাংলাদেশ-নির্দিষ্ট স্বাস্থ্য টিপস সহ সুস্থ থাকুন
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Season selector */}
      <div className="container mx-auto px-4 py-6">
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-lg">Select Season/মৌসুম নির্বাচন করুন</CardTitle>
                <CardDescription>
                  View disease prevention tips for different seasons in Bangladesh/বাংলাদেশের বিভিন্ন মৌসুমের জন্য রোগ প্রতিরোধ টিপস দেখুন
                </CardDescription>
              </div>
              
              <div className="flex items-center gap-2">
                <Select value={selectedSeason} onValueChange={setSelectedSeason}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Select season/মৌসুম নির্বাচন করুন" />
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
                    Current Season/বর্তমান মৌসুম
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
                  Current Season/বর্তমান মৌসুম
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
                <h3 className="font-medium text-blue-900">About These Health Tips/এই স্বাস্থ্য টিপস সম্পর্কে</h3>
                <p className="text-sm text-blue-800 mt-1">
                  These prevention tips are based on guidelines from the Bangladesh Ministry of Health, 
                  WHO, and UNICEF. They are tailored to Bangladesh's climate patterns and common seasonal diseases. 
                  Always consult healthcare professionals for medical advice./এই প্রতিরোধ টিপসগুলি বাংলাদেশ স্বাস্থ্য মন্ত্রণালয়, ডাব্লিউএইচও এবং ইউনিসেফের নির্দেশিকা ভিত্তিক। 
                  এগুলি বাংলাদেশের জলবায়ু প্যাটার্ন এবং সাধারণ মৌসুমি রোগের জন্য তৈরি করা হয়েছে। 
                  চিকিৎসা পরামর্শের জন্য সর্বদা স্বাস্থ্যসেবা পেশাদারদের সাথে পরামর্শ করুন।
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}