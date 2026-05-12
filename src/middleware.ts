import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const LOCALES = ["zh", "en", "ms", "ja", "ko", "th", "es"] as const
const LOCALE_COOKIE = "deepcalm-locale"
const LOCALE_PATTERN = /^\/(zh|en|ms|ja|ko|th|es)(\/|$)/
const SKIP_PATTERN = /^\/(_next|api|favicon\.ico|sitemap|robots|images|audio)/
const DEFAULT_LOCALE = "zh"

function getPreferredLocale(acceptLang: string): string {
  const langs = acceptLang
    .split(",")
    .map((l) => {
      const [tag] = l.trim().split(";")
      return tag?.split("-")[0]?.trim().toLowerCase()
    })
    .filter(Boolean)

  for (const l of langs) {
    if (LOCALES.includes(l as typeof LOCALES[number])) {
      return l
    }
  }
  return DEFAULT_LOCALE
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (SKIP_PATTERN.test(pathname)) {
    return NextResponse.next()
  }

  if (LOCALE_PATTERN.test(pathname)) {
          const ua = request.headers.get("User-Agent") || ""
          const isCrawler = /Googlebot|bingbot|BingPreview|Slurp|DuckDuckBot|Baiduspider|YandexBot|facebot|facebookexternalhit|ia_archiver/i.test(ua)
          if (isCrawler) return NextResponse.next()

          const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value
          if (cookieLocale && LOCALES.includes(cookieLocale as typeof LOCALES[number])) {
            const currentLocale = pathname.match(LOCALE_PATTERN)?.[1]
            if (currentLocale !== cookieLocale) {
              const newPath = pathname.replace(/^\/(zh|en|ms|ja|ko|th|es)/, `/${cookieLocale}`)
              const url = request.nextUrl.clone()
              url.pathname = newPath
              return NextResponse.redirect(url)
            }
          }
          return NextResponse.next()
        }

  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value
  const detected = cookieLocale && LOCALES.includes(cookieLocale as typeof LOCALES[number])
    ? cookieLocale
    : getPreferredLocale(request.headers.get("Accept-Language") || "")

  const url = request.nextUrl.clone()
  url.pathname = `/${detected}${pathname}`
  const response = NextResponse.redirect(url)
  response.cookies.set(LOCALE_COOKIE, detected, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  })
  return response
}

export const config = {
  matcher: ["/((?!api|_next|favicon\\.ico|sitemap|robots|audio).*)"],
}
