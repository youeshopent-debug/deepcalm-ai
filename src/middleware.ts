import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const LOCALES = ["zh", "en", "ms", "ja", "ko", "th", "es"] as const
const LOCALE_COOKIE = "deepcalm-locale"
const LOCALE_PATTERN = /^\/(zh|en|ms|ja|ko|th|es)(\/|$)/
const SKIP_PATTERN = /^\/(_next|api|favicon\.ico|sitemap|robots|ads|images|audio|videos|social)\//
const DEFAULT_LOCALE = "en"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ── HTTPS 强制合规：所有 http 请求 301 永久重定向至 https ──
  // 置于 locale 逻辑之前，确保任何明文请求先升级为加密通道。
  // 静态资源（_next 等）同样跳转，由 CDN/边缘层统一处理，避免混合内容。
  if (request.nextUrl.protocol === "http:") {
    const httpsUrl = request.nextUrl.clone()
    httpsUrl.protocol = "https:"
    httpsUrl.port = ""
    return NextResponse.redirect(httpsUrl, 301)
  }

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
  const response = NextResponse.redirect(url, 308)
  response.cookies.set(LOCALE_COOKIE, detected, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  })
  return response
}

export const config = {
  matcher: ["/((?!api|_next|favicon\\.ico|/?sitemap|/?robots|/?ads|audio|videos|images|social).*)"],
}
