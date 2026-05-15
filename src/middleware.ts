import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const LOCALES = ["zh", "en", "ms", "ja", "ko", "th", "es"] as const
const LOCALE_COOKIE = "deepcalm-locale"
const LOCALE_PATTERN = /^\/(zh|en|ms|ja|ko|th|es)(\/|$)/
const SKIP_PATTERN = /^\/(_next|api|favicon\.ico|sitemap|robots|ads|images|audio|videos)/
const DEFAULT_LOCALE = "en"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (SKIP_PATTERN.test(pathname)) {
    return NextResponse.next()
  }

  if (LOCALE_PATTERN.test(pathname)) {
    const matchedLocale = pathname.match(LOCALE_PATTERN)?.[1] || DEFAULT_LOCALE
    const ua = request.headers.get("User-Agent") || ""
    const isCrawler = /Googlebot|bingbot|BingPreview|Slurp|DuckDuckBot|Baiduspider|YandexBot|facebot|facebookexternalhit|ia_archiver/i.test(ua)
    if (isCrawler) {
      const res = NextResponse.next()
      res.headers.set("x-deepcalm-locale", matchedLocale)
      return res
    }

    const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value
    const res = NextResponse.next()
    if (cookieLocale && cookieLocale !== matchedLocale) {
      res.cookies.set(LOCALE_COOKIE, matchedLocale, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
      })
    }
    res.headers.set("x-deepcalm-locale", matchedLocale)
    return res
  }

  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value
  const detected = cookieLocale && LOCALES.includes(cookieLocale as typeof LOCALES[number])
    ? cookieLocale
    : DEFAULT_LOCALE

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
  matcher: ["/((?!api|_next|favicon\\.ico|/?sitemap|/?robots|/?ads|audio|videos|images).*)"],
}
