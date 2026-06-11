"use client"

import { useEffect, useState } from "react"
import type { Locale } from "@/types"

// ──────────────────────────────────────────────
// 7 级守夜勋章体系
// ──────────────────────────────────────────────

const BADGES = [
  { min: 1,  emoji: "🌙", key: "badge_1" },
  { min: 2,  emoji: "🌘", key: "badge_2" },
  { min: 3,  emoji: "🌗", key: "badge_3" },
  { min: 4,  emoji: "🌖", key: "badge_4" },
  { min: 5,  emoji: "🌕", key: "badge_5" },
  { min: 6,  emoji: "🌕", key: "badge_6" },
  { min: 7,  emoji: "🌕", key: "badge_7" },
] as const

const BADGE_NAMES: Record<string, Record<Locale, string>> = {
  badge_1: {
    zh: "初夜", en: "First Night", ms: "Malam Pertama", ja: "初夜",
    ko: "첫날밤", th: "คืนแรก", es: "Primera Noche",
  },
  badge_2: {
    zh: "再临", en: "Return", ms: "Kembali", ja: "再来",
    ko: "재림", th: "กลับมา", es: "Regreso",
  },
  badge_3: {
    zh: "守望", en: "Watch", ms: "Jaga", ja: "見守り",
    ko: "수호", th: "เฝ้าดู", es: "Vigilia",
  },
  badge_4: {
    zh: "守夜人", en: "Night Watcher", ms: "Penjaga Malam", ja: "夜警",
    ko: "야경꾼", th: "ยามกลางคืน", es: "Vigilante Nocturno",
  },
  badge_5: {
    zh: "夜行者", en: "Night Walker", ms: "Perayap Malam", ja: "夜行者",
    ko: "야행자", th: "นักเดินกลางคืน", es: "Caminante Nocturno",
  },
  badge_6: {
    zh: "午夜领主", en: "Midnight Lord", ms: "Penguasa Tengah Malam", ja: "真夜中の主",
    ko: "자정의 군주", th: "เจ้าแห่งเที่ยงคืน", es: "Señor de la Medianoche",
  },
  badge_7: {
    zh: "守夜宗师", en: "Grandmaster", ms: "Mahaguru", ja: "達人",
    ko: "수면 대가", th: "ปรมาจารย์", es: "Gran Maestro",
  },
}

interface StreakData {
  currentStreak: number
  lastVisitDate: string
  longestStreak: number
}

/** 获取 UTC+8 今天的日期字符串 YYYY-MM-DD */
function getTodayUTC8(): string {
  const now = new Date()
  const utc8 = new Date(now.getTime() + 8 * 60 * 60 * 1000)
  return utc8.toISOString().slice(0, 10)
}

/** 计算昨天日期字符串 YYYY-MM-DD */
function getYesterdayUTC8(today: string): string {
  const d = new Date(today + "T00:00:00+08:00")
  d.setDate(d.getDate() - 1)
  return d.toISOString().slice(0, 10)
}

function loadStreak(): StreakData {
  try {
    const raw = localStorage.getItem("deepcalm-streak")
    return raw
      ? JSON.parse(raw)
      : { currentStreak: 0, lastVisitDate: "", longestStreak: 0 }
  } catch {
    return { currentStreak: 0, lastVisitDate: "", longestStreak: 0 }
  }
}

function saveStreak(data: StreakData) {
  try {
    localStorage.setItem("deepcalm-streak", JSON.stringify(data))
  } catch {
    /* silent */
  }
}

function updateStreak(): StreakData {
  const today = getTodayUTC8()
  const prev = loadStreak()

  if (prev.lastVisitDate === today) return prev

  const yesterday = getYesterdayUTC8(today)
  let newStreak: number

  if (prev.lastVisitDate === yesterday) {
    newStreak = prev.currentStreak + 1
  } else if (prev.lastVisitDate === "") {
    newStreak = 1
  } else {
    newStreak = 1
  }

  const updated: StreakData = {
    currentStreak: newStreak,
    lastVisitDate: today,
    longestStreak: Math.max(prev.longestStreak, newStreak),
  }

  saveStreak(updated)
  return updated
}

/** 7 语种本地化文案 */
function t(locale: Locale, key: "title" | "days" | "congrats"): string {
  const map: Record<string, Record<string, string>> = {
    title: {
      zh: "守夜勋章", en: "Night Vigil Badge", ms: "Lencana Berjaga",
      ja: "夜警バッジ", ko: "수면 배지", th: "ตรายามกลางคืน", es: "Insignia de Vigilia",
    },
    days: {
      zh: "连续 {n} 天", en: "{n}-day streak", ms: "{n} hari berturut-turut",
      ja: "{n}日連続", ko: "{n}일 연속", th: "{n} วันติดต่อกัน", es: "{n} días consecutivos",
    },
    congrats: {
      zh: "恭喜达成「守夜宗师」成就！", en: "Congratulations! Grandmaster achieved!",
      ms: "Tahniah! Anda mencapai Mahaguru!", ja: "おめでとうございます！「達人」達成！",
      ko: "축하합니다! 「수면 대가」 달성!", th: "ยินดีด้วย! คุณบรรลุ «ปรมาจารย์»!",
      es: "¡Felicidades! ¡Has alcanzado el Gran Maestro!",
    },
  }
  return map[key]?.[locale] || map[key]?.en || ""
}

export default function SleepStreakBadge({ locale }: { locale: Locale }) {
  const [streak, setStreak] = useState<StreakData | null>(null)

  useEffect(() => {
    const data = updateStreak()
    setStreak(data)
  }, [])

  if (!streak) return null

  const { currentStreak } = streak
  const clampedStreak = Math.min(currentStreak, 7)

  return (
    <section className="mt-10 mb-4">
      <div className="p-5 sm:p-6 bg-nord-card/60 border border-nord-border/20 rounded-2xl backdrop-blur-sm">
        {/* 标题栏 */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-nord-text flex items-center gap-2">
            <span className="text-base">🌙</span>
            <span>{t(locale, "title")}</span>
          </h3>
          <span className="text-xs text-nord-text/40">
            {t(locale, "days").replace("{n}", String(currentStreak))}
          </span>
        </div>

        {/* 进度条 */}
        <div className="relative w-full h-2 bg-nord-border/20 rounded-full mb-5 overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-nord-accent/60 to-nord-accent rounded-full transition-all duration-700 ease-out"
            style={{ width: String((clampedStreak / 7) * 100) + "%" }}
          />
        </div>

        {/* 7 个勋章节点 */}
        <div className="flex items-center justify-between">
          {BADGES.map((badge) => {
            const unlocked = currentStreak >= badge.min
            const name = BADGE_NAMES[badge.key][locale] || BADGE_NAMES[badge.key].en
            const circleClass =
              "w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-base sm:text-lg transition-all duration-500 " +
              (unlocked
                ? "bg-nord-accent/20 border-2 border-nord-accent/50 shadow-lg shadow-nord-accent/10 scale-100"
                : "bg-nord-border/10 border-2 border-nord-border/20 scale-90 opacity-40")
            const labelClass =
              "text-[10px] sm:text-xs whitespace-nowrap transition-all duration-300 " +
              (unlocked ? "text-nord-text/70" : "text-nord-text/30")

            return (
              <div key={badge.key} className="flex flex-col items-center gap-1.5 group">
                <div className={circleClass}>{badge.emoji}</div>
                <span className={labelClass}>{name}</span>
              </div>
            )
          })}
        </div>

        {/* 完成彩蛋 */}
        {currentStreak >= 7 && (
          <div className="mt-4 text-center animate-fade-in-glow">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-400/80 bg-amber-400/10 px-3 py-1.5 rounded-full">
              {"✨ " + t(locale, "congrats")}
            </span>
          </div>
        )}
      </div>
    </section>
  )
}
