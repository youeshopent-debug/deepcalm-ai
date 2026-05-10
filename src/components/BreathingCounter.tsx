'use client'

import { useState, useEffect, useCallback } from 'react'
import { useLanguage } from '@/context/LanguageContext'

interface BreathingCounterProps {
  className?: string
}

type BreathPhase = 'inhale' | 'hold' | 'exhale' | 'rest'

const PHASE_DURATION: Record<BreathPhase, number> = {
  inhale: 4000,
  hold: 7000,
  exhale: 8000,
  rest: 0,
}

const PHASE_LABEL: Record<BreathPhase, { zh: string; en: string; ms: string }> = {
  inhale: { zh: '🌬️ 吸气', en: '🌬️ Breathe In', ms: '🌬️ Tarik Nafas' },
  hold: { zh: '🧘 屏息', en: '🧘 Hold', ms: '🧘 Tahan' },
  exhale: { zh: '💨 呼气', en: '💨 Breathe Out', ms: '💨 Hembus' },
  rest: { zh: '🔄 准备', en: '🔄 Ready', ms: '🔄 Sedia' },
}

const PHASE_COLOR: Record<BreathPhase, string> = {
  inhale: 'border-emerald-400/60 shadow-emerald-400/20',
  hold: 'border-amber-400/60 shadow-amber-400/20',
  exhale: 'border-sky-400/60 shadow-sky-400/20',
  rest: 'border-dc-accent/40 shadow-dc-accent/10',
}

export default function BreathingCounter({ className = '' }: BreathingCounterProps) {
  const { tt, locale } = useLanguage()
  const [globalUsers, setGlobalUsers] = useState(12847)
  const [breathCount, setBreathCount] = useState(0)
  const [phase, setPhase] = useState<BreathPhase>('rest')
  const [mounted, setMounted] = useState(false)

  const runCycle = useCallback(() => {
    const phases: BreathPhase[] = ['inhale', 'hold', 'exhale', 'rest']
    let timeoutId: ReturnType<typeof setTimeout>

    const run = (index: number) => {
      if (index >= phases.length) {
        setBreathCount(c => c + 1)
        run(0)
        return
      }
      const p = phases[index]
      setPhase(p)
      timeoutId = setTimeout(() => run(index + 1), PHASE_DURATION[p])
    }

    timeoutId = setTimeout(() => run(0), 500)
    return () => clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    setMounted(true)
    const cleanup = runCycle()
    return cleanup
  }, [runCycle])

  useEffect(() => {
    const userInterval = setInterval(() => {
      setGlobalUsers(prev => Math.max(5000, prev + Math.floor(Math.random() * 200 - 100)))
    }, 8000 + Math.random() * 12000)
    return () => clearInterval(userInterval)
  }, [])

  const lang = locale as string
  const label = PHASE_LABEL[phase]
  const phaseText = lang === 'zh' ? label.zh : lang === 'ms' ? label.ms : label.en

  if (!mounted) {
    return (
      <section className={`py-16 ${className}`}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="w-32 h-32 mx-auto rounded-full border-4 border-dc-border" />
        </div>
      </section>
    )
  }

  return (
    <section className={`py-16 relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-dc-accent/[0.03] via-transparent to-dc-accent/[0.03]" />

      <div className="relative max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-dc-text">
          {tt('breathingCounter.title')}
        </h2>

        <p className="mt-3 text-dc-muted text-sm leading-relaxed max-w-lg mx-auto">
          {tt('breathingCounter.description').replace('{count}', globalUsers.toLocaleString())}
        </p>

        <div className="mt-10 flex flex-col items-center gap-6">
          <div
            className={`w-36 h-36 rounded-full border-[3px] ${PHASE_COLOR[phase]} animate-breathing-circle flex items-center justify-center bg-dc-card/40 shadow-lg backdrop-blur-sm`}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-dc-text tabular-nums">{breathCount}</div>
              <div className="text-[10px] text-dc-muted/60 mt-0.5 uppercase tracking-wider">
                {locale === 'zh' ? '循环' : locale === 'ms' ? 'Kitaran' : 'Cycles'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm font-medium text-dc-accent">
            <span className="inline-block w-2 h-2 rounded-full bg-dc-accent/60 animate-pulse" />
            {phaseText}
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-3">
          <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent via-dc-accent/20 to-transparent" />
          <p className="text-xs text-dc-muted/50 italic leading-relaxed max-w-sm">
            {tt('breathingCounter.hint')}
          </p>
          <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent via-dc-accent/20 to-transparent" />
        </div>
      </div>
    </section>
  )
}
