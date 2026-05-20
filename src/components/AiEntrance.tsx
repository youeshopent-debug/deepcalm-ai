import Link from "next/link"
import { MessageCircle } from "lucide-react"

interface AiEntranceProps {
  locale: string
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

export default function AiEntrance({ locale }: AiEntranceProps) {
  const label = LABELS[locale] || LABELS.en

  return (
    <Link
      href={`/${locale}`}
      className="block mt-12 p-6 bg-gradient-to-br from-nord-accent/[0.08] to-nord-card
        border border-nord-accent/20 rounded-2xl hover:border-nord-accent/40
        transition-all duration-300 group"
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-nord-accent/10 flex items-center justify-center shrink-0
          group-hover:bg-nord-accent/20 transition-colors">
          <MessageCircle className="w-5 h-5 text-nord-accent" />
        </div>
        <div>
          <p className="text-nord-text font-medium text-sm">{label}</p>
          <p className="text-nord-text/40 text-xs mt-0.5">
            {locale === "zh" ? "基于 CBT 与正念训练，24/7 倾听你的声音" : "Based on CBT & mindfulness, available 24/7"}
          </p>
        </div>
      </div>
    </Link>
  )
}
