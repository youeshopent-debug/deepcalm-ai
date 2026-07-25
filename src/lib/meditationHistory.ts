/**
 * P3-C Meditation History + Diagnosis Reports — localStorage persistence
 */

import type { VisualTheme } from "./meditationScriptEngine"

const MEDITATION_KEY = "deepcalm_meditation_history"
const DIAGNOSIS_KEY = "deepcalm_diagnosis_reports"
const MAX_SESSIONS = 50
const MAX_DIAGNOSIS_REPORTS = 20

export interface MeditationSession {
  id: string
  date: string       // ISO date string
  duration: number   // seconds
  theme: VisualTheme
  scriptPreview: string  // first 40 chars of script title/lines
  completed: boolean
}

/* ── Diagnosis Report Types ── */

export interface DiagnosisReportData {
  id: string
  date: string               // ISO date string
  anxietyIndex: number       // 0–100
  sleepQuality: number       // 0–100
  cognitivePatterns: string[]
  dialogueRound: number
  summary: string
  locale: string
}

/* ── Meditation: Read ── */

export function getHistory(): MeditationSession[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(MEDITATION_KEY)
    if (!raw) return []
    return JSON.parse(raw) as MeditationSession[]
  } catch {
    return []
  }
}

/* ── Meditation: Write ── */

export function saveSession(session: MeditationSession): void {
  if (typeof window === "undefined") return
  try {
    const history = getHistory()
    history.unshift(session)
    if (history.length > MAX_SESSIONS) {
      history.length = MAX_SESSIONS
    }
    localStorage.setItem(MEDITATION_KEY, JSON.stringify(history))
  } catch {
    // localStorage full or unavailable — silently ignore
  }
}

/* ── Meditation: Streak calculation ── */

export function getStreak(): number {
  const history = getHistory()
  if (history.length === 0) return 0

  const uniqueDays = new Set<string>()
  for (const s of history) {
    if (s.completed) {
      uniqueDays.add(s.date.slice(0, 10))
    }
  }

  const sorted = [...uniqueDays].sort().reverse()
  if (sorted.length === 0) return 0

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

/* ── Meditation: Recent sessions ── */

export function getRecentSessions(n: number = 5): MeditationSession[] {
  return getHistory().slice(0, n)
}

/* ── Generate unique id ── */

export function generateSessionId(): string {
  return `med_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

/* ═══════════════════════════════════════════
   Diagnosis Report Storage
   ═══════════════════════════════════════════ */

/* ── Diagnosis: Write ── */

export function saveDiagnosisReport(report: DiagnosisReportData): void {
  if (typeof window === "undefined") return
  try {
    const reports = getDiagnosisReports()
    reports.unshift(report)
    if (reports.length > MAX_DIAGNOSIS_REPORTS) {
      reports.length = MAX_DIAGNOSIS_REPORTS
    }
    localStorage.setItem(DIAGNOSIS_KEY, JSON.stringify(reports))
  } catch {
    // silently ignore
  }
}

/* ── Diagnosis: Read all ── */

export function getDiagnosisReports(): DiagnosisReportData[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(DIAGNOSIS_KEY)
    if (!raw) return []
    return JSON.parse(raw) as DiagnosisReportData[]
  } catch {
    return []
  }
}

/* ── Diagnosis: Get latest ── */

export function getLatestDiagnosisReport(): DiagnosisReportData | null {
  const reports = getDiagnosisReports()
  return reports.length > 0 ? reports[0] : null
}

/* ── Diagnosis: Generate report id ── */

export function generateDiagnosisId(): string {
  return `diag_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}
