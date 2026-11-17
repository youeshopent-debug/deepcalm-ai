"use client"

import { MessageCircleHeart } from "lucide-react"
import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"
import { useRef, useState } from "react"
import { useLanguage } from "@/context/LanguageContext"

const AiCounselor = dynamic(() => import("./AiCounselor"), {
  loading: () => <div className="h-full animate-pulse bg-[#132723]" />,
})

const PANEL_ID = "deepcalm-quick-chat"

export default function FloatingCounselor() {
  const { locale, tt } = useLanguage()
  const pathname = usePathname()
  const [started, setStarted] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  if (pathname.replace(/\/$/, "") === `/${locale}/support`) return null

  const label = tt("aiCounselor.title")

  function closeChat() {
    panelRef.current?.hidePopover()
    triggerRef.current?.focus()
  }

  return (
    <div className="hidden lg:block">
      <button
        ref={triggerRef}
        type="button"
        {...{ popovertarget: PANEL_ID }}
        aria-label={label}
        title={label}
        onClick={() => {
          if (typeof panelRef.current?.showPopover !== "function") {
            window.location.assign(`/${locale}/support`)
            return
          }
          setStarted(true)
        }}
        className="fixed bottom-24 right-6 z-[105] flex h-14 w-14 items-center justify-center rounded-full border border-[#d2f2e2] bg-[#214b3a] text-[#effaf4] shadow-[0_8px_24px_rgba(0,0,0,0.45)] transition-colors hover:bg-[#326952] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c2f4df]"
      >
        <MessageCircleHeart aria-hidden="true" className="h-7 w-7" />
      </button>
      <div
        ref={panelRef}
        id={PANEL_ID}
        {...{ popover: "auto" }}
        role="dialog"
        aria-label={label}
        className="fixed inset-auto bottom-24 right-24 m-0 h-[min(38rem,calc(100dvh-7rem))] w-[min(26rem,calc(100vw-8rem))] overflow-hidden rounded-3xl border border-[#719486] bg-[#132723] shadow-2xl [--dc-text:#f4faf6] [--dc-muted:#d6e8df]"
      >
        {started && <AiCounselor compact onClose={closeChat} />}
      </div>
    </div>
  )
}
