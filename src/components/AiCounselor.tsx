"use client"

import { useState, useRef, useEffect } from "react"
import { Bot, User, Loader2 } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"

interface Message {
  role: "user" | "ai"
  content: string
}

export default function AiCounselor() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const chatRef = useRef<HTMLDivElement>(null)
  const { tt, locale } = useLanguage()

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])

  function getKeywords(key: string): string[] {
    const raw = tt(`aiCounselor.${key}`)
    return raw.split(",").map((k: string) => k.trim().toLowerCase()).filter(Boolean)
  }

  function detectTopic(inputText: string): string {
    const lower = inputText.toLowerCase()
    const topics = [
      { key: "stressKeywords", replyKey: "replyStress" },
      { key: "sleepKeywords", replyKey: "replySleep" },
      { key: "lonelyKeywords", replyKey: "replyLonely" },
      { key: "anxietyKeywords", replyKey: "replyAnxiety" },
      { key: "selfWorthKeywords", replyKey: "replySelfWorth" },
      { key: "griefKeywords", replyKey: "replyGrief" },
      { key: "relationshipKeywords", replyKey: "replyRelationship" },
      { key: "identityKeywords", replyKey: "replyIdentity" },
    ]
    let matched: { key: string; count: number } | null = null
    for (const topic of topics) {
      const keywords = getKeywords(topic.key)
      const hitCount = keywords.filter((kw: string) => lower.includes(kw)).length
      if (hitCount > 0 && (!matched || hitCount > matched.count)) {
        matched = { key: topic.replyKey, count: hitCount }
      }
    }
    return matched ? tt(`aiCounselor.${matched.key}`) : ""
  }

  async function handleSend() {
    const trimmed = input.trim()
    if (!trimmed) return

    setShowWelcome(false)
    setMessages((prev) => [...prev, { role: "user", content: trimmed }])
    setInput("")
    setIsAnalyzing(true)

    await new Promise((r) => setTimeout(r, 800 + Math.random() * 1200))

    const reply = detectTopic(trimmed)
    setMessages((prev) => [
      ...prev,
      {
        role: "ai",
        content: reply || tt("aiCounselor.welcome"),
      },
    ])
    setIsAnalyzing(false)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="glass-strong rounded-2xl overflow-hidden">
        <div className="flex items-center gap-3 p-4 border-b border-dc-border">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-dc-accent to-dc-mint flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-dc-text">{tt("aiCounselor.title")}</h3>
            <p className="text-xs text-dc-muted">{tt("aiCounselor.subtitle")}</p>
            <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-dc-accent/10 text-dc-accent/70 border border-dc-accent/20">
              {tt("aiCounselor.badge")}
            </span>
          </div>
        </div>

        <div ref={chatRef} className="h-80 overflow-y-auto p-4 space-y-4 scroll-smooth">
          {showWelcome && (
            <div className="flex gap-3 animate-fade-in-up">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-dc-accent to-dc-mint flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="glass rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                <p className="text-sm text-dc-text leading-relaxed">
                  {tt("aiCounselor.welcome")}
                </p>
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""} animate-fade-in-up`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === "user"
                    ? "bg-dc-accent"
                    : "bg-gradient-to-br from-dc-accent to-dc-mint"
                }`}
              >
                {msg.role === "user" ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>
              <div
                className={`rounded-2xl px-4 py-3 max-w-[85%] ${
                  msg.role === "user"
                    ? "bg-dc-accent/20 rounded-tr-sm"
                    : "glass rounded-tl-sm"
                }`}
              >
                <p className="text-sm text-dc-text leading-relaxed whitespace-pre-wrap">
                  {msg.content}
                </p>
              </div>
            </div>
          ))}

          {isAnalyzing && (
            <div className="flex gap-3 animate-fade-in-up">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-dc-accent to-dc-mint flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="glass rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-dc-accent animate-spin" />
                  <span className="text-sm text-dc-muted">{tt("aiCounselor.analyzing")}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-dc-border">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={tt("aiCounselor.placeholder")}
              className="flex-1 bg-dc-surface/50 border border-dc-border rounded-xl px-4 py-2.5 text-sm text-dc-text placeholder:text-dc-muted/60 outline-none focus:border-dc-accent/50 transition-colors"
            />
            <button onClick={handleSend} disabled={!input.trim() || isAnalyzing}
            className="px-5 py-2.5 rounded-xl bg-dc-accent hover:bg-dc-accent/80 disabled:opacity-40 disabled:cursor-not-allowed text-sm text-white font-medium transition-all"
          >
            {tt("aiCounselor.submit")}
          </button>
          </div>
        </div>
      </div>
    </div>
  )
}
