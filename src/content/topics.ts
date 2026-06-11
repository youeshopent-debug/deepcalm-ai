import type { Locale } from '@/types'
import { generateDefaultContent } from './topic-content-templates'
import { initCustomContent } from './custom-content'

export interface Topic {
  slug: string
  category: string
  title: string
  description: string
  keywords: string
  references?: string[]
}

export interface TopicContentSection {
  heading: string
  paragraphs: string[]
}

export interface TopicFaqItem {
  q: string
  a: string
}

export interface TopicContent {
  science: string
  fitnessGuide: string
  faqItems: TopicFaqItem[]
}

const CATEGORIES = ["sleep", "anxiety", "grief_loss", "loneliness", "self_worth", "relationships", "identity", "mindfulness", "emotional_health"] as const

const topicMeta: Record<string, { zh: { title: string; desc: string; kw: string }; en: { title: string; desc: string; kw: string }; ms: { title: string; desc: string; kw: string }; ja: { title: string; desc: string; kw: string }; ko: { title: string; desc: string; kw: string }; th: { title: string; desc: string; kw: string }; es: { title: string; desc: string; kw: string } }> = {
  insomnia: {
    zh: { title: "失眠", desc: "科学认识失眠的原因与机制，掌握基于CBT-I的有效改善方法", kw: "失眠,失眠原因,失眠怎么办,CBT-I,睡眠障碍,入睡困难, #VibeCoding,#EmotionalFitness" },
    en: { title: "Insomnia", desc: "Understand the science behind insomnia and master evidence-based CBT-I methods", kw: "insomnia,sleep disorder,CBT-I,sleep problem,insomnia treatment, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Insomnia", desc: "Fahami sains di sebalik insomnia dan kuasai kaedah CBT-I", kw: "insomnia,gangguan tidur,CBT-I,masalah tidur, #VibeCoding,#EmotionalFitness" },
    ja: { title: "不眠症", desc: "不眠症の原因とメカニズムを科学的に理解し、CBT-Iに基づく効果的な改善法を習得", kw: "不眠症,睡眠障害,CBT-I,入眠困難,不眠治療" },
    ko: { title: "불면증", desc: "불면증의 원인과 메커니즘을 과학적으로 이해하고 CBT-I 기반 효과적 개선법 습득", kw: "불면증,수면장애,CBT-I,입면困难,불면치료" },
    th: { title: "นอนไม่หลับ", desc: "เข้าใจสาเหตุและกลไกของอาการนอนไม่หลับ พร้อมวิธีปรับปรุงที่มีหลักฐานทางวิทยาศาสตร์", kw: "นอนไม่หลับ,โรคนอนไม่หลับ,CBT-I,ปัญหาการนอน" },
    es: { title: "Insomnio", desc: "Comprende la ciencia del insomnio y domina los métodos basados en TCC-I", kw: "insomnio,trastorno del sueño,TCC-I,problemas de sueño, #VibeCoding,#EmotionalFitness" },
  },
  "deep-sleep": {
    zh: { title: "深度睡眠", desc: "深度睡眠对身体修复和免疫系统的重要性及提升方法", kw: "深度睡眠,慢波睡眠,身体修复,免疫系统,睡眠质量, #VibeCoding,#EmotionalFitness" },
    en: { title: "Deep Sleep", desc: "The critical role of deep sleep in physical restoration and immune function", kw: "deep sleep,slow wave sleep,physical restoration,immune system,sleep quality, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Tidur Nyenyak", desc: "Peranan penting tidur nyenyak dalam pemulihan fizikal dan fungsi imun", kw: "tidur nyenyak,slow wave sleep,pemulihan fizikal,sistem imun, #VibeCoding,#EmotionalFitness" },
    ja: { title: "深い眠り", desc: "身体の回復と免疫機能における深い眠りの重要な役割", kw: "深い眠り,徐波睡眠,身体回復,免疫機能" },
    ko: { title: "깊은 수면", desc: "신체 회복과 면역 기능에서 깊은 수면의 중요성", kw: "깊은 수면,서파 수면,신체 회복,면역 체계" },
    th: { title: "การนอนหลับลึก", desc: "บทบาทสำคัญของการนอนหลับลึกต่อการฟื้นฟูร่างกายและระบบภูมิคุ้มกัน", kw: "การนอนหลับลึก,slow wave sleep,ฟื้นฟูร่างกาย,ภูมิคุ้มกัน" },
    es: { title: "Sueño Profundo", desc: "El papel fundamental del sueño profundo en la restauración física y la función inmunitaria", kw: "sueño profundo,ondas lentas,restauración física,sistema inmune, #VibeCoding,#EmotionalFitness" },
  },
  "sleep-anxiety": {
    zh: { title: "睡眠焦虑", desc: "为什么越担心睡不着就越睡不着？打破失眠-焦虑的恶性循环", kw: "睡眠焦虑,睡前焦虑,失眠焦虑,恶性循环,放松技巧, #VibeCoding,#EmotionalFitness" },
    en: { title: "Sleep Anxiety", desc: "Why worrying about sleep makes insomnia worse — break the anxiety-insomnia cycle", kw: "sleep anxiety,bedtime anxiety,insomnia cycle,relaxation techniques, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Kebimbangan Tidur", desc: "Kenapa risau tentang tidur memburukkan insomnia — putuskan kitaran kebimbangan", kw: "kebimbangan tidur,insomnia,kitaran kebimbangan, #VibeCoding,#EmotionalFitness" },
    ja: { title: "睡眠不安", desc: "眠れないことを心配すると不眠が悪化する理由 — 不安と不眠の悪循環を断つ", kw: "睡眠不安,寝る前の不安,不眠の悪循環" },
    ko: { title: "수면 불안", desc: "잠에 대한 걱정이 불면증을 악화시키는 이유 — 불안-불면 악순환 차단", kw: "수면 불안,취침 불안,불면증 악순환" },
    th: { title: "ความกังวลเรื่องการนอน", desc: "ทำไมการกังวลเรื่องการนอนยิ่งทำให้นอนไม่หลับ — แตกวงจรความกังวล", kw: "ความกังวลเรื่องนอน,กังวลก่อนนอน,วงจรนอนไม่หลับ" },
    es: { title: "Ansiedad por Dormir", desc: "Por qué preocuparse por dormir empeora el insomnio — rompe el ciclo", kw: "ansiedad por dormir,ansiedad nocturna,insomnio, #VibeCoding,#EmotionalFitness" },
  },
  nightmare: {
    zh: { title: "噩梦", desc: "噩梦的神经科学机制与减少噩梦的实用方法", kw: "噩梦,梦境,REM睡眠,噩梦治疗,意象排练疗法, #VibeCoding,#EmotionalFitness" },
    en: { title: "Nightmare", desc: "The neuroscience of nightmares and evidence-based techniques to reduce them", kw: "nightmare,dreams,REM sleep,nightmare treatment,IRT, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Mimpi Ngeri", desc: "Neurosains mimpi ngeri dan teknik mengurangkan mimpi ngeri", kw: "mimpi ngeri,mimpi,tidur REM,rawatan mimpi ngeri, #VibeCoding,#EmotionalFitness" },
    ja: { title: "悪夢", desc: "悪夢の神経科学的メカニズムと軽減する実用的方法", kw: "悪夢,夢,レム睡眠,悪夢治療" },
    ko: { title: "악몽", desc: "악몽의 신경과학적 메커니즘과 감소 방법", kw: "악몽,꿈,렘수면,악몽 치료" },
    th: { title: "ฝันร้าย", desc: "กลไกทางประสาทวิทยาของฝันร้ายและวิธีลดฝันร้าย", kw: "ฝันร้าย,ความฝัน,REM sleep,การรักษาฝันร้าย" },
    es: { title: "Pesadillas", desc: "La neurociencia de las pesadillas y técnicas para reducirlas", kw: "pesadilla,sueños,sueño REM,tratamiento pesadillas, #VibeCoding,#EmotionalFitness" },
  },
  "circadian-rhythm": {
    zh: { title: "昼夜节律", desc: "了解你的生物钟如何调控睡眠-觉醒周期，优化作息时间", kw: "昼夜节律,生物钟,睡眠周期,褪黑素,作息规律, #VibeCoding,#EmotionalFitness" },
    en: { title: "Circadian Rhythm", desc: "How your internal body clock regulates sleep-wake cycles and how to optimize it", kw: "circadian rhythm,body clock,sleep cycle,melatonin,chronobiology, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Irama Sirkadian", desc: "Bagaimana jam badan dalaman mengawal kitaran tidur-bangun", kw: "irama sirkadian,jam badan,kitaran tidur,melatonin, #VibeCoding,#EmotionalFitness" },
    ja: { title: "概日リズム", desc: "体内時計が睡眠覚醒サイクルを調節する仕組み", kw: "概日リズム,体内時計,睡眠サイクル,メラトニン" },
    ko: { title: "일주기 리듬", desc: "체내 시계가 수면-각성 주기를 조절하는 방식", kw: "일주기 리듬,생체시계,수면주기,멜라토닌" },
    th: { title: "จังหวะชีวภาพ", desc: "นาฬิกาภายในร่างกายควบคุมวงจรการนอน-ตื่นอย่างไร", kw: "circadian rhythm,นาฬิการ่างกาย,วงจรการนอน,เมลาโทนิน" },
    es: { title: "Ritmo Circadiano", desc: "Cómo tu reloj biológico regula los ciclos de sueño-vigilia", kw: "ritmo circadiano,reloj biológico,ciclo del sueño,melatonina, #VibeCoding,#EmotionalFitness" },
  },
  "sleep-hygiene": {
    zh: { title: "睡眠卫生", desc: "科学的睡前习惯和环境优化，打造高质量睡眠的基础", kw: "睡眠卫生,睡前习惯,睡眠环境,助眠技巧,睡眠质量, #VibeCoding,#EmotionalFitness" },
    en: { title: "Sleep Hygiene", desc: "Evidence-based bedtime habits and environmental optimization for quality sleep", kw: "sleep hygiene,bedtime routine,sleep environment,sleep quality, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Kebersihan Tidur", desc: "Tabiat tidur berdasarkan bukti dan persekitaran optimum", kw: "kebersihan tidur,rutin tidur,persekitaran tidur, #VibeCoding,#EmotionalFitness" },
    ja: { title: "睡眠衛生", desc: "科学的な睡前習慣と環境最適化で質の高い睡眠を", kw: "睡眠衛生,睡前習慣,睡眠環境,睡眠の質" },
    ko: { title: "수면 위생", desc: "과학적인 취침 습관과 환경 최적화로 고품질 수면", kw: "수면 위생,취침 루틴,수면 환경" },
    th: { title: "สุขอนามัยการนอน", desc: "นิสัยก่อนนอนที่มีหลักฐานทางวิทยาศาสตร์และการปรับสภาพแวดล้อม", kw: "สุขอนามัยการนอน,กิจวัตรก่อนนอน,สภาพแวดล้อมการนอน" },
    es: { title: "Higiene del Sueño", desc: "Hábitos de sueño basados en evidencia y optimización ambiental", kw: "higiene del sueño,rutina nocturna,ambiente de sueño, #VibeCoding,#EmotionalFitness" },
  },
  "rem-sleep": {
    zh: { title: "REM 睡眠", desc: "快速眼动睡眠对记忆巩固和情绪调节的关键作用", kw: "REM睡眠,快速眼动,记忆巩固,情绪调节,梦境, #VibeCoding,#EmotionalFitness" },
    en: { title: "REM Sleep", desc: "How Rapid Eye Movement sleep drives memory consolidation and emotional regulation", kw: "REM sleep,memory consolidation,emotional regulation,dreams,brain health, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Tidur REM", desc: "Bagaimana tidur REM memacu penyatuan memori dan regulasi emosi", kw: "tidur REM,penyatuan memori,regulasi emosi, #VibeCoding,#EmotionalFitness" },
    ja: { title: "レム睡眠", desc: "レム睡眠が記憶固定と感情調整を促進する仕組み", kw: "レム睡眠,記憶固定,感情調整,夢" },
    ko: { title: "렘 수면", desc: "렘 수면이 기억 통합과 감정 조절을 촉진하는 방식", kw: "렘 수면,기억 통합,감정 조절" },
    th: { title: "การนอน REM", desc: "การนอน REM ช่วยในการรวมความทรงจำและการควบคุมอารมณ์", kw: "REM sleep,การรวมความทรงจำ,การควบคุมอารมณ์" },
    es: { title: "Sueño REM", desc: "Cómo el sueño REM impulsa la consolidación de la memoria y la regulación emocional", kw: "sueño REM,consolidación de memoria,regulación emocional, #VibeCoding,#EmotionalFitness" },
  },
  napping: {
    zh: { title: "小睡", desc: "科学小睡的最佳时长和时机，提升白天精力而不影响夜间睡眠", kw: "小睡,午睡,能量小睡,睡眠惯性,最佳午睡时间, #VibeCoding,#EmotionalFitness" },
    en: { title: "Napping", desc: "Optimal nap duration and timing to boost daytime energy without disrupting nightly sleep", kw: "napping,power nap,sleep inertia,nap duration,daytime sleep, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Tidur Sebentar", desc: "Tempoh dan masa tidur sebentar yang optimum untuk tenaga siang hari", kw: "tidur sebentar,power nap,inersia tidur, #VibeCoding,#EmotionalFitness" },
    ja: { title: "昼寝", desc: "最適な昼寝の長さとタイミングで日中のエネルギーを向上", kw: "昼寝,パワーナップ,睡眠慣性" },
    ko: { title: "낮잠", desc: "최적의 낮잠 시간과 타이밍으로 주간 에너지 향상", kw: "낮잠,파워냅,수면 관성" },
    th: { title: "การงีบหลับ", desc: "ระยะเวลาและช่วงเวลาที่เหมาะสมสำหรับการงีบหลับ", kw: "การงีบ,power nap,อาการมึนงงหลังตื่นนอน" },
    es: { title: "Siestas", desc: "Duración y horario óptimos de siesta para energía diurna", kw: "siesta,power nap,inercia del sueño, #VibeCoding,#EmotionalFitness" },
  },
  "stress-relief": {
    zh: { title: "压力缓解", desc: "从神经科学角度理解压力反应，掌握科学的减压方法", kw: "压力缓解,减压,皮质醇,压力管理,放松技巧, #VibeCoding,#EmotionalFitness" },
    en: { title: "Stress Relief", desc: "Understand the neuroscience of stress and master evidence-based relief techniques", kw: "stress relief,cortisol,stress management,relaxation,neuroscience, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Melegakan Tekanan", desc: "Fahami neurosains tekanan dan kuasai teknik melegakan tekanan", kw: "melegakan tekanan,kortisol,pengurusan tekanan, #VibeCoding,#EmotionalFitness" },
    ja: { title: "ストレス緩和", desc: "ストレス反応を神経科学から理解し、科学的な緩和法を習得", kw: "ストレス緩和,コルチゾール,ストレス管理" },
    ko: { title: "스트레스 해소", desc: "신경과학적 관점에서 스트레스 반응을 이해하고 과학적 해소법 습득", kw: "스트레스 해소,코르티솔,스트레스 관리" },
    th: { title: "การคลายเครียด", desc: "เข้าใจปฏิกิริยาความเครียดจากมุมมองประสาทวิทยาศาสตร์", kw: "คลายเครียด,คอร์ติซอล,การจัดการความเครียด" },
    es: { title: "Alivio del Estrés", desc: "Comprende la neurociencia del estrés y domina técnicas de alivio", kw: "alivio del estrés,cortisol,manejo del estrés, #VibeCoding,#EmotionalFitness" },
  },
  "panic-attack": {
    zh: { title: "惊恐发作", desc: "认识惊恐发作的生理机制，学习在发作时快速恢复平静的方法", kw: "惊恐发作,恐慌症,焦虑,呼吸法,接地技术, #VibeCoding,#EmotionalFitness" },
    en: { title: "Panic Attack", desc: "Understand the physiology of panic attacks and learn rapid grounding techniques", kw: "panic attack,anxiety,grounding techniques,breathing,CBT, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Serangan Panik", desc: "Fahami fisiologi serangan panik dan teknik grounding pantas", kw: "serangan panik,kebimbangan,teknik grounding, #VibeCoding,#EmotionalFitness" },
    ja: { title: "パニック発作", desc: "パニック発作の生理学的メカニズムと迅速なグラウンディング技法", kw: "パニック発作,不安,グラウンディング" },
    ko: { title: "공황 발작", desc: "공황 발작의 생리학적 메커니즘과 빠른 진정법", kw: "공황 발작,불안,그라운딩 테크닉" },
    th: { title: "อาการแพนิค", desc: "เข้าใจกลไกทางสรีรวิทยาของอาการแพนิคและเทคนิคการตั้งสติ", kw: "อาการแพนิค,ความวิตกกังวล,เทคนิคการตั้งสติ" },
    es: { title: "Ataque de Pánico", desc: "Comprende la fisiología del ataque de pánico y aprende técnicas de conexión a tierra", kw: "ataque de pánico,ansiedad,técnicas de grounding, #VibeCoding,#EmotionalFitness" },
  },
  "social-anxiety": {
    zh: { title: "社交焦虑", desc: "社交焦虑的认知行为模型与渐进式暴露训练方法", kw: "社交焦虑,社交恐惧,CBT,暴露疗法,社交技巧, #VibeCoding,#EmotionalFitness" },
    en: { title: "Social Anxiety", desc: "The CBT model of social anxiety and gradual exposure training methods", kw: "social anxiety,social phobia,CBT,exposure therapy, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Kebimbangan Sosial", desc: "Model CBT kebimbangan sosial dan latihan pendedahan berperingkat", kw: "kebimbangan sosial,fobia sosial,CBT,terapi pendedahan, #VibeCoding,#EmotionalFitness" },
    ja: { title: "社会不安", desc: "社会不安の認知行動モデルと段階的エクスポージャー訓練", kw: "社会不安,社交不安,CBT,暴露療法" },
    ko: { title: "사회 불안", desc: "사회 불안의 인지행동 모델과 점진적 노출 훈련", kw: "사회 불안,사회 공포증,CBT,노출 치료" },
    th: { title: "ความวิตกกังวลทางสังคม", desc: "รูปแบบ CBT ของความวิตกกังวลทางสังคมและการฝึกการเผชิญหน้า", kw: "ความวิตกกังวลทางสังคม,โรคกลัวสังคม,CBT" },
    es: { title: "Ansiedad Social", desc: "El modelo TCC de la ansiedad social y entrenamiento de exposición gradual", kw: "ansiedad social,fobia social,TCC,terapia de exposición, #VibeCoding,#EmotionalFitness" },
  },
  "generalized-anxiety": {
    zh: { title: "广泛性焦虑", desc: "广泛性焦虑的神经生物学基础与长期管理策略", kw: "广泛性焦虑,GAD,慢性焦虑,担忧,焦虑管理, #VibeCoding,#EmotionalFitness" },
    en: { title: "Generalized Anxiety", desc: "The neurobiology of GAD and long-term management strategies", kw: "generalized anxiety,GAD,chronic worry,anxiety management, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Kebimbangan Umum", desc: "Neurobiologi GAD dan strategi pengurusan jangka panjang", kw: "kebimbangan umum,GAD,risau kronik, #VibeCoding,#EmotionalFitness" },
    ja: { title: "全般性不安", desc: "全般性不安障害の神経生物学と長期的管理戦略", kw: "全般性不安,GAD,慢性不安" },
    ko: { title: "범불안장애", desc: "범불안장애의 신경생물학과 장기 관리 전략", kw: "범불안장애,GAD,만성 불안" },
    th: { title: "โรควิตกกังวลทั่วไป", desc: "ชีววิทยาทางประสาทของ GAD และกลยุทธ์การจัดการระยะยาว", kw: "โรควิตกกังวลทั่วไป,GAD,ความกังวลเรื้อรัง" },
    es: { title: "Ansiedad Generalizada", desc: "Neurobiología del TAG y estrategias de manejo a largo plazo", kw: "ansiedad generalizada,TAG,preocupación crónica, #VibeCoding,#EmotionalFitness" },
  },
  "health-anxiety": {
    zh: { title: "健康焦虑", desc: "过度关注身体症状?了解健康焦虑的认知偏差与应对策略", kw: "健康焦虑,疑病症,身体症状,疾病恐惧,CBT, #VibeCoding,#EmotionalFitness" },
    en: { title: "Health Anxiety", desc: "Excessive worry about your health? Understand cognitive biases and coping strategies", kw: "health anxiety,hypochondria,body symptoms,illness phobia,CBT, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Kebimbangan Kesihatan", desc: "Risau berlebihan tentang kesihatan? Fahami bias kognitif dan strategi pengurusan", kw: "kebimbangan kesihatan,hipokondria,simptom badan, #VibeCoding,#EmotionalFitness" },
    ja: { title: "健康不安", desc: "健康への過度な心配？認知バイアスと対処法を理解する", kw: "健康不安,心気症,身体症状,疾病恐怖" },
    ko: { title: "건강 불안", desc: "건강에 대한 과도한 걱정? 인지 편향과 대처 전략 이해", kw: "건강 불안,건강염려증,신체 증상" },
    th: { title: "ความกังวลด้านสุขภาพ", desc: "กังวลเกี่ยวกับสุขภาพมากเกินไป? เข้าใจอคติทางความคิด", kw: "ความกังวลด้านสุขภาพ,โรคกลัวป่วย,อาการทางร่างกาย" },
    es: { title: "Ansiedad por la Salud", desc: "¿Preocupación excesiva por tu salud? Comprende los sesgos cognitivos", kw: "ansiedad por la salud,hipocondría,síntomas corporales, #VibeCoding,#EmotionalFitness" },
  },
  "work-stress": {
    zh: { title: "工作压力", desc: "职场压力的生理学影响与可持续的工作-生活平衡策略", kw: "工作压力,职场压力,职业倦怠,工作生活平衡,压力管理, #VibeCoding,#EmotionalFitness" },
    en: { title: "Work Stress", desc: "The physiological impact of workplace stress and sustainable balance strategies", kw: "work stress,workplace stress,burnout,work-life balance, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Tekanan Kerja", desc: "Kesan fisiologi tekanan tempat kerja dan strategi keseimbangan", kw: "tekanan kerja,tekanan pekerjaan,burnout, #VibeCoding,#EmotionalFitness" },
    ja: { title: "仕事のストレス", desc: "職場ストレスの生理学的影響と持続可能なワークライフバランス", kw: "仕事のストレス,職場ストレス,バーンアウト" },
    ko: { title: "직장 스트레스", desc: "직장 스트레스의 생리학적 영향과 지속 가능한 균형 전략", kw: "직장 스트레스,업무 스트레스,번아웃" },
    th: { title: "ความเครียดจากการทำงาน", desc: "ผลกระทบทางสรีรวิทยาของความเครียดในที่ทำงาน", kw: "ความเครียดจากการทำงาน,ความเครียดในที่ทำงาน,หมดไฟ" },
    es: { title: "Estrés Laboral", desc: "El impacto fisiológico del estrés laboral y estrategias de equilibrio", kw: "estrés laboral,estrés en el trabajo,agotamiento, #VibeCoding,#EmotionalFitness" },
  },
  "exam-nerves": {
    zh: { title: "考试焦虑", desc: "考试前的紧张如何影响表现？基于认知科学的应试心态调整法", kw: "考试焦虑,考前紧张,应试心态,表现焦虑,CBT, #VibeCoding,#EmotionalFitness" },
    en: { title: "Exam Nerves", desc: "How pre-exam anxiety affects performance — cognitive science backed preparation", kw: "exam nerves,test anxiety,performance anxiety,study stress,CBT, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Kebimbangan Peperiksaan", desc: "Bagaimana kebimbangan pra-peperiksaan mempengaruhi prestasi", kw: "kebimbangan peperiksaan,tekanan ujian,prestasi, #VibeCoding,#EmotionalFitness" },
    ja: { title: "試験不安", desc: "試験前の緊張がパフォーマンスに与える影響と対策", kw: "試験不安,テスト不安,パフォーマンス不安" },
    ko: { title: "시험 불안", desc: "시험 전 긴장이 성과에 미치는 영향과 대처법", kw: "시험 불안,시험 긴장,수행 불안" },
    th: { title: "ความกังวลก่อนสอบ", desc: "ความกังวลก่อนสอบส่งผลต่อประสิทธิภาพการสอบอย่างไร", kw: "ความกังวลก่อนสอบ,กังวลเรื่องสอบ,ความเครียดสอบ" },
    es: { title: "Nervios por Exámenes", desc: "Cómo la ansiedad pre-examen afecta el rendimiento", kw: "nervios por exámenes,ansiedad por exámenes,estrés de estudio, #VibeCoding,#EmotionalFitness" },
  },
  loss: {
    zh: { title: "失落感", desc: "面对失去——理解哀伤的自然过程与自我关怀方法", kw: "失落,哀伤,失去,悲痛过程,自我关怀, #VibeCoding,#EmotionalFitness" },
    en: { title: "Loss", desc: "Facing loss — understanding the natural grieving process and self-compassion", kw: "loss,grief,bereavement,healing,self-compassion, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Kehilangan", desc: "Menghadapi kehilangan — memahami proses berduka dan belas kasihan diri", kw: "kehilangan,duka,berkabung,penyembuhan, #VibeCoding,#EmotionalFitness" },
    ja: { title: "喪失感", desc: "喪失に向き合う — 悲嘆の自然なプロセスと自己慈愛", kw: "喪失,悲嘆,別れ,癒し" },
    ko: { title: "상실감", desc: "상실에 맞서기 — 애도 과정과 자기 연민 이해", kw: "상실,애도,슬픔,치유" },
    th: { title: "ความรู้สึกสูญเสีย", desc: "เผชิญกับการสูญเสีย — เข้าใจกระบวนการเศร้าโศก", kw: "การสูญเสีย,ความเศร้าโศก,การเยียวยา" },
    es: { title: "Pérdida", desc: "Enfrentando la pérdida — entendiendo el proceso natural de duelo", kw: "pérdida,duelo,aflicción, sanación, #VibeCoding,#EmotionalFitness" },
  },
  bereavement: {
    zh: { title: "丧亲之痛", desc: "亲人离世后的心理调适——哀伤的五个阶段与重建生活的路径", kw: "丧亲,哀伤,亲人离世,心理调适,哀伤阶段, #VibeCoding,#EmotionalFitness" },
    en: { title: "Bereavement", desc: "Navigating life after losing a loved one — the stages of grief and rebuilding", kw: "bereavement,grief,loss of loved one,mourning,healing, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Kematian Orang Tersayang", desc: "Mengharungi kehidupan selepas kehilangan orang tersayang", kw: "kematian,duka,kehilangan,berkabung, #VibeCoding,#EmotionalFitness" },
    ja: { title: "死別", desc: "大切な人を失った後の心の調整 — 悲嘆の段階と再構築", kw: "死別,悲嘆,別れ,グリーフケア" },
    ko: { title: "사별", desc: "사랑하는 사람을 잃은 후의 심리적 적응", kw: "사별,애도,상실,슬픔" },
    th: { title: "การสูญเสียบุคคลอันเป็นที่รัก", desc: "การปรับตัวทางจิตใจหลังสูญเสียบุคคลอันเป็นที่รัก", kw: "การสูญเสีย,ความเศร้า,การ mourning" },
    es: { title: "Duelo", desc: "Navegando la vida tras perder a un ser querido — las etapas del duelo", kw: "duelo,pérdida,aflicción,mourning, #VibeCoding,#EmotionalFitness" },
  },
  "pet-loss": {
    zh: { title: "宠物离世", desc: "失去毛孩子——宠物哀伤是真实的情感，值得被认真对待", kw: "宠物离世,宠物哀伤,宠物丧失,毛孩子,宠物 grief, #VibeCoding,#EmotionalFitness" },
    en: { title: "Pet Loss", desc: "Losing a furry family member — pet grief is real and deserves compassionate care", kw: "pet loss,pet grief,animal companion,pet bereavement, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Kehilangan Haiwan Peliharaan", desc: "Kehilangan ahli keluarga berbulu — duka haiwan adalah nyata", kw: "kehilangan haiwan,duka haiwan,haiwan peliharaan, #VibeCoding,#EmotionalFitness" },
    ja: { title: "ペットロス", desc: "毛孩を失うこと — ペットの悲しみは本物で、大切に扱われるべき", kw: "ペットロス,ペットの死,動物との別れ" },
    ko: { title: "반려동물 상실", desc: "털복숭이 가족을 잃는 것 — 반려동물 애도는 진짜다", kw: "반려동물 상실,반려동물 애도,펫로스" },
    th: { title: "การสูญเสียสัตว์เลี้ยง", desc: "การสูญเสียสมาชิกครอบครัวขนฟู — ความเศร้าจากสัตว์เลี้ยงเป็นเรื่องจริง", kw: "การสูญเสียสัตว์เลี้ยง,ความเศร้าสัตว์เลี้ยง" },
    es: { title: "Pérdida de Mascota", desc: "Perder a un miembro peludo de la familia — el duelo por mascotas es real", kw: "pérdida de mascota,duelo por mascota, #VibeCoding,#EmotionalFitness" },
  },
  divorce: {
    zh: { title: "离婚", desc: "婚姻结束后的情绪恢复——从崩溃到重建的完整路径", kw: "离婚,婚姻结束,情感恢复,重建生活,心理调适, #VibeCoding,#EmotionalFitness" },
    en: { title: "Divorce", desc: "Emotional recovery after marriage ends — a complete path from collapse to rebuilding", kw: "divorce,separation,emotional recovery,rebuilding, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Perceraian", desc: "Pemulihan emosi selepas perkahwinan berakhir", kw: "perceraian,perpisahan,pemulihan emosi, #VibeCoding,#EmotionalFitness" },
    ja: { title: "離婚", desc: "結婚生活の終了後の感情的回復 — 崩壊から再建へ", kw: "離婚,別居,感情的回復,再建" },
    ko: { title: "이혼", desc: "결혼 종료 후 감정적 회복 — 붕괴에서 재건까지", kw: "이혼,별거,감정 회복,재건" },
    th: { title: "การหย่าร้าง", desc: "การฟื้นฟูทางอารมณ์หลังการสิ้นสุดของการแต่งงาน", kw: "การหย่าร้าง,การแยกทาง,การฟื้นฟูอารมณ์" },
    es: { title: "Divorcio", desc: "Recuperación emocional tras el fin del matrimonio", kw: "divorcio,separación,recuperación emocional, #VibeCoding,#EmotionalFitness" },
  },
  "long-distance": {
    zh: { title: "异地恋", desc: "异地关系中的情感维护策略——距离不是障碍，连接才是", kw: "异地恋,异地关系,远距离恋爱,情感连接,沟通技巧, #VibeCoding,#EmotionalFitness" },
    en: { title: "Long Distance", desc: "Maintaining emotional connection across miles — strategies that actually work", kw: "long distance relationship,LDR,emotional connection,communication, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Hubungan Jarak Jauh", desc: "Mengekalkan hubungan emosi merentas jarak", kw: "hubungan jarak jauh,LDR,sambungan emosi, #VibeCoding,#EmotionalFitness" },
    ja: { title: "遠距離恋愛", desc: "距離を越えた感情的なつながりの維持", kw: "遠距離恋愛,LDR,感情的なつながり" },
    ko: { title: "장거리 연애", desc: "거리를 넘어 감정적 연결 유지하기", kw: "장거리 연애,LDR,감정적 연결" },
    th: { title: "ความรักทางไกล", desc: "การรักษาความสัมพันธ์ทางอารมณ์ข้ามระยะทาง", kw: "ความรักทางไกล,LDR,การเชื่อมต่อทางอารมณ์" },
    es: { title: "Relación a Distancia", desc: "Manteniendo la conexión emocional a través de los kilómetros", kw: "relación a distancia,LDR,conexión emocional, #VibeCoding,#EmotionalFitness" },
  },
  solitude: {
    zh: { title: "独处", desc: "独处不等于孤独——学会享受独处的心理益处", kw: "独处,独处能力,自我时间,内在平静,孤独感, #VibeCoding,#EmotionalFitness" },
    en: { title: "Solitude", desc: "Solitude is not loneliness — learn to enjoy and benefit from time alone", kw: "solitude,alone time,me time,inner peace,self-reflection, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Kesendirian", desc: "Kesendirian bukan kesunyian — belajar nikmati masa berseorangan", kw: "kesendirian,masa sendiri,ketenangan dalaman, #VibeCoding,#EmotionalFitness" },
    ja: { title: "孤独", desc: "孤独は寂しさではない — 一人の時間を楽しむ心理学", kw: "孤独,一人時間,内的平和,自己内省" },
    ko: { title: "혼자 있는 시간", desc: "혼자 있는 것은 외로움이 아니다 — 혼자만의 시간 즐기기", kw: "혼자 있는 시간,나만의 시간,내적 평화" },
    th: { title: "การอยู่คนเดียว", desc: "การอยู่คนเดียวไม่ใช่ความเหงา — เรียนรู้ที่จะเพลิดเพลินกับเวลาส่วนตัว", kw: "การอยู่คนเดียว,เวลาส่วนตัว,ความสงบภายใน" },
    es: { title: "Soledad", desc: "La soledad no es soledad — aprende a disfrutar del tiempo a solas", kw: "soledad,tiempo a solas,paz interior, #VibeCoding,#EmotionalFitness" },
  },
  isolation: {
    zh: { title: "孤立感", desc: "感觉与世隔绝？理解社交隔离对心理健康的影响与重建连接的途径", kw: "孤立,社交隔离,孤独感,重建连接,社交支持, #VibeCoding,#EmotionalFitness" },
    en: { title: "Isolation", desc: "Feeling cut off from the world? The impact of social isolation and reconnection", kw: "isolation,social isolation,loneliness,reconnection,support, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Pengasingan", desc: "Rasa terputus dari dunia? Kesan pengasingan sosial", kw: "pengasingan,pengasingan sosial,kesunyian, #VibeCoding,#EmotionalFitness" },
    ja: { title: "孤立感", desc: "世界から切り離された感じ？社会的孤立の影響と再接続", kw: "孤立,社会的孤立,孤独感,再接続" },
    ko: { title: "고립감", desc: "세상과 단절된 느낌? 사회적 고립의 영향과 재연결", kw: "고립,사회적 고립,외로움,재연결" },
    th: { title: "ความรู้สึกโดดเดี่ยว", desc: "รู้สึกถูกตัดขาดจากโลก? ผลกระทบของการแยกตัวทางสังคม", kw: "การแยกตัว,ความโดดเดี่ยว,การเชื่อมต่อใหม่" },
    es: { title: "Aislamiento", desc: "¿Sintiéndote desconectado del mundo? El impacto del aislamiento social", kw: "aislamiento,aislamiento social,soledad, #VibeCoding,#EmotionalFitness" },
  },
  friendship: {
    zh: { title: "友谊", desc: "高质量友谊的科学——如何建立和维护有意义的社交关系", kw: "友谊,社交关系,朋友,人际关系,社交连接, #VibeCoding,#EmotionalFitness" },
    en: { title: "Friendship", desc: "The science of quality friendships — how to build and maintain meaningful connections", kw: "friendship,social connection,relationship,peer support, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Persahabatan", desc: "Sains persahabatan berkualiti — bina hubungan bermakna", kw: "persahabatan,hubungan sosial,rakan, #VibeCoding,#EmotionalFitness" },
    ja: { title: "友情", desc: "質の高い友情の科学 — 意味のある関係を築く方法", kw: "友情,社会的関係,友人,人間関係" },
    ko: { title: "우정", desc: "고품질 우정의 과학 — 의미 있는 관계 구축법", kw: "우정,사회적 관계,친구" },
    th: { title: "มิตรภาพ", desc: "วิทยาศาสตร์ของมิตรภาพที่มีคุณภาพ — สร้างความสัมพันธ์ที่มีความหมาย", kw: "มิตรภาพ,ความสัมพันธ์ทางสังคม,เพื่อน" },
    es: { title: "Amistad", desc: "La ciencia de las amistades de calidad — cómo construir conexiones significativas", kw: "amistad,conexión social,relaciones, #VibeCoding,#EmotionalFitness" },
  },
  "social-skills": {
    zh: { title: "社交技巧", desc: "社交技巧是可以学习的——从基础对话到深层连接的实用指南", kw: "社交技巧,社交能力,沟通技巧,社交焦虑,人际关系, #VibeCoding,#EmotionalFitness" },
    en: { title: "Social Skills", desc: "Social skills can be learned — a practical guide from basic conversation to deep connection", kw: "social skills,communication,conversation,social confidence, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Kemahiran Sosial", desc: "Kemahiran sosial boleh dipelajari — panduan praktikal", kw: "kemahiran sosial,komunikasi,keyakinan sosial, #VibeCoding,#EmotionalFitness" },
    ja: { title: "社交スキル", desc: "社交スキルは学べる — 基本会話から深いつながりへ", kw: "社交スキル,コミュニケーション,会話力" },
    ko: { title: "사회적 기술", desc: "사회적 기술은 배울 수 있다 — 기본 대화에서 깊은 연결까지", kw: "사회적 기술,의사소통,대화 기술" },
    th: { title: "ทักษะทางสังคม", desc: "ทักษะทางสังคมเรียนรู้ได้ — คู่มือปฏิบัติจากการสนทนาพื้นฐาน", kw: "ทักษะทางสังคม,การสื่อสาร,การสนทนา" },
    es: { title: "Habilidades Sociales", desc: "Las habilidades sociales se aprenden — guía práctica", kw: "habilidades sociales,comunicación,conversación, #VibeCoding,#EmotionalFitness" },
  },
  belonging: {
    zh: { title: "归属感", desc: "归属感是人类的基本心理需求——找到你的社群和位置", kw: "归属感,社群,被接纳,社会归属,身份认同, #VibeCoding,#EmotionalFitness" },
    en: { title: "Belonging", desc: "Belonging is a fundamental human need — finding your community and place", kw: "belonging,community,acceptance,social identity, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Rasa Kekitaan", desc: "Rasa kekitaan adalah keperluan asas manusia", kw: "kekitaan,komuniti,penerimaan, #VibeCoding,#EmotionalFitness" },
    ja: { title: "所属感", desc: "所属感は人間の基本的欲求 — コミュニティと居場所を見つける", kw: "所属感,コミュニティ,受容" },
    ko: { title: "소속감", desc: "소속감은 인간의 기본 욕구 — 커뮤니티와 자리 찾기", kw: "소속감,커뮤니티,수용" },
    th: { title: "ความรู้สึกเป็นส่วนหนึ่ง", desc: "ความรู้สึกเป็นส่วนหนึ่งคือความต้องการพื้นฐานของมนุษย์", kw: "ความรู้สึกเป็นส่วนหนึ่ง,ชุมชน,การยอมรับ" },
    es: { title: "Pertenencia", desc: "La pertenencia es una necesidad humana fundamental", kw: "pertenencia,comunidad,aceptación, #VibeCoding,#EmotionalFitness" },
  },
  "self-esteem": {
    zh: { title: "自尊", desc: "自尊不是自负——建立稳固自我价值感的科学方法", kw: "自尊,自我价值,自尊心,自我接纳,自信, #VibeCoding,#EmotionalFitness" },
    en: { title: "Self Esteem", desc: "Self-esteem is not arrogance — science-backed ways to build stable self-worth", kw: "self-esteem,self-worth,confidence,self-acceptance, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Harga Diri", desc: "Harga diri bukan keangkuhan — bina nilai diri yang stabil", kw: "harga diri,nilai diri,keyakinan, #VibeCoding,#EmotionalFitness" },
    ja: { title: "自尊心", desc: "自尊心は傲慢ではない — 安定した自己価値感を築く", kw: "自尊心,自己価値,自信" },
    ko: { title: "자존감", desc: "자존감은 오만이 아니다 — 안정적 자기 가치감 구축", kw: "자존감,자기 가치,자신감" },
    th: { title: "ความภูมิใจในตนเอง", desc: "ความภูมิใจในตนเองไม่ใช่ความเย่อหยิ่ง — วิธีสร้างคุณค่าในตนเอง", kw: "ความภูมิใจในตนเอง,คุณค่าในตนเอง,ความมั่นใจ" },
    es: { title: "Autoestima", desc: "La autoestima no es arrogancia — formas de construir autoestima estable", kw: "autoestima,amor propio,confianza, #VibeCoding,#EmotionalFitness" },
  },
  "impostor-syndrome": {
    zh: { title: "冒名顶替综合症", desc: "总觉得自己不配？了解 impostor syndrome 的心理学机制与应对方法", kw: "冒名顶替综合症,冒充者综合征,自我怀疑,成就焦虑,Dunning-Kruger, #VibeCoding,#EmotionalFitness" },
    en: { title: "Impostor Syndrome", desc: "Feel like a fraud? Understanding the psychology and coping strategies", kw: "impostor syndrome,self-doubt,achievement anxiety,Dunning-Kruger, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Sindrom Penipu", desc: "Rasa seperti penipu? Fahami psikologi dan strategi mengatasi", kw: "sindrom penipu,keraguan diri,kebimbangan pencapaian, #VibeCoding,#EmotionalFitness" },
    ja: { title: "インポスター症候群", desc: "自分は詐欺師だと感じる？心理学と対処法を理解する", kw: "インポスター症候群,自己不信,達成不安" },
    ko: { title: "가면 증후군", desc: "사기꾼 같은 기분? 심리학과 대처 전략 이해", kw: "가면 증후군,자가 의심,성취 불안" },
    th: { title: "Impostor Syndrome", desc: "รู้สึกเหมือนเป็นคนปลอม? เข้าใจจิตวิทยาและวิธีรับมือ", kw: "Impostor Syndrome,ความสงสัยในตนเอง,ความกังวล" },
    es: { title: "Síndrome del Impostor", desc: "¿Te sientes un fraude? Comprende la psicología y las estrategias de afrontamiento", kw: "síndrome del impostor,autoduda,ansiedad por logros, #VibeCoding,#EmotionalFitness" },
  },
  perfectionism: {
    zh: { title: "完美主义", desc: "完美主义是一把双刃剑——区分健康追求与自我挫败", kw: "完美主义,追求完美,自我苛责,不完美,自我接纳, #VibeCoding,#EmotionalFitness" },
    en: { title: "Perfectionism", desc: "Perfectionism is a double-edged sword — distinguish healthy striving from self-defeat", kw: "perfectionism,high standards,self-criticism,self-acceptance, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Perfeksionisme", desc: "Perfeksionisme pisau bermata dua — bezakan usaha sihat", kw: "perfeksionisme,standard tinggi,kritikan diri, #VibeCoding,#EmotionalFitness" },
    ja: { title: "完全主義", desc: "完全主義は諸刃の剣 — 健康的な追求と自己敗北の区別", kw: "完全主義,完璧主義,自己批判" },
    ko: { title: "완벽주의", desc: "완벽주의는 양날의 검 — 건강한 추구와 자기 패배 구분", kw: "완벽주의,높은 기준,자기 비판" },
    th: { title: "ความสมบูรณ์แบบ", desc: "ความสมบูรณ์แบบเป็นดาบสองคม — แยกแยะการ pursuit ที่ดีต่อสุขภาพ", kw: "ความสมบูรณ์แบบ,มาตรฐานสูง,การวิจารณ์ตนเอง" },
    es: { title: "Perfeccionismo", desc: "El perfeccionismo es una espada de doble filo", kw: "perfeccionismo,altos estándares,autocrítica, #VibeCoding,#EmotionalFitness" },
  },
  "body-image": {
    zh: { title: "身体形象", desc: "在这个看脸的时代——如何建立积极的身体形象与自我接纳", kw: "身体形象,身材焦虑,容貌焦虑,自我接纳,身体积极, #VibeCoding,#EmotionalFitness" },
    en: { title: "Body Image", desc: "In an appearance-focused world — building positive body image and self-acceptance", kw: "body image,body dysmorphia,appearance anxiety,self-acceptance, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Imej Badan", desc: "Dalam dunia fokus penampilan — bina imej badan positif", kw: "imej badan, kebimbangan rupa, penerimaan diri, #VibeCoding,#EmotionalFitness" },
    ja: { title: "ボディイメージ", desc: "外見重視の世界で — ポジティブなボディイメージを築く", kw: "ボディイメージ,容姿不安,自己受容" },
    ko: { title: "신체 이미지", desc: "외모 중심 세계에서 — 긍정적 신체 이미지 구축", kw: "신체 이미지,외모 불안,자기 수용" },
    th: { title: "ภาพลักษณ์ทางร่างกาย", desc: "ในโลกที่ให้ความสำคัญกับรูปลักษณ์ — สร้างภาพลักษณ์ทางร่างกายเชิงบวก", kw: "ภาพลักษณ์ทางร่างกาย,กังวลเรื่องรูปร่าง,การยอมรับตนเอง" },
    es: { title: "Imagen Corporal", desc: "En un mundo centrado en la apariencia — construyendo una imagen corporal positiva", kw: "imagen corporal,ansiedad por la apariencia,autoaceptación, #VibeCoding,#EmotionalFitness" },
  },
  comparison: {
    zh: { title: "比较心理", desc: "为什么我们忍不住和别人比较？社会比较理论的启示与解脱之道", kw: "比较心理,社会比较,羡慕,嫉妒,自我价值, #VibeCoding,#EmotionalFitness" },
    en: { title: "Comparison", desc: "Why we can't stop comparing ourselves to others — insights from social comparison theory", kw: "comparison,social comparison,envy,jealousy,self-worth, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Perbandingan", desc: "Kenapa kita tak boleh berhenti bandingkan diri dengan orang lain", kw: "perbandingan,perbandingan sosial,iri hati, #VibeCoding,#EmotionalFitness" },
    ja: { title: "比較心理", desc: "なぜ他人と比較せずにはいられないのか？社会的比較理論", kw: "比較心理,社会的比較,羨望,自己価値" },
    ko: { title: "비교 심리", desc: "왜 타인과 비교하지 않을 수 없을까? 사회 비교 이론", kw: "비교 심리,사회 비교,질투" },
    th: { title: "การเปรียบเทียบ", desc: "ทำไมเราหยุดเปรียบเทียบตัวเองกับคนอื่นไม่ได้", kw: "การเปรียบเทียบ,การเปรียบเทียบทางสังคม,ความอิจฉา" },
    es: { title: "Comparación", desc: "Por qué no podemos dejar de compararnos — teoría de la comparación social", kw: "comparación,comparación social,envidia, #VibeCoding,#EmotionalFitness" },
  },
  "self-compassion": {
    zh: { title: "自我关怀", desc: "对自己好一点——自我关怀的科学研究与实践方法", kw: "自我关怀,自悯,善待自己,正念自我关怀,慈悲, #VibeCoding,#EmotionalFitness" },
    en: { title: "Self Compassion", desc: "Being kind to yourself — the science and practice of self-compassion", kw: "self-compassion,self-kindness,mindfulness,common humanity, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Belas Kasihan Diri", desc: "Bersikap baik pada diri sendiri — sains dan amalan belas kasihan diri", kw: "belas kasihan diri,kebaikan diri,kesedaran, #VibeCoding,#EmotionalFitness" },
    ja: { title: "セルフコンパッション", desc: "自分に優しくする — セルフコンパッションの科学と実践", kw: "セルフコンパッション,自己慈愛,マインドフルネス" },
    ko: { title: "자기 연민", desc: "자신에게 친절해지기 — 자기 연민의 과학과 실천", kw: "자기 연민,자기 친절,마음챙김" },
    th: { title: "ความเมตตาต่อตนเอง", desc: "มีเมตตาต่อตัวเอง — วิทยาศาสตร์และการปฏิบัติของความเมตตาต่อตนเอง", kw: "ความเมตตาต่อตนเอง,การปฏิบัติต่อตนเอง" },
    es: { title: "Autocompasión", desc: "Ser amable contigo mismo — la ciencia y práctica de la autocompasión", kw: "autocompasión,amabilidad propia,atención plena, #VibeCoding,#EmotionalFitness" },
  },
  "break-up": {
    zh: { title: "分手", desc: "分手后的心理重建——从心碎到重新学会爱自己", kw: "分手,失恋,心碎,情感恢复,自我重建, #VibeCoding,#EmotionalFitness" },
    en: { title: "Break Up", desc: "Psychological rebuilding after a breakup — from heartbreak to self-love", kw: "breakup,heartbreak,relationship end,emotional recovery, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Putus Cinta", desc: "Pemulihan psikologi selepas putus cinta", kw: "putus cinta,sakit hati, pemulihan emosi, #VibeCoding,#EmotionalFitness" },
    ja: { title: "別れ", desc: "別れの後の心理的再建 — 失恋から自己愛へ", kw: "別れ,失恋,心の回復" },
    ko: { title: "이별", desc: "이별 후 심리적 재건 — 상처에서 자기 사랑까지", kw: "이별,실연,감정 회복" },
    th: { title: "การเลิกรา", desc: "การสร้างจิตใจใหม่หลังการเลิกรา — จากหัวใจสลายสู่รักตัวเอง", kw: "การเลิกรา,อกหัก,การฟื้นฟูอารมณ์" },
    es: { title: "Ruptura", desc: "Reconstrucción psicológica tras una ruptura — del desamor al amor propio", kw: "ruptura,desamor,recuperación emocional, #VibeCoding,#EmotionalFitness" },
  },
  communication: {
    zh: { title: "沟通", desc: "有效沟通的技巧——非暴力沟通与深度倾听的实践指南", kw: "沟通,沟通技巧,非暴力沟通,倾听,有效表达, #VibeCoding,#EmotionalFitness" },
    en: { title: "Communication", desc: "Effective communication skills — a practical guide to NVC and deep listening", kw: "communication,NVC,active listening,effective expression, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Komunikasi", desc: "Kemahiran komunikasi berkesan — panduan praktikal", kw: "komunikasi,NVC,mendengar aktif, #VibeCoding,#EmotionalFitness" },
    ja: { title: "コミュニケーション", desc: "効果的なコミュニケーション — 非暴力コミュニケーション実践ガイド", kw: "コミュニケーション,NVC,傾聴" },
    ko: { title: "의사소통", desc: "효과적인 의사소통 기술 — 비폭력 대화 실천 가이드", kw: "의사소통,NVC,경청" },
    th: { title: "การสื่อสาร", desc: "ทักษะการสื่อสารที่มีประสิทธิภาพ — คู่มือปฏิบัติ NVC", kw: "การสื่อสาร,NVC,การฟังอย่างลึกซึ้ง" },
    es: { title: "Comunicación", desc: "Habilidades de comunicación efectiva — guía práctica de CNV", kw: "comunicación,CNV,escucha activa, #VibeCoding,#EmotionalFitness" },
  },
  trust: {
    zh: { title: "信任", desc: "信任的心理学——如何建立、维持和修复关系中的信任", kw: "信任,建立信任,信任修复,关系,安全感, #VibeCoding,#EmotionalFitness" },
    en: { title: "Trust", desc: "The psychology of trust — how to build, maintain, and repair trust in relationships", kw: "trust,building trust,trust repair,relationships,security, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Kepercayaan", desc: "Psikologi kepercayaan — bina, jaga dan baiki kepercayaan", kw: "kepercayaan,bina kepercayaan, hubungan, #VibeCoding,#EmotionalFitness" },
    ja: { title: "信頼", desc: "信頼の心理学 — 関係における信頼の構築、維持、修復", kw: "信頼,信頼構築,信頼修復" },
    ko: { title: "신뢰", desc: "신뢰의 심리학 — 관계에서 신뢰 구축, 유지, 회복", kw: "신뢰,신뢰 구축,신뢰 회복" },
    th: { title: "ความไว้วางใจ", desc: "จิตวิทยาของความไว้วางใจ — การสร้าง รักษา และซ่อมแซมความไว้วางใจ", kw: "ความไว้วางใจ,การสร้างความไว้วางใจ,ความสัมพันธ์" },
    es: { title: "Confianza", desc: "La psicología de la confianza — cómo construir, mantener y reparar la confianza", kw: "confianza,construir confianza,reparar confianza, #VibeCoding,#EmotionalFitness" },
  },
  "co-dependency": {
    zh: { title: "相互依赖", desc: "不健康的关系模式——识别相互依赖并建立健康的边界", kw: "相互依赖,共依存,关系模式,边界,健康关系, #VibeCoding,#EmotionalFitness" },
    en: { title: "Co-dependency", desc: "Unhealthy relationship patterns — recognizing codependency and building healthy boundaries", kw: "codependency,relationship patterns,boundaries,healthy relationships, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Kodependensi", desc: "Corak hubungan tidak sihat — kenali kodependensi", kw: "kodependensi,corak hubungan,sempadan, #VibeCoding,#EmotionalFitness" },
    ja: { title: "共依存", desc: "不健全な関係パターン — 共依存を認識し健全な境界線を築く", kw: "共依存,関係パターン,境界線" },
    ko: { title: "공의존", desc: "불건강한 관계 패턴 — 공의존 인식과 건강한 경계 설정", kw: "공의존,관계 패턴,경계" },
    th: { title: "การพึ่งพากัน", desc: "รูปแบบความสัมพันธ์ที่ไม่ healthy — รู้จักการพึ่งพาและสร้างขอบเขต", kw: "การพึ่งพากัน,รูปแบบความสัมพันธ์,ขอบเขต" },
    es: { title: "Codependencia", desc: "Patrones de relación no saludables — reconociendo la codependencia", kw: "codependencia,patrones relacionales,límites, #VibeCoding,#EmotionalFitness" },
  },
  boundaries: {
    zh: { title: "边界感", desc: "健康的边界是关系的地基——学习设立和维护个人界限", kw: "边界,个人界限,边界感,自我尊重,关系健康, #VibeCoding,#EmotionalFitness" },
    en: { title: "Boundaries", desc: "Healthy boundaries are the foundation of relationships — learn to set and maintain them", kw: "boundaries,personal boundaries,self-respect,assertiveness, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Sempadan", desc: "Sempadan sihat adalah asas hubungan", kw: "sempadan,sempadan peribadi,hormat diri, #VibeCoding,#EmotionalFitness" },
    ja: { title: "境界線", desc: "健全な境界線は関係の基盤 — 設定と維持を学ぶ", kw: "境界線,パーソナルスペース,自己尊重" },
    ko: { title: "경계", desc: "건강한 경계는 관계의 기초 — 설정과 유지 학습", kw: "경계,개인적 경계,자기 존중" },
    th: { title: "ขอบเขต", desc: "ขอบเขตที่ healthy คือพื้นฐานของความสัมพันธ์", kw: "ขอบเขต,ขอบเขตส่วนบุคคล,การ尊重ตนเอง" },
    es: { title: "Límites", desc: "Los límites saludables son la base de las relaciones", kw: "límites,límites personales,respeto propio, #VibeCoding,#EmotionalFitness" },
  },
  parenting: {
    zh: { title: "育儿", desc: "为人父母的心理挑战——正念育儿与亲子关系的科学指南", kw: "育儿,亲子关系,正念育儿,儿童心理,家庭教育, #VibeCoding,#EmotionalFitness" },
    en: { title: "Parenting", desc: "The psychological challenges of parenting — mindful parenting and connection", kw: "parenting,child development,mindful parenting,family, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Keibubapaan", desc: "Cabaran psikologi keibubapaan — panduan saintifik", kw: "keibubapaan,perkembangan kanak-kanak, #VibeCoding,#EmotionalFitness" },
    ja: { title: "子育て", desc: "子育ての心理的課題 — マインドフル子育てと親子関係", kw: "子育て,親子関係,マインドフル子育て" },
    ko: { title: "육아", desc: "육아의 심리적 도전 — 마음챙김 육아와 자녀 관계", kw: "육아,자녀 관계,마음챙김 육아" },
    th: { title: "การเลี้ยงดู", desc: "ความท้าทายทางจิตใจของการเลี้ยงดู — การเลี้ยงดูอย่างมีสติ", kw: "การเลี้ยงดู,ความสัมพันธ์พ่อแม่ลูก" },
    es: { title: "Crianza", desc: "Los desafíos psicológicos de la crianza — crianza consciente", kw: "crianza,desarrollo infantil,crianza consciente, #VibeCoding,#EmotionalFitness" },
  },
  "family-conflict": {
    zh: { title: "家庭冲突", desc: "原生家庭与当前家庭中的冲突模式——理解、化解与和解", kw: "家庭冲突,原生家庭,家庭关系,冲突化解,和解, #VibeCoding,#EmotionalFitness" },
    en: { title: "Family Conflict", desc: "Conflict patterns in family systems — understanding, resolving, and finding peace", kw: "family conflict,family dynamics,conflict resolution,reconciliation, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Konflik Keluarga", desc: "Corak konflik dalam sistem keluarga", kw: "konflik keluarga,dinamik keluarga,resolusi konflik, #VibeCoding,#EmotionalFitness" },
    ja: { title: "家族間対立", desc: "家族システムにおける対立パターン — 理解、解決、和解", kw: "家族間対立,家族関係,対立解決" },
    ko: { title: "가족 갈등", desc: "가족 체계의 갈등 패턴 — 이해, 해결, 화해", kw: "가족 갈등,가족 관계,갈등 해결" },
    th: { title: "ความขัดแย้งในครอบครัว", desc: "รูปแบบความขัดแย้งในระบบครอบครัว", kw: "ความขัดแย้งในครอบครัว,พลวัตครอบครัว" },
    es: { title: "Conflicto Familiar", desc: "Patrones de conflicto en sistemas familiares", kw: "conflicto familiar,dinámica familiar,resolución, #VibeCoding,#EmotionalFitness" },
  },
  purpose: {
    zh: { title: "人生意义", desc: "寻找人生目标和意义——存在主义心理学的视角与现代实践", kw: "人生意义,人生目标,存在主义,价值观,使命, #VibeCoding,#EmotionalFitness" },
    en: { title: "Purpose", desc: "Finding meaning and purpose in life — existential psychology meets modern practice", kw: "purpose,meaning,life goals,existential,values, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Tujuan Hidup", desc: "Mencari makna dan tujuan hidup — psikologi eksistensial", kw: "tujuan hidup,makna,matlamat hidup, #VibeCoding,#EmotionalFitness" },
    ja: { title: "人生の目的", desc: "人生の意味と目的を探す — 実存心理学と現代実践", kw: "人生の目的,意味,目標" },
    ko: { title: "인생의 의미", desc: "인생의 의미와 목표 찾기 — 실존 심리학의 관점", kw: "인생의 의미,목표,실존" },
    th: { title: "จุดมุ่งหมายของชีวิต", desc: "การค้นหาความหมายและจุดมุ่งหมายของชีวิต", kw: "จุดมุ่งหมาย,ความหมายของชีวิต,เป้าหมาย" },
    es: { title: "Propósito", desc: "Encontrando significado y propósito en la vida", kw: "propósito,significado,metas de vida, #VibeCoding,#EmotionalFitness" },
  },
  "career-change": {
    zh: { title: "职业转型", desc: "职业转型的心理准备——从不确定到新方向的完整指南", kw: "职业转型,转行,职业规划,职业焦虑,人生转型, #VibeCoding,#EmotionalFitness" },
    en: { title: "Career Change", desc: "The psychology of career transition — from uncertainty to a new direction", kw: "career change,job transition,career anxiety,professional growth, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Perubahan Kerjaya", desc: "Psikologi peralihan kerjaya — dari ketidakpastian ke arah baru", kw: "perubahan kerjaya,peralihan pekerjaan,pertumbuhan, #VibeCoding,#EmotionalFitness" },
    ja: { title: "キャリアチェンジ", desc: "キャリア転換の心理的準備 — 不確実性から新たな方向へ", kw: "キャリアチェンジ,転職,キャリア不安" },
    ko: { title: "커리어 체인지", desc: "직업 전환의 심리적 준비 — 불확실성에서 새 방향으로", kw: "커리어 체인지,전직,직업 불안" },
    th: { title: "การเปลี่ยนอาชีพ", desc: "จิตวิทยาของการเปลี่ยนอาชีพ — จากความไม่แน่นอนสู่ทิศทางใหม่", kw: "การเปลี่ยนอาชีพ,การเปลี่ยนงาน,ความกังวลเรื่องอาชีพ" },
    es: { title: "Cambio de Carrera", desc: "La psicología de la transición profesional", kw: "cambio de carrera,transición laboral,crecimiento profesional, #VibeCoding,#EmotionalFitness" },
  },
  "quarter-life-crisis": {
    zh: { title: "四分之一人生危机", desc: "20多岁到30出头的迷茫——为什么你感觉被困住了以及如何找到出路", kw: "四分之一人生危机,20多岁,30岁,迷茫,人生方向, #VibeCoding,#EmotionalFitness" },
    en: { title: "Quarter Life Crisis", desc: "The迷茫 of your 20s and early 30s — why you feel stuck and how to find your way", kw: "quarter life crisis,20s,30s,迷茫,life direction, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Krisis Suku Abad", desc: "Kekeliruan usia 20-an hingga awal 30-an — rasa tersekat dan cari arah", kw: "krisis suku abad,20-an,30-an,arah hidup, #VibeCoding,#EmotionalFitness" },
    ja: { title: "クォーターライフクライシス", desc: "20代から30代前半の迷い — なぜ行き詰まりを感じるのか", kw: "クォーターライフクライシス,20代,迷い" },
    ko: { title: "쿼터 라이프 크라이시스", desc: "20대에서 30대 초반의 혼란 — 왜 갇힌 느낌이 들까", kw: "쿼터 라이프 크라이시스,20대,방향성" },
    th: { title: "วิกฤติวัยเบญจเพส", desc: "ความสับสนในช่วงอายุ 20 ถึงต้น 30 — ทำไมรู้สึกติดอยู่", kw: "วิกฤติวัยเบญจเพส,วัย 20,ทิศทางชีวิต" },
    es: { title: "Crisis de los 30", desc: "La confusión de los 20 y principios de los 30 — por qué te sientes estancado", kw: "crisis de los 30,veintitantos,dirección vital, #VibeCoding,#EmotionalFitness" },
  },
  "midlife-crisis": {
    zh: { title: "中年危机", desc: "中年阶段的心理重构——从焦虑到智慧的转型之路", kw: "中年危机,人生下半场,中年焦虑,转型,生命意义, #VibeCoding,#EmotionalFitness" },
    en: { title: "Midlife Crisis", desc: "Psychological restructuring in midlife — from anxiety to wisdom", kw: "midlife crisis,middle age,midlife transition,mortality, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Krisis Pertengahan Umur", desc: "Restrukturisasi psikologi di usia pertengahan", kw: "krisis pertengahan umur,usia pertengahan, #VibeCoding,#EmotionalFitness" },
    ja: { title: "ミッドライフクライシス", desc: "中年期の心理的再構築 — 不安から知恵への道", kw: "ミッドライフクライシス,中年期,不安" },
    ko: { title: "중년 위기", desc: "중년의 심리적 재구성 — 불안에서 지혜로", kw: "중년 위기,중년,인생 전환" },
    th: { title: "วิกฤติวัยกลางคน", desc: "การปรับโครงสร้างทางจิตใจในวัยกลางคน — จากความกังวลสู่ปัญญา", kw: "วิกฤติวัยกลางคน,วัยกลางคน,การเปลี่ยนแปลง" },
    es: { title: "Crisis de Mediana Edad", desc: "Reestructuración psicológica en la mediana edad — de la ansiedad a la sabiduría", kw: "crisis de mediana edad,mediana edad,transición, #VibeCoding,#EmotionalFitness" },
  },
  "cultural-identity": {
    zh: { title: "文化认同", desc: "在多元文化中寻找自我——文化认同的心理学与跨文化适应", kw: "文化认同,跨文化,身份认同,文化冲突,多元文化, #VibeCoding,#EmotionalFitness" },
    en: { title: "Cultural Identity", desc: "Finding yourself across cultures — the psychology of cultural identity and adaptation", kw: "cultural identity,cross-cultural,acculturation,bicultural, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Identiti Budaya", desc: "Mencari diri merentas budaya — psikologi identiti budaya", kw: "identiti budaya,rentas budaya,adaptasi, #VibeCoding,#EmotionalFitness" },
    ja: { title: "文化的アイデンティティ", desc: "多文化の中で自己を見つける — 文化アイデンティティの心理学", kw: "文化的アイデンティティ,異文化適応,アイデンティティ" },
    ko: { title: "문화 정체성", desc: "다문화 속에서 자아 찾기 — 문화 정체성의 심리학", kw: "문화 정체성,다문화,적응" },
    th: { title: "อัตลักษณ์ทางวัฒนธรรม", desc: "การค้นหาตัวเองข้ามวัฒนธรรม — จิตวิทยาของอัตลักษณ์ทางวัฒนธรรม", kw: "อัตลักษณ์ทางวัฒนธรรม,ข้ามวัฒนธรรม,การปรับตัว" },
    es: { title: "Identidad Cultural", desc: "Encontrarse a través de culturas — la psicología de la identidad cultural", kw: "identidad cultural,intercultural,adaptación, #VibeCoding,#EmotionalFitness" },
  },
  meditation: {
    zh: { title: "冥想", desc: "冥想的科学——从正念观呼吸到觉知生活的完整指南", kw: "冥想,正念,专注力,减压,觉知, #VibeCoding,#EmotionalFitness" },
    en: { title: "Meditation", desc: "The science of meditation — from mindful breathing to awakened living", kw: "meditation,mindfulness,focus,stress reduction, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Meditasi", desc: "Sains meditasi — dari pernafasan sedar ke kehidupan sedar", kw: "meditasi,kesedaran,fokus, #VibeCoding,#EmotionalFitness" },
    ja: { title: "瞑想", desc: "瞑想の科学 — マインドフルネス呼吸から覚醒生活へ", kw: "瞑想,マインドフルネス,集中力" },
    ko: { title: "명상", desc: "명상의 과학 — 마음챙김 호흡에서 깨어있는 삶까지", kw: "명상,마음챙김,집중력" },
    th: { title: "การทำสมาธิ", desc: "วิทยาศาสตร์ของการทำสมาธิ — จากการหายใจอย่างมีสติสู่การใช้ชีวิตอย่างตื่นรู้", kw: "การทำสมาธิ,สติ,การมีสติ" },
    es: { title: "Meditación", desc: "La ciencia de la meditación — desde la respiración consciente hasta la vida despierta", kw: "meditación,atención plena,enfoque, #VibeCoding,#EmotionalFitness" },
  },
  "body-scan": {
    zh: { title: "身体扫描", desc: "身体扫描冥想——从头到脚的深度放松与身心连接实践", kw: "身体扫描,冥想,放松,身心连接,正念, #VibeCoding,#EmotionalFitness" },
    en: { title: "Body Scan", desc: "Body scan meditation — deep relaxation and mind-body connection from head to toe", kw: "body scan,meditation,relaxation,mind-body, mindfulness, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Imbasan Badan", desc: "Meditasi imbasan badan — relaksasi mendalam", kw: "imbasan badan,meditasi,relaksasi, #VibeCoding,#EmotionalFitness" },
    ja: { title: "ボディスキャン", desc: "ボディスキャン瞑想 — 頭からつま先までの深いリラックス", kw: "ボディスキャン,瞑想,リラックス" },
    ko: { title: "바디 스캔", desc: "바디 스캔 명상 — 머리부터 발끝까지 깊은 이완", kw: "바디 스캔,명상,이완" },
    th: { title: "การสแกนร่างกาย", desc: "การทำสมาธิสแกนร่างกาย — ผ่อนคลายลึกจากหัวจรดเท้า", kw: "การสแกนร่างกาย,การทำสมาธิ,การผ่อนคลาย" },
    es: { title: "Escáner Corporal", desc: "Meditación de escáner corporal — relajación profunda de cabeza a pies", kw: "escáner corporal,meditación,relajación, #VibeCoding,#EmotionalFitness" },
  },
  breathwork: {
    zh: { title: "呼吸练习", desc: "呼吸的科学——用呼吸法调节神经系统、缓解焦虑与提升专注", kw: "呼吸练习,呼吸法,腹式呼吸,4-7-8呼吸,减压, #VibeCoding,#EmotionalFitness" },
    en: { title: "Breathwork", desc: "The science of breathing — regulate your nervous system, reduce anxiety, and sharpen focus", kw: "breathwork,breathing exercises,pranayama,4-7-8,box breathing, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Senaman Pernafasan", desc: "Sains pernafasan — kawal sistem saraf, kurangkan kebimbangan", kw: "senaman pernafasan,teknik pernafasan, #VibeCoding,#EmotionalFitness" },
    ja: { title: "ブレスワーク", desc: "呼吸の科学 — 神経系を整え不安を軽減", kw: "ブレスワーク,呼吸法,不安軽減" },
    ko: { title: "호흡 운동", desc: "호흡의 과학 — 신경계 조절, 불안 완화", kw: "호흡 운동,호흡법,불안 완화" },
    th: { title: "การฝึกหายใจ", desc: "วิทยาศาสตร์ของการหายใจ — ควบคุมระบบประสาท ลดความกังวล", kw: "การฝึกหายใจ,เทคนิคการหายใจ,ลดความกังวล" },
    es: { title: "Respiración Consciente", desc: "La ciencia de respirar — regula el sistema nervioso y reduce la ansiedad", kw: "respiración exhalación,ansiedad,enfoque, #VibeCoding,#EmotionalFitness" },
  },
  gratitude: {
    zh: { title: "感恩", desc: "感恩的科学——为什么感恩练习能从根本上改变你的大脑", kw: "感恩,感恩日记,积极心理学,幸福感,心理健康, #VibeCoding,#EmotionalFitness" },
    en: { title: "Gratitude", desc: "The science of gratitude — how gratitude practice rewires your brain for happiness", kw: "gratitude,gratitude journal,positive psychology,wellbeing, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Kesyukuran", desc: "Sains kesyukuran — bagaimana amalan bersyukur ubah otak anda", kw: "kesyukuran,jurnal syukur,psikologi positif, #VibeCoding,#EmotionalFitness" },
    ja: { title: "感謝", desc: "感謝の科学 — 感謝の実践が脳を変える仕組み", kw: "感謝,感謝日記,ポジティブ心理学" },
    ko: { title: "감사", desc: "감사의 과학 — 감사 실천이 뇌를 바꾸는 방법", kw: "감사,감사 일기,긍정 심리학" },
    th: { title: "ความกตัญญู", desc: "วิทยาศาสตร์ของความกตัญญู — การฝึกขอบคุณเปลี่ยนแปลงสมอง", kw: "ความกตัญญู,บันทึกความกตัญญู,จิตวิทยาเชิงบวก" },
    es: { title: "Gratitud", desc: "La ciencia de la gratitud — cómo la práctica de agradecer cambia tu cerebro", kw: "gratitud,diario de gratitud,psicología positiva, #VibeCoding,#EmotionalFitness" },
  },
  journaling: {
    zh: { title: "日记写作", desc: "写日记的心理疗愈力量——从情绪宣泄到自我洞察的写作指南", kw: "日记写作,情绪写作,心理疗愈,自我探索,反思, #VibeCoding,#EmotionalFitness" },
    en: { title: "Journaling", desc: "The therapeutic power of writing — from emotional release to self-discovery", kw: "journaling,expressive writing,therapeutic writing,self-reflection, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Menulis Jurnal", desc: "Kuasa terapeutik menulis — dari pelepasan emosi ke penemuan diri", kw: "menulis jurnal,penulisan ekspresif,refleksi diri, #VibeCoding,#EmotionalFitness" },
    ja: { title: "ジャーナリング", desc: "書くことの心理的癒しの力 — 感情解放から自己洞察へ", kw: "ジャーナリング,表現的筆記,心理療法" },
    ko: { title: "저널링", desc: "글쓰기의 심리 치유력 — 감정 해소에서 자기 통찰까지", kw: "저널링,표현적 글쓰기,심리 치유" },
    th: { title: "การเขียนบันทึก", desc: "พลังการรักษาของการเขียน — จากการปลดปล่อยอารมณ์สู่การค้นพบตนเอง", kw: "การเขียนบันทึก,การเขียนบำบัด,การสะท้อนตนเอง" },
    es: { title: "Escritura Terapéutica", desc: "El poder terapéutico de escribir — de la liberación emocional al autodescubrimiento", kw: "escritura terapéutica,diario,autodescubrimiento, #VibeCoding,#EmotionalFitness" },
  },
  "anger-management": {
    zh: { title: "愤怒管理", desc: "理解愤怒背后的信号——如何健康地表达和处理愤怒情绪", kw: "愤怒管理,愤怒,情绪控制,宣泄,冷静, #VibeCoding,#EmotionalFitness" },
    en: { title: "Anger Management", desc: "Understanding the signal behind anger — how to express and process it healthily", kw: "anger management,anger,emotional control,frustration, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Pengurusan Kemarahan", desc: "Memahami isyarat di sebalik kemarahan", kw: "pengurusan kemarahan,emosi, kawalan diri, #VibeCoding,#EmotionalFitness" },
    ja: { title: "アンガーマネジメント", desc: "怒りの背後にあるシグナルを理解する", kw: "アンガーマネジメント,怒り,感情コントロール" },
    ko: { title: "분노 관리", desc: "분노 뒤의 신호 이해하기 — 건강한 표현과 처리", kw: "분노 관리,분노,감정 조절" },
    th: { title: "การจัดการความโกรธ", desc: "เข้าใจสัญญาณเบื้องหลังความโกรธ — การแสดงออกอย่าง healthy", kw: "การจัดการความโกรธ,ความโกรธ,การควบคุมอารมณ์" },
    es: { title: "Manejo de la Ira", desc: "Entendiendo la señal detrás del enojo — cómo expresarlo saludablemente", kw: "manejo de la ira,enojo,control emocional, #VibeCoding,#EmotionalFitness" },
  },
  "emotional-regulation": {
    zh: { title: "情绪调节", desc: "情绪是信使不是敌人——科学调节情绪的完整工具箱", kw: "情绪调节,情绪管理,情绪智力,情商,心理健康, #VibeCoding,#EmotionalFitness" },
    en: { title: "Emotional Regulation", desc: "Emotions are messengers, not enemies — a complete toolkit for regulating your feelings", kw: "emotional regulation,emotion management,EQ,mental health, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Regulasi Emosi", desc: "Emosi adalah utusan, bukan musuh — toolkit kawal emosi", kw: "regulasi emosi,pengurusan emosi,kesihatan mental, #VibeCoding,#EmotionalFitness" },
    ja: { title: "感情調節", desc: "感情は敵ではなく伝令 — 科学的感情調節ツールキット", kw: "感情調節,感情管理,感情的知性" },
    ko: { title: "감정 조절", desc: "감정은 적이 아닌 전령 — 과학적 감정 조절 도구", kw: "감정 조절,감정 관리,정서 지능" },
    th: { title: "การควบคุมอารมณ์", desc: "อารมณ์คือผู้ส่งสาร ไม่ใช่ศัตรู — ชุดเครื่องมือควบคุมอารมณ์", kw: "การควบคุมอารมณ์,การจัดการอารมณ์,สุขภาพจิต" },
    es: { title: "Regulación Emocional", desc: "Las emociones son mensajeras, no enemigas — herramientas para regularlas", kw: "regulación emocional,gestión emocional,salud mental, #VibeCoding,#EmotionalFitness" },
  },
  "mood-tracking": {
    zh: { title: "情绪追踪", desc: "用数据了解你的情绪模式——情绪追踪的科学方法与工具", kw: "情绪追踪,心情记录,情绪数据,自我觉察,模式识别, #VibeCoding,#EmotionalFitness" },
    en: { title: "Mood Tracking", desc: "Understanding your emotional patterns through data — science-backed mood tracking", kw: "mood tracking,emotion logging,self-awareness,patterns, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Penjejakan Mood", desc: "Fahami corak emosi melalui data — penjejakan mood saintifik", kw: "penjejakan mood,log emosi,kesedaran diri, #VibeCoding,#EmotionalFitness" },
    ja: { title: "ムードトラッキング", desc: "データで感情パターンを理解する — 科学的ムード記録", kw: "ムードトラッキング,気分記録,自己認識" },
    ko: { title: "무드 트래킹", desc: "데이터로 감정 패턴 이해하기 — 과학적 무드 트래킹", kw: "무드 트래킹,감정 기록,자기 인식" },
    th: { title: "การติดตามอารมณ์", desc: "เข้าใจรูปแบบอารมณ์ผ่านข้อมูล — การติดตามอารมณ์ทางวิทยาศาสตร์", kw: "การติดตามอารมณ์,การบันทึกอารมณ์,การตระหนักรู้ตนเอง" },
    es: { title: "Seguimiento del Estado de Ánimo", desc: "Comprendiendo patrones emocionales con datos — seguimiento científico", kw: "seguimiento del estado de ánimo,autoconciencia, #VibeCoding,#EmotionalFitness" },
  },
  burnout: {
    zh: { title: "职业倦怠", desc: "不是累了是倦了——识别、预防和走出职业倦怠的完整指南", kw: "职业倦怠,过劳,工作压力,精疲力竭,恢复, #VibeCoding,#EmotionalFitness" },
    en: { title: "Burnout", desc: "Not just tired — depleted. A complete guide to recognizing, preventing, and recovering from burnout", kw: "burnout,exhaustion,work stress,depletion,recovery, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Burnout", desc: "Bukan sekadar letih — lesu. Panduan kenali, cegah dan pulih", kw: "burnout,keletihan,tekanan kerja, #VibeCoding,#EmotionalFitness" },
    ja: { title: "バーンアウト", desc: "疲れただけじゃない — 燃え尽き症候群の認識と回復", kw: "バーンアウト,過労,仕事のストレス" },
    ko: { title: "번아웃", desc: "피곤한 게 아니라 지친 것 — 번아웃 인식, 예방, 회복", kw: "번아웃,소진,직무 스트레스" },
    th: { title: "ภาวะหมดไฟ", desc: "ไม่ใช่แค่เหนื่อย — หมดพลัง คู่มือรู้จัก ป้องกัน ฟื้นฟู", kw: "ภาวะหมดไฟ,ความเหนื่อยล้า,ความเครียดจากการทำงาน" },
    es: { title: "Agotamiento Laboral", desc: "No solo cansado — agotado. Guía para reconocer, prevenir y recuperarse", kw: "agotamiento laboral,estrés laboral,recuperación, #VibeCoding,#EmotionalFitness" },
  },
  resilience: {
    zh: { title: "心理韧性", desc: "心理韧性的科学——如何在逆境中成长、在压力下茁壮", kw: "心理韧性,抗逆力,逆境成长,心理弹性,坚强, #VibeCoding,#EmotionalFitness" },
    en: { title: "Resilience", desc: "The science of psychological resilience — how to grow through adversity and thrive under pressure", kw: "resilience,mental toughness,adversity,grit,post-traumatic growth, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Ketahanan Mental", desc: "Sains ketahanan mental — tumbuh melalui cabaran", kw: "ketahanan mental,adversiti,pertumbuhan, #VibeCoding,#EmotionalFitness" },
    ja: { title: "レジリエンス", desc: "心理的レジリエンスの科学 — 逆境の中で成長する", kw: "レジリエンス,精神的回復力,逆境成長" },
    ko: { title: "회복탄력성", desc: "심리적 회복탄력성의 과학 — 역경 속에서 성장", kw: "회복탄력성,멘탈 강인함,역경 극복" },
    th: { title: "ความยืดหยุ่นทางจิตใจ", desc: "วิทยาศาสตร์ของความยืดหยุ่นทางจิตใจ — เติบโตผ่านความทุกข์", kw: "ความยืดหยุ่นทางจิตใจ,การเติบโตผ่านความทุกข์" },
    es: { title: "Resiliencia", desc: "La ciencia de la resiliencia psicológica — crecer a través de la adversidad", kw: "resiliencia,fortaleza mental,crecimiento, #VibeCoding,#EmotionalFitness" },
  },
  anxiety_depression: {
    zh: { title: "焦虑与抑郁", desc: "焦虑和抑郁常常共生——理解两者的联系、区别和协同应对策略", kw: "焦虑,抑郁,共病,情绪障碍,心理健康, #VibeCoding,#EmotionalFitness" },
    en: { title: "Anxiety & Depression", desc: "Anxiety and depression often co-occur — understand their connection, differences, and integrated coping strategies", kw: "anxiety,depression,comorbidity,mood disorders,mental health, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Kebimbangan & Kemurungan", desc: "Kebimbangan dan kemurungan sering berlaku bersama — fahami hubungan dan strategi mengatasi", kw: "kebimbangan,kemurungan,kesihatan mental, #VibeCoding,#EmotionalFitness" },
    ja: { title: "不安とうつ", desc: "不安とうつはしばしば共存する——その関連性と統合的対処法を理解する", kw: "不安,うつ,併存,メンタルヘルス" },
    ko: { title: "불안과 우울", desc: "불안과 우울은 자주 함께 나타납니다 — 연결고리와 통합 대처 전략 이해하기", kw: "불안,우울,공존,정신 건강" },
    th: { title: "ความวิตกกังวลและภาวะซึมเศร้า", desc: "ความวิตกกังวลและภาวะซึมเศร้ามักเกิดขึ้นร่วมกัน — ทำความเข้าใจความเชื่อมโยงและวิธีรับมือ", kw: "ความวิตกกังวล,ภาวะซึมเศร้า,สุขภาพจิต" },
    es: { title: "Ansiedad y Depresión", desc: "La ansiedad y la depresión a menudo coexisten — comprende su conexión y estrategias integradas de afrontamiento", kw: "ansiedad,depresión,salud mental, #VibeCoding,#EmotionalFitness" },
  },
  stress_management: {
    zh: { title: "压力管理", desc: "基于生物-心理-社会模型的科学压力管理——从神经科学到日常实践", kw: "压力管理,皮质醇,压力应对,放松技巧,心理健康, #VibeCoding,#EmotionalFitness" },
    en: { title: "Stress Management", desc: "Science-based stress management through the biopsychosocial model — from neuroscience to daily practice", kw: "stress management,cortisol,coping,relaxation,mental health, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Pengurusan Stres", desc: "Pengurusan stres berasaskan sains — daripada neurosains kepada amalan harian", kw: "pengurusan stres,kortisol,relaksasi, #VibeCoding,#EmotionalFitness" },
    ja: { title: "ストレス管理", desc: "生物心理社会モデルに基づく科学的ストレス管理——神経科学から日常実践まで", kw: "ストレス管理,コルチゾール,リラクゼーション" },
    ko: { title: "스트레스 관리", desc: "생물심리사회 모델 기반 과학적 스트레스 관리 — 신경과학부터 일상 실천까지", kw: "스트레스 관리,코르티솔,이완 기법" },
    th: { title: "การจัดการความเครียด", desc: "การจัดการความเครียดด้วยวิทยาศาสตร์ — จากประสาทวิทยาศาสตร์สู่การปฏิบัติประจำวัน", kw: "การจัดการความเครียด,คอร์ติซอล,การผ่อนคลาย" },
    es: { title: "Manejo del Estrés", desc: "Manejo del estrés basado en ciencia — desde la neurociencia hasta la práctica diaria", kw: "manejo del estrés,cortisol,relajación, #VibeCoding,#EmotionalFitness" },
  },
  circadian_rhythm_deep: {
    zh: { title: "昼夜节律深度", desc: "你的内在时钟如何掌控一切——从基因表达到情绪波动的昼夜节律科学", kw: "昼夜节律,生物钟,睡眠周期,褪黑素,健康, #VibeCoding,#EmotionalFitness" },
    en: { title: "Circadian Rhythm Deep Dive", desc: "How your internal clock governs everything — from gene expression to mood swings, the full science of circadian rhythms", kw: "circadian rhythm,biological clock,sleep cycle,melatonin,health, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Irama Sirkadian Mendalam", desc: "Bagaimana jam dalaman anda mengawal segalanya — daripada ekspresi gen hingga perubahan mood", kw: "irama sirkadian,biologi tidur,melatonin, #VibeCoding,#EmotionalFitness" },
    ja: { title: "サーカディアンリズム深掘り", desc: "体内時計がすべてを支配する——遺伝子発現から気分変動までの科学", kw: "サーカディアンリズム,体内時計,メラトニン" },
    ko: { title: "서카디안 리듬 심층", desc: "당신의 내부 시계가 모든 것을 지배한다 — 유전자 발현부터 기분 변화까지", kw: "서카디안 리듬,생체 시계,멜라토닌" },
    th: { title: "จังหวะเซอร์คาเดียนเชิงลึก", desc: "นาฬิกาภายในของคุณควบคุมทุกอย่าง — จากยีนสู่ความผันผวนทางอารมณ์", kw: "จังหวะเซอร์คาเดียน,นาฬิกาชีวภาพ,เมลาโทนิน" },
    es: { title: "Ritmo Circadiano en Profundidad", desc: "Cómo tu reloj interno lo gobierna todo — de la expresión génica a los cambios de humor", kw: "ritmo circadiano,reloj biológico,melatonina, #VibeCoding,#EmotionalFitness" },
  },
  polyvagal_emotion: {
    zh: { title: "多迷走神经情绪调节", desc: "用多迷走神经理论理解你的神经系统——从生存模式到社会连接的神经通路", kw: "多迷走神经理论,情绪调节,神经系统,迷走神经,安全感, #VibeCoding,#EmotionalFitness" },
    en: { title: "Polyvagal Emotion Regulation", desc: "Understand your nervous system through polyvagal theory — neural pathways from survival mode to social connection", kw: "polyvagal theory,emotion regulation,nervous system,vagus nerve,safety, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Peraturan Emosi Polivagal", desc: "Fahami sistem saraf anda melalui teori polivagal — dari mod survival ke hubungan sosial", kw: "teori polivagal,peraturan emosi,saraf vagus, #VibeCoding,#EmotionalFitness" },
    ja: { title: "ポリヴェーガル感情調節", desc: "ポリヴェーガル理論で神経系を理解する——生存モードから社会的つながりへの神経経路", kw: "ポリヴェーガル理論,感情調節,迷走神経" },
    ko: { title: "폴리베이걸 감정 조절", desc: "폴리베이걸 이론으로 신경계 이해하기 — 생존 모드에서 사회적 연결까지", kw: "폴리베이걸 이론,감정 조절,미주 신경" },
    th: { title: "การควบคุมอารมณ์แบบพอลีเวเกิล", desc: "ทำความเข้าใจระบบประสาทผ่านทฤษฎีพอลีเวเกิล — จากโหมดเอาชีวิตรอดสู่การเชื่อมต่อทางสังคม", kw: "ทฤษฎีพอลีเวเกิล,การควบคุมอารมณ์,เส้นประสาทเวกัส" },
    es: { title: "Regulación Emocional Polivagal", desc: "Comprende tu sistema nervioso a través de la teoría polivagal — de la supervivencia a la conexión social", kw: "teoría polivagal,regulación emocional,nervio vago, #VibeCoding,#EmotionalFitness" },
  },
  neural_meditation: {
    zh: { title: "冥想的神经机制", desc: "冥想时你的大脑在发生什么——从默认模式网络到神经可塑性的完整科学解析", kw: "冥想,神经可塑性,默认模式网络,脑电波,正念, #VibeCoding,#EmotionalFitness" },
    en: { title: "Neural Mechanisms of Meditation", desc: "What happens in your brain during meditation — from the default mode network to neuroplasticity, the full science", kw: "meditation,neuroplasticity,default mode network,brain waves,mindfulness, #VibeCoding,#EmotionalFitness" },
    ms: { title: "Mekanisme Neural Meditasi", desc: "Apa yang berlaku dalam otak semasa meditasi — dari rangkaian mod lalai kepada neuroplastisitas", kw: "meditasi,neuroplastisitas,kesedaran, #VibeCoding,#EmotionalFitness" },
    ja: { title: "瞑想の神経メカニズム", desc: "瞑想中に脳で何が起きているか——デフォルトモードネットワークから神経可塑性まで", kw: "瞑想,神経可塑性,デフォルトモードネットワーク" },
    ko: { title: "명상의 신경 메커니즘", desc: "명상 중 뇌에서 무슨 일이 일어날까 — 기본 모드 네트워크부터 신경가소성까지", kw: "명상,신경가소성,기본 모드 네트워크" },
    th: { title: "กลไกทางประสาทของการทำสมาธิ", desc: "เกิดอะไรขึ้นในสมองระหว่างทำสมาธิ — จากเครือข่ายดีฟอลต์โหมดถึงความยืดหยุ่นของสมอง", kw: "การทำสมาธิ,ความยืดหยุ่นของสมอง,คลื่นสมอง" },
    es: { title: "Mecanismos Neurales de la Meditación", desc: "Qué sucede en tu cerebro durante la meditación — de la red de modo predeterminado a la neuroplasticidad", kw: "meditación,neuroplasticidad,red de modo predeterminado, #VibeCoding,#EmotionalFitness" },
  },
};

export function getTopics(lang: Locale): Topic[] {
  return Object.entries(topicMeta).map(([slug, entry]) => {
    const data = entry[lang] || entry.en
    return {
      slug,
      category: getCategoryBySlug(slug),
      title: data.title,
      description: data.desc,
      keywords: data.kw,
      references: TOPIC_REFERENCES[slug],
    }
  })
}

export function getTopicBySlug(slug: string, lang: Locale): Topic | undefined {
  const entry = topicMeta[slug]
  if (!entry) return undefined
  const data = entry[lang] || entry.en
  return {
    slug,
    category: getCategoryBySlug(slug),
    title: data.title,
    description: data.desc,
    keywords: data.kw,
    references: TOPIC_REFERENCES[slug],
  }
}

export function getAllSlugs(): string[] {
  return Object.keys(topicMeta)
}

export function getTopicsByCategory(category: string, lang: Locale): Topic[] {
  return getTopics(lang).filter(t => t.category === category)
}

export function getCategoryBySlug(slug: string): string {
  for (const [cat, slugs] of Object.entries(CATEGORY_MAP)) {
    if (slugs.includes(slug)) return cat
  }
  return "mindfulness"
}

const CATEGORY_MAP: Record<string, string[]> = {
  sleep: ["insomnia","deep-sleep","sleep-anxiety","nightmare","circadian-rhythm","sleep-hygiene","rem-sleep","napping","circadian_rhythm_deep"],
  anxiety: ["stress-relief","panic-attack","social-anxiety","generalized-anxiety","health-anxiety","work-stress","exam-nerves","anxiety_depression","stress_management"],
  grief_loss: ["loss","bereavement","pet-loss","divorce","long-distance"],
  loneliness: ["solitude","isolation","friendship","social-skills","belonging"],
  self_worth: ["self-esteem","impostor-syndrome","perfectionism","body-image","comparison","self-compassion"],
  relationships: ["break-up","communication","trust","co-dependency","boundaries","parenting","family-conflict"],
  identity: ["purpose","career-change","quarter-life-crisis","midlife-crisis","cultural-identity"],
  mindfulness: ["meditation","body-scan","breathwork","gratitude","journaling","neural_meditation"],
  emotional_health: ["anger-management","emotional-regulation","mood-tracking","burnout","resilience","polyvagal_emotion"],
}

const TOPIC_REFERENCES: Record<string, string[]> = {
  insomnia: [
    "https://pubmed.ncbi.nlm.nih.gov/27998379/",
    "https://pubmed.ncbi.nlm.nih.gov/26634877/",
    "https://www.who.int/news-room/fact-sheets/detail/insomnia",
    "https://www.nhs.uk/conditions/insomnia/",
  ],
  "deep-sleep": [
    "https://pubmed.ncbi.nlm.nih.gov/30068571/",
    "https://pubmed.ncbi.nlm.nih.gov/30920354/",
    "https://pubmed.ncbi.nlm.nih.gov/30459274/",
  ],
  "sleep-anxiety": [
    "https://pubmed.ncbi.nlm.nih.gov/29779202/",
    "https://pubmed.ncbi.nlm.nih.gov/31429450/",
  ],
  "stress-relief": [
    "https://pubmed.ncbi.nlm.nih.gov/30152128/",
    "https://pubmed.ncbi.nlm.nih.gov/24395196/",
    "https://www.who.int/news-room/fact-sheets/detail/stress",
  ],
  "panic-attack": [
    "https://pubmed.ncbi.nlm.nih.gov/26050166/",
    "https://pubmed.ncbi.nlm.nih.gov/28898969/",
    "https://www.nhs.uk/mental-health/conditions/panic-disorder/",
  ],
  "generalized-anxiety": [
    "https://pubmed.ncbi.nlm.nih.gov/29022528/",
    "https://pubmed.ncbi.nlm.nih.gov/26148343/",
    "https://www.nimh.nih.gov/health/topics/anxiety-disorders",
  ],
  meditation: [
    "https://pubmed.ncbi.nlm.nih.gov/24395196/",
    "https://pubmed.ncbi.nlm.nih.gov/26159107/",
    "https://pubmed.ncbi.nlm.nih.gov/27553073/",
  ],
}

export function getTopicContent(slug: string, lang: Locale): TopicContent {
  const topic = getTopicBySlug(slug, lang)
  const t = topic || { slug, title: slug, description: "" }
  const c = CONTENT_GENERATORS[slug]
  if (c) return c(lang, t)
  const category = getCategoryBySlug(slug)
  return generateDefaultContent(lang, t, category)
}

type ContentGen = (lang: Locale, topic: { title: string; description: string }) => TopicContent

const CONTENT_GENERATORS: Record<string, ContentGen> = {}

export function registerContentGenerator(slug: string, fn: ContentGen) {
  CONTENT_GENERATORS[slug] = fn
}

// Initialize custom content generators after the module is fully initialized
// (avoids circular dependency — initCustomContent receives registerContentGenerator as a callback)
initCustomContent(registerContentGenerator)