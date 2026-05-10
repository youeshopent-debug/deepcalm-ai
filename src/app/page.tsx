import { redirect } from "next/navigation"
import { cookies } from "next/headers"

const SUPPORTED_LOCALES = ["zh", "en", "ms", "ja", "ko", "th", "es"] as const
const LOCALE_COOKIE = "deepcalm-locale"

export default function RootPage() {
  const cookieStore = cookies()
  const locale = cookieStore.get(LOCALE_COOKIE)?.value

  if (locale && (SUPPORTED_LOCALES as readonly string[]).includes(locale)) {
    redirect(`/${locale}`)
  }

  redirect("/en")
}
