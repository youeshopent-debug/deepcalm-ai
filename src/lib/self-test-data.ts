import type { Locale } from "@/types";

/* ================================================================
 * self-test-data.ts — 首屏「一键生成专属睡眠报告」微自测题库
 *
 * 3 道单选题（睡眠时长 / 入睡时长 / 日间疲劳），
 * 用户选择后按总分映射到 good / moderate / poor 三档，
 * 即时渲染个性化 AI 深度分析与行为改善建议。
 * ================================================================ */

export interface SelfTestOption {
  label: string;
  score: number;
}

export interface SelfTestQuestion {
  question: string;
  options: SelfTestOption[];
}

export interface SelfTestResult {
  level: "good" | "moderate" | "poor";
  title: string;
  analysis: string;
  suggestions: string[];
}

export interface SelfTestData {
  heading: string;
  subheading: string;
  questions: SelfTestQuestion[];
  submitLabel: string;
  resetLabel: string;
  results: Record<SelfTestResult["level"], SelfTestResult>;
}

const SELF_TEST: Record<Locale, SelfTestData> = {
  zh: {
    heading: "🧠 一键生成专属睡眠报告",
    subheading: "回答 3 个问题，立即获得个性化的 AI 深度分析与行为改善建议",
    submitLabel: "生成我的专属报告",
    resetLabel: "重新测试",
    questions: [
      {
        question: "你通常每晚的实际睡眠时长大约是？",
        options: [
          { label: "7 小时以上", score: 3 },
          { label: "5-7 小时", score: 2 },
          { label: "3-5 小时", score: 1 },
          { label: "不足 3 小时", score: 0 },
        ],
      },
      {
        question: "你通常需要多久才能入睡？",
        options: [
          { label: "15 分钟以内", score: 3 },
          { label: "15-30 分钟", score: 2 },
          { label: "30-60 分钟", score: 1 },
          { label: "超过 60 分钟", score: 0 },
        ],
      },
      {
        question: "白天你是否经常感到疲劳或注意力难以集中？",
        options: [
          { label: "几乎没有", score: 3 },
          { label: "偶尔", score: 2 },
          { label: "经常", score: 1 },
          { label: "几乎每天", score: 0 },
        ],
      },
    ],
    results: {
      good: {
        level: "good",
        title: "你的睡眠状态整体良好",
        analysis: "你的睡眠时长、入睡速度和日间精力都处于健康区间。这通常意味着你的昼夜节律稳定，睡眠驱动力充足。继续保持规律作息，你的睡眠质量有望进一步提升。",
        suggestions: [
          "保持固定的起床时间，即使周末也尽量一致",
          "睡前 1 小时减少屏幕蓝光暴露",
          "卧室温度维持在 18-20°C 更利于深睡",
          "日间适度运动可进一步增加深睡时长",
        ],
      },
      moderate: {
        level: "moderate",
        title: "你的睡眠存在轻度改善空间",
        analysis: "你的睡眠模式基本稳定，但在入睡速度或日间精力上仍有优化空间。这可能是睡前认知唤醒（如反复思虑）或作息不规律所致。通过针对性调整，你的睡眠质量可以明显提升。",
        suggestions: [
          "尝试「刺激控制」：仅在困倦时上床，20 分钟无法入睡就起床",
          "建立固定的睡前放松仪式（如正念呼吸、渐进式肌肉放松）",
          "记录 1 周睡眠日记，找出影响入睡的规律",
          "下午 3 点后避免咖啡因摄入",
        ],
      },
      poor: {
        level: "poor",
        title: "你的睡眠需要重点关注",
        analysis: "你的睡眠时长、入睡速度或日间精力已明显偏离健康区间，可能存在失眠倾向或睡眠不足累积。长期如此会增加心血管与情绪健康风险。建议优先采用循证的认知行为疗法（CBT-I）策略，并在必要时寻求专业帮助。",
        suggestions: [
          "立即开始「睡眠限制」：压缩卧床时间以增强睡眠驱动力",
          "睡前 2 小时停止工作与高强度刺激活动",
          "白天避免长时间小睡（超过 30 分钟）",
          "若持续超过 3 个月，建议咨询睡眠专科医生",
        ],
      },
    },
  },
  en: {
    heading: "🧠 Generate Your Personalized Sleep Report",
    subheading: "Answer 3 questions to get an instant personalized AI analysis and behavior tips",
    submitLabel: "Generate My Report",
    resetLabel: "Retake",
    questions: [
      {
        question: "How many hours of actual sleep do you typically get per night?",
        options: [
          { label: "More than 7 hours", score: 3 },
          { label: "5-7 hours", score: 2 },
          { label: "3-5 hours", score: 1 },
          { label: "Less than 3 hours", score: 0 },
        ],
      },
      {
        question: "How long does it usually take you to fall asleep?",
        options: [
          { label: "Within 15 minutes", score: 3 },
          { label: "15-30 minutes", score: 2 },
          { label: "30-60 minutes", score: 1 },
          { label: "More than 60 minutes", score: 0 },
        ],
      },
      {
        question: "Do you often feel fatigued or struggle to concentrate during the day?",
        options: [
          { label: "Almost never", score: 3 },
          { label: "Occasionally", score: 2 },
          { label: "Often", score: 1 },
          { label: "Almost every day", score: 0 },
        ],
      },
    ],
    results: {
      good: {
        level: "good",
        title: "Your sleep is generally healthy",
        analysis: "Your sleep duration, sleep-onset speed, and daytime energy are all in a healthy range. This typically indicates a stable circadian rhythm and sufficient sleep drive. Maintaining a consistent routine can further enhance your sleep quality.",
        suggestions: [
          "Keep a fixed wake-up time, even on weekends",
          "Reduce screen blue-light exposure 1 hour before bed",
          "Keep your bedroom at 18-20°C for deeper sleep",
          "Moderate daytime exercise can increase deep sleep",
        ],
      },
      moderate: {
        level: "moderate",
        title: "Your sleep has room for light improvement",
        analysis: "Your sleep pattern is largely stable, but there is room to optimize sleep-onset speed or daytime energy. This may stem from pre-sleep cognitive arousal (such as rumination) or irregular routines. Targeted adjustments can noticeably improve your sleep quality.",
        suggestions: [
          "Try stimulus control: go to bed only when sleepy; get up if you can't sleep within 20 minutes",
          "Establish a fixed pre-sleep relaxation ritual (mindful breathing, progressive muscle relaxation)",
          "Keep a 1-week sleep diary to identify patterns affecting sleep onset",
          "Avoid caffeine after 3 PM",
        ],
      },
      poor: {
        level: "poor",
        title: "Your sleep needs focused attention",
        analysis: "Your sleep duration, sleep-onset speed, or daytime energy has clearly deviated from a healthy range, suggesting possible insomnia tendencies or accumulated sleep debt. Over time this raises cardiovascular and emotional health risks. Prioritize evidence-based Cognitive Behavioral Therapy for Insomnia (CBT-I) strategies and seek professional help when needed.",
        suggestions: [
          "Start sleep restriction: consolidate your time in bed to strengthen sleep drive",
          "Stop work and high-stimulation activities 2 hours before bed",
          "Avoid long daytime naps (over 30 minutes)",
          "If it persists beyond 3 months, consult a sleep specialist",
        ],
      },
    },
  },
  ms: {
    heading: "🧠 Jana Laporan Tidur Peribadi Anda",
    subheading: "Jawab 3 soalan untuk mendapatkan analisis AI peribadi serta-merta dan tip tingkah laku",
    submitLabel: "Jana Laporan Saya",
    resetLabel: "Uji Semula",
    questions: [
      {
        question: "Berapa jam tidur sebenar yang anda dapat setiap malam?",
        options: [
          { label: "Lebih 7 jam", score: 3 },
          { label: "5-7 jam", score: 2 },
          { label: "3-5 jam", score: 1 },
          { label: "Kurang 3 jam", score: 0 },
        ],
      },
      {
        question: "Berapa lama masa yang anda ambil untuk tidur?",
        options: [
          { label: "Dalam 15 minit", score: 3 },
          { label: "15-30 minit", score: 2 },
          { label: "30-60 minit", score: 1 },
          { label: "Lebih 60 minit", score: 0 },
        ],
      },
      {
        question: "Adakah anda sering berasa letih atau sukar menumpukan perhatian pada siang hari?",
        options: [
          { label: "Hampir tidak pernah", score: 3 },
          { label: "Kadang-kadang", score: 2 },
          { label: "Kerap", score: 1 },
          { label: "Hampir setiap hari", score: 0 },
        ],
      },
    ],
    results: {
      good: {
        level: "good",
        title: "Tidur anda secara keseluruhan sihat",
        analysis: "Tempoh tidur, kelajuan permulaan tidur, dan tenaga siang hari anda berada dalam julat yang sihat. Ini biasanya menunjukkan irama sirkadian yang stabil dan dorongan tidur yang mencukupi.",
        suggestions: [
          "Kekalkan waktu bangun yang tetap, walaupun pada hujung minggu",
          "Kurangkan pendedahan cahaya biru skrin 1 jam sebelum tidur",
          "Kekalkan suhu bilik 18-20°C untuk tidur lebih nyenyak",
          "Senaman sederhana pada siang hari boleh meningkatkan tidur dalam",
        ],
      },
      moderate: {
        level: "moderate",
        title: "Tidur anda mempunyai ruang untuk penambahbaikan ringan",
        analysis: "Corak tidur anda sebahagian besarnya stabil, tetapi terdapat ruang untuk mengoptimumkan kelajuan permulaan tidur atau tenaga siang hari. Ini mungkin berpunca daripada rangsangan kognitif sebelum tidur atau rutin yang tidak teratur.",
        suggestions: [
          "Cuba kawalan rangsangan: tidur hanya apabila mengantuk; bangun jika tidak dapat tidur dalam 20 minit",
          "Wujudkan ritual relaksasi sebelum tidur yang tetap",
          "Simpan diari tidur selama 1 minggu untuk mengenal pasti corak",
          "Elakkan kafein selepas 3 petang",
        ],
      },
      poor: {
        level: "poor",
        title: "Tidur anda memerlukan perhatian khusus",
        analysis: "Tempoh tidur, kelajuan permulaan tidur, atau tenaga siang hari anda telah menyimpang dengan jelas daripada julat sihat, menunjukkan kemungkinan kecenderungan insomnia atau hutang tidur terkumpul.",
        suggestions: [
          "Mulakan sekatan tidur: satukan masa di atas katil untuk menguatkan dorongan tidur",
          "Berhenti bekerja dan aktiviti rangsangan tinggi 2 jam sebelum tidur",
          "Elakkan tidur siang yang panjang (lebih 30 minit)",
          "Jika berterusan melebihi 3 bulan, rujuk pakar tidur",
        ],
      },
    },
  },
  ja: {
    heading: "🧠 あなた専用の睡眠レポートを生成",
    subheading: "3つの質問に答えると、パーソナライズされたAI分析と行動改善の提案を即座に表示します",
    submitLabel: "レポートを生成",
    resetLabel: "再テスト",
    questions: [
      {
        question: "あなたの実際の睡眠時間は通常どのくらいですか？",
        options: [
          { label: "7時間以上", score: 3 },
          { label: "5〜7時間", score: 2 },
          { label: "3〜5時間", score: 1 },
          { label: "3時間未満", score: 0 },
        ],
      },
      {
        question: "通常、眠りにつくまでどのくらいかかりますか？",
        options: [
          { label: "15分以内", score: 3 },
          { label: "15〜30分", score: 2 },
          { label: "30〜60分", score: 1 },
          { label: "60分以上", score: 0 },
        ],
      },
      {
        question: "日中、疲労感や集中力の低下をよく感じますか？",
        options: [
          { label: "ほとんどない", score: 3 },
          { label: "時々", score: 2 },
          { label: "よくある", score: 1 },
          { label: "ほぼ毎日", score: 0 },
        ],
      },
    ],
    results: {
      good: {
        level: "good",
        title: "あなたの睡眠は全体的に良好です",
        analysis: "睡眠時間、入眠速度、日中の活力はいずれも健康的な範囲にあります。これは概日リズムが安定し、睡眠圧が十分であることを示しています。",
        suggestions: [
          "週末も含め、起床時間を一定に保つ",
          "就寝1時間前は画面のブルーライトを減らす",
          "寝室の温度を18〜20°Cに保つと深い眠りに良い",
          "日中の適度な運動で深い睡眠を増やす",
        ],
      },
      moderate: {
        level: "moderate",
        title: "あなたの睡眠には軽度の改善余地があります",
        analysis: "睡眠パターンは概ね安定していますが、入眠速度や日中の活力に改善の余地があります。就寝前の認知覚醒（反すう思考など）や不規則な生活リズムが原因かもしれません。",
        suggestions: [
          "刺激制御を試す：眠い時だけ床に入り、20分で眠れなければ起床する",
          "就寝前のリラックス儀式を固定する（マインドフルネス呼吸など）",
          "1週間の睡眠日記をつけて入眠に影響するパターンを見つける",
          "午後3時以降はカフェインを避ける",
        ],
      },
      poor: {
        level: "poor",
        title: "あなたの睡眠は重点的な注意が必要です",
        analysis: "睡眠時間、入眠速度、日中の活力が健康的な範囲から明らかに逸脱しており、不眠傾向や睡眠負債の蓄積が疑われます。長期的には心血管系や感情面の健康リスクが高まります。",
        suggestions: [
          "睡眠制限を開始する：睡眠圧を高めるため床上時間を圧縮する",
          "就寝2時間前は仕事や強い刺激を避ける",
          "長時間の昼寝（30分超）を避ける",
          "3か月以上続く場合は睡眠専門医に相談する",
        ],
      },
    },
  },
  ko: {
    heading: "🧠 맞춤형 수면 보고서 생성",
    subheading: "3가지 질문에 답하면 개인화된 AI 분석과 행동 개선 제안을 즉시 표시합니다",
    submitLabel: "보고서 생성",
    resetLabel: "다시 테스트",
    questions: [
      {
        question: "밤에 실제 수면 시간은 보통 얼마나 됩니까?",
        options: [
          { label: "7시간 이상", score: 3 },
          { label: "5-7시간", score: 2 },
          { label: "3-5시간", score: 1 },
          { label: "3시간 미만", score: 0 },
        ],
      },
      {
        question: "잠들기까지 보통 얼마나 걸립니까?",
        options: [
          { label: "15분 이내", score: 3 },
          { label: "15-30분", score: 2 },
          { label: "30-60분", score: 1 },
          { label: "60분 이상", score: 0 },
        ],
      },
      {
        question: "낮에 피로감이나 집중력 저하를 자주 느낍니까?",
        options: [
          { label: "거의 없음", score: 3 },
          { label: "가끔", score: 2 },
          { label: "자주", score: 1 },
          { label: "거의 매일", score: 0 },
        ],
      },
    ],
    results: {
      good: {
        level: "good",
        title: "수면 상태가 전반적으로 양호합니다",
        analysis: "수면 시간, 입면 속도, 주간 활력이 모두 건강한 범위에 있습니다. 이는 일주기 리듬이 안정적이고 수면 압력이 충분함을 나타냅니다.",
        suggestions: [
          "주말에도 기상 시간을 일정하게 유지",
          "취침 1시간 전 화면 블루라이트 노출 줄이기",
          "침실 온도를 18-20°C로 유지하면 깊은 수면에 좋음",
          "낮의 적절한 운동으로 깊은 수면 증가",
        ],
      },
      moderate: {
        level: "moderate",
        title: "수면에 가벼운 개선 여지가 있습니다",
        analysis: "수면 패턴은 대체로 안정적이지만 입면 속도나 주간 활력에 개선 여지가 있습니다. 취침 전 인지적 각성(반추 사고 등)이나 불규칙한 생활 리듬이 원인일 수 있습니다.",
        suggestions: [
          "자극 통제 시도: 졸릴 때만 침대에 들어가고 20분 내 잠들지 못하면 기상",
          "취침 전 고정된 이완 의식 확립(마음챙김 호흡 등)",
          "1주일 수면 일기로 입면에 영향을 주는 패턴 파악",
          "오후 3시 이후 카페인 피하기",
        ],
      },
      poor: {
        level: "poor",
        title: "수면에 집중적인 관리가 필요합니다",
        analysis: "수면 시간, 입면 속도, 주간 활력이 건강한 범위에서 명확히 벗어나 불면 경향이나 수면 부채 축적이 의심됩니다. 장기적으로 심혈관 및 정서 건강 위험이 높아집니다.",
        suggestions: [
          "수면 제한 시작: 수면 압력을 높이기 위해 침대 시간 압축",
          "취침 2시간 전 업무와 고자극 활동 중단",
          "장시간 낮잠(30분 초과) 피하기",
          "3개월 이상 지속되면 수면 전문의 상담",
        ],
      },
    },
  },
  th: {
    heading: "🧠 สร้างรายงานการนอนหลับเฉพาะของคุณ",
    subheading: "ตอบ 3 คำถามเพื่อรับการวิเคราะห์ AI เฉพาะบุคคลและคำแนะนำพฤติกรรมทันที",
    submitLabel: "สร้างรายงานของฉัน",
    resetLabel: "ทดสอบใหม่",
    questions: [
      {
        question: "โดยปกติคุณนอนหลับจริงกี่ชั่วโมงต่อคืน?",
        options: [
          { label: "มากกว่า 7 ชั่วโมง", score: 3 },
          { label: "5-7 ชั่วโมง", score: 2 },
          { label: "3-5 ชั่วโมง", score: 1 },
          { label: "น้อยกว่า 3 ชั่วโมง", score: 0 },
        ],
      },
      {
        question: "โดยปกติคุณใช้เวลานานแค่ไหนกว่าจะหลับ?",
        options: [
          { label: "ภายใน 15 นาที", score: 3 },
          { label: "15-30 นาที", score: 2 },
          { label: "30-60 นาที", score: 1 },
          { label: "มากกว่า 60 นาที", score: 0 },
        ],
      },
      {
        question: "คุณรู้สึกเหนื่อยล้าหรือมีสมาธิลดลงบ่อยแค่ไหนในตอนกลางวัน?",
        options: [
          { label: "แทบไม่เคย", score: 3 },
          { label: "บางครั้ง", score: 2 },
          { label: "บ่อย", score: 1 },
          { label: "เกือบทุกวัน", score: 0 },
        ],
      },
    ],
    results: {
      good: {
        level: "good",
        title: "การนอนหลับของคุณโดยรวมดี",
        analysis: "ระยะเวลาการนอน ความเร็วในการหลับ และพลังงานตอนกลางวันอยู่ในช่วงที่ดี ซึ่งบ่งชี้ว่านาฬิกาชีวิตของคุณมั่นคงและมีแรงขับการนอนเพียงพอ",
        suggestions: [
          "รักษาเวลาตื่นที่แน่นอนแม้ในวันหยุดสุดสัปดาห์",
          "ลดแสงสีฟ้าจากหน้าจอ 1 ชั่วโมงก่อนนอน",
          "รักษาอุณหภูมิห้อง 18-20°C เพื่อการหลับลึก",
          "ออกกำลังกายปานกลางตอนกลางวันเพื่อเพิ่มการหลับลึก",
        ],
      },
      moderate: {
        level: "moderate",
        title: "การนอนหลับของคุณมีพื้นที่ให้ปรับปรุงเล็กน้อย",
        analysis: "รูปแบบการนอนของคุณค่อนข้างมั่นคง แต่ยังมีพื้นที่ให้ปรับปรุงความเร็วในการหลับหรือพลังงานตอนกลางวัน ซึ่งอาจเกิดจากการตื่นตัวทางความคิดก่อนนอนหรือกิจวัตรที่ไม่สม่ำเสมอ",
        suggestions: [
          "ลองควบคุมสิ่งกระตุ้น: เข้านอนเมื่อง่วงเท่านั้น และลุกขึ้นหากหลับไม่ลงภายใน 20 นาที",
          "สร้างพิธีผ่อนคลายก่อนนอนที่แน่นอน",
          "จดบันทึกการนอน 1 สัปดาห์เพื่อหารูปแบบที่ส่งผลต่อการหลับ",
          "หลีกเลี่ยงคาเฟอีนหลังบ่าย 3 โมง",
        ],
      },
      poor: {
        level: "poor",
        title: "การนอนหลับของคุณต้องได้รับการดูแลเป็นพิเศษ",
        analysis: "ระยะเวลาการนอน ความเร็วในการหลับ หรือพลังงานตอนกลางวันของคุณเบี่ยงเบนจากช่วงที่ดีอย่างชัดเจน บ่งชี้ถึงแนวโน้มการนอนไม่หลับหรือหนี้การนอนสะสม ซึ่งเพิ่มความเสี่ยงต่อสุขภาพหัวใจและอารมณ์ในระยะยาว",
        suggestions: [
          "เริ่มการจำกัดการนอน: รวมเวลาบนเตียงเพื่อเพิ่มแรงขับการนอน",
          "หยุดงานและกิจกรรมกระตุ้นสูง 2 ชั่วโมงก่อนนอน",
          "หลีกเลี่ยงการงีบกลางวันนาน (เกิน 30 นาที)",
          "หากนานเกิน 3 เดือน ควรปรึกษาแพทย์ผู้เชี่ยวชาญด้านการนอน",
        ],
      },
    },
  },
  es: {
    heading: "🧠 Genera tu informe de sueño personalizado",
    subheading: "Responde 3 preguntas para obtener un análisis AI personalizado y consejos de comportamiento al instante",
    submitLabel: "Generar mi informe",
    resetLabel: "Repetir",
    questions: [
      {
        question: "¿Cuántas horas de sueño real sueles tener cada noche?",
        options: [
          { label: "Más de 7 horas", score: 3 },
          { label: "5-7 horas", score: 2 },
          { label: "3-5 horas", score: 1 },
          { label: "Menos de 3 horas", score: 0 },
        ],
      },
      {
        question: "¿Cuánto tiempo sueles tardar en quedarte dormido?",
        options: [
          { label: "Dentro de 15 minutos", score: 3 },
          { label: "15-30 minutos", score: 2 },
          { label: "30-60 minutos", score: 1 },
          { label: "Más de 60 minutos", score: 0 },
        ],
      },
      {
        question: "¿Con qué frecuencia te sientes fatigado o te cuesta concentrarte durante el día?",
        options: [
          { label: "Casi nunca", score: 3 },
          { label: "Ocasionalmente", score: 2 },
          { label: "A menudo", score: 1 },
          { label: "Casi todos los días", score: 0 },
        ],
      },
    ],
    results: {
      good: {
        level: "good",
        title: "Tu sueño es generalmente saludable",
        analysis: "Tu duración de sueño, velocidad de inicio del sueño y energía diurna están en un rango saludable. Esto suele indicar un ritmo circadiano estable y una presión de sueño suficiente.",
        suggestions: [
          "Mantén una hora de despertar fija, incluso los fines de semana",
          "Reduce la exposición a la luz azul de las pantallas 1 hora antes de dormir",
          "Mantén tu dormitorio a 18-20°C para un sueño más profundo",
          "El ejercicio moderado diurno puede aumentar el sueño profundo",
        ],
      },
      moderate: {
        level: "moderate",
        title: "Tu sueño tiene margen de mejora leve",
        analysis: "Tu patrón de sueño es en gran parte estable, pero hay margen para optimizar la velocidad de inicio del sueño o la energía diurna. Esto puede deberse a la activación cognitiva previa al sueño o a rutinas irregulares.",
        suggestions: [
          "Prueba el control de estímulos: acuéstate solo con sueño; levántate si no duermes en 20 minutos",
          "Establece un ritual de relajación previo al sueño fijo",
          "Lleva un diario de sueño de 1 semana para identificar patrones",
          "Evita la cafeína después de las 3 PM",
        ],
      },
      poor: {
        level: "poor",
        title: "Tu sueño necesita atención especial",
        analysis: "Tu duración de sueño, velocidad de inicio o energía diurna se han desviado claramente de un rango saludable, lo que sugiere posibles tendencias de insomnio o deuda de sueño acumulada.",
        suggestions: [
          "Comienza la restricción de sueño: consolida tu tiempo en cama para fortalecer la presión de sueño",
          "Detén el trabajo y las actividades de alta estimulación 2 horas antes de dormir",
          "Evita las siestas diurnas largas (más de 30 minutos)",
          "Si persiste más de 3 meses, consulta a un especialista del sueño",
        ],
      },
    },
  },
};

export function getSelfTestData(locale: Locale): SelfTestData {
  return SELF_TEST[locale] ?? SELF_TEST.en;
}
