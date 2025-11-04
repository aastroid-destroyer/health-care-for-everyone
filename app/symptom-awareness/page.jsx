"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    AlertTriangle,
    Activity,
    Baby,
    Brain,
    Thermometer,
    Clock,
    CheckCircle,
    XCircle,
    Info,
    Phone,
    Hospital,
    User,
    ChevronRight,
    Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Symptom data structured to avoid diagnosis and focus on urgency
const symptomCategories = [
    {
        id: "general",
        name: "General Danger Signs/সাধারণ বিপদ সংকেত",
        description: "Symptoms that need immediate medical attention for anyone/যে কোনো ব্যক্তির জন্য তাৎক্ষণিক চিকিৎসা প্রয়োজন এমন উপসর্গ",
        icon: <AlertTriangle className="h-5 w-5" />,
        color: "red",
        symptoms: [
            {
                id: "fever-high",
                name: "Very High Fever/খুব উচ্চ জ্বর",
                urgency: "immediate",
                description: "Temperature above 103°F (39.4°C) that doesn't come down with medicine/ওষুধে কমে না এমন ১০৩°ফারেনহাইট (৩৯.৪°সে) এর বেশি তাপমাত্রা",
                action: "Go to the nearest hospital or emergency room immediately./অবিলম্বে নিকটস্থ হাসপাতাল বা জরুরি কক্ষে যান।"
            },
            {
                id: "breathing-difficulty",
                name: "Trouble Breathing/শ্বাসকষ্ট অসুবিধা",
                urgency: "immediate",
                description: "Unable to speak full sentences, chest pain, or blue lips/face/সম্পূর্ণ বাক্য বলতে অক্ষম, বুকে ব্যথা, বা নীল ঠোঁট/মুখ",
                action: "This is an emergency. Call for an ambulance or go to the ER now./এটি একটি জরুরি অবস্থা। এখনই অ্যাম্বুলেন্স ডাকুন বা জরুরি বিভাগে যান।"
            },
            {
                id: "severe-pain",
                name: "Severe, Unexplained Pain/তীব্র, অব্যাখ্যাত ব্যথা",
                urgency: "immediate",
                description: "Pain in the chest, abdomen, or head that is sudden and unbearable/হঠাৎ এবং অসহনীয় বুকে, পেটে, বা মাথায় ব্যথা",
                action: "Do not wait. Seek emergency medical care right away./অপেক্ষা করবেন না। অবিলম্বে জরুরি চিকিৎসা নিন।"
            },
            {
                id: "confusion",
                name: "Sudden Confusion or Drowsiness/হঠাৎ বিভ্রম বা তন্দ্রা",
                urgency: "immediate",
                description: "Person is unusually sleepy, disoriented, or doesn't recognize people/ব্যক্তি অস্বাভাবিকভাবে ঘুমন্ত, বিভ্রান্ত, বা লোকজনকে চিনতে পারে না",
                action: "This could be a sign of a serious condition. Get medical help immediately./এটি একটি গুরুতর অবস্থার লক্ষণ হতে পারে। অবিলম্বে চিকিৎসা নিন।"
            },
            {
                id: "persistent-vomiting",
                name: "Non-stop Vomiting/অবিরাম বমি",
                urgency: "soon",
                description: "Unable to keep any liquids down for more than 12 hours/১২ ঘণ্টার বেশি সময় ধরে কোনো তরল রাখতে অক্ষম",
                action: "See a doctor today to prevent dehydration./নিস্তারণ প্রতিরোধ করতে আজই একজন ডাক্তারের কাছে যান।"
            }
        ]
    },
    {
        id: "children",
        name: "Children's Health/শিশুদের স্বাস্থ্য",
        description: "Special warning signs for infants and children/শিশু এবং শিশুদের জন্য বিশেষ সতর্কতা লক্ষণ",
        icon: <Baby className="h-5 w-5" />,
        color: "orange",
        symptoms: [
            {
                id: "child-fast-breathing",
                name: "Fast Breathing/দ্রুত শ্বাসপ্রশ্বাস",
                urgency: "immediate",
                description: "Breathing faster than 60 breaths per minute for infants under 2 months/২ মাসের কম বয়সী শিশুদের জন্য প্রতি মিনিটে ৬০ শ্বাসের বেশি শ্বাসপ্রশ্বাস",
                action: "Go to the hospital immediately. This could be pneumonia or a serious infection./অবিলম্বে হাসপাতালে যান। এটি নিউমোনিয়া বা একটি গুরুতর সংক্রমণ হতে পারে।"
            },
            {
                id: "child-lethargic",
                name: "Unusually Sleepy or Limp/অস্বাভাবিকভাবে ঘুমন্ত বা নিস্তেজ",
                urgency: "immediate",
                description: "Child is difficult to wake up, has no energy, or is not responsive/শিশুকে জাগানো কঠিন, শক্তিহীন, বা সাড়া দেয় না",
                action: "This is a danger sign. Seek emergency care without delay./এটি একটি বিপদ সংকেত। বিলম্ব ছাড়াই জরুরি চিকিৎসা নিন।"
            },
            {
                id: "child-skin-pinch",
                name: "Skin Stays Pinched/ত্বক চিমটে ধরে থাকে",
                urgency: "immediate",
                description: "When you pinch the skin on the belly, it stays pinched and doesn't go back/যখন আপনি পেটের ত্বক চিমটেন, তা চিমটানো অবস্থায় থাকে এবং ফিরে আসে না",
                action: "This is a sign of severe dehydration. Go to the nearest hospital now./এটি তীব্র নিস্তারণের লক্ষণ। এখনই নিকটস্থ হাসপাতালে যান।"
            },
            {
                id: "child-no-wet-diaper",
                name: "No Wet Diaper for 6+ Hours/৬+ ঘণ্টার জন্য ভেজা ডায়াপার নেই",
                urgency: "soon",
                description: "No urination for over 6 hours, or crying without tears/৬ ঘণ্টার বেশি সময় ধরে প্রস্রাব নেই, বা অশ্রু ছাড়া কান্না",
                action: "See a doctor today to check for dehydration./নিস্তারণ পরীক্ষা করতে আজই একজন ডাক্তারের কাছে যান।"
            }
        ]
    },
    {
        id: "mental-wellbeing",
        name: "Mental Well-being/মানসিক সুস্থতা",
        description: "Emotional and mental health signs that need attention/মনোযোগ এবং মানসিক স্বাস্থ্য লক্ষণ যা মনোযোগ প্রয়োজন",
        icon: <Brain className="h-5 w-5" />,
        color: "blue",
        symptoms: [
            {
                id: "hopeless",
                name: "Feeling Hopeless or Empty/নিরাশ বা খালি অনুভব করা",
                urgency: "soon",
                description: "Persistent sadness, loss of interest in activities for more than 2 weeks/২ সপ্তাহের বেশি সময় ধরে স্থায়ী দুঃখ, কার্যকলাপে আগ্রহ হ্রাস",
                action: "Talk to a counselor or doctor. You don't have to feel this way alone./একজন কাউন্সেলর বা ডাক্তারের সাথে কথা বলুন। আপনাকে একা এভাবে অনুভব করতে হবে না।"
            },
            {
                id: "extreme-mood",
                name: "Extreme Mood Swings/চরম মেজাজের ওঠানামা",
                urgency: "soon",
                description: "Periods of extremely high energy followed by deep lows/অত্যন্ত উচ্চ শক্তির সময়কাল যা গভীর নিম্নমুখী দ্বারা অনুসরণ করা হয়",
                action: "A mental health professional can help you understand and manage these changes./একজন মানসিক স্বাস্থ্য পেশাদার আপনাকে এই পরিবর্তনগুলি বুঝতে এবং পরিচালনা করতে সাহায্য করতে পারে।"
            },
            {
                id: "social-withdrawal",
                name: "Withdrawing from Everyone/সবার থেকে সরে যাওয়া",
                urgency: "monitor",
                description: "Avoiding friends, family, and activities you used to enjoy/বন্ধু, পরিবার এবং আগে উপভোগ করা কার্যকলাপ এড়িয়ে চলা",
                action: "Try talking to someone you trust. If it continues, consider speaking with a counselor./আপনি যাকে বিশ্বাস করেন তার সাথে কথা বলার চেষ্টা করুন। যদি এটি অব্যাহত থাকে, একজন কাউন্সেলরের সাথে কথা বলার কথা বিবেচনা করুন।"
            },
            {
                id: "thoughts-harm",
                name: "Thoughts of Harming Yourself/নিজের ক্ষতি করার চিন্তা",
                urgency: "immediate",
                description: "Thinking that life is not worth living or wanting to disappear/জীবন বাঁচার যোগ্য নয় বা অদৃশ্য হতে চাওয়া চিন্তা",
                action: "Please reach out for help immediately. Call a helpline or go to the nearest hospital./অবিলম্বে সাহায্যের জন্য পৌঁছান। একটি হেল্পলাইনে কল করুন বা নিকটস্থ হাসপাতালে যান।"
            }
        ]
    }
];

// Helper to get the highest urgency level from selected symptoms
function getHighestUrgency(selectedIds) {
    let highestUrgency = "monitor";
    for (const category of symptomCategories) {
        for (const symptom of category.symptoms) {
            if (selectedIds.includes(symptom.id)) {
                if (symptom.urgency === "immediate") return "immediate";
                if (symptom.urgency === "soon" && highestUrgency !== "immediate") {
                    highestUrgency = "soon";
                }
            }
        }
    }
    return highestUrgency;
}

// Component to display a single symptom
function SymptomCard({ symptom, isSelected, onToggle }) {
    return (
        <Card
            className={`cursor-pointer transition-all duration-200 ${isSelected ? 'border-primary bg-primary/5' : 'hover:border-muted-foreground/50'
                }`}
            onClick={() => onToggle(symptom.id)}
        >
            <CardContent className="p-4">
                <div className="flex items-start gap-3">
                    <div className={`mt-1 w-5 h-5 rounded-full border-2 flex-shrink-0 ${isSelected
                            ? 'bg-primary border-primary'
                            : 'border-muted-foreground'
                        }`}>
                        {isSelected && <CheckCircle className="w-full h-full text-primary-foreground p-0.5" />}
                    </div>
                    <div className="flex-1">
                        <h4 className="font-medium">{symptom.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{symptom.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                            <Badge
                                variant={symptom.urgency === 'immediate' ? 'destructive' : 'secondary'}
                                className="text-xs"
                            >
                                {symptom.urgency === 'immediate' && <Zap className="w-3 h-3 mr-1" />}
                                {symptom.urgency === 'immediate' ? 'Seek Care Now/এখনই চিকিৎসা নিন' : 'See a Doctor Soon/শীঘ্রই ডাক্তার দেখুন'}
                            </Badge>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

// Component to show results based on selected symptoms
function ResultsPanel({ selectedIds, onClear }) {
    const highestUrgency = getHighestUrgency(selectedIds);
    const count = selectedIds.length;

    if (count === 0) return null;

    const getUrgencyConfig = (level) => {
        switch (level) {
            case 'immediate':
                return {
                    bg: 'bg-red-50 border-red-200',
                    title: 'Seek Immediate Medical Care/তাৎক্ষণিক চিকিৎসা নিন',
                    titleColor: 'text-red-800',
                    description: 'You have selected one or more symptoms that require urgent attention. Please go to the nearest hospital or emergency room./আপনি এক বা একাধিক উপসর্গ নির্বাচন করেছেন যার জরুরি মনোযোগ প্রয়োজন। অনুগ্রহ করে নিকটস্থ হাসপাতাল বা জরুরি কক্ষে যান।',
                    icon: <Hospital className="h-5 w-5 text-red-600" />,
                    actionText: 'Find Nearest Hospital/নিকটস্থ হাসপাতাল খুঁজুন',
                    actionVariant: 'destructive'
                };
            case 'soon':
                return {
                    bg: 'bg-amber-50 border-amber-200',
                    title: 'See a Doctor Soon/শীঘ্রই ডাক্তার দেখুন',
                    titleColor: 'text-amber-800',
                    description: 'You have symptoms that should be checked by a healthcare professional. Please make an appointment today or tomorrow./আপনার এমন উপসর্গ রয়েছে যা একজন স্বাস্থ্যসেবা পেশাদার দ্বারা পরীক্ষা করা উচিত। অনুগ্রহ করে আজ বা আগামীকাল একটি অ্যাপয়েন্টমেন্ট নিন।',
                    icon: <Activity className="h-5 w-5 text-amber-600" />,
                    actionText: 'Find a Clinic/একটি ক্লিনিক খুঁজুন',
                    actionVariant: 'default'
                };
            default:
                return {
                    bg: 'bg-blue-50 border-blue-200',
                    title: 'Monitor and Consult if Needed/পর্যবেক্ষণ করুন এবং প্রয়োজনে পরামর্শ করুন',
                    titleColor: 'text-blue-800',
                    description: 'These symptoms are important to watch. If they persist or worsen, please consult a doctor./এই উপসর্গগুলি দেখার জন্য গুরুত্বপূর্ণ। যদি সেগুলি অব্যাহত থাকে বা খারাপ হয়, অনুগ্রহ করে একজন ডাক্তারের সাথে পরামর্শ করুন।',
                    icon: <Info className="h-5 w-5 text-blue-600" />,
                    actionText: 'Learn More/আরও জানুন',
                    actionVariant: 'outline'
                };
        }
    };

    const config = getUrgencyConfig(highestUrgency);

    return (
        <Card className={`mt-6 ${config.bg} border`}>
            <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${config.titleColor}`}>
                    {config.icon}
                    {config.title}
                </CardTitle>
                <CardDescription className={config.titleColor}>
                    {config.description}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle className="text-sm">This is not a diagnosis./এটি কোনো রোগ নির্ণয় নয়।</AlertTitle>
                    <AlertDescription className="text-sm">
                        This tool helps you recognize symptoms and decide when to seek care. Only a qualified healthcare professional can provide a diagnosis./এই সরঞ্জামটি আপনাকে উপসর্গগুলি চিনতে এবং কখন চিকিৎসা নিতে হবে তা সিদ্ধান্ত নিতে সাহায্য করে। শুধুমাত্র একজন যোগ্য স্বাস্থ্যসেবা পেশাদার রোগ নির্ণয় করতে পারে।
                    </AlertDescription>
                </Alert>
                <div className="flex gap-2">
                    <Button variant={config.actionVariant} className="flex-1">
                        {config.actionText}
                    </Button>
                    <Button variant="ghost" onClick={onClear}>
                        Clear Selection/নির্বাচন সাফ করুন
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default function SymptomAwarenessGuide() {
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [activeTab, setActiveTab] = useState("general");

    const handleSymptomToggle = (symptomId) => {
        setSelectedSymptoms(prev =>
            prev.includes(symptomId)
                ? prev.filter(id => id !== symptomId)
                : [...prev, symptomId]
        );
    };

    const clearAllSymptoms = () => {
        setSelectedSymptoms([]);
    };

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
                            <div className="rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 p-2.5 shadow-md">
                                <Activity className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                                    Symptom Awareness Guide/উপসর্গ সচেতনতা গাইড
                                </h1>
                                <p className="text-sm text-muted-foreground">
                                    Recognize warning signs and know when to seek help/সতর্কতা লক্ষণগুলি চিনুন এবং কখন সাহায্য নিতে হয় তা জানুন
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                {/* Emergency Banner */}
                <Alert className="mb-6 border-red-200 bg-red-50">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <AlertTitle className="text-red-800">In an Emergency, Call for Help/জরুরি অবস্থায়, সাহায্যের জন্য কল করুন</AlertTitle>
                    <AlertDescription className="text-red-700">
                        If someone is unconscious, has severe difficulty breathing, or is in life-threatening danger,
                        call your local emergency number or go to the nearest hospital immediately./যদি কেউ অজ্ঞান হয়ে পড়ে, তীব্র শ্বাসকষ্ট অসুবিধায় ভুগছে, বা জীবননাশের বিপদে আছে,
                        আপনার স্থানীয় জরুরি নম্বরে কল করুন বা অবিলম্বে নিকটস্থ হাসপাতালে যান।
                    </AlertDescription>
                </Alert>

                {/* Main Interaction Area */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Info className="h-5 w-5" />
                            Select the Symptoms You're Experiencing/আপনি যে উপসর্গগুলি অনুভব করছেন সেগুলি নির্বাচন করুন
                        </CardTitle>
                        <CardDescription>
                            This guide helps you understand the urgency of different symptoms.
                            It is NOT a replacement for professional medical advice./এই গাইডটি আপনাকে বিভিন্ন উপসর্গের জরুরি বুঝতে সাহায্য করে।
                            এটি পেশাদার চিকিৎসা পরামর্শের প্রতিস্থাপন নয়।
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                                {symptomCategories.map((category) => (
                                    <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                                        {category.icon}
                                        <span className="hidden sm:inline">{category.name}</span>
                                        <span className="sm:hidden">{category.name.split(' ')[0]}</span>
                                    </TabsTrigger>
                                ))}
                            </TabsList>

                            {symptomCategories.map((category) => (
                                <TabsContent key={category.id} value={category.id} className="mt-6">
                                    <div className="space-y-4">
                                        <div className="text-center">
                                            <div className={`inline-flex p-3 rounded-full ${category.color === 'red' ? 'bg-red-100 text-red-600' :
                                                    category.color === 'orange' ? 'bg-orange-100 text-orange-600' :
                                                        'bg-blue-100 text-blue-600'
                                                }`}>
                                                {category.icon}
                                            </div>
                                            <h3 className="text-lg font-semibold mt-2">{category.name}</h3>
                                            <p className="text-sm text-muted-foreground">{category.description}</p>
                                        </div>

                                        <div className="grid gap-3">
                                            {category.symptoms.map((symptom) => (
                                                <SymptomCard
                                                    key={symptom.id}
                                                    symptom={symptom}
                                                    isSelected={selectedSymptoms.includes(symptom.id)}
                                                    onToggle={handleSymptomToggle}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </TabsContent>
                            ))}
                        </Tabs>
                    </CardContent>
                </Card>

                {/* Results Panel */}
                <ResultsPanel
                    selectedIds={selectedSymptoms}
                    onClear={clearAllSymptoms}
                />

                {/* Final Disclaimer */}
                <Card className="mt-8 border-muted">
                    <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                            <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                            <div>
                                <h3 className="font-medium">Your Health is Important/আপনার স্বাস্থ্য গুরুত্বপূর্ণ</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Trust your instincts. If you are worried about a symptom, it is always best to consult a healthcare professional.
                                    This tool is designed to guide you, not replace a doctor's expert advice./আপনার অন্তর্জ্ঞানের উপর বিশ্বাস রাখুন। যদি আপনি কোনো উপসর্গ নিয়ে উদ্বিগ্ন হন, তবে সর্বদা একজন স্বাস্থ্যসেবা পেশাদারের সাথে পরামর্শ করা ভালো।
                                    এই সরঞ্জামটি আপনাকে গাইড করার জন্য ডিজাইন করা হয়েছে, ডাক্তারের বিশেষজ্ঞ পরামর্শ প্রতিস্থাপন করার জন্য নয়।
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}