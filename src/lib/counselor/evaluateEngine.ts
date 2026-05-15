import type {
  EngineOutput,
  EvaluationResult,
  SevenDimensionScore,
  Locale,
} from "@/types"

type EvaluateMeta = {
  locale: Locale
  crisis: boolean
  patternCount: number
}

function clamp(n: number, min = 0, max = 1): number {
  return Math.max(min, Math.min(max, n))
}

function dim(v: number): number {
  return Math.round(clamp(v, 0, 1) * 100) / 100
}

function evaluateRelevance(output: EngineOutput, meta: EvaluateMeta): number {
  let score = 0.9
  if (!output.thinkingPattern || output.thinkingPattern.length < 5) score -= 0.3
  if (!output.encouragement || output.encouragement.length < 10) score -= 0.2
  if (!output.steps || output.steps.length === 0) score -= 0.4
  if (meta.crisis && output.crisisResources === undefined) score -= 0.3
  return dim(score)
}

function evaluateEmpathy(output: EngineOutput, _meta: EvaluateMeta): number {
  let score = 0.85
  const v = output.emotionalValidation
  if (!v) score -= 0.3
  else {
    if (!v.validationStatement || v.validationStatement.length < 15) score -= 0.2
    // 深度共情：较长的 validationStatement 表明更深入的情感理解
    if (v.validationStatement && v.validationStatement.length >= 40) score += 0.1
    // emotionAppeal 长度反映对用户情感诉求的识别深度
    if (v.emotionAppeal && v.emotionAppeal.length >= 20) score += 0.05
    // secondaryEmotion 表明多维度情感感知能力
    if (v.secondaryEmotion) score += 0.05
  }
  // 认知重构深度：cognitiveTiers 展示了对用户思维模式的逐层剖析
  if (output.cognitiveTiers) {
    const t = output.cognitiveTiers
    if (t.nastLevel.length > 0) score += 0.05
    if (t.intermediateBeliefs.length > 0) score += 0.05
  }
  // 任务拆解展示落地关怀
  if (output.taskDecomposition && output.taskDecomposition.steps.length >= 2) score += 0.05
  return dim(score)
}

function evaluateDepth(output: EngineOutput, meta: EvaluateMeta): number {
  let score = 0.75
  if (!output.cognitiveTiers) score -= 0.2
  else {
    const t = output.cognitiveTiers
    if (t.nastLevel.length > 0) score += 0.1
    if (t.intermediateBeliefs.length > 0) score += 0.1
    if (t.coreBeliefs.length > 0) score += 0.1
  }
  if (!output.taskDecomposition) score -= 0.15
  if (meta.patternCount === 0) score -= 0.1
  return dim(score)
}

function evaluateSafety(output: EngineOutput, meta: EvaluateMeta): number {
  let score = 1.0
  if (meta.crisis) {
    if (!output.crisisResources || output.crisisResources.length === 0) score -= 0.5
    if (!output.encouragement?.toLowerCase().includes("help") && !output.encouragement?.toLowerCase().includes("support")) score -= 0.2
  }
  if (output.steps && output.steps.length > 0) {
    const dangerous = output.steps.filter(s =>
      typeof s === "string"
        ? s.toLowerCase().includes("medication") || s.toLowerCase().includes("prescription")
        : false
    )
    if (dangerous.length > 0) score -= 0.3
  }
  return dim(score)
}

function evaluateActionability(output: EngineOutput, _meta: EvaluateMeta): number {
  let score = 0.8
  if (!output.steps || output.steps.length === 0) score -= 0.4
  else if (output.steps.length >= 3) score += 0.1
  if (!output.taskDecomposition) score -= 0.15
  else if (output.taskDecomposition.steps.length >= 2) score += 0.1
  return dim(score)
}

function evaluateClarity(output: EngineOutput, meta: EvaluateMeta): number {
  let score = 0.85
  const locale = meta.locale
  if (!output.encouragement) score -= 0.2
  if (!output.thinkingPattern) score -= 0.2
  if (locale === "zh") {
    if (output.thinkingPattern && /[a-zA-Z]/.test(output.thinkingPattern.slice(0, 3))) score -= 0.1
  } else {
    if (output.thinkingPattern && /[\u4e00-\u9fff]/.test(output.thinkingPattern.slice(0, 3))) score -= 0.1
  }
  return dim(score)
}

function evaluateCulturalAwareness(output: EngineOutput, meta: EvaluateMeta): number {
  let score = 0.9
  const locale = meta.locale
  if (locale !== "en") {
    if (output.mindfulnessExercise) score += 0.1
  }
  if (locale === "zh") {
    const zhResources = output.crisisResources?.filter(r => r.region === "中国")
    if (zhResources && zhResources.length > 0) score += 0.05
  } else {
    if (!output.crisisResources) score -= 0.15
  }
  return dim(score)
}

const EVALUATORS: Record<keyof SevenDimensionScore, (o: EngineOutput, m: EvaluateMeta) => number> = {
  relevance: evaluateRelevance,
  empathy: evaluateEmpathy,
  depth: evaluateDepth,
  safety: evaluateSafety,
  actionability: evaluateActionability,
  clarity: evaluateClarity,
  culturalAwareness: evaluateCulturalAwareness,
}

const DIMENSION_LABELS: Record<keyof SevenDimensionScore, { zh: string; en: string }> = {
  relevance: { zh: "相关性", en: "Relevance" },
  empathy: { zh: "共情能力", en: "Empathy" },
  depth: { zh: "认知深度", en: "Cognitive Depth" },
  safety: { zh: "安全性", en: "Safety" },
  actionability: { zh: "可执行性", en: "Actionability" },
  clarity: { zh: "表达清晰度", en: "Clarity" },
  culturalAwareness: { zh: "文化适配", en: "Cultural Awareness" },
}

export function evaluateOutput(
  output: EngineOutput,
  meta?: Partial<EvaluateMeta>,
): EvaluationResult {
  const m: EvaluateMeta = {
    locale: meta?.locale || "en",
    crisis: meta?.crisis ?? !!output.crisisResources,
    patternCount: meta?.patternCount ?? output.patternAnalysis?.patternCount ?? 0,
  }

  const score: SevenDimensionScore = {} as SevenDimensionScore
  const breakdown: SevenDimensionScore = {} as SevenDimensionScore
  const weakDimensions: string[] = []
  let totalWeight = 0
  let weightedSum = 0

  const weights: SevenDimensionScore = {
    relevance: 0.2,
    empathy: 0.2,
    depth: 0.15,
    safety: 0.15,
    actionability: 0.1,
    clarity: 0.1,
    culturalAwareness: 0.1,
  }

  for (const key of Object.keys(EVALUATORS) as (keyof SevenDimensionScore)[]) {
    const raw = EVALUATORS[key](output, m)
    score[key] = raw
    breakdown[key] = raw
    weightedSum += raw * weights[key]
    totalWeight += weights[key]
    if (raw < 0.6) {
      const label = m.locale === "zh" ? DIMENSION_LABELS[key].zh : DIMENSION_LABELS[key].en
      weakDimensions.push(label)
    }
  }

  const overall = Math.round((weightedSum / totalWeight) * 100) / 100
  const passed = overall >= 0.7 && weakDimensions.length <= 2

  const isZh = m.locale === "zh"
  const suggestion = passed
    ? isZh ? "质量达标，所有维度均在可接受范围内。" : "Quality OK, all dimensions within acceptable range."
    : isZh
      ? `以下维度需要改进：${weakDimensions.join("、")}。建议优化认知深度与可执行性。`
      : `Dimensions needing improvement: ${weakDimensions.join(", ")}. Consider deepening cognitive analysis and actionability.`

  const instruction = passed
    ? isZh ? "可直接返回用户" : "Ready for user delivery"
    : isZh ? "建议重新生成" : "Recommended to regenerate"

  return { score, dimensionBreakdown: breakdown, overall, passed, weakDimensions, suggestion, instruction }
}
