"use client"

import { useState, useRef, useEffect } from "react"
import { Send, User, Bot } from "lucide-react"

const defaultMessages = [
  {
    role: "assistant",
    content:
      "Hey, I'm glad you're here. Take a deep breath — in for 4, hold, out for 7. There's no rush. What's on your mind tonight?",
  },
]

const autoReplies: Record<string, string> = {
  stress:
    "It sounds like you've been carrying a lot. Let's try a grounding exercise together. Name 3 things you can hear right now...",
  sleep:
    "Trouble sleeping is often your mind trying to protect you. Let me share a CBT-I technique: try getting out of bed if you haven't fallen asleep in 20 minutes.",
  lonely:
    "You're not alone in feeling this way. At this very moment, others in our community are breathing in the same rhythm you are.",
  anxiety:
    "Anxiety is a wave — it rises, peaks, and falls. Let's ride it together. Focus on your breath: 4 seconds in, 7 seconds out.",
}

export default function AiCounselor() {
  const [messages, setMessages] = useState(defaultMessages)
  const [input, setInput] = useState("")
  const [analyzing, setAnalyzing] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, analyzing])

  function handleSend() {
    const text = input.trim()
    if (!text || analyzing) return
    setInput("")
    setMessages((prev) => [...prev, { role: "user", content: text }])
    setAnalyzing(true)

    const lower = text.toLowerCase()
    let reply = autoReplies.anxiety
    if (lower.includes("stress") || lower.includes("tired") || lower.includes("exhaust"))
      reply = autoReplies.stress
    else if (lower.includes("sleep") || lower.includes("bed") || lower.includes("insomnia"))
      reply = autoReplies.sleep
    else if (lower.includes("alone") || lower.includes("lonely") || lower.includes("nobody"))
      reply = autoReplies.lonely

    setTimeout(() => {
      setAnalyzing(false)
      setMessages((prev) => [...prev, { role: "assistant", content: reply }])
    }, 2000)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-dc-text">AI Companion</h2>
        <p className="mt-1 text-sm text-dc-muted">A friend who listens, without judgment</p>
      </div>

      <div className="glass-strong rounded-2xl overflow-hidden" style={{ minHeight: "440px" }}>
        <div className="h-[340px] overflow-y-auto p-4 space-y-4 scroll-smooth">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-dc-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-dc-accent" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-dc-accent text-dc-deep rounded-tr-md"
                    : "glass rounded-tl-md text-dc-text"
                }`}
              >
                {msg.content}
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-dc-accent flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="w-4 h-4 text-dc-deep" />
                </div>
              )}
            </div>
          ))}

          {analyzing && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-dc-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-4 h-4 text-dc-accent" />
              </div>
              <div className="glass rounded-2xl rounded-tl-md px-5 py-3 text-sm text-dc-muted overflow-hidden relative">
                <span className="relative z-10">Analyzing your emotions...</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-dc-accent/[0.06] to-transparent animate-analysis-shimmer" />
              </div>
            </div>
          )}

          <div ref={endRef} />
        </div>

        <div className="border-t border-dc-border p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Share what's on your mind..."
              className="flex-1 bg-dc-surface rounded-xl px-4 py-2.5 text-sm text-dc-text placeholder:text-dc-muted/40 outline-none border border-dc-border focus:border-dc-accent/40 transition-colors"
            />
            <button
              onClick={handleSend}
              disabled={analyzing || !input.trim()}
              className="w-10 h-10 rounded-xl bg-dc-accent text-dc-deep flex items-center justify-center hover:bg-dc-accent/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
