"use client"

import { useLanguage } from "@/context/LanguageContext";
import { mockChatReply } from "@/lib/mockCounselor";
import { toPng } from "html-to-image";
import {
  Heart,
  ImageDown,
  MessageCircleHeart,
  Sparkles,
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

/** localStorage 记忆数据结构 */
interface MemoryData {
  emotionTags: string[]
  lastVisit: string
  visitCount: number
}

/** 7语种 "欢迎回来" 问候模板 — {tag} 会被替换为具体情绪标签 */
const WELCOME_BACK_TEMPLATES: Record<string, string> = {
  zh: "嘿，很高兴你回来了。上次你说{tag}，这几天感觉好些了吗？",
  en: "Hey, glad you're back. Last time you mentioned {tag} — how have you been feeling?",
  ms: "Hei, gembira anda kembali. Kali terakhir anda menyebut {tag} — bagaimana perasaan anda?",
  ja: "やあ、戻ってきてくれて嬉しいです。前回は{tag}と言っていましたが、その後気分はいかがですか？",
  ko: "안녕하세요, 다시 오신 것을 환영합니다. 지난번에 {tag}에 대해 말씀하셨는데, 요즘은 어떠신가요?",
  th: "ดีใจที่คุณกลับมา ครั้งที่แล้วคุณพูดถึง{tag} ช่วงนี้คุณรู้สึกดีขึ้นไหม?",
  es: "Me alegra verte de nuevo. La última vez mencionaste {tag} — ¿cómo te has sentido?",
}

/** 情绪标签 → 本地化短语映射 */
const TAG_PHRASES: Record<string, Record<string, string>> = {
  stress: {
    zh: "压力很大", en: "feeling stressed", ms: "tertekan", ja: "ストレスが溜まっている", ko: "스트레스가 많다고", th: "เครียดมาก", es: "mucho estrés",
  },
  sleep: {
    zh: "入睡有点难", en: "having trouble sleeping", ms: "sukar tidur", ja: "寝つきが悪い", ko: "잠들기 어렵다고", th: "นอนไม่หลับ", es: "dificultad para dormir",
  },
  anxiety: {
    zh: "有些焦虑", en: "feeling anxious", ms: "berasa cemas", ja: "不安を感じている", ko: "불안감을 느낀다고", th: "รู้สึกกังวล", es: "sintiendo ansiedad",
  },
  lonely: {
    zh: "感到孤独", en: "feeling lonely", ms: "berasa sunyi", ja: "孤独を感じている", ko: "외롭다고 느낀다고", th: "รู้สึกเหงา", es: "sintiendo soledad",
  },
}

/** 从用户消息中提取情绪标签 */
function extractEmotionTags(text: string): string[] {
  const tags: string[] = []
  const lower = text.toLowerCase()
  const stressWords = ["stress", "stressed", "压力", "ストレス", "스트레스", "tertekan", "เครียด", "estrés"]
  const sleepWords = ["sleep", "insomnia", "失眠", "不眠", "잠", "tidur", "นอน", "sueño", "入睡", "sleepless"]
  const anxietyWords = ["anxiety", "anxious", "焦虑", "不安", "불안", "cemas", "กังวล", "ansiedad"]
  const lonelyWords = ["lonely", "loneliness", "孤独", "loneliness", "외로움", "sunyi", "เหงา", "soledad", "alone"]
  if (stressWords.some(w => lower.includes(w))) tags.push("stress")
  if (sleepWords.some(w => lower.includes(w))) tags.push("sleep")
  if (anxietyWords.some(w => lower.includes(w))) tags.push("anxiety")
  if (lonelyWords.some(w => lower.includes(w))) tags.push("lonely")
  return tags
}

/** 保存记忆到 localStorage */
function saveMemory(tags: string[]) {
  try {
    const prevRaw = localStorage.getItem("deepcalm-memory")
    const prev: MemoryData = prevRaw ? JSON.parse(prevRaw) : { emotionTags: [], lastVisit: "", visitCount: 0 }
    // 合并去重，最多保留 3 个标签
    const merged = [...new Set([...tags, ...prev.emotionTags])].slice(0, 3)
    const memory: MemoryData = {
      emotionTags: merged,
      lastVisit: new Date().toISOString(),
      visitCount: prev.visitCount + 1,
    }
    localStorage.setItem("deepcalm-memory", JSON.stringify(memory))
  } catch { /* localStorage 不可用则静默失败 */ }
}

/** 读取记忆 */
function loadMemory(): MemoryData | null {
  try {
    const raw = localStorage.getItem("deepcalm-memory")
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

const STORAGE_KEY = "deepcalm-memory"

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
  const [returnVisitor, setReturnVisitor] = useState<MemoryData | null>(null)
  const memorySavedRef = useRef(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const shareRef = useRef<HTMLDivElement>(null)

  /** 挂载时读取记忆，检测回访 */
  useEffect(() => {
    const mem = loadMemory()
    if (mem && mem.emotionTags.length > 0) {
      setReturnVisitor(mem)
    }
  }, [])

  /** 自动滚动到最新消息 */
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

    // 提取情绪标签并保存到 localStorage 记忆（仅首次发送时）
    if (!memorySavedRef.current) {
      const tags = extractEmotionTags(text)
      if (tags.length > 0) {
        saveMemory(tags)
        memorySavedRef.current = true
      }
    }

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
                {returnVisitor ? (
                  <Sparkles className="w-8 h-8 text-dc-accent" />
                ) : (
                  <Heart className="w-8 h-8 text-dc-accent" />
                )}
              </div>
              <div className="space-y-2">
                {returnVisitor ? (
                  <>
                    <p className="text-xl sm:text-2xl font-medium text-dc-text">
                      {(() => {
                        const tmpl = WELCOME_BACK_TEMPLATES[locale] || WELCOME_BACK_TEMPLATES.en
                        const tagKey = returnVisitor.emotionTags[0]
                        const phrase = TAG_PHRASES[tagKey]?.[locale] || TAG_PHRASES[tagKey]?.en || tagKey
                        return tmpl.replace("{tag}", phrase)
                      })()}
                    </p>
                    <p className="text-base text-dc-muted/60 max-w-lg leading-relaxed">
                      {locale === "zh" ? "今天想聊聊什么？" : locale === "ms" ? "Apa yang anda mahu bincangkan hari ini?" : locale === "ja" ? "今日は何について話しますか？" : locale === "ko" ? "오늘은 무엇에 대해 이야기하고 싶으신가요?" : locale === "th" ? "วันนี้คุณอยากคุยเรื่องอะไร?" : locale === "es" ? "¿De qué te gustaría hablar hoy?" : "What would you like to talk about today?"}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-xl sm:text-2xl font-medium text-dc-text">
                      {tt("aiCounselor.welcome")}
                    </p>
                    <p className="text-xl sm:text-2xl text-dc-muted/80 max-w-lg leading-relaxed">
                      {tt("aiCounselor.subtitle")}
                    </p>
                  </>
                )}
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
