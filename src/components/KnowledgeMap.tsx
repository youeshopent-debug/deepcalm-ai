import Link from "next/link"
import type { Locale } from "@/types"
import { getKnowledgeMap, type RelationType } from "@/data/knowledge-graph"
import { getTopicBySlug } from "@/content/topics"

const RELATION_LABELS: Record<RelationType, Record<Locale, string>> = {
  related_to: {
    zh: "相关", en: "Related", ms: "Berkaitan", ja: "関連", ko: "관련", th: "เกี่ยวข้อง", es: "Relacionado",
  },
  treats: {
    zh: "改善", en: "Helps", ms: "Membantu", ja: "改善する", ko: "개선", th: "ช่วย", es: "Ayuda",
  },
  treated_by: {
    zh: "被改善", en: "Helped by", ms: "Dibantu oleh", ja: "改善される", ko: "도움 받음", th: "ได้รับการช่วยเหลือโดย", es: "Ayudado por",
  },
  causes: {
    zh: "导致", en: "Causes", ms: "Menyebabkan", ja: "引き起こす", ko: "유발", th: "ทำให้เกิด", es: "Causa",
  },
  symptom_of: {
    zh: "症状", en: "Symptom of", ms: "Gejala", ja: "症状", ko: "증상", th: "อาการของ", es: "Síntoma de",
  },
  prevents: {
    zh: "预防", en: "Prevents", ms: "Mencegah", ja: "予防する", ko: "예방", th: "ป้องกัน", es: "Previene",
  },
  aggravates: {
    zh: "加重", en: "Worsens", ms: "Memburukkan", ja: "悪化させる", ko: "악화", th: "ทำให้แย่ลง", es: "Empeora",
  },
  strengthens: {
    zh: "增强", en: "Strengthens", ms: "Menguatkan", ja: "強化する", ko: "강화", th: "เสริมสร้าง", es: "Fortalece",
  },
}

const RELATION_COLORS: Record<RelationType, string> = {
  related_to: "border-l-nord-accent/50 bg-nord-accent/5",
  treats: "border-l-emerald-500/50 bg-emerald-500/5",
  treated_by: "border-l-emerald-500/50 bg-emerald-500/5",
  causes: "border-l-rose-500/50 bg-rose-500/5",
  symptom_of: "border-l-amber-500/50 bg-amber-500/5",
  prevents: "border-l-teal-500/50 bg-teal-500/5",
  aggravates: "border-l-red-500/50 bg-red-500/5",
  strengthens: "border-l-blue-500/50 bg-blue-500/5",
}

const SECTION_HEADING: Record<Locale, string> = {
  zh: "🧠 知识图谱 — 关联主题",
  en: "🧠 Knowledge Graph — Related Topics",
  ms: "🧠 Graf Pengetahuan — Topik Berkaitan",
  ja: "🧠 知識グラフ — 関連トピック",
  ko: "🧠 지식 그래프 — 관련 주제",
  th: "🧠 กราฟความรู้ — หัวข้อที่เกี่ยวข้อง",
  es: "🧠 Grafo de Conocimiento — Temas Relacionados",
}

const EMPTY_TEXT: Record<Locale, string> = {
  zh: "暂无关联主题图谱",
  en: "No related topics found",
  ms: "Tiada topik berkaitan",
  ja: "関連トピックはありません",
  ko: "관련 주제가 없습니다",
  th: "ไม่พบหัวข้อที่เกี่ยวข้อง",
  es: "No se encontraron temas relacionados",
}

interface KnowledgeMapProps {
  slug: string
  locale: Locale
}

export default function KnowledgeMap({ slug, locale }: KnowledgeMapProps) {
  const related = getKnowledgeMap(slug)

  if (related.length === 0) {
    return (
      <div className="mt-12">
        <h2 className="text-lg font-bold text-nord-text mb-4">
          {SECTION_HEADING[locale] || SECTION_HEADING.en}
        </h2>
        <p className="text-sm text-nord-text/40 italic">
          {EMPTY_TEXT[locale] || EMPTY_TEXT.en}
        </p>
      </div>
    )
  }

  return (
    <div className="mt-12">
      <h2 className="text-lg font-bold text-nord-text mb-5">
        {SECTION_HEADING[locale] || SECTION_HEADING.en}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {related.map((item) => {
          const topic = getTopicBySlug(item.slug, locale)
          if (!topic) return null
          const relLabel = RELATION_LABELS[item.relation]?.[locale] || RELATION_LABELS[item.relation]?.en || item.relation
          const colorClass = RELATION_COLORS[item.relation] || "border-l-nord-accent/50 bg-nord-accent/5"

          return (
            <Link
              key={item.slug}
              href={`/${locale}/library/${item.slug}`}
              className={`block p-3 rounded-lg border border-nord-border/20 border-l-2 ${colorClass} hover:border-nord-accent/40 transition-all group`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-sm font-medium text-nord-text group-hover:text-nord-accent transition-colors">
                  {topic.title}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-nord-text/30 whitespace-nowrap px-1.5 py-0.5 rounded bg-nord-bg/50">
                  {relLabel}
                </span>
              </div>
              <p className="text-xs text-nord-text/50 mt-1 line-clamp-1">
                {topic.description}
              </p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
