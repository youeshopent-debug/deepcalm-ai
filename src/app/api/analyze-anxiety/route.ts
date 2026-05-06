import OpenAI from "openai"
import { NextResponse } from "next/server"

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null

const SYSTEM_PROMPT = `You are a professional psychological counselor specializing in cognitive restructuring. Analyze the user's anxiety input and identify catastrophic thinking patterns. Respond in valid JSON only, no markdown, no code fences:

{
  "thinkingPatterns": "Identify 1-2 specific cognitive distortions (e.g., catastrophizing, mind reading, all-or-nothing thinking) based on the user's description. Be specific and reference their exact words. Write in the same language as the user's input.",
  "encouragement": "A warm, evidence-based encouragement (2-3 sentences). Validate their feelings first, then offer a gentle cognitive reframe. Match the user's language.",
  "steps": [
    "Step 1: A concrete, actionable micro-step they can take in the next 5 minutes (e.g., a breathing exercise, a grounding technique, or a thought record prompt).",
    "Step 2: A medium-term action (e.g., scheduling a pleasant activity, challenging the distorted thought with evidence, or reaching out to a friend).",
    "Step 3: A self-care practice for the next 24 hours (e.g., setting a sleep routine, journaling, or planning a small win for tomorrow)."
  ]
}

Rules:
- Never dismiss or minimize their feelings.
- Always validate first, then gently guide.
- Keep steps extremely practical and time-bound.
- Use the SAME LANGUAGE as the user's input text.`

export async function POST(request: Request) {
  try {
    const { text } = await request.json()

    if (!text || typeof text !== "string" || text.trim().length < 2) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 })
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          thinkingPatterns: "API key not configured.",
          encouragement:
            "You've taken the first step by reaching out. That takes real courage. While the AI assistant is not available right now, please know that your feelings are valid and you deserve support.",
          steps: [
            "Try the 4-7-8 breathing technique: Inhale 4s, hold 7s, exhale 8s. Repeat 4 times.",
            "Write down three things you're grateful for right now, no matter how small.",
            "Schedule a 10-minute walk outside or stretch your body gently.",
          ],
        },
        { status: 200 }
      )
    }

    const completion = await openai!.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: text },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 800,
    })

    const content = completion.choices[0]?.message?.content
    if (!content) {
      throw new Error("Empty response from GPT-4o-mini")
    }

    const parsed = JSON.parse(content)
    return NextResponse.json(parsed, { status: 200 })
  } catch (error) {
    console.error("Analysis error:", error)
    return NextResponse.json(
      {
        thinkingPatterns: "Temporary service disruption.",
        encouragement:
          "We're sorry — our analysis service is temporarily unavailable. Your feelings are still valid and you're not alone. Please try again in a few moments.",
        steps: [
          "Step 1: Take 5 slow, deep breaths. Inhale through your nose for 4 counts, exhale through your mouth for 6 counts.",
          "Step 2: Name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.",
          "Step 3: If you're still struggling, consider reaching out to a trusted friend or a local mental health hotline.",
        ],
      },
      { status: 200 }
    )
  }
}
