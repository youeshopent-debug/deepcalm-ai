export type Locale = "zh" | "en" | "ms" | "ja" | "ko" | "th" | "es"

export type NestedKeyOf<T> = T extends object
  ? { [K in keyof T]: K extends string ? `${K}.${NestedKeyOf<T[K]>}` | K : never }[keyof T]
  : ""

export interface SleepResult {
  cycles: number
  bedtime: string
  feelLabel: string
}

// ── 认知扭曲分类 ──

export type CognitiveDistortionType =
  | "catastrophizing"
  | "black_and_white"
  | "mind_reading"
  | "emotional_reasoning"
  | "overgeneralization"
  | "should_statements"
  | "labeling"
  | "personalization"
  | "fortune_telling"
  | "minimization"
  | "comparison"
  | "filtering"

export interface CognitiveDistortion {
  type: CognitiveDistortionType
  labelZh: string
  labelEn: string
  description: string
}

export interface DetectedPattern {
  type: CognitiveDistortionType
  confidence: number
  matchedText: string
  severity: "mild" | "moderate" | "severe"
  reframeSuggestion: string
}

export interface PatternAnalysisResult {
  patterns: DetectedPattern[]
  primaryType: CognitiveDistortionType | null
  patternCount: number
  overallSeverity: "mild" | "moderate" | "severe"
}

// ── 认知重构三层（需求1） ──

export interface CognitiveTiers {
  nastLevel: string[]
  intermediateBeliefs: string[]
  coreBeliefs: string[]
}

// ── 情感验证 ──

export type EmotionalIntensity = "low" | "medium" | "high" | "crisis"

export interface EmotionalValidation {
  intensity: EmotionalIntensity
  primaryEmotion: string
  secondaryEmotion?: string
  emotionAppeal: string
  validationStatement: string
}

// ── 任务拆解 ──

export interface TaskStep {
  stepNumber: number
  title: string
  description: string
  duration: string
  actionable: boolean
}

export interface PhaseBreakdown {
  milestone: string
  miniSteps: string[]
}

export interface TaskDecomposition {
  originalAnxiety: string
  steps: TaskStep[]
  totalSteps: number
  rationale: string
  phaseBreakdown: PhaseBreakdown[]
}

// ── 正念练习 ──

export type MindfulnessType =
  | "breathing_478"
  | "body_scan"
  | "grounding_54321"
  | "mindful_observation"
  | "loving_kindness"

export interface MindfulnessExercise {
  type: MindfulnessType
  name: string
  instruction: string
  durationSeconds: number
  benefit: string
}

// ── 危机检测 ──

export type CrisisLevel = "none" | "mild_distress" | "moderate_distress" | "severe_distress" | "immediate_danger"

export interface CrisisResource {
  region: string
  hotline: string
  description: string
}

export interface CrisisDetectionResult {
  level: CrisisLevel
  signals: string[]
  severityScore: number
  contextualRisk: "low" | "medium" | "high"
  resources?: CrisisResource[]
  escalationRequired: boolean
}

// ── 7维度质量评分 ──

export interface SevenDimensionScore {
  relevance: number
  empathy: number
  depth: number
  safety: number
  actionability: number
  clarity: number
  culturalAwareness: number
}

export interface EvaluationResult {
  score: SevenDimensionScore
  dimensionBreakdown: SevenDimensionScore
  overall: number
  passed: boolean
  weakDimensions: string[]
  suggestion: string
  instruction: string
}

// ── 引擎模式 ──

export type CounselorMode = "analyze" | "chat"

// ── 引擎输入 ──

export interface EngineInput {
  message: string
  locale: Locale
  mode: CounselorMode
  conversationHistory?: { role: "user" | "assistant"; content: string }[]
  distressType?: "financial" | "midlife_transition" | "insomnia" | "general"
  preferredModel?: "openai" | "deepseek" | "claude"
}

// ── 引擎输出 ──

export interface EngineOutput {
  thinkingPattern: string
  encouragement: string
  steps: string[]
  dailyNote: string

  patternAnalysis?: PatternAnalysisResult
  cognitiveTiers?: CognitiveTiers
  emotionalValidation?: EmotionalValidation
  taskDecomposition?: TaskDecomposition
  mindfulnessExercise?: MindfulnessExercise
  crisisResources?: CrisisResource[]
  evaluation?: EvaluationResult

  usage?: {
    promptTokens: number
    completionTokens: number
    totalTokens: number
    costUSD: number
    model: string
  }
}

// ── 兼容旧接口 ──

export interface AnxietyAnalysis {
  thinkingPattern: string
  encouragement: string
  steps: string[]
}
