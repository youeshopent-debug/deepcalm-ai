"use client"

import { useLanguage } from "@/context/LanguageContext";

export default function InlineScienceContent() {
  const { tt } = useLanguage()

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6">
      <div className="glass rounded-2xl p-6 sm:p-8">
        <h3 className="text-lg sm:text-xl font-bold text-dc-text mb-4">
          {tt("seoContent.title")}
        </h3>
        <div className="prose prose-sm prose-invert max-w-none text-dc-muted space-y-4 leading-relaxed">
          <p>{tt("seoContent.p1")}</p>
          <h4 className="text-base font-semibold text-dc-text mt-6 mb-2">
            {tt("seoContent.rem_title")}
          </h4>
          <p>{tt("seoContent.p2")}</p>
          <p>{tt("seoContent.p3")}</p>
          <h4 className="text-base font-semibold text-dc-text mt-6 mb-2">
            {tt("seoContent.nrem_title")}
          </h4>
          <p>{tt("seoContent.p4")}</p>
          <h4 className="text-base font-semibold text-dc-text mt-6 mb-2">
            {tt("seoContent.cbt_deep_title")}
          </h4>
          <p>{tt("seoContent.cbt_deep1")}</p>
          <h4 className="text-base font-semibold text-dc-text mt-6 mb-2">
            {tt("seoContent.sleep_hygiene_title")}
          </h4>
          <p>{tt("seoContent.sleep_hygiene1")}</p>
          <p className="text-xs text-dc-muted/30 mt-6">
            {tt("seoContent.disclaimer")}
          </p>
        </div>
      </div>
    </div>
  )
}

