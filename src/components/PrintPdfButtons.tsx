"use client"

import type { Locale } from "@/types"
import { Printer, Download } from "lucide-react"

interface PrintPdfButtonsProps {
  locale: Locale
  slug: string
}

const BTN_LABELS: Record<string, Record<Locale, string>> = {
  print: {
    zh: "🖨️ 打印 / PDF 版本",
    en: "🖨️ Print / PDF",
    ms: "🖨️ Cetak / PDF",
    ja: "🖨️ 印刷 / PDF",
    ko: "🖨️ 인쇄 / PDF",
    th: "🖨️ พิมพ์ / PDF",
    es: "🖨️ Imprimir / PDF",
  },
  download: {
    zh: "📥 下载 PDF",
    en: "📥 Download PDF",
    ms: "📥 Muat Turun PDF",
    ja: "📥 PDF をダウンロード",
    ko: "📥 PDF 다운로드",
    th: "📥 ดาวน์โหลด PDF",
    es: "📥 Descargar PDF",
  },
}

const PDF_BASE = "https://deepcalm-ai.com/pdfs"

export default function PrintPdfButtons({ locale, slug }: PrintPdfButtonsProps) {
  const t = (key: string, fallback: string) => BTN_LABELS[key]?.[locale] || BTN_LABELS[key]?.en || fallback

  const handlePrint = () => {
    window.open(`/${locale}/library/${slug}/print`, "_blank")
  }

  const handleDownload = () => {
    const pdfUrl = `${PDF_BASE}/${locale}/${slug}.pdf`
    const link = document.createElement("a")
    link.href = pdfUrl
    link.download = `deepcalm-${slug}-${locale}.pdf`
    link.target = "_blank"
    link.rel = "noopener noreferrer"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-8 mb-4 no-print">
      <button
        onClick={handlePrint}
        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-nord-accent/10 hover:bg-nord-accent/20 text-nord-accent font-medium rounded-xl border border-nord-accent/20 hover:border-nord-accent/40 transition-all duration-300 text-sm"
      >
        <Printer className="w-4 h-4" />
        {t("print", "🖨️ Print / PDF")}
      </button>
      <button
        onClick={handleDownload}
        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-medium rounded-xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 text-sm"
      >
        <Download className="w-4 h-4" />
        {t("download", "📥 Download PDF")}
      </button>
    </div>
  )
}
