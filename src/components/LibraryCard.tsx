"use client"

import type { Locale } from "@/types"
import Link from "next/link"
import { motion } from "framer-motion"
import { Sparkles, BookOpen } from "lucide-react"

const categoryIcon: Record<string, string> = {
  sleep: "🌙", anxiety: "🫀", grief_loss: "💧", loneliness: "🌊",
  self_worth: "✨", relationships: "💞", identity: "🎭",
  mindfulness: "🧘", emotional_health: "💪",
}

const CATEGORY_NAMES: Record<string, Record<Locale, string>> = {
  sleep: { zh: "睡眠", en: "Sleep", ms: "Tidur", ja: "睡眠", ko: "수면", th: "การนอนหลับ", es: "Sueño" },
  anxiety: { zh: "焦虑", en: "Anxiety", ms: "Kebimbangan", ja: "不安", ko: "불안", th: "ความกังวล", es: "Ansiedad" },
  grief_loss: { zh: "哀伤与失落", en: "Grief & Loss", ms: "Kesedihan & Kehilangan", ja: "悲しみと喪失", ko: "슬픔과 상실", th: "ความเศร้าและการสูญเสีย", es: "Duelo y Pérdida" },
  loneliness: { zh: "孤独", en: "Loneliness", ms: "Kesunyian", ja: "孤独", ko: "외로움", th: "ความเหงา", es: "Soledad" },
  self_worth: { zh: "自我价值", en: "Self-Worth", ms: "Harga Diri", ja: "自己価値", ko: "자존감", th: "คุณค่าในตนเอง", es: "Autoestima" },
  relationships: { zh: "人际关系", en: "Relationships", ms: "Hubungan", ja: "人間関係", ko: "관계", th: "ความสัมพันธ์", es: "Relaciones" },
  identity: { zh: "身份认同", en: "Identity", ms: "Identiti", ja: "アイデンティティ", ko: "정체성", th: "อัตลักษณ์", es: "Identidad" },
  mindfulness: { zh: "正念", en: "Mindfulness", ms: "Kesedaran", ja: "マインドフルネス", ko: "마음챙김", th: "การมีสติ", es: "Atención Plena" },
  emotional_health: { zh: "情绪健康", en: "Emotional Health", ms: "Kesihatan Emosi", ja: "感情的健康", ko: "정서 건강", th: "สุขภาพทางอารมณ์", es: "Salud Emocional" },
}

interface LibraryCardProps {
  slug: string
  title: string
  hook?: string
  description: string
  category: string
  locale: Locale
  onStartMeditation?: (slug: string, emotion: string) => void
}

const READ_LABEL: Record<Locale, string> = {
  zh: "阅读全文", en: "Read", ms: "Baca", ja: "読む", ko: "읽기", th: "อ่าน", es: "Leer",
}

const MEDITATION_LABEL: Record<Locale, string> = {
  zh: "开始 AI 冥想", en: "Start AI Meditation", ms: "Mulai Meditasi AI", ja: "AI瞑想を開始", ko: "AI 명상 시작", th: "เริ่มทำสมาธิ AI", es: "Iniciar Meditación AI",
}

export default function LibraryCard({ slug, title, hook, description, category, locale, onStartMeditation }: LibraryCardProps) {
  const icon = categoryIcon[category] || "📖"
  const catName = CATEGORY_NAMES[category]?.[locale] || category
  const displayTitle = hook || title

  const handleMeditation = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onStartMeditation?.(slug, displayTitle)
  }

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.15}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className="shrink-0 w-[300px]"
    >
      <Link href={`/${locale}/library/${slug}`} className="group block h-full">
        <div
          className="relative h-full p-6 sm:p-7 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl
            hover:border-white/20 transition-all duration-300 overflow-hidden flex flex-col"
        >
          {/* Category badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">{icon}</span>
            <span className="text-[10px] font-medium text-nord-accent uppercase tracking-widest">
              {catName}
            </span>
          </div>

          {/* Hook / Title */}
          <h3 className="text-base font-bold text-nord-text mb-2 leading-snug">
            {displayTitle}
          </h3>

          {/* Description */}
          <p className="text-sm text-nord-text/50 leading-relaxed line-clamp-3 flex-1">
            {description}
          </p>

          {/* Explore link indicator */}
          <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-nord-accent/70 group-hover:text-nord-accent transition-colors">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{READ_LABEL[locale] || READ_LABEL.en}</span>
          </div>

          {/* AI Meditation trigger */}
          {onStartMeditation && (
            <button
              onClick={handleMeditation}
              className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2.5
                bg-gradient-to-r from-nord-accent/20 to-nord-accent/10
                hover:from-nord-accent/30 hover:to-nord-accent/20
                border border-nord-accent/20 hover:border-nord-accent/40
                rounded-xl text-xs font-medium text-nord-accent
                transition-all duration-300"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{MEDITATION_LABEL[locale] || MEDITATION_LABEL.en}</span>
            </button>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
