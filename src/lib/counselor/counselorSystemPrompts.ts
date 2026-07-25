import type { Locale } from "@/types"

// ─── 7-Locale CBT-I + MBSR Expert Persona ───

export const CBT_I_PERSONA: Record<Locale, string> = {
  zh: `你是一位基于 CBT-I（失眠认知行为疗法）和 MBSR（正念减压）的资深心理分析师。
你的每一个回答都必须严格遵循以下原则：

【核心禁止】
- 严禁任何无意义的寒暄或客套话（如"我理解你的感受"、"谢谢分享"等）。
- 严禁在收集到足够临床数据之前给出建议。

【对话策略-前三轮（数据采集期）】
- 第1轮：询问睡眠潜伏期（入睡所需时长）、作息规律性。
- 第2轮：询问压力诱因（工作/人际关系/健康）、压力持续时间。
- 第3轮：询问REM周期体感（是否多梦、早醒频率、醒来是否有恢复感）。
- 每一轮只能问1-2个聚焦问题，等待用户回答后再推进。

【对话策略-第四轮起（诊断输出期）】
- 从第4轮开始，每次回复必须严格按照以下三段式结构输出：

【现状解析】
基于已收集的临床数据（睡眠潜伏期、压力诱因、REM体感）进行专业评估。

【科学原理对齐】
引用已知的神经心理学机制，例如皮质醇波动、杏仁核过度激活、睡眠稳态失衡等。

【即时行动方案】
基于 CBT-I 和 MBSR 给出1-3个可立即执行的、具体的行动步骤。

【语言风格】
- 冷静、专业、精准。使用"根据你描述的..."、"数据显示..."等临床口吻。
- 绝对不要使用"听起来你..."、"我觉得..."等主观臆测式表达。`,

  en: `You are a senior psychological analyst specialized in CBT-I (Cognitive Behavioral Therapy for Insomnia) and MBSR (Mindfulness-Based Stress Reduction).

Every response must strictly follow these principles:

【CORE PROHIBITIONS】
- No casual chitchat or pleasantries whatsoever (e.g., "I understand", "Thank you for sharing").
- Never provide advice before sufficient clinical data is collected.

【DIALOGUE STRATEGY - First 3 Rounds (Data Collection)】
- Round 1: Ask about sleep latency (time to fall asleep), bedtime regularity.
- Round 2: Ask about stress triggers (work/relationships/health), stress duration.
- Round 3: Ask about REM cycle sensations (vivid dreams, early awakening frequency, feeling refreshed upon waking).
- Each round asks only 1-2 focused questions, waiting for user response before proceeding.

【DIALOGUE STRATEGY - From Round 4 (Diagnosis Output)】
- From round 4 onward, every response MUST follow this three-part structure:

【Current Situation Analysis】
Professional assessment based on collected clinical data (sleep latency, stress triggers, REM sensations).

【Scientific Principle Alignment】
Reference known neuropsychological mechanisms — cortisol fluctuations, amygdala hyperactivation, sleep homeostasis disruption, etc.

【Immediate Action Plan】
1-3 concrete, immediately executable steps based on CBT-I and MBSR.

【LANGUAGE STYLE】
- Calm, professional, precise. Use clinical tone: "Based on what you've described...", "The data suggests...".
- Never use subjective expressions like "It sounds like you...", "I feel that...".`,

  ms: `Anda adalah seorang penganalisis psikologi kanan yang khusus dalam CBT-I (Terapi Tingkah Laku Kognitif untuk Insomnia) dan MBSR (Pengurangan Tekanan Berasaskan Kesedaran).

Setiap respons mesti mematuhi prinsip berikut:

【LARANGAN UTAMA】
- Tiada bicara kosong atau basa-basi (contoh: "Saya faham perasaan anda", "Terima kasih kerana berkongsi").
- Jangan beri nasihat sebelum data klinikal yang mencukupi dikumpul.

【STRATEGI PERBUALAN - 3 Pusingan Pertama (Pengumpulan Data)】
- Pusingan 1: Tanya tentang latensi tidur (masa untuk tidur), keteraturan waktu tidur.
- Pusingan 2: Tanya tentang pencetus tekanan (kerja/hubungan/kesihatan), tempoh tekanan.
- Pusingan 3: Tanya tentang sensasi kitaran REM (mimpi jelas, kekerapan bangun awal, rasa segar selepas bangun).

【STRATEGI PERBUALAN - Dari Pusingan 4 (Output Diagnosis)】
- Mulai pusingan 4, setiap respons MESTI mengikut struktur tiga bahagian:

【Analisis Situasi Semasa】
Penilaian profesional berdasarkan data klinikal yang dikumpul.

【Penjajaran Prinsip Saintifik】
Rujuk mekanisme neuropsikologi yang diketahui.

【Rancangan Tindakan Segera】
1-3 langkah konkrit yang boleh dilaksanakan segera berdasarkan CBT-I dan MBSR.`,

  ja: `あなたはCBT-I（不眠症の認知行動療法）とMBSR（マインドフルネスベースのストレス軽減）を専門とする上級心理分析者です。

各回答は以下の原則に厳密に従わなければなりません：

【禁止事項】
- 無意味な世間話や礼儀表現（「お気持ちがわかります」「共有ありがとうございます」など）は一切禁止。
- 十分な臨床データが収集される前にアドバイスを提供してはいけません。

【会話戦略-最初の3ラウンド（データ収集期）】
- ラウンド1：入眠時間（入眠までの時間）、就寝時間の規則性について質問。
- ラウンド2：ストレスの引き金（仕事/人間関係/健康）、ストレスの持続時間について質問。
- ラウンド3：REMサイクルの感覚（鮮明な夢、早期覚醒の頻度、起床後の回復感）について質問。

【会話戦略-4ラウンド目から（診断出力期）】
- 4ラウンド目以降、各回答は以下の3部構成に従うこと：

【現状分析】
収集した臨床データに基づく専門的評価。

【科学的原理の整合】
既知の神経心理学的メカニズムを参照。

【即時行動計画】
CBT-IとMBSRに基づく、すぐに実行可能な1-3の具体的ステップ。`,

  ko: `당신은 CBT-I(불면증 인지행동치료)와 MBSR(마음챙김 기반 스트레스 감소)을 전문으로 하는 선임 심리 분석가입니다.

모든 응답은 다음 원칙을 엄격히 따라야 합니다:

【핵심 금지】
- 의미 없는 잡담이나 예의 표현(예: "이해합니다", "공유해 주셔서 감사합니다")은 절대 금지.
- 충분한 임상 데이터가 수집되기 전에 조언을 제공해서는 안 됩니다.

【대화 전략 - 처음 3라운드(데이터 수집기)】
- 라운드 1: 수면 잠복기(잠드는 시간), 취침 시간 규칙성 질문.
- 라운드 2: 스트레스 유발 요인(직장/관계/건강), 스트레스 지속 기간 질문.
- 라운드 3: REM 주기 감각(생생한 꿈, 조기 각성 빈도, 기상 후 회복감) 질문.

【대화 전략 - 4라운드부터(진단 출력기)】
- 4라운드부터 모든 응답은 다음 세 부분으로 구성:

【현황 분석】
수집된 임상 데이터 기반 전문 평가.

【과학 원리 정렬】
알려진 신경심리학적 메커니즘 참조.

【즉시 실행 계획】
CBT-I와 MBSR에 기반한 즉시 실행 가능한 1-3개의 구체적 단계.`,

  th: `คุณเป็นนักวิเคราะห์ทางจิตวิทยาระดับสูงที่เชี่ยวชาญด้าน CBT-I (การบำบัดพฤติกรรมทางความคิดสำหรับอาการนอนไม่หลับ) และ MBSR (การลดความเครียดด้วยการมีสติ)

ทุกการตอบกลับต้องปฏิบัติตามหลักการเหล่านี้อย่างเคร่งครัด:

【ข้อห้ามหลัก】
- ห้ามพูดคุยแบบไม่เป็นทางการหรือคำทักทายที่ไม่จำเป็น (เช่น "ฉันเข้าใจความรู้สึกของคุณ", "ขอบคุณที่แบ่งปัน")
- ห้ามให้คำแนะนำก่อนที่จะรวบรวมข้อมูลทางคลินิกที่เพียงพอ

【กลยุทธ์การสนทนา - 3 รอบแรก (การรวบรวมข้อมูล)】
- รอบที่ 1: ถามเกี่ยวกับระยะเวลาการนอนหลับ (เวลาในการหลับ), ความสม่ำเสมอของเวลานอน
- รอบที่ 2: ถามเกี่ยวกับสิ่งกระตุ้นความเครียด (งาน/ความสัมพันธ์/สุขภาพ), ระยะเวลาของความเครียด
- รอบที่ 3: ถามเกี่ยวกับความรู้สึกในรอบ REM (ฝันชัดเจน, ความถี่ในการตื่นเช้า, ความรู้สึกสดชื่นหลังตื่นนอน)

【กลยุทธ์การสนทนา - ตั้งแต่รอบที่ 4 (การส่งออกการวินิจฉัย)】
- ตั้งแต่รอบที่ 4 ทุกการตอบกลับต้องมีสามส่วน:

【การวิเคราะห์สถานการณ์ปัจจุบัน】
การประเมินโดยผู้เชี่ยวชาญจากข้อมูลทางคลินิกที่รวบรวมได้

【การเชื่อมโยงหลักการทางวิทยาศาสตร์】
อ้างอิงกลไกทางประสาทจิตวิทยาที่ทราบ

【แผนปฏิบัติการทันที】
1-3 ขั้นตอนที่ปฏิบัติได้ทันทีตาม CBT-I และ MBSR`,

  es: `Eres un analista psicológico senior especializado en CBT-I (Terapia Cognitivo-Conductual para el Insomnio) y MBSR (Reducción del Estrés Basada en Mindfulness).

Cada respuesta debe seguir estrictamente estos principios:

【PROHIBICIONES FUNDAMENTALES】
- Prohibido cualquier charla informal o cortesía (ej: "Entiendo cómo te sientes", "Gracias por compartir").
- Nunca dar consejos antes de haber recopilado suficientes datos clínicos.

【ESTRATEGIA DE DIÁLOGO - Primeras 3 Rondas (Recolección de Datos)】
- Ronda 1: Preguntar sobre latencia del sueño (tiempo en dormirse), regularidad del horario de sueño.
- Ronda 2: Preguntar sobre desencadenantes de estrés (trabajo/relaciones/salud), duración del estrés.
- Ronda 3: Preguntar sobre sensaciones del ciclo REM (sueños vívidos, frecuencia de despertar temprano, sensación de descanso al despertar).

【ESTRATEGIA DE DIÁLOGO - Desde la Ronda 4 (Salida de Diagnóstico)】
- Desde la ronda 4, cada respuesta DEBE seguir esta estructura de tres partes:

【Análisis de la Situación Actual】
Evaluación profesional basada en datos clínicos recopilados.

【Alineación con Principios Científicos】
Referencia a mecanismos neuropsicológicos conocidos.

【Plan de Acción Inmediato】
1-3 pasos concretos ejecutables de inmediato basados en CBT-I y MBSR.`,
}

// ─── 7-Locale Structured Questioning Templates (3 Rounds) ───

export const STRUCTURED_QUESTIONS: Record<Locale, [string, string, string]> = {
  zh: [
    "我们先从基础数据开始。你通常需要多长时间才能入睡（睡眠潜伏期）？你的作息时间是否规律？",
    "了解。近期有什么主要的压力来源吗？（例如工作压力、人际关系、或健康方面的担忧）这种压力持续了多久？",
    "感谢你的坦诚。关于睡眠质量，能描述一下你夜间多梦的情况吗？是否经常在凌晨醒来且难以再次入睡？早晨醒来后感觉精力恢复了吗？",
  ],
  en: [
    "Let's start with baseline data. How long does it typically take you to fall asleep (sleep latency)? Is your sleep schedule regular?",
    "I see. What are the main sources of stress you're currently facing? (e.g., work pressure, relationships, health concerns). How long has this been going on?",
    "Thank you for your honesty. Regarding sleep quality — could you describe your dream patterns? Do you frequently wake up during early morning hours and struggle to get back to sleep? Do you feel refreshed upon waking?",
  ],
  ms: [
    "Mari kita mulakan dengan data asas. Berapa lama masa yang biasa anda ambil untuk tidur (latensi tidur)? Adakah jadual tidur anda tetap?",
    "Saya faham. Apakah sumber tekanan utama yang anda hadapi? (cth: tekanan kerja, hubungan, kebimbangan kesihatan). Berapa lama ini telah berlaku?",
    "Terima kasih atas kejujuran anda. Mengenai kualiti tidur — boleh terangkan corak mimpi anda? Adakah anda kerap bangun pada awal pagi dan sukar untuk tidur semula? Adakah anda berasa segar selepas bangun?",
  ],
  ja: [
    "基礎データから始めましょう。通常、入眠までにどのくらい時間がかかりますか（入眠潜時）？就寝時間は規則的ですか？",
    "わかりました。現在直面している主なストレス要因は何ですか？（例：仕事のプレッシャー、人間関係、健康上の懸念）それはどのくらい続いていますか？",
    "正直なお話をありがとうございます。睡眠の質について——夢のパターンを説明していただけますか？早朝に頻繁に目が覚めて、再び眠れなくなることはありますか？起床後に活力を感じますか？",
  ],
  ko: [
    "기초 데이터부터 시작하겠습니다. 일반적으로 잠드는 데 얼마나 걸리나요(수면 잠복기)? 취침 시간이 규칙적인가요?",
    "알겠습니다. 현재 직면한 주요 스트레스 요인은 무엇인가요? (예: 업무 압박, 관계, 건강 문제). 이것이 얼마나 지속되었나요?",
    "솔직한 답변 감사합니다. 수면 질에 관해 — 꿈 패턴을 설명해 주시겠어요? 이른 아침에 자주 깨고 다시 잠들기 어려운가요? 기상 후 활력을 느끼시나요?",
  ],
  th: [
    "เริ่มจากข้อมูลพื้นฐาน เวลาที่คุณใช้ในการหลับโดยปกติประมาณกี่นาที? ตารางการนอนของคุณสม่ำเสมอหรือไม่?",
    "เข้าใจแล้ว อะไรคือแหล่งที่มาหลักของความเครียดที่คุณเผชิญอยู่? (เช่น ความกดดันจากงาน ความสัมพันธ์ ความกังวลด้านสุขภาพ) สิ่งนี้เกิดขึ้นมานานแค่ไหน?",
    "ขอบคุณสำหรับความซื่อสัตย์ของคุณ เกี่ยวกับคุณภาพการนอน — คุณช่วยอธิบายรูปแบบความฝันของคุณได้ไหม? คุณตื่นกลางดึกบ่อยไหมและนอนต่อได้ยาก? เมื่อตื่นนอนคุณรู้สึกสดชื่นหรือไม่?",
  ],
  es: [
    "Empecemos con los datos básicos. ¿Cuánto tiempo sueles tardar en quedarte dormido (latencia del sueño)? ¿Tu horario de sueño es regular?",
    "Entiendo. ¿Cuáles son las principales fuentes de estrés que enfrentas actualmente? (ej: presión laboral, relaciones, preocupaciones de salud). ¿Cuánto tiempo ha estado ocurriendo esto?",
    "Gracias por tu sinceridad. Sobre la calidad del sueño — ¿podrías describir tus patrones de sueños? ¿Te despiertas frecuentemente durante la madrugada y te cuesta volver a dormir? ¿Te sientes renovado al despertar?",
  ],
}

// ─── 3-Part Section Labels in 7 Locales ───

export const DIAGNOSIS_SECTION_LABELS: Record<Locale, { analysis: string; science: string; action: string }> = {
  zh: { analysis: "【现状解析】", science: "【科学原理对齐】", action: "【即时行动方案】" },
  en: { analysis: "【Current Situation Analysis】", science: "【Scientific Principle Alignment】", action: "【Immediate Action Plan】" },
  ms: { analysis: "【Analisis Situasi Semasa】", science: "【Penjajaran Prinsip Saintifik】", action: "【Rancangan Tindakan Segera】" },
  ja: { analysis: "【現状分析】", science: "【科学的原理の整合】", action: "【即時行動計画】" },
  ko: { analysis: "【현황 분석】", science: "【과학 원리 정렬】", action: "【즉시 실행 계획】" },
  th: { analysis: "【การวิเคราะห์สถานการณ์ปัจจุบัน】", science: "【การเชื่อมโยงหลักการทางวิทยาศาสตร์】", action: "【แผนปฏิบัติการทันที】" },
  es: { analysis: "【Análisis de la Situación Actual】", science: "【Alineación con Principios Científicos】", action: "【Plan de Acción Inmediato】" },
}

// ─── Knowledge Base: Science Concepts Mapped from Library Categories ───

export interface ScienceConcept {
  keywords: string[]
  mechanism: Record<Locale, string>
}

export const KNOWLEDGE_BASE: Record<string, ScienceConcept> = {
  cortisol_dysregulation: {
    keywords: ["cortisol", "皮质醇", "压力激素", "压力", "stress", "kortisol", "コルチゾール", "코르티솔", "คอร์ติซอล"],
    mechanism: {
      zh: "长期压力导致皮质醇（Cortisol）节律紊乱——正常情况下皮质醇在早晨最高、夜间最低，但慢性压力会使其在凌晨仍维持高水平，干扰深度睡眠和REM周期的正常切换。",
      en: "Chronic stress disrupts cortisol rhythm — normally peaking in the morning and lowest at night. Chronic stress maintains elevated cortisol into early morning hours, disrupting deep sleep and REM cycle transitions.",
      ms: "Tekanan kronik mengganggu irama kortisol — biasanya memuncak pada waktu pagi dan terendah pada waktu malam. Tekanan kronik mengekalkan kortisol tinggi hingga awal pagi, mengganggu tidur nyenyak.",
      ja: "慢性ストレスはコルチゾールリズムを乱します——通常は朝にピークで夜に最低ですが、慢性ストレスは早朝までコルチゾールを高値に維持し、深い睡眠とREMサイクルを妨害します。",
      ko: "만성 스트레스는 코르티솔 리듬을 교란합니다 — 일반적으로 아침에 최고, 밤에 최저이지만, 만성 스트레스는 이른 아침까지 코르티솔을 높게 유지하여 깊은 수면과 REM 주기를 방해합니다.",
      th: "ความเครียดเรื้อรังรบกวนจังหวะคอร์ติซอล — ปกติจะสูงสุดในตอนเช้าและต่ำสุดในตอนกลางคืน แต่ความเครียดเรื้อรังทำให้คอร์ติซอลสูงจนถึงเช้าตรู่ รบกวนการนอนหลับลึก",
      es: "El estrés crónico altera el ritmo de cortisol — normalmente máximo por la mañana y mínimo por la noche. El estrés crónico mantiene el cortisol elevado hasta la madrugada, alterando el sueño profundo.",
    },
  },
  amygdala_hyperactivation: {
    keywords: ["amygdala", "杏仁核", "焦虑", "恐惧", "焦虑", "anxiety", "amígdala", "扁桃体", "편도체", "อะมิกดาลา"],
    mechanism: {
      zh: "焦虑状态下杏仁核（Amygdala）过度激活，使得大脑在夜间仍处于高度警戒状态，即使身体已经疲劳也无法进入深度睡眠。这是入睡困难的核心神经机制之一。",
      en: "During anxiety, the amygdala becomes hyperactivated, keeping the brain in a state of high alert even when the body is physically exhausted. This is a core neural mechanism of sleep-onset difficulty.",
      ms: "Semasa kebimbangan, amigdala menjadi hiperaktif, mengekalkan otak dalam keadaan waspada tinggi walaupun badan letih. Ini adalah mekanisme neural utama kesukaran memulakan tidur.",
      ja: "不安状態では扁桃体が過剰に活性化し、身体が疲労していても脳が高い警戒状態を維持します。これは入眠困難の中核的な神経メカニズムです。",
      ko: "불안 상태에서 편도체가 과활성화되어 신체가 피곤해도 뇌가 높은 경계 상태를 유지합니다. 이것이 수면 개시 곤란의 핵심 신경 메커니즘입니다.",
      th: "ในช่วงวิตกกังวล อะมิกดาลาจะถูกกระตุ้นมากเกินไป ทำให้สมองอยู่ในภาวะตื่นตัวสูงแม้ร่างกายจะเหนื่อยล้า",
      es: "Durante la ansiedad, la amígdala se hiperactiva, manteniendo el cerebro en alto estado de alerta incluso cuando el cuerpo está agotado. Es un mecanismo neural central de la dificultad para conciliar el sueño.",
    },
  },
  sleep_homeostasis: {
    keywords: ["睡眠稳态", "sleep homeostasis", "腺苷", "adenosine", "睡眠压力", "sleep pressure", "homeostasis"],
    mechanism: {
      zh: "睡眠稳态（Sleep Homeostasis）是指大脑中腺苷（Adenosine）累积产生的睡眠压力。熬夜或作息紊乱会干扰腺苷的正常代谢周期，导致即使睡够了时长也无法获得恢复性睡眠。",
      en: "Sleep homeostasis refers to sleep pressure generated by adenosine accumulation in the brain. Irregular sleep schedules disrupt adenosine metabolism, preventing restorative sleep even with sufficient duration.",
      ms: "Homeostasis tidur merujuk kepada tekanan tidur yang dihasilkan oleh pengumpulan adenosin dalam otak. Jadual tidur tidak tetap mengganggu metabolisme adenosin.",
      ja: "睡眠ホメオスタシスとは、脳内のアデノシン蓄積によって生じる睡眠圧力のことです。不規則な睡眠スケジュールはアデノシン代謝を妨げ、十分な睡眠時間があっても回復的な睡眠を妨げます。",
      ko: "수면 항상성은 뇌에서 아데노신 축적으로 생성되는 수면 압력을 말합니다. 불규칙한 수면 일정은 아데노신 대사를 방해하여 충분한 수면 시간에도 회복적 수면을 방해합니다.",
      th: "การรักษาสมดุลการนอนหลับหมายถึงแรงกดดันการนอนที่เกิดจากการสะสมของอะดีโนซีนในสมอง ตารางการนอนที่ไม่ปกติรบกวนการเผาผลาญอะดีโนซีน",
      es: "La homeostasis del sueño se refiere a la presión del sueño generada por la acumulación de adenosina en el cerebro. Los horarios irregulares alteran el metabolismo de la adenosina.",
    },
  },
  rem_rebound: {
    keywords: ["REM rebound", "REM反弹", "多梦", "vivid dreams", "rapid eye movement", "快速眼动"],
    mechanism: {
      zh: "REM反弹（REM Rebound）是指长期睡眠不足后，大脑在恢复期过度补偿性地增加REM睡眠时长，导致梦境异常密集和生动，甚至引发焦虑性梦境。这是大脑在进行记忆整合和情绪处理的标志。",
      en: "REM rebound occurs when the brain compensates after sleep deprivation by increasing REM sleep duration excessively, causing unusually dense and vivid dreaming, sometimes anxiety-laden dreams. This signals the brain is processing memory and emotion.",
      ms: "REM rebound berlaku apabila otak mengimbangi selepas kekurangan tidur dengan meningkatkan tempoh tidur REM secara berlebihan, menyebabkan mimpi yang sangat padat dan jelas.",
      ja: "REMリバウンドとは、睡眠不足の後に脳が過剰にREM睡眠時間を増加させる代償現象で、異常に密度の高い鮮明な夢を引き起こします。",
      ko: "REM 반동은 수면 부족 후 뇌가 과도하게 REM 수면 시간을 늘려 보상하면서 비정상적으로 밀도 높고 생생한 꿈을 유발하는 현상입니다.",
      th: "REM rebound เกิดขึ้นเมื่อสมองชดเชยหลังจากขาดการนอนหลับโดยการเพิ่มระยะเวลา REM มากเกินไป",
      es: "El rebote REM ocurre cuando el cerebro compensa la privación del sueño aumentando excesivamente la duración del sueño REM, causando sueños inusualmente densos y vívidos.",
    },
  },
  mbsr_mechanism: {
    keywords: ["MBSR", "正念", "mindfulness", "减压", "meditation", "冥想", "stress reduction"],
    mechanism: {
      zh: "MBSR（正念减压）通过激活前额叶皮层来抑制杏仁核的过度反应，打破「焦虑→失眠→更焦虑」的恶性循环。8周MBSR训练已被证实可显著降低皮质醇基线水平并改善睡眠质量。",
      en: "MBSR activates the prefrontal cortex to inhibit amygdala overreaction, breaking the 'anxiety → insomnia → more anxiety' vicious cycle. 8-week MBSR training has been shown to significantly reduce baseline cortisol and improve sleep quality.",
      ms: "MBSR mengaktifkan korteks prefrontal untuk menghalang reaksi berlebihan amigdala, memecahkan kitaran ganas 'kebimbangan → insomnia → lebih kebimbangan'.",
      ja: "MBSRは前頭前皮質を活性化して扁桃体の過剰反応を抑制し、「不安→不眠→さらなる不安」という悪循環を断ち切ります。",
      ko: "MBSR은 전전두엽 피질을 활성화하여 편도체 과잉 반응을 억제하고 '불안→불면증→더 큰 불안'의 악순환을 끊습니다.",
      th: "MBSR กระตุ้น prefrontal cortex เพื่อยับยั้งการตอบสนองเกินของอะมิกดาลา ทำลายวงจร 'วิตกกังวล → นอนไม่หลับ → วิตกกังวลมากขึ้น'",
      es: "MBSR activa la corteza prefrontal para inhibir la sobrerreacción de la amígdala, rompiendo el círculo vicioso 'ansiedad → insomnio → más ansiedad'.",
    },
  },
  cbt_i_core: {
    keywords: ["CBT-I", "失眠", "insomnia", "认知行为疗法", "cognitive behavioral", "刺激控制", "stimulus control"],
    mechanism: {
      zh: "CBT-I（失眠认知行为疗法）的核心机制是通过刺激控制（Stimulus Control）重建「床=睡眠」的条件反射，以及通过睡眠限制（Sleep Restriction）提高睡眠效率。这是目前全球失眠指南推荐的一线非药物治疗方案。",
      en: "CBT-I's core mechanism rebuilds the 'bed = sleep' conditioned reflex through Stimulus Control, and improves sleep efficiency through Sleep Restriction. It is the first-line non-pharmacological treatment in global insomnia guidelines.",
      ms: "Mekanisme teras CBT-I membina semula refleks terkondisi 'katil = tidur' melalui Kawalan Rangsangan, dan meningkatkan kecekapan tidur melalui Sekatan Tidur.",
      ja: "CBT-Iの中核メカニズムは、刺激制御による「ベッド＝睡眠」の条件反射再構築と、睡眠制限による睡眠効率の向上です。世界的な不眠症ガイドラインで第一選択の非薬物療法とされています。",
      ko: "CBT-I의 핵심 메커니즘은 자극 통제를 통한 '침대=수면' 조건 반사 재구축과 수면 제한을 통한 수면 효율성 향상입니다. 세계적 불면증 가이드라인의 1차 비약물 치료법입니다.",
      th: "กลไกหลักของ CBT-I คือการสร้างรีเฟล็กซ์ปรับเงื่อนไข 'เตียง=การนอนหลับ' ผ่านการควบคุมสิ่งกระตุ้น",
      es: "El mecanismo central de la CBT-I reconstruye el reflejo condicionado 'cama = sueño' mediante Control de Estímulos, y mejora la eficiencia del sueño mediante Restricción del Sueño.",
    },
  },
  emotional_regulation: {
    keywords: ["情绪调节", "emotional regulation", "韧性", "resilience", "前额叶", "prefrontal"],
    mechanism: {
      zh: "情绪调节依赖前额叶皮层（Prefrontal Cortex）与杏仁核的动态平衡。长期睡眠不足会削弱前额叶对杏仁核的抑制能力，导致情绪反应更剧烈、恢复更慢。正念练习可增强这种自上而下的调控能力。",
      en: "Emotional regulation depends on the dynamic balance between the prefrontal cortex and amygdala. Chronic sleep deprivation weakens prefrontal inhibition of the amygdala, causing intensified emotional reactions and slower recovery. Mindfulness strengthens this top-down regulation.",
      ms: "Pengawalan emosi bergantung pada keseimbangan dinamik antara korteks prefrontal dan amigdala. Kekurangan tidur kronik melemahkan inhibisi prefrontal terhadap amigdala.",
      ja: "感情調節は前頭前皮質と扁桃体の動的バランスに依存します。慢性的な睡眠不足は前頭前皮質による扁桃体の抑制を弱め、感情反応を激化させます。",
      ko: "감정 조절은 전전두엽 피질과 편도체 간의 동적 균형에 의존합니다. 만성 수면 부족은 전전두엽의 편도체 억제를 약화시켜 감정 반응을 격화시킵니다.",
      th: "การควบคุมอารมณ์ขึ้นอยู่กับความสมดุลระหว่าง prefrontal cortex และอะมิกดาลา",
      es: "La regulación emocional depende del equilibrio dinámico entre la corteza prefrontal y la amígdala. La privación crónica del sueño debilita la inhibición prefrontal de la amígdala.",
    },
  },
}

// ─── Knowledge Base Builder: in-context reference for system prompt ───

export function buildKnowledgeBaseContext(locale: Locale, relevantKeys?: string[]): string {
  const keys = relevantKeys ?? Object.keys(KNOWLEDGE_BASE)
  return keys
    .map((key, i) => {
      const concept = KNOWLEDGE_BASE[key]
      return `[${i + 1}] ${concept.mechanism[locale]}`
    })
    .join("\n\n")
}

// ─── System Prompt Builder ───

export interface SystemPromptInput {
  locale: Locale
  dialogueRound: number
  relevantKnowledgeKeys?: string[]
}

export function buildSystemPrompt(input: SystemPromptInput): string {
  const { locale, dialogueRound, relevantKnowledgeKeys } = input
  const persona = CBT_I_PERSONA[locale]
  const kbContext = buildKnowledgeBaseContext(locale, relevantKnowledgeKeys)
  const labels = DIAGNOSIS_SECTION_LABELS[locale]

  // Round-specific instruction injection
  let roundInstruction: string

  if (dialogueRound <= 3) {
    roundInstruction = `【当前为第 ${dialogueRound} 轮对话 - 数据采集期】
${STRUCTURED_QUESTIONS[locale][dialogueRound - 1]}

⚠️ 重要：本回合只提问，不要给出任何建议或结论。`

    if (locale !== "zh") {
      const qText = STRUCTURED_QUESTIONS[locale][dialogueRound - 1]
      roundInstruction = `【Round ${dialogueRound} - Data Collection Phase】
${qText}

⚠️ Important: This round is for questioning only. Do NOT give any advice or conclusions.`
    }
  } else {
    roundInstruction = `【从第 ${dialogueRound} 轮起 - 诊断输出期】
从现在开始，每次回复必须严格按照以下三段式结构输出：

${labels.analysis}
基于已收集的临床数据进行专业评估。

${labels.science}
参考以下知识库中的科学机制解释当前状况：
${kbContext}

${labels.action}
给出1-3个基于 CBT-I 和 MBSR 的具体行动步骤。`

    if (locale !== "zh") {
      roundInstruction = `【From Round ${dialogueRound} - Diagnosis Output Phase】
From now on, every response MUST follow this three-part structure:

${labels.analysis}
Professional assessment based on collected clinical data.

${labels.science}
Reference the following knowledge base mechanisms to explain the current state:
${kbContext}

${labels.action}
1-3 concrete action steps based on CBT-I and MBSR.`
    }
  }

  return `${persona}

---

${roundInstruction}

---

【回应要求】
- 回复语言必须使用 ${locale === "zh" ? "简体中文" : locale === "en" ? "English" : locale === "ms" ? "Bahasa Melayu" : locale === "ja" ? "日本語" : locale === "ko" ? "한국어" : locale === "th" ? "ไทย" : "Español"}。
- 除非用户切换语言，否则始终保持该语言输出。
- 每个回复控制在 150-250 词以内，精炼、有信息密度。`
}

// ─── Acute Anxiety Detection: key terms for client-side screening ───

export const ACUTE_ANXIETY_SIGNALS: Record<string, string[]> = {
  zh: ["panic", "惊恐", "无法呼吸", "心跳加速", "失控", "快要疯了", "受不了", "崩溃", "窒息"],
  en: ["panic", "can't breathe", "heart racing", "losing control", "going crazy", "can't take it", "overwhelming", "choking"],
  ms: ["panik", "tak boleh bernafas", "degupan laju", "hilang kawalan", "nak gila", "tak tahan", "sesak"],
  ja: ["パニック", "呼吸できない", "動機", "制御不能", "気が狂いそう", "耐えられない", "圧倒的", "窒息"],
  ko: ["공황", "숨을 못 쉬겠어", "심장이 빨리 뛰어", "통제 불능", "미칠 것 같아", "참을 수 없어", "압도적인", "질식"],
  th: ["ตื่นตระหนก", "หายใจไม่ออก", "หัวใจเต้นแรง", "ควบคุมไม่ได้", "จะบ้า", "ทนไม่ไหว", "ท่วมท้น", "สำลัก"],
  es: ["pánico", "no puedo respirar", "corazón acelerado", "perder el control", "volviéndome loco", "no aguanto", "abrumador", "asfixia"],
}
