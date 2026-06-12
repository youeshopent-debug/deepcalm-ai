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
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100/50">
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-5">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">
                  {tt("dailyCheckin.checkinDone")}
                </span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full">
                  {sleep === "great" ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-slate-500" />}
                  <span className="text-sm font-semibold text-slate-700">{getSleepLabel(sleep)}</span>
                </div>
                <span className="text-lg">{getMoodEmoji(mood)}</span>
                <span className="text-sm font-semibold text-slate-800">{getMoodLabel(mood)}</span>
              </div>

              {commentLoading ? (
                <div className="p-4 bg-slate-50 rounded-xl animate-pulse">
                  <div className="h-4 bg-slate-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-slate-200 rounded w-1/2" />
                </div>
              ) : comment ? (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <p className="text-sm text-slate-700 leading-relaxed">{comment}</p>
                </div>
              ) : null}

              {!emailSubscribed ? (
                <form onSubmit={handleEmailSubmit} className="mt-6 space-y-2">
                  <p className="text-xs text-slate-600">{tt("dailyCheckin.emailPlaceholder")}</p>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setEmailError(false) }}
                      placeholder={tt("dailyCheckin.emailInputPlaceholder")}
                      className="flex-1 px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-800 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={subscribing}
                      className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white text-sm font-bold rounded-xl transition-colors flex items-center gap-2 shadow-lg"
                    >
                      <Send className={`w-3.5 h-3.5 ${subscribing ? "animate-pulse" : ""}`} />
                      {subscribing ? tt("dailyCheckin.subscribing") : tt("dailyCheckin.emailButton")}
                    </button>
                  </div>
                  {emailError && (
                    <p className="text-xs text-red-500">{tt("dailyCheckin.emailError")}</p>
                  )}
                </form>
              ) : (
                <div className="mt-6 p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <p className="text-sm font-semibold text-emerald-800">✅ {tt("dailyCheckin.emailSuccess")}</p>
                </div>
              )}

              <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <span className="text-lg">🌙</span>
                  {tt("healingReport.title")}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {sleep === "great" ? tt("healingReport.sleepGreat")
                    : sleep === "okay" ? tt("healingReport.sleepOkay")
                    : tt("healingReport.sleepPoor")}
                </p>
                {mood && (
                  <div className="mt-3 flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg">
                    <span className="text-xs font-semibold text-slate-600">{tt("healingReport.moodHeader")}: </span>
                    <span className="text-base">{getMoodEmoji(mood)}</span>
                    <span className="text-sm font-semibold text-slate-800">{getMoodLabel(mood)}</span>
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
                    className="px-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors shadow-sm"
                  >
                    {shareCopied ? tt("common.copied") : `📤 ${tt("common.share")}`}
                  </button>
                  <button
                    onClick={() => setShowPoster(true)}
                    className="px-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                  >
                    🎨 {tt("common.healPoster")}
                  </button>
                  {!emailSubscribed && (
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {tt("healingReport.subscribeCta")}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-3">
                  <span className="text-lg">🛍️</span>
                  {tt("affiliate.title")}
                </h3>
                <p className="text-xs text-slate-600 mb-3">{tt("affiliate.subtitle")}</p>
                <div className="grid grid-cols-2 gap-2">
                  {RECOMMENDED_PRODUCTS.map((p) => (
                    <div key={p.key} className="p-2.5 bg-white rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className="text-base">{p.icon}</span>
                        <span className="text-[11px] font-semibold text-slate-700 leading-tight">
                          {tt(`affiliate.recommendedProducts.${p.key}.name`)}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-relaxed mb-1.5 line-clamp-2">
                        {tt(`affiliate.recommendedProducts.${p.key}.description`)}
                      </p>
                      <span className="inline-block text-[9px] text-amber-600 font-medium bg-amber-50 px-1.5 py-0.5 rounded">
                        {tt("affiliate.whyWeRecommend")}: {tt(`affiliate.recommendedProducts.${p.key}.whyWeRecommendIt`)}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-[9px] text-slate-500 text-center leading-relaxed">
                  {tt("affiliate.affiliateDisclaimer")}
                </p>
              </div>

              {showPoster && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                  <div className="relative max-w-sm w-full">
                    <button
                      onClick={() => setShowPoster(false)}
                      className="absolute -top-2 -right-2 z-10 w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors shadow-lg"
                    >
                      <X className="w-4 h-4 text-slate-500" />
                    </button>
                    <div ref={posterRef} className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-700/30">
                      <div className="flex flex-col items-center text-center">
                        <div className="text-3xl mb-2">🌙</div>
                        <h3 className="text-lg font-bold text-white mb-1">DeepCalm AI</h3>
                        <p className="text-xs text-white/60 mb-4">{tt("dailyCheckin.checkinDone")}</p>

                        <div className="w-full p-3 bg-white/10 rounded-xl mb-3">
                          <div className="flex items-center justify-center gap-3 mb-2">
                            <div className="flex items-center gap-1.5 px-2 py-1 bg-white/15 rounded-full">
                              {sleep === "great" ? <Sun className="w-3 h-3 text-amber-400" /> : <Moon className="w-3 h-3 text-white/50" />}
                              <span className="text-xs text-white/80">{getSleepLabel(sleep)}</span>
                            </div>
                            <span className="text-lg">{getMoodEmoji(mood)}</span>
                            <span className="text-xs text-white/80">{getMoodLabel(mood)}</span>
                          </div>
                        </div>

                        {comment && (
                          <div className="w-full p-3 bg-blue-500/10 rounded-xl mb-4">
                            <p className="text-xs text-white/70 italic leading-relaxed">&ldquo;{comment}&rdquo;</p>
                          </div>
                        )}

                        <div className="bg-white p-2 rounded-xl mb-2">
                          <QRCodeSVG value={`https://deepcalm-ai.com/${locale}`} size={80} bgColor="#ffffff" fgColor="#000000" />
                        </div>
                        <p className="text-[10px] text-white/40">deepcalm-ai.com</p>

                        <button
                          onClick={handleSavePoster}
                          className="mt-4 px-5 py-2 bg-white hover:bg-slate-100 text-slate-800 text-sm font-bold rounded-xl transition-colors flex items-center gap-2 shadow-lg"
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
        </div>
      </section>
    )
  }

  return (
    <section id="daily-checkin" className="py-8">
      <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-100/50">
          <div className="p-6 sm:p-8">
            <div className="text-center mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">
                {tt("dailyCheckin.title")}
              </h2>
              <p className="text-sm font-medium text-slate-600">{tt("dailyCheckin.subtitle")}</p>
            </div>

            <div className="mb-8">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">{tt("dailyCheckin.sleepLabel")}</p>
              <div className="flex gap-2">
                {SLEEP_LEVELS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSleep(s)}
                    className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                      sleep === s
                        ? "bg-slate-800 text-white shadow-lg"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {getSleepLabel(s)}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">{tt("dailyCheckin.moodLabel")}</p>
              <div className="grid grid-cols-3 gap-2">
                {MOODS.map((m) => (
                  <button
                    key={m}
                    onClick={() => setMood(m)}
                    className={`flex flex-col items-center gap-1 px-3 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                      mood === m
                        ? "bg-slate-800 text-white shadow-lg"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
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
              className="w-full px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold rounded-xl transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg"
            >
              {tt("dailyCheckin.checkinButton")}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
