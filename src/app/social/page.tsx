import SocialLanding from "@/components/SocialLanding"
import type { Metadata } from "next"

const title = "Sleep Guides and a 7-Day Sleep Diary | DeepCalm AI"
const description = "Explore breathing exercises, read the insomnia guide, and download a free seven-day sleep diary."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/social" },
  openGraph: { title, description, type: "website", images: ["/images/sleep-forest.webp"] },
  twitter: { card: "summary_large_image", title, description, images: ["/images/sleep-forest.webp"] },
}

export default function SocialPage() {
  return <SocialLanding />
}
