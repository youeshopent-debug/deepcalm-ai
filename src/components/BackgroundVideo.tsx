"use client"

import { useEffect, useRef, useState } from "react"

export type VisualTheme = "forest" | "twilight" | "deepsea" | "starry"

interface Props {
  theme: VisualTheme
  overlayOpacity?: number
  enabled?: boolean
  breathingPhase?: 'inhale' | 'hold' | 'exhale' | 'done' | null
  breathingProgress?: number
}

const THEME_VIDEO_MAP: Record<VisualTheme, string> = {
  forest: "/videos/forest.mp4",
  twilight: "/videos/forest-bg.mp4",
  deepsea: "/videos/142554-780232278.mp4",
  starry: "/videos/287510.mp4",
}

const THEME_OVERLAY_COLORS: Record<VisualTheme, string> = {
  forest: "rgba(10,10,18,0.50)",
  twilight: "rgba(15,12,25,0.55)",
  deepsea: "rgba(5,8,20,0.60)",
  starry: "rgba(8,6,18,0.55)",
}

const THEME_RADIALS: Record<VisualTheme, string> = {
  forest:
    "radial-gradient(ellipse at top, rgba(126,184,255,0.06), transparent 60%), radial-gradient(ellipse at bottom, rgba(78,205,196,0.04), transparent 70%)",
  twilight:
    "radial-gradient(ellipse at top, rgba(200,160,220,0.06), transparent 55%), radial-gradient(ellipse at bottom, rgba(255,180,100,0.04), transparent 65%)",
  deepsea:
    "radial-gradient(ellipse at top, rgba(40,120,210,0.08), transparent 55%), radial-gradient(ellipse at bottom, rgba(20,60,120,0.05), transparent 65%)",
  starry:
    "radial-gradient(ellipse at top, rgba(160,120,240,0.06), transparent 55%), radial-gradient(ellipse at bottom, rgba(100,60,180,0.04), transparent 65%)",
}

export default function BackgroundVideo({
  theme,
  overlayOpacity = 0.5,
  enabled = true,
  breathingPhase = null,
  breathingProgress = 0,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [allowMotion, setAllowMotion] = useState(false)
  const [loadedTheme, setLoadedTheme] = useState<VisualTheme | null>(null)
  const [failedTheme, setFailedTheme] = useState<VisualTheme | null>(null)

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setAllowMotion(!preference.matches)
    sync()
    preference.addEventListener("change", sync)
    return () => preference.removeEventListener("change", sync)
  }, [])

  useEffect(() => {
    setLoadedTheme(null)
    setFailedTheme(null)
  }, [theme, allowMotion, enabled])

  // Breathing → video playbackRate modulation
  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return
    if (!breathingPhase || breathingPhase === "done") {
      vid.playbackRate = 1.0
      return
    }
    if (breathingPhase === "inhale") {
      // Slow down during inhale: 1.0 → 0.8 over the phase
      vid.playbackRate = 1.0 - breathingProgress * 0.2
    } else if (breathingPhase === "hold") {
      vid.playbackRate = 0.8
    } else if (breathingPhase === "exhale") {
      // Speed up during exhale: 0.8 → 1.2 over the phase
      vid.playbackRate = 0.8 + breathingProgress * 0.4
    }
  }, [breathingPhase, breathingProgress, allowMotion, theme])

  // Compute overlay opacity with subtle breathing modulation
  const baseOverlay = overlayOpacity
  let breathMod = 0
  if (breathingPhase && breathingPhase !== "done") {
    if (breathingPhase === "inhale") {
      breathMod = -breathingProgress * 0.03 // slightly lighter during inhale
    } else if (breathingPhase === "hold") {
      breathMod = -0.03
    } else if (breathingPhase === "exhale") {
      breathMod = -0.03 + breathingProgress * 0.03 // return to base
    }
  }
  const effectiveOverlay = Math.min(Math.max(baseOverlay + breathMod, 0.3), 0.8)

  if (!enabled) return null

  const forestImage = theme === "forest" || theme === "twilight"

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#10221c]">
      {forestImage && (
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("/images/sleep-forest.webp")' }} />
      )}
      {/* Video player */}
      {allowMotion && failedTheme !== theme && (
        <video
          ref={videoRef}
          key={theme}
          src={THEME_VIDEO_MAP[theme]}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          onCanPlay={() => setLoadedTheme(theme)}
          onError={() => setFailedTheme(theme)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            loadedTheme === theme ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* backdrop-blur 柔化: 降低视频压缩颗粒感 */}
      <div className="absolute inset-0 backdrop-blur-[2px] pointer-events-none" />

      {/* 暗色柔化覆盖层: 进一步抑制颗粒感 */}
      <div className="absolute inset-0 bg-black/15 pointer-events-none" />

      {/* Theme-aware overlay */}
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{
          backgroundColor: THEME_OVERLAY_COLORS[theme],
          opacity: effectiveOverlay,
          backgroundImage: THEME_RADIALS[theme],
        }}
      />
    </div>
  )
}
