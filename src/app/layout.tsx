import type { ReactNode } from "react"
import "./globals.css"

export const metadata = {
  metadataBase: new URL("https://deepcalm-ai.com"),
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9587418043365530" crossOrigin="anonymous"></script>
      </head>
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  )
}
