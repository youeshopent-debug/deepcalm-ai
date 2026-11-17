import { editorialCopy } from "@/lib/editorial-copy"
import type { Locale } from "@/types"
import { ShieldCheck } from "lucide-react"

const locales: Locale[] = ["zh", "en", "ms", "ja", "ko", "th", "es"]

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const copy = editorialCopy[lang as Locale] ?? editorialCopy.en
  return {
    title: copy.references + " — DeepCalm AI",
    description: copy.description,
    metadataBase: new URL("https://deepcalm-ai.com"),
    alternates: {
      canonical: `https://deepcalm-ai.com/${lang}/science-trust`,
      languages: {
        zh: "https://deepcalm-ai.com/zh/science-trust",
        en: "https://deepcalm-ai.com/en/science-trust",
        ms: "https://deepcalm-ai.com/ms/science-trust",
        ja: "https://deepcalm-ai.com/ja/science-trust",
        ko: "https://deepcalm-ai.com/ko/science-trust",
        th: "https://deepcalm-ai.com/th/science-trust",
        es: "https://deepcalm-ai.com/es/science-trust",
      },
    },
    openGraph: {
      title: copy.references + " — DeepCalm AI",
      description: copy.description,
    },
  }
}

export default async function ScienceTrustPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = lang as Locale
  const copy = editorialCopy[locale] ?? editorialCopy.en

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-16">
        {/* 头部：科学背书声明 */}
        <div className="glass rounded-2xl p-6 sm:p-8 border border-dc-border/40">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="w-7 h-7 text-dc-accent" />
            <h1 className="text-3xl sm:text-4xl font-bold text-dc-text">{copy.references}</h1>
          </div>

          <p className="text-dc-muted/80 leading-relaxed">{copy.description}</p>
        </div>

      </div>
    </div>
  )
}
