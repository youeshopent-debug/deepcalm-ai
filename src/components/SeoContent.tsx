import { useState } from "react"
import { useLanguage } from "@/context/LanguageContext"
import { ChevronDown } from "lucide-react"

export default function SeoContent() {
  const { tt } = useLanguage()
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6">
      <div className="glass rounded-2xl p-6 sm:p-8">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between gap-4 text-left group"
        >
          <h2 className="text-xl font-bold text-dc-text group-hover:text-dc-accent transition-colors">
            {tt("seoContent.title")}
          </h2>
          <ChevronDown
            className={`w-5 h-5 text-dc-muted/60 shrink-0 transition-transform duration-300 ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </button>

        <div
          className={`overflow-hidden transition-all duration-500 ${
            expanded ? "max-h-[5000px] opacity-100 mt-6" : "max-h-0 opacity-0"
          }`}
        >
          <div className="prose prose-sm prose-invert max-w-none text-dc-muted space-y-4 leading-relaxed">
            <p>{tt("seoContent.p1")}</p>

            <h3 className="text-base font-semibold text-dc-text mt-6 mb-2">
              {tt("seoContent.rem_title")}
            </h3>

            <p>{tt("seoContent.p2")}</p>
            <p>{tt("seoContent.p3")}</p>

            <h3 className="text-base font-semibold text-dc-text mt-6 mb-2">
              {tt("seoContent.nrem_title")}
            </h3>

            <p>{tt("seoContent.p4")}</p>

            <h3 className="text-base font-semibold text-dc-text mt-6 mb-2">
              {tt("seoContent.cortisol_title")}
            </h3>

            <p>{tt("seoContent.cortisol1")}</p>
            <p>{tt("seoContent.cortisol2")}</p>

            <h3 className="text-base font-semibold text-dc-text mt-6 mb-2">
              {tt("seoContent.circadian_title")}
            </h3>

            <p>{tt("seoContent.circadian1")}</p>

            <h3 className="text-base font-semibold text-dc-text mt-6 mb-2">
              {tt("seoContent.melatonin_title")}
            </h3>

            <p>{tt("seoContent.melatonin1")}</p>

            <h3 className="text-base font-semibold text-dc-text mt-6 mb-2">
              {tt("seoContent.cbt_deep_title")}
            </h3>

            <p>{tt("seoContent.cbt_deep1")}</p>

            <h3 className="text-base font-semibold text-dc-text mt-6 mb-2">
              {tt("seoContent.sleep_hygiene_title")}
            </h3>

            <p>{tt("seoContent.sleep_hygiene1")}</p>

            <h3 className="text-base font-semibold text-dc-text mt-6 mb-2">
              {tt("seoContent.micro_habits_title")}
            </h3>

            <p>{tt("seoContent.micro_habits1")}</p>

            <h3 className="text-base font-semibold text-dc-text mt-6 mb-2">
              {tt("seoContent.anxiety_title")}
            </h3>

            <p>{tt("seoContent.p8")}</p>
            <p>{tt("seoContent.p9")}</p>

            <p className="text-xs text-dc-muted/30 mt-8">
              {tt("seoContent.disclaimer")}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
