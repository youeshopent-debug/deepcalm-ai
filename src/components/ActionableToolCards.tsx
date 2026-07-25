"use client"

import type { Locale } from "@/types"
import { Brain, Heart, Moon } from "lucide-react"

interface CardDef {
  icon: React.ReactNode
  title: Record<Locale, string>
  hook: Record<Locale, string>
  badge: string
  badgeStyle: string
  href?: string
  action?: "breathing" | "anchor"
  anchor?: string
}

const CARDS: CardDef[] = [
  {
    icon: <Moon className="w-5 h-5" />,
    title: {
      zh: "7天睡眠重塑计划",
      en: "7-Day Sleep Reboot",
      ms: "Program Sleep 7 Hari",
      ja: "7日間睡眠再構築",
      ko: "7일 수면 재구축",
      th: "แผนปรับการนอน 7 วัน",
      es: "Reinicio de Sueño en 7 Días",
    },
    hook: {
      zh: "基于 CBT-I 临床干预，从根本上缩短入睡时间",
      en: "Clinically backed CBT-I protocol to shorten sleep onset",
      ms: "Intervensi CBT-I untuk memendekkan masa tidur",
      ja: "CBT-I に基づく臨床的アプローチで入眠時間を短縮",
      ko: "CBT-I 기반 임상 프로토콜로 입면 시간 단축",
      th: "โปรโตคอล CBT-I ทางคลินิกเพื่อลดเวลาในการหลับ",
      es: "Protocolo CBT-I para acortar el tiempo de conciliación del sueño",
    },
    badge: "🛡️ CBT-I 导向",
    badgeStyle: "bg-indigo-500/15 text-indigo-400 border-indigo-500/20",
    href: "/{locale}/library/cbt-i-7day-plan",
  },
  {
    icon: <Heart className="w-5 h-5" />,
    title: {
      zh: "焦虑自测与 1 分钟解压",
      en: "GAD-7 & Rapid Relief",
      ms: "Ujian Kebimbangan & Relaksasi",
      ja: "不安セルフチェック＆1分緩和",
      ko: "불안 자가진단 & 1분 완화",
      th: "แบบประเมินความกังวล & ผ่อนคลายด่วน",
      es: "Autoevaluación de Ansiedad & Alivio Rápido",
    },
    hook: {
      zh: "快速识别情绪状态，获取即时呼吸引导",
      en: "Quickly assess your mood and get instant breathing guidance",
      ms: "Kenali emosi anda dan dapatkan panduan pernafasan segera",
      ja: "感情状態を素早く把握し、呼吸ガイドを即座に取得",
      ko: "감정 상태를 빠르게 파악하고 즉시 호흡 가이드 받기",
      th: "ประเมินอารมณ์ของคุณอย่างรวดเร็วและรับคำแนะนำการหายใจทันที",
      es: "Evalúa tu estado de ánimo y obtén guía de respiración al instante",
    },
    badge: "✅ 专家验证",
    badgeStyle: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    action: "breathing",
  },
  {
    icon: <Brain className="w-5 h-5" />,
    title: {
      zh: "REM 周期优化指南",
      en: "REM Optimization",
      ms: "Pengoptimuman REM",
      ja: "レム睡眠最適化",
      ko: "렘 수면 최적화",
      th: "การปรับปรุงการนอน REM",
      es: "Optimización del Sueño REM",
    },
    hook: {
      zh: "理解 90 分钟周期，让大脑进行高质量的情绪整理",
      en: "Master the 90-min cycle for high-quality emotional processing",
      ms: "Fahami kitaran 90 minit untuk pemprosesan emosi berkualiti",
      ja: "90分周期を理解し、脳の高品質な感情整理を促進",
      ko: "90분 주기를 이해하고 뇌의 고품질 감정 정리 촉진",
      th: "เข้าใจวงจร 90 นาทีเพื่อการประมวลผลอารมณ์ที่มีคุณภาพ",
      es: "Domina el ciclo de 90 min para un procesamiento emocional de calidad",
    },
    badge: "🛡️ CBT-I 导向",
    badgeStyle: "bg-indigo-500/15 text-indigo-400 border-indigo-500/20",
    action: "anchor",
    anchor: "healing-toolbox",
  },
]

/** Card-specific CTA text (action-oriented, per card) */
const CTA_TEXT: Record<number, Record<Locale, string>> = {
  0: {
    zh: "开始计划",
    en: "Start Plan",
    ms: "Mulakan Rancangan",
    ja: "計画を開始",
    ko: "계획 시작",
    th: "เริ่มแผน",
    es: "Iniciar Plan",
  },
  1: {
    zh: "开始练习",
    en: "Start Practice",
    ms: "Mulakan Latihan",
    ja: "練習を開始",
    ko: "연습 시작",
    th: "เริ่มฝึก",
    es: "Iniciar Práctica",
  },
  2: {
    zh: "前往工具箱",
    en: "Go to Toolbox",
    ms: "Pergi ke Alatan",
    ja: "ツールボックスへ",
    ko: "도구함으로",
    th: "ไปยังกล่องเครื่องมือ",
    es: "Ir a la Caja de Herramientas",
  },
}

const CARD_ICON_WRAPPERS = [
  "bg-indigo-500/10 text-indigo-400",
  "bg-rose-500/10 text-rose-400",
  "bg-amber-500/10 text-amber-400",
]

export default function ActionableToolCards({
  locale,
  onStartBreathing,
}: {
  locale: Locale
  onStartBreathing?: () => void
}) {
  const handleCardClick = (card: CardDef) => {
    if (card.action === "breathing" && onStartBreathing) {
      onStartBreathing()
      return
    }
    if (card.action === "anchor" && card.anchor) {
      const el = document.getElementById(card.anchor)
      if (el) el.scrollIntoView({ behavior: "smooth" })
      return
    }
    // default: navigate via link
  }

  return (
    <section className="relative z-10 w-full px-4 sm:px-6 pb-6">
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {CARDS.map((card, i) => {
            const title = card.title[locale] || card.title.en
            const hook = card.hook[locale] || card.hook.en
            const iconWrapperStyle = CARD_ICON_WRAPPERS[i] || CARD_ICON_WRAPPERS[0]
            const ctaText = CTA_TEXT[i]?.[locale] || CTA_TEXT[i]?.en || ""

            const isLink = !!card.href
            const isButton = card.action === "breathing" || card.action === "anchor"

            const sharedClasses =
              "relative flex flex-col p-4 sm:p-5 rounded-2xl glass border border-dc-border/40 backdrop-blur-xl " +
              "hover:border-dc-accent/25 hover:bg-dc-accent/[0.03] transition-all duration-300 group cursor-pointer"

            const inner = (
              <>
                {/* E-E-A-T Badge */}
                <span
                  className={`absolute top-3 right-3 text-[10px] font-medium px-2 py-0.5 rounded-full border ${card.badgeStyle}`}
                >
                  {card.badge}
                </span>

                {/* Icon */}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mb-3 ${iconWrapperStyle} group-hover:scale-110 transition-transform duration-300`}
                >
                  {card.icon}
                </div>

                {/* Title */}
                <h3 className="text-sm font-semibold text-dc-text mb-1.5 leading-snug">{title}</h3>

                {/* Hook */}
                <p className="text-xs text-dc-muted/70 leading-relaxed flex-1">{hook}</p>

                {/* CTA Pill */}
                <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border bg-dc-accent/15 text-dc-accent border-dc-accent/20 group-hover:bg-dc-accent/25 transition-all duration-200">
                  <span>{ctaText}</span>
                  <span className="text-xs group-hover:translate-x-0.5 transition-transform">→</span>
                </div>
              </>
            )

            if (isLink) {
              const href = card.href!.replace("{locale}", locale)
              return (
                <a key={i} href={href} className={sharedClasses}>
                  {inner}
                </a>
              )
            }

            return (
              <button key={i} onClick={() => handleCardClick(card)} className={`${sharedClasses} text-left`}>
                {inner}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
