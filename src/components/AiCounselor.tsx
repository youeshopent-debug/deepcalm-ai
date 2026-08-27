"use client"

import { useLanguage } from "@/context/LanguageContext"
import { mockChatReply } from "@/lib/mockCounselor"
import { toPng } from "html-to-image"
import {
  Heart,
  ImageDown,
  MessageCircleHeart,
  Sparkles,
  X,
  Brain,
  Play,
  FileText,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"
import {
  buildDiagnosisPayload,
  parseStructuredResponse,
  detectAcuteAnxiety,
  generateDiagnosisReport,
} from "@/lib/counselor/diagnosisEngine"
import type {
  ParsedResponse,
  DiagnosisReport,
  AcuteAnxietyResult,
} from "@/lib/counselor/diagnosisEngine"
import { saveDiagnosisReport } from "@/lib/meditationHistory"
import MeditationController from "./MeditationController"

/* ── Types ── */

interface Message {
  role: "user" | "counselor"
  content: string
  parsed?: ParsedResponse       // 3-part structured rendering data
}

interface UsageInfo {
  model: string
  inputTokens: number
  outputTokens: number
  cost: number
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

/* ── Structured message bubble renderer ── */

function StructuredMessage({ parsed, raw }: { parsed: ParsedResponse; raw: string }) {
  const hasAnalysis = parsed.analysis.length > 0
  const hasScience = parsed.scienceAlignment.length > 0
  const hasAction = parsed.actionPlan.length > 0

  // If no sections were parsed, render raw text
  if (!hasAnalysis && !hasScience && !hasAction) {
    return <p className="text-xl leading-relaxed whitespace-pre-wrap">{raw}</p>
  }

  return (
    <div className="space-y-3">
      {hasAnalysis && (
        <div className="border-l-4 border-blue-400/50 pl-3 py-1">
          <p className="text-[10px] uppercase tracking-widest text-blue-400/70 font-semibold mb-1">现状解析</p>
          <p className="text-xl leading-relaxed text-dc-text/90">{parsed.analysis}</p>
        </div>
      )}
      {hasScience && (
        <div className="border-l-4 border-emerald-400/50 pl-3 py-1">
          <p className="text-[10px] uppercase tracking-widest text-emerald-400/70 font-semibold mb-1">科学原理对齐</p>
          <p className="text-sm leading-relaxed text-dc-muted/80">{parsed.scienceAlignment}</p>
        </div>
      )}
      {hasAction && (
        <div className="border-l-4 border-amber-400/50 pl-3 py-1">
          <p className="text-[10px] uppercase tracking-widest text-amber-400/70 font-semibold mb-1">即时行动方案</p>
          <p className="text-sm leading-relaxed text-dc-text/90">{parsed.actionPlan}</p>
        </div>
      )}
    </div>
  )
}

/* ── Diagnosis Report Card ── */

function DiagnosisReportCard({
  report,
  onClose,
  locale,
}: {
  report: DiagnosisReport
  onClose: () => void
  locale: string
}) {
  const anxietyColor = report.anxietyIndex >= 70 ? "text-red-400" : report.anxietyIndex >= 40 ? "text-amber-400" : "text-emerald-400"
  const sleepColor = report.sleepQuality >= 70 ? "text-emerald-400" : report.sleepQuality >= 40 ? "text-amber-400" : "text-red-400"

  const patternLabel = (locale === "zh" ? "检测到认知扭曲" : "Cognitive Patterns Detected")
  const anxietyLabel = (locale === "zh" ? "焦虑指数" : "Anxiety Index")
  const sleepLabel = (locale === "zh" ? "睡眠质量" : "Sleep Quality")
  const summaryLabel = (locale === "zh" ? "诊断摘要" : "Diagnosis Summary")
  const roundLabel = (locale === "zh" ? "对话轮次" : "Dialogue Rounds")
  const closeLabel = (locale === "zh" ? "关闭报告" : "Close Report")

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in-glow" onClick={onClose}>
      <div
        className="relative w-[90vw] max-w-md max-h-[80vh] overflow-y-auto bg-dc-surface/95 backdrop-blur-xl border border-dc-border rounded-3xl p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-dc-accent" />
            <h3 className="text-base font-semibold text-dc-text">{locale === "zh" ? "诊断报告" : "Diagnosis Report"}</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-dc-accent/10 transition-colors">
            <X className="w-4 h-4 text-dc-muted" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Anxiety Index */}
          <div className="bg-dc-deep/40 rounded-xl p-4">
            <p className="text-xs text-dc-muted/60 mb-2">{anxietyLabel}</p>
            <div className="flex items-center gap-3">
              <span className={`text-2xl font-bold ${anxietyColor}`}>{report.anxietyIndex}</span>
              <span className="text-xs text-dc-muted/40">/ 100</span>
              <div className="flex-1 h-2 bg-dc-deep/60 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${report.anxietyIndex >= 70 ? "bg-red-400" : report.anxietyIndex >= 40 ? "bg-amber-400" : "bg-emerald-400"}`}
                  style={{ width: `${report.anxietyIndex}%` }}
                />
              </div>
            </div>
          </div>

          {/* Sleep Quality */}
          <div className="bg-dc-deep/40 rounded-xl p-4">
            <p className="text-xs text-dc-muted/60 mb-2">{sleepLabel}</p>
            <div className="flex items-center gap-3">
              <span className={`text-2xl font-bold ${sleepColor}`}>{report.sleepQuality}</span>
              <span className="text-xs text-dc-muted/40">/ 100</span>
              <div className="flex-1 h-2 bg-dc-deep/60 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${report.sleepQuality >= 70 ? "bg-emerald-400" : report.sleepQuality >= 40 ? "bg-amber-400" : "bg-red-400"}`}
                  style={{ width: `${report.sleepQuality}%` }}
                />
              </div>
            </div>
          </div>

          {/* Cognitive Patterns */}
          {report.cognitivePatterns.length > 0 && (
            <div className="bg-dc-deep/40 rounded-xl p-4">
              <p className="text-xs text-dc-muted/60 mb-2">{patternLabel}: {report.cognitivePatterns.length}</p>
              <div className="flex flex-wrap gap-1.5">
                {report.cognitivePatterns.map((p, i) => (
                  <span key={i} className="px-2 py-0.5 text-[10px] bg-dc-accent/10 text-dc-accent/80 rounded-full">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Summary */}
          <div className="bg-dc-deep/40 rounded-xl p-4">
            <p className="text-xs text-dc-muted/60 mb-1">{summaryLabel}</p>
            <p className="text-sm text-dc-text/80 leading-relaxed">{report.summary}</p>
          </div>

          {/* Footer info */}
          <div className="flex justify-between text-[10px] text-dc-muted/40">
            <span>{roundLabel}: {report.dialogueRound}</span>
            <span>{new Date(report.date).toLocaleDateString()}</span>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-dc-accent/15 text-dc-accent text-sm font-medium hover:bg-dc-accent/25 transition-colors"
          >
            {closeLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Meditation Prompt Card ── */

function MeditationPromptCard({
  trigger,
  onStart,
  onDismiss,
  locale,
}: {
  trigger: AcuteAnxietyResult
  onStart: () => void
  onDismiss: () => void
  locale: string
}) {
  const title = locale === "zh" ? "检测到焦虑信号" : "Anxiety Detected"
  const desc = trigger.reason
  const actionLabel = locale === "zh" ? "开始冥想引导" : "Start Guided Meditation"
  const dismissLabel = locale === "zh" ? "稍后再说" : "Later"

  return (
    <div className="shrink-0 px-4 sm:px-6 py-2 animate-fade-in-glow">
      <div className="bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-transparent border border-amber-500/20 rounded-2xl px-4 sm:px-6 py-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
            <Brain className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-amber-300 mb-1">{title}</p>
            <p className="text-xs text-dc-muted/70 leading-relaxed mb-3">{desc}</p>
            <div className="flex items-center gap-2">
              <button
                onClick={onStart}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 text-xs font-medium hover:bg-amber-500/30 transition-colors"
              >
                <Play className="w-3 h-3" />
                {actionLabel}
              </button>
              <button
                onClick={onDismiss}
                className="px-3 py-1.5 rounded-lg text-dc-muted/50 text-xs hover:text-dc-muted/80 transition-colors"
              >
                {dismissLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Main Component ── */

export default function AiCounselor({ initialPrompt, onClose }: { initialPrompt?: string; onClose?: () => void }) {
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
  const initialPromptConsumedRef = useRef(false)

  // ── P0/P1 New State ──
  const [dialogueRound, setDialogueRound] = useState(1)
  const [showMeditationPrompt, setShowMeditationPrompt] = useState(false)
  const [meditationTrigger, setMeditationTrigger] = useState<AcuteAnxietyResult | null>(null)
  const [showMeditation, setShowMeditation] = useState(false)
  const [diagnosisReport, setDiagnosisReport] = useState<DiagnosisReport | null>(null)
  const [showReportCard, setShowReportCard] = useState(false)
  const [lastParsedResponse, setLastParsedResponse] = useState<ParsedResponse | null>(null)

  /** Load memory on mount */
  useEffect(() => {
    const mem = loadMemory()
    if (mem && mem.emotionTags.length > 0) {
      setReturnVisitor(mem)
    }
  }, [])

  /** Auto-scroll */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  /* ── Handle Send (P0: System Prompt Injection + P1: Anxiety Detection) ── */

  const handleSend = async (textOverride?: string) => {
    const text = (textOverride ?? input).trim()
    if (!text || isAnalyzing) return
    setInput("")
    setShowWelcome(false)
    setShowShareSuccess(false)
    // Dismiss meditation prompt on new user message
    setShowMeditationPrompt(false)

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

      // P0: Build enhanced payload with system prompt injection
      const payload = buildDiagnosisPayload(text, history, locale, dialogueRound)

      const res = await fetch("/api/analyze-anxiety", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error(`API returned ${res.status}`)

      const data = await res.json()
      const responseContent = data.content || ""

      // P0: Parse structured 3-part response
      const parsed = parseStructuredResponse(responseContent, locale)
      setLastParsedResponse(parsed)

      const counselorMsg: Message = {
        role: "counselor",
        content: responseContent,
        parsed,
      }
      setMessages((prev) => [...prev, counselorMsg])

      if (data.usage) {
        setLastUsage(data.usage)
        setTotalCost((prev) => prev + (data.usage.cost || 0))
      }

      // P1: Detect acute anxiety → trigger meditation prompt
      const anxietyResult = detectAcuteAnxiety(text, locale)
      if (anxietyResult.isAcute) {
        setMeditationTrigger(anxietyResult)
        setShowMeditationPrompt(true)
      }
    } catch {
      // Fallback: use mock with enhanced 3-part structure
      const fallbackContent = mockChatReply(locale, text)
      const parsedFallback = parseStructuredResponse(fallbackContent, locale)
      const fallbackMsg: Message = {
        role: "counselor",
        content: fallbackContent,
        parsed: parsedFallback,
      }
      setMessages((prev) => [...prev, fallbackMsg])
    }

    // Advance dialogue round
    const nextRound = dialogueRound + 1
    setDialogueRound(nextRound)

    // P1: Generate diagnosis report when entering diagnosis phase (round > 3)
    if (nextRound > 4) {
      const allMessages = [...messages, { role: "user" as const, content: text }]
      const report = generateDiagnosisReport(allMessages, locale, nextRound)
      setDiagnosisReport(report)
      saveDiagnosisReport({
        id: report.id,
        date: report.date,
        anxietyIndex: report.anxietyIndex,
        sleepQuality: report.sleepQuality,
        cognitivePatterns: report.cognitivePatterns,
        dialogueRound: report.dialogueRound,
        summary: report.summary,
        locale: report.locale,
      })
    }

    setIsAnalyzing(false)
  }

  /* ── Auto-consume initialPrompt (topic-context injection) ── */
  useEffect(() => {
    if (initialPrompt && !initialPromptConsumedRef.current) {
      initialPromptConsumedRef.current = true
      setShowWelcome(false)
      setDrawerOpen(true)
      handleSend(initialPrompt)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrompt])

  /* ── Decompose (existing) ── */

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
      // Silent fail
    }
    setIsDecomposing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

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

  /* ── Meditation Trigger Handlers ── */

  const handleStartMeditation = () => {
    setShowMeditation(true)
    setShowMeditationPrompt(false)
  }

  const handleDismissMeditation = () => {
    setShowMeditationPrompt(false)
    setMeditationTrigger(null)
  }

  const handleCloseMeditation = () => {
    setShowMeditation(false)
  }

  /* ── Diagnosis Report Handlers ── */

  const handleShowReport = () => {
    if (diagnosisReport) {
      setShowReportCard(true)
    }
  }

  const handleCloseReport = () => {
    setShowReportCard(false)
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
        {/* Header */}
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
                onClick={() => {
                  setDrawerOpen(false)
                  onClose?.()
                }}
                className="p-2 rounded-full hover:bg-dc-accent/10 transition-colors"
              >
                <X className="w-5 h-5 text-dc-muted" />
              </button>
            )}
          </div>
        </div>

        {/* Messages Area */}
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
                    {/* P0: Render 3-part structure if available */}
                    {msg.role === "counselor" && msg.parsed ? (
                      <StructuredMessage parsed={msg.parsed} raw={msg.content} />
                    ) : (
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    )}
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

        {/* Action Buttons Row (Share + Diagnosis Report + Round indicator) */}
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

              {/* P1: Diagnosis Report Button */}
              {diagnosisReport && (
                <button
                  onClick={handleShowReport}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-dc-muted hover:text-emerald-400 bg-dc-surface/40 hover:bg-emerald-500/10 rounded-full transition-all duration-300"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{locale === "zh" ? "诊断报告" : "Diagnosis"}</span>
                </button>
              )}

              {/* P0: Round Indicator */}
              <span className="text-[10px] text-dc-muted/30 px-2">
                {locale === "zh" ? `第${dialogueRound}轮` : `R${dialogueRound}`}
              </span>

              {showShareSuccess && (
                <span className="text-xs text-emerald-400 animate-fade-in-glow">
                  ✅ {tt("common.healPosterSaved")}
                </span>
              )}
            </div>
          </div>
        )}

        {/* P1: Meditation Prompt Card */}
        {showMeditationPrompt && meditationTrigger && !showMeditation && (
          <MeditationPromptCard
            trigger={meditationTrigger}
            onStart={handleStartMeditation}
            onDismiss={handleDismissMeditation}
            locale={locale}
          />
        )}

        {/* P1: Meditation Controller (overlay) */}
        {showMeditation && (
          <div className="fixed inset-0 z-50">
            <MeditationController
              onClose={handleCloseMeditation}
              initialEmotion={meditationTrigger?.emotion ?? "anxiety"}
            />
          </div>
        )}

        {/* Existing Decompose Card */}
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

        {/* Input Area */}
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
              onClick={() => handleSend()}
              disabled={!input.trim() || isAnalyzing}
              className="px-4 sm:px-5 py-2.5 rounded-xl bg-dc-accent text-dc-deep text-sm sm:text-base font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-dc-accent/90 transition-all duration-300 shrink-0"
            >
              {tt("aiCounselor.submit")}
            </button>
          </div>
        </div>
      </div>

      {/* P1: Diagnosis Report Modal */}
      {showReportCard && diagnosisReport && (
        <DiagnosisReportCard
          report={diagnosisReport}
          onClose={handleCloseReport}
          locale={locale}
        />
      )}

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
