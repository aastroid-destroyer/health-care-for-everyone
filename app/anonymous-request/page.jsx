"use client"

import React, { useEffect, useRef, useState } from "react";
import { Heart, Shield, Lock, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

// shadcn/ui styled components (adjust paths to your project structure)
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

const LOCAL_STORAGE_KEY = "anonymousHelpDraft:v1";

const RESOURCE_CARDS = [
  {
    id: "coping-anxiety",
    title: "Coping with Anxiety",
    desc: "Quick breathing exercises, grounding tips, and short activities to calm the mind.",
    href: "/help/tips/coping-with-anxiety",
  },
  {
    id: "local-volunteers",
    title: "Nearby Mental Health Volunteers",
    desc: "Community volunteers available for listening and basic support in your area.",
    href: "/help/volunteers",
  },
  {
    id: "emergency-resources",
    title: "Immediate Support & Hotlines",
    desc: "If you're in immediate danger or crisis, find urgent help and numbers here.",
    href: "/help/emergency",
  },
];

export default function AnonymousHelpCenter() {
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("mental");
  const [sendAnonymously, setSendAnonymously] = useState(true);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [showTrust, setShowTrust] = useState(true);
  const [mounted, setMounted] = useState(false);
  const textareaRef = useRef(null);

  // Ensure component is mounted before rendering animations
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load draft from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.message) setMessage(parsed.message);
        if (parsed?.category) setCategory(parsed.category);
        if (typeof parsed?.sendAnonymously === "boolean") setSendAnonymously(parsed.sendAnonymously);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  // Auto-save draft to localStorage
  useEffect(() => {
    const payload = { message, category, sendAnonymously };
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      // ignore storage errors
    }
  }, [message, category, sendAnonymously]);

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "0px"; // reset
    const height = ta.scrollHeight;
    ta.style.height = `${Math.max(80, height)}px`;
  }, [message]);

  function handleSubmit(e) {
    e?.preventDefault();
    if (!message.trim()) {
      // simple client validation; accessibility: announce
      const ta = textareaRef.current;
      ta?.focus();
      return;
    }

    setLoading(true);

    // Simulate network request — replace with real API call
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      // Optionally clear local draft after success
      try {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      } catch (e) {}
    }, 1100);
  }

  function handleReset() {
    setMessage("");
    setCategory("mental");
    setSendAnonymously(true);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {}
    const ta = textareaRef.current;
    ta?.focus();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
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
              <div className="rounded-xl bg-gradient-to-br from-accent to-secondary p-2.5 shadow-md">
                <Heart className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">Anonymous Help Request</h1>
                <p className="text-sm text-muted-foreground">We're here to listen — no names, no judgments.</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div
          className={`rounded-2xl p-6 bg-gradient-to-br from-background to-muted/30 border border-border shadow-sm backdrop-blur-md transition-all duration-500 ${
            mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          aria-labelledby="anon-help-heading"
        >
          <div className="flex flex-col gap-4">
            <label id="anon-help-heading" className="sr-only">
              Anonymous Help Form
            </label>

            <div>
              <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What would you like to share?"
                className="w-full resize-none rounded-xl p-4 bg-background/60 backdrop-blur-sm placeholder:text-muted-foreground text-foreground outline-none focus:ring-2 focus:ring-primary border border-border"
                aria-label="Your message"
                rows={4}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <div className="flex-1 min-w-0">
                <label htmlFor="category" className="sr-only">
                  Category
                </label>
                {/* Using shadcn Select for consistent design */}
                <Select onValueChange={(v) => setCategory(v)} defaultValue={category}>
                  <SelectTrigger id="category" className="w-full rounded-xl bg-background/60 border-border">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mental">Mental Health</SelectItem>
                    <SelectItem value="physical">Physical Health</SelectItem>
                    <SelectItem value="emotional">Emotional Support</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Send Anonymously</span>
                <Switch checked={sendAnonymously} onCheckedChange={() => setSendAnonymously((s) => !s)} aria-label="Send anonymously" />
              </div>
            </div>

            <div className="flex gap-3 items-center">
              <Button type="submit" className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-white shadow-md hover:opacity-90 transition-all" aria-disabled={loading} onClick={handleSubmit}>
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                ) : null}
                <span>{loading ? "Sending..." : "Send Help Request"}</span>
              </Button>

              <button type="button" onClick={handleReset} className="ml-auto text-sm underline text-muted-foreground">
                Reset Draft
              </button>
            </div>

            {/* Success message + Suggestions (shown after sent) */}
            {sent && (
              <div
                className={`mt-4 p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200 transition-opacity duration-500 ${
                  mounted ? 'opacity-100' : 'opacity-0'
                }`}
                role="status"
                aria-live="polite"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-white/30">
                    <Shield className="w-6 h-6 text-emerald-600" aria-hidden="true" />
                  </div>

                  <div>
                    <p className="font-medium text-foreground">Your message has been received ❤️</p>
                    <p className="text-sm text-muted-foreground">We're reviewing it and will respond with resources shortly.</p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-foreground mb-2">Helpful resources you can explore now:</p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {RESOURCE_CARDS.slice(0, 3).map((r) => (
                      <a
                        key={r.id}
                        href={r.href}
                        className="block"
                        aria-label={`Open ${r.title}`}
                      >
                        <Card className="hover:scale-[1.02] transition-transform rounded-xl bg-background/60 backdrop-blur-sm border border-border">
                          <CardHeader>
                            <CardTitle className="text-sm">{r.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-xs text-muted-foreground">{r.desc}</p>
                          </CardContent>
                          <CardFooter>
                            <span className="text-xs text-primary underline">Open</span>
                          </CardFooter>
                        </Card>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Trust indicator */}
            {showTrust && (
              <div
                className={`mt-4 p-3 rounded-xl flex items-center gap-3 bg-background/60 border border-border transition-opacity duration-500 ${
                  mounted ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="p-2 rounded-md bg-secondary/20">
                  <Lock className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm text-foreground">No personal information is stored or shared.</p>
                  <p className="text-xs text-muted-foreground">Only the message and category (anonymized) are sent to our support team.</p>
                </div>
              </div>
            )}

            <div className="text-xs text-muted-foreground mt-2">Tip: Your draft is saved locally to your device so you won't lose your message on refresh.</div>
          </div>
        </div>

        {/* Footer suggestions for first-time view (if not yet sent) */}
        {!sent && (
          <div
            className={`mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 transition-opacity duration-500 delay-150 ${
              mounted ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {RESOURCE_CARDS.map((r) => (
              <a key={r.id} href={r.href} className="block">
                <Card className="rounded-xl border border-border bg-background/60 backdrop-blur-sm hover:shadow-md transition-shadow">
                  <CardContent>
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-secondary/20">
                        <Heart className="w-5 h-5 text-secondary-foreground" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">{r.title}</h3>
                        <p className="text-xs text-muted-foreground">{r.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}