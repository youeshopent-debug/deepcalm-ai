"use client"

import { useState } from "react"
import { Clock, Moon } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { calculateBedtimes } from "@/lib/sleep"
import type { SleepOption } from "@/lib/sleep"

export default function SleepCalculator() {
  const { tt } = useLanguage()
  const [wakeHour, setWakeHour] = useState("7")
  const [wakeMin, setWakeMin] = useState("0")
  const [results, setResults] = useState<SleepOption[]>([])

  function handleCalculate() {
    const h = parseInt(wakeHour, 10)
    const m = parseInt(wakeMin, 10)
    if (isNaN(h) || isNaN(m)) return
    setResults(calculateBedtimes(h, m))
  }

  return (
    <div>
      <div className="p-6 glass rounded-xl mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-dc-accent" />
          <span className="text-sm font-medium text-dc-text">
            {tt("hypnotist.wake_time")}
          </span>
        </div>

        <div className="flex items-center gap-3 mb-5">
          <select
            value={wakeHour}
            onChange={(e) => setWakeHour(e.target.value)}
            className="px-4 py-2.5 bg-dc-surface border border-dc-border rounded-lg text-dc-text text-sm focus:outline-none focus:border-dc-accent/50 appearance-none cursor-pointer"
          >
            {Array.from({ length: 24 }, (_, i) => (
              <option key={i} value={i}>
                {String(i).padStart(2, "0")}
              </option>
            ))}
          </select>
          <span className="text-dc-muted">:</span>
          <select
            value={wakeMin}
            onChange={(e) => setWakeMin(e.target.value)}
            className="px-4 py-2.5 bg-dc-surface border border-dc-border rounded-lg text-dc-text text-sm focus:outline-none focus:border-dc-accent/50 appearance-none cursor-pointer"
          >
            {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map((m) => (
              <option key={m} value={m}>
                {String(m).padStart(2, "0")}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-dc-accent text-dc-deep rounded-xl font-medium text-sm hover:bg-dc-accent/90 transition-all duration-300"
        >
          <Moon className="w-4 h-4" />
          {tt("hypnotist.calculate")}
        </button>
      </div>

      {results.length > 0 && (
        <div className="space-y-3 animate-slide-up">
          <h4 className="text-sm font-medium text-dc-text mb-3">
            {tt("hypnotist.results_title")}
          </h4>
          {results.map((r, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 bg-dc-surface border border-dc-border rounded-lg hover:border-dc-accent/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-dc-accent/10 flex items-center justify-center">
                  <Moon className="w-5 h-5 text-dc-accent" />
                </div>
                <div>
                  <p className="text-dc-text text-sm font-medium">{r.bedtime}</p>
                  <p className="text-xs text-dc-muted">
                    {r.cycles} × 90min = {r.cycles * 90}min {tt("hypnotist.cycles_label")}
                  </p>
                </div>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-dc-accent/10 text-dc-accent">
                {r.cycles === 6
                  ? tt("sleepCalculator.energetic")
                  : r.cycles === 5
                    ? tt("sleepCalculator.good")
                    : tt("sleepCalculator.fair")}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
