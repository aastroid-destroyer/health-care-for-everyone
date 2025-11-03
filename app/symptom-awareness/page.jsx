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
        name: "General Danger Signs",
        description: "Symptoms that need immediate medical attention for anyone",
        icon: <AlertTriangle className="h-5 w-5" />,
        color: "red",
        symptoms: [
            {
                id: "fever-high",
                name: "Very High Fever",
                urgency: "immediate",
                description: "Temperature above 103°F (39.4°C) that doesn't come down with medicine",
                action: "Go to the nearest hospital or emergency room immediately."
            },
            {
                id: "breathing-difficulty",
                name: "Trouble Breathing",
                urgency: "immediate",
                description: "Unable to speak full sentences, chest pain, or blue lips/face",
                action: "This is an emergency. Call for an ambulance or go to the ER now."
            },
            {
                id: "severe-pain",
                name: "Severe, Unexplained Pain",
                urgency: "immediate",
                description: "Pain in the chest, abdomen, or head that is sudden and unbearable",
                action: "Do not wait. Seek emergency medical care right away."
            },
            {
                id: "confusion",
                name: "Sudden Confusion or Drowsiness",
                urgency: "immediate",
                description: "Person is unusually sleepy, disoriented, or doesn't recognize people",
                action: "This could be a sign of a serious condition. Get medical help immediately."
            },
            {
                id: "persistent-vomiting",
                name: "Non-stop Vomiting",
                urgency: "soon",
                description: "Unable to keep any liquids down for more than 12 hours",
                action: "See a doctor today to prevent dehydration."
            }
        ]
    },
    {
        id: "children",
        name: "Children's Health",
        description: "Special warning signs for infants and children",
        icon: <Baby className="h-5 w-5" />,
        color: "orange",
        symptoms: [
            {
                id: "child-fast-breathing",
                name: "Fast Breathing",
                urgency: "immediate",
                description: "Breathing faster than 60 breaths per minute for infants under 2 months",
                action: "Go to the hospital immediately. This could be pneumonia or a serious infection."
            },
            {
                id: "child-lethargic",
                name: "Unusually Sleepy or Limp",
                urgency: "immediate",
                description: "Child is difficult to wake up, has no energy, or is not responsive",
                action: "This is a danger sign. Seek emergency care without delay."
            },
            {
                id: "child-skin-pinch",
                name: "Skin Stays Pinched",
                urgency: "immediate",
                description: "When you pinch the skin on the belly, it stays pinched and doesn't go back",
                action: "This is a sign of severe dehydration. Go to the nearest hospital now."
            },
            {
                id: "child-no-wet-diaper",
                name: "No Wet Diaper for 6+ Hours",
                urgency: "soon",
                description: "No urination for over 6 hours, or crying without tears",
                action: "See a doctor today to check for dehydration."
            }
        ]
    },
    {
        id: "mental-wellbeing",
        name: "Mental Well-being",
        description: "Emotional and mental health signs that need attention",
        icon: <Brain className="h-5 w-5" />,
        color: "blue",
        symptoms: [
            {
                id: "hopeless",
                name: "Feeling Hopeless or Empty",
                urgency: "soon",
                description: "Persistent sadness, loss of interest in activities for more than 2 weeks",
                action: "Talk to a counselor or doctor. You don't have to feel this way alone."
            },
            {
                id: "extreme-mood",
                name: "Extreme Mood Swings",
                urgency: "soon",
                description: "Periods of extremely high energy followed by deep lows",
                action: "A mental health professional can help you understand and manage these changes."
            },
            {
                id: "social-withdrawal",
                name: "Withdrawing from Everyone",
                urgency: "monitor",
                description: "Avoiding friends, family, and activities you used to enjoy",
                action: "Try talking to someone you trust. If it continues, consider speaking with a counselor."
            },
            {
                id: "thoughts-harm",
                name: "Thoughts of Harming Yourself",
                urgency: "immediate",
                description: "Thinking that life is not worth living or wanting to disappear",
                action: "Please reach out for help immediately. Call a helpline or go to the nearest hospital."
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
                                {symptom.urgency === 'immediate' ? 'Seek Care Now' : 'See a Doctor Soon'}
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
                    title: 'Seek Immediate Medical Care',
                    titleColor: 'text-red-800',
                    description: 'You have selected one or more symptoms that require urgent attention. Please go to the nearest hospital or emergency room.',
                    icon: <Hospital className="h-5 w-5 text-red-600" />,
                    actionText: 'Find Nearest Hospital',
                    actionVariant: 'destructive'
                };
            case 'soon':
                return {
                    bg: 'bg-amber-50 border-amber-200',
                    title: 'See a Doctor Soon',
                    titleColor: 'text-amber-800',
                    description: 'You have symptoms that should be checked by a healthcare professional. Please make an appointment today or tomorrow.',
                    icon: <Activity className="h-5 w-5 text-amber-600" />,
                    actionText: 'Find a Clinic',
                    actionVariant: 'default'
                };
            default:
                return {
                    bg: 'bg-blue-50 border-blue-200',
                    title: 'Monitor and Consult if Needed',
                    titleColor: 'text-blue-800',
                    description: 'These symptoms are important to watch. If they persist or worsen, please consult a doctor.',
                    icon: <Info className="h-5 w-5 text-blue-600" />,
                    actionText: 'Learn More',
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
                    <AlertTitle className="text-sm">This is not a diagnosis.</AlertTitle>
                    <AlertDescription className="text-sm">
                        This tool helps you recognize symptoms and decide when to seek care. Only a qualified healthcare professional can provide a diagnosis.
                    </AlertDescription>
                </Alert>
                <div className="flex gap-2">
                    <Button variant={config.actionVariant} className="flex-1">
                        {config.actionText}
                    </Button>
                    <Button variant="ghost" onClick={onClear}>
                        Clear Selection
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
                                    Symptom Awareness Guide
                                </h1>
                                <p className="text-sm text-muted-foreground">
                                    Recognize warning signs and know when to seek help
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
                    <AlertTitle className="text-red-800">In an Emergency, Call for Help</AlertTitle>
                    <AlertDescription className="text-red-700">
                        If someone is unconscious, has severe difficulty breathing, or is in life-threatening danger,
                        call your local emergency number or go to the nearest hospital immediately.
                    </AlertDescription>
                </Alert>

                {/* Main Interaction Area */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Info className="h-5 w-5" />
                            Select the Symptoms You're Experiencing
                        </CardTitle>
                        <CardDescription>
                            This guide helps you understand the urgency of different symptoms.
                            It is NOT a replacement for professional medical advice.
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
                                <h3 className="font-medium">Your Health is Important</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Trust your instincts. If you are worried about a symptom, it is always best to consult a healthcare professional.
                                    This tool is designed to guide you, not replace a doctor's expert advice.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}