"use client"

import { useState } from "react"
import { useStorage } from "@/hooks/use-storage"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, Send } from "lucide-react"

const moodOptions = [
  { value: 1, label: "Stressed", color: "bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-200" },
  { value: 2, label: "Anxious", color: "bg-orange-100 text-orange-800 dark:bg-orange-950/40 dark:text-orange-200" },
  { value: 3, label: "Neutral", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/40 dark:text-yellow-200" },
  { value: 4, label: "Good", color: "bg-lime-100 text-lime-800 dark:bg-lime-950/40 dark:text-lime-200" },
  { value: 5, label: "Excellent", color: "bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-200" },
]

const checkInQuestions = [
  { id: "sleep", label: "How is your sleep quality?", options: ["Poor", "Fair", "Good", "Excellent"] },
  { id: "stress", label: "What is your stress level?", options: ["Very High", "High", "Medium", "Low"] },
  { id: "energy", label: "How is your energy level?", options: ["Low", "Medium", "High", "Very High"] },
  { id: "support", label: "Do you have adequate support?", options: ["No", "Somewhat", "Yes", "Very Much"] },
]

export default function MentalHealthCheckin() {
  const [mood, setMood] = useState(3)
  const [answers, setAnswers] = useState({})
  const [notes, setNotes] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const { addMentalCheckin, isReady } = useStorage()

  const handleSubmit = async () => {
    if (isReady) {
      await addMentalCheckin({
        mood,
        answers,
        notes,
      })
    }

    setSubmitted(true)
    setTimeout(() => {
      setMood(3)
      setAnswers({})
      setNotes("")
      setSubmitted(false)
    }, 2000)
  }

  const isComplete = Object.keys(answers).length === checkInQuestions.length && notes.trim().length > 0

  return (
    <div className="space-y-6">
      {/* Mood Selection */}
      <Card className="border-0 bg-gradient-to-br from-secondary/10 to-primary/10 shadow-sm">
        <CardHeader>
          <CardTitle>How are you feeling today?</CardTitle>
          <CardDescription>Select your current mood level</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            {moodOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setMood(option.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  mood === option.value
                    ? `${option.color} ring-2 ring-offset-2 ring-primary`
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Assessment Questions */}
      <div className="space-y-4">
        {checkInQuestions.map((question) => (
          <Card key={question.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-foreground">{question.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-2">
                {question.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => setAnswers({ ...answers, [question.id]: option })}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      answers[question.id] === option
                        ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Notes */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Additional Notes</CardTitle>
          <CardDescription>Share any thoughts or concerns</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="What's on your mind? Any specific concerns or positive thoughts..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-32"
          />
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex gap-2">
        <Button onClick={handleSubmit} disabled={!isComplete || !isReady} className="flex-1 gap-2" size="lg">
          {submitted ? (
            <>
              <CheckCircle2 className="h-4 w-4" />
              Submitted
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Complete Check-in
            </>
          )}
        </Button>
      </div>

      {/* Completion Message */}
      {submitted && (
        <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30">
          <CardContent className="pt-6">
            <p className="text-green-700 dark:text-green-200 font-medium">
              Thank you! Your mental health check-in has been recorded. Keep taking care of yourself.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
