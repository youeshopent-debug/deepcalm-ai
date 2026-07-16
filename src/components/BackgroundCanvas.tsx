"use client"

import { useRef, useEffect } from "react"
import { useTheme, type ThemeType } from "@/context/ThemeContext"
import { audioEngine } from "@/lib/audioEngine"

const BREATH_MS = 19000
const T_INHALE = 0.21
const T_HOLD = 0.58
const FOV = 600
const DEPTH = 1000
const HALF_DEPTH = 500
const COUNT_DESKTOP = 280
const COUNT_MOBILE = 140
const SNOW_COUNT_DESKTOP = 360
const SNOW_COUNT_MOBILE = 200

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
  winter_night: { bright: { r: 220, g: 235, b: 255 }, mid: { r: 180, g: 200, b: 240 }, dim: { r: 100, g: 120, b: 180 } },
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
  /* ── breathing bridge: prefer audioEngine, fallback to local timer ── */
  const breathPhaseRef = useRef<'inhale' | 'hold' | 'exhale' | 'done' | null>(null)
  const breathProgressRef = useRef(0)

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

      /* ── breathing bridge: read from audioEngine if active ── */
      const enginePhase = audioEngine.breathingPhase
      const engineProgress = audioEngine.breathingProgress
      let breathZ: number
      if (enginePhase !== null) {
        /* sync with BreathingGuide / audioEngine */
        breathPhaseRef.current = enginePhase
        breathProgressRef.current = engineProgress
        const p = engineProgress
        if (enginePhase === 'inhale') {
          breathZ = p * 200
        } else if (enginePhase === 'hold') {
          breathZ = 200
        } else { /* exhale */
          breathZ = 200 - p * 200
        }
      } else {
        /* fallback: independent 4-7-8 timer when engine not running */
        const t = (elapsed % BREATH_MS) / BREATH_MS
        if (t < T_INHALE) {
          breathZ = (t / T_INHALE) * 200
          breathPhaseRef.current = 'inhale'
          breathProgressRef.current = t / T_INHALE
        } else if (t < T_HOLD) {
          breathZ = 200
          breathPhaseRef.current = 'hold'
          breathProgressRef.current = (t - T_INHALE) / (T_HOLD - T_INHALE)
        } else {
          breathZ = 200 - ((t - T_HOLD) / (1 - T_HOLD)) * 200
          breathPhaseRef.current = 'exhale'
          breathProgressRef.current = (t - T_HOLD) / (1 - T_HOLD)
        }
      }

      const w = window.innerWidth
      const h = window.innerHeight
      const isSnow = theme === 'winter_night'

      /* ── for snowfall, recreate particles with larger spread & size ── */
      if (isSnow && pRef.current.length > 0 && pRef.current[0].vx > 0.5) {
        /* already snow-initialized, skip */
      } else if (isSnow) {
        const snowCount = isMobile ? SNOW_COUNT_MOBILE : SNOW_COUNT_DESKTOP
        const spread = Math.min(w, h) * 0.8
        pRef.current = Array.from({ length: snowCount }, () => ({
          x: (Math.random() - 0.5) * spread,
          y: (Math.random() - 0.5) * spread,
          z: (Math.random() - 0.5) * DEPTH,
          vx: 0.6 + Math.random() * 0.5,  /* flag: >0.5 = snow-init */
          vy: 0,
          vz: 0,
          r: 2.0 + Math.random() * 4.0,
          phase: Math.random() * Math.PI * 2,
        }))
      }

      if (!isSnow) {
        /* slow Y-axis rotation (only for non-snow modes) */
        angleRef.current += 0.002
      }

      const cx = w / 2
      const cy = h / 2
      const cosA = Math.cos(angleRef.current)
      const sinA = Math.sin(angleRef.current)
      const halfH = h / 2

      /* painter's algorithm: sort far→near */
      const sorted = [...pRef.current].sort((a, b) => b.z - a.z)

      ctx.clearRect(0, 0, w, h)

      const pal = PALETTES[theme] ?? PALETTES.deepcalm

      for (const p of sorted) {
        let rx: number, rz: number

        if (isSnow) {
          /* ── 3D Snowfall mode: gravity + 3-layer sway + breath-modulated ── */
          const speedMul = breathPhaseRef.current === 'exhale' ? 1.25
            : breathPhaseRef.current === 'inhale' ? 0.5
            : 1.0
          /* gravity – slower at top (far z), faster near bottom (near z) */
          const zDepth = (p.z + HALF_DEPTH) / DEPTH  /* 0..1 */
          const gravity = (0.18 + zDepth * 0.25) * speedMul
          p.y += gravity
          /* 3-layer horizontal sway: primary + micro-turbulence + infraslow wave */
          p.x += Math.sin(elapsed * 0.0012 + p.phase) * 0.35 * speedMul
               + Math.sin(elapsed * 0.004 + p.phase * 2.7) * 0.08
          /* Z-axis drift for depth parallax */
          p.z += Math.sin(elapsed * 0.0005 + p.phase * 1.7) * 0.06 * speedMul
          /* reset when falls off bottom – re-spawn at random depth for variety */
          if (p.y > halfH + 150) {
            p.y = -halfH - 80
            p.x = (Math.random() - 0.5) * Math.min(w, h) * 0.8
            p.z = (Math.random() - 0.5) * DEPTH
            p.r = 2.0 + Math.random() * 4.0
            p.phase = Math.random() * Math.PI * 2
          }
          rx = p.x
          rz = p.z
        } else {
          /* gentle Brownian drift */
          p.x += Math.sin(elapsed * 0.0003 + p.phase) * p.vx
          p.y += Math.cos(elapsed * 0.0004 + p.phase) * p.vy
          p.z += Math.sin(elapsed * 0.0002 + p.phase * 1.3) * p.vz

          /* Y-axis rotation */
          rx = p.x * cosA - p.z * sinA
          rz = p.x * sinA + p.z * cosA
        }

        /* breathing modulates Z depth – particles near centre shift more */
        const bz = rz + breathZ * (rz / HALF_DEPTH) * 0.5

        /* perspective projection */
        const d = FOV + bz
        if (d <= 0) continue
        const sx = cx + (rx * FOV) / d
        const sy = cy + (p.y * FOV) / d
        const baseR = isSnow ? p.r * 2.2 : p.r
        const sr = Math.max(0.3, (baseR * FOV) / d)

        /* depth-normalised [0..1]: 0 = front, 1 = back */
        const zNorm = Math.max(0, Math.min(1, (bz + HALF_DEPTH) / DEPTH))

        /* alpha fades with depth + brightens during inhale */
        const baseAlpha = isSnow ? 0.85 - zNorm * 0.50 : 0.55 - zNorm * 0.45
        const breathBoost = 1.0 + (breathZ / 200) * 0.35
        const finalAlpha = Math.min(0.95, baseAlpha * breathBoost)

        /* colour interpolated by depth */
        const rgb = lerpRGB(pal.bright, pal.dim, zNorm)

        ctx.beginPath()
        if (isSnow && sr > 1.5) {
          /* ── 6-point snowflake crystal for larger flakes ── */
          const spokes = 6
          const step = (Math.PI * 2) / spokes
          ctx.moveTo(sx + sr, sy)
          for (let i = 1; i < spokes; i++) {
            const a = step * i
            /* outer point */
            ctx.lineTo(sx + Math.cos(a) * sr, sy + Math.sin(a) * sr)
            /* inner notch */
            const notchA = a + step / 2
            ctx.lineTo(sx + Math.cos(notchA) * sr * 0.35, sy + Math.sin(notchA) * sr * 0.35)
          }
          ctx.closePath()
        } else {
          ctx.arc(sx, sy, sr, 0, Math.PI * 2)
        }
        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${finalAlpha})`
        ctx.fill()

        /* subtle glow on near, bright particles / snowflakes */
        if (zNorm < (isSnow ? 0.55 : 0.35) && sr > (isSnow ? 0.4 : 0.8)) {
          ctx.beginPath()
          if (isSnow) {
            /* soft radial gradient glow for snowflakes */
            const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, sr * 4.5)
            grad.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},${finalAlpha * 0.25})`)
            grad.addColorStop(1, `rgba(${rgb.r},${rgb.g},${rgb.b},0)`)
            ctx.fillStyle = grad
            ctx.arc(sx, sy, sr * 4.5, 0, Math.PI * 2)
          } else {
            ctx.arc(sx, sy, sr * 2.8, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${finalAlpha * 0.07})`
          }
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
