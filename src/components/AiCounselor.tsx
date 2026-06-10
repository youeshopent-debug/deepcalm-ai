"use client"

import { useLanguage } from "@/context/LanguageContext";
import { mockChatReply } from "@/lib/mockCounselor";
import { toPng } from "html-to-image";
import {
  Heart,
  ImageDown,
  MessageCircleHeart,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Message {
  role: "user" | "counselor"
  content: string
}

interface UsageInfo {
  model: string
  inputTokens: number
  outputTokens: number
  cost: number
}

export default function AiCounselor() {
  const { tt, locale } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [showShareSuccess, setShowShareSuccess] = useState(false)
  const [lastUsage, setLastUsage] = useState<UsageInfo | null>(null)
  const [totalCost, setTotalCost] = useState(0)
  const [showDecompose, setShowDecompose] = useState(false)
  const [decomposeSteps, setDecomposeSteps] = useState<string[]>([])
  const [isDecomposing, setIsDecomposing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const shareRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async () => {
    const text = input.trim()
    if (!text || isAnalyzing) return
    setInput("")
    setShowWelcome(false)
    setShowShareSuccess(false)

    const userMsg: Message = { role: "user", content: text }
    setMessages((prev) => [...prev, userMsg])
    setIsAnalyzing(true)

    try {
      const history = messages.map((m) => ({ role: m.role, content: m.content }))
      const res = await fetch("/api/analyze-anxiety", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, mode: "chat", history, locale }),
      })

      if (!res.ok) throw new Error(`API returned ${res.status}`)

      const data = await res.json()

      const counselorMsg: Message = { role: "counselor", content: data.content }
      setMessages((prev) => [...prev, counselorMsg])

      if (data.usage) {
        setLastUsage(data.usage)
        setTotalCost((prev) => prev + (data.usage.cost || 0))
      }
    } catch {
      const fallback: Message = {
        role: "counselor",
        content: mockChatReply(locale, text),
      }
      setMessages((prev) => [...prev, fallback])
    }

    setIsAnalyzing(false)
  }

  const handleDecompose = async () => {
    const lastUserMsg = [...messages].reverse().find((m) => m.role === "user")
    if (!lastUserMsg) return
    setIsDecomposing(true)
    try {
      const res = await fetch("/api/analyze-anxiety/decompose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: lastUserMsg.content, locale }),
      })
      if (!res.ok) throw new Error(`decompose API returned ${res.status}`)
      const data = await res.json()
      if (Array.isArray(data.steps) && data.steps.length === 3) {
        setDecomposeSteps(data.steps)
        setShowDecompose(true)
      }
    } catch {
      // Silent fail — simply don't show the decompose card
    }
    setIsDecomposing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleShare = async () => {
    const lastCounselorMsg = [...messages].reverse().find((m) => m.role === "counselor")
    if (!lastCounselorMsg) return
    if (!shareRef.current) return

    try {
      shareRef.current.style.display = "block"
      await new Promise((r) => setTimeout(r, 100))

      const dataUrl = await toPng(shareRef.current, {
        quality: 0.95,
        pixelRatio: 2,
        backgroundColor: "#0a0e1a",
      })

      shareRef.current.style.display = "none"

      const blob = await (await fetch(dataUrl)).blob()
      const file = new File([blob], `deepcalm-healing-${Date.now()}.png`, { type: "image/png" })

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({ files: [file], title: "DeepCalm Healing" })
          setShowShareSuccess(true)
          setTimeout(() => setShowShareSuccess(false), 3000)
          return
        } catch {}
      }

      const link = document.createElement("a")
      link.download = file.name
      link.href = dataUrl
      link.click()

      setShowShareSuccess(true)
      setTimeout(() => setShowShareSuccess(false), 3000)
    } catch {
      if (shareRef.current) shareRef.current.style.display = "none"
    }
  }

  const lastCounselorMsg = [...messages].reverse().find((m) => m.role === "counselor")

  return (
    <>
      <div
        className={`
          relative z-10 flex flex-col
          w-full min-h-[70vh] max-h-[85vh]
          ${drawerOpen
            ? "fixed inset-0 z-50 bg-dc-deep/95 backdrop-blur-xl"
            : "max-w-5xl mx-auto min-h-[70vh] max-h-[85vh]"
          }
        `}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 shrink-0">
          <div className="flex items-center gap-3">
            <MessageCircleHeart className="w-5 h-5 text-dc-accent" />
            <h2 className="text-base sm:text-lg font-semibold text-dc-text">
              {tt("aiCounselor.title")}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {drawerOpen && (
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-2 rounded-full hover:bg-dc-accent/10 transition-colors"
              >
                <X className="w-5 h-5 text-dc-muted" />
              </button>
            )}
          </div>
        </div>

        <div
          className="flex-1 overflow-y-auto px-4 sm:px-6 pb-2 space-y-4 scrollbar-thin"
          style={{ scrollBehavior: "smooth" }}
        >
          {showWelcome && messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6 py-12">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-dc-accent/20 to-transparent flex items-center justify-center animate-breath-orb-4-7">
                <Heart className="w-8 h-8 text-dc-accent" />
              </div>
              <div className="space-y-2">
                <p className="text-xl sm:text-2xl font-medium text-dc-text">
                  {tt("aiCounselor.welcome")}
                </p>
                <p className="text-xl sm:text-2xl text-dc-muted/80 max-w-lg leading-relaxed">
                  {tt("aiCounselor.subtitle")}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 w-full max-w-sm">
                {["stress", "sleep", "anxiety", "lonely"].map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setInput(tt(`aiCounselor.topic_${t}` as any))
                      setDrawerOpen(true)
                    }}
                    className="px-4 py-2.5 text-sm bg-dc-surface/60 hover:bg-dc-accent/10 border border-dc-border hover:border-dc-accent/30 text-dc-muted hover:text-dc-text rounded-xl transition-all duration-300"
                  >
                    {tt(`aiCounselor.topic_${t}` as any)}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fade-in-glow`}
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div
                    className={`
                      max-w-[85%] sm:max-w-[75%] px-5 py-4
                      text-xl leading-relaxed
                      ${
                        msg.role === "user"
                          ? "bg-dc-accent/15 border border-dc-accent/20 text-dc-text rounded-2xl rounded-br-md"
                          : "glass-strong text-dc-text rounded-2xl rounded-bl-md"
                      }
                    `}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isAnalyzing && (
                <div className="flex justify-start animate-fade-in-glow">
                  <div className="glass-strong rounded-2xl rounded-bl-md px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-dc-accent/60 rounded-full animate-pulse-soft" />
                      <span className="w-2 h-2 bg-dc-accent/60 rounded-full animate-pulse-soft" style={{ animationDelay: "0.3s" }} />
                      <span className="w-2 h-2 bg-dc-accent/60 rounded-full animate-pulse-soft" style={{ animationDelay: "0.6s" }} />
                      <span className="text-sm text-dc-muted ml-2">{tt("aiCounselor.analyzing")}</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {!showWelcome && lastCounselorMsg && (
          <div className="px-4 sm:px-6 pb-1 shrink-0">
            <div className="flex items-center gap-2 justify-center">
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-dc-muted hover:text-dc-accent bg-dc-surface/40 hover:bg-dc-accent/10 rounded-full transition-all duration-300"
              >
                <ImageDown className="w-3.5 h-3.5" />
                <span>{tt("common.healPoster")}</span>
              </button>
              {showShareSuccess && (
                <span className="text-xs text-emerald-400 animate-fade-in-glow">
                  ✅ {tt("common.healPosterSaved")}
                </span>
              )}
            </div>
          </div>
        )}

        {showDecompose && decomposeSteps.length === 3 && (
          <div className="shrink-0 px-4 sm:px-6 py-2 animate-fade-in-glow">
            <div className="bg-dc-surface/60 backdrop-blur-md border border-dc-border/60 rounded-2xl px-4 sm:px-6 py-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-dc-muted/60 font-medium tracking-wide">⚡ 快拆 · 3 步行动</p>
                <button
                  onClick={() => setShowDecompose(false)}
                  className="text-dc-muted/40 hover:text-dc-muted transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="space-y-2">
                {decomposeSteps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-dc-accent/20 text-dc-accent text-[10px] font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-sm text-dc-text/80 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="shrink-0 px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex items-center gap-2 sm:gap-3 bg-dc-surface/60 backdrop-blur-md border border-dc-border rounded-2xl px-4 sm:px-6 py-3 sm:py-4 focus-within:border-dc-accent/40 transition-all duration-300">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={tt("aiCounselor.placeholder")}
              className="flex-1 bg-transparent text-xl text-dc-text placeholder:text-dc-muted/50 outline-none"
              onClick={() => setDrawerOpen(true)}
            />
            {!showWelcome && messages.filter((m) => m.role === "counselor").length > 0 && (
              <button
                onClick={handleDecompose}
                disabled={isDecomposing}
                className="px-3 py-2 rounded-xl text-sm font-medium bg-purple-500/15 text-purple-400 hover:bg-purple-500/25 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 shrink-0"
              >
                {isDecomposing ? (
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-purple-400/60 rounded-full animate-pulse-soft" />
                    <span className="w-2 h-2 bg-purple-400/60 rounded-full animate-pulse-soft" style={{ animationDelay: "0.3s" }} />
                    <span className="w-2 h-2 bg-purple-400/60 rounded-full animate-pulse-soft" style={{ animationDelay: "0.6s" }} />
                  </span>
                ) : (
                  "⚡ 快拆"
                )}
              </button>
            )}
            <button
              onClick={handleSend}
              disabled={!input.trim() || isAnalyzing}
              className="px-4 sm:px-5 py-2.5 rounded-xl bg-dc-accent text-dc-deep text-sm sm:text-base font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-dc-accent/90 transition-all duration-300 shrink-0"
            >
              {tt("aiCounselor.submit")}
            </button>
          </div>
        </div>
      </div>

      <div
        ref={shareRef}
        className="hidden fixed"
        style={{
          width: "480px",
          padding: "32px",
          background: "linear-gradient(135deg, #0a0e1a 0%, #111827 50%, #1a2238 100%)",
          borderRadius: "24px",
          left: "-9999px",
          top: "0",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at 50% 0%, rgba(126,184,255,0.06), transparent 70%)",
            borderRadius: "24px",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, rgba(126,184,255,0.3), transparent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: "20px" }}>🌙</span>
            </div>
            <span style={{ color: "#7EB8FF", fontSize: "14px", fontWeight: 600, letterSpacing: "0.5px" }}>
              DeepCalm · Healing
            </span>
          </div>
          <p
            style={{
              color: "#E8EDF5",
              fontSize: "22px",
              lineHeight: 1.7,
              fontWeight: 400,
              fontStyle: "italic",
              marginBottom: "32px",
            }}
          >
            &ldquo;{lastCounselorMsg?.content || ""}&rdquo;
          </p>
          <div
            style={{
              width: "48px",
              height: "3px",
              background: "linear-gradient(90deg, #7EB8FF, transparent)",
              borderRadius: "2px",
              marginBottom: "20px",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ color: "rgba(180,200,230,0.5)", fontSize: "13px" }}>
              deepcalm-ai.com/{locale}
            </span>
            <span style={{ color: "rgba(126,184,255,0.4)", fontSize: "20px" }}>✦</span>
          </div>
        </div>
      </div>
    </>
  )
}
