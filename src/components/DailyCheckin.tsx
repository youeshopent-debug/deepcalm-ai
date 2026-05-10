"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/context/LanguageContext"
import { Moon, Sun, Send, Sparkles } from "lucide-react"

const STORAGE_KEY = "deepcalm_checkins"
const MOODS = ["calm", "anxious", "tired", "happy", "sad", "energetic"] as const
const SLEEP_LEVELS = ["great", "okay", "poor"] as const

export default function DailyCheckin() {
  const { tt, locale } = useLanguage()
  const [sleep, setSleep] = useState<string>("")
  const [mood, setMood] = useState<string>("")
  const [checkedIn, setCheckedIn] = useState(false)
  const [email, setEmail] = useState("")
  const [emailSubscribed, setEmailSubscribed] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [comment, setComment] = useState("")
  const [commentLoading, setCommentLoading] = useState(false)

  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY)
    if (data) {
      try {
        const parsed = JSON.parse(data)
        const today = new Date().toDateString()
        if (parsed.date === today) {
          setCheckedIn(true)
          setSleep(parsed.sleep || "")
          setMood(parsed.mood || "")
          setComment(parsed.comment || "")
        }
      } catch { /* ignore */ }
    }
    const sub = localStorage.getItem("deepcalm_email")
    if (sub) setEmailSubscribed(true)
  }, [])

  const getMoodEmoji = (m: string) => {
    const map: Record<string, string> = {
      calm: "🧘", anxious: "😟", tired: "😴",
      happy: "😊", sad: "😢", energetic: "⚡",
    }
    return map[m] || ""
  }

  const getSleepLabel = (s: string) => {
    return tt(`dailyCheckin.sleep${s.charAt(0).toUpperCase() + s.slice(1)}` as any)
  }

  const getMoodLabel = (m: string) => {
    return tt(`dailyCheckin.mood${m.charAt(0).toUpperCase() + m.slice(1)}` as any)
  }

  const handleCheckin = async () => {
    if (!sleep || !mood) return
    setCheckedIn(true)
    setCommentLoading(true)

    const data = { date: new Date().toDateString(), sleep, mood, comment: "" }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))

    try {
      const res = await fetch("/api/checkin-comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sleep, mood, lang: locale }),
      })
      const json = await res.json()
      data.comment = json.comment ?? ""
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      setComment(data.comment)
    } catch {
      const fallbackKey = `dailyCheckin.aiResponse_${
        mood === "calm" || mood === "happy" || mood === "energetic"
          ? mood
          : mood === "anxious" ? "anxious"
          : mood === "tired" ? "tired"
          : "sad"
      }` as any
      setComment(tt(fallbackKey))
    } finally {
      setCommentLoading(false)
    }
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!re.test(email)) {
      setEmailError(true)
      return
    }
    setEmailError(false)
    localStorage.setItem("deepcalm_email", email)
    setEmailSubscribed(true)
  }

  if (checkedIn) {
    return (
      <section id="daily-checkin" className="py-24">
        <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-8 glass rounded-2xl">
            <div className="flex items-center gap-3 mb-5">
              <Sparkles className="w-5 h-5 text-dc-accent" />
              <span className="text-sm font-medium text-dc-accent uppercase tracking-wider">
                {tt("dailyCheckin.checkinDone")}
              </span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-dc-accent/10 rounded-full">
                {sleep === "great" ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-dc-muted" />}
                <span className="text-sm text-dc-text">{getSleepLabel(sleep)}</span>
              </div>
              <span className="text-lg">{getMoodEmoji(mood)}</span>
              <span className="text-sm text-dc-text">{getMoodLabel(mood)}</span>
            </div>

            {commentLoading ? (
              <div className="p-4 bg-dc-surface/50 rounded-xl animate-pulse">
                <div className="h-4 bg-dc-accent/10 rounded w-3/4 mb-2" />
                <div className="h-4 bg-dc-accent/10 rounded w-1/2" />
              </div>
            ) : comment ? (
              <div className="p-4 bg-dc-accent/[0.04] border border-dc-accent/10 rounded-xl">
                <p className="text-sm text-dc-text/90 leading-relaxed">{comment}</p>
              </div>
            ) : null}

            {!emailSubscribed ? (
              <form onSubmit={handleEmailSubmit} className="mt-6 space-y-2">
                <p className="text-xs text-dc-muted">{tt("dailyCheckin.emailPlaceholder")}</p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setEmailError(false) }}
                    placeholder={tt("dailyCheckin.emailInputPlaceholder")}
                    className="flex-1 px-4 py-2.5 bg-dc-surface border border-dc-border rounded-xl text-sm text-dc-text placeholder:text-dc-muted/50 focus:outline-none focus:border-dc-accent/40 transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-dc-accent hover:bg-dc-accent/90 text-dc-deep text-sm font-medium rounded-xl transition-colors flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {tt("dailyCheckin.emailButton")}
                  </button>
                </div>
                {emailError && (
                  <p className="text-xs text-red-400">{tt("dailyCheckin.emailError")}</p>
                )}
              </form>
            ) : (
              <div className="mt-6 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <p className="text-sm text-emerald-400/90">✅ {tt("dailyCheckin.emailSuccess")}</p>
              </div>
            )}

            <div className="mt-6 p-4 bg-gradient-to-br from-dc-accent/[0.06] to-transparent border border-dc-accent/10 rounded-xl">
              <h3 className="text-sm font-semibold text-dc-text flex items-center gap-2">
                <span className="text-lg">🌙</span>
                {tt("healingReport.title")}
              </h3>
              <p className="mt-2 text-sm text-dc-text/80 leading-relaxed">
                {sleep === "great" ? tt("healingReport.sleepGreat")
                  : sleep === "okay" ? tt("healingReport.sleepOkay")
                  : tt("healingReport.sleepPoor")}
              </p>
              {mood && (
                <div className="mt-3 flex items-center gap-2 px-3 py-1.5 bg-dc-surface/50 rounded-lg">
                  <span className="text-xs text-dc-muted/70">{tt("healingReport.moodHeader")}：</span>
                  <span className="text-base">{getMoodEmoji(mood)}</span>
                  <span className="text-sm text-dc-text">{getMoodLabel(mood)}</span>
                </div>
              )}
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => {
                    const text = `${tt("healingReport.title")}\n${
                      sleep === "great" ? tt("healingReport.sleepGreat")
                        : sleep === "okay" ? tt("healingReport.sleepOkay")
                        : tt("healingReport.sleepPoor")
                    }\n\n${tt("healingReport.sharePrompt")}\n\nhttps://deepcalm-ai.com/${locale}`
                    navigator.clipboard?.writeText(text)
                  }}
                  className="px-3 py-1.5 text-xs font-medium bg-dc-accent/10 hover:bg-dc-accent/20 text-dc-accent rounded-lg transition-colors"
                >
                  📤 {tt("common.share") || "Share"}
                </button>
                {!emailSubscribed && (
                  <p className="text-xs text-dc-muted/70 leading-relaxed">
                    {tt("healingReport.subscribeCta")}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="daily-checkin" className="py-8">
      <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 glass rounded-2xl">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-dc-text mb-2">
              {tt("dailyCheckin.title")}
            </h2>
            <p className="text-sm text-dc-muted">{tt("dailyCheckin.subtitle")}</p>
          </div>

          <div className="mb-8">
            <p className="text-sm font-medium text-dc-text mb-3">{tt("dailyCheckin.sleepLabel")}</p>
            <div className="flex gap-2">
              {SLEEP_LEVELS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSleep(s)}
                  className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    sleep === s
                      ? "bg-dc-accent text-dc-deep shadow-lg shadow-dc-accent/20"
                      : "bg-dc-surface text-dc-muted hover:text-dc-text hover:bg-dc-accent/10"
                  }`}
                >
                  {getSleepLabel(s)}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <p className="text-sm font-medium text-dc-text mb-3">{tt("dailyCheckin.moodLabel")}</p>
            <div className="grid grid-cols-3 gap-2">
              {MOODS.map((m) => (
                <button
                  key={m}
                  onClick={() => setMood(m)}
                  className={`flex flex-col items-center gap-1 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    mood === m
                      ? "bg-dc-accent text-dc-deep shadow-lg shadow-dc-accent/20"
                      : "bg-dc-surface text-dc-muted hover:text-dc-text hover:bg-dc-accent/10"
                  }`}
                >
                  <span className="text-lg">{getMoodEmoji(m)}</span>
                  <span>{getMoodLabel(m)}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleCheckin}
            disabled={!sleep || !mood}
            className="w-full px-6 py-3 bg-dc-accent text-dc-deep text-sm font-semibold rounded-xl transition-all duration-300 hover:bg-dc-accent/90 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-dc-accent"
          >
            {tt("dailyCheckin.checkinButton")}
          </button>
        </div>
      </div>
    </section>
  )
}
