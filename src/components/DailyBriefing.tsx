import type { Locale } from "@/types"

/**
 * SSR 每日健康简报组件
 * 7 语言 × 7 天 = 49 条微行动健康提示
 * 服务端按星期几轮换渲染，零客户端开销
 */

const BRIEFINGS: Record<Locale, string[]> = {
  zh: [
    "🌅 周一·重置：今晚比平时早睡 20 分钟，关闭所有屏幕，让大脑从上周的疲惫中真正恢复。",
    "🌿 周二·连接：今天给自己 5 分钟静坐，不思考任何事，只是感受呼吸在鼻腔进出的温度。",
    "💧 周三·释放：写下一件让你焦虑的事，然后划掉它——告诉自己：不是所有事都需要今天解决。",
    "🌙 周四·修复：睡前做一次身体扫描：从脚趾到头顶，逐一放松每个部位，释放累积的肌肉紧张。",
    "✨ 周五·感恩：写下三件今天让你感到温暖的小事——一杯好咖啡、一句问候、一段安静的音乐。",
    "🌀 周六·边界：今天练习说一次「不」。保护自己的时间和能量不是自私，而是必要的自我照顾。",
    "🌟 周日·蓄能：为下周设定一个最小的「锚点习惯」——比如每天起床后喝一杯温水，并深呼吸三次。",
  ],
  en: [
    "🌅 Monday · Reset: Go to bed 20 minutes earlier tonight. No screens. Let your brain truly recover from last week.🔄",
    "🌿 Tuesday · Connect: Sit in silence for 5 minutes today. Don't think — just feel the air entering and leaving your nose.🌬️",
    "💧 Wednesday · Release: Write down one thing worrying you, then cross it out. Not everything needs solving today.✍️",
    "🌙 Thursday · Repair: Before sleep, do a body scan — toes to crown. Release every pocket of tension you've been holding.🧘",
    "✨ Friday · Gratitude: List three small things that brought you warmth today — a good coffee, a kind word, a quiet song.☕",
    "🌀 Saturday · Boundary: Practice saying 'no' once today. Protecting your time isn't selfish — it's necessary self-care.🛡️",
    "🌟 Sunday · Charge: Set one tiny 'anchor habit' for next week — like drinking warm water and taking three deep breaths every morning.⛓️",
  ],
  ms: [
    "🌅 Isnin · Set Semula: Tidur 20 minit lebih awal malam ini. Tanpa skrin. Biarkan otak benar-benar pulih.🔄",
    "🌿 Selasa · Hubung: Duduk diam 5 minit hari ini. Jangan berfikir — hanya rasa udara masuk dan keluar hidung.🌬️",
    "💧 Rabu · Lepaskan: Tulis satu perkara yang merisaukan anda, kemudian potong. Bukan semua perlu diselesaikan hari ini.✍️",
    "🌙 Khamis · Baik Pulih: Sebelum tidur, imbasan badan — jari kaki ke kepala. Lepaskan setiap ketegangan.🧘",
    "✨ Jumaat · Syukur: Senaraikan tiga perkara kecil yang hangatkan hari anda — kopi, kata-kata baik, lagu tenang.☕",
    "🌀 Sabtu · Sempadan: Amalkan kata 'tidak' sekali hari ini. Melindungi masa anda bukan mementingkan diri.🛡️",
    "🌟 Ahad · Cas Semula: Tetapkan satu 'tabiat sauh' untuk minggu depan — air suam dan tiga nafas dalam setiap pagi.⛓️",
  ],
  ja: [
    "🌅 月曜·リセット：今夜はいつもより20分早く就寝。画面オフ。脳を先週の疲れから本当に回復させましょう。🔄",
    "🌿 火曜·つながり：今日は5分間静坐する。何も考えず、鼻から空気が出入りする感覚だけに集中。🌬️",
    "💧 水曜·解放：気がかりなことを一つ書き出し、線で消す——すべてを今日解決する必要はない。✍️",
    "🌙 木曜·修復：就寝前にボディスキャン——つま先から頭頂まで、溜め込んだ緊張を一つずつ解放。🧘",
    "✨ 金曜·感謝：今日あなたを温かくした3つの小さなことを挙げる——良いコーヒー、優しい言葉、静かな音楽。☕",
    "🌀 土曜·境界：今日一度だけ「ノー」と言う練習。自分の時間を守ることはわがままではなく、必要なセルフケア。🛡️",
    "🌟 日曜·充電：来週のための最小の「アンカー習慣」を一つ決める——朝起きたら温水を飲み、3回深呼吸する。⛓️",
  ],
  ko: [
    "🌅 월요일·리셋: 오늘 밤 평소보다 20분 일찍 취침. 화면 꺼짐. 뇌가 지난주의 피로에서 진정으로 회복하게 하세요.🔄",
    "🌿 화요일·연결: 오늘 5분간 조용히 앉아 있기. 생각하지 말고 — 코로 공기가 들고 나는 느낌만 느끼기.🌬️",
    "💧 수요일·해방: 걱정되는一件事를 쓰고, 줄을 그어 지우기 — 모든 것을 오늘 해결할 필요는 없어요.✍️",
    "🌙 목요일·회복: 자기 전에 바디 스캔 — 발가락에서 정수리까지, 쌓인 긴장을 하나씩 풀어주기.🧘",
    "✨ 금요일·감사: 오늘 나를 따뜻하게 한 세 가지 작은 일 적기 — 좋은 커피, 다정한 말, 조용한 음악.☕",
    "🌀 토요일·경계: 오늘 한 번 '아니오'라고 말하기 연습. 내 시간을 보호하는 것은 이기심이 아니라 필요한 자기 돌봄.🛡️",
    "🌟 일요일·충전: 다음 주를 위한 가장 작은 '앵커 습관' 하나 설정 — 매일 아침 따뜻한 물 마시고 세 번 심호흡.⛓️",
  ],
  th: [
    "🌅 จันทร์·รีเซ็ต: เข้านอนเร็วขึ้น 20 นาทีคืนนี้ ปิดหน้าจอทั้งหมด ปล่อยให้สมองฟื้นตัวจากสัปดาห์ที่แล้วจริงๆ🔄",
    "🌿 อังคาร·เชื่อมต่อ: นั่งเงียบๆ 5 นาทีวันนี้ ไม่ต้องคิด — แค่รู้สึกถึงลมหายใจเข้า-ออกทางจมูก🌬️",
    "💧 พุธ·ปลดปล่อย: เขียนสิ่งหนึ่งที่กังวลใจ แล้วขีดฆ่ามัน — ไม่ใช่ทุกอย่างต้องแก้ไขวันนี้✍️",
    "🌙 พฤหัส·ซ่อมแซม: ก่อนนอน สแกนร่างกาย — จากปลายเท้าถึงศีรษะ ปลดปล่อยความตึงเครียดที่สะสมไว้ทีละส่วน🧘",
    "✨ ศุกร์·ขอบคุณ: เขียนสามสิ่งเล็กๆ ที่ทำให้วันนี้ของคุณอบอุ่น — กาแฟดีๆ คำพูดใจดี เพลงเงียบๆ☕",
    "🌀 เสาร์·ขอบเขต: ฝึกพูดคำว่า 'ไม่' หนึ่งครั้งวันนี้ การปกป้องเวลาและพลังงานของคุณไม่ใช่ความเห็นแก่ตัว🛡️",
    "🌟 อาทิตย์·ชาร์จ: กำหนด 'นิสัยหลัก' เล็กๆ หนึ่งอย่างสำหรับสัปดาห์หน้า — ดื่มน้ำอุ่นและหายใจลึกสามครั้งทุกเช้า⛓️",
  ],
  es: [
    "🌅 Lunes · Reinicio: Acuéstate 20 min antes esta noche. Sin pantallas. Deja que tu cerebro se recupere de verdad.🔄",
    "🌿 Martes · Conexión: Siéntate en silencio 5 minutos hoy. No pienses — solo siente el aire entrar y salir.🌬️",
    "💧 Miércoles · Libera: Escribe algo que te preocupe y táchalo — no todo necesita solución hoy.✍️",
    "🌙 Jueves · Repara: Antes de dormir, escanea tu cuerpo — dedos a coronilla. Suelta cada tensión acumulada.🧘",
    "✨ Viernes · Gratitud: Enumera tres cosas pequeñas que te dieron calidez hoy — buen café, palabra amable, canción tranquila.☕",
    "🌀 Sábado · Límite: Practica decir 'no' una vez hoy. Proteger tu tiempo no es egoísmo, es autocuidado necesario.🛡️",
    "🌟 Domingo · Recarga: Establece un 'hábito ancla' mínimo para la próxima semana — agua tibia y tres respiraciones profundas cada mañana.⛓️",
  ],
}

interface DailyBriefingProps {
  lang: Locale
}

export default function DailyBriefing({ lang }: DailyBriefingProps) {
  const dayOfWeek = new Date().getDay() // 0=Sun ... 6=Sat
  // Adjust: Mon=0, Tue=1, ..., Sun=6
  const adjustedDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1
  const tips = BRIEFINGS[lang] || BRIEFINGS.en
  const tip = tips[adjustedDay] || tips[0]

  return (
    <section aria-labelledby="daily-briefing" className="mx-auto max-w-3xl px-4 pb-5 sm:px-6">
      <div className="flex items-start gap-3 rounded-3xl border border-[#b8d3c3] bg-[#e9f4ed] p-5 shadow-xl sm:gap-4 sm:p-8">
        <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#d4eadd]">📋</span>
        <div className="min-w-0">
          <h2 id="daily-briefing" className="text-lg font-semibold text-[#214b3a]">
            {lang === "zh" ? "今日健康简报" : lang === "ms" ? "Ringkasan Kesihatan Harian" : lang === "ja" ? "今日の健康ブリーフィング" : lang === "ko" ? "오늘의 건강 브리핑" : lang === "th" ? "สรุปสุขภาพประจำวัน" : lang === "es" ? "Resumen de Salud de Hoy" : "Daily Health Briefing"}
          </h2>
          <p className="mt-2 text-base leading-relaxed text-[#263e34]">
            {tip}
          </p>
        </div>
      </div>
    </section>
  )
}
