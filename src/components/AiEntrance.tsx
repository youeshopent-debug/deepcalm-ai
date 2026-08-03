import Link from "next/link"
import { MessageCircle } from "lucide-react"

interface AiEntranceProps {
  locale: string
  /** 话题上下文文案，例如「我想了解失眠的 CBT-I 方案」。点击后随 URL query 传递给 AI 诊断入口。 */
  topicPrompt?: string
}

const LABELS: Record<string, string> = {
  zh: "💬 和 AI 心理补导师聊聊",
  en: "💬 Chat with AI Counselor",
  ms: "💬 Bual dengan Kaunselor AI",
  ja: "💬 AIカウンセラーと話す",
  ko: "💬 AI 상담사와 대화하기",
  th: "💬 พูดคุยกับที่ปรึกษา AI",
  es: "💬 Charlar con Consejero AI",
}

const DIAGNOSE_LABELS: Record<string, string> = {
  zh: "🧠 AI 诊断入口",
  en: "🧠 AI Diagnosis",
  ms: "🧠 Diagnosis AI",
  ja: "🧠 AI診断",
  ko: "🧠 AI 진단",
  th: "🧠 การวินิจฉัย AI",
  es: "🧠 Diagnóstico AI",
}

export default function AiEntrance({ locale, topicPrompt }: AiEntranceProps) {
  const label = LABELS[locale] || LABELS.en
  const diagnoseLabel = DIAGNOSE_LABELS[locale] || DIAGNOSE_LABELS.en

  // 携带话题上下文：跳转首页 AI 诊断区，并通过 query 传递上下文文案
  const href = topicPrompt
    ? `/${locale}#ai-counselor?ai=${encodeURIComponent(topicPrompt)}`
    : `/${locale}#ai-counselor`

  return (
    <Link
      href={href}
      className="block mt-12 p-6 bg-gradient-to-br from-nord-accent/[0.08] to-nord-card
        border border-nord-accent/20 rounded-2xl hover:border-nord-accent/40
        transition-all duration-300 group"
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-nord-accent/10 flex items-center justify-center shrink-0
          group-hover:bg-nord-accent/20 transition-colors">
          <MessageCircle className="w-5 h-5 text-nord-accent" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-nord-text font-medium text-sm">{topicPrompt ? diagnoseLabel : label}</p>
          <p className="text-nord-text/40 text-xs mt-0.5">
            {topicPrompt
              ? (locale === "zh"
                  ? "点击后 AI 将针对该话题给出即时分析"
                  : "AI will analyze this topic instantly")
              : (locale === "zh" ? "基于 CBT 与正念训练，24/7 倾听你的声音" : "Based on CBT & mindfulness, available 24/7")}
          </p>
        </div>
        {topicPrompt && (
          <span className="shrink-0 text-xs text-nord-accent font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            {locale === "zh" ? "开始诊断 →" : "Diagnose →"}
          </span>
        )}
      </div>
    </Link>
  )
}
