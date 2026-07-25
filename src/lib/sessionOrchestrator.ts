/**
 * P3-C Session Orchestrator
 *
 * Pure-logic layer that translates a MeditationScript into real-time
 * audio/visual/breath instructions on each tick.
 *
 * This module does NOT import React — it's safe to use from any context.
 */

import type { MeditationScript, MeditationLine } from "./meditationScriptEngine"

/* ── Exported state snapshot ── */

export interface TickAction {
  /** The line that is currently active */
  currentLine: MeditationLine | null
  /** 0..1 progress within the current line */
  lineProgress: number
  /** 0..1 overall session progress */
  sessionProgress: number
  /** Which breath phase the user should be in right now */
  breathPhase: "inhale" | "hold" | "exhale" | "neutral"
  /** Whether a scene/theme transition is requested this tick */
  transitionRequested: false | { type: "visualTheme" | "audioPreset"; value: string }
}

/* ── Tick computation (pure function, 60fps safe) ── */

export function computeTick(
  script: MeditationScript,
  elapsedSeconds: number,
): TickAction {
  const total = script.totalSeconds
  const clamped = Math.max(0, Math.min(elapsedSeconds, total))
  const sessionProgress = total > 0 ? clamped / total : 0

  // Find active line
  let activeLine: MeditationLine | null = null
  for (let i = script.lines.length - 1; i >= 0; i--) {
    const line = script.lines[i]
    if (clamped >= line.startAt) {
      activeLine = line
      break
    }
  }

  if (!activeLine) {
    return {
      currentLine: null,
      lineProgress: 0,
      sessionProgress,
      breathPhase: "neutral",
      transitionRequested: false,
    }
  }

  const lineProgress = activeLine.durationSec > 0
    ? Math.min(1, (clamped - activeLine.startAt) / activeLine.durationSec)
    : 0

  // Derive breath phase
  const breathPhase = activeLine.breathInstruction || "neutral"

  return {
    currentLine: activeLine,
    lineProgress,
    sessionProgress,
    breathPhase,
    transitionRequested: false,
  }
}

/* ── Session timing (wall clock based, not dependent on setInterval accuracy) ── */

export interface SessionClock {
  startTime: number
  pausedAt: number | null
  totalPausedMs: number
}

export function createSessionClock(): SessionClock {
  return {
    startTime: Date.now(),
    pausedAt: null,
    totalPausedMs: 0,
  }
}

export function getElapsedSeconds(clock: SessionClock): number {
  if (clock.pausedAt !== null) {
    return (clock.pausedAt - clock.startTime - clock.totalPausedMs) / 1000
  }
  return (Date.now() - clock.startTime - clock.totalPausedMs) / 1000
}

export function pauseClock(clock: SessionClock): SessionClock {
  if (clock.pausedAt !== null) return clock
  return { ...clock, pausedAt: Date.now() }
}

export function resumeClock(clock: SessionClock): SessionClock {
  if (clock.pausedAt === null) return clock
  const additionalPaused = Date.now() - clock.pausedAt
  return {
    ...clock,
    pausedAt: null,
    totalPausedMs: clock.totalPausedMs + additionalPaused,
  }
}
