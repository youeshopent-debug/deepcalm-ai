"use client"

import { useState, useEffect } from "react"

const CONSENT_KEY = "deepcalm-cookie-consent"

type ConsentStatus = "accepted" | "rejected" | null

export default function CookieConsent() {
  const [consent, setConsent] = useState<ConsentStatus>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem(CONSENT_KEY) as ConsentStatus | null
    if (stored === "accepted" || stored === "rejected") {
      setConsent(stored)
    }
  }, [])

  function handleAccept() {
    localStorage.setItem(CONSENT_KEY, "accepted")
    setConsent("accepted")
  }

  function handleReject() {
    localStorage.setItem(CONSENT_KEY, "rejected")
    setConsent("rejected")
  }

  // Don't render until hydration to avoid flash; hide if already decided
  if (!mounted || consent !== null) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-3 sm:p-4">
      <div className="mx-auto max-w-3xl rounded-2xl border border-dc-border/30 bg-dc-surface/95 backdrop-blur-xl shadow-2xl p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <p className="text-xs sm:text-sm text-dc-text/80 leading-relaxed flex-1">
            This site uses cookies to improve your experience and support ad personalization via Google AdSense.
            By clicking "Accept", you consent to the use of all cookies.
            <a
              href="/en/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 text-dc-accent hover:text-dc-accent/80 underline transition-colors"
            >
              Privacy Policy
            </a>
          </p>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleReject}
              className="px-3 py-1.5 text-xs font-medium text-dc-text/60 hover:text-dc-text border border-dc-border/30 rounded-lg hover:border-dc-border/60 transition-all"
            >
              Reject
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-dc-accent hover:bg-dc-accent/90 rounded-lg transition-all"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
