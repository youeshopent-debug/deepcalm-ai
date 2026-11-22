const WIDTH = 1080
const HEIGHT = 1350
const BODY_FONT = 'system-ui, "Noto Sans CJK SC", "Microsoft YaHei", "PingFang SC", sans-serif'

const FALLBACK_QUOTES: Record<string, string> = {
  zh: "给自己一点安静的时间。慢慢来，也是一种向前。",
  en: "Give yourself a quiet moment. Moving slowly is still moving forward.",
  ms: "Luangkan seketika untuk bertenang. Melangkah perlahan tetap membawa kita ke hadapan.",
  ja: "自分に静かなひとときを。ゆっくりでも、前に進んでいます。",
  ko: "나에게 조용한 시간을 선물하세요. 천천히 가는 것도 앞으로 나아가는 길입니다.",
  th: "ให้เวลาตัวเองได้พักใจสักครู่ ค่อย ๆ ก้าวไปก็ยังถือว่าเดินหน้า",
  es: "Regálate un momento de calma. Avanzar despacio también es avanzar.",
}

const POSTER_TIPS: Record<string, [string, string, string]> = {
  zh: ["现在可以做的小练习", "放松肩膀，按舒服的节奏慢慢呼吸几次。", "写下一件今天做得到的小事。"],
  en: ["Two small steps to try", "Relax your shoulders and take a few comfortable breaths.", "Write down one small thing you can do today."],
  ms: ["Dua langkah kecil", "Longgarkan bahu dan bernafas dengan selesa.", "Tulis satu perkara kecil yang boleh dibuat hari ini."],
  ja: ["今できる小さな一歩", "肩の力を抜き、楽なペースで数回呼吸しましょう。", "今日できる小さなことを一つ書いてみましょう。"],
  ko: ["지금 할 수 있는 작은 실천", "어깨의 힘을 빼고 편안한 속도로 몇 번 숨을 쉬세요.", "오늘 할 수 있는 작은 일 하나를 적어 보세요."],
  th: ["สองขั้นตอนเล็ก ๆ ที่ลองได้", "ผ่อนคลายไหล่และหายใจตามจังหวะที่สบาย", "เขียนสิ่งเล็ก ๆ หนึ่งอย่างที่ทำได้ในวันนี้"],
  es: ["Dos pequeños pasos", "Relaja los hombros y respira a un ritmo cómodo.", "Escribe una cosa pequeña que puedas hacer hoy."],
}

function wrapQuote(ctx: CanvasRenderingContext2D, text: string, width: number, maxLines: number) {
  const lines: string[] = []
  let line = ""

  for (const character of Array.from(text)) {
    const candidate = line + character
    if (line && ctx.measureText(candidate).width > width) {
      const space = line.lastIndexOf(" ")
      const wrapAt = space > 0 && line.length - space <= 18 ? space : line.length
      lines.push(line.slice(0, wrapAt).trim())
      line = (line.slice(wrapAt) + character).trimStart()
      if (lines.length === maxLines) {
        let last = lines[maxLines - 1].replace(/[.,!?，。！？]+$/, "")
        while (ctx.measureText(last + "…").width > width) last = last.slice(0, -1)
        lines[maxLines - 1] = last + "…"
        return lines
      }
    } else {
      line = candidate
    }
  }

  if (line.trim()) lines.push(line.trim())
  return lines
}

export function renderHealingPoster(reply: string | undefined, locale: string) {
  const canvas = document.createElement("canvas")
  canvas.width = WIDTH
  canvas.height = HEIGHT
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("Canvas is unavailable")

  const sky = ctx.createLinearGradient(0, 0, 0, HEIGHT)
  sky.addColorStop(0, "#0b1e26")
  sky.addColorStop(0.57, "#193c3c")
  sky.addColorStop(1, "#3f6556")
  ctx.fillStyle = sky
  ctx.fillRect(0, 0, WIDTH, HEIGHT)

  const glow = ctx.createRadialGradient(784, 318, 20, 784, 318, 510)
  glow.addColorStop(0, "rgba(236, 193, 121, 0.30)")
  glow.addColorStop(1, "rgba(236, 193, 121, 0)")
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, WIDTH, HEIGHT)

  ctx.strokeStyle = "#6b9085"
  ctx.lineWidth = 2
  ctx.strokeRect(42, 42, WIDTH - 84, HEIGHT - 84)

  ctx.fillStyle = "#e5c894"
  ctx.beginPath()
  ctx.arc(797, 298, 109, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.arc(797, 298, 137, 0, Math.PI * 2)
  ctx.stroke()

  ctx.fillStyle = "#f7e4b9"
  for (const [x, y, radius] of [[176, 263, 3], [271, 315, 4], [350, 246, 3], [510, 302, 2], [575, 219, 4], [935, 193, 3], [938, 402, 3], [635, 403, 2]]) {
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
  }

  const ridges = [
    { color: "#2f5953", points: [[0, 1087], [142, 991], [303, 1062], [512, 960], [710, 1050], [900, 943], [1080, 1018]] },
    { color: "#214741", points: [[0, 1159], [174, 1071], [372, 1142], [601, 1041], [839, 1144], [1080, 1059]] },
    { color: "#15352f", points: [[0, 1201], [209, 1145], [418, 1212], [693, 1131], [870, 1198], [1080, 1145]] },
  ]
  for (const { color, points } of ridges) {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.moveTo(points[0][0], points[0][1])
    for (const [x, y] of points.slice(1)) ctx.lineTo(x, y)
    ctx.lineTo(WIDTH, HEIGHT)
    ctx.lineTo(0, HEIGHT)
    ctx.closePath()
    ctx.fill()
  }

  ctx.fillStyle = "#f4dfad"
  ctx.font = '600 31px Georgia, serif'
  ctx.fillText("DeepCalm AI", 112, 140)
  ctx.fillRect(112, 175, 66, 2)

  ctx.font = '118px Georgia, serif'
  ctx.fillText("“", 107, 504)

  const plainReply = reply
    ?.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/https?:\/\/\S+/g, "")
    .replace(/(?:^|\n)\s*[-#>]+\s*/g, " ")
    .replace(/[*\x60]/g, "")
    .replace(/\s+/g, " ")
    .trim()
  const quote = plainReply || FALLBACK_QUOTES[locale] || FALLBACK_QUOTES.en
  ctx.fillStyle = "#f6f5e9"
  ctx.font = '500 55px ' + BODY_FONT
  wrapQuote(ctx, quote, 856, 4).forEach((line, index) => {
    ctx.fillText(line, 112, 562 + index * 73)
  })

  const [tipTitle, ...steps] = POSTER_TIPS[locale] || POSTER_TIPS.en
  ctx.fillStyle = "#112e2c"
  ctx.fillRect(88, 840, 904, 332)
  ctx.fillStyle = "#f4dfad"
  ctx.font = '600 39px ' + BODY_FONT
  ctx.fillText(tipTitle, 128, 903)

  ctx.fillStyle = "#f6f5e9"
  ctx.font = '500 33px ' + BODY_FONT
  let tipY = 966
  steps.forEach((step, index) => {
    ctx.fillText(String(index + 1).padStart(2, "0"), 128, tipY)
    for (const line of wrapQuote(ctx, step, 738, 2)) {
      ctx.fillText(line, 192, tipY)
      tipY += 45
    }
    tipY += 12
  })

  ctx.fillStyle = "#f4dfad"
  ctx.fillRect(112, 1201, 66, 2)
  ctx.font = '500 27px ' + BODY_FONT
  ctx.fillText('deepcalm-ai.com/' + locale, 112, 1254)

  const png = canvas.toDataURL("image/png")
  if (!png.startsWith("data:image/png;base64,")) throw new Error("PNG export failed")
  return png
}
