"use client"

import { useState, useEffect, useRef } from "react"
import { useLanguage } from "@/context/LanguageContext"

interface Message {
  id: number
  text: string
  timestamp: number
}

const SEED_MESSAGES_EN: string[] = [
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

const SEED_MESSAGES_ZH: string[] = [
  "第一次尝试引导式呼吸，有点晕正常吗？",
  "凌晨3点睡不着，谢谢你们在这里。",
  "焦虑好几年了，这个空间让我能喘口气。",
  "刚刚丢了工作，想在这片风暴里找点平静。",
  "4-7-8 呼吸法真的救了我。",
  "平时这个点总觉得自己很孤独，今晚不一样。",
  "第一晚来，这个呼吸圈太催眠了 ❤️",
  "有没有人觉得安静下来其实特别难？",
  "用 DeepCalm 第三天，昨晚睡了6个小时。",
  "失眠第四天，希望今晚能好一点。",
]

export default function ResonanceWall() {
  const { tt, locale } = useLanguage()
  const seedMessages = locale === "zh" ? SEED_MESSAGES_ZH : SEED_MESSAGES_EN

  const [messages, setMessages] = useState<(Message & { fading?: boolean })[]>([])
  const [globalCount] = useState(() => Math.floor(Math.random() * 1501) + 500)
  const [input, setInput] = useState("")
  const counterRef = useRef(0)

  function addMessage(text: string) {
    const id = Date.now()
    setMessages((prev) => [...prev, { id, text, timestamp: id }])
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, fading: true } : m))
      )
    }, 20000)
    setTimeout(() => {
      setMessages((prev) => prev.filter((m) => m.id !== id))
    }, 22500)
  }

  useEffect(() => {
    function addSeed() {
      const text = seedMessages[counterRef.current % seedMessages.length]
      counterRef.current++
      addMessage(text)
    }
    addSeed()
    const interval = setInterval(addSeed, 7000)
    return () => clearInterval(interval)
  }, [locale])

  function handleSend() {
    const text = input.trim()
    if (!text) return
    setInput("")
    addMessage(text)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-dc-text">
          {tt("resonanceWall.title")}
        </h2>
        <p className="mt-1 text-sm text-dc-muted">
          {tt("resonanceWall.subtitle")}
        </p>
        <div className="mt-3 inline-flex items-center gap-2 glass rounded-full px-4 py-1.5">
          <span className="w-2 h-2 rounded-full bg-dc-success animate-pulse" />
          <span className="text-xs text-dc-muted">
            {tt("resonanceWall.counter").replace("{n}", globalCount.toLocaleString())}
          </span>
        </div>
      </div>

      <div className="glass-strong rounded-2xl p-4">
        <div className="h-[300px] overflow-hidden relative">
          <div className="absolute inset-0 overflow-y-auto scroll-smooth p-2 space-y-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={msg.fading ? "animate-fade-out-glow" : "animate-fade-in-glow"}
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
            placeholder={tt("resonanceWall.placeholder")}
            className="flex-1 glass rounded-xl px-4 py-2.5 text-sm text-dc-text placeholder:text-dc-muted/40 outline-none focus:ring-1 focus:ring-dc-accent/30 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="px-4 py-2.5 rounded-xl bg-dc-accent text-dc-deep text-sm font-medium hover:bg-dc-accent/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {tt("resonanceWall.submit")}
          </button>
        </div>
      </div>
    </div>
  )
}
