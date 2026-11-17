import type { Locale } from "@/types"
import { Printer } from "lucide-react"

interface PrintPdfButtonsProps {
  locale: Locale
  slug: string
}

const printLabels: Record<Locale, string> = {
  zh: "打印 / 另存为 PDF",
  en: "Print / Save as PDF",
  ms: "Cetak / Simpan sebagai PDF",
  ja: "印刷 / PDFとして保存",
  ko: "인쇄 / PDF로 저장",
  th: "พิมพ์ / บันทึกเป็น PDF",
  es: "Imprimir / Guardar como PDF",
}

export default function PrintPdfButtons({ locale, slug }: PrintPdfButtonsProps) {
  return (
    <div className="mt-8 mb-4 no-print">
      <a
        href={`/${locale}/library/${slug}/print`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-nord-accent/10 hover:bg-nord-accent/20 text-nord-accent font-medium rounded-xl border border-nord-accent/20 hover:border-nord-accent/40 transition-all duration-300"
      >
        <Printer className="w-4 h-4" />
        {printLabels[locale]}
      </a>
    </div>
  )
}
