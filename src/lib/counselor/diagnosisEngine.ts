/**
 * 客户端诊断引擎
 *
 * 职责：
 * 1. 构建增强版 API payload（注入 CBT-I+MBSR System Prompt）
 * 2. 解析 AI 回复中的三段式结构（现状解析 / 科学原理对齐 / 即时行动方案）
 * 3. 检测急性焦虑 → 触发冥想引导
 * 4. 计算焦虑指数和睡眠质量评分
 * 5. 生成结构化的诊断报告
 */

import type { Locale } from "@/types"
import { buildSystemPrompt, DIAGNOSIS_SECTION_LABELS, ACUTE_ANXIETY_SIGNALS } from "./counselorSystemPrompts"
import { assessEmotionalIntensity, detectPatterns } from "./cognitivePatterns"

// ─── Types ───

export interface EnhancedPayload {
  text: string
  mode: "chat"
  history: { role: "user" | "counselor"; content: string }[]
  locale: Locale
  systemPrompt: string
  dialogueRound: number
}

export interface ParsedResponse {
  analysis: string
  scienceAlignment: string
  actionPlan: string
  raw: string
}

export interface AcuteAnxietyResult {
  isAcute: boolean
  emotion: string
  severity: "low" | "medium" | "high" | "crisis"
  reason: string
}

export interface DiagnosisReport {
  id: string
  date: string
  type: "diagnosis"
  anxietyIndex: number       // 0–100
  sleepQuality: number       // 0–100
  cognitivePatterns: string[]
  dialogueRound: number
  summary: string
  locale: Locale
}

// ─── 1. Build Enhanced Payload ───

export function buildDiagnosisPayload(
  text: string,
  history: { role: "user" | "counselor"; content: string }[],
  locale: Locale,
  dialogueRound: number,
): EnhancedPayload {
  const systemPrompt = buildSystemPrompt({
    locale,
    dialogueRound,
  })

  return {
    text,
    mode: "chat",
    history,
    locale,
    systemPrompt,
    dialogueRound,
  }
}

// ─── 2. Parse Structured Response ───

export function parseStructuredResponse(raw: string, locale: Locale): ParsedResponse {
  const labels = DIAGNOSIS_SECTION_LABELS[locale] ?? DIAGNOSIS_SECTION_LABELS.zh
  const fallback: ParsedResponse = { analysis: "", scienceAlignment: "", actionPlan: "", raw }

  // Extract sections by label
  const analysisIdx = raw.indexOf(labels.analysis)
  const scienceIdx = raw.indexOf(labels.science)
  const actionIdx = raw.indexOf(labels.action)

  if (analysisIdx === -1 && scienceIdx === -1 && actionIdx === -1) {
    // No structured labels found — treat entire response as raw analysis
    return { ...fallback, analysis: raw }
  }

  // Extract each section using label boundaries
  const extract = (labelStart: number, labelEnd: number): string => {
    if (labelStart === -1) return ""
    const contentStart = labelStart + labels.analysis.length // approximate label length
    const end = labelEnd === -1 ? raw.length : labelEnd
    return raw.slice(contentStart, end).trim()
  }

  // Determine label length for each locale
  const labelLen = (label: string): number => label.length

  const extractSection = (start: number, end: number, label: string): string => {
    if (start === -1) return ""
    const startPos = start + labelLen(label)
    const endPos = end === -1 ? raw.length : end
    return raw.slice(startPos, endPos).trim()
  }

  const analysis = analysisIdx !== -1
    ? extractSection(analysisIdx, scienceIdx !== -1 ? scienceIdx : actionIdx !== -1 ? actionIdx : -1, labels.analysis)
    : ""

  const scienceAlignment = scienceIdx !== -1
    ? extractSection(scienceIdx, actionIdx !== -1 ? actionIdx : -1, labels.science)
    : ""

  const actionPlan = actionIdx !== -1
    ? extractSection(actionIdx, -1, labels.action)
    : ""

  return {
    analysis: analysis || raw, // fallback to raw if no analysis section found
    scienceAlignment,
    actionPlan,
    raw,
  }
}

// ─── 3. Detect Acute Anxiety ───

export function detectAcuteAnxiety(text: string, locale: Locale): AcuteAnxietyResult {
  const intensity = assessEmotionalIntensity(text)
  const patterns = detectPatterns(text, locale)
  const lowerText = text.toLowerCase()

  // Check crisis signals first
  if (intensity === "crisis") {
    return {
      isAcute: true,
      emotion: "crisis",
      severity: "crisis",
      reason: "检测到极端情绪信号，需立即进行危机干预。",
    }
  }

  // Check acute anxiety signal keywords
  const signals = ACUTE_ANXIETY_SIGNALS[locale] ?? ACUTE_ANXIETY_SIGNALS.zh
  const matchedSignals = signals.filter((s) => lowerText.includes(s.toLowerCase()))

  // Check for anxiety-related cognitive distortions
  const anxietyPatterns = patterns.patterns.filter((p) =>
    ["catastrophizing", "fortune_telling", "emotional_reasoning", "overgeneralization"].includes(p.type),
  )

  const hasAnxietyPatterns = anxietyPatterns.length >= 2
  const hasSignalKeywords = matchedSignals.length >= 1
  const isHighEmotion = intensity === "high"

  if ((hasSignalKeywords || hasAnxietyPatterns) && isHighEmotion) {
    return {
      isAcute: true,
      emotion: "anxiety",
      severity: "high",
      reason: matchedSignals.length > 0
        ? `检测到急性焦虑信号词：「${matchedSignals.slice(0, 3).join("、")}」`
        : "检测到灾难化/过度担忧等认知扭曲模式，伴随高强度情绪。",
    }
  }

  if (hasSignalKeywords || hasAnxietyPatterns) {
    return {
      isAcute: true,
      emotion: "anxiety",
      severity: "medium",
      reason: "检测到焦虑相关信号，建议提供正念引导。",
    }
  }

  return {
    isAcute: false,
    emotion: "calm",
    severity: "low",
    reason: "未检测到急性焦虑信号。",
  }
}

// ─── 4. Calculate Indices ───

/**
 * 计算焦虑指数 (0–100)
 *
 * 加权因子：
 * - 认知扭曲数量和严重度 (40%)
 * - 情感强度 (30%)
 * - 文本中的焦虑关键词密度 (30%)
 */
export function calculateAnxietyIndex(
  text: string,
  locale: Locale,
): number {
  const patterns = detectPatterns(text, locale)
  const intensity = assessEmotionalIntensity(text)

  // Factor 1: Cognitive distortion score (0–40)
  const severityWeight: Record<string, number> = { mild: 0.3, moderate: 0.6, severe: 1.0 }
  const patternScore = patterns.patterns.reduce((acc, p) => {
    const weight = severityWeight[p.severity] ?? 0.3
    return acc + weight
  }, 0)
  const normalizedPatternScore = Math.min((patternScore / 4) * 40, 40)

  // Factor 2: Emotional intensity score (0–30)
  const intensityMap: Record<string, number> = { low: 0, medium: 15, high: 25, crisis: 30 }
  const intensityScore = intensityMap[intensity] ?? 0

  // Factor 3: Signal keyword density (0–30)
  const signals = ACUTE_ANXIETY_SIGNALS[locale] ?? ACUTE_ANXIETY_SIGNALS.zh
  const lowerText = text.toLowerCase()
  const matchedCount = signals.filter((s) => lowerText.includes(s.toLowerCase())).length
  const keywordDensity = Math.min((matchedCount / Math.max(signals.length, 1)) * 30, 30)

  const total = Math.round(normalizedPatternScore + intensityScore + keywordDensity)
  return Math.min(Math.max(total, 0), 100)
}

/**
 * 计算睡眠质量指数 (0–100)
 *
 * 基于用户描述的睡眠相关关键词检测：
 * - 正面信号加分（如"睡得好"、"恢复"、"深度睡眠"）
 * - 负面信号减分（如"失眠"、"早醒"、"多梦"、"入睡困难"）
 */
export function calculateSleepQuality(
  text: string,
  locale: Locale,
): number {
  const sleepPositive: Record<string, string[]> = {
    zh: ["睡得好", "睡眠不错", "恢复", "深度睡眠", "一觉到天亮", "自然醒", "精力充沛", "睡眠充足"],
    en: ["sleep well", "good sleep", "restful", "deep sleep", "slept through", "refreshed", "energetic", "well-rested"],
  }
  const sleepNegative: Record<string, string[]> = {
    zh: ["失眠", "入睡困难", "早醒", "多梦", "噩梦", "睡不着", "睡眠浅", "醒得早", "辗转反侧", "睡眠不足", "疲惫", "没睡好"],
    en: ["insomnia", "can't sleep", "wake up early", "vivid dreams", "nightmare", "trouble sleeping", "light sleep", "restless", "tired", "sleep deprivation", "exhausted"],
  }

  const lowerText = text.toLowerCase()
  const posSignals = (sleepPositive[locale] ?? sleepPositive.zh)
  const negSignals = (sleepNegative[locale] ?? sleepNegative.zh)

  const posCount = posSignals.filter((s) => lowerText.includes(s.toLowerCase())).length
  const negCount = negSignals.filter((s) => lowerText.includes(s.toLowerCase())).length

  // Baseline: 50 (neutral)
  const baseScore = 50
  const posBoost = Math.min(posCount * 15, 40)
  const negPenalty = Math.min(negCount * 12, 50)

  const score = Math.round(baseScore + posBoost - negPenalty)
  return Math.min(Math.max(score, 0), 100)
}

// ─── 5. Generate Diagnosis Report ───

export function generateDiagnosisReport(
  messages: { role: "user" | "counselor"; content: string }[],
  locale: Locale,
  dialogueRound: number,
): DiagnosisReport {
  // Combine all user messages for analysis
  const userText = messages
    .filter((m) => m.role === "user")
    .map((m) => m.content)
    .join("\n")

  // Get the last counselor response for summary
  const lastCounselorMsg = [...messages].reverse().find((m) => m.role === "counselor")
  const lastResponse = lastCounselorMsg?.content ?? ""

  // Calculate indices
  const anxietyIndex = calculateAnxietyIndex(userText, locale)
  const sleepQuality = calculateSleepQuality(userText, locale)

  // Detect cognitive patterns
  const patterns = detectPatterns(userText, locale)
  const patternNames = patterns.patterns.map((p) => p.type)

  // Generate summary from the parsed response
  const parsed = parseStructuredResponse(lastResponse, locale)
  const summary = parsed.analysis
    ? parsed.analysis.slice(0, 200)
    : `焦虑指数：${anxietyIndex}/100，睡眠质量：${sleepQuality}/100。检测到 ${patterns.patterns.length} 种认知扭曲模式。`

  const id = `diag_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`

  return {
    id,
    date: new Date().toISOString(),
    type: "diagnosis",
    anxietyIndex,
    sleepQuality,
    cognitivePatterns: patternNames,
    dialogueRound,
    summary,
    locale,
  }
}
