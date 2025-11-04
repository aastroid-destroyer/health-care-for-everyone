"use client"

import { ArrowLeft, Mic, MicOff, MapPin, Heart, Hospital, Pill, Volume2, VolumeX } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect, useRef } from "react"
import { toast } from "sonner"

export default function VoiceFirstHealthAssistant() {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [response, setResponse] = useState("")
  const [selectedCommand, setSelectedCommand] = useState("")
  const [isSupported, setIsSupported] = useState(true)
  const recognitionRef = useRef(null)
  const synthRef = useRef(null)

  // পূর্বনির্ধারিত ভয়েস কমান্ডের উদাহরণ
  const voiceCommands = [
    { id: 1, command: "আমার শরীর কেমন আছে", description: "আপনার স্বাস্থ্য পরীক্ষা করুন", icon: Heart },
    { id: 2, command: "নিকটবর্তী হাসপাতাল কোথায়", description: "আপনার কাছাকাছি হাসপাতাল খুঁজুন", icon: Hospital },
    { id: 3, command: "ওষুধের তথ্য দিন", description: "ওষুধ সম্পর্কে তথ্য পান", icon: Pill },
    { id: 4, command: "জরুরি সাহায্য দরকার", description: "জরুরি স্বাস্থ্য সহায়তা পান", icon: MapPin },
  ]

  // পূর্বনির্ধারিত প্রতিক্রিয়া
  const responses = {
    "আমার শরীর কেমন আছে": "আপনার শারীরিক অবস্থা পরীক্ষা করার জন্য, আপনি আপনার তাপমাত্রা, রক্তচাপ এবং অন্যান্য লক্ষণগুলি আমাকে বলতে পারেন। আমি আপনাকে সাহায্য করব।",
    "নিকটবর্তী হাসপাতাল কোথায়": "আপনার নিকটবর্তী হাসপাতালগুলি হল: ১. ঢাকা মেডিকেল কলেজ হাসপাতাল, ২. বঙ্গবন্ধু শেখ মুজিব মেডিকেল বিশ্ববিদ্যালয়, ৩. শহীদ সোহরাওয়ার্দী মেডিকেল কলেজ হাসপাতাল। আপনি আপনার অবস্থান শেয়ার করলে আমি আরও সঠিক তথ্য দিতে পারব।",
    "ওষুধের তথ্য দিন": "কোন ওষুধের তথ্য আপনি জানতে চান? আপনি ওষুধের নাম বলুন, আমি আপনাকে এর ব্যবহার, পার্শ্বপ্রতিক্রিয়া এবং সতর্কতা সম্পর্কে তথ্য দেব।",
    "জরুরি সাহায্য দরকার": "জরুরি সাহায্যের জন্য, অনুগ্রহ করে ৯৯৯ নম্বরে কল করুন বা নিকটবর্তী হাসপাতালে যান। আপনি কী ধরনের জরুরি সাহায্য প্রয়োজন তা আমাকে বললে আমি আরও ভালো সাহায্য করতে পারব।",
  }

  useEffect(() => {
    // ভয়েস সিন্থেসিস শুরু করুন
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis
      
      // ভয়েস সিন্থেসিস উপলব্ধ কিনা পরীক্ষা করুন
      if (!synthRef.current) {
        console.error("Speech synthesis not supported")
        toast.error("আপনার ব্রাউজার ভয়েস সিন্থেসিস সমর্থন করে না।")
      }
    }

    // ভয়েস রিকগনিশন শুরু করুন
    if (typeof window !== "undefined") {
      let SpeechRecognition = null
      
      // বিভিন্ন ব্রাউজারের ভয়েস রিকগনিশন বাস্তবায়ন পরীক্ষা করুন
      if ("webkitSpeechRecognition" in window) {
        SpeechRecognition = window.webkitSpeechRecognition
      } else if ("SpeechRecognition" in window) {
        SpeechRecognition = window.SpeechRecognition
      }
      
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = false
        
        // বাংলা সেট করার চেষ্টা করুন, ব্যর্থ হলে ইংরেজি ব্যবহার করুন
        try {
          recognitionRef.current.lang = "bn-BD"
        } catch (e) {
          console.warn("Bengali language not supported, falling back to English")
          recognitionRef.current.lang = "en-US"
          toast.warning("বাংলা ভাষা সমর্থিত নয়, ইংরেজিতে স্যুইচ করা হচ্ছে।")
        }

        recognitionRef.current.onresult = (event) => {
          const transcript = event.results[0][0].transcript
          setTranscript(transcript)
          handleCommand(transcript)
        }

        recognitionRef.current.onerror = (event) => {
          console.error("Speech recognition error", event.error)
          setIsListening(false)
          
          // আরও বিস্তারিত ত্রুটি পরিচালনা
          if (event.error === "no-speech") {
            toast.error("কোনো কথা শোনা যায়নি। আবার চেষ্টা করুন।")
          } else if (event.error === "not-allowed") {
            toast.error("মাইক্রোফোন অ্যাক্সেস অনুমোদিত নয়। অনুগ্রহ করে ব্রাউজার সেটিংস পরীক্ষা করুন।")
          } else if (event.error === "network") {
            toast.error("নেটওয়ার্ক ত্রুটি। আপনার ইন্টারনেট সংযোগ পরীক্ষা করুন।")
          } else {
            toast.error(`ত্রুটি: ${event.error}`)
          }
        }

        recognitionRef.current.onend = () => {
          setIsListening(false)
        }
      } else {
        setIsSupported(false)
        console.error("Speech recognition not supported")
        toast.error("আপনার ব্রাউজার ভয়েস রিকগনিশন সমর্থন করে না।")
      }
    }

    return () => {
      // আরও সম্পূর্ণ পরিষ্কার
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop()
          recognitionRef.current.onresult = null
          recognitionRef.current.onerror = null
          recognitionRef.current.onend = null
        } catch (e) {
          console.error("Error stopping recognition", e)
        }
      }
      if (synthRef.current) {
        try {
          synthRef.current.cancel()
        } catch (e) {
          console.error("Error cancelling speech synthesis", e)
        }
      }
    }
  }, [])

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast.error("আপনার ব্রাউজার ভয়েস রিকগনিশন সমর্থন করে না।")
      return
    }

    if (isListening) {
      try {
        recognitionRef.current.stop()
        setIsListening(false)
      } catch (e) {
        console.error("Error stopping recognition", e)
        setIsListening(false)
      }
    } else {
      try {
        recognitionRef.current.start()
        setIsListening(true)
        setTranscript("")
        setResponse("")
      } catch (e) {
        console.error("Error starting recognition", e)
        toast.error("ভয়েস রিকগনিশন শুরু করতে ত্রুটি। আবার চেষ্টা করুন।")
      }
    }
  }

  const handleCommand = (command) => {
    // পূর্বনির্ধারিত কমান্ডের সাথে মেলে কিনা পরীক্ষা করুন
    let matchedResponse = ""
    
    for (const key in responses) {
      if (command.includes(key)) {
        matchedResponse = responses[key]
        break
      }
    }

    // পূর্বনির্ধারিত কমান্ডের সাথে মেলে না হলে ডিফল্ট প্রতিক্রিয়া দিন
    if (!matchedResponse) {
      matchedResponse = "আমি বুঝতে পারিনি। অনুগ্রহ করে আবার বলুন বা নীচের কমান্ডগুলির মধ্যে একটি ব্যবহার করুন।"
    }

    setResponse(matchedResponse)
    speakResponse(matchedResponse)
  }

  const speakResponse = (text) => {
    if (!synthRef.current) {
      toast.error("ভয়েস সিন্থেসিস উপলব্ধ নয়।")
      return
    }

    // পূর্ববর্তী ভয়েস বাতিল করুন
    synthRef.current.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    
    // বাংলা সেট করার চেষ্টা করুন, ব্যর্থ হলে ডিফল্ট ভাষা ব্যবহার করুন
    try {
      utterance.lang = "bn-BD"
    } catch (e) {
      console.warn("Bengali voice not available, using default")
    }
    
    utterance.rate = 0.9 // বয়স্কদের জন্য কিছুটা ধীর গতি
    utterance.pitch = 1.0
    utterance.volume = 1.0

    utterance.onstart = () => {
      setIsSpeaking(true)
    }

    utterance.onend = () => {
      setIsSpeaking(false)
    }

    utterance.onerror = (event) => {
      console.error("Speech synthesis error", event)
      setIsSpeaking(false)
      toast.error("কথা বলার সময় ত্রুটি হয়েছে।")
    }

    try {
      synthRef.current.speak(utterance)
    } catch (e) {
      console.error("Error speaking", e)
      toast.error("কথা বলার সময় ত্রুটি হয়েছে।")
      setIsSpeaking(false)
    }
  }

  const stopSpeaking = () => {
    if (synthRef.current) {
      try {
        synthRef.current.cancel()
        setIsSpeaking(false)
      } catch (e) {
        console.error("Error stopping speech", e)
        setIsSpeaking(false)
      }
    }
  }

  const handleCommandClick = (command) => {
    setTranscript(command)
    handleCommand(command)
  }

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
              <div className="rounded-xl bg-gradient-to-br from-secondary to-primary p-2.5 shadow-md">
                <Mic className="h-6 w-6 text-secondary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">ভয়েস-ফার্স্ট হেলথ অ্যাসিস্ট্যান্ট</h1>
                <p className="text-sm text-muted-foreground">আপনার স্বাস্থ্য সম্পর্কে তথ্য পান কথা বলে</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {!isSupported && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 border border-red-200">
            <p className="text-sm text-red-800">
              আপনার ব্রাউজার ভয়েস রিকগনিশন সমর্থন করে না। অনুগ্রহ করে Chrome, Safari বা Edge ব্রাউজারের সর্বশেষ সংস্করণ ব্যবহার করুন।
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Voice Interaction Area */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mic className="h-5 w-5" />
                  ভয়েস ইন্টারঅ্যাকশন
                </CardTitle>
                <CardDescription>
                  মাইক্রোফোন বোতামে ক্লিক করে আপনার প্রশ্নটি বলুন
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center">
                  <Button
                    size="lg"
                    onClick={toggleListening}
                    disabled={!isSupported}
                    className={`h-20 w-20 rounded-full ${isListening ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-primary/90"} ${!isSupported ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {isListening ? <MicOff className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
                  </Button>
                </div>
                
                {transcript && (
                  <div className="rounded-lg bg-muted p-4">
                    <p className="text-sm font-medium text-muted-foreground mb-1">আপনি বলেছেন:</p>
                    <p className="text-lg">{transcript}</p>
                  </div>
                )}
                
                {response && (
                  <div className="rounded-lg bg-primary/10 p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-muted-foreground mb-1">প্রতিক্রিয়া:</p>
                        <p className="text-lg">{response}</p>
                      </div>
                      {isSpeaking && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={stopSpeaking}
                          className="ml-2"
                        >
                          <VolumeX className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Voice Commands */}
            <Card>
              <CardHeader>
                <CardTitle>সাধারণ কমান্ড</CardTitle>
                <CardDescription>
                  এই কমান্ডগুলি ব্যবহার করে দ্রুত তথ্য পান
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {voiceCommands.map((item) => {
                    const Icon = item.icon
                    return (
                      <Button
                        key={item.id}
                        variant="outline"
                        className="justify-start h-auto p-4 text-left"
                        onClick={() => handleCommandClick(item.command)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="rounded-full bg-primary/10 p-2">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{item.command}</p>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                      </Button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="h-5 w-5" />
                  কিভাবে ব্যবহার করবেন
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                    1
                  </span>
                  <p className="text-sm">মাইক্রোফোন বোতামে ক্লিক করুন</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                    2
                  </span>
                  <p className="text-sm">আপনার প্রশ্নটি স্পষ্টভাবে বলুন</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                    3
                  </span>
                  <p className="text-sm">উত্তর শুনুন বা পড়ুন</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>গুরুত্বপূর্ণ তথ্য</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-lg bg-amber-50 p-3 border border-amber-200">
                  <p className="text-sm text-amber-800">
                    এটি একটি সহায়ক সরঞ্জাম, চিকিৎসকের পরামর্শের বিকল্প নয়। জরুরি অবস্থায় অবিলম্বে চিকিৎসকের সাহায্য নিন।
                  </p>
                </div>
                <div className="rounded-lg bg-blue-50 p-3 border border-blue-200">
                  <p className="text-sm text-blue-800">
                    জরুরি সাহায্যের জন্য ৯৯৯ নম্বরে কল করুন।
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ভাষা সমর্থন</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  বর্তমানে আমরা বাংলা ভাষায় সমর্থন প্রদান করছি। ভবিষ্যতে আরও ভাষা যোগ করা হবে।
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-sm">বাংলা (সক্রিয়)</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}