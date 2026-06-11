/**
 * P3-C Meditation History — localStorage persistence
 */

import type { VisualTheme } from "./meditationScriptEngine"

const STORAGE_KEY = "deepcalm_meditation_history"
const MAX_SESSIONS = 50

export interface MeditationSession {
  id: string
  date: string       // ISO date string
  duration: number   // seconds
  theme: VisualTheme
  scriptPreview: string  // first 40 chars of script title/lines
  completed: boolean
}

/* ── Read ── */

export function getHistory(): MeditationSession[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as MeditationSession[]
  } catch {
    return []
  }
}

/* ── Write ── */

export function saveSession(session: MeditationSession): void {
  if (typeof window === "undefined") return
  try {
    const history = getHistory()
    history.unshift(session)
    // Keep only the most recent N sessions
    if (history.length > MAX_SESSIONS) {
      history.length = MAX_SESSIONS
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
  } catch {
    // localStorage full or unavailable — silently ignore
  }
}

/* ── Streak calculation ── */

export function getStreak(): number {
  const history = getHistory()
  if (history.length === 0) return 0

  // Deduplicate by date (count only one session per day)
  const uniqueDays = new Set<string>()
  for (const s of history) {
    if (s.completed) {
      uniqueDays.add(s.date.slice(0, 10))
    }
  }

  const sorted = [...uniqueDays].sort().reverse()
  if (sorted.length === 0) return 0

  // Count consecutive days from today backwards
  const today = new Date().toISOString().slice(0, 10)
  let streak = 0
  let expected = today

  for (const day of sorted) {
    if (day === expected) {
      streak++
      const d = new Date(expected)
      d.setDate(d.getDate() - 1)
      expected = d.toISOString().slice(0, 10)
    } else {
      break
    }
  }

  return streak
}

/* ── Recent sessions (for display) ── */

export function getRecentSessions(n: number = 5): MeditationSession[] {
  return getHistory().slice(0, n)
}

/* ── Generate unique id ── */

export function generateSessionId(): string {
  return `med_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}
