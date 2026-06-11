import type { ReactNode } from "react"
import "./globals.css"
import HtmlLangSetter from "@/components/HtmlLangSetter"
import { WebsiteJsonLd, OrganizationJsonLd, PersonJsonLd } from "@/components/JsonLd"

export const metadata = {
  metadataBase: new URL("https://deepcalm-ai.com"),
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9587418043365530" crossOrigin="anonymous"></script>
        <WebsiteJsonLd />
        <OrganizationJsonLd />
        <PersonJsonLd />
      </head>
      <body className="min-h-screen flex flex-col">
        {children}
        <HtmlLangSetter />
      </body>
    </html>
  )
}
