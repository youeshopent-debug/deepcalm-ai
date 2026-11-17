import HealingToolbox from "@/components/HealingToolbox"
import { getDict, tt } from "@/lib/getDict"
import type { Locale } from "@/types"

export function generateMetadata({ params }: { params: { lang: Locale } }) {
  return {
    title: `${tt(getDict(params.lang), "sleepCalculator.title")} | DeepCalm AI`,
    alternates: { canonical: `/${params.lang}/tools` },
  }
}

export default function ToolsPage({ params, searchParams }: { params: { lang: Locale }; searchParams: { tool?: string } }) {
  return (
    <main className="relative z-10 pb-8 pt-20">
      <h1 className="sr-only">{tt(getDict(params.lang), "sleepCalculator.title")}</h1>
      <HealingToolbox initialTab={searchParams.tool === "checkin" ? "checkin" : "sleep"} />
    </main>
  )
}
