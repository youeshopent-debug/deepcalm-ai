"use client"

import { ShieldCheck } from "lucide-react"
import { useEffect, useState } from "react"
import type { Locale } from "@/types"

const CONSENT_KEY = "deepcalm-cookie-consent"
type Choice = "accepted" | "rejected"
type Notice = [title: string, description: string, policy: string, reject: string, accept: string]

const notices: Record<Locale, Notice> = {
  zh: ["Cookie 与隐私", "本站使用 Cookie，Google AdSense 也可能使用 Cookie 来个性化广告。", "隐私政策", "拒绝", "接受"],
  en: ["Cookies and privacy", "This site uses cookies. Google AdSense may use cookies to personalize ads.", "Privacy Policy", "Reject", "Accept"],
  ms: ["Kuki dan privasi", "Laman ini menggunakan kuki. Google AdSense mungkin menggunakan kuki untuk memperibadikan iklan.", "Dasar Privasi", "Tolak", "Terima"],
  ja: ["Cookie とプライバシー", "このサイトでは Cookie を使用します。Google AdSense が広告のパーソナライズに Cookie を使用する場合があります。", "プライバシーポリシー", "拒否", "同意"],
  ko: ["쿠키 및 개인정보 보호", "이 사이트는 쿠키를 사용합니다. Google AdSense는 광고 개인 맞춤설정에 쿠키를 사용할 수 있습니다.", "개인정보 처리방침", "거부", "동의"],
  th: ["คุกกี้และความเป็นส่วนตัว", "เว็บไซต์นี้ใช้คุกกี้ และ Google AdSense อาจใช้คุกกี้เพื่อปรับโฆษณาให้เหมาะกับคุณ", "นโยบายความเป็นส่วนตัว", "ปฏิเสธ", "ยอมรับ"],
  es: ["Cookies y privacidad", "Este sitio usa cookies. Google AdSense puede usar cookies para personalizar anuncios.", "Política de privacidad", "Rechazar", "Aceptar"],
}

const focus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c2f4df]"
const button = `min-h-11 rounded-xl border border-[#91b9ab] bg-[#203b33] px-4 text-sm font-semibold hover:bg-[#2b4a40] ${focus}`

export default function CookieConsent({ locale }: { locale: Locale }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY)
      setVisible(stored !== "accepted" && stored !== "rejected")
    } catch {
      setVisible(true)
    }
  }, [])

  function save(choice: Choice) {
    try {
      localStorage.setItem(CONSENT_KEY, choice)
    } catch {
      // Allow dismissal for this page if storage is unavailable.
    }
    setVisible(false)
  }

  if (!visible) return null
  const [title, description, privacy, reject, accept] = notices[locale]

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[9999] px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-5">
      <section aria-labelledby="cookie-notice-title" className="pointer-events-auto mx-auto flex max-w-4xl flex-col gap-4 rounded-3xl border border-[#53746b] bg-[#132723] p-4 text-[#f4faf6] shadow-2xl sm:flex-row sm:items-center sm:p-5">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <span className="hidden rounded-xl bg-[#25443a] p-2.5 text-[#c2f4df] min-[360px]:inline-flex"><ShieldCheck aria-hidden="true" size={22} /></span>
          <div className="min-w-0">
            <h2 id="cookie-notice-title" className="text-base font-semibold leading-snug">{title}</h2>
            <p className="mt-1 text-sm leading-relaxed text-[#d6e8df]">{description}</p>
            <a href={`/${locale}/privacy`} className={`mt-1 inline-flex min-h-8 items-center rounded-sm text-sm font-semibold text-[#c2f4df] underline underline-offset-4 hover:text-white ${focus}`}>{privacy}</a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:shrink-0">
          <button type="button" onClick={() => save("rejected")} className={button}>{reject}</button>
          <button type="button" onClick={() => save("accepted")} className={button}>{accept}</button>
        </div>
      </section>
    </div>
  )
}
