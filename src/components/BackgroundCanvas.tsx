"use client"

import { useRef, useEffect } from "react"
import { useTheme, type ThemeType } from "@/context/ThemeContext"
import { audioEngine } from "@/lib/audioEngine"

/* ── Breathing constants ─────────────────────────── */
const BREATH_MS = 19000
const T_INHALE = 0.21        /* 4s / 19s */
const T_HOLD = 0.58          /* (4+7)s / 19s */

/* ── 3D camera ────────────────────────────────────── */
const FOCAL_LENGTH = 600
const DEPTH = 1000
const HALF_DEPTH = 500

/* ── General particle counts (non-snow) ───────────── */
const COUNT_DESKTOP = 280
const COUNT_MOBILE = 140

/* ── Snowflake particle counts (per NotebookLM spec) ─ */
const SNOW_DESKTOP = 400
const SNOW_MOBILE = 180

/* ── 3-layer snowflake depth bands ───────────────────
     Far:   high transparency, very slow, tiny particles
     Mid:   standard snowfall
     Near:  large flakes, high alpha, fast horizontal sweep    */
interface LayerDef {
  zMin: number; zMax: number
  rMin: number; rMax: number
  alphaBase: number; alphaRange: number
  speed: number       /* gravity multiplier */
  swayAmp: number     /* horizontal wind amplitude */
  ratio: number       /* fraction of total count */
}
const SNOW_LAYERS: LayerDef[] = [
  { zMin:  150, zMax:  500, rMin: 0.8, rMax: 1.8, alphaBase: 0.30, alphaRange: 0.20, speed: 0.50, swayAmp: 0.20, ratio: 0.45 },
  { zMin: -150, zMax:  150, rMin: 2.0, rMax: 4.0, alphaBase: 0.55, alphaRange: 0.25, speed: 1.00, swayAmp: 0.40, ratio: 0.35 },
  { zMin: -500, zMax: -150, rMin: 4.0, rMax: 7.0, alphaBase: 0.75, alphaRange: 0.20, speed: 1.50, swayAmp: 0.70, ratio: 0.20 },
]

/* ── Wind field: multi-frequency superposition ────── */
const WIND_FREQ = [0.0008, 0.0015, 0.0030, 0.0055, 0.0011]
const WIND_AMP  = [0.35,   0.20,   0.10,   0.04,   0.12]
const WIND_PHASE_MULT = [1.0, 2.3, 4.7, 8.1, 0.6]

/* ── 3D Particle ──────────────────────────────────── */

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

/* ── Snowflake 3-layer initialiser ─────────────────── */
function createSnowParticles(w: number, h: number): Particle3D[] {
  const count = window.innerWidth < 768 ? SNOW_MOBILE : SNOW_DESKTOP
  const spread = Math.min(w, h) * 0.9
  const particles: Particle3D[] = []
  for (const layer of SNOW_LAYERS) {
    const n = Math.round(count * layer.ratio)
    for (let i = 0; i < n; i++) {
      const z = layer.zMin + Math.random() * (layer.zMax - layer.zMin)
      particles.push({
        x: (Math.random() - 0.5) * spread * (1 + (layer.zMax + layer.zMin) / DEPTH),
        y: (Math.random() - 0.5) * spread,
        z,
        vx: 0,  /* not used in snow mode, kept for type compat */
        vy: 0,
        vz: 0,
        r: layer.rMin + Math.random() * (layer.rMax - layer.rMin),
        phase: Math.random() * Math.PI * 2,
      })
    }
  }
  return particles
}

/* ── Snowflake sprite pre-renderer ───────────────────
     Off-screen canvas, 6-point crystal + radial glow
     Baked blur for near-layer sprites                      */

interface SnowSprites {
  small: HTMLCanvasElement   /* ~2px radius */
  medium: HTMLCanvasElement  /* ~4px */
  large: HTMLCanvasElement   /* ~7px */
  glow: HTMLCanvasElement    /* ~12px soft glow */
}

function renderCrystalPath(ctx: CanvasRenderingContext2D, radius: number): void {
  const spokes = 6
  const step = (Math.PI * 2) / spokes
  ctx.moveTo(radius, 0)
  for (let i = 1; i < spokes; i++) {
    const a = step * i
    ctx.lineTo(Math.cos(a) * radius, Math.sin(a) * radius)
    const notchA = a + step / 2
    ctx.lineTo(Math.cos(notchA) * radius * 0.35, Math.sin(notchA) * radius * 0.35)
  }
  ctx.closePath()
}

function createSnowSprite(radius: number, blurPx: number, color: string): HTMLCanvasElement {
  const pad = blurPx * 2 + 4
  const size = Math.ceil((radius + pad) * 2)
  const c = document.createElement("canvas")
  c.width = size
  c.height = size
  const ctx = c.getContext("2d")!
  const cx = size / 2
  const cy = size / 2

  /* ── radial glow behind crystal ── */
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius + blurPx)
  grad.addColorStop(0, color)
  grad.addColorStop(0.4, color.replace("0.", "0.3."))  /* partial transparency */
  grad.addColorStop(1, "rgba(0,0,0,0)")
  ctx.fillStyle = grad
  ctx.beginPath()
  ctx.arc(cx, cy, radius + blurPx, 0, Math.PI * 2)
  ctx.fill()

  /* ── crystal shape ── */
  if (blurPx > 0) {
    ctx.filter = `blur(${blurPx}px)`
  }
  ctx.fillStyle = "rgba(230, 240, 255, 0.92)"
  ctx.beginPath()
  ctx.translate(cx, cy)
  renderCrystalPath(ctx, radius)
  ctx.translate(-cx, -cy)
  ctx.fill()
  ctx.filter = "none"

  return c
}

function preRenderSprites(): SnowSprites {
  const baseColor = "rgba(220, 235, 255, 0.85)"
  return {
    small:  createSnowSprite(2, 0, baseColor),
    medium: createSnowSprite(5, 1, baseColor),
    large:  createSnowSprite(9, 2, baseColor),
    glow:   createSnowSprite(5, 6, baseColor),
  }
}

/* ── Theme colour palette (bright → dim) ──────────── */

interface RGB { r: number; g: number; b: number }
interface Palette { bright: RGB; mid: RGB; dim: RGB }

const PALETTES: Record<ThemeType, Palette> = {
  deepcalm: { bright: { r: 160, g: 200, b: 255 }, mid: { r: 100, g: 150, b: 220 }, dim: { r: 40, g: 70, b: 140 } },
  forest:   { bright: { r: 160, g: 220, b: 130 }, mid: { r: 90, g: 150, b: 70 },  dim: { r: 35, g: 65, b: 30 } },
  twilight: { bright: { r: 210, g: 180, b: 240 }, mid: { r: 140, g: 110, b: 180 }, dim: { r: 60, g: 40, b: 90 } },
  earth:    { bright: { r: 220, g: 190, b: 140 }, mid: { r: 160, g: 130, b: 80 },  dim: { r: 80, g: 60, b: 35 } },
  deepsea:  { bright: { r: 100, g: 180, b: 255 }, mid: { r: 40, g: 110, b: 200 },  dim: { r: 15, g: 50, b: 120 } },
  starry:   { bright: { r: 200, g: 160, b: 255 }, mid: { r: 130, g: 80, b: 200 },  dim: { r: 55, g: 30, b: 100 } },
  winter_night: { bright: { r: 220, g: 235, b: 255 }, mid: { r: 180, g: 200, b: 240 }, dim: { r: 100, g: 120, b: 180 } },
}

function lerpRGB(a: RGB, b: RGB, t: number): RGB {
  return {
    r: Math.round(a.r + (b.r - a.r) * t),
    g: Math.round(a.g + (b.g - a.g) * t),
    b: Math.round(a.b + (b.b - a.b) * t),
  }
}

/* ── Component ────────────────────────────────────── */

export default function BackgroundCanvas({ videoMode }: { videoMode?: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const pRef = useRef<Particle3D[]>([])
  const rid = useRef(0)
  const t0 = useRef(0)
  const angleRef = useRef(0)
  const spritesRef = useRef<SnowSprites | null>(null)

  /* breathing bridge */
  const breathPhaseRef = useRef<'inhale' | 'hold' | 'exhale' | 'done' | null>(null)
  const breathProgressRef = useRef(0)

  useEffect(() => {
    const c = canvas.current
    if (!c) return
    const ctx = c.getContext("2d")
    if (!ctx) return

    const isMobile = window.innerWidth < 768

    /* pre-render snowflake sprites once */
    spritesRef.current = preRenderSprites()

    /* resize handler */
    const resize = () => {
      c.width = window.innerWidth
      c.height = window.innerHeight
      const w = window.innerWidth
      const h = window.innerHeight
      if (theme === 'winter_night') {
        pRef.current = createSnowParticles(w, h)
      } else {
        const count = isMobile ? COUNT_MOBILE : COUNT_DESKTOP
        pRef.current = createParticles(count, w, h)
      }
    }
    resize()
    window.addEventListener("resize", resize)

    /* ── animation loop ─────────────────────────── */
    const draw = (now: number) => {
      if (!ctx || !c) return
      if (!t0.current) t0.current = now
      const elapsed = now - t0.current

      /* ── breathing bridge ────────────────────────── */
      const enginePhase = audioEngine.breathingPhase
      const engineProgress = audioEngine.breathingProgress
      let breathZ: number
      if (enginePhase !== null) {
        breathPhaseRef.current = enginePhase
        breathProgressRef.current = engineProgress
        const p = engineProgress
        if (enginePhase === 'inhale') {
          breathZ = p * 200
        } else if (enginePhase === 'hold') {
          breathZ = 200
        } else {
          breathZ = 200 - p * 200
        }
      } else {
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

      /* ── lazy initialise snow particles on first draw ── */
      if (isSnow && pRef.current.length === 0) {
        pRef.current = createSnowParticles(w, h)
      }

      if (!isSnow) {
        /* slow Y-axis rotation (only for non-snow modes) */
        angleRef.current += 0.002
      }

      const cx = w / 2
      const cy = h / 2
      const cosA = Math.cos(angleRef.current)
      const sinA = Math.sin(angleRef.current)

      /* ── painter's algorithm: sort far→near ───────── */
      const sorted = [...pRef.current].sort((a, b) => b.z - a.z)

      ctx.clearRect(0, 0, w, h)

      /* ── breath factor for snow mode ───────────── */
      const breathFactor = breathPhaseRef.current === 'exhale' ? 1.5
        : breathPhaseRef.current === 'inhale' ? 0.5
        : 1.0
      /* opacity boost: inhale → dim, exhale → bright */
      const breathOpacity = breathPhaseRef.current === 'exhale' ? 1.0
        : breathPhaseRef.current === 'inhale' ? 0.40
        : 0.75

      const pal = PALETTES[theme] ?? PALETTES.deepcalm
      const sprites = spritesRef.current

      for (const p of sorted) {
        let rx: number, ry: number, rz: number

        if (isSnow) {
          /* ── Snowflake physics ────────────────────── */

          /* gravity by depth */
          const zDepth = (p.z + HALF_DEPTH) / DEPTH   /* 0..1 */
          const gravity = (0.12 + zDepth * 0.28) * breathFactor
          p.y += gravity

          /* multi-frequency wind (5 superimposed sine waves) */
          let windX = 0
          for (let i = 0; i < WIND_FREQ.length; i++) {
            windX += Math.sin(elapsed * WIND_FREQ[i] + p.phase * WIND_PHASE_MULT[i]) * WIND_AMP[i]
          }
          p.x += windX * breathFactor

          /* Z-axis drift for depth parallax */
          p.z += Math.sin(elapsed * 0.0005 + p.phase * 1.7) * 0.06 * breathFactor

          /* reset when falls off bottom */
          if (p.y > h / 2 + 120) {
            const layerIdx = Math.floor(Math.random() * SNOW_LAYERS.length)
            const layer = SNOW_LAYERS[layerIdx]
            p.y = -(h / 2) - 60
            p.x = (Math.random() - 0.5) * Math.min(w, h) * 0.9
            p.z = layer.zMin + Math.random() * (layer.zMax - layer.zMin)
            p.r = layer.rMin + Math.random() * (layer.rMax - layer.rMin)
            p.phase = Math.random() * Math.PI * 2
          }

          rx = p.x
          ry = p.y
          rz = p.z
        } else {
          /* gentle Brownian drift */
          p.x += Math.sin(elapsed * 0.0003 + p.phase) * p.vx
          p.y += Math.cos(elapsed * 0.0004 + p.phase) * p.vy
          p.z += Math.sin(elapsed * 0.0002 + p.phase * 1.3) * p.vz

          /* Y-axis rotation */
          rx = p.x * cosA - p.z * sinA
          ry = p.y
          rz = p.x * sinA + p.z * cosA
        }

        /* breathing modulates Z depth */
        const bz = rz + breathZ * (rz / HALF_DEPTH) * 0.5

        /* ── 3D projection ───────────────────────────
             sx = (x / z) * focalLength + centerX
             scale = focalLength / z                         */
        const zd = bz + FOCAL_LENGTH   /* shift to positive domain */
        if (zd <= 0) continue
        const scale = FOCAL_LENGTH / zd
        const sx = cx + rx * scale
        const sy = cy + ry * scale

        /* depth-normalised [0..1]: 0 = front, 1 = back */
        const zNorm = Math.max(0, Math.min(1, (bz + HALF_DEPTH) / DEPTH))

        /* ── colour by depth ───────────────────────── */
        const rgb = lerpRGB(pal.bright, pal.dim, zNorm)
        const baseAlpha = isSnow
          ? (0.75 - zNorm * 0.55) * breathOpacity
          : 0.55 - zNorm * 0.45

        /* ── snowflake rendering (isSnow branch) ──── */
        if (isSnow && sprites) {
          const sr = Math.max(0.4, p.r * scale)
          const finalAlpha = Math.min(0.92, baseAlpha)

          if (sr > 3.5) {
            /* ── Large flake: crystal path + glow ───── */
            /* glow first */
            if (zNorm < 0.6) {
              const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, sr * 4)
              grad.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},${finalAlpha * 0.15})`)
              grad.addColorStop(1, `rgba(${rgb.r},${rgb.g},${rgb.b},0)`)
              ctx.fillStyle = grad
              ctx.beginPath()
              ctx.arc(sx, sy, sr * 4, 0, Math.PI * 2)
              ctx.fill()
            }
            /* crystal */
            ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${finalAlpha})`
            ctx.beginPath()
            renderCrystalPath(ctx, sr)
            ctx.fill()
          } else if (sr > 1.8) {
            /* ── Medium flake: drawImage sprite + tint ── */
            const sprite = sr > 2.8 ? sprites.medium : sprites.small
            const hs = sprite.width / 2
            ctx.globalAlpha = finalAlpha
            ctx.drawImage(sprite, sx - hs, sy - hs)
            ctx.globalAlpha = 1
          } else {
            /* ── Small / far flake: simple dot ─────── */
            ctx.beginPath()
            ctx.arc(sx, sy, Math.max(0.5, sr), 0, Math.PI * 2)
            ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${finalAlpha * 0.8})`
            ctx.fill()
          }
        } else {
          /* ── Non-snow rendering (circle) ──────────── */
          const sr = Math.max(0.3, (p.r * FOCAL_LENGTH) / (FOCAL_LENGTH + bz))
          const finalAlpha = Math.min(0.85, baseAlpha * (1.0 + (breathZ / 200) * 0.35))

          ctx.beginPath()
          ctx.arc(sx, sy, sr, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${finalAlpha})`
          ctx.fill()

          if (zNorm < 0.35 && sr > 0.8) {
            ctx.beginPath()
            ctx.arc(sx, sy, sr * 2.8, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${finalAlpha * 0.07})`
            ctx.fill()
          }
        }
      }

      /* ── Post-processing for snow mode ────────────── */

      if (isSnow) {
        /* 1. Global radial gradient shadow at bottom
              (simulates moonlight behind clouds)          */
        const shadowGrad = ctx.createRadialGradient(
          w / 2, h * 0.85, 0,
          w / 2, h * 0.85, w * 0.7,
        )
        shadowGrad.addColorStop(0, "rgba(20, 30, 60, 0)")
        shadowGrad.addColorStop(0.6, `rgba(10, 20, 45, ${0.12 * breathOpacity})`)
        shadowGrad.addColorStop(1, `rgba(5, 10, 30, ${0.25 * breathOpacity})`)
        ctx.fillStyle = shadowGrad
        ctx.fillRect(0, 0, w, h)

        /* 2. Snow mist layer at bottom edge
              alpha modulated by breathing rhythm           */
        const mistH = Math.min(120, h * 0.08)
        const mistAlpha = 0.08 + (1 - breathOpacity) * 0.12
        const mistGrad = ctx.createLinearGradient(0, h - mistH * 2, 0, h)
        mistGrad.addColorStop(0, "rgba(200, 220, 255, 0)")
        mistGrad.addColorStop(0.5, `rgba(200, 220, 255, ${mistAlpha * 0.5})`)
        mistGrad.addColorStop(1, `rgba(200, 220, 255, ${mistAlpha})`)
        ctx.fillStyle = mistGrad
        ctx.fillRect(0, h - mistH * 2, w, mistH * 2)
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
      <div className="absolute inset-0 bg-[var(--dc-deep)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--dc-surface)]/50" />
      <canvas
        ref={canvas}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  )
}
