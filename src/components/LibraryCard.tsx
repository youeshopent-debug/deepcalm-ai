import type { Locale } from "@/types"
import Link from "next/link"
import { ArrowRight, BookOpen } from "lucide-react"

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

const gradientByCategory: Record<string, string> = {
  sleep: "from-indigo-500/10 to-purple-500/10",
  anxiety: "from-rose-500/10 to-orange-500/10",
  grief_loss: "from-slate-500/10 to-zinc-500/10",
  loneliness: "from-sky-500/10 to-teal-500/10",
  self_worth: "from-emerald-500/10 to-teal-500/10",
  relationships: "from-pink-500/10 to-rose-500/10",
  identity: "from-violet-500/10 to-blue-500/10",
  mindfulness: "from-amber-500/10 to-yellow-500/10",
  emotional_health: "from-red-500/10 to-rose-500/10",
}

interface LibraryCardProps {
  slug: string
  title: string
  description: string
  category: string
  locale: Locale
}

export default function LibraryCard({ slug, title, description, category, locale }: LibraryCardProps) {
  const gradient = gradientByCategory[category] || "from-nord-accent/10 to-nord-accent/5"
  const icon = categoryIcon[category] || "📖"
  const catName = CATEGORY_NAMES[category]?.[locale] || category

  return (
    <Link href={`/${locale}/library/${slug}`} className="group block">
      <div className={`relative h-full p-6 sm:p-7 bg-nord-card border border-nord-border/20 rounded-2xl
        hover:border-nord-accent/30 transition-all duration-300
        hover:shadow-[0_0_30px_-6px_rgba(94,129,172,0.15)]
        before:absolute before:inset-0 before:bg-gradient-to-b ${gradient}
        before:rounded-2xl before:opacity-0 before:transition-opacity before:duration-300
        hover:before:opacity-100 overflow-hidden`}>
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">{icon}</span>
            <span className="text-[10px] font-medium text-nord-accent uppercase tracking-widest">
              {catName}
            </span>
          </div>
          <h3 className="text-base font-bold text-nord-text mb-2 group-hover:text-nord-accent transition-colors leading-snug">
            {title}
          </h3>
          <p className="text-sm text-nord-text/50 leading-relaxed line-clamp-3 flex-1">
            {description}
          </p>
          <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-nord-accent/70 group-hover:text-nord-accent transition-colors">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Explore</span>
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </Link>
  )
}
