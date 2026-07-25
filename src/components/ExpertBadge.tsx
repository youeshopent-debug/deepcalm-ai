import type { Locale } from "@/types"

const REVIEW_BADGE: Record<Locale, string> = {
  zh: "🧑‍⚕️ AI 临床审核委员会审阅",
  en: "🧑‍⚕️ Reviewed by AI Clinical Board",
  ms: "🧑‍⚕️ Disemak oleh Lembaga Klinikal AI",
  ja: "🧑‍⚕️ AI臨床審査委員会による審査済み",
  ko: "🧑‍⚕️ AI 임상 검토 위원회 검토 완료",
  th: "🧑‍⚕️ ผ่านการตรวจสอบโดยคณะกรรมการทางคลินิก AI",
  es: "🧑‍⚕️ Revisado por el Comité Clínico de IA",
}

const EVIDENCE_BADGE: Record<Locale, string> = {
  zh: "📋 基于循证医学",
  en: "📋 Evidence-Based",
  ms: "📋 Berasaskan Bukti",
  ja: "📋 エビデンスに基づく",
  ko: "📋 근거 기반",
  th: "📋 อ้างอิงหลักฐานทางวิทยาศาสตร์",
  es: "📋 Basado en Evidencia",
}

interface ExpertBadgeProps {
  locale: Locale
}

export default function ExpertBadge({ locale }: ExpertBadgeProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <span
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
          bg-nord-accent/10 text-nord-accent border border-nord-accent/20"
      >
        {REVIEW_BADGE[locale] || REVIEW_BADGE.en}
      </span>
      <span
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
          bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
      >
        {EVIDENCE_BADGE[locale] || EVIDENCE_BADGE.en}
      </span>
    </div>
  )
}
