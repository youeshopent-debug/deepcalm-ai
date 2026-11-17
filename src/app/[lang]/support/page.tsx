import AiCounselor from "@/components/AiCounselor"
import { getDict, tt } from "@/lib/getDict"
import type { Locale } from "@/types"

export function generateMetadata({ params }: { params: { lang: Locale } }) {
  return {
    title: `${tt(getDict(params.lang), "aiCounselor.title")} | DeepCalm AI`,
    alternates: { canonical: `/${params.lang}/support` },
  }
}

export default function SupportPage({ params, searchParams }: { params: { lang: Locale }; searchParams: { ai?: string } }) {
  return (
    <main id="ai-counselor" className="relative z-10 mx-auto max-w-6xl px-4 pb-8 pt-20 sm:px-6">
      <h1 className="sr-only">{tt(getDict(params.lang), "aiCounselor.title")}</h1>
      <div className="rounded-3xl border border-[#53746b] bg-[#132723] [--dc-text:#f4faf6] [--dc-muted:#d6e8df]">
        <AiCounselor initialPrompt={typeof searchParams.ai === "string" ? searchParams.ai : undefined} />
      </div>
    </main>
  )
}
