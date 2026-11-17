'use client'

import { useState, useMemo } from 'react'
import { Moon, Clock } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { calculateBedtimes } from '@/lib/sleep'
import type { SleepOption } from '@/lib/sleep'

const MINUTE_STEPS = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]

function CycleDiagram({ cycles }: { cycles: number }) {
  const totalBars = cycles * 4
  return (
    <div className="flex items-center gap-[2px] mt-3">
      {Array.from({ length: totalBars }, (_, i) => {
        const cycleIndex = Math.floor(i / 4)
        const phase = i % 4
        const isDeep = phase === 1 || phase === 2
        const isREM = phase === 3
        const hue = 200 + cycleIndex * 25
        return (
          <div
            key={i}
            className="flex-1 h-2 rounded-sm transition-all duration-500"
            style={{
              backgroundColor: isREM
                ? `hsla(${hue}, 70%, 60%, 0.7)`
                : isDeep
                  ? `hsla(${hue}, 50%, 35%, 0.5)`
                  : `hsla(${hue}, 40%, 50%, 0.3)`,
              height: isREM ? '6px' : isDeep ? '10px' : '4px',
            }}
          />
        )
      })}
    </div>
  )
}

export default function SleepCalculator() {
  const { tt } = useLanguage()
  const [wakeHour, setWakeHour] = useState(7)
  const [wakeMinIdx, setWakeMinIdx] = useState(0)

  const results = useMemo(() => {
    return calculateBedtimes(wakeHour, MINUTE_STEPS[wakeMinIdx])
  }, [wakeHour, wakeMinIdx])

  const displayTime = `${String(wakeHour).padStart(2, '0')}:${String(MINUTE_STEPS[wakeMinIdx]).padStart(2, '0')}`

  return (
    <div>
      <div className="p-6 bg-[#203b33] rounded-xl border border-slate-600/30 mb-8">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="w-5 h-5 text-blue-400" />
          <span className="text-sm font-medium text-slate-100">{tt('sleepCalculator.wake_label')}</span>
        </div>

        <div className="text-center mb-6">
          <div className="text-4xl font-light text-white tracking-widest tabular-nums">
            {displayTime}
          </div>
          <div className="text-xs text-slate-300 mt-1">{tt('sleepCalculator.wake_time_hint')}</div>
        </div>

        <div className="mx-auto grid max-w-xs grid-cols-2 gap-3">
          <select
            aria-label={`${tt('sleepCalculator.wake_label')} · HH`}
            value={wakeHour}
            onChange={(event) => setWakeHour(Number(event.target.value))}
            className="min-h-12 rounded-xl border border-[#91b1a2] bg-white px-3 text-center text-xl font-semibold text-[#214b3a]"
          >
            {Array.from({ length: 24 }, (_, hour) => (
              <option key={hour} value={hour}>{String(hour).padStart(2, '0')}</option>
            ))}
          </select>
          <select
            aria-label={`${tt('sleepCalculator.wake_label')} · MM`}
            value={wakeMinIdx}
            onChange={(event) => setWakeMinIdx(Number(event.target.value))}
            className="min-h-12 rounded-xl border border-[#91b1a2] bg-white px-3 text-center text-xl font-semibold text-[#214b3a]"
          >
            {MINUTE_STEPS.map((minute, index) => (
              <option key={minute} value={index}>{String(minute).padStart(2, '0')}</option>
            ))}
          </select>
        </div>
      </div>

      {results.length > 0 && (
        <div className="space-y-4 animate-slide-up">
          <h4 className="text-base font-bold text-[#214b3a] mb-3">{tt('sleepCalculator.result_title')}</h4>
          {results.map((r, i) => (
            <div
              key={i}
              className="p-4 bg-[#203b33] rounded-xl border border-slate-600/20 hover:bg-slate-800 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/15 flex items-center justify-center">
                    <Moon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-slate-100 text-sm font-medium">{r.bedtime}</p>
                    <p className="text-xs text-slate-300">
                      {r.cycles} × 90min = {r.cycles * 90}min {tt('sleepCalculator.cycles')}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    r.cycles === 6
                      ? 'bg-emerald-500/15 text-emerald-300'
                      : r.cycles === 5
                        ? 'bg-blue-500/15 text-blue-300'
                        : 'bg-amber-500/15 text-amber-300'
                  }`}
                >
                  {r.cycles === 6
                    ? tt('sleepCalculator.energetic')
                    : r.cycles === 5
                      ? tt('sleepCalculator.good')
                      : tt('sleepCalculator.fair')}
                </span>
              </div>
              <CycleDiagram cycles={r.cycles} />
              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-200">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-sm bg-[hsla(200,50%,35%,0.5)]" /> {tt('sleepCalculator.deep_sleep')}
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-sm bg-[hsla(200,40%,50%,0.3)]" /> {tt('sleepCalculator.light_sleep')}
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-sm bg-[hsla(200,70%,60%,0.7)]" /> REM
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
