import type { Locale } from "@/types"
import { getDict } from "@/lib/getDict"
import { Shield } from "lucide-react"

const locales: Locale[] = ["zh", "en", "ms", "ja", "ko", "th", "es"];

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDict(lang as Locale)
  return {
    title: dict.privacy.meta_title,
    description: dict.privacy.meta_desc,
    metadataBase: new URL("https://deepcalm-ai.com"),
    alternates: {
      canonical: `https://deepcalm-ai.com/${lang}/privacy`,
      languages: {
        zh: "https://deepcalm-ai.com/zh/privacy",
        en: "https://deepcalm-ai.com/en/privacy",
        ms: "https://deepcalm-ai.com/ms/privacy",
        ja: "https://deepcalm-ai.com/ja/privacy",
        ko: "https://deepcalm-ai.com/ko/privacy",
        th: "https://deepcalm-ai.com/th/privacy",
        es: "https://deepcalm-ai.com/es/privacy",
      },
    },
    openGraph: {
      title: dict.privacy.meta_title,
      description: dict.privacy.meta_desc,
    },
  }
}

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDict(lang as Locale)
  const p = dict.privacy
  const zh = lang === "zh"
  const journalAvailable = process.env.JOURNAL_SUPABASE_URL && process.env.JOURNAL_SUPABASE_PUBLIC_KEY
  const journalNotice = zh
    ? "使用情绪小日记时，你的登录邮箱、日记记录和提醒设置会储存在 Supabase。Resend 使用你的邮箱发送验证码和你主动开启的提醒。提醒邮件不含日记内容，日记也不会提供给 AI 聊天或用于生成海报。你可在日记页面删除记录、关闭邮件提醒。"
    : "If you use Mood Journal, Supabase stores your sign-in email, journal entries and reminder preferences. Resend uses your email address to deliver sign-in codes and any reminders you choose to receive. Reminder emails contain no journal content. Journal entries are kept separate from AI chat and poster generation. You can delete entries and turn off reminders in the journal."
  const journalExceptions = zh
    ? "下文关于邮箱和第三方服务的一般说明，适用于情绪小日记以外的功能。"
    : "The general statements below about email addresses and service providers apply to features outside Mood Journal."

  const sections = [
    { title: p.section1_title, desc: p.section1_desc },
    { title: p.section2_title, desc: p.section2_desc },
    { title: p.section3_title, desc: p.section3_desc },
    { title: p.section4_title, desc: p.section4_desc },
    { title: p.section5_title, desc: p.section5_desc },
    { title: p.section6_title, desc: p.section6_desc },
  ]

  return (
    <main className="relative min-h-screen px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-[#c9d9d0] bg-[#f8fcf9] text-[#172a24] shadow-xl">
        <header className="bg-gradient-to-br from-[#143a30] to-[#224e43] px-6 py-8 text-[#f5fcf7] sm:px-12 sm:py-12">
          <div className="mb-5 inline-flex rounded-2xl border border-[#77a898] bg-[#285548] p-3 text-[#daf5e7]">
            <Shield aria-hidden="true" className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">{p.title}</h1>
          <p className="mt-3 text-sm text-[#cae7dc]">{p.updated}</p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#ecf7ef]">{p.intro}</p>
        </header>
        <div className="divide-y divide-[#d6e3db] px-6 sm:px-12">
          {journalAvailable && (
            <section className="py-6 sm:py-8">
              <h2 className="text-lg font-semibold sm:text-xl">{zh ? "情绪小日记与邮件提醒" : "Mood Journal and email reminders"}</h2>
              <p className="mt-2 text-base leading-relaxed text-[#354c42]">{journalNotice}</p>
              <p className="mt-2 text-base leading-relaxed text-[#354c42]">{journalExceptions}</p>
            </section>
          )}
          {sections.map(({ title, desc }) => (
            <section key={title} className="py-6 sm:py-8">
              <h2 className="text-lg font-semibold sm:text-xl">{title}</h2>
              <p className="mt-2 whitespace-pre-line text-base leading-relaxed text-[#354c42]">{desc}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
