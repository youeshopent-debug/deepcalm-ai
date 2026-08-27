"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { useLanguage } from "@/context/LanguageContext"
import { useTheme } from "@/context/ThemeContext"
import { audioEngine } from "@/lib/audioEngine"
import { generateMeditationScript } from "@/lib/meditationScriptEngine"
import type { MeditationScript, MeditationInput, VisualTheme } from "@/lib/meditationScriptEngine"
import { createSessionClock, computeTick, getElapsedSeconds, pauseClock, resumeClock } from "@/lib/sessionOrchestrator"
import type { SessionClock, TickAction } from "@/lib/sessionOrchestrator"
import { saveSession, generateSessionId } from "@/lib/meditationHistory"
import { X, Pause, Play, SkipForward, Sparkles } from "lucide-react"

/* ── Locale labels ── */

const LABELS: Record<string, {
  title: string; subtitle: string; customLabel: string; customPlaceholder: string
  startBtn: string; generating: string; pause: string; resume: string; skip: string
  exit: string; completed: string; durationLabel: string; saveLabel: string
  quickOptions: { label: string; emotion: string }[]
}> = {
  zh: {
    title: "🧘 AI 引导冥想",
    subtitle: "选择一个主题，或描述你此刻的感受，我将为你生成专属冥想引导",
    customLabel: "描述你的感受（选填）",
    customPlaceholder: "例如：今天工作压力很大，感到焦虑…",
    startBtn: "开始冥想",
    generating: "正在倾听你的内心，生成专属引导…",
    pause: "暂停",
    resume: "继续",
    skip: "跳过",
    exit: "退出",
    completed: "🌙 冥想完成",
    durationLabel: "时长",
    saveLabel: "已完成",
    quickOptions: [
      { label: "😰 缓解焦虑", emotion: "焦虑不安，希望平静下来" },
      { label: "😴 改善睡眠", emotion: "失眠困扰，难以入睡" },
      { label: "😢 安抚悲伤", emotion: "感到悲伤失落" },
      { label: "😤 释放愤怒", emotion: "愤怒烦躁，需要释放" },
      { label: "🌿 深度放松", emotion: "只想彻底放松身心" },
    ],
  },
  en: {
    title: "🧘 AI-Guided Meditation",
    subtitle: "Choose a theme or describe how you feel — I'll craft a personal guided session",
    customLabel: "Describe your feelings (optional)",
    customPlaceholder: "e.g., Stressed from work today, feeling anxious…",
    startBtn: "Start Meditation",
    generating: "Listening to your heart, generating your guide…",
    pause: "Pause",
    resume: "Resume",
    skip: "Skip",
    exit: "Exit",
    completed: "🌙 Meditation Complete",
    durationLabel: "Duration",
    saveLabel: "Completed",
    quickOptions: [
      { label: "😰 Calm Anxiety", emotion: "Anxious and restless, seeking calm" },
      { label: "😴 Deep Sleep", emotion: "Trouble sleeping, struggling with insomnia" },
      { label: "😢 Soothe Sadness", emotion: "Feeling sad and low" },
      { label: "😤 Release Anger", emotion: "Angry and frustrated, need release" },
      { label: "🌿 Deep Relaxation", emotion: "Just want to fully relax" },
    ],
  },
}

/* ── Meditation state machine ── */

type SessionState = "idle" | "loading" | "playing" | "paused" | "completed"

/* ── Theme mapping for quick options ── */

const EMOTION_THEME_HINT: Record<string, VisualTheme> = {
  anxiety: "forest",
  sleep: "deepsea",
  sad: "starry",
  angry: "twilight",
  relax: "forest",
}

export default function MeditationController({ onClose, initialEmotion, duration }: {
  onClose: () => void
  initialEmotion?: string
  duration?: "micro" | "short" | "medium" | "long"
}) {
  const { locale } = useLanguage()
  const { setTheme } = useTheme()
  const labels = LABELS[locale] || LABELS.en

  /* ── State ── */
  const [state, setState] = useState<SessionState>("idle")
  const [customText, setCustomText] = useState(initialEmotion || "")
  const [selectedEmotion, setSelectedEmotion] = useState<string>(initialEmotion || "")
  const [script, setScript] = useState<MeditationScript | null>(null)
  const [tick, setTick] = useState<TickAction | null>(null)
  const [currentLineIndex, setCurrentLineIndex] = useState(-1)
  const [lineVisible, setLineVisible] = useState(false)
  const [elapsedSec, setElapsedSec] = useState(0)

  /* ── Refs (mutable, no re-render) ── */
  const clockRef = useRef<SessionClock | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const scriptRef = useRef<MeditationScript | null>(null)
  const stateRef = useRef<SessionState>("idle")
  const startingRef = useRef(false)

  // Keep stateRef in sync for interval callback
  useEffect(() => { stateRef.current = state }, [state])

  /* ── Cleanup helper ── */
  const cleanup = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    audioEngine.breathingPhase = null
    audioEngine.breathingProgress = 0
    audioEngine.clearMeditationPreset()
  }, [])

  // Full cleanup on unmount
  useEffect(() => {
    return () => cleanup()
  }, [cleanup])

  /* ── Tick loop ── */
  const startTickLoop = useCallback((s: MeditationScript, clock: SessionClock) => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    scriptRef.current = s

    intervalRef.current = setInterval(() => {
      if (stateRef.current !== "playing") return
      const elapsed = getElapsedSeconds(clock)
      const result = computeTick(s, elapsed)
      setTick(result)
      setElapsedSec(elapsed)

      // Track line changes for fade-in animation
      if (result.currentLine) {
        const idx = s.lines.indexOf(result.currentLine)
        setCurrentLineIndex((prev) => {
          if (prev !== idx) {
            setLineVisible(false)
            // Small delay for fade-out before fade-in
            setTimeout(() => setLineVisible(true), 50)
            return idx
          }
          return prev
        })
      }

      // Sync breath bridge to audioEngine
      if (result.breathPhase !== "neutral") {
        audioEngine.breathingPhase = result.breathPhase as 'inhale' | 'hold' | 'exhale'
        audioEngine.breathingProgress = result.lineProgress
      } else {
        audioEngine.breathingPhase = null
        audioEngine.breathingProgress = 0
      }

      // Detect session end
      if (elapsed >= s.totalSeconds) {
        cleanup()
        setState("completed")
      }
    }, 100)
  }, [cleanup])

  /* ── Generate & start meditation ── */
  const handleStart = useCallback(async (emotion: string) => {
    // Guard against double-click during generation
    if (startingRef.current) return
    startingRef.current = true
    setState("loading")
    cleanup()

    const input: MeditationInput = {
      emotion: emotion || "放松身心",
      locale,
      duration: duration || "medium",
    }

    try {
      const { script: s } = await generateMeditationScript(input)
      setScript(s)
      scriptRef.current = s

      // Apply visual theme
      setTheme(s.visualTheme)

      // Start ambient audio — use visualTheme directly (ensures themeAudioMap match)
      audioEngine.init()
      audioEngine.applyThemeAudio(s.visualTheme)
      // Apply meditation preset — reduce ambient volume for immersive calm
      audioEngine.setMeditationPreset({
        masterVolume: 0.08,
        channels: { rain: 0.5, wind: 0.4, stream: 0.6, birds: 0.4, insects: 0.3, fire: 0.3 },
      })

      // Create session clock
      const clock = createSessionClock()
      clockRef.current = clock

      // Transition to playing
      setState("playing")
      setTick(null)
      setCurrentLineIndex(-1)
      setLineVisible(false)

      // Start tick loop on next frame
      setTimeout(() => {
        startTickLoop(s, clock)
        setLineVisible(true)
      }, 800) // Give breathing room before first line
      startingRef.current = false
    } catch {
      // On failure, try one more time with a fallback emotion
      try {
        const { script: s } = await generateMeditationScript({ emotion: "放松", locale, duration: duration || "short" })
        setScript(s)
        scriptRef.current = s
        setTheme(s.visualTheme)
        audioEngine.init()
        audioEngine.applyThemeAudio(s.visualTheme)
        audioEngine.setMeditationPreset({
          masterVolume: 0.08,
          channels: { rain: 0.5, wind: 0.4, stream: 0.6, birds: 0.4, insects: 0.3, fire: 0.3 },
        })
        const clock = createSessionClock()
        clockRef.current = clock
        setState("playing")
        setTick(null)
        setCurrentLineIndex(-1)
        setLineVisible(false)
        setTimeout(() => {
          startTickLoop(s, clock)
          setLineVisible(true)
        }, 800)
        startingRef.current = false
      } catch {
        // Ultimate fallback — close controller
        startingRef.current = false
        cleanup()
        onClose()
      }
    }
  }, [locale, setTheme, cleanup, startTickLoop, onClose])

  /* ── Auto-trigger from external (e.g. Library topic card) ── */
  const autoStartedRef = useRef(false)
  useEffect(() => {
    if (initialEmotion && !autoStartedRef.current) {
      autoStartedRef.current = true
      handleStart(initialEmotion)
    }
  }, [initialEmotion, handleStart])

  /* ── Controls ── */
  const handlePause = useCallback(() => {
    if (!clockRef.current) return
    clockRef.current = pauseClock(clockRef.current)
    setState("paused")
    cleanup()
  }, [cleanup])

  const handleResume = useCallback(() => {
    if (!clockRef.current || !scriptRef.current) return
    clockRef.current = resumeClock(clockRef.current)
    setState("playing")
    // Re-read latest tick after resume
    const elapsed = getElapsedSeconds(clockRef.current)
    const result = computeTick(scriptRef.current, elapsed)
    setTick(result)
    setElapsedSec(elapsed)
    startTickLoop(scriptRef.current, clockRef.current)
  }, [startTickLoop])

  const handleSkip = useCallback(() => {
    if (!clockRef.current || !scriptRef.current) return
    const elapsed = getElapsedSeconds(clockRef.current)
    const currentIdx = scriptRef.current.lines.findIndex(l => l === tick?.currentLine)
    if (currentIdx < 0 || currentIdx >= scriptRef.current.lines.length - 1) return
    // Jump to next line start
    const nextLine = scriptRef.current.lines[currentIdx + 1]
    const skipTo = nextLine.startAt
    // Advance clock by adjusting totalPausedMs:
    // elapsed = (now - start - totalPausedMs) / 1000
    // To make elapsed == skipTo, we need totalPausedMs -= (skipTo - elapsed) * 1000
    const deltaMs = (skipTo - elapsed) * 1000
    clockRef.current = {
      ...clockRef.current,
      totalPausedMs: clockRef.current.totalPausedMs - deltaMs,
    }
    setLineVisible(false)
    setTimeout(() => setLineVisible(true), 100)
  }, [tick])

  const handleExit = useCallback(() => {
    cleanup()
    onClose()
  }, [cleanup, onClose])

  /* ── Completion handler ── */
  const handleCompleteAndExit = useCallback(() => {
    if (script) {
      saveSession({
        id: generateSessionId(),
        date: new Date().toISOString(),
        duration: Math.round(elapsedSec),
        theme: script.visualTheme,
        scriptPreview: script.title.slice(0, 40),
        completed: true,
      })
    }
    cleanup()
    onClose()
  }, [script, elapsedSec, cleanup, onClose])

  /* ── Quick option click ── */
  const handleQuickSelect = useCallback((emotion: string) => {
    setSelectedEmotion(emotion)
    setCustomText("")
  }, [])

  /* ── Render: IDLE state ── */
  if (state === "idle") {
    return (
      <div className="fixed inset-0 z-[999] flex items-center justify-center">
        <div className="absolute inset-0 bg-dc-deep/90 backdrop-blur-xl -z-10" onClick={handleExit} />
        <div className="relative z-10 w-full max-w-lg mx-auto px-6 py-10 max-h-[90vh] overflow-y-auto">
          {/* Title */}
          <h2 className="text-2xl font-semibold text-dc-text text-center mb-2">{labels.title}</h2>
          <p className="text-dc-muted text-sm text-center mb-8 leading-relaxed">{labels.subtitle}</p>

          {/* Quick-select cards */}
          <div className="grid grid-cols-1 gap-3 mb-6">
            {labels.quickOptions.map((opt) => {
              const isSelected = selectedEmotion === opt.emotion
              return (
                <button
                  key={opt.label}
                  onClick={() => handleQuickSelect(opt.emotion)}
                  className={`text-left px-5 py-4 rounded-xl border transition-all duration-200 ${
                    isSelected
                      ? "border-dc-accent/60 bg-dc-accent/10 shadow-sm shadow-dc-accent/10"
                      : "border-dc-surface/30 bg-dc-surface/10 hover:border-dc-surface/50 hover:bg-dc-surface/20"
                  }`}
                >
                  <span className="text-dc-text text-sm font-medium">{opt.label}</span>
                </button>
              )
            })}
          </div>

          {/* Custom text input */}
          <div className="mb-6">
            <label className="block text-dc-muted text-xs mb-2">{labels.customLabel}</label>
            <textarea
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder={labels.customPlaceholder}
              rows={3}
              className="w-full bg-dc-surface/20 border border-dc-surface/30 rounded-xl px-4 py-3 text-sm text-dc-text placeholder-dc-muted/40 resize-none focus:outline-none focus:border-dc-accent/50 transition-colors"
              onFocus={() => setSelectedEmotion("")}
            />
          </div>

          {/* Start button */}
          <button
            onClick={() => handleStart(customText.trim() || selectedEmotion || "放松身心")}
            disabled={false}
            className="w-full py-4 rounded-xl bg-dc-accent/20 hover:bg-dc-accent/30 border border-dc-accent/30 text-dc-accent font-medium transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <span className="flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              {labels.startBtn}
            </span>
          </button>

          {/* Close hint */}
          <p className="mt-6 text-center text-dc-muted/30 text-[10px] tracking-wide">
            {locale === "zh" ? "点击背景或退出可关闭" : "Tap background or exit to close"}
          </p>
        </div>
      </div>
    )
  }

  /* ── Render: LOADING state ── */
  if (state === "loading") {
    return (
      <div className="fixed inset-0 z-[999] flex items-center justify-center">
        <div className="absolute inset-0 bg-dc-deep/90 backdrop-blur-xl -z-10" />
        <div className="relative z-10 flex flex-col items-center gap-6 px-6">
          {/* Spinner */}
          <div className="w-12 h-12 rounded-full border-2 border-dc-accent/30 border-t-dc-accent animate-spin" />
          <p className="text-dc-text/70 text-sm text-center animate-pulse">{labels.generating}</p>
        </div>
      </div>
    )
  }

  /* ── Render: PLAYING / PAUSED state ── */
  if (state === "playing" || state === "paused") {
    const currentLine = tick?.currentLine
    const progress = tick?.sessionProgress ?? 0
    const breathPhase = tick?.breathPhase ?? "neutral"
    const isPaused = state === "paused"

    return (
      <div className="fixed inset-0 z-[999] flex flex-col">
        <div className="absolute inset-0 bg-dc-deep/85 backdrop-blur-sm -z-10" />

        {/* Top bar — close button */}
        <div className="relative z-10 flex justify-end p-4 sm:p-6">
          <button
            onClick={handleExit}
            className="p-2 rounded-full bg-dc-surface/30 hover:bg-dc-surface/50 text-dc-muted hover:text-dc-text transition-all"
            aria-label={labels.exit}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Center content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 max-w-2xl mx-auto w-full">
          {/* Breath indicator — side pill */}
          <div className="mb-8">
            <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-500 ${
              breathPhase === "inhale" ? "bg-teal-500/20 text-teal-300 border border-teal-500/30" :
              breathPhase === "hold"   ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" :
              breathPhase === "exhale" ? "bg-sky-500/20 text-sky-300 border border-sky-500/30" :
              "bg-dc-surface/20 text-dc-muted border border-dc-surface/20"
            }`}>
              {breathPhase === "inhale" ? (locale === "zh" ? "🌬️ 吸气" : "🌬️ Inhale") :
               breathPhase === "hold"   ? (locale === "zh" ? "💎 屏息" : "💎 Hold") :
               breathPhase === "exhale" ? (locale === "zh" ? "🌊 呼气" : "🌊 Exhale") :
               ""}
            </span>
          </div>

          {/* Current line text */}
          <div className="min-h-[6rem] flex items-center justify-center mb-10 w-full">
            {currentLine && (
              <p
                className={`text-lg sm:text-xl text-dc-text/90 text-center leading-relaxed transition-all duration-700 ${
                  lineVisible && !isPaused
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-3"
                }`}
              >
                {currentLine.text}
              </p>
            )}
            {!currentLine && (
              <p className="text-dc-muted/40 text-sm animate-pulse">
                {locale === "zh" ? "即将开始…" : "Starting…"}
              </p>
            )}
          </div>

          {/* Progress bar */}
          <div className="w-full max-w-sm mb-8">
            <div className="h-1 bg-dc-surface/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-dc-accent/50 rounded-full transition-all duration-200"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            {/* Pause / Resume */}
            <button
              onClick={isPaused ? handleResume : handlePause}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-dc-surface/20 hover:bg-dc-surface/35 border border-dc-surface/30 text-dc-text text-sm font-medium transition-all"
            >
              {isPaused ? (
                <><Play className="w-4 h-4" /> {labels.resume}</>
              ) : (
                <><Pause className="w-4 h-4" /> {labels.pause}</>
              )}
            </button>

            {/* Skip */}
            <button
              onClick={handleSkip}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-dc-surface/10 hover:bg-dc-surface/25 border border-dc-surface/20 text-dc-muted text-sm transition-all"
            >
              <SkipForward className="w-4 h-4" /> {labels.skip}
            </button>

            {/* Exit */}
            <button
              onClick={handleExit}
              className="px-4 py-3 rounded-xl bg-dc-surface/10 hover:bg-dc-surface/25 border border-dc-surface/20 text-dc-muted text-sm transition-all"
            >
              {labels.exit}
            </button>
          </div>
        </div>
      </div>
    )
  }

  /* ── Render: COMPLETED state ── */
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      <div className="absolute inset-0 bg-dc-deep/90 backdrop-blur-xl -z-10" onClick={handleCompleteAndExit} />
      <div className="relative z-10 flex flex-col items-center px-6 max-w-sm w-full text-center">
        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-dc-accent/15 flex items-center justify-center mb-6">
          <Sparkles className="w-8 h-8 text-dc-accent/70" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-dc-text mb-3">{labels.completed}</h2>

        {/* Script title */}
        {script && (
          <p className="text-dc-muted text-sm mb-4 leading-relaxed">
            {script.title}
          </p>
        )}

        {/* Stats */}
        <div className="flex gap-6 mb-8">
          <div className="text-center">
            <p className="text-dc-text text-lg font-medium">{Math.round(elapsedSec / 60)}</p>
            <p className="text-dc-muted/50 text-xs">{locale === "zh" ? "分钟" : "min"}</p>
          </div>
          {script && (
            <div className="text-center">
              <p className="text-dc-text text-lg font-medium capitalize">{script.visualTheme}</p>
              <p className="text-dc-muted/50 text-xs">{locale === "zh" ? "主题" : "theme"}</p>
            </div>
          )}
        </div>

        {/* Confirm button */}
        <button
          onClick={handleCompleteAndExit}
          className="px-8 py-3 rounded-xl bg-dc-accent/20 hover:bg-dc-accent/30 border border-dc-accent/30 text-dc-accent font-medium transition-all"
        >
          {locale === "zh" ? "✨ 感觉很好" : "✨ Feel Great"}
        </button>

        <p className="mt-6 text-dc-muted/30 text-[10px] tracking-wide">
          {locale === "zh" ? "点击任意位置关闭" : "Tap anywhere to close"}
        </p>
      </div>
    </div>
  )
}
