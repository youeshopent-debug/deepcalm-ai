"use client"

import { useState } from "react"
import { useLanguage } from "@/context/LanguageContext"
import DailyCheckin from "./DailyCheckin"
import SleepCalculator from "./SleepCalculator"
import { Moon, Clock } from "lucide-react"

const TABS = [
  { id: "checkin", icon: Moon },
  { id: "sleep", icon: Clock },
] as const

type TabId = (typeof TABS)[number]["id"]

const TAB_LABELS: Record<string, Record<string, string>> = {
  checkin: { zh: "每日心灵打卡", en: "Daily Check-in", ms: "Daftar Masuk Harian", ja: "デイリーチェックイン", ko: "데일리 체크인", th: "เช็คอินรายวัน", es: "Registro Diario" },
  sleep: { zh: "睡眠计算器", en: "Sleep Calculator", ms: "Kalkulator Tidur", ja: "睡眠計算機", ko: "수면 계산기", th: "เครื่องคำนวณการนอน", es: "Calculadora de Sueño" },
}

export default function HealingToolbox() {
  const [activeTab, setActiveTab] = useState<TabId>("checkin")
  const { locale } = useLanguage()

  return (
    <section id="healing-toolbox" className="relative z-10 mx-auto w-full max-w-6xl scroll-mt-16 px-4 py-4 sm:px-6">
      <div className="w-full">
        <div className="overflow-hidden rounded-3xl border border-[#c9d9d0] bg-[#f8fcf9]">
          <div className="flex border-b border-[#c9d9d0]">
            {TABS.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex min-w-0 flex-1 items-center justify-center gap-2 px-2 py-3.5 sm:px-4 text-sm font-medium transition-all duration-200 relative ${
                    isActive
                      ? "bg-[#e2f2e9] text-[#214b3a]"
                      : "text-[#354c42] hover:bg-[#edf5ef]"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="min-w-0 break-words">{TAB_LABELS[tab.id][locale] || TAB_LABELS[tab.id].en}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#346653] rounded-full" />
                  )}
                </button>
              )
            })}
          </div>

          <div className="p-2 sm:p-4">
            {activeTab === "checkin" ? <DailyCheckin /> : <SleepCalculator />}
          </div>
        </div>
      </div>
    </section>
  )
}
