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
    <section id="healing-toolbox" className="relative z-10 w-full px-4 sm:px-6 pb-8">
      <div className="max-w-3xl mx-auto">
        <div className="glass rounded-2xl border border-dc-border/40 backdrop-blur-xl overflow-hidden">
          <div className="flex border-b border-dc-border/20">
            {TABS.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-medium transition-all duration-200 relative ${
                    isActive
                      ? "text-dc-accent"
                      : "text-dc-muted/60 hover:text-dc-muted hover:bg-dc-surface/20"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden xs:inline">{TAB_LABELS[tab.id][locale] || TAB_LABELS[tab.id].en}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-dc-accent rounded-full" />
                  )}
                </button>
              )
            })}
          </div>

          <div className="p-6 sm:p-8">
            {activeTab === "checkin" ? <DailyCheckin /> : <SleepCalculator />}
          </div>
        </div>
      </div>
    </section>
  )
}
