"use client"

import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useRef, useState } from "react";

interface Message {
  id: number
  text: string
  timestamp: number
}

const SEED_MESSAGES: string[] = [
  // EN
  "I've been struggling with anxiety for years. This space helps me breathe.",
  "First time trying guided breathing. Is it normal to feel lightheaded?",
  "3 AM and I can't sleep. Thank you for being here.",
  "My therapist recommended CBT. This feels like a warm blanket for my mind.",
  "Just lost my job. Trying to find calm in the storm.",
  "4-7-8 breathing is literally saving my life right now.",
  "I usually feel so alone at this hour. Not tonight.",
  "First night here. The breathing circle is hypnotic. ❤️",
  "Can we talk about how hard it is to quiet your mind?",
  "Day 3 of using DeepCalm. I actually slept 6 hours last night.",
  // ZH
  "第一次尝试引导式呼吸，有点晕正常吗？",
  "凌晨3点睡不着，谢谢你们在这里。",
  "焦虑好几年了，这个空间让我能喘口气。",
  "刚刚丢了工作，想在这片风暴里找点平静。",
  "4-7-8 呼吸法真的救了我。",
  "平时这个点总觉得自己很孤独，今晚不一样。",
  "第一晚来，这个呼吸圈太催眠了 ❤️",
  "有没有人觉得安静下来其实特别难？",
  "用 DeepCalm 第三天，昨晚睡了6个小时。",
  "失眠第四天，希望今晚能好一点。",
  // JA
  "何年も不安と戦ってきました。この場所でやっと息ができます。",
  "初めてガイド付き呼吸を試しました。少しふらつくのは普通ですか？",
  "午前3時、眠れません。ここにいてくれてありがとう。",
  "セラピストにCBTを勧められました。心に優しい毛布をかけてもらった気分です。",
  "仕事を失ったばかりです。嵐の中で静けさを見つけようとしています。",
  "4-7-8呼吸法が今まさに私の命を救っています。",
  "いつもこの時間は孤独を感じます。今夜は違います。",
  "初めての夜です。呼吸サークルが催眠的で魅力的です。❤️",
  "心を静めるのがどれだけ難しいか、話してもいいですか？",
  "DeepCalmを使い始めて3日目。昨夜は6時間眠れました。",
  // MS
  "Saya bergelut dengan kebimbangan selama bertahun-tahun. Ruang ini membantu saya bernafas.",
  "Kali pertama mencuba pernafasan berpandu. Adakah biasa rasa pening?",
  "Pukul 3 pagi dan saya tak boleh tidur. Terima kasih kerana berada di sini.",
  "Terapis saya mengesyorkan CBT. Rasanya seperti selimut hangat untuk minda saya.",
  "Baru kehilangan pekerjaan. Cuba mencari ketenangan dalam badai.",
  "Pernafasan 4-7-8 benar-benar menyelamatkan saya sekarang.",
  "Biasanya saya rasa sangat bersendirian pada jam ini. Tidak malam ini.",
  "Malam pertama di sini. Bulatan pernafasan sangat memukau. ❤️",
  "Boleh kita bincangkan betapa sukarnya untuk menenangkan fikiran?",
  "Hari ke-3 menggunakan DeepCalm. Saya sebenarnya tidur 6 jam malam tadi.",
  // KO
  "몇 년 동안 불안과 싸워왔습니다. 이 공간이 제게 숨쉴 기회를 줍니다.",
  "처음으로 가이드 호흡을 해봤는데 어지러운 게 정상인가요?",
  "새벽 3시인데 잠이 안 옵니다. 여기 있어줘서 고마워요.",
  "상담사가 CBT를 추천했어요. 제 마음에 따뜻한 담요 같은 느낌이에요.",
  "방금 일을 잃었어요. 폭풍 속에서 평온을 찾으려고 해요.",
  "4-7-8 호흡법이 지금 제 생명을 구하고 있어요.",
  "보통 이 시간엔 외로움을 느껴요. 오늘 밤은 아니에요.",
  "첫 방문이에요. 호흡 서클이 정말 최면적이에요. ❤️",
  "마음을 조용히 하는 게 얼마나 어려운지 이야기해도 될까요?",
  "DeepCalm 사용 3일째입니다. 어젯밤에 6시간 잤어요.",
  // TH
  "ฉันต่อสู้กับความวิตกกังวลมาหลายปี พื้นที่แห่งนี้ช่วยให้ฉันหายใจได้",
  "ครั้งแรกที่ลองหายใจแบบมีคำแนะนำ อาการเวียนหัวเป็นเรื่องปกติไหม?",
  "ตี 3 แล้วนอนไม่หลับ ขอบคุณที่อยู่ตรงนี้",
  "นักบำบัดแนะนำ CBT ให้ฉัน รู้สึกเหมือนผ้าห่มอุ่น ๆ ห่อหุ้มจิตใจ",
  "เพิ่งตกงาน พยายามหาความสงบในพายุ",
  "การหายใจ 4-7-8 กำลังช่วยชีวิตฉันในตอนนี้",
  "ปกติฉันรู้สึกเหงามากในเวลานี้ แต่คืนนี้ไม่ใช่",
  "คืนแรกที่นี่ วงกลมหายใจช่างน่าหลงใหล ❤️",
  "เราคุยกันได้ไหมว่าการทำให้จิตใจสงบนั้นยากแค่ไหน",
  "วันที่ 3 ที่ใช้ DeepCalm เมื่อคืนนอนหลับไป 6 ชั่วโมง",
  // ES
  "He estado lidiando con la ansiedad durante años. Este espacio me ayuda a respirar.",
  "Primera vez probando la respiración guiada. ¿Es normal sentirse mareado?",
  "Son las 3 AM y no puedo dormir. Gracias por estar aquí.",
  "Mi terapeuta me recomendó TCC. Se siente como una manta cálida para mi mente.",
  "Acabo de perder mi trabajo. Buscando calma en la tormenta.",
  "La respiración 4-7-8 literalmente está salvando mi vida ahora mismo.",
  "Usualmente me siento tan solo a esta hora. Esta noche no.",
  "Primera noche aquí. El círculo de respiración es hipnótico. ❤️",
  "¿Podemos hablar de lo difícil que es silenciar tu mente?",
  "Día 3 usando DeepCalm. Anoche dormí 6 horas.",
]

export default function ResonanceWall() {
  const { tt, locale } = useLanguage()

  const [messages, setMessages] = useState<(Message & { fading?: boolean })[]>([])
  const [globalCount, setGlobalCount] = useState(0)
  const [input, setInput] = useState("")
  const [translations, setTranslations] = useState<Record<number, string | "loading">>({})

  useEffect(() => {
    setGlobalCount(Math.floor(Math.random() * 1501) + 500)
  }, [])
  const counterRef = useRef(0)

  function addMessage(text: string) {
    const id = Date.now()
    setMessages((prev) => [...prev, { id, text, timestamp: id }])
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, fading: true } : m))
      )
    }, 20000)
    setTimeout(() => {
      setMessages((prev) => prev.filter((m) => m.id !== id))
      setTranslations((prev) => {
        const next = { ...prev }
        delete next[id]
        return next
      })
    }, 22500)
  }

  async function handleTranslate(id: number, text: string) {
    if (translations[id] === "loading") return
    if (translations[id] && translations[id] !== "loading") {
      setTranslations((prev) => {
        const next = { ...prev }
        delete next[id]
        return next
      })
      return
    }
    setTranslations((prev) => ({ ...prev, [id]: "loading" }))
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, targetLang: locale }),
      })
      const data = await res.json()
      if (data.translated) {
        setTranslations((prev) => ({ ...prev, [id]: data.translated }))
      } else {
        setTranslations((prev) => {
          const next = { ...prev }
          delete next[id]
          return next
        })
      }
    } catch {
      setTranslations((prev) => {
        const next = { ...prev }
        delete next[id]
        return next
      })
    }
  }

  useEffect(() => {
    function addSeed() {
      const text = SEED_MESSAGES[counterRef.current % SEED_MESSAGES.length]
      counterRef.current++
      addMessage(text)
    }
    addSeed()
    const interval = setInterval(addSeed, 7000)
    return () => clearInterval(interval)
  }, [])

  function handleSend() {
    const text = input.trim()
    if (!text) return
    setInput("")
    addMessage(text)
  }

  return (
    <div className="rounded-3xl border border-[#53746b] bg-[#132723] p-5 shadow-xl sm:p-8">
      <div className="mb-5">
        <h2 id="resonance-wall-title" className="text-2xl font-bold text-[#f4faf6] sm:text-3xl">
          {tt("resonanceWall.title")}
        </h2>
        <p className="mt-2 text-base leading-relaxed text-[#c5dbd1]">
          {tt("resonanceWall.subtitle")}
        </p>
        <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#29473d] px-4 py-1.5">
          <span className="w-2 h-2 rounded-full bg-[#a5dec8]" />
          <span className="text-xs text-[#c5dbd1]">
            {tt("resonanceWall.counter").replace("{n}", globalCount.toLocaleString())}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative h-[300px] overflow-hidden rounded-2xl bg-[#1b342c]">
          <div className="absolute inset-0 overflow-y-auto scroll-smooth space-y-2 p-3 sm:p-4">
            {messages.map((msg) => {
              const t = translations[msg.id]
              const showTranslate = t && t !== "loading"
              return (
                <div
                  key={msg.id}
                  className={msg.fading ? "animate-fade-out-glow" : "animate-fade-in-glow"}
                >
                  <div className="inline-block max-w-full break-words rounded-xl bg-[#29473d] px-3 py-2 sm:max-w-[85%]">
                    <p className="text-sm text-[#f4faf6]">{msg.text}</p>
                    {t === "loading" && (
                      <p className="text-xs text-[#c5dbd1] italic mt-1">translating...</p>
                    )}
                    {showTranslate && (
                      <p className="text-xs text-[#c5dbd1] italic mt-1">{t}</p>
                    )}
                    <div className="flex items-center justify-between gap-3 mt-1">
                      <p className="text-xs text-[#c5dbd1]">
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <button
                        onClick={() => handleTranslate(msg.id, msg.text)}
                        className="inline-flex min-h-8 min-w-8 items-center justify-center rounded-md bg-[#1b342c] text-sm hover:bg-[#132723] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#a5dec8]"
                        title={showTranslate ? "Show original" : "Translate"}
                      >
                        🌐
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            aria-label={tt("resonanceWall.placeholder")}
            placeholder={tt("resonanceWall.placeholder")}
            className="min-h-11 min-w-40 flex-1 rounded-xl border border-[#76958a] bg-[#1b342c] px-4 py-2.5 text-base text-[#f4faf6] placeholder:text-[#c5dbd1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a5dec8]"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="min-h-11 shrink-0 rounded-xl bg-[#bdebd8] px-4 py-2.5 text-sm font-semibold text-[#132723] hover:bg-[#d6f4e7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a5dec8] disabled:cursor-not-allowed disabled:bg-[#35534a] disabled:text-[#dbe9e2]"
          >
            {tt("resonanceWall.submit")}
          </button>
        </div>
      </div>
    </div>
  )
}
