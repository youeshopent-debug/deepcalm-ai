"use client"

import { useState } from "react"
import { useLanguage } from "@/context/LanguageContext"

const COPY = {
  zh: ["此刻随笔", "这里的文字只在当前页面显示。关闭或刷新页面后会清除。", "写下此刻的感受…"],
  en: ["A moment to reflect", "Your note stays on this page and clears when you refresh or close it.", "Write how you feel right now…"],
  ms: ["Ruang refleksi", "Catatan ini kekal pada halaman ini dan hilang apabila halaman dimuat semula atau ditutup.", "Catat perasaan anda sekarang…"],
  ja: ["今の気持ちを記録", "メモはこのページだけに表示され、再読み込みやページを閉じると消えます。", "今の気持ちを書いてみましょう…"],
  ko: ["지금의 마음 기록", "메모는 이 페이지에만 표시되며 새로 고침하거나 닫으면 사라집니다.", "지금 기분을 적어 보세요…"],
  th: ["บันทึกความรู้สึก", "บันทึกจะแสดงเฉพาะหน้านี้และจะหายไปเมื่อรีเฟรชหรือปิดหน้า", "เขียนความรู้สึกตอนนี้…"],
  es: ["Un momento para reflexionar", "La nota solo aparece en esta página y se borra al recargarla o cerrarla.", "Escribe cómo te sientes ahora…"],
} as const

export default function ResonanceWall() {
  const { locale } = useLanguage()
  const [note, setNote] = useState("")
  const [title, description, placeholder] = COPY[locale] ?? COPY.en

  return (
    <div className="rounded-3xl border border-[#53746b] bg-[#132723] p-5 shadow-xl sm:p-8">
      <h2 id="resonance-wall-title" className="text-2xl font-bold text-[#f4faf6] sm:text-3xl">{title}</h2>
      <p id="reflection-privacy" className="mt-2 text-base leading-relaxed text-[#c5dbd1]">{description}</p>
      <textarea
        aria-label={title}
        aria-describedby="reflection-privacy"
        value={note}
        onChange={(event) => setNote(event.target.value)}
        placeholder={placeholder}
        rows={4}
        maxLength={2000}
        className="mt-5 w-full resize-y rounded-xl border border-[#719486] bg-[#1b342c] p-4 text-base leading-relaxed text-[#f4faf6] placeholder:text-[#c5dbd1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#bdebd8]"
      />
    </div>
  )
}
