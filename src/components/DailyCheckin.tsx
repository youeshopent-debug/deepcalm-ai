"use client"

import { useState, useEffect, useRef } from "react"
import { useLanguage } from "@/context/LanguageContext"
import { Moon, Sun, Send, Sparkles, Download, X } from "lucide-react"
import { toPng } from "html-to-image"
import { QRCodeSVG } from "qrcode.react"

const STORAGE_KEY = "deepcalm_checkins"
const MOODS = ["calm", "anxious", "tired", "happy", "sad", "energetic"] as const
const SLEEP_LEVELS = ["great", "okay", "poor"] as const
const RECOMMENDED_PRODUCTS = [
  { key: "weightedBlanket", icon: "🛏️" },
  { key: "sunLamp", icon: "💡" },
  { key: "noiseMachine", icon: "🎵" },
  { key: "meditationCushion", icon: "🧘" },
] as const

export default function DailyCheckin() {
  const { tt, locale } = useLanguage()
  const [sleep, setSleep] = useState<string>("")
  const [mood, setMood] = useState<string>("")
  const [checkedIn, setCheckedIn] = useState(false)
  const [email, setEmail] = useState("")
  const [emailSubscribed, setEmailSubscribed] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [subscribing, setSubscribing] = useState(false)
  const [comment, setComment] = useState("")
  const [commentLoading, setCommentLoading] = useState(false)
  const [showPoster, setShowPoster] = useState(false)
  const [shareCopied, setShareCopied] = useState(false)
  const posterRef = useRef<HTMLDivElement>(null)

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
          if (parsed.lang === locale) {
            setComment(parsed.comment || "")
          }
        }
      } catch { /* ignore */ }
    }
    const sub = localStorage.getItem("deepcalm_email")
    if (sub) setEmailSubscribed(true)
  }, [locale])

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

    const data = { date: new Date().toDateString(), sleep, mood, comment: "", lang: locale }
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

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!re.test(email)) {
      setEmailError(true)
      return
    }
    setEmailError(false)
    setSubscribing(true)
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, lang: locale }),
      })
      const json = await res.json()
      if (json.ok) {
        localStorage.setItem("deepcalm_email", email)
        setEmailSubscribed(true)
      } else {
        setEmailError(true)
      }
    } catch {
      setEmailError(true)
    } finally {
      setSubscribing(false)
    }
  }

  const handleSavePoster = async () => {
    if (!posterRef.current) return
    try {
      const dataUrl = await toPng(posterRef.current, { quality: 0.95, pixelRatio: 2 })
      const link = document.createElement("a")
      link.download = `deepcalm-${Date.now()}.png`
      link.href = dataUrl
      link.click()
      setShowPoster(false)
    } catch {
      // fallback: clipboard text share
      const text = `${tt("healingReport.title")}\n${
        sleep === "great" ? tt("healingReport.sleepGreat")
          : sleep === "okay" ? tt("healingReport.sleepOkay")
          : tt("healingReport.sleepPoor")
      }\n\n${tt("healingReport.sharePrompt")}\n\nhttps://deepcalm-ai.com/${locale}`
      navigator.clipboard?.writeText(text)
      setShowPoster(false)
    }
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
                    disabled={subscribing}
                    className="px-4 py-2.5 bg-dc-accent hover:bg-dc-accent/90 disabled:opacity-50 text-dc-deep text-sm font-medium rounded-xl transition-colors flex items-center gap-2"
                  >
                    <Send className={`w-3.5 h-3.5 ${subscribing ? "animate-pulse" : ""}`} />
                    {subscribing ? tt("dailyCheckin.subscribing") : tt("dailyCheckin.emailButton")}
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
                  <span className="text-xs text-dc-muted/70">{tt("healingReport.moodHeader")}: </span>
                  <span className="text-base">{getMoodEmoji(mood)}</span>
                  <span className="text-sm text-dc-text">{getMoodLabel(mood)}</span>
                </div>
              )}
              <div className="mt-3 flex gap-2 flex-wrap">
                <button
                  onClick={async () => {
                    const text = `${tt("healingReport.title")}\n${
                      sleep === "great" ? tt("healingReport.sleepGreat")
                        : sleep === "okay" ? tt("healingReport.sleepOkay")
                        : tt("healingReport.sleepPoor")
                    }\n\n${tt("healingReport.sharePrompt")}\n\nhttps://deepcalm-ai.com/${locale}`
                    try {
                      if (navigator.share) {
                        await navigator.share({ title: "DeepCalm", text, url: `https://deepcalm-ai.com/${locale}` })
                        return
                      }
                    } catch { /* user cancelled */ }
                    try {
                      await navigator.clipboard.writeText(text)
                    } catch { /* clipboard blocked */ }
                    setShareCopied(true)
                    setTimeout(() => setShareCopied(false), 2500)
                  }}
                  className="px-3 py-1.5 text-xs font-medium bg-dc-accent/10 hover:bg-dc-accent/20 text-dc-accent rounded-lg transition-colors"
                >
                  {shareCopied ? tt("common.copied") : `📤 ${tt("common.share")}`}
                </button>
                <button
                  onClick={() => setShowPoster(true)}
                  className="px-3 py-1.5 text-xs font-medium bg-dc-accent/10 hover:bg-dc-accent/20 text-dc-accent rounded-lg transition-colors"
                >
                  🎨 {tt("common.healPoster")}
                </button>
                {!emailSubscribed && (
                  <p className="text-xs text-dc-muted/70 leading-relaxed">
                    {tt("healingReport.subscribeCta")}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-br from-amber-500/[0.06] to-transparent border border-amber-500/10 rounded-xl">
              <h3 className="text-sm font-semibold text-dc-text flex items-center gap-2 mb-3">
                <span className="text-lg">🛍️</span>
                {tt("affiliate.title")}
              </h3>
              <p className="text-xs text-dc-muted/70 mb-3">{tt("affiliate.subtitle")}</p>
              <div className="grid grid-cols-2 gap-2">
                {RECOMMENDED_PRODUCTS.map((p) => (
                  <div key={p.key} className="p-2.5 bg-dc-surface/50 rounded-xl border border-dc-border/30 hover:border-dc-accent/20 transition-colors">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className="text-base">{p.icon}</span>
                      <span className="text-[11px] font-medium text-dc-text leading-tight">
                        {tt(`affiliate.recommendedProducts.${p.key}.name`)}
                      </span>
                    </div>
                    <p className="text-[10px] text-dc-muted/70 leading-relaxed mb-1.5 line-clamp-2">
                      {tt(`affiliate.recommendedProducts.${p.key}.description`)}
                    </p>
                    <span className="inline-block text-[9px] text-amber-400/80 font-medium bg-amber-500/10 px-1.5 py-0.5 rounded">
                      {tt("affiliate.whyWeRecommend")}: {tt(`affiliate.recommendedProducts.${p.key}.whyWeRecommendIt`)}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[9px] text-dc-muted/30 text-center leading-relaxed">
                {tt("affiliate.affiliateDisclaimer")}
              </p>
            </div>

            {showPoster && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                <div className="relative max-w-sm w-full">
                  <button
                    onClick={() => setShowPoster(false)}
                    className="absolute -top-2 -right-2 z-10 w-8 h-8 bg-dc-surface border border-dc-border rounded-full flex items-center justify-center hover:bg-dc-accent/10 transition-colors"
                  >
                    <X className="w-4 h-4 text-dc-muted" />
                  </button>
                  <div ref={posterRef} className="bg-gradient-to-br from-dc-deep via-[#1a1a3e] to-dc-deep rounded-2xl p-6 shadow-2xl border border-dc-border/30">
                    <div className="flex flex-col items-center text-center">
                      <div className="text-3xl mb-2">🌙</div>
                      <h3 className="text-lg font-bold text-white mb-1">DeepCalm AI</h3>
                      <p className="text-xs text-white/50 mb-4">{tt("dailyCheckin.checkinDone")}</p>

                      <div className="w-full p-3 bg-white/5 rounded-xl mb-3">
                        <div className="flex items-center justify-center gap-3 mb-2">
                          <div className="flex items-center gap-1.5 px-2 py-1 bg-white/10 rounded-full">
                            {sleep === "great" ? <Sun className="w-3 h-3 text-yellow-400" /> : <Moon className="w-3 h-3 text-white/50" />}
                            <span className="text-xs text-white/80">{getSleepLabel(sleep)}</span>
                          </div>
                          <span className="text-lg">{getMoodEmoji(mood)}</span>
                          <span className="text-xs text-white/80">{getMoodLabel(mood)}</span>
                        </div>
                      </div>

                      {comment && (
                        <div className="w-full p-3 bg-dc-accent/10 rounded-xl mb-4">
                          <p className="text-xs text-white/70 italic leading-relaxed">&ldquo;{comment}&rdquo;</p>
                        </div>
                      )}

                      <div className="bg-white p-2 rounded-xl mb-2">
                        <QRCodeSVG value={`https://deepcalm-ai.com/${locale}`} size={80} bgColor="#ffffff" fgColor="#000000" />
                      </div>
                      <p className="text-[10px] text-white/40">deepcalm-ai.com</p>

                      <button
                        onClick={handleSavePoster}
                        className="mt-4 px-5 py-2 bg-dc-accent hover:bg-dc-accent/90 text-dc-deep text-sm font-medium rounded-xl transition-colors flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        {tt("common.healPosterSaved")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
