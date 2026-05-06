"use client"

import { useState, useCallback } from "react"
import { Clock, Moon } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import type { SleepResult } from "@/types"

export default function SleepCalculator() {
  const { tt } = useLanguage()
  const [wakeHour, setWakeHour] = useState("7")
  const [wakeMin, setWakeMin] = useState("0")
  const [results, setResults] = useState<SleepResult[]>([])

  const calculateBedtimes = useCallback(() => {
    const h = parseInt(wakeHour, 10)
    const m = parseInt(wakeMin, 10)
    if (isNaN(h) || isNaN(m) || h < 0 || h > 23 || m < 0 || m > 59) return

    const wakeMinutes = h * 60 + m
    const cycleMin = 90
    // 5-6 cycles is optimal; 4 is minimal
    const cycles = [6, 5, 4]

    const feelLabels = [
      tt("hypnotist.refreshed"),
      tt("hypnotist.good"),
      tt("hypnotist.okay"),
    ]

    const computed: SleepResult[] = cycles.map((c, i) => {
      let bedtimeMin = wakeMinutes - c * cycleMin
      if (bedtimeMin < 0) bedtimeMin += 24 * 60
      const bedH = Math.floor(bedtimeMin / 60)
      const bedM = bedtimeMin % 60

      return {
        cycles: c,
        bedtime: `${String(bedH).padStart(2, "0")}:${String(bedM).padStart(2, "0")}`,
        feelLabel: feelLabels[i] || "",
      }
    })

    setResults(computed)
  }, [wakeHour, wakeMin, tt])

  return (
    <div>
      <div className="p-6 bg-nord-card border border-nord-border rounded-xl mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-nord-accent" />
          <span className="text-sm font-medium text-nord-text">
            {tt("hypnotist.wake_time")}
          </span>
        </div>

        <div className="flex items-center gap-3 mb-5">
          <select
            value={wakeHour}
            onChange={(e) => setWakeHour(e.target.value)}
            className="px-4 py-2.5 bg-nord-surface border border-nord-border rounded-lg text-nord-text text-sm focus:outline-none focus:border-nord-accent/50 appearance-none cursor-pointer"
          >
            {Array.from({ length: 24 }, (_, i) => (
              <option key={i} value={i}>
                {String(i).padStart(2, "0")}
              </option>
            ))}
          </select>
          <span className="text-nord-muted">:</span>
          <select
            value={wakeMin}
            onChange={(e) => setWakeMin(e.target.value)}
            className="px-4 py-2.5 bg-nord-surface border border-nord-border rounded-lg text-nord-text text-sm focus:outline-none focus:border-nord-accent/50 appearance-none cursor-pointer"
          >
            {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map((m) => (
              <option key={m} value={m}>
                {String(m).padStart(2, "0")}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={calculateBedtimes}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-nord-accent text-white rounded-xl font-medium text-sm hover:bg-nord-accent/90 transition-all duration-300"
        >
          <Moon className="w-4 h-4" />
          {tt("hypnotist.calculate")}
        </button>
      </div>

      {results.length > 0 && (
        <div className="space-y-3 animate-slide-up">
          <h4 className="text-sm font-medium text-nord-text mb-3">
            {tt("hypnotist.results_title")}
          </h4>
          {results.map((r, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 bg-nord-surface border border-nord-border rounded-lg hover:border-nord-accent/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-nord-accent/10 flex items-center justify-center">
                  <Moon className="w-5 h-5 text-nord-accent" />
                </div>
                <div>
                  <p className="text-nord-text text-sm font-medium">{r.bedtime}</p>
                  <p className="text-xs text-nord-muted">
                    {r.cycles} × 90min = {r.cycles * 90}min {tt("hypnotist.cycles_label")}
                  </p>
                </div>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-nord-accent/10 text-nord-accent">
                {r.feelLabel}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
