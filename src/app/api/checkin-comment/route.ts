import { NextRequest, NextResponse } from "next/server"

const LANG_MAP: Record<string, string> = {
  zh: "Chinese",
  en: "English",
  ms: "Malay",
  ja: "Japanese",
  ko: "Korean",
  th: "Thai",
  es: "Spanish",
}

const SYSTEM_PROMPT_BASE = `You are a gentle companion. The user just completed their daily mood check-in. Generate a warm, supportive comment (40-60 words) based on their reported "sleep quality" and "current mood".

Rules:
- Tone: like a friend, not a therapist or coach
- No analysis, just warmth and presence
- Combine sleep and mood naturally in the comment
- Plain text only, no formatting, no emoji
- CRITICAL: Respond in`

const SLEEP_LABELS: Record<string, string> = {
  great: "slept well",
  okay: "slept okay",
  poor: "didn't sleep well",
}

const MOOD_LABELS: Record<string, string> = {
  calm: "calm",
  anxious: "anxious",
  tired: "tired",
  happy: "happy",
  sad: "sad",
  energetic: "full of energy",
}

const FALLBACKS_ZH: Record<string, string> = {
  poor_anxious: "昨晚没睡好，心里又压着事——辛苦了。今天不需要解决所有问题，先喝杯温水，喘口气就好。",
  poor_sad: "没睡好加上心里沉沉的，这种日子确实不好过。今晚早点躺下，让DeepCalm陪陪你。",
  poor_tired: "没睡好又累，身体在提醒你需要休息了。今天少做一点，照顾好自己才是第一位的。",
  great_happy: "睡得好，心情也好——今天的状态太棒了！抓住这份轻盈，去做一件你一直想做的事吧。",
  great_energetic: "昨晚睡够了，今天电量满格！趁这股劲儿，去完成一件你拖了很久的小事吧。",
  okay_calm: "还行，平静——这已经是很不错的状态了。生活不需要每天都精彩，安稳就很好。",
  okay_anxious: "睡得还行，但心里还是有点悬着。没关系，焦虑不会永远在，陪自己再坐一会儿。",
  okay_tired: "睡得一般，有点累——那就允许自己今天慢一点，少看手机，早点休息。",
  calm: "平静的早晨就是最好的开始。今天不急，一步一来。",
  anxious: "有点焦虑也没关系——你的大脑只是在试图保护你。深呼吸，慢慢来。",
  tired: "累了就歇一歇，这不是软弱。你的能量会在安静中悄悄回流。",
  happy: "今天的状态很珍贵。记得多感受这份开心，它是你的内在力量。",
  sad: "低落的情绪会来，也会走。不用急着好起来，陪着自己就好。",
  energetic: "今天的你电量满格！趁这股劲儿，去做一件你一直拖着的小事吧。",
  _default: "今天的你已经做得很好了。慢慢来，不着急。",
}

const FALLBACKS_JA: Record<string, string> = {
  poor_anxious: "昨夜はあまり眠れず、心に重いものが——お疲れさまです。今日はすべてを解決しようとしなくていいです。まずは一息つきましょう。",
  poor_sad: "眠れなくて気分も沈んでいる——そんな日は確かに辛いです。今夜は早めに休んで、DeepCalmがそばにいます。",
  poor_tired: "眠れなくて疲れている——体が休息を求めています。今日は無理をせず、自分を優先しましょう。",
  great_happy: "よく眠れて気分もいい——今日のコンディションは最高です！この軽やかさを大事にしてください。",
  great_energetic: "十分に眠れてエネルギー満タン！この勢いで、先延ばしにしていたことを一つ片付けましょう。",
  okay_calm: "まあまあ、穏やか——それで十分良い状態です。毎日が完璧でなくていい、穏やかでいいのです。",
  okay_anxious: "睡眠はまあまあでも心は少し落ち着かない——大丈夫。不安は永遠には続きません。",
  okay_tired: "睡眠は普通、少し疲れている——今日はゆっくり過ごして早めに休みましょう。",
  calm: "穏やかな朝は最高の始まりです。今日は急がず、一歩ずつ。",
  anxious: "少し不安でも大丈夫——脳はあなたを守ろうとしているだけです。深呼吸して、ゆっくりいきましょう。",
  tired: "疲れたら休んでいい——それは弱さではありません。エネルギーは静けさの中で戻ってきます。",
  happy: "今日の状態はとても貴重です。この嬉しさをしっかり感じてください。",
  sad: "落ち込みは来て、そして去っていきます。無理に元気になろうとしなくていいです。",
  energetic: "今日はエネルギー満タン！この勢いで、やりたかったことをやってみましょう。",
  _default: "今日のあなたはよく頑張っています。ゆっくりで大丈夫です。",
}

const FALLBACKS_EN: Record<string, string> = {
  poor_anxious: "Tough night with a heavy mind — you've been through a lot. You don't need to solve everything today. Just breathe.",
  poor_sad: "A bad sleep and a heavy heart — that's hard. Rest early tonight and let DeepCalm keep you company.",
  poor_tired: "Poor sleep and feeling drained — your body is asking for rest. Scale back today and put yourself first.",
  great_happy: "Slept well and feeling good — today's energy is golden! Hold onto this lightness.",
  great_energetic: "Great sleep and full energy — use this momentum to tackle something you've been putting off.",
  okay_calm: "Alright and calm — that's a solid state. Not every day needs to be amazing, steady is good too.",
  okay_anxious: "Slept okay but feeling a bit on edge — that's alright. Anxiety won't last forever. Sit with yourself a little longer.",
  okay_tired: "Slept okay but feeling tired — give yourself permission to slow down today and rest early.",
  calm: "A calm morning is the best start. No rush today — one step at a time.",
  anxious: "Feeling anxious is okay — your brain is just trying to protect you. Take a deep breath and go easy.",
  tired: "Tired? Rest. This isn't weakness. Your energy will quietly recharge while you pause.",
  happy: "This feeling is precious. Savor it — it's fuel for your inner strength.",
  sad: "Low feelings come and go. You don't need to rush to feel better. Just be with yourself.",
  energetic: "Full energy today! Use this momentum to do one thing you've been putting off.",
  _default: "You're doing great. Take it easy — there's no rush.",
}

function getLocalizedFallback(sleep: string, mood: string, lang: string): string {
  const map: Record<string, Record<string, string>> = {
    zh: FALLBACKS_ZH,
    ja: FALLBACKS_JA,
  }
  const fb = map[lang] || FALLBACKS_EN
  const key = `${sleep}_${mood}`
  if (fb[key]) return fb[key]
  if (fb[mood]) return fb[mood]
  return fb._default || FALLBACKS_EN._default
}

export async function POST(req: NextRequest) {
  try {
    const { sleep, mood, lang = "zh" } = await req.json()
    const langName = LANG_MAP[lang] || "Chinese"

    if (!sleep || !mood) {
      return NextResponse.json({ comment: getLocalizedFallback("okay", "calm", lang) })
    }

    const SYSTEM_PROMPT = `${SYSTEM_PROMPT_BASE} ${langName}.`

    const prompt = `User's sleep quality: ${SLEEP_LABELS[sleep] || sleep}
User's current mood: ${MOOD_LABELS[mood] || mood}

Generate a warm comment that combines these two.`

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
        max_tokens: 200,
        temperature: 0.8,
      }),
    })

    if (!res.ok) {
      return NextResponse.json({ comment: getLocalizedFallback(sleep, mood, lang) })
    }

    const data = await res.json()
    const comment = data.choices?.[0]?.message?.content?.trim()
    if (!comment) {
      return NextResponse.json({ comment: getLocalizedFallback(sleep, mood, lang) })
    }

    return NextResponse.json({ comment })
  } catch {
    return NextResponse.json({ comment: getLocalizedFallback("okay", "calm", "en") })
  }
}
