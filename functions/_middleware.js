/**
 * Cloudflare Pages Middleware
 * Replaces Next.js middleware.ts for locale detection on static export.
 * DeepCalm AI — 7-locale i18n routing layer.
 */

const LOCALES = ["zh", "en", "ms", "ja", "ko", "th", "es"]
const LOCALE_COOKIE = "deepcalm-locale"
const DEFAULT_LOCALE = "en"
const LOCALE_PATTERN = /^\/(zh|en|ms|ja|ko|th|es)(\/|$)/
const SKIP_PATTERN = /^\/(_next|api|favicon\.ico|sitemap|robots|ads|images|audio|videos|social)\//
const CRAWLER_RE = /Googlebot|bingbot|BingPreview|Slurp|DuckDuckBot|Baiduspider|YandexBot|facebot|facebookexternalhit|ia_archiver/i

/**
 * Parse Accept-Language header to extract preferred locale.
 */
function detectFromAcceptLanguage(acceptLanguage) {
  if (!acceptLanguage) return null
  const preferred = acceptLanguage
    .split(",")
    .map((entry) => {
      const [lang, q = "q=1"] = entry.trim().split(";")
      const quality = parseFloat(q.replace("q=", "")) || 1
      return { lang: lang.split("-")[0].toLowerCase(), quality }
    })
    .sort((a, b) => b.quality - a.quality)
  for (const { lang } of preferred) {
    if (LOCALES.includes(lang)) return lang
  }
  return null
}

export async function onRequest(context) {
  const { request, next } = context
  const url = new URL(request.url)
  const { pathname } = url

  // ── Skip static assets and special paths ──
  if (SKIP_PATTERN.test(pathname)) {
    return await next(request)
  }

  // ── Path already has locale prefix ──
  if (LOCALE_PATTERN.test(pathname)) {
    const matchedLocale = pathname.match(LOCALE_PATTERN)?.[1] || DEFAULT_LOCALE
    const ua = request.headers.get("User-Agent") || ""
    const isCrawler = CRAWLER_RE.test(ua)

    // Set locale header for crawlers (Googlebot)
    const response = await next(request)
    response.headers.set("x-deepcalm-locale", matchedLocale)

    // Cookie sync
    const cookieLocale = getCookie(request.headers.get("Cookie"), LOCALE_COOKIE)
    if (cookieLocale && cookieLocale !== matchedLocale) {
      setCookie(response, LOCALE_COOKIE, matchedLocale)
    }
    return response
  }

  // ── No locale — detect and redirect ──
  const cookieLocale = getCookie(request.headers.get("Cookie"), LOCALE_COOKIE)
  let detected = DEFAULT_LOCALE
  if (cookieLocale && LOCALES.includes(cookieLocale)) {
    detected = cookieLocale
  } else {
    const acceptLang = request.headers.get("Accept-Language")
    const langFromHeader = detectFromAcceptLanguage(acceptLang)
    if (langFromHeader) detected = langFromHeader
  }

  const redirectUrl = `/${detected}${pathname}${url.search}`
  const response = new Response(null, {
    status: 308,
    headers: { Location: redirectUrl },
  })
  setCookie(response, LOCALE_COOKIE, detected)
  return response
}

function getCookie(cookieHeader, name) {
  if (!cookieHeader) return null
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=(.*?)(?:;|$)`))
  return match ? match[1] : null
}

function setCookie(response, name, value) {
  response.headers.append(
    "Set-Cookie",
    `${name}=${value}; Path=/; Max-Age=${60 * 60 * 24 * 365}; SameSite=Lax`
  )
}
