"use client"

import { useLanguage } from "@/context/LanguageContext"
import { audioEngine } from "@/lib/audioEngine"
import { useEffect, useState, useCallback, useRef } from "react"
import { X } from "lucide-react"

const BREATHING_LABELS: Record<string, { title: string; inhale: string; hold: string; exhale: string; done: string }> = {
  zh: { title: "🧘 4-7-8 呼吸引导", inhale: "吸气 4 秒…", hold: "屏息 7 秒…", exhale: "呼气 8 秒…", done: "✨ 感觉如何？愿这份平静陪你入眠" },
  en: { title: "🧘 4-7-8 Breathing", inhale: "Inhale 4s…", hold: "Hold 7s…", exhale: "Exhale 8s…", done: "✨ How do you feel? May this calm stay with you" },
  ms: { title: "🧘 Pernafasan 4-7-8", inhale: "Tarik nafas 4s…", hold: "Tahan 7s…", exhale: "Hembus 8s…", done: "✨ Bagaimana perasaan anda? Semoga ketenangan ini kekal" },
  ja: { title: "🧘 4-7-8呼吸法", inhale: "息を吸う 4秒…", hold: "止める 7秒…", exhale: "吐く 8秒…", done: "✨ いかがですか？この安らぎが続きますように" },
  ko: { title: "🧘 4-7-8 호흡법", inhale: "들이마시기 4초…", hold: "멈추기 7초…", exhale: "내쉬기 8초…", done: "✨ 기분이 어떠신가요? 이 평온이 함께하길 바랍니다" },
  th: { title: "🧘 การหายใจ 4-7-8", inhale: "หายใจเข้า 4วินาที…", hold: "กลั้นหายใจ 7วินาที…", exhale: "หายใจออก 8วินาที…", done: "✨ รู้สึกอย่างไรบ้าง? ขอให้ความสงบนี้อยู่กับคุณ" },
  es: { title: "🧘 Respiración 4-7-8", inhale: "Inhala 4s…", hold: "Retén 7s…", exhale: "Exhala 8s…", done: "✨ ¿Cómo te sientes? Que esta calma te acompañe" },
}

type Phase = "inhale" | "hold" | "exhale" | "done"

const TOTAL_ROUNDS = 3

export default function BreathingGuide({ onClose }: { onClose: () => void }) {
  const { locale } = useLanguage()
  const labels = BREATHING_LABELS[locale] || BREATHING_LABELS.en

  const [phase, setPhase] = useState<Phase>("inhale")
  const [round, setRound] = useState(1)
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const animRef = useRef<number | null>(null)

  /** Write breathing state to audioEngine bridge for BackgroundVideo sync */
  const writeBreathingBridge = useCallback((p: Phase, prog: number) => {
    audioEngine.breathingPhase = p
    audioEngine.breathingProgress = prog
  }, [])

  const startTimer = useCallback((
    durationMs: number,
    currentPhase: Phase,
    nextPhase: Phase | "nextRound" | "close",
  ) => {
    const startTime = performance.now()
    const tick = (now: number) => {
      const elapsed = now - startTime
      const pct = Math.min(elapsed / durationMs, 1)
      setProgress(pct)
      writeBreathingBridge(currentPhase, pct)
      if (pct >= 1) {
        if (nextPhase === "close") {
          setPhase("done")
          writeBreathingBridge("done", 1)
          setTimeout(() => {
            setVisible(false)
            setTimeout(onClose, 400)
          }, 2500)
          return
        }
        if (nextPhase === "nextRound") {
          setRound((r) => r + 1)
          setPhase("inhale")
          return
        }
        setPhase(nextPhase)
        return
      }
      animRef.current = requestAnimationFrame(tick)
    }
    animRef.current = requestAnimationFrame(tick)
  }, [onClose, writeBreathingBridge])

  useEffect(() => {
    if (phase === "inhale") startTimer(4000, "inhale", "hold")
    else if (phase === "hold") startTimer(7000, "hold", "exhale")
    else if (phase === "exhale") {
      if (round >= TOTAL_ROUNDS) startTimer(8000, "exhale", "close")
      else startTimer(8000, "exhale", "nextRound")
    }
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [phase, round, startTimer])

  /** Clean up bridge on unmount */
  useEffect(() => {
    return () => {
      audioEngine.breathingPhase = null
      audioEngine.breathingProgress = 0
    }
  }, [])

  const handleManualClose = () => {
    if (animRef.current) cancelAnimationFrame(animRef.current)
    audioEngine.breathingPhase = null
    audioEngine.breathingProgress = 0
    setVisible(false)
    setTimeout(onClose, 400)
  }

  const orbScale =
    phase === "inhale" ? 1 + progress * 0.18 :
    phase === "hold" ? 1.18 :
    phase === "exhale" ? 1.18 - progress * 0.35 :
    1

  const orbOpacity =
    phase === "inhale" ? 0.7 + progress * 0.25 :
    phase === "hold" ? 0.95 :
    phase === "exhale" ? 0.95 - progress * 0.35 :
    0.6

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-dc-deep/85 backdrop-blur-xl" onClick={handleManualClose} />

      {/* Close button */}
      <button
        onClick={handleManualClose}
        className="absolute top-6 right-6 z-10 p-2 rounded-full bg-dc-surface/40 hover:bg-dc-surface/60 text-dc-muted hover:text-dc-text transition-all"
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 max-w-sm w-full">
        {/* Phase indicator text */}
        <p className="text-dc-accent/80 text-xs uppercase tracking-[0.15em] mb-8 font-medium">
          {phase === "done" ? "" : `${round} / ${TOTAL_ROUNDS}`}
        </p>

        {/* Breathing orb */}
        <div
          className="relative flex items-center justify-center mb-10"
          style={{
            width: "min(60vw, 280px)",
            height: "min(60vw, 280px)",
          }}
        >
          {/* Glow ring */}
          <div
            className="absolute inset-0 rounded-full transition-all duration-75"
            style={{
              background: `radial-gradient(circle, rgba(126,184,255,${(orbOpacity - 0.3) * 0.15}) 0%, transparent 70%)`,
              transform: `scale(${orbScale * 1.15})`,
            }}
          />
          {/* Core orb */}
          <div
            className="absolute inset-[15%] rounded-full transition-all duration-75"
            style={{
              background: `radial-gradient(circle at 35% 35%, rgba(126,184,255,${orbOpacity * 0.5}), rgba(126,184,255,${orbOpacity * 0.15}) 60%, transparent)`,
              transform: `scale(${orbScale})`,
              boxShadow: phase !== "exhale"
                ? `0 0 ${40 * orbScale}px rgba(126,184,255,${orbOpacity * 0.15})`
                : "none",
            }}
          />
          {/* Center dot */}
          <div
            className="absolute rounded-full bg-dc-accent/30 transition-all duration-75"
            style={{
              width: `${6 * orbScale}px`,
              height: `${6 * orbScale}px`,
              opacity: orbOpacity * 0.6,
            }}
          />

          {/* Phase label centered */}
          <span
            className="absolute inset-0 flex items-center justify-center text-sm font-medium transition-opacity duration-300"
            style={{ color: "rgba(232,237,245,0.85)", opacity: phase === "done" ? 0 : 1 }}
          >
            {phase === "inhale" ? labels.inhale : phase === "hold" ? labels.hold : labels.exhale}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-[200px] h-1 bg-dc-surface/40 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-dc-accent/60 rounded-full transition-all duration-75"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        {/* Done message */}
        {phase === "done" && (
          <p className="text-center text-dc-text/80 text-sm leading-relaxed animate-fade-in-glow">
            {labels.done}
          </p>
        )}

        {/* Hint */}
        <p className="mt-10 text-dc-muted/30 text-[10px] tracking-wide">
          {locale === "zh" ? "点击任意位置可关闭" : "Tap anywhere to close"}
        </p>
      </div>
    </div>
  )
}
