"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme, type ThemeType } from "@/context/ThemeContext"
import { audioEngine } from "@/lib/audioEngine"
import AudioMixer from "./AudioMixer"
import BackgroundVideo, { type VisualTheme } from "./BackgroundVideo"
import BackgroundCanvas from "./BackgroundCanvas"

// Map ThemeType to VisualTheme (used when video is rendered)
const THEME_TO_VISUAL: Record<ThemeType, VisualTheme> = {
  deepcalm: "forest",
  forest: "forest",
  twilight: "twilight",
  earth: "forest",
  deepsea: "deepsea",
  starry: "starry",
  winter_night: "starry",
}

export default function BackgroundLayer() {
  const { theme, setTheme: setContextTheme } = useTheme()
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale' | 'done' | null>(null)
  const [breathingProgress, setBreathingProgress] = useState(0)
  const rafRef = useRef<number | null>(null)

  // Poll audioEngine breathing bridge via rAF (no extra context needed)
  useEffect(() => {
    const poll = () => {
      const p = audioEngine.breathingPhase
      const prog = audioEngine.breathingProgress
      setBreathingPhase((prev) => {
        // Reset progress to 0 on phase change
        if (prev !== p) setBreathingProgress(0)
        return p
      })
      if (audioEngine.breathingPhase !== null) {
        setBreathingProgress(audioEngine.breathingProgress)
      }
      rafRef.current = requestAnimationFrame(poll)
    }
    rafRef.current = requestAnimationFrame(poll)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const visualTheme = THEME_TO_VISUAL[theme] || "forest"

  /* winter_night uses Canvas-native snowfall — skip BackgroundVideo entirely */
  const useVideo = theme !== 'winter_night'

  return (
    <>
      {useVideo && (
        <BackgroundVideo
          theme={visualTheme}
          overlayOpacity={0.5}
          enabled={true}
          breathingPhase={breathingPhase}
          breathingProgress={breathingProgress}
        />
      )}

      {/* Canvas layer: videoMode=true emits only ambient gradient when video active;
          videoMode=false (winter_night) renders full snow engine */}
      <BackgroundCanvas videoMode={useVideo} />

      {/* Audio mixer — 6-channel ambient sound control */}
      <AudioMixer />
    </>
  )
}
