/**
 * Cloudflare Pages Function — checkin-comment
 *
 * Endpoint: POST /api/checkin-comment
 * Generates a warm comment based on user's sleep quality and mood.
 * Falls back to hardcoded multilingual responses on API failure.
 */

const LANG_MAP = {
  zh: "Chinese",
  en: "English",
  ms: "Malay",
  ja: "Japanese",
  ko: "Korean",
  th: "Thai",
  es: "Spanish",
}

const SLEEP_LABELS = { great: "slept well", okay: "slept okay", poor: "didn't sleep well" }
const MOOD_LABELS = {
  calm: "calm", anxious: "anxious", tired: "tired", happy: "happy",
  sad: "sad", energetic: "full of energy",
}

const FB = {
  zh: {
    poor_anxious: "\u6628\u665a\u6ca1\u7761\u597d\uff0c\u5fc3\u91cc\u53c8\u538b\u7740\u4e8b\u2014\u2014\u8f9b\u82e6\u4e86\u3002\u4eca\u5929\u4e0d\u9700\u8981\u89e3\u51b3\u6240\u6709\u95ee\u9898\uff0c\u5148\u559d\u676f\u6e29\u6c34\uff0c\u5598\u53e3\u6c14\u5c31\u597d\u3002",
    poor_sad: "\u6ca1\u7761\u597d\u52a0\u4e0a\u5fc3\u91cc\u6c89\u6c89\u7684\uff0c\u8fd9\u79cd\u65e5\u5b50\u786e\u5b9e\u4e0d\u597d\u8fc7\u3002\u4eca\u665a\u65e9\u70b9\u8eba\u4e0b\uff0c\u8ba9DeepCalm\u966a\u966a\u4f60\u3002",
    poor_tired: "\u6ca1\u7761\u597d\u53c8\u7d2f\uff0c\u8eab\u4f53\u5728\u63d0\u9192\u4f60\u9700\u8981\u4f11\u606f\u4e86\u3002\u4eca\u5929\u5c11\u505a\u4e00\u70b9\uff0c\u7167\u987e\u597d\u81ea\u5df1\u624d\u662f\u7b2c\u4e00\u4f4d\u7684\u3002",
    great_happy: "\u7761\u5f97\u597d\uff0c\u5fc3\u60c5\u4e5f\u597d\u2014\u2014\u4eca\u5929\u7684\u72b6\u6001\u592a\u68d2\u4e86\uff01\u628a\u63e1\u8fd9\u4efd\u8f7b\u76c8\uff0c\u53bb\u505a\u4e00\u4ef6\u4f60\u4e00\u76f4\u60f3\u505a\u7684\u4e8b\u5427\u3002",
    great_energetic: "\u6628\u665a\u7761\u591f\u4e86\uff0c\u4eca\u5929\u7535\u91cf\u6ee1\u683c\uff01\u8d81\u8fd9\u80a1\u52b2\u513f\uff0c\u53bb\u5b8c\u6210\u4e00\u4ef6\u4f60\u62d6\u4e86\u5f88\u4e45\u7684\u5c0f\u4e8b\u5427\u3002",
    okay_calm: "\u8fd8\u884c\uff0c\u5e73\u9759\u2014\u2014\u8fd9\u5df2\u7ecf\u662f\u5f88\u4e0d\u9519\u7684\u72b6\u6001\u4e86\u3002\u751f\u6d3b\u4e0d\u9700\u8981\u6bcf\u5929\u90fd\u7cbe\u5f69\uff0c\u5b89\u7a33\u5c31\u5f88\u597d\u3002",
    okay_anxious: "\u7761\u5f97\u8fd8\u884c\uff0c\u4f46\u5fc3\u91cc\u8fd8\u662f\u6709\u70b9\u60ac\u7740\u3002\u6ca1\u5173\u7cfb\uff0c\u7126\u8651\u4e0d\u4f1a\u6c38\u8fdc\u5728\uff0c\u966a\u81ea\u5df1\u518d\u5750\u4e00\u4f1a\u513f\u3002",
    okay_tired: "\u7761\u5f97\u4e00\u822c\uff0c\u6709\u70b9\u7d2f\u2014\u2014\u90a3\u5c31\u5141\u8bb8\u81ea\u5df1\u4eca\u5929\u6162\u4e00\u70b9\uff0c\u5c11\u770b\u624b\u673a\uff0c\u65e9\u70b9\u4f11\u606f\u3002",
    calm: "\u5e73\u9759\u7684\u65e9\u6668\u5c31\u662f\u6700\u597d\u7684\u5f00\u59cb\u3002\u4eca\u5929\u4e0d\u6025\uff0c\u4e00\u6b65\u4e00\u6765\u3002",
    anxious: "\u6709\u70b9\u7126\u8651\u4e5f\u6ca1\u5173\u7cfb\u2014\u2014\u4f60\u7684\u5927\u8111\u53ea\u662f\u5728\u8bd5\u56fe\u4fdd\u62a4\u4f60\u3002\u6df1\u547c\u5438\uff0c\u6162\u6162\u6765\u3002",
    tired: "\u7d2f\u4e86\u5c31\u6b47\u4e00\u6b47\uff0c\u8fd9\u4e0d\u662f\u8f6f\u5f31\u3002\u4f60\u7684\u80fd\u91cf\u4f1a\u5728\u5b89\u9759\u4e2d\u6084\u6084\u56de\u6d41\u3002",
    happy: "\u4eca\u5929\u7684\u72b6\u6001\u5f88\u73cd\u8d35\u3002\u8bb0\u5f97\u591a\u611f\u53d7\u8fd9\u4efd\u5f00\u5fc3\uff0c\u5b83\u662f\u4f60\u7684\u5185\u5728\u529b\u91cf\u3002",
    sad: "\u4f4e\u843d\u7684\u60c5\u7eea\u4f1a\u6765\uff0c\u4e5f\u4f1a\u8d70\u3002\u4e0d\u7528\u6025\u7740\u597d\u8d77\u6765\uff0c\u966a\u7740\u81ea\u5df1\u5c31\u597d\u3002",
    energetic: "\u4eca\u5929\u7684\u4f60\u7535\u91cf\u6ee1\u683c\uff01\u8d81\u8fd9\u80a1\u52b2\u513f\uff0c\u53bb\u505a\u4e00\u4ef6\u4f60\u4e00\u76f4\u62d6\u7740\u7684\u5c0f\u4e8b\u5427\u3002",
    _default: "\u4eca\u5929\u7684\u4f60\u5df2\u7ecf\u505a\u5f97\u5f88\u597d\u4e86\u3002\u6162\u6162\u6765\uff0c\u4e0d\u7740\u6025\u3002",
  },
  ja: {
    poor_anxious: "\u6628\u591c\u306f\u3042\u307e\u308a\u7720\u308c\u305a\u3001\u5fc3\u306b\u91cd\u3044\u3082\u306e\u304c\u2014\u2014\u304a\u75b2\u308c\u3055\u307e\u3067\u3059\u3002\u4eca\u65e5\u306f\u3059\u3079\u3066\u3092\u89e3\u6c7a\u3057\u3088\u3046\u3068\u3057\u306a\u304f\u3066\u3044\u3044\u3067\u3059\u3002\u307e\u305a\u306f\u4e00\u606f\u3064\u304d\u307e\u3057\u3087\u3046\u3002",
    poor_sad: "\u7720\u308c\u306a\u304f\u3066\u6c17\u5206\u3082\u6c88\u3093\u3067\u3044\u308b\u2014\u2014\u305d\u3093\u306a\u65e5\u306f\u78ba\u304b\u306b\u8f9b\u3044\u3067\u3059\u3002\u4eca\u591c\u306f\u65e9\u3081\u306b\u4f11\u3093\u3067\u3001DeepCalm\u304c\u305d\u3070\u306b\u3044\u307e\u3059\u3002",
    poor_tired: "\u7720\u308c\u306a\u304f\u3066\u75b2\u308c\u3066\u3044\u308b\u2014\u2014\u4f53\u304c\u4f11\u606f\u3092\u6c42\u3081\u3066\u3044\u307e\u3059\u3002\u4eca\u65e5\u306f\u7121\u7406\u3092\u305b\u305a\u3001\u81ea\u5206\u3092\u512a\u5148\u3057\u307e\u3057\u3087\u3046\u3002",
    great_happy: "\u3088\u304f\u7720\u308c\u3066\u6c17\u5206\u3082\u3044\u3044\u2014\u2014\u4eca\u65e5\u306e\u30b3\u30f3\u30c7\u30a3\u30b7\u30e7\u30f3\u306f\u6700\u9ad8\u3067\u3059\uff01\u3053\u306e\u8efd\u3084\u304b\u3055\u3092\u5927\u4e8b\u306b\u3057\u3066\u304f\u3060\u3055\u3044\u3002",
    great_energetic: "\u5341\u5206\u306b\u7720\u308c\u3066\u30a8\u30cd\u30eb\u30ae\u30fc\u6e80\u30bf\u30f3\uff01\u3053\u306e\u52e2\u3044\u3067\u3001\u5148\u5ef6\u3070\u3057\u306b\u3057\u3066\u3044\u305f\u3053\u3068\u3092\u4e00\u3064\u7247\u4ed8\u3051\u307e\u3057\u3087\u3046\u3002",
    okay_calm: "\u307e\u3042\u307e\u3042\u3001\u7a4f\u3084\u304b\u2014\u2014\u305d\u308c\u3067\u5341\u5206\u826f\u3044\u72b6\u614b\u3067\u3059\u3002\u6bce\u65e5\u304c\u5b8c\u74a7\u3067\u306a\u304f\u3066\u3044\u3044\u3001\u7a4f\u3084\u304b\u3067\u3044\u3044\u306e\u3067\u3059\u3002",
    okay_anxious: "\u7720\u7720\u306f\u307e\u3042\u307e\u3042\u3067\u3082\u5fc3\u306f\u5c11\u3057\u843d\u3061\u7740\u304b\u306a\u3044\u2014\u2014\u5927\u4e08\u592b\u3002\u4e0d\u5b89\u306f\u6c38\u9060\u306b\u306f\u7d9a\u304d\u307e\u305b\u3093\u3002",
    okay_tired: "\u7720\u7720\u306f\u666e\u901a\u3001\u5c11\u3057\u75b2\u308c\u3066\u3044\u308b\u2014\u2014\u4eca\u65e5\u306f\u3086\u3063\u304f\u308a\u904e\u3054\u3057\u3066\u65e9\u3081\u306b\u4f11\u307f\u307e\u3057\u3087\u3046\u3002",
    calm: "\u7a4f\u3084\u304b\u306a\u671d\u306f\u6700\u9ad8\u306e\u59cb\u307e\u308a\u3067\u3059\u3002\u4eca\u65e5\u306f\u6025\u304c\u305a\u3001\u4e00\u6b69\u305a\u3064\u3002",
    anxious: "\u5c11\u3057\u4e0d\u5b89\u3067\u3082\u5927\u4e08\u592b\u2014\u2014\u8133\u306f\u3042\u306a\u305f\u3092\u5b88\u308d\u3046\u3068\u3057\u3066\u3044\u308b\u3060\u3051\u3067\u3059\u3002\u6df1\u547c\u5438\u3057\u3066\u3001\u3086\u3063\u304f\u308a\u3044\u304d\u307e\u3057\u3087\u3046\u3002",
    tired: "\u75b2\u308c\u305f\u3089\u4f11\u3093\u3067\u3044\u3044\u2014\u2014\u305d\u308c\u306f\u5f31\u3055\u3067\u306f\u3042\u308a\u307e\u305b\u3093\u3002\u30a8\u30cd\u30eb\u30ae\u30fc\u306f\u9759\u304b\u3051\u3055\u306e\u4e2d\u3067\u623b\u3063\u3066\u304d\u307e\u3059\u3002",
    happy: "\u4eca\u65e5\u306e\u72b6\u614b\u306f\u3068\u3066\u3082\u8cb4\u91cd\u3067\u3059\u3002\u3053\u306e\u5b09\u3057\u3055\u3092\u3057\u3063\u304b\u308a\u611f\u3058\u3066\u304f\u3060\u3055\u3044\u3002",
    sad: "\u843d\u3061\u8fbc\u307f\u306f\u6765\u3066\u3001\u305d\u3057\u3066\u53bb\u3063\u3066\u3044\u304d\u307e\u3059\u3002\u7121\u7406\u306b\u5143\u6c17\u306b\u306a\u308d\u3046\u3068\u3057\u306a\u304f\u3066\u3044\u3044\u3067\u3059\u3002",
    energetic: "\u4eca\u65e5\u306f\u30a8\u30cd\u30eb\u30ae\u30fc\u6e80\u30bf\u30f3\uff01\u3053\u306e\u52e2\u3044\u3067\u3001\u3084\u308a\u305f\u304b\u3063\u305f\u3053\u3068\u3092\u3084\u3063\u3066\u307f\u307e\u3057\u3087\u3046\u3002",
    _default: "\u4eca\u65e5\u306e\u3042\u306a\u305f\u306f\u3088\u304f\u9811\u5f35\u3063\u3066\u3044\u307e\u3059\u3002\u3086\u3063\u304f\u308a\u3067\u5927\u4e08\u592b\u3067\u3059\u3002",
  },
  en: {
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
  },
}

function getLocalizedFallback(sleep, mood, lang) {
  const map = FB[lang] || FB.en
  const key = sleep + "_" + mood
  if (map[key]) return map[key]
  if (map[mood]) return map[mood]
  return map._default || FB.en._default
}

export async function onRequest(context) {
  const { request, env } = context

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", Allow: "POST" },
    })
  }

  try {
    const { sleep, mood, lang = "zh" } = await request.json()
    const langName = LANG_MAP[lang] || "Chinese"

    if (!sleep || !mood) {
      return new Response(JSON.stringify({ comment: getLocalizedFallback("okay", "calm", lang) }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    }

    const openAiKey = cleanEnv(env.OPENAI_API_KEY)
    if (!openAiKey) {
      return new Response(JSON.stringify({ comment: getLocalizedFallback(sleep, mood, lang) }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    }

    const SYSTEM_PROMPT = "You are a gentle companion. The user just completed their daily mood check-in. Generate a warm, supportive comment (40-60 words) based on their reported \"sleep quality\" and \"current mood\".\n\nRules:\n- Tone: like a friend, not a therapist or coach\n- No analysis, just warmth and presence\n- Combine sleep and mood naturally in the comment\n- Plain text only, no formatting, no emoji\n- CRITICAL: Respond in " + langName + "."

    const prompt = "User's sleep quality: " + (SLEEP_LABELS[sleep] || sleep) + "\nUser's current mood: " + (MOOD_LABELS[mood] || mood) + "\n\nGenerate a warm comment that combines these two."

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + openAiKey,
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
      return new Response(JSON.stringify({ comment: getLocalizedFallback(sleep, mood, lang) }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    }

    const data = await res.json()
    const comment = data.choices?.[0]?.message?.content?.trim()
    if (!comment) {
      return new Response(JSON.stringify({ comment: getLocalizedFallback(sleep, mood, lang) }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    }

    return new Response(JSON.stringify({ comment }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch {
    return new Response(JSON.stringify({ comment: getLocalizedFallback("okay", "calm", "en") }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  }
}

function cleanEnv(v) {
  return String(v || "").replace(/\uFEFF/g, "").replace(/[\r\n]/g, "").trim()
}
