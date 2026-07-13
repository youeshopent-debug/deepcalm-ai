"use client"

import { useRef, useEffect } from "react"
import { useTheme, type ThemeType } from "@/context/ThemeContext"

const BREATH_MS = 19000
const T_INHALE = 0.21
const T_HOLD = 0.58
const FOV = 600
const DEPTH = 1000
const HALF_DEPTH = 500
const COUNT_DESKTOP = 280
const COUNT_MOBILE = 140

/* ── 3D Particle ──────────────────────────────── */

interface Particle3D {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
  r: number
  phase: number
}

function createParticles(count: number, w: number, h: number): Particle3D[] {
  const spread = Math.min(w, h) * 0.6
  return Array.from({ length: count }, () => ({
    x: (Math.random() - 0.5) * spread,
    y: (Math.random() - 0.5) * spread,
    z: (Math.random() - 0.5) * DEPTH,
    vx: (Math.random() - 0.5) * 0.15,
    vy: (Math.random() - 0.5) * 0.15,
    vz: (Math.random() - 0.5) * 0.05,
    r: 1.2 + Math.random() * 2.8,
    phase: Math.random() * Math.PI * 2,
  }))
}

/* ── Theme colour palette (bright → dim) ──────── */

interface RGB { r: number; g: number; b: number }
interface Palette { bright: RGB; mid: RGB; dim: RGB }

const PALETTES: Record<ThemeType, Palette> = {
  deepcalm: { bright: { r: 160, g: 200, b: 255 }, mid: { r: 100, g: 150, b: 220 }, dim: { r: 40, g: 70, b: 140 } },
  forest:  { bright: { r: 160, g: 220, b: 130 }, mid: { r: 90, g: 150, b: 70 },  dim: { r: 35, g: 65, b: 30 } },
  twilight:{ bright: { r: 210, g: 180, b: 240 }, mid: { r: 140, g: 110, b: 180 }, dim: { r: 60, g: 40, b: 90 } },
  earth:   { bright: { r: 220, g: 190, b: 140 }, mid: { r: 160, g: 130, b: 80 },  dim: { r: 80, g: 60, b: 35 } },
  deepsea: { bright: { r: 100, g: 180, b: 255 }, mid: { r: 40, g: 110, b: 200 },  dim: { r: 15, g: 50, b: 120 } },
  starry:  { bright: { r: 200, g: 160, b: 255 }, mid: { r: 130, g: 80, b: 200 },  dim: { r: 55, g: 30, b: 100 } },
}

function lerpRGB(a: RGB, b: RGB, t: number): RGB {
  return {
    r: Math.round(a.r + (b.r - a.r) * t),
    g: Math.round(a.g + (b.g - a.g) * t),
    b: Math.round(a.b + (b.b - a.b) * t),
  }
}

/* ── Component ────────────────────────────────── */

export default function BackgroundCanvas({ videoMode }: { videoMode?: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const pRef = useRef<Particle3D[]>([])
  const rid = useRef(0)
  const t0 = useRef(0)
  const angleRef = useRef(0)

  useEffect(() => {
    const c = canvas.current
    if (!c) return
    const ctx = c.getContext("2d")
    if (!ctx) return

    const isMobile = window.innerWidth < 768
    const count = isMobile ? COUNT_MOBILE : COUNT_DESKTOP

    /* resize handler */
    const resize = () => {
      c.width = window.innerWidth
      c.height = window.innerHeight
      pRef.current = createParticles(count, window.innerWidth, window.innerHeight)
    }
    resize()
    window.addEventListener("resize", resize)

    /* animation loop */
    const draw = (now: number) => {
      if (!ctx || !c) return
      if (!t0.current) t0.current = now
      const elapsed = now - t0.current
      const t = (elapsed % BREATH_MS) / BREATH_MS

      /* breathing Z offset: inhale → particles drift forward 200px */
      let breathZ: number
      if (t < T_INHALE) {
        breathZ = (t / T_INHALE) * 200
      } else if (t < T_HOLD) {
        breathZ = 200
      } else {
        breathZ = 200 - ((t - T_HOLD) / (1 - T_HOLD)) * 200
      }

      /* slow Y-axis rotation */
      angleRef.current += 0.002

      const w = window.innerWidth
      const h = window.innerHeight
      const cx = w / 2
      const cy = h / 2
      const cosA = Math.cos(angleRef.current)
      const sinA = Math.sin(angleRef.current)

      /* painter's algorithm: sort far→near */
      const sorted = [...pRef.current].sort((a, b) => b.z - a.z)

      ctx.clearRect(0, 0, w, h)

      const pal = PALETTES[theme] ?? PALETTES.deepcalm

      for (const p of sorted) {
        /* gentle Brownian drift */
        p.x += Math.sin(elapsed * 0.0003 + p.phase) * p.vx
        p.y += Math.cos(elapsed * 0.0004 + p.phase) * p.vy
        p.z += Math.sin(elapsed * 0.0002 + p.phase * 1.3) * p.vz

        /* Y-axis rotation */
        const rx = p.x * cosA - p.z * sinA
        const rz = p.x * sinA + p.z * cosA

        /* breathing modulates Z depth – particles near centre shift more */
        const bz = rz + breathZ * (rz / HALF_DEPTH) * 0.5

        /* perspective projection */
        const d = FOV + bz
        if (d <= 0) continue
        const sx = cx + (rx * FOV) / d
        const sy = cy + (p.y * FOV) / d
        const sr = Math.max(0.3, (p.r * FOV) / d)

        /* depth-normalised [0..1]: 0 = front, 1 = back */
        const zNorm = Math.max(0, Math.min(1, (bz + HALF_DEPTH) / DEPTH))

        /* alpha fades with depth + brightens during inhale */
        const baseAlpha = 0.55 - zNorm * 0.45
        const breathBoost = 1.0 + (breathZ / 200) * 0.35
        const finalAlpha = Math.min(0.92, baseAlpha * breathBoost)

        /* colour interpolated by depth */
        const rgb = lerpRGB(pal.bright, pal.dim, zNorm)

        ctx.beginPath()
        ctx.arc(sx, sy, sr, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${finalAlpha})`
        ctx.fill()

        /* subtle glow on near, bright particles */
        if (zNorm < 0.35 && sr > 0.8) {
          ctx.beginPath()
          ctx.arc(sx, sy, sr * 2.8, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${finalAlpha * 0.07})`
          ctx.fill()
        }
      }

      rid.current = requestAnimationFrame(draw)
    }

    rid.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rid.current)
      window.removeEventListener("resize", resize)
      t0.current = 0
    }
  }, [theme])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* solid dark base – always rendered, no longer dependent on videoMode */}
      <div className="absolute inset-0 bg-[var(--dc-deep)]" />
      {/* subtle surface gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--dc-surface)]/50" />
      <canvas
        ref={canvas}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  )
}
