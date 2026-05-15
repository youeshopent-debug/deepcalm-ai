"use client"

import { useRef, useEffect } from "react"
import { useTheme, type ThemeType } from "@/context/ThemeContext"

const BREATH_MS = 19000
const T_INHALE = 0.21
const T_HOLD = 0.58

interface Dot {
  x: number; y: number
  sx: number; sy: number
  r: number; a: number
  phase: number
}

function dots(count: number, w: number, h: number): Dot[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    sx: (Math.random() - 0.5) * 0.3,
    sy: (Math.random() - 0.5) * 0.3,
    r: 1.5 + Math.random() * 2.5,
    a: 0.04 + Math.random() * 0.06,
    phase: Math.random() * Math.PI * 2,
  }))
}

function color(theme: ThemeType, alpha: number): string {
  const map: Record<ThemeType, string> = {
    deepcalm: `rgba(126,184,255,${alpha})`,
    forest: `rgba(74,122,58,${alpha})`,
    twilight: `rgba(74,138,186,${alpha})`,
    earth: `rgba(184,148,90,${alpha})`,
  }
  return map[theme] ?? map.deepcalm
}

export default function BackgroundCanvas({ videoMode }: { videoMode?: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const pRef = useRef<Dot[]>([])
  const rid = useRef(0)
  const t0 = useRef(0)

  useEffect(() => {
    const c = canvas.current
    if (!c) return
    const ctx = c.getContext("2d")
    if (!ctx) return

    const count = videoMode ? 12 : 60
    const resize = () => {
      c.width = window.innerWidth
      c.height = window.innerHeight
      pRef.current = dots(count, c.width, c.height)
    }
    resize()
    window.addEventListener("resize", resize)

    const draw = (now: number) => {
      if (!ctx || !c) return
      if (!t0.current) t0.current = now
      const t = (now - t0.current) % BREATH_MS / BREATH_MS

      let scale: number
      if (t < T_INHALE) {
        scale = 0.8 + (t / T_INHALE) * 0.4
      } else if (t < T_HOLD) {
        scale = 1.2 - ((t - T_INHALE) / (T_HOLD - T_INHALE)) * 0.05
      } else {
        scale = 1.15 - ((t - T_HOLD) / (1 - T_HOLD)) * 0.35
      }

      ctx.clearRect(0, 0, c.width, c.height)

      const cx = c.width / 2
      const cy = c.height / 2
      const drift = (scale - 1) * 80

      for (const p of pRef.current) {
        const dx = p.x - cx
        const dy = p.y - cy
        const dist = Math.sqrt(dx * dx + dy * dy) || 1
        const ang = Math.atan2(dy, dx)

        const tx = cx + Math.cos(ang) * (dist + drift)
        const ty = cy + Math.sin(ang) * (dist + drift)
        p.x += (tx - p.x) * 0.05
        p.y += (ty - p.y) * 0.05

        p.x += Math.sin(now * 0.0005 + p.phase) * p.sx
        p.y += Math.cos(now * 0.0007 + p.phase) * p.sy

        const alpha = p.a * Math.min(1.4, scale + 0.2)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * scale, 0, Math.PI * 2)
        ctx.fillStyle = color(theme, Math.max(0, Math.min(1, alpha)))
        ctx.fill()
      }

      rid.current = requestAnimationFrame(draw)
    }

    rid.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rid.current)
      window.removeEventListener("resize", resize)
      t0.current = 0
    }
  }, [theme, videoMode])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {videoMode ? null : <div className="absolute inset-0 bg-[var(--dc-deep)]" />}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--dc-surface)]/50" />
      <canvas
        ref={canvas}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  )
}
