import { NextRequest, NextResponse } from "next/server"

const SYSTEM_PROMPT = `你是一个温和的陪伴者。用户刚完成每日心情打卡，你需要根据他报告的"睡眠质量"和"当前情绪"生成一段 40-60 字的中文暖心点评。

规则：
- 语气像朋友，不要像导师或治疗师
- 不要分析，只要陪伴和温度
- 结合睡眠和情绪的组合来写：比如"没睡好+焦虑"要安抚，"睡得香+精力充沛"要鼓励
- 必须 40-60 字
- 只输出纯文本，不要任何格式标记

输出示例：
"昨晚没睡好，今天心情也跟着沉了一些——没关系，允许自己慢一点，深呼吸，今天不赶路。"`

const FALLBACK_COMMENTS: Record<string, string> = {
  "poor_anxious": "昨晚没睡好，心里又压着事——辛苦了。今天不需要解决所有问题，先喝杯温水，喘口气就好。",
  "poor_sad": "没睡好加上心里沉沉的，这种日子确实不好过。今晚早点躺下，让DeepCalm陪陪你。",
  "poor_tired": "没睡好又累，身体在提醒你需要休息了。今天少做一点，照顾好自己才是第一位的。",
  "great_happy": "睡得好，心情也好——今天的状态太棒了！抓住这份轻盈，去做一件你一直想做的事吧。",
  "great_energetic": "昨晚睡够了，今天电量满格！趁这股劲儿，去完成一件你拖了很久的小事吧。",
  "okay_calm": "还行，平静——这已经是很不错的状态了。生活不需要每天都精彩，安稳就很好。",
  "okay_anxious": "睡得还行，但心里还是有点悬着。没关系，焦虑不会永远在，陪自己再坐一会儿。",
  "okay_tired": "睡得一般，有点累——那就允许自己今天慢一点，少看手机，早点休息。",
}

function getFallback(sleep: string, mood: string): string {
  const key = `${sleep}_${mood}`
  if (FALLBACK_COMMENTS[key]) return FALLBACK_COMMENTS[key]
  const moodFallback: Record<string, string> = {
    calm: "平静的早晨就是最好的开始。今天不急，一步一来。",
    anxious: "有点焦虑也没关系——你的大脑只是在试图保护你。深呼吸，慢慢来。",
    tired: "累了就歇一歇，这不是软弱。你的能量会在安静中悄悄回流。",
    happy: "今天的状态很珍贵。记得多感受这份开心，它是你的内在力量。",
    sad: "低落的情绪会来，也会走。不用急着好起来，陪着自己就好。",
    energetic: "今天的你电量满格！趁这股劲儿，去做一件你一直拖着的小事吧。",
  }
  return moodFallback[mood] || "今天的你已经做得很好了。慢慢来，不着急。"
}

export async function POST(req: NextRequest) {
  try {
    const { sleep, mood } = await req.json()
    if (!sleep || !mood) {
      return NextResponse.json({ comment: getFallback("okay", "calm") })
    }

    const prompt = `用户昨晚睡眠质量：${sleep === "great" ? "睡得香" : sleep === "okay" ? "还行" : "没睡好"}
用户当前心情：${mood === "calm" ? "平静" : mood === "anxious" ? "焦虑" : mood === "tired" ? "疲惫" : mood === "happy" ? "不错" : mood === "sad" ? "低落" : "精力充沛"}

请结合这个组合，生成一段 40-60 字的暖心点评。`

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY || ""}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: prompt },
        ],
        max_tokens: 150,
        temperature: 0.8,
      }),
    })

    if (!res.ok) {
      return NextResponse.json({ comment: getFallback(sleep, mood) })
    }

    const data = await res.json()
    const comment = data.choices?.[0]?.message?.content?.trim()
    if (!comment) {
      return NextResponse.json({ comment: getFallback(sleep, mood) })
    }

    return NextResponse.json({ comment })
  } catch {
    return NextResponse.json({ comment: "今天的你已经做得很好了。慢慢来，不着急。" })
  }
}
