"use client"

import { useLanguage } from "@/context/LanguageContext"
import { toPng } from "html-to-image"
import {
  Heart,
  ImageDown,
  MessageCircleHeart,
  Sparkles,
  X,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"
/* ── Types ── */

interface Message {
  role: "user" | "counselor"
  content: string
}

interface MemoryData {
  emotionTags: string[]
  lastVisit: string
  visitCount: number
}

/* ── 7-locale "欢迎回来" templates ── */

const WELCOME_BACK_TEMPLATES: Record<string, string> = {
  zh: "嘿，很高兴你回来了。上次你说{tag}，这几天感觉好些了吗？",
  en: "Hey, glad you're back. Last time you mentioned {tag} — how have you been feeling?",
  ms: "Hei, gembira anda kembali. Kali terakhir anda menyebut {tag} — bagaimana perasaan anda?",
  ja: "やあ、戻ってきてくれて嬉しいです。前回は{tag}と言っていましたが、その後気分はいかがですか？",
  ko: "안녕하세요, 다시 오신 것을 환영합니다. 지난번에 {tag}에 대해 말씀하셨는데, 요즘은 어떠신가요?",
  th: "ดีใจที่คุณกลับมา ครั้งที่แล้วคุณพูดถึง{tag} ช่วงนี้คุณรู้สึกดีขึ้นไหม?",
  es: "Me alegra verte de nuevo. La última vez mencionaste {tag} — ¿cómo te has sentido?",
}

const TAG_PHRASES: Record<string, Record<string, string>> = {
  stress: { zh: "压力很大", en: "feeling stressed", ms: "tertekan", ja: "ストレスが溜まっている", ko: "스트레스가 많다고", th: "เครียดมาก", es: "mucho estrés" },
  sleep: { zh: "入睡有点难", en: "having trouble sleeping", ms: "sukar tidur", ja: "寝つきが悪い", ko: "잠들기 어렵다고", th: "นอนไม่หลับ", es: "dificultad para dormir" },
  anxiety: { zh: "有些焦虑", en: "feeling anxious", ms: "berasa cemas", ja: "不安を感じている", ko: "불안감을 느낀다고", th: "รู้สึกกังวล", es: "sintiendo ansiedad" },
  lonely: { zh: "感到孤独", en: "feeling lonely", ms: "berasa sunyi", ja: "孤独を感じている", ko: "외롭다고 느낀다고", th: "รู้สึกเหงา", es: "sintiendo soledad" },
}

/* ── Emotion extraction & memory ── */

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

function saveMemory(tags: string[]) {
  try {
    const prevRaw = localStorage.getItem("deepcalm-memory")
    const prev: MemoryData = prevRaw ? JSON.parse(prevRaw) : { emotionTags: [], lastVisit: "", visitCount: 0 }
    const merged = [...new Set([...tags, ...prev.emotionTags])].slice(0, 3)
    const memory: MemoryData = {
      emotionTags: merged,
      lastVisit: new Date().toISOString(),
      visitCount: prev.visitCount + 1,
    }
    localStorage.setItem("deepcalm-memory", JSON.stringify(memory))
  } catch { /* silent */ }
}

function loadMemory(): MemoryData | null {
  try {
    const raw = localStorage.getItem("deepcalm-memory")
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

/* ── Main Component ── */

const LISTEN_LABELS: Record<string, string> = {
  zh: "先听我说",
  en: "Just listen",
  ms: "Dengar dahulu",
  ja: "まず話を聞いて",
  ko: "먼저 들어주세요",
  th: "ขอให้ฟังก่อน",
  es: "Solo escúchame",
}

export default function AiCounselor({ initialPrompt, onClose, compact = false }: { initialPrompt?: string; onClose?: () => void; compact?: boolean }) {
  const { tt, locale } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [listenOnly, setListenOnly] = useState(false)
  const [chatUnavailable, setChatUnavailable] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [showShareSuccess, setShowShareSuccess] = useState(false)
  const [returnVisitor, setReturnVisitor] = useState<MemoryData | null>(null)
  const memorySavedRef = useRef(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const shareRef = useRef<HTMLDivElement>(null)
  const initialPromptConsumedRef = useRef(false)

  /** Load memory on mount */
  useEffect(() => {
    const mem = loadMemory()
    if (mem && mem.emotionTags.length > 0) {
      setReturnVisitor(mem)
    }
  }, [])

  /** Auto-scroll */
  useEffect(() => {
    const scroller = messagesEndRef.current?.parentElement
    scroller?.scrollTo({ top: scroller.scrollHeight, behavior: "smooth" })
  }, [messages])

  /* ── Handle Send ── */

  const handleSend = async (textOverride?: string) => {
    const text = (textOverride ?? input).trim()
    if (!text || isAnalyzing) return
    setInput("")
    setChatUnavailable(false)
    setShowWelcome(false)
    setShowShareSuccess(false)

    const userMsg: Message = { role: "user", content: text }
    setMessages((prev) => [...prev, userMsg])
    setIsAnalyzing(true)

    // Save emotion tags on first send
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
        body: JSON.stringify({ text, history: history.slice(-8), locale, listenOnly }),
      })

      if (!res.ok) throw new Error(`API returned ${res.status}`)

      const data = await res.json()
      if (typeof data.content !== "string" || !data.content.trim()) throw new Error("Empty response")
      setMessages((prev) => [...prev, { role: "counselor", content: data.content }])

    } catch {
      setMessages((prev) => prev.slice(0, -1))
      setInput(text)
      setChatUnavailable(true)
      setShowWelcome(messages.length === 0)
    } finally {
      setIsAnalyzing(false)
    }
  }

  /* ── Prefill the selected topic ── */
  useEffect(() => {
    if (initialPrompt && !initialPromptConsumedRef.current) {
      initialPromptConsumedRef.current = true
      setInput(initialPrompt.slice(0, 2000))
      setDrawerOpen(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrompt])

  /* ── Share (existing) ── */

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
          w-full
          ${compact
            ? "h-full min-h-0"
            : drawerOpen
            ? "fixed inset-0 z-50 h-[100dvh] bg-[#132723] [--dc-text:#f4faf6] [--dc-muted:#d6e8df]"
            : "max-w-5xl mx-auto min-h-[28rem] max-h-[85vh]"
          }
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 shrink-0">
          <div className="flex items-center gap-3">
            <MessageCircleHeart className="w-5 h-5 text-dc-accent" />
            <h2 className="text-base sm:text-lg font-semibold text-dc-text">
              {tt("aiCounselor.title")}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {(compact || drawerOpen) && (
              <button
                onClick={() => {
                  setDrawerOpen(false)
                  onClose?.()
                }}
                type="button"
                aria-label={locale === "zh" ? "关闭聊天" : "Close chat"}
                className="p-2 rounded-full hover:bg-dc-accent/10 transition-colors"
              >
                <X className="w-5 h-5 text-dc-muted" />
              </button>
            )}
          </div>
        </div>

        <p className="px-4 pb-3 text-sm text-dc-muted sm:px-6">
          {locale === "zh"
            ? "AI 情绪支持。消息会发送至 AI 服务处理，请勿填写个人身份资料。诊疗请咨询专业人员。"
            : "AI emotional support. Messages are processed by an AI service. Leave out identifying details and seek professional care for diagnosis or treatment."}
        </p>

        {/* Messages Area */}
        <div
          className="min-h-0 flex-1 overflow-y-auto px-4 sm:px-6 pb-2 space-y-4 scrollbar-thin"
          style={{ scrollBehavior: "smooth" }}
        >
          {showWelcome && messages.length === 0 ? (
            <div className={`flex min-h-full flex-col items-center justify-center text-center ${compact ? "space-y-3 py-3" : "space-y-6 py-12"}`}>
              {!compact && <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-[#6c9a8a] bg-[#29473d]">
                <span className="absolute inset-0 rounded-full bg-[#bdebd8] motion-safe:animate-breath-orb-4-7 motion-reduce:hidden" />
                {returnVisitor ? (
                  <Sparkles className="relative h-8 w-8 text-[#bdebd8]" />
                ) : (
                  <Heart className="relative h-8 w-8 text-[#bdebd8]" />
                )}
              </div>}
              <div className="max-w-3xl space-y-3">
                {returnVisitor ? (
                  <>
                    <p className={`font-medium text-dc-text ${compact ? "text-base" : "text-xl sm:text-2xl"}`}>
                      {(() => {
                        const tmpl = WELCOME_BACK_TEMPLATES[locale] || WELCOME_BACK_TEMPLATES.en
                        const tagKey = returnVisitor.emotionTags[0]
                        const phrase = TAG_PHRASES[tagKey]?.[locale] || TAG_PHRASES[tagKey]?.en || tagKey
                        return tmpl.replace("{tag}", phrase)
                      })()}
                    </p>
                    <p className="mx-auto max-w-lg text-base leading-relaxed text-dc-muted">
                      {locale === "zh" ? "今天想聊聊什么？" : locale === "ms" ? "Apa yang anda mahu bincangkan hari ini?" : locale === "ja" ? "今日は何について話しますか？" : locale === "ko" ? "오늘은 무엇에 대해 이야기하고 싶으신가요?" : locale === "th" ? "วันนี้คุณอยากคุยเรื่องอะไร?" : locale === "es" ? "¿De qué te gustaría hablar hoy?" : "What would you like to talk about today?"}
                    </p>
                  </>
                ) : (
                  <>
                    <p className={`font-medium text-dc-text ${compact ? "text-base" : "text-xl sm:text-2xl"}`}>
                      {tt("aiCounselor.welcome")}
                    </p>
                    <p className="mx-auto max-w-lg text-base leading-relaxed text-dc-muted sm:text-lg">
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
                      if (!compact) setDrawerOpen(true)
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
                      text-base leading-[1.75]
                      ${
                        msg.role === "user"
                          ? "bg-dc-accent/15 border border-dc-accent/20 text-dc-text rounded-2xl rounded-br-md"
                          : "border border-[#53746b] bg-[#203b33] text-dc-text [--dc-text:#f4faf6] [--dc-muted:#d6e8df] rounded-2xl rounded-bl-md"
                      }
                    `}
                  >
                    <div className="space-y-3">
                      {msg.content.split(/\n[\t ]*\n+/).map((paragraph, index) => (
                        <p key={index} className="whitespace-pre-wrap break-words">{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              {isAnalyzing && (
                <div className="flex justify-start animate-fade-in-glow">
                  <div className="rounded-2xl rounded-bl-md border border-[#53746b] bg-[#203b33] px-5 py-4 [--dc-muted:#d6e8df]">
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

        {/* Share actions */}
        {!showWelcome && lastCounselorMsg && (
          <div className="px-4 sm:px-6 pb-1 shrink-0">
            <div className="flex items-center gap-2 justify-center flex-wrap">
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

        {chatUnavailable && (
          <p role="status" className="px-4 text-sm text-dc-muted sm:px-6">
            {locale === "zh" ? "AI 暂时无法连接。你的文字已保留，可以稍后重试。" : "AI is temporarily unavailable. Your text is still here. Please try again shortly."}
          </p>
        )}

        {/* Input Area */}
        <div className="shrink-0 px-4 sm:px-6 py-4 sm:py-5">
          <button
            type="button"
            aria-pressed={listenOnly}
            disabled={isAnalyzing}
            onClick={() => setListenOnly((enabled) => !enabled)}
            className={`mb-2 min-h-10 rounded-full border px-4 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bdebd8] disabled:cursor-wait ${listenOnly ? "border-[#bdebd8] bg-[#bdebd8] text-[#132723]" : "border-[#719486] bg-[#203b33] text-[#f4faf6] hover:bg-[#29473d]"}`}
          >
            {LISTEN_LABELS[locale] ?? LISTEN_LABELS.en}
          </button>
          <div className="flex items-center gap-2 sm:gap-3 bg-[#172e28] border border-[#53746b] rounded-2xl px-4 sm:px-6 py-3 sm:py-4 focus-within:border-[#bdebd8] transition-all duration-300">
            <input
              type="text"
              value={input}
              maxLength={2000}
              disabled={isAnalyzing}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.nativeEvent.isComposing) void handleSend()
              }}
              placeholder={tt("aiCounselor.placeholder")}
              className="min-w-0 flex-1 bg-transparent text-base text-[#f4faf6] placeholder:text-[#c5dbd1] outline-none sm:text-xl"
              onClick={compact ? undefined : () => setDrawerOpen(true)}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isAnalyzing}
              className="px-4 sm:px-5 py-2.5 rounded-xl bg-dc-accent text-dc-deep text-sm sm:text-base font-medium disabled:cursor-not-allowed disabled:bg-[#35534a] disabled:text-[#dbe9e2] enabled:hover:bg-dc-accent/90 transition-colors shrink-0"
            >
              {tt("aiCounselor.submit")}
            </button>
          </div>
        </div>
      </div>

      {/* Share Poster (hidden) */}
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
