"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowRight, BedDouble, BookOpen, MessageCircleHeart } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import BreathingGuide from "./BreathingGuide"

const COPY = {
  zh: ["睡前放松、梳理心情，给自己一点安静的时间。", "1 分钟放松", "聊聊心情", "睡眠计算器"],
  en: ["Unwind before bed, check in with yourself, and find a quiet moment.", "1-minute reset", "Talk it through", "Sleep calculator"],
  ms: ["Bertenang sebelum tidur dan luangkan masa untuk diri sendiri.", "Relaks 1 minit", "Luahkan perasaan", "Kalkulator tidur"],
  ja: ["眠る前に気持ちを整え、静かな時間を過ごしましょう。", "1分でリラックス", "気持ちを話す", "睡眠計算機"],
  ko: ["잠들기 전 마음을 돌보고 조용한 시간을 가져 보세요.", "1분 휴식", "마음 이야기", "수면 계산기"],
  th: ["ผ่อนคลายก่อนนอนและให้เวลาตัวเองได้พักใจ", "ผ่อนคลาย 1 นาที", "คุยเรื่องความรู้สึก", "เครื่องคำนวณการนอน"],
  es: ["Relájate antes de dormir y tómate un momento para ti.", "Relájate en 1 minuto", "Hablemos", "Calculadora de sueño"],
} as const

export default function ShortHome({ title }: { title: string }) {
  const { locale, tt } = useLanguage()
  const [relaxing, setRelaxing] = useState(false)
  const [intro, relax, talk, sleep] = COPY[locale] || COPY.en
  const cards = [
    { icon: MessageCircleHeart, label: tt("aiCounselor.title"), path: "support" },
    { icon: BedDouble, label: sleep, path: "tools#healing-toolbox" },
    { icon: BookOpen, label: tt("nav.library"), path: "library" },
  ]

  useEffect(() => {
    const { hash, search } = window.location
    const [anchor, legacyQuery] = hash.split("?")
    if (anchor === "#ai-counselor" || new URLSearchParams(search).has("ai")) {
      window.location.replace(`/${locale}/support${search || (legacyQuery ? `?${legacyQuery}` : "")}`)
    } else if (anchor === "#daily-checkin" || anchor === "#healing-toolbox") {
      const query = anchor === "#daily-checkin" ? "?tool=checkin" : ""
      window.location.replace(`/${locale}/tools${query}#healing-toolbox`)
    } else if (anchor === "#resonance-wall") {
      window.location.replace(`/${locale}/sanctuary#resonance-wall`)
    }
  }, [locale])

  const focus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c2f4df]"
  return (
    <main className="relative z-10 mx-auto max-w-6xl px-4 pb-8 pt-20 sm:px-6 sm:pb-10">
      <section className="relative isolate flex min-h-[23rem] flex-col items-center justify-center overflow-hidden rounded-3xl border border-[#719486] bg-[#132723] px-5 py-14 text-center sm:min-h-[27rem]">
        <Image src="/images/sleep-forest.webp" alt="" fill priority sizes="(min-width: 1152px) 1104px, 100vw" className="-z-20 object-cover" />
        <div className="absolute inset-0 -z-10 bg-[#0a1d15]/75" />
        <h1 className="max-w-4xl text-balance text-4xl font-semibold leading-tight text-[#f4faf6] sm:text-6xl">{title}</h1>
        <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-[#edf7f1] sm:text-lg">{intro}</p>
        <div className="mt-7 flex w-full flex-wrap justify-center gap-3">
          <button type="button" onClick={() => setRelaxing(true)} className={`min-h-12 rounded-full bg-[#c2f4df] px-6 py-3 font-semibold text-[#132723] hover:bg-[#d8f9eb] ${focus}`}>
            {relax}
          </button>
          <Link href={`/${locale}/support`} className={`min-h-12 rounded-full border border-[#b9d7c9] bg-[#132723] px-6 py-3 font-semibold text-[#f4faf6] hover:bg-[#25443a] ${focus}`}>
            {talk}
          </Link>
        </div>
      </section>
      <nav aria-label={tt("nav.home") || "DeepCalm AI"} className="mt-4 grid gap-3 sm:grid-cols-3">
        {cards.map(({ icon: Icon, label, path }) => (
          <Link key={path} href={`/${locale}/${path}`} className={`flex min-h-[4.5rem] items-center gap-3 rounded-2xl border border-[#a8cbb7] bg-[#e5f2e9] p-4 font-semibold text-[#17392c] shadow-lg hover:bg-[#f4faf6] ${focus}`}>
            <Icon aria-hidden="true" className="h-6 w-6 shrink-0" />
            <span className="min-w-0 flex-1 break-words">{label}</span>
            <ArrowRight aria-hidden="true" className="h-5 w-5 shrink-0" />
          </Link>
        ))}
      </nav>
      {relaxing && <BreathingGuide onClose={() => setRelaxing(false)} />}
    </main>
  )
}
