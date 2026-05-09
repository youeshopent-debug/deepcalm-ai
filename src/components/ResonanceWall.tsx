"use client"

import { useState, useEffect, useRef } from "react"

interface Message {
  id: number
  text: string
  timestamp: number
}

const SEED_MESSAGES: string[] = [
  "I've been struggling with anxiety for years. This space helps me breathe.",
  "First time trying guided breathing. Is it normal to feel lightheaded?",
  "3 AM and I can't sleep. Thank you for being here.",
  "My therapist recommended CBT. This feels like a warm blanket for my mind.",
  "Just lost my job. Trying to find calm in the storm.",
  "4-7-8 breathing is literally saving my life right now.",
  "I usually feel so alone at this hour. Not tonight.",
  "First night here. The breathing circle is hypnotic. ❤️",
  "Can we talk about how hard it is to quiet your mind?",
  "Day 3 of using DeepCalm. I actually slept 6 hours last night.",
]

export default function ResonanceWall() {
  const [messages, setMessages] = useState<Message[]>([])
  const [globalCount, setGlobalCount] = useState(127)
  const [input, setInput] = useState("")
  const counterRef = useRef(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlobalCount((c) => c + Math.floor(Math.random() * 3) + 1)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    function addSeed() {
      const text = SEED_MESSAGES[counterRef.current % SEED_MESSAGES.length]
      counterRef.current++
      setMessages((prev) => [...prev, { id: Date.now(), text, timestamp: Date.now() }])
    }
    addSeed()
    const interval = setInterval(addSeed, 7000)
    return () => clearInterval(interval)
  }, [])

  function handleSend() {
    const text = input.trim()
    if (!text) return
    setInput("")
    setMessages((prev) => [...prev, { id: Date.now(), text, timestamp: Date.now() }])
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-dc-text">Resonance Wall</h2>
        <p className="mt-1 text-sm text-dc-muted">
          Shared whispers in the quiet hours
        </p>
        <div className="mt-3 inline-flex items-center gap-2 glass rounded-full px-4 py-1.5">
          <span className="w-2 h-2 rounded-full bg-dc-success animate-pulse-soft" />
          <span className="text-xs text-dc-muted">
            {globalCount.toLocaleString()} people breathing with you right now
          </span>
        </div>
      </div>

      <div className="glass-strong rounded-2xl p-4">
        <div className="h-[300px] overflow-hidden relative">
          <div className="absolute inset-0 overflow-y-auto scroll-smooth p-2 space-y-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="animate-meteor-trail opacity-0"
              >
                <div className="glass rounded-xl px-3 py-2 inline-block max-w-[85%]">
                  <p className="text-sm text-dc-text">{msg.text}</p>
                  <p className="text-[10px] text-dc-muted/40 mt-0.5">
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Share your thought..."
            className="flex-1 bg-dc-surface rounded-xl px-4 py-2.5 text-sm text-dc-text placeholder:text-dc-muted/40 outline-none border border-dc-border focus:border-dc-accent/40 transition-colors"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="px-4 py-2.5 rounded-xl bg-dc-accent text-dc-deep text-sm font-medium hover:bg-dc-accent/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Share
          </button>
        </div>
      </div>
    </div>
  )
}
