import type {
  CognitiveDistortionType,
  DetectedPattern,
  PatternAnalysisResult,
  Locale,
  CrisisDetectionResult,
  CrisisLevel,
} from "@/types"

// ── 12种认知扭曲的多语言关键词库 ──

type PatternKeywordEntry = {
  zh: string[]
  en: string[]
  reframeZh: string
  reframeEn: string
}

const PATTERN_KEYWORDS: Record<CognitiveDistortionType, PatternKeywordEntry> = {
  catastrophizing: {
    zh: ["完蛋", "全完了", "没救了", "彻底失败", "灾难", "毁了一生", "撑不住", "受不了", "最坏", "绝对不行"],
    en: ["disaster", "catastrophe", "terrible", "awful", "worst", "ruined", "can't stand", "unbearable", "devastating", "horrible"],
    reframeZh: "试着问自己：最坏的情况真的会发生吗？如果发生了，我能用什么方法应对？",
    reframeEn: "Ask yourself: what's the most likely outcome? Have I survived difficult situations before?",
  },
  black_and_white: {
    zh: ["总是", "从不", "完全", "绝对", "要么", "要不", "所有人都", "没有人", "每件事", "毫无"],
    en: ["always", "never", "everyone", "no one", "everything", "nothing", "all", "none", "completely", "totally"],
    reframeZh: "生活很少是非黑即白的。试着寻找中间地带——有没有部分成功的例子？",
    reframeEn: "Life is rarely black and white. Can you find a shade of gray — a partial success or middle ground?",
  },
  mind_reading: {
    zh: ["觉得他", "认为他们", "肯定觉得", "一定认为", "他们想", "他心里", "觉得别人", "肯定认为我", "看不起", "讨厌我"],
    en: ["they think", "he must think", "she believes", "they assume", "know what they're thinking", "can tell they", "obviously thinks"],
    reframeZh: "我们没有读心术。有没有什么证据能支持你的猜测？有没有其他可能的解释？",
    reframeEn: "We can't read minds. What evidence supports this assumption? Is there an alternative explanation?",
  },
  emotional_reasoning: {
    zh: ["感觉", "觉得", "感到", "直觉", "心里觉得", "预感", "有这种感觉", "总觉得"],
    en: ["feel like", "feeling that", "i sense that", "my gut says", "i just know", "instinct tells me"],
    reframeZh: "感觉不等于事实。你的感受是真实的，但它不一定是现实的准确反映。",
    reframeEn: "Feelings are not facts. Your emotions are valid, but they don't always reflect reality accurately.",
  },
  overgeneralization: {
    zh: ["每次都", "从来都", "总是这样", "次次都", "一直", "从来没有", "一贯", "任何一次"],
    en: ["always happens", "every time", "never works", "all the time", "in every situation", "consistently", "without exception"],
    reframeZh: "一个事件不代表全部模式。回顾一下，是否也有过不同的经历？",
    reframeEn: "A single event doesn't define a pattern. Can you recall a time when things turned out differently?",
  },
  should_statements: {
    zh: ["应该", "必须", "不得不", "一定要", "不该", "绝不能", "本应该", "本该"],
    en: ["should", "must", "have to", "ought to", "need to", "supposed to", "expected to"],
    reframeZh: "把'应该'换成'可以怎样'。减少自我苛责，关注选择而非义务。",
    reframeEn: "Replace 'should' with 'could'. Shift from self-criticism toward choice and possibility.",
  },
  labeling: {
    zh: ["我是个", "我就是", "我真是", "太笨了", "太蠢了", "无能", "失败者", "废物", "没用的", "loser"],
    en: ["i'm such a", "i'm a failure", "i'm stupid", "i'm useless", "i'm an idiot", "i'm worthless", "i'm a loser"],
    reframeZh: "标签简化了复杂的你。你是一个完整的人，做错事不等于你是个'失败者'。",
    reframeEn: "Labels oversimplify who you are. Making a mistake doesn't make you 'a failure' as a person.",
  },
  personalization: {
    zh: ["都怪我", "都是我的错", "因我而起", "我造成的", "如果我不", "都因为我", "全是我的责任"],
    en: ["it's my fault", "because of me", "i caused", "i'm responsible for", "blame me", "my mistake led to"],
    reframeZh: "不是所有事情都与你有关。考虑其他因素——环境、他人选择、偶然性。",
    reframeEn: "Not everything is about you. Consider other factors — circumstances, other people's choices, random chance.",
  },
  fortune_telling: {
    zh: ["肯定会", "一定不会", "注定", "结果一定", "预测", "肯定会失败", "不会成功", "没希望", "不可能"],
    en: ["will fail", "won't work", "i know it will", "predicted outcome", "certain to", "no chance", "guaranteed"],
    reframeZh: "我们无法预知未来。先做一个小尝试，用行动检验预测，而不是提前认定失败。",
    reframeEn: "We can't predict the future. Test the prediction with a small action rather than assuming failure.",
  },
  minimization: {
    zh: ["只是", "没什么", "谁都能", "不值一提", "微不足道", "算不上", "不过是", "运气好"],
    en: ["just", "only", "no big deal", "anyone could", "not that great", "doesn't count", "lucky", "small thing"],
    reframeZh: "你的成就值得被认可。如果朋友做到了同样的事，你会怎么对他们说？",
    reframeEn: "Your accomplishments deserve recognition. What would you say to a friend who achieved the same thing?",
  },
  comparison: {
    zh: ["比不上", "不如", "比他差", "人家都", "别人都", "谁谁谁", "对比", "差远了"],
    en: ["compared to", "less than", "not as good as", "behind others", "everyone else", "worse than", "falling behind"],
    reframeZh: "你看到的是别人的精选集，对比的是自己的幕后花絮。关注自己的进步轨迹。",
    reframeEn: "You're comparing someone's highlight reel to your behind-the-scenes. Focus on your own growth trajectory.",
  },
  filtering: {
    zh: ["只看", "只看到", "只有坏", "全是问题", "没有一件好事", "只有负面", "糟糕透", "全是错"],
    en: ["only see", "focus on", "dwelling on", "all the problems", "nothing positive", "only the bad", "all wrong"],
    reframeZh: "试着刻意寻找至少一个正面的方面。你的大脑有负面偏好，需要刻意训练看到全局。",
    reframeEn: "Deliberately look for at least one positive aspect. Your brain has a negativity bias — train it to see the full picture.",
  },
}

// ── 危机信号检测 ──

const CRISIS_SIGNALS: Record<string, string[]> = {
  zh: ["自杀", "活不下去", "不想活了", "死了一了百了", "结束生命", "伤害自己", "自残", "轻生", "没有活下去的意义"],
  en: ["suicide", "kill myself", "end my life", "want to die", "self-harm", "hurt myself", "no reason to live", "better off dead"],
}

// ── 核心检测函数 ──

export function detectPatterns(text: string, locale: Locale): PatternAnalysisResult {
  const detected: DetectedPattern[] = []
  const lowerText = text.toLowerCase()

  for (const [type, entry] of Object.entries(PATTERN_KEYWORDS)) {
    const keywords = locale === "zh" ? entry.zh : entry.en
    const matches: string[] = []

    for (const kw of keywords) {
      const idx = lowerText.indexOf(kw.toLowerCase())
      if (idx !== -1) {
        const start = Math.max(0, idx - 10)
        const end = Math.min(text.length, idx + kw.length + 20)
        matches.push(text.slice(start, end).trim())
      }
    }

    if (matches.length > 0) {
      const matchCount = matches.length
      const keywordCount = keywords.length
      const confidence = Math.min(matchCount / (keywordCount * 0.3), 1)
      const severity = confidence >= 0.5 ? "severe" : confidence >= 0.25 ? "moderate" : "mild"

      detected.push({
        type: type as CognitiveDistortionType,
        confidence: Math.round(confidence * 100) / 100,
        matchedText: matches[0],
        severity,
        reframeSuggestion: locale === "zh" ? entry.reframeZh : entry.reframeEn,
      })
    }
  }

  detected.sort((a, b) => b.confidence - a.confidence)

  const primaryType = detected.length > 0 ? detected[0].type : null

  const maxSeverity = detected.reduce<"mild" | "moderate" | "severe">((acc, p) => {
    const order = { mild: 0, moderate: 1, severe: 2 }
    return order[p.severity] > order[acc] ? p.severity : acc
  }, "mild")

  return {
    patterns: detected,
    primaryType,
    patternCount: detected.length,
    overallSeverity: maxSeverity,
  }
}

// ── 危机检测（动态分数 + 语境风险） ──

export function detectCrisis(text: string, locale: Locale): CrisisDetectionResult {
  const lowerText = text.toLowerCase()
  const signals: string[] = []
  const keywords = locale === "zh" ? CRISIS_SIGNALS.zh : CRISIS_SIGNALS.en

  for (const signal of keywords) {
    if (lowerText.includes(signal.toLowerCase())) {
      signals.push(signal)
    }
  }

  const matchedCount = signals.length
  const keywordCount = keywords.length
  const densityScore = keywordCount > 0 ? matchedCount / keywordCount : 0
  const severityScore = Math.round(Math.min(densityScore * 3, 1) * 100) / 100

  const intensity = assessEmotionalIntensity(text)
  const contextualRisk: "low" | "medium" | "high" = intensity === "crisis" ? "high"
    : intensity === "high" ? "medium"
    : "low"

  const level: CrisisLevel = severityScore === 0 ? "none"
    : severityScore < 0.3 ? "mild_distress"
    : severityScore < 0.5 ? "moderate_distress"
    : severityScore < 0.8 ? "severe_distress"
    : "immediate_danger"

  return {
    level,
    signals,
    severityScore,
    contextualRisk,
    escalationRequired: severityScore > 0.7,
  }
}

// ── 情感强度评估（简单规则版） ──

export function assessEmotionalIntensity(text: string): "low" | "medium" | "high" | "crisis" {
  const extremeWords = ["绝望", "崩溃", "无法承受", "疯了", "desperate", "hopeless", "overwhelmed", "losing my mind"]
  const strongWords = ["焦虑", "害怕", "愤怒", "沮丧", "anxious", "terrified", "angry", "depressed"]

  const extremeCount = extremeWords.filter(w => text.toLowerCase().includes(w.toLowerCase())).length
  const strongCount = strongWords.filter(w => text.toLowerCase().includes(w.toLowerCase())).length

  if (extremeCount >= 2) return "crisis"
  if (extremeCount >= 1 || strongCount >= 3) return "high"
  if (strongCount >= 1) return "medium"
  return "low"
}

// ── 12种认知扭曲的元信息 ──

export const COGNITIVE_DISTORTIONS: {
  type: CognitiveDistortionType
  labelZh: string
  labelEn: string
  description: string
}[] = [
  { type: "catastrophizing", labelZh: "灾难化", labelEn: "Catastrophizing", description: "把小问题放大为灾难性后果" },
  { type: "black_and_white", labelZh: "非黑即白", labelEn: "Black-and-White Thinking", description: "极端二元思维，忽视中间地带" },
  { type: "mind_reading", labelZh: "读心术", labelEn: "Mind Reading", description: "未经证实就断定他人的想法" },
  { type: "emotional_reasoning", labelZh: "情绪推理", labelEn: "Emotional Reasoning", description: "把主观感受当作客观事实" },
  { type: "overgeneralization", labelZh: "过度概括", labelEn: "Overgeneralization", description: "基于单一事件推导出普遍模式" },
  { type: "should_statements", labelZh: "苛责陈述", labelEn: "Should Statements", description: "用'应该'苛求自己和他人" },
  { type: "labeling", labelZh: "贴标签", labelEn: "Labeling", description: "用极端标签定义自我或他人" },
  { type: "personalization", labelZh: "个人化", labelEn: "Personalization", description: "把无关事件归因于自己" },
  { type: "fortune_telling", labelZh: "算命偏差", labelEn: "Fortune Telling", description: "提前认定负面结果" },
  { type: "minimization", labelZh: "弱化正面", labelEn: "Minimization", description: "低估或否认自己的成就" },
  { type: "comparison", labelZh: "攀比思维", labelEn: "Comparison Trap", description: "用他人的长处对比自己的短处" },
  { type: "filtering", labelZh: "负面过滤", labelEn: "Mental Filtering", description: "只关注负面信息，忽略正面" },
]
