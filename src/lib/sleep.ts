export type CycleCount = 6 | 5 | 4

export interface SleepOption {
  cycles: CycleCount
  bedtime: string
}

const CYCLE_MIN = 90
const DAY_MIN = 24 * 60

function fmt(minutes: number): string {
  const m = ((minutes % DAY_MIN) + DAY_MIN) % DAY_MIN
  const hh = String(Math.floor(m / 60)).padStart(2, "0")
  const mm = String(m % 60).padStart(2, "0")
  return `${hh}:${mm}`
}

export function calculateBedtimes(wakeHour: number, wakeMinute: number): SleepOption[] {
  const wakeTotal = wakeHour * 60 + wakeMinute
  return [6, 5, 4].map((cycles) => ({
    cycles: cycles as CycleCount,
    bedtime: fmt(wakeTotal - cycles * CYCLE_MIN),
  }))
}
