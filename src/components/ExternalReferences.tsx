import type { Locale } from "@/types"

const SECTION_HEADING: Record<Locale, string> = {
  zh: "📚 参考文献与权威来源",
  en: "📚 References & Authoritative Sources",
  ms: "📚 Rujukan & Sumber Berwibawa",
  ja: "📚 参考文献と公的機関の情報源",
  ko: "📚 참고 문헌 및 공신력 있는 출처",
  th: "📚 เอกสารอ้างอิงและแหล่งข้อมูลที่เชื่อถือได้",
  es: "📚 Referencias y Fuentes Autorizadas",
}

const DOMAIN_LABELS: Record<string, Record<Locale, string>> = {
  "pubmed.ncbi.nlm.nih.gov": {
    zh: "PubMed (美国国家医学图书馆)",
    en: "PubMed (US National Library of Medicine)",
    ms: "PubMed (Perpustakaan Perubatan Nasional AS)",
    ja: "PubMed (米国国立医学図書館)",
    ko: "PubMed (미국 국립 의학 도서관)",
    th: "PubMed (หอสมุดแพทยศาสตร์แห่งชาติสหรัฐฯ)",
    es: "PubMed (Biblioteca Nacional de Medicina de EE. UU.)",
  },
  "who.int": {
    zh: "世界卫生组织 (WHO)",
    en: "World Health Organization (WHO)",
    ms: "Pertubuhan Kesihatan Sedunia (WHO)",
    ja: "世界保健機関 (WHO)",
    ko: "세계보건기구 (WHO)",
    th: "องค์การอนามัยโลก (WHO)",
    es: "Organización Mundial de la Salud (OMS)",
  },
  "nhs.uk": {
    zh: "英国国家卫生服务体系 (NHS)",
    en: "UK National Health Service (NHS)",
    ms: "Perkhidmatan Kesihatan Nasional UK (NHS)",
    ja: "英国国民保健サービス (NHS)",
    ko: "영국 국민보건서비스 (NHS)",
    th: "บริการสุขภาพแห่งชาติสหราชอาณาจักร (NHS)",
    es: "Servicio Nacional de Salud del Reino Unido (NHS)",
  },
  "nimh.nih.gov": {
    zh: "美国国家心理健康研究所 (NIMH)",
    en: "US National Institute of Mental Health (NIMH)",
    ms: "Institut Kesihatan Mental Kebangsaan AS (NIMH)",
    ja: "米国国立精神保健研究所 (NIMH)",
    ko: "미국 국립 정신 건강 연구소 (NIMH)",
    th: "สถาบันสุขภาพจิตแห่งชาติสหรัฐฯ (NIMH)",
    es: "Instituto Nacional de Salud Mental de EE. UU. (NIMH)",
  },
}

function getDomainLabel(url: string, locale: Locale): string {
  for (const [domain, labels] of Object.entries(DOMAIN_LABELS)) {
    if (url.includes(domain)) return labels[locale] || labels.en
  }
  return new URL(url).hostname
}

function formatUrlAsCitation(url: string, index: number, locale: Locale): { label: string; domain: string } {
  const domain = getDomainLabel(url, locale)
  return { label: `[${index + 1}] ${domain}`, domain }
}

interface ExternalReferencesProps {
  references: string[]
  locale: Locale
}

export default function ExternalReferences({ references, locale }: ExternalReferencesProps) {
  if (!references || references.length === 0) return null

  return (
    <div className="mt-8 p-5 bg-white/95 backdrop-blur-[50px] border border-slate-200/20 rounded-xl shadow-lg">
      <h3 className="text-sm font-bold text-blue-900 mb-3">
        {SECTION_HEADING[locale] || SECTION_HEADING.en}
      </h3>
      <ol className="space-y-2">
        {references.map((url, i) => {
          const { label, domain } = formatUrlAsCitation(url, i, locale)
          return (
            <li key={url} className="text-xs leading-relaxed">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-700 hover:text-blue-800 underline underline-offset-2 decoration-blue-400 transition-colors"
              >
                {label}
                <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <span className="text-slate-500 ml-1">— {domain}</span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
