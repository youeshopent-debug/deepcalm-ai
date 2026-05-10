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
      <div className="p-6 glass rounded-xl mb-8">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="w-5 h-5 text-dc-accent" />
          <span className="text-sm font-medium text-dc-text">{tt('hypnotist.wake_time')}</span>
        </div>

        <div className="text-center mb-6">
          <div className="text-4xl font-light text-dc-text tracking-widest tabular-nums">
            {displayTime}
          </div>
          <div className="text-xs text-dc-muted mt-1">{tt('sleepCalculator.wake_time_hint')}</div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs text-dc-muted mb-1">
              <span>00</span>
              <span>12</span>
              <span>23</span>
            </div>
            <input
              type="range"
              min="0"
              max="23"
              value={wakeHour}
              onChange={(e) => setWakeHour(parseInt(e.target.value, 10))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, rgba(126,184,255,0.3) ${(wakeHour / 23) * 100}%, rgba(255,255,255,0.1) ${(wakeHour / 23) * 100}%)`,
              }}
            />
          </div>
          <div>
            <div className="flex justify-between text-xs text-dc-muted mb-1">
              <span>00</span>
              <span>30</span>
              <span>55</span>
            </div>
            <input
              type="range"
              min="0"
              max={MINUTE_STEPS.length - 1}
              value={wakeMinIdx}
              onChange={(e) => setWakeMinIdx(parseInt(e.target.value, 10))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, rgba(126,184,255,0.3) ${(wakeMinIdx / (MINUTE_STEPS.length - 1)) * 100}%, rgba(255,255,255,0.1) ${(wakeMinIdx / (MINUTE_STEPS.length - 1)) * 100}%)`,
              }}
            />
          </div>
        </div>
      </div>

      {results.length > 0 && (
        <div className="space-y-4 animate-slide-up">
          <h4 className="text-sm font-medium text-dc-text mb-3">{tt('hypnotist.results_title')}</h4>
          {results.map((r, i) => (
            <div
              key={i}
              className="p-4 glass rounded-xl hover:bg-white/[0.03] transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-dc-accent/10 flex items-center justify-center">
                    <Moon className="w-5 h-5 text-dc-accent" />
                  </div>
                  <div>
                    <p className="text-dc-text text-sm font-medium">{r.bedtime}</p>
                    <p className="text-xs text-dc-muted">
                      {r.cycles} × 90min = {r.cycles * 90}min {tt('hypnotist.cycles_label')}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    r.cycles === 6
                      ? 'bg-green-500/10 text-green-400'
                      : r.cycles === 5
                        ? 'bg-dc-accent/10 text-dc-accent'
                        : 'bg-yellow-500/10 text-yellow-400'
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
              <div className="flex items-center gap-3 mt-2 text-[10px] text-dc-muted">
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
