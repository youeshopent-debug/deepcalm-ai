"use client"

import type { Locale } from "@/types"
import Link from "next/link"
import { motion } from "framer-motion"
import { Sparkles, BookOpen, ArrowRight } from "lucide-react"

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

/** 每个类别的渐变背景 — 从深到浅的径向渐变，确保文字可读 */
const CATEGORY_GRADIENTS: Record<string, string> = {
  sleep: "bg-gradient-to-br from-indigo-600/20 via-indigo-500/5 to-purple-600/10",
  anxiety: "bg-gradient-to-br from-rose-600/20 via-rose-500/5 to-orange-600/10",
  grief_loss: "bg-gradient-to-br from-slate-600/20 via-zinc-500/5 to-zinc-600/10",
  loneliness: "bg-gradient-to-br from-sky-600/20 via-sky-500/5 to-teal-600/10",
  self_worth: "bg-gradient-to-br from-emerald-600/20 via-emerald-500/5 to-teal-600/10",
  relationships: "bg-gradient-to-br from-pink-600/20 via-pink-500/5 to-rose-600/10",
  identity: "bg-gradient-to-br from-violet-600/20 via-violet-500/5 to-blue-600/10",
  mindfulness: "bg-gradient-to-br from-amber-600/20 via-amber-500/5 to-yellow-600/10",
  emotional_health: "bg-gradient-to-br from-red-600/20 via-red-500/5 to-rose-600/10",
}

/** 每个类别的 glow 色值用于按钮和装饰 */
const CATEGORY_GLOW: Record<string, string> = {
  sleep: "indigo-400", anxiety: "rose-400", grief_loss: "slate-400",
  loneliness: "sky-400", self_worth: "emerald-400", relationships: "pink-400",
  identity: "violet-400", mindfulness: "amber-400", emotional_health: "red-400",
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
  zh: "阅读全文", en: "Read Full Article", ms: "Baca Penuh", ja: "全文を読む", ko: "전문 읽기", th: "อ่านเต็ม", es: "Leer Artículo",
}

const MEDITATION_LABEL: Record<Locale, string> = {
  zh: "开始 5 分钟 AI 冥想", en: "Start 5-min AI Meditation", ms: "Mulai Meditasi AI 5 Minit", ja: "5分のAI瞑想を開始",
  ko: "5분 AI 명상 시작", th: "เริ่มทำสมาธิ AI 5 นาที", es: "Iniciar Meditación AI de 5 Min",
}

export default function LibraryCard({ slug, title, hook, description, category, locale, onStartMeditation }: LibraryCardProps) {
  const icon = categoryIcon[category] || "📖"
  const catName = CATEGORY_NAMES[category]?.[locale] || category
  const gradient = CATEGORY_GRADIENTS[category] || "bg-gradient-to-br from-nord-accent/20 to-nord-accent/5"
  const glow = CATEGORY_GLOW[category] || "nord-accent"
  const displayTitle = hook || title

  const handleMeditation = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onStartMeditation?.(slug, displayTitle)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group"
    >
      <Link href={`/${locale}/library/${slug}`} className="block h-full">
        <div
          className={`relative h-full rounded-2xl overflow-hidden ${gradient}
            border border-white/10 hover:border-white/20
            transition-all duration-500 ease-out
            hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]
            flex flex-col`}
        >
          {/* 顶部装饰光晕 */}
          <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-${glow}/10 blur-3xl pointer-events-none`} />
          <div className={`absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-${glow}/5 blur-2xl pointer-events-none`} />

          {/* 图标与类目标签 */}
          <div className="relative z-10 p-5 pb-3">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{icon}</span>
              <span className="text-[10px] font-semibold text-nord-accent uppercase tracking-[0.2em]">
                {catName}
              </span>
            </div>

            {/* 标题 */}
            <h3 className="text-base font-bold text-nord-text leading-snug mb-2 line-clamp-2">
              {displayTitle}
            </h3>

            {/* 描述 */}
            <p className="text-sm text-nord-text/50 leading-relaxed line-clamp-3">
              {description}
            </p>
          </div>

          {/* 底部操作区 — 始终保持底部对齐 */}
          <div className="relative z-10 mt-auto p-5 pt-3 space-y-2.5">
            {/* 巨幕 CTA — AI 冥想按钮 */}
            {onStartMeditation && (
              <button
                onClick={handleMeditation}
                className={`w-full flex items-center justify-center gap-2 px-4 py-3
                  bg-gradient-to-r from-nord-accent to-nord-accent/80
                  hover:from-nord-accent/90 hover:to-nord-accent/70
                  text-white text-sm font-semibold
                  rounded-xl shadow-lg shadow-nord-accent/20
                  hover:shadow-xl hover:shadow-nord-accent/30
                  hover:scale-[1.02] active:scale-[0.98]
                  transition-all duration-300 ease-out`}
              >
                <Sparkles className="w-4 h-4" />
                <span>{MEDITATION_LABEL[locale] || MEDITATION_LABEL.en}</span>
              </button>
            )}

            {/* 阅读入口 — 次要操作 */}
            <div className="flex items-center justify-between text-xs text-nord-text/40 group-hover:text-nord-text/60 transition-colors duration-300 px-1">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                {READ_LABEL[locale] || READ_LABEL.en}
              </span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
