export type Locale = "zh" | "en" | "ms" | "ja" | "ko" | "th" | "es"

export type NestedKeyOf<T> = T extends object
  ? { [K in keyof T]: K extends string ? `${K}.${NestedKeyOf<T[K]>}` | K : never }[keyof T]
  : ""

export interface SleepResult {
  cycles: number
  bedtime: string
  feelLabel: string
}

export interface AnxietyAnalysis {
  thinkingPattern: string
  encouragement: string
  steps: string[]
}
