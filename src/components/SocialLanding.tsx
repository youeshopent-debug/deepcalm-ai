import { ArrowDownToLine, ArrowRight, BookOpen, ExternalLink, Wind } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const resources = [
  {
    icon: BookOpen,
    title: "Understand your sleep",
    description: "Read about trouble falling asleep, waking at night, and when to seek help.",
    label: "Read the insomnia guide",
    href: "/en/library/insomnia",
  },
  {
    icon: Wind,
    title: "Wind down gently",
    description: "Take a quiet moment with a simple breathing exercise at your own pace.",
    label: "Explore breathing exercises",
    href: "/en/library/breathwork",
  },
]

export default function SocialLanding() {
  return (
    <main className="min-h-screen bg-[#09171e] text-[#edf5ee]">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/en" className="text-lg font-semibold tracking-tight">DeepCalm AI</Link>
        <Link href="/zh/library/insomnia" lang="zh" className="rounded-full border border-white/20 px-4 py-2 text-sm hover:bg-white/10">中文睡眠指南</Link>
      </header>

      <section className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[#152b2a] px-6 py-16 sm:px-12 sm:py-24 lg:px-16">
        <Image src="/images/sleep-forest.webp" alt="" fill sizes="(max-width: 1152px) 100vw, 1152px" priority className="-z-20 object-cover object-center" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#081716] via-[#081716]/90 to-[#081716]/40" />
        <h1 className="max-w-xl text-4xl font-semibold leading-[1.06] tracking-tight sm:text-6xl lg:text-7xl">
          A quieter night starts here.
        </h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-[#d5e5d8] sm:text-lg">
          Start with a breathing exercise, read about sleep, or keep a simple record over seven nights.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/en/library/breathwork" className="inline-flex items-center gap-2 rounded-full bg-[#d7edbb] px-5 py-3 font-semibold text-[#13251c] hover:bg-white">
            Try a breathing exercise <ArrowRight aria-hidden="true" size={18} />
          </Link>
          <a href="#sleep-diary" className="rounded-full border border-white/35 bg-[#102321]/70 px-5 py-3 font-semibold hover:bg-[#24433b]">
            Get the sleep diary
          </a>
        </div>
      </section>

      <section aria-label="Sleep resources" className="mx-auto grid max-w-6xl gap-4 px-5 py-8 sm:grid-cols-2 sm:px-0 lg:grid-cols-3">
        {resources.map(({ icon: Icon, title, description, label, href }) => (
          <article key={href} className="flex flex-col rounded-3xl border border-white/10 bg-[#10242b] p-6">
            <Icon aria-hidden="true" className="text-[#d7edbb]" size={23} />
            <h2 className="mt-4 text-xl font-semibold">{title}</h2>
            <p className="mb-5 mt-2 text-sm leading-relaxed text-slate-300">{description}</p>
            <Link href={href} className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[#d7edbb] underline-offset-4 hover:underline">
              {label} <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </article>
        ))}
        <article id="sleep-diary" className="flex scroll-mt-4 flex-col rounded-3xl border border-white/10 bg-[#10242b] p-6">
          <ArrowDownToLine aria-hidden="true" className="text-[#d7edbb]" size={23} />
          <h2 className="mt-4 text-xl font-semibold">Keep a 7-day sleep diary</h2>
          <p className="mb-5 mt-2 text-sm leading-relaxed text-slate-300">Note when you went to bed, how often you woke up, and how you felt the next day. Your entries stay in your own file.</p>
          <div className="mt-auto flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-[#d7edbb] underline-offset-4">
            <a href="/en/downloads/sleep-diary.csv" download className="hover:underline">Download CSV</a>
            <a href="/zh/downloads/sleep-diary.csv" download lang="zh" className="hover:underline">中文版</a>
          </div>
        </article>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-10 sm:px-0">
        <div className="rounded-3xl border border-white/10 p-6 sm:flex sm:items-center sm:justify-between sm:gap-8">
          <div>
            <h2 className="text-lg font-semibold">When sleep problems persist</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300">If sleep problems are affecting daily life, speak with a healthcare professional. The American Academy of Sleep Medicine recommends multicomponent CBT-I for adults with chronic insomnia.</p>
          </div>
          <a href="https://doi.org/10.5664/jcsm.8986" className="mt-4 inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#d7edbb] underline underline-offset-4 sm:mt-0">
            Read the AASM guideline <ExternalLink aria-hidden="true" size={15} />
          </a>
        </div>
      </section>

      <footer className="mx-auto flex max-w-6xl flex-wrap gap-x-5 gap-y-2 border-t border-white/10 px-5 py-6 text-sm text-slate-300 sm:px-0">
        <Link href="/en/about" className="hover:underline">About</Link>
        <Link href="/en/editorial-policy" className="hover:underline">Editorial policy</Link>
        <Link href="/en/privacy" className="hover:underline">Privacy</Link>
      </footer>
    </main>
  )
}
