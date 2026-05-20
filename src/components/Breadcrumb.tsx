import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface Crumb {
  label: string
  href: string
}

interface BreadcrumbProps {
  items: Crumb[]
  locale: string
}

export default function Breadcrumb({ items, locale }: BreadcrumbProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://deepcalm-ai.com/${locale}` },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.label,
        item: `https://deepcalm-ai.com${item.href}`,
      })),
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-1.5 text-sm text-nord-text/40">
          <li>
            <Link href={`/${locale}`} className="hover:text-nord-accent transition-colors">
              <Home className="w-3.5 h-3.5" />
            </Link>
          </li>
          {items.map((item) => (
            <li key={item.href} className="flex items-center gap-1.5">
              <ChevronRight className="w-3 h-3" />
              <Link href={item.href} className="hover:text-nord-accent transition-colors">
                {item.label}
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
