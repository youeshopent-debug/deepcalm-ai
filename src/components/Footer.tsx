"use client"

import { useLanguage } from "@/context/LanguageContext"
import { Heart } from "lucide-react"
import Link from "next/link"

const anxietyScenarios = [
  { slug: "workplace-burnout", key: "scenario_workplace_burnout" },
  { slug: "student-exam", key: "scenario_student_exam" },
  { slug: "public-speaking", key: "scenario_public_speaking" },
  { slug: "social-anxiety", key: "scenario_social_anxiety" },
  { slug: "health-anxiety", key: "scenario_health_anxiety" },
  { slug: "impostor-syndrome", key: "scenario_impostor_syndrome" },
]

export default function Footer() {
  const { locale, tt } = useLanguage()

  return (
    <footer className="relative border-t border-gray-200 bg-white/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              {tt("footer.tools_title")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href={`/${locale}/#ai-counselor`} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  {tt("footer.ai_counselor")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/#tools`} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  {tt("footer.sleep_calculator")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/#daily-checkin`} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  {tt("footer.daily_checkin")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              {tt("footer.support_title")}
            </h3>
            <ul className="space-y-3">
              {anxietyScenarios.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${locale}/anxiety/${s.slug}`} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    {tt(`footer.${s.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              {tt("footer.legal_title")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href={`/${locale}/privacy`} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  {tt("footer.privacy")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/terms`} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  {tt("footer.terms")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/guide`} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  {tt("footer.guide")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about`} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  {tt("footer.about")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/editorial-policy`} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  {tt("footer.editorial_policy")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/science-trust`} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  {tt("footer.science_trust")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="flex items-center gap-2 text-gray-500">
              <Heart className="w-4 h-4 text-gray-400" />
              <span className="text-sm">{tt("footer.tagline")}</span>
            </div>
            <p className="text-xs text-gray-400 max-w-2xl">
              {tt("counselor.disclaimer")}
            </p>
            <div className="flex items-center gap-3 text-xs text-white/30">
              <span>{tt("footer.copyright")}</span>
              <span className="w-px h-3 bg-white/10" />
              <span>{tt("footer.madeWith")}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
