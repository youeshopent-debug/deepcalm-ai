import type { Locale } from '@/types'
import { generateDefaultContent } from './topic-content-templates'
import { initCustomContent } from './custom-content'

export interface LocaleEntry {
  title: string
  desc: string
  kw: string
  hook: string
}

export interface Topic {
  slug: string
  category: string
  title: string
  description: string
  keywords: string
  hook?: string
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

const topicMeta: Record<string, { zh: LocaleEntry; en: LocaleEntry; ms: LocaleEntry; ja: LocaleEntry; ko: LocaleEntry; th: LocaleEntry; es: LocaleEntry }> = {
  insomnia: {
    zh: { title: "失眠", desc: "科学认识失眠的原因与机制，掌握基于CBT-I的有效改善方法", kw: "失眠,失眠原因,失眠怎么办,CBT-I,睡眠障碍,入睡困难, #VibeCoding,#EmotionalFitness", hook: "3分钟找回消失的困意" },
    en: { title: "Insomnia", desc: "Understand the science behind insomnia and master evidence-based CBT-I methods", kw: "insomnia,sleep disorder,CBT-I,sleep problem,insomnia treatment, #VibeCoding,#EmotionalFitness", hook: "Find your lost sleep in 3 minutes" },
    ms: { title: "Insomnia", desc: "Fahami sains di sebalik insomnia dan kuasai kaedah CBT-I", kw: "insomnia,gangguan tidur,CBT-I,masalah tidur, #VibeCoding,#EmotionalFitness", hook: "Cari semula tidur anda dalam 3 minit" },
    ja: { title: "不眠症", desc: "不眠症の原因とメカニズムを科学的に理解し、CBT-Iに基づく効果的な改善法を習得", kw: "不眠症,睡眠障害,CBT-I,入眠困難,不眠治療", hook: "3分で眠気を取り戻す" },
    ko: { title: "불면증", desc: "불면증의 원인과 메커니즘을 과학적으로 이해하고 CBT-I 기반 효과적 개선법 습득", kw: "불면증,수면장애,CBT-I,입면困难,불면치료", hook: "3분 만에 사라진 졸음을 되찾는 법" },
    th: { title: "นอนไม่หลับ", desc: "เข้าใจสาเหตุและกลไกของอาการนอนไม่หลับ พร้อมวิธีปรับปรุงที่มีหลักฐานทางวิทยาศาสตร์", kw: "นอนไม่หลับ,โรคนอนไม่หลับ,CBT-I,ปัญหาการนอน", hook: "ค้นหาการนอนหลับที่หายไปใน 3 นาที" },
    es: { title: "Insomnio", desc: "Comprende la ciencia del insomnio y domina los métodos basados en TCC-I", kw: "insomnio,trastorno del sueño,TCC-I,problemas de sueño, #VibeCoding,#EmotionalFitness", hook: "Recupera tu sueño perdido en 3 minutos" },
  },
  "deep-sleep": {
    zh: { title: "深度睡眠", desc: "深度睡眠对身体修复和免疫系统的重要性及提升方法", kw: "深度睡眠,慢波睡眠,身体修复,免疫系统,睡眠质量, #VibeCoding,#EmotionalFitness", hook: "一键潜入深睡海" },
    en: { title: "Deep Sleep", desc: "The critical role of deep sleep in physical restoration and immune function", kw: "deep sleep,slow wave sleep,physical restoration,immune system,sleep quality, #VibeCoding,#EmotionalFitness", hook: "Dive into the deep sea of sleep" },
    ms: { title: "Tidur Nyenyak", desc: "Peranan penting tidur nyenyak dalam pemulihan fizikal dan fungsi imun", kw: "tidur nyenyak,slow wave sleep,pemulihan fizikal,sistem imun, #VibeCoding,#EmotionalFitness", hook: "Selami laut dalam tidur" },
    ja: { title: "深い眠り", desc: "身体の回復と免疫機能における深い眠りの重要な役割", kw: "深い眠り,徐波睡眠,身体回復,免疫機能", hook: "深い眠りの海へダイブ" },
    ko: { title: "깊은 수면", desc: "신체 회복과 면역 기능에서 깊은 수면의 중요성", kw: "깊은 수면,서파 수면,신체 회복,면역 체계", hook: "깊은 수면의 바다로 잠입" },
    th: { title: "การนอนหลับลึก", desc: "บทบาทสำคัญของการนอนหลับลึกต่อการฟื้นฟูร่างกายและระบบภูมิคุ้มกัน", kw: "การนอนหลับลึก,slow wave sleep,ฟื้นฟูร่างกาย,ภูมิคุ้มกัน", hook: "ดำดิ่งสู่ทะเลแห่งการนอนหลับลึก" },
    es: { title: "Sueño Profundo", desc: "El papel fundamental del sueño profundo en la restauración física y la función inmunitaria", kw: "sueño profundo,ondas lentas,restauración física,sistema inmune, #VibeCoding,#EmotionalFitness", hook: "Sumérgete en el mar del sueño profundo" },
  },
  "sleep-anxiety": {
    zh: { title: "睡眠焦虑", desc: "为什么越担心睡不着就越睡不着？打破失眠-焦虑的恶性循环", kw: "睡眠焦虑,睡前焦虑,失眠焦虑,恶性循环,放松技巧, #VibeCoding,#EmotionalFitness", hook: "让夜晚不再是一场战斗" },
    en: { title: "Sleep Anxiety", desc: "Why worrying about sleep makes insomnia worse — break the anxiety-insomnia cycle", kw: "sleep anxiety,bedtime anxiety,insomnia cycle,relaxation techniques, #VibeCoding,#EmotionalFitness", hook: "Make night no longer a battle" },
    ms: { title: "Kebimbangan Tidur", desc: "Kenapa risau tentang tidur memburukkan insomnia — putuskan kitaran kebimbangan", kw: "kebimbangan tidur,insomnia,kitaran kebimbangan, #VibeCoding,#EmotionalFitness", hook: "Jadikan malam bukan lagi perjuangan" },
    ja: { title: "睡眠不安", desc: "眠れないことを心配すると不眠が悪化する理由 — 不安と不眠の悪循環を断つ", kw: "睡眠不安,寝る前の不安,不眠の悪循環", hook: "夜を戦いにしない" },
    ko: { title: "수면 불안", desc: "잠에 대한 걱정이 불면증을 악화시키는 이유 — 불안-불면 악순환 차단", kw: "수면 불안,취침 불안,불면증 악순환", hook: "밤을 더 이상 전투로 만들지 마세요" },
    th: { title: "ความกังวลเรื่องการนอน", desc: "ทำไมการกังวลเรื่องการนอนยิ่งทำให้นอนไม่หลับ — แตกวงจรความกังวล", kw: "ความกังวลเรื่องนอน,กังวลก่อนนอน,วงจรนอนไม่หลับ", hook: "ทำให้กลางคืนไม่ใช่การต่อสู้อีกต่อไป" },
    es: { title: "Ansiedad por Dormir", desc: "Por qué preocuparse por dormir empeora el insomnio — rompe el ciclo", kw: "ansiedad por dormir,ansiedad nocturna,insomnio, #VibeCoding,#EmotionalFitness", hook: "Haz que la noche deje de ser una batalla" },
  },
  nightmare: {
    zh: { title: "噩梦", desc: "噩梦的神经科学机制与减少噩梦的实用方法", kw: "噩梦,梦境,REM睡眠,噩梦治疗,意象排练疗法, #VibeCoding,#EmotionalFitness", hook: "终结噩梦的重复播放" },
    en: { title: "Nightmare", desc: "The neuroscience of nightmares and evidence-based techniques to reduce them", kw: "nightmare,dreams,REM sleep,nightmare treatment,IRT, #VibeCoding,#EmotionalFitness", hook: "Stop replaying the nightmare" },
    ms: { title: "Mimpi Ngeri", desc: "Neurosains mimpi ngeri dan teknik mengurangkan mimpi ngeri", kw: "mimpi ngeri,mimpi,tidur REM,rawatan mimpi ngeri, #VibeCoding,#EmotionalFitness", hook: "Hentikan ulangan mimpi ngeri" },
    ja: { title: "悪夢", desc: "悪夢の神経科学メカニズムと軽減のための実用的方法", kw: "悪夢,夢,REM睡眠,悪夢治療,イメージ反復療法", hook: "悪夢の繰り返しを終わらせる" },
    ko: { title: "악몽", desc: "악몽의 신경과학 메커니즘과 악몽 감소를 위한 실용적 방법", kw: "악몽,꿈,REM 수면,악몽 치료", hook: "악몽의 반복 재생을 끝내다" },
    th: { title: "ฝันร้าย", desc: "กลไกทางประสาทวิทยาของฝันร้ายและวิธีลดฝันร้าย", kw: "ฝันร้าย,ความฝัน,REM,การรักษาฝันร้าย", hook: "หยุดการเล่นซ้ำของฝันร้าย" },
    es: { title: "Pesadillas", desc: "La neurociencia de las pesadillas y técnicas para reducirlas", kw: "pesadillas,sueños,sueño REM,tratamiento de pesadillas, #VibeCoding,#EmotionalFitness", hook: "Deja de repetir la pesadilla" },
  },
  "circadian-rhythm": {
    zh: { title: "昼夜节律", desc: "了解你体内的生物钟如何影响睡眠、情绪和健康的方方面面", kw: "昼夜节律,生物钟,睡眠周期,褪黑素,健康, #VibeCoding,#EmotionalFitness", hook: "校准你体内的生物钟" },
    en: { title: "Circadian Rhythm", desc: "How your internal biological clock influences sleep, mood, and every aspect of health", kw: "circadian rhythm,biological clock,sleep cycle,melatonin,health, #VibeCoding,#EmotionalFitness", hook: "Reset your internal clock" },
    ms: { title: "Irama Sirkadian", desc: "Bagaimana jam biologi dalaman mempengaruhi tidur, mood dan kesihatan", kw: "irama sirkadian,biologi tidur,melatonin,kesihatan, #VibeCoding,#EmotionalFitness", hook: "Tetapkan semula jam dalaman anda" },
    ja: { title: "サーカディアンリズム", desc: "体内時計が睡眠、気分、健康のあらゆる側面に与える影響", kw: "サーカディアンリズム,体内時計,睡眠周期,メラトニン", hook: "体内時計をリセットする" },
    ko: { title: "서카디안 리듬", desc: "당신의 생체 시계가 수면, 기분, 건강의 모든 측면에 미치는 영향", kw: "서카디안 리듬,생체 시계,수면 주기,멜라토닌", hook: "당신의 생체 시계를 재설정하세요" },
    th: { title: "จังหวะเซอร์คาเดียน", desc: "นาฬิกาชีวภาพภายในของคุณส่งผลต่อการนอน อารมณ์ และสุขภาพ", kw: "จังหวะเซอร์คาเดียน,นาฬิกาชีวภาพ,วงจรการนอน,เมลาโทนิน", hook: "รีเซ็ตนาฬิกาภายในของคุณ" },
    es: { title: "Ritmo Circadiano", desc: "Cómo tu reloj biológico interno influye en el sueño, el estado de ánimo y la salud", kw: "ritmo circadiano,reloj biológico,ciclo del sueño,melatonina, #VibeCoding,#EmotionalFitness", hook: "Reinicia tu reloj interno" },
  },
  "sleep-hygiene": {
    zh: { title: "睡眠卫生", desc: "改善睡眠环境的科学指南——从光线到温度，从习惯到心态", kw: "睡眠卫生,睡眠环境,睡眠习惯,改善睡眠,睡眠质量, #VibeCoding,#EmotionalFitness", hook: "睡前做对这3件事" },
    en: { title: "Sleep Hygiene", desc: "A science-backed guide to optimizing your sleep environment — from light to temperature, habits to mindset", kw: "sleep hygiene,sleep environment,sleep habits,improve sleep,sleep quality, #VibeCoding,#EmotionalFitness", hook: "3 things to do before bed" },
    ms: { title: "Kebersihan Tidur", desc: "Panduan saintifik mengoptimumkan persekitaran tidur — dari cahaya ke suhu", kw: "kebersihan tidur,persekitaran tidur,tabiat tidur, #VibeCoding,#EmotionalFitness", hook: "3 perkara sebelum tidur" },
    ja: { title: "睡眠衛生", desc: "睡眠環境を最適化する科学ガイド — 光から温度、習慣から心構えまで", kw: "睡眠衛生,睡眠環境,睡眠習慣,睡眠改善", hook: "寝る前の3つの習慣" },
    ko: { title: "수면 위생", desc: "수면 환경 최적화를 위한 과학 가이드 — 빛부터 온도, 습관부터 마음가짐까지", kw: "수면 위생,수면 환경,수면 습관,수면 개선", hook: "잠들기 전 이 3가지" },
    th: { title: "สุขอนามัยการนอน", desc: "คู่มือวิทยาศาสตร์การปรับปรุงสภาพแวดล้อมการนอน — จากแสงสู่อุณหภูมิ", kw: "สุขอนามัยการนอน,สภาพแวดล้อมการนอน,นิสัยการนอน", hook: "3 สิ่งที่ควรทำก่อนนอน" },
    es: { title: "Higiene del Sueño", desc: "Guía científica para optimizar tu entorno de sueño — de la luz a la temperatura", kw: "higiene del sueño,entorno de sueño,hábitos de sueño, #VibeCoding,#EmotionalFitness", hook: "3 cosas que hacer antes de dormir" },
  },
  "rem-sleep": {
    zh: { title: "REM睡眠", desc: "快速眼动睡眠的神秘世界——梦境、记忆巩固与情绪调节", kw: "REM睡眠,快速眼动,梦境,记忆巩固,情绪调节,睡眠周期, #VibeCoding,#EmotionalFitness", hook: "你的梦境藏着什么秘密" },
    en: { title: "REM Sleep", desc: "The mysterious world of rapid eye movement sleep — dreams, memory consolidation, and emotional regulation", kw: "REM sleep,rapid eye movement,dreams,memory consolidation,emotional regulation,sleep cycle, #VibeCoding,#EmotionalFitness", hook: "What your dreams reveal" },
    ms: { title: "Tidur REM", desc: "Dunia misteri tidur gerakan mata cepat — mimpi, konsolidasi memori", kw: "tidur REM,pergerakan mata cepat,mimpi,konsolidasi memori, #VibeCoding,#EmotionalFitness", hook: "Apa yang diungkapkan mimpi anda" },
    ja: { title: "レム睡眠", desc: "急速眼球運動睡眠の神秘的な世界 — 夢、記憶固化、感情調節", kw: "レム睡眠,急速眼球運動,夢,記憶固化,感情調節", hook: "夢が明かす秘密" },
    ko: { title: "렘 수면", desc: "빠른 안구 운동 수면의 신비로운 세계 — 꿈, 기억 통합, 감정 조절", kw: "렘 수면,급속 안구 운동,꿈,기억 통합,감정 조절", hook: "당신의 꿈이 말해주는 것" },
    th: { title: "การนอนหลับ REM", desc: "โลกลึกลับของการนอนหลับที่มีการเคลื่อนไหวของตาอย่างรวดเร็ว — ความฝัน การจัดเก็บความทรงจำ", kw: "REM,การเคลื่อนไหวของตาอย่างรวดเร็ว,ความฝัน,การจัดเก็บความทรงจำ", hook: "ความฝันของคุณบอกอะไร" },
    es: { title: "Sueño REM", desc: "El misterioso mundo del sueño de movimientos oculares rápidos — sueños, consolidación de memoria", kw: "sueño REM,movimiento ocular rápido,sueños,consolidación de memoria, #VibeCoding,#EmotionalFitness", hook: "Lo que revelan tus sueños" },
  },
  napping: {
    zh: { title: "午睡", desc: "午睡的科学——如何通过短暂的休息恢复精力、提升创造力", kw: "午睡,小睡,能量恢复,创造力,睡眠惯性, #VibeCoding,#EmotionalFitness", hook: "20分钟重置下午状态" },
    en: { title: "Napping", desc: "The science of napping — how brief rests restore energy and boost creativity", kw: "napping,power nap,energy recovery,creativity,sleep inertia, #VibeCoding,#EmotionalFitness", hook: "Reset your afternoon in 20 minutes" },
    ms: { title: "Tidur Sebentar", desc: "Sains tidur sebentar — bagaimana rehat pendek pulihkan tenaga", kw: "tidur sebentar,power nap,pemulihan tenaga,kreativiti, #VibeCoding,#EmotionalFitness", hook: "Set semula petang anda dalam 20 minit" },
    ja: { title: "仮眠", desc: "仮眠の科学 — 短い休息でエネルギーを回復し創造性を高める方法", kw: "仮眠,パワーナップ,エネルギー回復,創造性", hook: "20分で午後をリセット" },
    ko: { title: "낮잠", desc: "낮잠의 과학 — 짧은 휴식으로 에너지 회복과 창의력 향상", kw: "낮잠,파워냅,에너지 회복,창의성", hook: "20분 만에 오후 리셋" },
    th: { title: "การงีบหลับ", desc: "วิทยาศาสตร์ของการงีบ — การพักผ่อนสั้นๆ ฟื้นฟูพลังงาน", kw: "การงีบหลับ,พาวเวอร์แนป,การฟื้นฟูพลังงาน,ความคิดสร้างสรรค์", hook: "รีเซ็ตตอนบ่ายใน 20 นาที" },
    es: { title: "Siestas", desc: "La ciencia de la siesta — cómo los descansos breves restauran la energía", kw: "siesta,power nap,recuperación de energía,creatividad, #VibeCoding,#EmotionalFitness", hook: "Reinicia tu tarde en 20 minutos" },
  },
  "stress-relief": {
    zh: { title: "减压", desc: "基于神经科学的压力释放方法——从呼吸到正念的减压工具箱", kw: "减压,压力管理,放松,正念减压,焦虑缓解, #VibeCoding,#EmotionalFitness", hook: "5分钟释放肩上的重担" },
    en: { title: "Stress Relief", desc: "Neuroscience-based stress release methods — a toolkit from breathing to mindfulness", kw: "stress relief,stress management,relaxation,mindfulness,anxiety relief, #VibeCoding,#EmotionalFitness", hook: "Release the weight in 5 minutes" },
    ms: { title: "Melegakan Tekanan", desc: "Kaedah melegakan tekanan berasaskan neurosains — toolkit dari pernafasan ke kesedaran", kw: "melegakan tekanan,pengurusan tekanan,relaksasi, #VibeCoding,#EmotionalFitness", hook: "Lepaskan beban dalam 5 minit" },
    ja: { title: "ストレス解消", desc: "神経科学に基づくストレス解放法 — 呼吸からマインドフルネスまで", kw: "ストレス解消,ストレス管理,リラクゼーション", hook: "5分で肩の重荷を解放" },
    ko: { title: "스트레스 해소", desc: "신경과학 기반 스트레스 해소법 — 호흡부터 마음챙김까지", kw: "스트레스 해소,스트레스 관리,이완", hook: "5분 만에 어깨의 짐을 내려놓다" },
    th: { title: "การคลายเครียด", desc: "วิธีคลายเครียดด้วยประสาทวิทยาศาสตร์ — จากลมหายใจสู่สติ", kw: "การคลายเครียด,การจัดการความเครียด,การผ่อนคลาย", hook: "ปล่อยภาระใน 5 นาที" },
    es: { title: "Alivio del Estrés", desc: "Métodos basados en neurociencia para liberar estrés — de la respiración a la atención plena", kw: "alivio del estrés,manejo del estrés,relajación, #VibeCoding,#EmotionalFitness", hook: "Libera el peso en 5 minutos" },
  },
  "panic-attack": {
    zh: { title: "惊恐发作", desc: "当恐慌突然袭来——理解惊恐发作的机制并学会如何应对", kw: "惊恐发作,恐慌症,焦虑发作,惊恐障碍,应对策略, #VibeCoding,#EmotionalFitness", hook: "当恐慌来袭时这样做" },
    en: { title: "Panic Attack", desc: "When panic strikes suddenly — understand the mechanisms and learn how to respond", kw: "panic attack,panic disorder,anxiety attack,grounding,coping strategies, #VibeCoding,#EmotionalFitness", hook: "What to do when panic strikes" },
    ms: { title: "Serangan Panik", desc: "Apabila panik menyerang — fahami mekanisme dan belajar cara bertindak balas", kw: "serangan panik,gangguan panik,serangan kecemasan, #VibeCoding,#EmotionalFitness", hook: "Apa yang perlu dilakukan apabila panik melanda" },
    ja: { title: "パニック発作", desc: "突然のパニック — そのメカニズムを理解し対処法を学ぶ", kw: "パニック発作,パニック障害,不安発作,対処法", hook: "パニックが来た時の対処法" },
    ko: { title: "공황 발작", desc: "갑작스러운 공황 — 메커니즘을 이해하고 대처법 배우기", kw: "공황 발작,공황 장애,불안 발작,대처 전략", hook: "공황이 닥쳤을 때 이렇게 하세요" },
    th: { title: "อาการแพนิค", desc: "เมื่อภาวะแพนิคมาเยือน — ทำความเข้าใจกลไกและเรียนรู้วิธีรับมือ", kw: "อาการแพนิค,โรคแพนิค,การโจมตีด้วยความวิตกกังวล", hook: "เมื่อแพนิคมา สิ่งที่ต้องทำ" },
    es: { title: "Ataque de Pánico", desc: "Cuando el pánico ataca — comprende los mecanismos y aprende a responder", kw: "ataque de pánico,trastorno de pánico,ataque de ansiedad, #VibeCoding,#EmotionalFitness", hook: "Qué hacer cuando el pánico ataca" },
  },
  "social-anxiety": {
    zh: { title: "社交焦虑", desc: "为什么在人群中感到不安？理解社交焦虑的根源与克服路径", kw: "社交焦虑,社交恐惧,社交障碍,害羞,人际焦虑, #VibeCoding,#EmotionalFitness", hook: "社交不再是一场考试" },
    en: { title: "Social Anxiety", desc: "Why do you feel uneasy in social situations? Understand the roots and path to overcoming", kw: "social anxiety,social phobia,shyness,social fear,interpersonal anxiety, #VibeCoding,#EmotionalFitness", hook: "Socializing is not a test" },
    ms: { title: "Kebimbangan Sosial", desc: "Kenapa berasa tidak selesa dalam situasi sosial? fahami punca dan cara mengatasi", kw: "kebimbangan sosial,fobia sosial,rasa malu, #VibeCoding,#EmotionalFitness", hook: "Bersosial bukan peperiksaan" },
    ja: { title: "社交不安", desc: "なぜ人の中で不安になるのか？社交不安の根源と克服法", kw: "社交不安,社交恐怖,対人恐怖,恥ずかしさ", hook: "社交は試験ではない" },
    ko: { title: "사회 불안", desc: "왜 사람들 속에서 불안할까? 사회 불안의 근원과 극복 경로", kw: "사회 불안,사회 공포증,수줍음,대인 불안", hook: "사교는 시험이 아닙니다" },
    th: { title: "ความกังวลในการเข้าสังคม", desc: "ทำไมรู้สึกไม่สบายใจในสังคม? เข้าใจรากเหง้าและวิธีเอาชนะ", kw: "ความกังวลในการเข้าสังคม,โรคกลัวสังคม,ความเขินอาย", hook: "การเข้าสังคมไม่ใช่การสอบ" },
    es: { title: "Ansiedad Social", desc: "¿Por qué te sientes incómodo en situaciones sociales? Comprende las raíces y el camino para superarlo", kw: "ansiedad social,fobia social,timidez,miedo social, #VibeCoding,#EmotionalFitness", hook: "Socializar no es un examen" },
  },
  "generalized-anxiety": {
    zh: { title: "广泛性焦虑", desc: "为什么你总是担心——广泛性焦虑的神经机制与认知行为管理", kw: "广泛性焦虑,过度担心,焦虑症,慢性焦虑,GAD, #VibeCoding,#EmotionalFitness", hook: "停止大脑的灾难预演" },
    en: { title: "Generalized Anxiety", desc: "Why you worry all the time — the neuroscience of GAD and CBT-based management", kw: "generalized anxiety,GAD,excessive worry,anxiety disorder,chronic anxiety, #VibeCoding,#EmotionalFitness", hook: "Stop your brain's disaster rehearsal" },
    ms: { title: "Kebimbangan Umum", desc: "Kenapa anda sentiasa risau — neurosains GAD dan pengurusan CBT", kw: "kebimbangan umum,GAD,risau berlebihan,gangguan kecemasan, #VibeCoding,#EmotionalFitness", hook: "Hentikan latihan bencana otak anda" },
    ja: { title: "全般性不安障害", desc: "なぜいつも心配しているのか — GADの神経科学とCBT管理", kw: "全般性不安障害,GAD,過剰な心配,不安障害", hook: "脳の災害リハーサルを止める" },
    ko: { title: "범불안장애", desc: "왜 항상 걱정할까 — GAD의 신경과학과 CBT 기반 관리", kw: "범불안장애,GAD,과도한 걱정,불안 장애", hook: "뇌의 재난 예행연습을 중단하세요" },
    th: { title: "โรควิตกกังวลทั่วไป", desc: "ทำไมคุณกังวลตลอดเวลา — ประสาทวิทยาศาสตร์ของ GAD", kw: "โรควิตกกังวลทั่วไป,GAD,ความกังวลมากเกินไป", hook: "หยุดการซ้อมหายนะในสมอง" },
    es: { title: "Ansiedad Generalizada", desc: "Por qué te preocupas todo el tiempo — la neurociencia del TAG y manejo basado en TCC", kw: "ansiedad generalizada,TAG,preocupación excesiva,trastorno de ansiedad, #VibeCoding,#EmotionalFitness", hook: "Detén el ensayo de desastre de tu cerebro" },
  },
  "health-anxiety": {
    zh: { title: "健康焦虑", desc: "当你过度担心自己的身体——健康焦虑的心理机制与应对方法", kw: "健康焦虑,疑病症,疾病焦虑,身体症状,过度就医, #VibeCoding,#EmotionalFitness", hook: "别让身体信号欺骗你" },
    en: { title: "Health Anxiety", desc: "When you worry excessively about your health — the psychology of health anxiety and how to cope", kw: "health anxiety,hypochondria,illness anxiety disorder,somatic symptoms, #VibeCoding,#EmotionalFitness", hook: "Don't let body signals fool you" },
    ms: { title: "Kebimbangan Kesihatan", desc: "Bila anda risau berlebihan tentang kesihatan — psikologi kebimbangan kesihatan", kw: "kebimbangan kesihatan,hipokondria,gangguan kecemasan penyakit, #VibeCoding,#EmotionalFitness", hook: "Jangan biarkan isyarat tubuh menipu anda" },
    ja: { title: "健康不安", desc: "健康を過度に心配するとき — 健康不安の心理と対処法", kw: "健康不安,心気症,疾病恐怖,身体症状", hook: "身体のサインに騙されない" },
    ko: { title: "건강 불안", desc: "건강에 대해 과도하게 걱정할 때 — 건강 불안의 심리와 대처법", kw: "건강 불안,건강염려증,질병 불안,신체 증상", hook: "신체 신호에 속지 마세요" },
    th: { title: "ความกังวลเรื่องสุขภาพ", desc: "เมื่อคุณกังวลเกี่ยวกับสุขภาพมากเกินไป — จิตวิทยาของความกังวลเรื่องสุขภาพ", kw: "ความกังวลเรื่องสุขภาพ,โรคกลัวป่วย,โรควิตกกังวลเกี่ยวกับโรค", hook: "อย่าให้สัญญาณร่างกายหลอกคุณ" },
    es: { title: "Ansiedad por la Salud", desc: "Cuando te preocupas excesivamente por tu salud — la psicología de la ansiedad por la salud", kw: "ansiedad por la salud,hipocondría,trastorno de ansiedad por enfermedad, #VibeCoding,#EmotionalFitness", hook: "No dejes que las señales del cuerpo te engañen" },
  },
  "work-stress": {
    zh: { title: "工作压力", desc: "职场压力管理——从认知重构到精力管理的实用策略", kw: "工作压力,职场压力,职业倦怠,工作与生活平衡,压力管理, #VibeCoding,#EmotionalFitness", hook: "下班后把工作留在门外" },
    en: { title: "Work Stress", desc: "Managing workplace pressure — practical strategies from cognitive restructuring to energy management", kw: "work stress,workplace pressure,burnout,work-life balance,stress management, #VibeCoding,#EmotionalFitness", hook: "Leave work at the door" },
    ms: { title: "Tekanan Kerja", desc: "Mengurus tekanan tempat kerja — strategi praktikal dari restrukturisasi kognitif", kw: "tekanan kerja,tekanan tempat kerja, burnout, #VibeCoding,#EmotionalFitness", hook: "Tinggalkan kerja di pintu" },
    ja: { title: "仕事のストレス", desc: "職場のプレッシャー管理 — 認知再構成からエネルギー管理まで", kw: "仕事のストレス,職場のプレッシャー, burnout", hook: "仕事を玄関に置いていく" },
    ko: { title: "직장 스트레스", desc: "직장 내 압박 관리 — 인지 재구성부터 에너지 관리까지", kw: "직장 스트레스,직장 내 압력,번아웃", hook: "퇴근 후 일은 문밖에 두고 오세요" },
    th: { title: "ความเครียดจากการทำงาน", desc: "การจัดการความกดดันในที่ทำงาน — กลยุทธ์จาก cognitive restructuring", kw: "ความเครียดจากการทำงาน,ความกดดันในที่ทำงาน,หมดไฟ", hook: "ทิ้งงานไว้ที่ประตู" },
    es: { title: "Estrés Laboral", desc: "Manejo de la presión laboral — estrategias prácticas desde reestructuración cognitiva", kw: "estrés laboral,presión en el trabajo,agotamiento, #VibeCoding,#EmotionalFitness", hook: "Deja el trabajo en la puerta" },
  },
  "exam-nerves": {
    zh: { title: "考试紧张", desc: "考试前的焦虑——如何将紧张转化为专注和自信", kw: "考试紧张,考前焦虑,考试压力,表现焦虑,专注力, #VibeCoding,#EmotionalFitness", hook: "考前焦虑的解药" },
    en: { title: "Exam Nerves", desc: "Pre-exam anxiety — how to transform nervous energy into focus and confidence", kw: "exam nerves,test anxiety,exam stress,performance anxiety,focus, #VibeCoding,#EmotionalFitness", hook: "The antidote to exam nerves" },
    ms: { title: "Kebimbangan Peperiksaan", desc: "Kebimbangan sebelum peperiksaan — bagaimana ubah tenaga gementar kepada fokus", kw: "kebimbangan peperiksaan,tekanan peperiksaan, #VibeCoding,#EmotionalFitness", hook: "Penawar kebimbangan peperiksaan" },
    ja: { title: "試験不安", desc: "試験前の不安 — 緊張を集中力と自信に変える方法", kw: "試験不安,テスト不安,試験ストレス", hook: "試験不安の特効薬" },
    ko: { title: "시험 불안", desc: "시험 전 불안 — 긴장을 집중력과 자신감으로 바꾸는 법", kw: "시험 불안,시험 스트레스,수행 불안", hook: "시험 불안의 해독제" },
    th: { title: "ความกังวลก่อนสอบ", desc: "ความวิตกกังวลก่อนสอบ — เปลี่ยนความตื่นเต้นเป็นสมาธิ", kw: "ความกังวลก่อนสอบ,ความเครียดก่อนสอบ,ความกังวลเกี่ยวกับการสอบ", hook: "ยาถอนพิษความกังวลก่อนสอบ" },
    es: { title: "Nervios de Examen", desc: "Ansiedad pre-examen — cómo transformar los nervios en concentración y confianza", kw: "nervios de examen,ansiedad ante exámenes,estrés de examen, #VibeCoding,#EmotionalFitness", hook: "El antídoto para los nervios de examen" },
  },
  loss: {
    zh: { title: "失落", desc: "当失去重要的人或事物时——理解哀伤的阶段和重建生活的路径", kw: "失落,哀伤,失去,丧亲,心理重建,哀伤过程, #VibeCoding,#EmotionalFitness", hook: "哀伤不需要被修复" },
    en: { title: "Loss", desc: "When you lose someone or something important — understanding grief stages and rebuilding", kw: "loss,grief,bereavement,healing,psychological rebuilding, #VibeCoding,#EmotionalFitness", hook: "Grief doesn't need fixing" },
    ms: { title: "Kehilangan", desc: "Bila kehilangan seseorang atau sesuatu yang penting — memahami fasa kesedihan", kw: "kehilangan,kesedihan, pemulihan, #VibeCoding,#EmotionalFitness", hook: "Kesedihan tidak perlu diperbaiki" },
    ja: { title: "喪失", desc: "大切な人やものを失った時 — 悲しみの段階と再構築の道", kw: "喪失,悲しみ,死別,心理的再建", hook: "悲しみは修復するものではない" },
    ko: { title: "상실", desc: "중요한 사람이나 것을 잃었을 때 — 슬픔의 단계와 재건 경로", kw: "상실,슬픔,사별,심리적 재건", hook: "슬픔은 고쳐야 할 것이 아닙니다" },
    th: { title: "การสูญเสีย", desc: "เมื่อสูญเสียบุคคลหรือสิ่งที่สำคัญ — ทำความเข้าใจระยะเศร้าโศก", kw: "การสูญเสีย,ความเศร้าโศก,การสูญเสียบุคคลอันเป็นที่รัก", hook: "ความเศร้าโศกไม่จำเป็นต้องได้รับการซ่อมแซม" },
    es: { title: "Pérdida", desc: "Cuando pierdes a alguien o algo importante — comprender las etapas del duelo", kw: "pérdida,duelo,aflicción,reconstrucción, #VibeCoding,#EmotionalFitness", hook: "El duelo no necesita reparación" },
  },
  bereavement: {
    zh: { title: "丧亲", desc: "面对亲人的离世——丧亲之痛的心理历程与自我关怀指南", kw: "丧亲,丧亲之痛,哀悼,心理历程,自我关怀, #VibeCoding,#EmotionalFitness", hook: "在失去中找到继续的力量" },
    en: { title: "Bereavement", desc: "Facing the death of a loved one — the psychological journey of bereavement and self-care", kw: "bereavement,grief,mourning,loss of loved one,self-care, #VibeCoding,#EmotionalFitness", hook: "Finding strength after loss" },
    ms: { title: "Kematian Orang Tersayang", desc: "Menghadapi kematian orang tersayang — perjalanan psikologi berkabung", kw: "kematian orang tersayang,kesedihan,berkabung, #VibeCoding,#EmotionalFitness", hook: "Mencari kekuatan selepas kehilangan" },
    ja: { title: "死別", desc: "大切な人の死に向き合う — 死別の心理的プロセスとセルフケア", kw: "死別,悲嘆,喪に服す,セルフケア", hook: "喪失の中で続ける力を見つける" },
    ko: { title: "사별", desc: "사랑하는 사람의 죽음을 마주할 때 — 사별의 심리적 여정과 자기 돌봄", kw: "사별,슬픔,애도,자기 돌봄", hook: "상실 속에서 계속할 힘 찾기" },
    th: { title: "การสูญเสียบุคคลอันเป็นที่รัก", desc: "เผชิญกับการจากไปของคนที่รัก — การเดินทางทางจิตใจ", kw: "การสูญเสียบุคคลอันเป็นที่รัก,ความเศร้าโศก,การไว้ทุกข์", hook: "ค้นหาพลังในการ继续หลังจากการสูญเสีย" },
    es: { title: "Duelo", desc: "Enfrentando la muerte de un ser querido — el viaje psicológico del duelo", kw: "duelo,aflicción,pérdida de un ser querido,autocuidado, #VibeCoding,#EmotionalFitness", hook: "Encontrando fuerza después de la pérdida" },
  },
  "pet-loss": {
    zh: { title: "失去宠物", desc: "宠物的离去是一种真实的哀伤——理解并接纳这份特殊的失去", kw: "失去宠物,宠物去世,宠物哀伤,动物伴侣,哀悼, #VibeCoding,#EmotionalFitness", hook: "告别最好的朋友" },
    en: { title: "Pet Loss", desc: "Losing a pet is real grief — understanding and honoring this unique form of loss", kw: "pet loss,pet bereavement,animal companion,grief,healing, #VibeCoding,#EmotionalFitness", hook: "Saying goodbye to your best friend" },
    ms: { title: "Kehilangan Haiwan", desc: "Kehilangan haiwan kesayangan adalah kesedihan sebenar — memahami kehilangan unik ini", kw: "kehilangan haiwan,haiwan kesayangan,kesedihan, #VibeCoding,#EmotionalFitness", hook: "Mengucap selamat tinggal pada sahabat terbaik" },
    ja: { title: "ペットロス", desc: "ペットの死は本当の悲しみ — この特別な喪失を理解し受け入れる", kw: "ペットロス,ペットの死,動物との別れ", hook: "親友への別れ" },
    ko: { title: "반려동물 상실", desc: "반려동물의 죽음은 진정한 슬픔입니다 — 이 특별한 상실을 이해하고 받아들이기", kw: "반려동물 상실,반려동물 사별,애도", hook: "가장 친한 친구에게 작별 인사" },
    th: { title: "การสูญเสียสัตว์เลี้ยง", desc: "การสูญเสียสัตว์เลี้ยงคือความเศร้าที่แท้จริง — ทำความเข้าใจและยอมรับ", kw: "การสูญเสียสัตว์เลี้ยง,สัตว์เลี้ยง,ความเศร้า", hook: "การบอกลาเพื่อนรัก" },
    es: { title: "Pérdida de Mascota", desc: "Perder una mascota es un duelo real — comprender y honrar esta pérdida única", kw: "pérdida de mascota,duelo por mascota,compañero animal, #VibeCoding,#EmotionalFitness", hook: "Despedirte de tu mejor amigo" },
  },
  divorce: {
    zh: { title: "离婚", desc: "婚姻结束后的心理重建——从分离的痛苦中找到新的自我", kw: "离婚,婚姻结束,分离,心理重建,情感恢复, #VibeCoding,#EmotionalFitness", hook: "结束也是新的开始" },
    en: { title: "Divorce", desc: "Psychological rebuilding after marriage ends — finding your new self through the pain of separation", kw: "divorce,marriage end,separation,psychological rebuilding,emotional recovery, #VibeCoding,#EmotionalFitness", hook: "An ending is also a beginning" },
    ms: { title: "Perceraian", desc: "Pemulihan psikologi selepas perkahwinan berakhir — cari diri baru melalui kesakitan perpisahan", kw: "perceraian,perpisahan,pemulihan emosi, #VibeCoding,#EmotionalFitness", hook: "Pengakhiran juga permulaan baru" },
    ja: { title: "離婚", desc: "結婚生活の終了後の心理的再建 — 別れの痛みから新しい自分へ", kw: "離婚,結婚の終了,別離,心理的再建", hook: "終わりは新たな始まり" },
    ko: { title: "이혼", desc: "결혼 종료 후 심리적 재건 — 이별의 아픔 속에서 새로운 자아 찾기", kw: "이혼,결혼 종료,별거,심리적 재건", hook: "끝은 또한 새로운 시작" },
    th: { title: "การหย่าร้าง", desc: "การสร้างจิตใจใหม่หลังการหย่าร้าง — ค้นหาตัวตนใหม่ท่ามกลางความเจ็บปวด", kw: "การหย่าร้าง,การแยกทาง,การฟื้นฟูอารมณ์", hook: "การสิ้นสุดคือการเริ่มต้นใหม่" },
    es: { title: "Divorcio", desc: "Reconstrucción psicológica tras el fin del matrimonio — encontrando un nuevo ser", kw: "divorcio,separación,reconstrucción psicológica, #VibeCoding,#EmotionalFitness", hook: "Un final también es un comienzo" },
  },
  "long-distance": {
    zh: { title: "异地恋", desc: "异地恋的心理挑战与维护亲密关系的实用策略", kw: "异地恋,远距离关系,亲密关系,信任,沟通, #VibeCoding,#EmotionalFitness", hook: "距离不是爱的终点" },
    en: { title: "Long Distance", desc: "The psychological challenges of long-distance relationships and practical strategies to stay connected", kw: "long distance relationship,LDR,trust,communication,intimacy, #VibeCoding,#EmotionalFitness", hook: "Distance is not the end of love" },
    ms: { title: "Hubungan Jarak Jauh", desc: "Cabaran psikologi hubungan jarak jauh dan strategi praktikal", kw: "hubungan jarak jauh,LDR,kepercayaan,komunikasi, #VibeCoding,#EmotionalFitness", hook: "Jarak bukan penamat cinta" },
    ja: { title: "遠距離恋愛", desc: "遠距離恋愛の心理的課題と親密さを保つ実用的戦略", kw: "遠距離恋愛,LDR,信頼,コミュニケーション", hook: "距離は愛の終わりではない" },
    ko: { title: "장거리 연애", desc: "장거리 연애의 심리적 도전과 친밀감 유지 전략", kw: "장거리 연애,신뢰,의사소통,친밀감", hook: "거리는 사랑의 끝이 아닙니다" },
    th: { title: "ความสัมพันธ์ทางไกล", desc: "ความท้าทายทางจิตใจของความสัมพันธ์ทางไกลและกลยุทธ์", kw: "ความสัมพันธ์ทางไกล,ความไว้วางใจ,การสื่อสาร", hook: "ระยะทางไม่ใช่จุดจบของความรัก" },
    es: { title: "Relación a Distancia", desc: "Desafíos psicológicos de las relaciones a distancia y estrategias para mantenerse conectados", kw: "relación a distancia,confianza,comunicación,intimidad, #VibeCoding,#EmotionalFitness", hook: "La distancia no es el fin del amor" },
  },
  solitude: {
    zh: { title: "独处", desc: "独处的力量——如何将独处的时光转化为自我成长的养分", kw: "独处,独居,独处能力,自我成长,内省, #VibeCoding,#EmotionalFitness", hook: "独处是自我对话的开始" },
    en: { title: "Solitude", desc: "The power of being alone — how to transform solitary time into fuel for growth", kw: "solitude,being alone,self-growth,introspection,me-time, #VibeCoding,#EmotionalFitness", hook: "Solitude is the start of self-dialogue" },
    ms: { title: "Kesendirian", desc: "Kuasa kesendirian — ubah masa berseorangan kepada pertumbuhan diri", kw: "kesendirian,bersendirian,pertumbuhan diri, #VibeCoding,#EmotionalFitness", hook: "Kesendirian adalah awal dialog diri" },
    ja: { title: "孤独", desc: "一人でいることの力 — 孤独な時間を自己成長の糧に変える", kw: "孤独,一人でいること,自己成長,内省", hook: "孤独は自己対話の始まり" },
    ko: { title: "고독", desc: "혼자 있는 힘 — 고독한 시간을 자기 성장의 원천으로", kw: "고독,혼자 있기,자기 성장,내성", hook: "고독은 자기 대화의 시작" },
    th: { title: "ความสันโดษ", desc: "พลังของการอยู่คนเดียว — เปลี่ยนเวลาโดดเดี่ยวเป็นการเติบโต", kw: "ความสันโดษ,การอยู่คนเดียว,การเติบโตของตนเอง", hook: "ความสันโดษคือจุดเริ่มต้นของการสนทนากับตนเอง" },
    es: { title: "Soledad", desc: "El poder de estar solo — cómo transformar el tiempo en solitario en crecimiento", kw: "soledad,estar solo,crecimiento personal, #VibeCoding,#EmotionalFitness", hook: "La soledad es el inicio del diálogo interno" },
  },
  isolation: {
    zh: { title: "隔离感", desc: "社会隔离的心理影响——理解孤独的根源与重建连接的桥梁", kw: "隔离感,社交隔离,孤独,连接,社会支持, #VibeCoding,#EmotionalFitness", hook: "你不是一个人困在这里" },
    en: { title: "Isolation", desc: "The psychological impact of social isolation — understanding the roots and rebuilding bridges", kw: "isolation,social isolation,loneliness,connection,social support, #VibeCoding,#EmotionalFitness", hook: "You're not alone in this" },
    ms: { title: "Pengasingan", desc: "Kesan psikologi pengasingan sosial — memahami punca dan membina semula jambatan", kw: "pengasingan,pengasingan sosial,kesunyian, #VibeCoding,#EmotionalFitness", hook: "Anda tidak keseorangan dalam ini" },
    ja: { title: "孤立", desc: "社会的孤立の心理的影響 — 孤独の根源を理解し橋を再建する", kw: "孤立,社会的孤立,孤独,繋がり", hook: "あなたは一人じゃない" },
    ko: { title: "고립", desc: "사회적 고립의 심리적 영향 — 외로움의 뿌리 이해와 연결 재건", kw: "고립,사회적 고립,외로움,연결", hook: "당신은 혼자가 아닙니다" },
    th: { title: "การแยกตัว", desc: "ผลกระทบทางจิตใจของการแยกตัวทางสังคม — เข้าใจรากเหง้า", kw: "การแยกตัว,การแยกตัวทางสังคม,ความเหงา", hook: "คุณไม่ได้อยู่คนเดียวในเรื่องนี้" },
    es: { title: "Aislamiento", desc: "El impacto psicológico del aislamiento social — entender las raíces y reconstruir puentes", kw: "aislamiento,aislamiento social,soledad,conexión, #VibeCoding,#EmotionalFitness", hook: "No estás solo en esto" },
  },
  friendship: {
    zh: { title: "友谊", desc: "成年后如何交朋友——友谊的心理学与建立深度连接的艺术", kw: "友谊,交友,社交连接,深度关系,社交圈, #VibeCoding,#EmotionalFitness", hook: "成年人交朋友的指南" },
    en: { title: "Friendship", desc: "How to make friends as an adult — the psychology of friendship and the art of deep connection", kw: "friendship,making friends,social connection,deep relationships, #VibeCoding,#EmotionalFitness", hook: "A guide to making friends as an adult" },
    ms: { title: "Persahabatan", desc: "Cara berkawan sebagai dewasa — psikologi persahabatan dan seni hubungan mendalam", kw: "persahabatan,berkawan,hubungan sosial, #VibeCoding,#EmotionalFitness", hook: "Panduan berkawan untuk dewasa" },
    ja: { title: "友情", desc: "大人になってからの友達の作り方 — 友情の心理学と深いつながりの技術", kw: "友情,友達作り,社会的繋がり", hook: "大人の友達作りのガイド" },
    ko: { title: "우정", desc: "성인이 되어 친구 사귀는 법 — 우정의 심리학과 깊은 연결의 기술", kw: "우정,친구 사귀기,사회적 연결", hook: "성인을 위한 친구 사귀기 가이드" },
    th: { title: "มิตรภาพ", desc: "วิธีหาเพื่อนเมื่อเป็นผู้ใหญ่ — จิตวิทยาของมิตรภาพ", kw: "มิตรภาพ,การหาเพื่อน,การเชื่อมต่อทางสังคม", hook: "คู่มือหาเพื่อนสำหรับผู้ใหญ่" },
    es: { title: "Amistad", desc: "Cómo hacer amigos como adulto — la psicología de la amistad y el arte de la conexión", kw: "amistad,hacer amigos,conexión social, #VibeCoding,#EmotionalFitness", hook: "Guía para hacer amigos como adulto" },
  },
  "social-skills": {
    zh: { title: "社交技巧", desc: "社交技能是可以学习和训练的一种能力——从对话到人际互动的实用指南", kw: "社交技巧,社交技能,人际关系,沟通技巧,对话, #VibeCoding,#EmotionalFitness", hook: "社交能力是可以练习的" },
    en: { title: "Social Skills", desc: "Social skills are learnable — a practical guide from conversation starters to interpersonal dynamics", kw: "social skills,social competence,interpersonal skills,communication, #VibeCoding,#EmotionalFitness", hook: "Social skills can be practiced" },
    ms: { title: "Kemahiran Sosial", desc: "Kemahiran sosial boleh dipelajari — panduan praktikal dari perbualan hingga dinamik interpersonal", kw: "kemahiran sosial,kompetensi sosial,kemahiran interpersonal, #VibeCoding,#EmotionalFitness", hook: "Kemahiran sosial boleh dilatih" },
    ja: { title: "社会的スキル", desc: "社会的スキルは学べる — 会話から対人関係までの実践ガイド", kw: "社会的スキル,対人スキル,コミュニケーション", hook: "社交スキルは練習できる" },
    ko: { title: "사회적 기술", desc: "사회적 기술은 배울 수 있습니다 — 대화부터 대인 관계까지 실용 가이드", kw: "사회적 기술,대인 관계 기술,의사소통", hook: "사회적 기술은 연습할 수 있습니다" },
    th: { title: "ทักษะทางสังคม", desc: "ทักษะทางสังคมสามารถเรียนรู้ได้ — คู่มือจากบทสนทนาสู่ปฏิสัมพันธ์", kw: "ทักษะทางสังคม,ทักษะ interpersonal,การสื่อสาร", hook: "ทักษะทางสังคมฝึกฝนได้" },
    es: { title: "Habilidades Sociales", desc: "Las habilidades sociales se aprenden — guía práctica desde conversaciones hasta dinámicas interpersonales", kw: "habilidades sociales,competencia social,habilidades interpersonales, #VibeCoding,#EmotionalFitness", hook: "Las habilidades sociales se pueden practicar" },
  },
  belonging: {
    zh: { title: "归属感", desc: "归属感是人类最深层的情感需求之一——如何找到属于自己的群体", kw: "归属感,归属,群体,认同,连接,社区, #VibeCoding,#EmotionalFitness", hook: "找到属于你的地方" },
    en: { title: "Belonging", desc: "Belonging is one of our deepest emotional needs — how to find your tribe", kw: "belonging,sense of belonging,community,identity,connection, #VibeCoding,#EmotionalFitness", hook: "Find where you belong" },
    ms: { title: "Kepunyaan", desc: "Kepunyaan adalah keperluan emosi terdalam — cari komuniti anda", kw: "kepunyaan,komuniti,identiti, #VibeCoding,#EmotionalFitness", hook: "Cari tempat anda berada" },
    ja: { title: "所属感", desc: "所属感は最も深い感情の一つ — 自分に合ったコミュニティを見つける", kw: "所属感,所属,コミュニティ,アイデンティティ", hook: "あなたの居場所を見つける" },
    ko: { title: "소속감", desc: "소속감은 가장 깊은 정서적 필요입니다 — 나의 공동체 찾기", kw: "소속감,소속,공동체,정체성", hook: "당신이 속한 곳을 찾으세요" },
    th: { title: "ความรู้สึกเป็นส่วนหนึ่ง", desc: "ความรู้สึกเป็นส่วนหนึ่งคือความต้องการทางอารมณ์ที่ลึกที่สุด", kw: "ความรู้สึกเป็นส่วนหนึ่ง,ชุมชน,อัตลักษณ์", hook: "ค้นหาสถานที่ที่คุณ belong" },
    es: { title: "Pertenencia", desc: "La pertenencia es una de las necesidades emocionales más profundas — cómo encontrar tu tribu", kw: "pertenencia,sentido de pertenencia,comunidad,identidad, #VibeCoding,#EmotionalFitness", hook: "Encuentra tu lugar" },
  },
  "self-esteem": {
    zh: { title: "自尊", desc: "自尊的心理学——为什么你总是觉得自己不够好以及如何改变", kw: "自尊,自我价值,自我接纳,低自尊,自我批评, #VibeCoding,#EmotionalFitness", hook: "你本来就值得被爱" },
    en: { title: "Self-Esteem", desc: "The psychology of self-esteem — why you always feel not good enough and how to change", kw: "self-esteem,self-worth,self-acceptance,low self-esteem,self-criticism, #VibeCoding,#EmotionalFitness", hook: "You are already worthy of love" },
    ms: { title: "Harga Diri", desc: "Psikologi harga diri — kenapa rasa tidak cukup baik dan cara mengubah", kw: "harga diri,nilai diri,penerimaan diri, #VibeCoding,#EmotionalFitness", hook: "Anda sudah layak untuk dicintai" },
    ja: { title: "自尊心", desc: "自尊心の心理学 — なぜ自分は十分でないと感じるのか、どう変えるか", kw: "自尊心,自己価値,自己受容,低自尊心", hook: "あなたは愛される価値がある" },
    ko: { title: "자존감", desc: "자존감의 심리학 — 왜 충분하지 않다고 느끼는지 그리고 바꾸는 방법", kw: "자존감,자기 가치,자기 수용,낮은 자존감", hook: "당신은 이미 사랑받을 가치가 있습니다" },
    th: { title: "ความภูมิใจในตนเอง", desc: "จิตวิทยาของความภูมิใจในตนเอง — ทำไมรู้สึกไม่ดีพอ", kw: "ความภูมิใจในตนเอง,คุณค่าในตนเอง,การยอมรับตนเอง", hook: "คุณมีค่าควรแก่ความรักอยู่แล้ว" },
    es: { title: "Autoestima", desc: "La psicología de la autoestima — por qué siempre sientes que no eres suficiente", kw: "autoestima,amor propio,autovaloración, #VibeCoding,#EmotionalFitness", hook: "Ya eres digno de amor" },
  },
  "impostor-syndrome": {
    zh: { title: "冒名顶替综合征", desc: "觉得自己是个骗子？其实你不是——认识并克服冒名顶替综合征", kw: "冒名顶替综合征,冒充者综合征,自我怀疑,成就,能力焦虑, #VibeCoding,#EmotionalFitness", hook: "你不是骗子，你在成长" },
    en: { title: "Impostor Syndrome", desc: "Feeling like a fraud? You're not — understanding and overcoming impostor syndrome", kw: "impostor syndrome,imposter phenomenon,self-doubt,achievement,competence, #VibeCoding,#EmotionalFitness", hook: "You're not a fraud, you're growing" },
    ms: { title: "Sindrom Impostor", desc: "Rasa seperti penipu? Anda tidak — fahami dan atasi sindrom impostor", kw: "sindrom impostor,keraguan diri,pencapaian, #VibeCoding,#EmotionalFitness", hook: "Anda bukan penipu, anda sedang berkembang" },
    ja: { title: "インポスター症候群", desc: "自分は詐欺師だと感じる？実は違う — インポスター症候群を理解し克服する", kw: "インポスター症候群,自己不信,達成", hook: "あなたは詐欺師じゃない、成長している" },
    ko: { title: "사기꾼 증후군", desc: "사기꾼처럼 느껴지나요? 당신은 아닙니다 — 사기꾼 증후군 이해와 극복", kw: "사기꾼 증후군,자의심,성취", hook: "당신은 사기꾼이 아닙니다, 성장하고 있습니다" },
    th: { title: "Impostor Syndrome", desc: "รู้สึกเหมือนเป็นคนหลอกลวง? คุณไม่ใช่ — ทำความเข้าใจและเอาชนะ", kw: "Impostor Syndrome,การสงสัยตนเอง,ความสำเร็จ", hook: "คุณไม่ใช่คนหลอกลวง คุณกำลังเติบโต" },
    es: { title: "Síndrome del Impostor", desc: "¿Sientes que eres un fraude? No lo eres — comprender y superar el síndrome del impostor", kw: "síndrome del impostor,auto-duda,logro,competencia, #VibeCoding,#EmotionalFitness", hook: "No eres un fraude, estás creciendo" },
  },
  perfectionism: {
    zh: { title: "完美主义", desc: "完美主义的代价——为什么追求完美反而让你不快乐以及如何放下", kw: "完美主义,完美主义者,过度追求完美,自我苛责,拖延, #VibeCoding,#EmotionalFitness", hook: "完美是一个谎言" },
    en: { title: "Perfectionism", desc: "The cost of perfectionism — why chasing perfect makes you unhappy and how to let go", kw: "perfectionism,healthy striving,self-criticism,procrastination,good enough, #VibeCoding,#EmotionalFitness", hook: "Perfection is a lie" },
    ms: { title: "Perfeksionisme", desc: "Kos perfeksionisme — kenapa kejar sempurna buat anda tidak gembira", kw: "perfeksionisme,kritikan diri,prokrastinasi, #VibeCoding,#EmotionalFitness", hook: "Kesempurnaan adalah dusta" },
    ja: { title: "完璧主義", desc: "完璧主義の代償 — 完璧を追い求めることが不幸の原因", kw: "完璧主義,自己批判,先延ばし", hook: "完璧は嘘である" },
    ko: { title: "완벽주의", desc: "완벽주의의 대가 — 완벽을 추구하는 것이 불행을 만드는 이유", kw: "완벽주의,자기 비판,미루기", hook: "완벽은 거짓말입니다" },
    th: { title: "ความสมบูรณ์แบบ", desc: "ต้นทุนของความสมบูรณ์แบบ — ทำไมการ追求ความสมบูรณ์แบบทำให้ไม่มีความสุข", kw: "ความสมบูรณ์แบบ,การวิจารณ์ตนเอง,การผัดวันประกันพรุ่ง", hook: "ความสมบูรณ์แบบคือคำโกหก" },
    es: { title: "Perfeccionismo", desc: "El coste del perfeccionismo — por qué buscar la perfección te hace infeliz", kw: "perfeccionismo,autocrítica,procrastinación, #VibeCoding,#EmotionalFitness", hook: "La perfección es una mentira" },
  },
  "body-image": {
    zh: { title: "身体形象", desc: "你对自己身体的看法可能并不真实——重建健康身体形象的路径", kw: "身体形象,身材焦虑,身体不满,自我形象,接纳身体, #VibeCoding,#EmotionalFitness", hook: "你的身体不是装饰品" },
    en: { title: "Body Image", desc: "Your perception of your body may not be reality — a path to rebuilding a healthy body image", kw: "body image,body dissatisfaction,self-image,body acceptance, #VibeCoding,#EmotionalFitness", hook: "Your body is not decoration" },
    ms: { title: "Imej Badan", desc: "Persepsi badan anda mungkin bukan realiti — laluan ke imej badan sihat", kw: "imej badan,ketidakpuasan badan,imej diri, #VibeCoding,#EmotionalFitness", hook: "Badan anda bukan hiasan" },
    ja: { title: "ボディイメージ", desc: "自分の身体に対する認識は現実ではないかもしれない — 健康的な身体イメージの再構築", kw: "ボディイメージ,身体不満,自己イメージ", hook: "あなたの身体は飾りじゃない" },
    ko: { title: "신체 이미지", desc: "자신의 신체에 대한 인식은 현실이 아닐 수 있습니다 — 건강한 신체 이미지 재건", kw: "신체 이미지,신체 불만족,자기 이미지", hook: "당신의 몸은 장식품이 아닙니다" },
    th: { title: "ภาพลักษณ์ร่างกาย", desc: "การรับรู้ร่างกายของคุณอาจไม่ใช่ความจริง — เส้นทางสู่ภาพลักษณ์ร่างกายที่ healthy", kw: "ภาพลักษณ์ร่างกาย,ความไม่พอใจในร่างกาย,ภาพลักษณ์ตนเอง", hook: "ร่างกายของคุณไม่ใช่เครื่องประดับ" },
    es: { title: "Imagen Corporal", desc: "Tu percepción de tu cuerpo puede no ser realidad — reconstruir una imagen corporal saludable", kw: "imagen corporal,insatisfacción corporal,autoimagen, #VibeCoding,#EmotionalFitness", hook: "Tu cuerpo no es decoración" },
  },
  comparison: {
    zh: { title: "比较心理", desc: "为什么你总是忍不住和别人比——社会比较心理学的洞见与破解之法", kw: "比较心理,社会比较,嫉妒,向上比较,自我价值, #VibeCoding,#EmotionalFitness", hook: "别人的路不是你的地图" },
    en: { title: "Comparison", desc: "Why you can't stop comparing yourself to others — insights from social comparison theory", kw: "comparison,social comparison,envy,self-worth,upward comparison, #VibeCoding,#EmotionalFitness", hook: "Their path is not your map" },
    ms: { title: "Perbandingan", desc: "Kenapa anda tak boleh berhenti bandingkan diri dengan orang lain — teori perbandingan sosial", kw: "perbandingan,perbandingan sosial,iri hati, #VibeCoding,#EmotionalFitness", hook: "Jalan mereka bukan peta anda" },
    ja: { title: "比較", desc: "なぜ他人と自分を比較してしまうのか — 社会比較理論の洞察", kw: "比較,社会比較,嫉妬,自己価値", hook: "彼らの道はあなたの地図ではない" },
    ko: { title: "비교", desc: "왜 다른 사람과 자신을 비교할까 — 사회 비교 이론의 통찰", kw: "비교,사회 비교,질투,자기 가치", hook: "그들의 길은 당신의 지도가 아닙니다" },
    th: { title: "การเปรียบเทียบ", desc: "ทำไมคุณหยุดเปรียบเทียบตัวเองกับคนอื่นไม่ได้ — ทฤษฎีการเปรียบเทียบทางสังคม", kw: "การเปรียบเทียบ,การเปรียบเทียบทางสังคม,ความอิจฉา", hook: "ทางของพวกเขาไม่ใช่แผนที่ของคุณ" },
    es: { title: "Comparación", desc: "Por qué no puedes dejar de compararte con los demás — teoría de la comparación social", kw: "comparación,comparación social,envidia, #VibeCoding,#EmotionalFitness", hook: "Su camino no es tu mapa" },
  },
  "self-compassion": {
    zh: { title: "自我关怀", desc: "对自己好一点——自我关怀的科学研究与实践方法", kw: "自我关怀,自悯,善待自己,正念自我关怀,慈悲, #VibeCoding,#EmotionalFitness", hook: "对自己说一句没关系" },
    en: { title: "Self Compassion", desc: "Being kind to yourself — the science and practice of self-compassion", kw: "self-compassion,self-kindness,mindfulness,common humanity, #VibeCoding,#EmotionalFitness", hook: "Tell yourself: it's okay" },
    ms: { title: "Belas Kasihan Diri", desc: "Bersikap baik pada diri sendiri — sains dan amalan belas kasihan diri", kw: "belas kasihan diri,kebaikan diri,kesedaran, #VibeCoding,#EmotionalFitness", hook: "Kata pada diri sendiri: tak apa" },
    ja: { title: "セルフコンパッション", desc: "自分に優しくする — セルフコンパッションの科学と実践", kw: "セルフコンパッション,自己慈愛,マインドフルネス", hook: "自分に言う：大丈夫" },
    ko: { title: "자기 연민", desc: "자신에게 친절해지기 — 자기 연민의 과학과 실천", kw: "자기 연민,자기 친절,마음챙김", hook: "자신에게 말하세요: 괜찮아" },
    th: { title: "ความเมตตาต่อตนเอง", desc: "มีเมตตาต่อตัวเอง — วิทยาศาสตร์และการปฏิบัติของความเมตตาต่อตนเอง", kw: "ความเมตตาต่อตนเอง,การปฏิบัติต่อตนเอง", hook: "บอกตัวเองว่า: ไม่เป็นไร" },
    es: { title: "Autocompasión", desc: "Ser amable contigo mismo — la ciencia y práctica de la autocompasión", kw: "autocompasión,amabilidad propia,atención plena, #VibeCoding,#EmotionalFitness", hook: "Dite a ti mismo: está bien" },
  },
  "break-up": {
    zh: { title: "分手", desc: "分手后的心理重建——从心碎到重新学会爱自己", kw: "分手,失恋,心碎,情感恢复,自我重建, #VibeCoding,#EmotionalFitness", hook: "心碎后的重建手册" },
    en: { title: "Break Up", desc: "Psychological rebuilding after a breakup — from heartbreak to self-love", kw: "breakup,heartbreak,relationship end,emotional recovery, #VibeCoding,#EmotionalFitness", hook: "Rebuilding after heartbreak" },
    ms: { title: "Putus Cinta", desc: "Pemulihan psikologi selepas putus cinta", kw: "putus cinta,sakit hati, pemulihan emosi, #VibeCoding,#EmotionalFitness", hook: "Pemulihan selepas patah hati" },
    ja: { title: "別れ", desc: "別れの後の心理的再建 — 失恋から自己愛へ", kw: "別れ,失恋,心の回復", hook: "失恋後の再建マニュアル" },
    ko: { title: "이별", desc: "이별 후 심리적 재건 — 상처에서 자기 사랑까지", kw: "이별,실연,감정 회복", hook: "상처 후 재건 매뉴얼" },
    th: { title: "การเลิกรา", desc: "การสร้างจิตใจใหม่หลังการเลิกรา — จากหัวใจสลายสู่รักตัวเอง", kw: "การเลิกรา,อกหัก,การฟื้นฟูอารมณ์", hook: "คู่มือสร้างตัวเองใหม่หลังหัวใจสลาย" },
    es: { title: "Ruptura", desc: "Reconstrucción psicológica tras una ruptura — del desamor al amor propio", kw: "ruptura,desamor,recuperación emocional, #VibeCoding,#EmotionalFitness", hook: "Manual de reconstrucción tras el desamor" },
  },
  communication: {
    zh: { title: "沟通", desc: "有效沟通的技巧——非暴力沟通与深度倾听的实践指南", kw: "沟通,沟通技巧,非暴力沟通,倾听,有效表达, #VibeCoding,#EmotionalFitness", hook: "一句话可以改变一切" },
    en: { title: "Communication", desc: "Effective communication skills — a practical guide to NVC and deep listening", kw: "communication,NVC,active listening,effective expression, #VibeCoding,#EmotionalFitness", hook: "One sentence can change everything" },
    ms: { title: "Komunikasi", desc: "Kemahiran komunikasi berkesan — panduan praktikal", kw: "komunikasi,NVC,mendengar aktif, #VibeCoding,#EmotionalFitness", hook: "Satu ayat boleh ubah segala-galanya" },
    ja: { title: "コミュニケーション", desc: "効果的なコミュニケーション — 非暴力コミュニケーション実践ガイド", kw: "コミュニケーション,NVC,傾聴", hook: "一言で全てが変わる" },
    ko: { title: "의사소통", desc: "효과적인 의사소통 기술 — 비폭력 대화 실천 가이드", kw: "의사소통,NVC,경청", hook: "한 마디가 모든 것을 바꿀 수 있습니다" },
    th: { title: "การสื่อสาร", desc: "ทักษะการสื่อสารที่มีประสิทธิภาพ — คู่มือปฏิบัติ NVC", kw: "การสื่อสาร,NVC,การฟังอย่างลึกซึ้ง", hook: "หนึ่งประโยคสามารถเปลี่ยนทุกอย่าง" },
    es: { title: "Comunicación", desc: "Habilidades de comunicación efectiva — guía práctica de CNV", kw: "comunicación,CNV,escucha activa, #VibeCoding,#EmotionalFitness", hook: "Una frase puede cambiarlo todo" },
  },
  trust: {
    zh: { title: "信任", desc: "信任的心理学——如何建立、维持和修复关系中的信任", kw: "信任,建立信任,信任修复,关系,安全感, #VibeCoding,#EmotionalFitness", hook: "信任是可以重建的" },
    en: { title: "Trust", desc: "The psychology of trust — how to build, maintain, and repair trust in relationships", kw: "trust,building trust,trust repair,relationships,security, #VibeCoding,#EmotionalFitness", hook: "Trust can be rebuilt" },
    ms: { title: "Kepercayaan", desc: "Psikologi kepercayaan — bina, jaga dan baiki kepercayaan", kw: "kepercayaan,bina kepercayaan, hubungan, #VibeCoding,#EmotionalFitness", hook: "Kepercayaan boleh dibina semula" },
    ja: { title: "信頼", desc: "信頼の心理学 — 関係における信頼の構築、維持、修復", kw: "信頼,信頼構築,信頼修復", hook: "信頼は再構築できる" },
    ko: { title: "신뢰", desc: "신뢰의 심리학 — 관계에서 신뢰 구축, 유지, 회복", kw: "신뢰,신뢰 구축,신뢰 회복", hook: "신뢰는 재건할 수 있습니다" },
    th: { title: "ความไว้วางใจ", desc: "จิตวิทยาของความไว้วางใจ — การสร้าง รักษา และซ่อมแซมความไว้วางใจ", kw: "ความไว้วางใจ,การสร้างความไว้วางใจ,ความสัมพันธ์", hook: "ความไว้วางใจสามารถสร้างใหม่ได้" },
    es: { title: "Confianza", desc: "La psicología de la confianza — cómo construir, mantener y reparar la confianza", kw: "confianza,construir confianza,reparar confianza, #VibeCoding,#EmotionalFitness", hook: "La confianza se puede reconstruir" },
  },
  "co-dependency": {
    zh: { title: "相互依赖", desc: "不健康的关系模式——识别相互依赖并建立健康的边界", kw: "相互依赖,共依存,关系模式,边界,健康关系, #VibeCoding,#EmotionalFitness", hook: "放下拯救者的角色" },
    en: { title: "Co-dependency", desc: "Unhealthy relationship patterns — recognizing codependency and building healthy boundaries", kw: "codependency,relationship patterns,boundaries,healthy relationships, #VibeCoding,#EmotionalFitness", hook: "Put down the rescuer role" },
    ms: { title: "Kodependensi", desc: "Corak hubungan tidak sihat — kenali kodependensi", kw: "kodependensi,corak hubungan,sempadan, #VibeCoding,#EmotionalFitness", hook: "Lepaskan peranan penyelamat" },
    ja: { title: "共依存", desc: "不健全な関係パターン — 共依存を認識し健全な境界線を築く", kw: "共依存,関係パターン,境界線", hook: "救済者の役割を手放す" },
    ko: { title: "공의존", desc: "불건강한 관계 패턴 — 공의존 인식과 건강한 경계 설정", kw: "공의존,관계 패턴,경계", hook: "구조자 역할을 내려놓으세요" },
    th: { title: "การพึ่งพากัน", desc: "รูปแบบความสัมพันธ์ที่ไม่ healthy — รู้จักการพึ่งพาและสร้างขอบเขต", kw: "การพึ่งพากัน,รูปแบบความสัมพันธ์,ขอบเขต", hook: "วางบทบาทผู้ช่วยเหลือ" },
    es: { title: "Codependencia", desc: "Patrones de relación no saludables — reconociendo la codependencia", kw: "codependencia,patrones relacionales,límites, #VibeCoding,#EmotionalFitness", hook: "Deja el rol de salvador" },
  },
  boundaries: {
    zh: { title: "边界感", desc: "健康的边界是关系的地基——学习设立和维护个人界限", kw: "边界,个人界限,边界感,自我尊重,关系健康, #VibeCoding,#EmotionalFitness", hook: "说'不'是一种自爱" },
    en: { title: "Boundaries", desc: "Healthy boundaries are the foundation of relationships — learn to set and maintain them", kw: "boundaries,personal boundaries,self-respect,assertiveness, #VibeCoding,#EmotionalFitness", hook: "Saying 'no' is self-love" },
    ms: { title: "Sempadan", desc: "Sempadan sihat adalah asas hubungan", kw: "sempadan,sempadan peribadi,hormat diri, #VibeCoding,#EmotionalFitness", hook: "Berkata 'tidak' adalah cinta diri" },
    ja: { title: "境界線", desc: "健全な境界線は関係の基盤 — 設定と維持を学ぶ", kw: "境界線,パーソナルスペース,自己尊重", hook: "「ノー」と言うことは自己愛" },
    ko: { title: "경계", desc: "건강한 경계는 관계의 기초 — 설정과 유지 학습", kw: "경계,개인적 경계,자기 존중", hook: "'아니오'라고 말하는 것은 자기 사랑입니다" },
    th: { title: "ขอบเขต", desc: "ขอบเขตที่ healthy คือพื้นฐานของความสัมพันธ์", kw: "ขอบเขต,ขอบเขตส่วนบุคคล,การ尊重ตนเอง", hook: "การพูดว่า 'ไม่' คือความรักตัวเอง" },
    es: { title: "Límites", desc: "Los límites saludables son la base de las relaciones", kw: "límites,límites personales,respeto propio, #VibeCoding,#EmotionalFitness", hook: "Decir 'no' es amor propio" },
  },
  parenting: {
    zh: { title: "育儿", desc: "为人父母的心理挑战——正念育儿与亲子关系的科学指南", kw: "育儿,亲子关系,正念育儿,儿童心理,家庭教育, #VibeCoding,#EmotionalFitness", hook: "做一个足够好的父母" },
    en: { title: "Parenting", desc: "The psychological challenges of parenting — mindful parenting and connection", kw: "parenting,child development,mindful parenting,family, #VibeCoding,#EmotionalFitness", hook: "Be a good enough parent" },
    ms: { title: "Keibubapaan", desc: "Cabaran psikologi keibubapaan — panduan saintifik", kw: "keibubapaan,perkembangan kanak-kanak, #VibeCoding,#EmotionalFitness", hook: "Jadilah ibu bapa yang cukup baik" },
    ja: { title: "子育て", desc: "子育ての心理的課題 — マインドフル子育てと親子関係", kw: "子育て,親子関係,マインドフル子育て", hook: "十分良い親になる" },
    ko: { title: "육아", desc: "육아의 심리적 도전 — 마음챙김 육아와 자녀 관계", kw: "육아,자녀 관계,마음챙김 육아", hook: "충분히 좋은 부모가 되세요" },
    th: { title: "การเลี้ยงดู", desc: "ความท้าทายทางจิตใจของการเลี้ยงดู — การเลี้ยงดูอย่างมีสติ", kw: "การเลี้ยงดู,ความสัมพันธ์พ่อแม่ลูก", hook: "เป็นพ่อแม่ที่ดีพอ" },
    es: { title: "Crianza", desc: "Los desafíos psicológicos de la crianza — crianza consciente", kw: "crianza,desarrollo infantil,crianza consciente, #VibeCoding,#EmotionalFitness", hook: "Sé un padre suficientemente bueno" },
  },
  "family-conflict": {
    zh: { title: "家庭冲突", desc: "原生家庭与当前家庭中的冲突模式——理解、化解与和解", kw: "家庭冲突,原生家庭,家庭关系,冲突化解,和解, #VibeCoding,#EmotionalFitness", hook: "家庭不是战场" },
    en: { title: "Family Conflict", desc: "Conflict patterns in family systems — understanding, resolving, and finding peace", kw: "family conflict,family dynamics,conflict resolution,reconciliation, #VibeCoding,#EmotionalFitness", hook: "Family is not a battlefield" },
    ms: { title: "Konflik Keluarga", desc: "Corak konflik dalam sistem keluarga", kw: "konflik keluarga,dinamik keluarga,resolusi konflik, #VibeCoding,#EmotionalFitness", hook: "Keluarga bukan medan perang" },
    ja: { title: "家族間対立", desc: "家族システムにおける対立パターン — 理解、解決、和解", kw: "家族間対立,家族関係,対立解決", hook: "家族は戦場じゃない" },
    ko: { title: "가족 갈등", desc: "가족 체계의 갈등 패턴 — 이해, 해결, 화해", kw: "가족 갈등,가족 관계,갈등 해결", hook: "가족은 전장이 아닙니다" },
    th: { title: "ความขัดแย้งในครอบครัว", desc: "รูปแบบความขัดแย้งในระบบครอบครัว", kw: "ความขัดแย้งในครอบครัว,พลวัตครอบครัว", hook: "ครอบครัวไม่ใช่สนามรบ" },
    es: { title: "Conflicto Familiar", desc: "Patrones de conflicto en sistemas familiares", kw: "conflicto familiar,dinámica familiar,resolución, #VibeCoding,#EmotionalFitness", hook: "La familia no es un campo de batalla" },
  },
  purpose: {
    zh: { title: "人生意义", desc: "寻找人生目标和意义——存在主义心理学的视角与现代实践", kw: "人生意义,人生目标,存在主义,价值观,使命, #VibeCoding,#EmotionalFitness", hook: "找到你起床的理由" },
    en: { title: "Purpose", desc: "Finding meaning and purpose in life — existential psychology meets modern practice", kw: "purpose,meaning,life goals,existential,values, #VibeCoding,#EmotionalFitness", hook: "Find your reason to get up" },
    ms: { title: "Tujuan Hidup", desc: "Mencari makna dan tujuan hidup — psikologi eksistensial", kw: "tujuan hidup,makna,matlamat hidup, #VibeCoding,#EmotionalFitness", hook: "Cari alasan anda untuk bangun" },
    ja: { title: "人生の目的", desc: "人生の意味と目的を探す — 実存心理学と現代実践", kw: "人生の目的,意味,目標", hook: "起きる理由を見つける" },
    ko: { title: "인생의 의미", desc: "인생의 의미와 목표 찾기 — 실존 심리학의 관점", kw: "인생의 의미,목표,실존", hook: "일어날 이유를 찾으세요" },
    th: { title: "จุดมุ่งหมายของชีวิต", desc: "การค้นหาความหมายและจุดมุ่งหมายของชีวิต", kw: "จุดมุ่งหมาย,ความหมายของชีวิต,เป้าหมาย", hook: "ค้นหาเหตุผลที่จะลุกขึ้น" },
    es: { title: "Propósito", desc: "Encontrando significado y propósito en la vida", kw: "propósito,significado,metas de vida, #VibeCoding,#EmotionalFitness", hook: "Encuentra tu razón para levantarte" },
  },
  "career-change": {
    zh: { title: "职业转型", desc: "职业转型的心理准备——从不确定到新方向的完整指南", kw: "职业转型,转行,职业规划,职业焦虑,人生转型, #VibeCoding,#EmotionalFitness", hook: "转行不是从头开始" },
    en: { title: "Career Change", desc: "The psychology of career transition — from uncertainty to a new direction", kw: "career change,job transition,career anxiety,professional growth, #VibeCoding,#EmotionalFitness", hook: "Career change is not starting over" },
    ms: { title: "Perubahan Kerjaya", desc: "Psikologi peralihan kerjaya — dari ketidakpastian ke arah baru", kw: "perubahan kerjaya,peralihan pekerjaan,pertumbuhan, #VibeCoding,#EmotionalFitness", hook: "Tukar kerjaya bukan bermula dari kosong" },
    ja: { title: "キャリアチェンジ", desc: "キャリア転換の心理的準備 — 不確実性から新たな方向へ", kw: "キャリアチェンジ,転職,キャリア不安", hook: "転職はゼロからのスタートじゃない" },
    ko: { title: "커리어 체인지", desc: "직업 전환의 심리적 준비 — 불확실성에서 새 방향으로", kw: "커리어 체인지,전직,직업 불안", hook: "전직은 처음부터 시작하는 것이 아닙니다" },
    th: { title: "การเปลี่ยนอาชีพ", desc: "จิตวิทยาของการเปลี่ยนอาชีพ — จากความไม่แน่นอนสู่ทิศทางใหม่", kw: "การเปลี่ยนอาชีพ,การเปลี่ยนงาน,ความกังวลเรื่องอาชีพ", hook: "การเปลี่ยนอาชีพไม่ใช่การเริ่มต้นใหม่" },
    es: { title: "Cambio de Carrera", desc: "La psicología de la transición profesional", kw: "cambio de carrera,transición laboral,crecimiento profesional, #VibeCoding,#EmotionalFitness", hook: "Cambiar de carrera no es empezar de cero" },
  },
  "quarter-life-crisis": {
    zh: { title: "四分之一人生危机", desc: "20多岁到30出头的迷茫——为什么你感觉被困住了以及如何找到出路", kw: "四分之一人生危机,20多岁,30岁,迷茫,人生方向, #VibeCoding,#EmotionalFitness", hook: "你的迷茫是正常的" },
    en: { title: "Quarter Life Crisis", desc: "The confusion of your 20s and early 30s — why you feel stuck and how to find your way", kw: "quarter life crisis,20s,30s,confusion,life direction, #VibeCoding,#EmotionalFitness", hook: "Your confusion is normal" },
    ms: { title: "Krisis Suku Abad", desc: "Kekeliruan usia 20-an hingga awal 30-an — rasa tersekat dan cari arah", kw: "krisis suku abad,20-an,30-an,arah hidup, #VibeCoding,#EmotionalFitness", hook: "Kekeliruan anda adalah normal" },
    ja: { title: "クォーターライフクライシス", desc: "20代から30代前半の迷い — なぜ行き詰まりを感じるのか", kw: "クォーターライフクライシス,20代,迷い", hook: "あなたの迷いは正常です" },
    ko: { title: "쿼터 라이프 크라이시스", desc: "20대에서 30대 초반의 혼란 — 왜 갇힌 느낌이 들까", kw: "쿼터 라이프 크라이시스,20대,방향성", hook: "당신의 혼란은 정상입니다" },
    th: { title: "วิกฤติวัยเบญจเพส", desc: "ความสับสนในช่วงอายุ 20 ถึงต้น 30 — ทำไมรู้สึกติดอยู่", kw: "วิกฤติวัยเบญจเพส,วัย 20,ทิศทางชีวิต", hook: "ความสับสนของคุณเป็นเรื่องปกติ" },
    es: { title: "Crisis de los 30", desc: "La confusión de los 20 y principios de los 30 — por qué te sientes estancado", kw: "crisis de los 30,veintitantos,dirección vital, #VibeCoding,#EmotionalFitness", hook: "Tu confusión es normal" },
  },
  "midlife-crisis": {
    zh: { title: "中年危机", desc: "中年阶段的心理重构——从焦虑到智慧的转型之路", kw: "中年危机,人生下半场,中年焦虑,转型,生命意义, #VibeCoding,#EmotionalFitness", hook: "下半场人生的智慧" },
    en: { title: "Midlife Crisis", desc: "Psychological restructuring in midlife — from anxiety to wisdom", kw: "midlife crisis,middle age,midlife transition,mortality, #VibeCoding,#EmotionalFitness", hook: "The wisdom of life's second half" },
    ms: { title: "Krisis Pertengahan Umur", desc: "Restrukturisasi psikologi di usia pertengahan", kw: "krisis pertengahan umur,usia pertengahan, #VibeCoding,#EmotionalFitness", hook: "Kebijaksanaan separuh kedua hidup" },
    ja: { title: "ミッドライフクライシス", desc: "中年期の心理的再構築 — 不安から知恵への道", kw: "ミッドライフクライシス,中年期,不安", hook: "人生後半の智慧" },
    ko: { title: "중년 위기", desc: "중년의 심리적 재구성 — 불안에서 지혜로", kw: "중년 위기,중년,인생 전환", hook: "인생 후반부의 지혜" },
    th: { title: "วิกฤติวัยกลางคน", desc: "การปรับโครงสร้างทางจิตใจในวัยกลางคน — จากความกังวลสู่ปัญญา", kw: "วิกฤติวัยกลางคน,วัยกลางคน,การเปลี่ยนแปลง", hook: "ปัญญาของครึ่งหลังของชีวิต" },
    es: { title: "Crisis de Mediana Edad", desc: "Reestructuración psicológica en la mediana edad — de la ansiedad a la sabiduría", kw: "crisis de mediana edad,mediana edad,transición, #VibeCoding,#EmotionalFitness", hook: "La sabiduría de la segunda mitad de la vida" },
  },
  "cultural-identity": {
    zh: { title: "文化认同", desc: "在多元文化中寻找自我——文化认同的心理学与跨文化适应", kw: "文化认同,跨文化,身份认同,文化冲突,多元文化, #VibeCoding,#EmotionalFitness", hook: "在两个世界中找到自己" },
    en: { title: "Cultural Identity", desc: "Finding yourself across cultures — the psychology of cultural identity and adaptation", kw: "cultural identity,cross-cultural,acculturation,bicultural, #VibeCoding,#EmotionalFitness", hook: "Find yourself between two worlds" },
    ms: { title: "Identiti Budaya", desc: "Mencari diri merentas budaya — psikologi identiti budaya", kw: "identiti budaya,rentas budaya,adaptasi, #VibeCoding,#EmotionalFitness", hook: "Cari diri antara dua dunia" },
    ja: { title: "文化的アイデンティティ", desc: "多文化の中で自己を見つける — 文化アイデンティティの心理学", kw: "文化的アイデンティティ,異文化適応,アイデンティティ", hook: "二つの世界の中で自分を見つける" },
    ko: { title: "문화 정체성", desc: "다문화 속에서 자아 찾기 — 문화 정체성의 심리학", kw: "문화 정체성,다문화,적응", hook: "두 세계 사이에서 자신을 찾다" },
    th: { title: "อัตลักษณ์ทางวัฒนธรรม", desc: "การค้นหาตัวเองข้ามวัฒนธรรม — จิตวิทยาของอัตลักษณ์ทางวัฒนธรรม", kw: "อัตลักษณ์ทางวัฒนธรรม,ข้ามวัฒนธรรม,การปรับตัว", hook: "ค้นหาตัวเองระหว่างสองโลก" },
    es: { title: "Identidad Cultural", desc: "Encontrarse a través de culturas — la psicología de la identidad cultural", kw: "identidad cultural,intercultural,adaptación, #VibeCoding,#EmotionalFitness", hook: "Encuéntrate entre dos mundos" },
  },
  meditation: {
    zh: { title: "冥想", desc: "冥想的科学——从正念观呼吸到觉知生活的完整指南", kw: "冥想,正念,专注力,减压,觉知, #VibeCoding,#EmotionalFitness", hook: "从1分钟开始你的冥想" },
    en: { title: "Meditation", desc: "The science of meditation — from mindful breathing to awakened living", kw: "meditation,mindfulness,focus,stress reduction, #VibeCoding,#EmotionalFitness", hook: "Start your meditation with 1 minute" },
    ms: { title: "Meditasi", desc: "Sains meditasi — dari pernafasan sedar ke kehidupan sedar", kw: "meditasi,kesedaran,fokus, #VibeCoding,#EmotionalFitness", hook: "Mulakan meditasi dengan 1 minit" },
    ja: { title: "瞑想", desc: "瞑想の科学 — マインドフルネス呼吸から覚醒生活へ", kw: "瞑想,マインドフルネス,集中力", hook: "1分から始める瞑想" },
    ko: { title: "명상", desc: "명상의 과학 — 마음챙김 호흡에서 깨어있는 삶까지", kw: "명상,마음챙김,집중력", hook: "1분부터 시작하는 명상" },
    th: { title: "การทำสมาธิ", desc: "วิทยาศาสตร์ของการทำสมาธิ — จากการหายใจอย่างมีสติสู่การใช้ชีวิตอย่างตื่นรู้", kw: "การทำสมาธิ,สติ,การมีสติ", hook: "เริ่มทำสมาธิด้วย 1 นาที" },
    es: { title: "Meditación", desc: "La ciencia de la meditación — desde la respiración consciente hasta la vida despierta", kw: "meditación,atención plena,enfoque, #VibeCoding,#EmotionalFitness", hook: "Empieza tu meditación con 1 minuto" },
  },
  "body-scan": {
    zh: { title: "身体扫描", desc: "身体扫描冥想——从头到脚的深度放松与身心连接实践", kw: "身体扫描,冥想,放松,身心连接,正念, #VibeCoding,#EmotionalFitness", hook: "从头顶到脚尖的释放" },
    en: { title: "Body Scan", desc: "Body scan meditation — deep relaxation and mind-body connection from head to toe", kw: "body scan,meditation,relaxation,mind-body, mindfulness, #VibeCoding,#EmotionalFitness", hook: "Release from head to toe" },
    ms: { title: "Imbasan Badan", desc: "Meditasi imbasan badan — relaksasi mendalam", kw: "imbasan badan,meditasi,relaksasi, #VibeCoding,#EmotionalFitness", hook: "Lepaskan dari kepala ke kaki" },
    ja: { title: "ボディスキャン", desc: "ボディスキャン瞑想 — 頭からつま先までの深いリラックス", kw: "ボディスキャン,瞑想,リラックス", hook: "頭のてっぺんからつま先までの解放" },
    ko: { title: "바디 스캔", desc: "바디 스캔 명상 — 머리부터 발끝까지 깊은 이완", kw: "바디 스캔,명상,이완", hook: "머리끝부터 발끝까지의 해방" },
    th: { title: "การสแกนร่างกาย", desc: "การทำสมาธิสแกนร่างกาย — ผ่อนคลายลึกจากหัวจรดเท้า", kw: "การสแกนร่างกาย,การทำสมาธิ,การผ่อนคลาย", hook: "ปลดปล่อยจากหัวจรดเท้า" },
    es: { title: "Escáner Corporal", desc: "Meditación de escáner corporal — relajación profunda de cabeza a pies", kw: "escáner corporal,meditación,relajación, #VibeCoding,#EmotionalFitness", hook: "Liberación de cabeza a pies" },
  },
  breathwork: {
    zh: { title: "呼吸练习", desc: "呼吸的科学——用呼吸法调节神经系统、缓解焦虑与提升专注", kw: "呼吸练习,呼吸法,腹式呼吸,4-7-8呼吸,减压, #VibeCoding,#EmotionalFitness", hook: "3次呼吸改变你的状态" },
    en: { title: "Breathwork", desc: "The science of breathing — regulate your nervous system, reduce anxiety, and sharpen focus", kw: "breathwork,breathing exercises,pranayama,4-7-8,box breathing, #VibeCoding,#EmotionalFitness", hook: "3 breaths can change your state" },
    ms: { title: "Senaman Pernafasan", desc: "Sains pernafasan — kawal sistem saraf, kurangkan kebimbangan", kw: "senaman pernafasan,teknik pernafasan, #VibeCoding,#EmotionalFitness", hook: "3 nafas boleh ubah keadaan anda" },
    ja: { title: "ブレスワーク", desc: "呼吸の科学 — 神経系を整え不安を軽減", kw: "ブレスワーク,呼吸法,不安軽減", hook: "3回の呼吸で状態が変わる" },
    ko: { title: "호흡 운동", desc: "호흡의 과학 — 신경계 조절, 불안 완화", kw: "호흡 운동,호흡법,불안 완화", hook: "3번의 호흡이 당신의 상태를 바꿉니다" },
    th: { title: "การฝึกหายใจ", desc: "วิทยาศาสตร์ของการหายใจ — ควบคุมระบบประสาท ลดความกังวล", kw: "การฝึกหายใจ,เทคนิคการหายใจ,ลดความกังวล", hook: "3 ลมหายใจเปลี่ยนสภาวะของคุณ" },
    es: { title: "Respiración Consciente", desc: "La ciencia de respirar — regula el sistema nervioso y reduce la ansiedad", kw: "respiración,ansiedad,enfoque, #VibeCoding,#EmotionalFitness", hook: "3 respiraciones cambian tu estado" },
  },
  gratitude: {
    zh: { title: "感恩", desc: "感恩的科学——为什么感恩练习能从根本上改变你的大脑", kw: "感恩,感恩日记,积极心理学,幸福感,心理健康, #VibeCoding,#EmotionalFitness", hook: "每天发现一件好事" },
    en: { title: "Gratitude", desc: "The science of gratitude — how gratitude practice rewires your brain for happiness", kw: "gratitude,gratitude journal,positive psychology,wellbeing, #VibeCoding,#EmotionalFitness", hook: "Find one good thing every day" },
    ms: { title: "Kesyukuran", desc: "Sains kesyukuran — bagaimana amalan bersyukur ubah otak anda", kw: "kesyukuran,jurnal syukur,psikologi positif, #VibeCoding,#EmotionalFitness", hook: "Cari satu perkara baik setiap hari" },
    ja: { title: "感謝", desc: "感謝の科学 — 感謝の実践が脳を変える仕組み", kw: "感謝,感謝日記,ポジティブ心理学", hook: "毎日一つ良いことを見つける" },
    ko: { title: "감사", desc: "감사의 과학 — 감사 실천이 뇌를 바꾸는 방법", kw: "감사,감사 일기,긍정 심리학", hook: "매일 한 가지 좋은 일 찾기" },
    th: { title: "ความกตัญญู", desc: "วิทยาศาสตร์ของความกตัญญู — การฝึกขอบคุณเปลี่ยนแปลงสมอง", kw: "ความกตัญญู,บันทึกความกตัญญู,จิตวิทยาเชิงบวก", hook: "ค้นหาสิ่งดีๆ หนึ่งอย่างทุกวัน" },
    es: { title: "Gratitud", desc: "La ciencia de la gratitud — cómo la práctica de agradecer cambia tu cerebro", kw: "gratitud,diario de gratitud,psicología positiva, #VibeCoding,#EmotionalFitness", hook: "Encuentra algo bueno cada día" },
  },
  journaling: {
    zh: { title: "日记写作", desc: "写日记的心理疗愈力量——从情绪宣泄到自我洞察的写作指南", kw: "日记写作,情绪写作,心理疗愈,自我探索,反思, #VibeCoding,#EmotionalFitness", hook: "把混乱写成故事" },
    en: { title: "Journaling", desc: "The therapeutic power of writing — from emotional release to self-discovery", kw: "journaling,expressive writing,therapeutic writing,self-reflection, #VibeCoding,#EmotionalFitness", hook: "Turn chaos into a story" },
    ms: { title: "Menulis Jurnal", desc: "Kuasa terapeutik menulis — dari pelepasan emosi ke penemuan diri", kw: "menulis jurnal,penulisan ekspresif,refleksi diri, #VibeCoding,#EmotionalFitness", hook: "Ubah kekacauan menjadi cerita" },
    ja: { title: "ジャーナリング", desc: "書くことの心理的癒しの力 — 感情解放から自己洞察へ", kw: "ジャーナリング,表現的筆記,心理療法", hook: "混沌を物語に変える" },
    ko: { title: "저널링", desc: "글쓰기의 심리 치유력 — 감정 해소에서 자기 통찰까지", kw: "저널링,표현적 글쓰기,심리 치유", hook: "혼란을 이야기로 바꾸다" },
    th: { title: "การเขียนบันทึก", desc: "พลังการรักษาของการเขียน — จากการปลดปล่อยอารมณ์สู่การค้นพบตนเอง", kw: "การเขียนบันทึก,การเขียนบำบัด,การสะท้อนตนเอง", hook: "เปลี่ยนความวุ่นวายเป็นเรื่องราว" },
    es: { title: "Escritura Terapéutica", desc: "El poder terapéutico de escribir — de la liberación emocional al autodescubrimiento", kw: "escritura terapéutica,diario,autodescubrimiento, #VibeCoding,#EmotionalFitness", hook: "Convierte el caos en historia" },
  },
  "anger-management": {
    zh: { title: "愤怒管理", desc: "理解愤怒背后的信号——如何健康地表达和处理愤怒情绪", kw: "愤怒管理,愤怒,情绪控制,宣泄,冷静, #VibeCoding,#EmotionalFitness", hook: "愤怒是你的警报系统" },
    en: { title: "Anger Management", desc: "Understanding the signal behind anger — how to express and process it healthily", kw: "anger management,anger,emotional control,frustration, #VibeCoding,#EmotionalFitness", hook: "Anger is your alarm system" },
    ms: { title: "Pengurusan Kemarahan", desc: "Memahami isyarat di sebalik kemarahan", kw: "pengurusan kemarahan,emosi, kawalan diri, #VibeCoding,#EmotionalFitness", hook: "Kemarahan adalah sistem penggera anda" },
    ja: { title: "アンガーマネジメント", desc: "怒りの背後にあるシグナルを理解する", kw: "アンガーマネジメント,怒り,感情コントロール", hook: "怒りはあなたの警報システム" },
    ko: { title: "분노 관리", desc: "분노 뒤의 신호 이해하기 — 건강한 표현과 처리", kw: "분노 관리,분노,감정 조절", hook: "분노는 당신의 경보 시스템입니다" },
    th: { title: "การจัดการความโกรธ", desc: "เข้าใจสัญญาณเบื้องหลังความโกรธ — การแสดงออกอย่าง healthy", kw: "การจัดการความโกรธ,ความโกรธ,การควบคุมอารมณ์", hook: "ความโกรธคือระบบสัญญาณเตือนของคุณ" },
    es: { title: "Manejo de la Ira", desc: "Entendiendo la señal detrás del enojo — cómo expresarlo saludablemente", kw: "manejo de la ira,enojo,control emocional, #VibeCoding,#EmotionalFitness", hook: "La ira es tu sistema de alarma" },
  },
  "emotional-regulation": {
    zh: { title: "情绪调节", desc: "情绪是信使不是敌人——科学调节情绪的完整工具箱", kw: "情绪调节,情绪管理,情绪智力,情商,心理健康, #VibeCoding,#EmotionalFitness", hook: "情绪不是你的敌人" },
    en: { title: "Emotional Regulation", desc: "Emotions are messengers, not enemies — a complete toolkit for regulating your feelings", kw: "emotional regulation,emotion management,EQ,mental health, #VibeCoding,#EmotionalFitness", hook: "Emotions are not your enemy" },
    ms: { title: "Regulasi Emosi", desc: "Emosi adalah utusan, bukan musuh — toolkit kawal emosi", kw: "regulasi emosi,pengurusan emosi,kesihatan mental, #VibeCoding,#EmotionalFitness", hook: "Emosi bukan musuh anda" },
    ja: { title: "感情調節", desc: "感情は敵ではなく伝令 — 科学的感情調節ツールキット", kw: "感情調節,感情管理,感情的知性", hook: "感情はあなたの敵ではない" },
    ko: { title: "감정 조절", desc: "감정은 적이 아닌 전령 — 과학적 감정 조절 도구", kw: "감정 조절,감정 관리,정서 지능", hook: "감정은 당신의 적이 아닙니다" },
    th: { title: "การควบคุมอารมณ์", desc: "อารมณ์คือผู้ส่งสาร ไม่ใช่ศัตรู — ชุดเครื่องมือควบคุมอารมณ์", kw: "การควบคุมอารมณ์,การจัดการอารมณ์,สุขภาพจิต", hook: "อารมณ์ไม่ใช่ศัตรูของคุณ" },
    es: { title: "Regulación Emocional", desc: "Las emociones son mensajeras, no enemigas — herramientas para regularlas", kw: "regulación emocional,gestión emocional,salud mental, #VibeCoding,#EmotionalFitness", hook: "Las emociones no son tu enemigo" },
  },
  "mood-tracking": {
    zh: { title: "情绪追踪", desc: "用数据了解你的情绪模式——情绪追踪的科学方法与工具", kw: "情绪追踪,心情记录,情绪数据,自我觉察,模式识别, #VibeCoding,#EmotionalFitness", hook: "看懂你的情绪天气" },
    en: { title: "Mood Tracking", desc: "Understanding your emotional patterns through data — science-backed mood tracking", kw: "mood tracking,emotion logging,self-awareness,patterns, #VibeCoding,#EmotionalFitness", hook: "Read your emotional weather" },
    ms: { title: "Penjejakan Mood", desc: "Fahami corak emosi melalui data — penjejakan mood saintifik", kw: "penjejakan mood,log emosi,kesedaran diri, #VibeCoding,#EmotionalFitness", hook: "Baca cuaca emosi anda" },
    ja: { title: "ムードトラッキング", desc: "データで感情パターンを理解する — 科学的ムード記録", kw: "ムードトラッキング,気分記録,自己認識", hook: "あなたの感情の天気を読む" },
    ko: { title: "무드 트래킹", desc: "데이터로 감정 패턴 이해하기 — 과학적 무드 트래킹", kw: "무드 트래킹,감정 기록,자기 인식", hook: "당신의 감정 날씨를 읽으세요" },
    th: { title: "การติดตามอารมณ์", desc: "เข้าใจรูปแบบอารมณ์ผ่านข้อมูล — การติดตามอารมณ์ทางวิทยาศาสตร์", kw: "การติดตามอารมณ์,การบันทึกอารมณ์,การตระหนักรู้ตนเอง", hook: "อ่านสภาพอากาศทางอารมณ์ของคุณ" },
    es: { title: "Seguimiento del Estado de Ánimo", desc: "Comprendiendo patrones emocionales con datos — seguimiento científico", kw: "seguimiento del estado de ánimo,autoconciencia, #VibeCoding,#EmotionalFitness", hook: "Lee tu clima emocional" },
  },
  burnout: {
    zh: { title: "职业倦怠", desc: "不是累了是倦了——识别、预防和走出职业倦怠的完整指南", kw: "职业倦怠,过劳,工作压力,精疲力竭,恢复, #VibeCoding,#EmotionalFitness", hook: "不是累了，是枯竭了" },
    en: { title: "Burnout", desc: "Not just tired — depleted. A complete guide to recognizing, preventing, and recovering from burnout", kw: "burnout,exhaustion,work stress,depletion,recovery, #VibeCoding,#EmotionalFitness", hook: "Not tired, depleted" },
    ms: { title: "Burnout", desc: "Bukan sekadar letih — lesu. Panduan kenali, cegah dan pulih", kw: "burnout,keletihan,tekanan kerja, #VibeCoding,#EmotionalFitness", hook: "Bukan letih, lesu" },
    ja: { title: "バーンアウト", desc: "疲れただけじゃない — 燃え尽き症候群の認識と回復", kw: "バーンアウト,過労,仕事のストレス", hook: "疲れただけじゃない、枯渇した" },
    ko: { title: "번아웃", desc: "피곤한 게 아니라 지친 것 — 번아웃 인식, 예방, 회복", kw: "번아웃,소진,직무 스트레스", hook: "피곤한 게 아니라 고갈된 것" },
    th: { title: "ภาวะหมดไฟ", desc: "ไม่ใช่แค่เหนื่อย — หมดพลัง คู่มือรู้จัก ป้องกัน ฟื้นฟู", kw: "ภาวะหมดไฟ,ความเหนื่อยล้า,ความเครียดจากการทำงาน", hook: "ไม่ใช่แค่เหนื่อย แต่หมดพลัง" },
    es: { title: "Agotamiento Laboral", desc: "No solo cansado — agotado. Guía para reconocer, prevenir y recuperarse", kw: "agotamiento laboral,estrés laboral,recuperación, #VibeCoding,#EmotionalFitness", hook: "No solo cansado, agotado" },
  },
  resilience: {
    zh: { title: "心理韧性", desc: "心理韧性的科学——如何在逆境中成长、在压力下茁壮", kw: "心理韧性,抗逆力,逆境成长,心理弹性,坚强, #VibeCoding,#EmotionalFitness", hook: "在风暴中学会弯曲" },
    en: { title: "Resilience", desc: "The science of psychological resilience — how to grow through adversity and thrive under pressure", kw: "resilience,mental toughness,adversity,grit,post-traumatic growth, #VibeCoding,#EmotionalFitness", hook: "Learn to bend in the storm" },
    ms: { title: "Ketahanan Mental", desc: "Sains ketahanan mental — tumbuh melalui cabaran", kw: "ketahanan mental,adversiti,pertumbuhan, #VibeCoding,#EmotionalFitness", hook: "Belajar melentur dalam badai" },
    ja: { title: "レジリエンス", desc: "心理的レジリエンスの科学 — 逆境の中で成長する", kw: "レジリエンス,精神的回復力,逆境成長", hook: "嵐の中でしなることを学ぶ" },
    ko: { title: "회복탄력성", desc: "심리적 회복탄력성의 과학 — 역경 속에서 성장", kw: "회복탄력성,멘탈 강인함,역경 극복", hook: "폭풍 속에서 휘어지는 법을 배우다" },
    th: { title: "ความยืดหยุ่นทางจิตใจ", desc: "วิทยาศาสตร์ของความยืดหยุ่นทางจิตใจ — เติบโตผ่านความทุกข์", kw: "ความยืดหยุ่นทางจิตใจ,การเติบโตผ่านความทุกข์", hook: "เรียนรู้ที่จะโค้งงอในพายุ" },
    es: { title: "Resiliencia", desc: "La ciencia de la resiliencia psicológica — crecer a través de la adversidad", kw: "resiliencia,fortaleza mental,crecimiento, #VibeCoding,#EmotionalFitness", hook: "Aprende a doblarte en la tormenta" },
  },
  anxiety_depression: {
    zh: { title: "焦虑与抑郁", desc: "焦虑和抑郁常常共生——理解两者的联系、区别和协同应对策略", kw: "焦虑,抑郁,共病,情绪障碍,心理健康, #VibeCoding,#EmotionalFitness", hook: "你不是脆弱，你在抗争" },
    en: { title: "Anxiety & Depression", desc: "Anxiety and depression often co-occur — understand their connection, differences, and integrated coping strategies", kw: "anxiety,depression,comorbidity,mood disorders,mental health, #VibeCoding,#EmotionalFitness", hook: "You're not weak, you're fighting" },
    ms: { title: "Kebimbangan & Kemurungan", desc: "Kebimbangan dan kemurungan sering berlaku bersama — fahami hubungan dan strategi mengatasi", kw: "kebimbangan,kemurungan,kesihatan mental, #VibeCoding,#EmotionalFitness", hook: "Anda tidak lemah, anda sedang berjuang" },
    ja: { title: "不安とうつ", desc: "不安とうつはしばしば共存する——その関連性と統合的対処法を理解する", kw: "不安,うつ,併存,メンタルヘルス", hook: "あなたは弱くない、戦っている" },
    ko: { title: "불안과 우울", desc: "불안과 우울은 자주 함께 나타납니다 — 연결고리와 통합 대처 전략 이해하기", kw: "불안,우울,공존,정신 건강", hook: "당신은 약한 것이 아닙니다, 싸우고 있는 것입니다" },
    th: { title: "ความวิตกกังวลและภาวะซึมเศร้า", desc: "ความวิตกกังวลและภาวะซึมเศร้ามักเกิดขึ้นร่วมกัน — ทำความเข้าใจความเชื่อมโยงและวิธีรับมือ", kw: "ความวิตกกังวล,ภาวะซึมเศร้า,สุขภาพจิต", hook: "คุณไม่ได้อ่อนแอ คุณกำลังสู้" },
    es: { title: "Ansiedad y Depresión", desc: "La ansiedad y la depresión a menudo coexisten — comprende su conexión y estrategias integradas de afrontamiento", kw: "ansiedad,depresión,salud mental, #VibeCoding,#EmotionalFitness", hook: "No eres débil, estás luchando" },
  },
  stress_management: {
    zh: { title: "压力管理", desc: "基于生物-心理-社会模型的科学压力管理——从神经科学到日常实践", kw: "压力管理,皮质醇,压力应对,放松技巧,心理健康, #VibeCoding,#EmotionalFitness", hook: "管理压力而非逃避" },
    en: { title: "Stress Management", desc: "Science-based stress management through the biopsychosocial model — from neuroscience to daily practice", kw: "stress management,cortisol,coping,relaxation,mental health, #VibeCoding,#EmotionalFitness", hook: "Manage stress, don't escape it" },
    ms: { title: "Pengurusan Stres", desc: "Pengurusan stres berasaskan sains — daripada neurosains kepada amalan harian", kw: "pengurusan stres,kortisol,relaksasi, #VibeCoding,#EmotionalFitness", hook: "Urus stres, jangan lari darinya" },
    ja: { title: "ストレス管理", desc: "生物心理社会モデルに基づく科学的ストレス管理——神経科学から日常実践まで", kw: "ストレス管理,コルチゾール,リラクゼーション", hook: "ストレスを管理し、逃げない" },
    ko: { title: "스트레스 관리", desc: "생물심리사회 모델 기반 과학적 스트레스 관리 — 신경과학부터 일상 실천까지", kw: "스트레스 관리,코르티솔,이완 기법", hook: "스트레스를 관리하세요, 도망가지 마세요" },
    th: { title: "การจัดการความเครียด", desc: "การจัดการความเครียดด้วยวิทยาศาสตร์ — จากประสาทวิทยาศาสตร์สู่การปฏิบัติประจำวัน", kw: "การจัดการความเครียด,คอร์ติซอล,การผ่อนคลาย", hook: "จัดการความเครียด อย่าหนีจากมัน" },
    es: { title: "Manejo del Estrés", desc: "Manejo del estrés basado en ciencia — desde la neurociencia hasta la práctica diaria", kw: "manejo del estrés,cortisol,relajación, #VibeCoding,#EmotionalFitness", hook: "Maneja el estrés, no huyas de él" },
  },
  circadian_rhythm_deep: {
    zh: { title: "昼夜节律深度", desc: "你的内在时钟如何掌控一切——从基因表达到情绪波动的昼夜节律科学", kw: "昼夜节律,生物钟,睡眠周期,褪黑素,健康, #VibeCoding,#EmotionalFitness", hook: "你的身体知道什么时间该做什么" },
    en: { title: "Circadian Rhythm Deep Dive", desc: "How your internal clock governs everything — from gene expression to mood swings, the full science of circadian rhythms", kw: "circadian rhythm,biological clock,sleep cycle,melatonin,health, #VibeCoding,#EmotionalFitness", hook: "Your body knows when to do what" },
    ms: { title: "Irama Sirkadian Mendalam", desc: "Bagaimana jam dalaman anda mengawal segalanya — daripada ekspresi gen hingga perubahan mood", kw: "irama sirkadian,biologi tidur,melatonin, #VibeCoding,#EmotionalFitness", hook: "Tubuh anda tahu bila perlu buat apa" },
    ja: { title: "サーカディアンリズム深掘り", desc: "体内時計がすべてを支配する——遺伝子発現から気分変動までの科学", kw: "サーカディアンリズム,体内時計,メラトニン", hook: "あなたの身体は何をすべきか知っている" },
    ko: { title: "서카디안 리듬 심층", desc: "당신의 내부 시계가 모든 것을 지배한다 — 유전자 발현부터 기분 변화까지", kw: "서카디안 리듬,생체 시계,멜라토닌", hook: "당신의 몸은 언제 무엇을 해야 하는지 압니다" },
    th: { title: "จังหวะเซอร์คาเดียนเชิงลึก", desc: "นาฬิกาภายในของคุณควบคุมทุกอย่าง — จากยีนสู่ความผันผวนทางอารมณ์", kw: "จังหวะเซอร์คาเดียน,นาฬิกาชีวภาพ,เมลาโทนิน", hook: "ร่างกายของคุณรู้ว่าควรทำอะไรเมื่อไหร่" },
    es: { title: "Ritmo Circadiano en Profundidad", desc: "Cómo tu reloj interno lo gobierna todo — de la expresión génica a los cambios de humor", kw: "ritmo circadiano,reloj biológico,melatonina, #VibeCoding,#EmotionalFitness", hook: "Tu cuerpo sabe cuándo hacer qué" },
  },
  polyvagal_emotion: {
    zh: { title: "多迷走神经情绪调节", desc: "用多迷走神经理论理解你的神经系统——从生存模式到社会连接的神经通路", kw: "多迷走神经理论,情绪调节,神经系统,迷走神经,安全感, #VibeCoding,#EmotionalFitness", hook: "你的神经系统在保护你" },
    en: { title: "Polyvagal Emotion Regulation", desc: "Understand your nervous system through polyvagal theory — neural pathways from survival mode to social connection", kw: "polyvagal theory,emotion regulation,nervous system,vagus nerve,safety, #VibeCoding,#EmotionalFitness", hook: "Your nervous system is protecting you" },
    ms: { title: "Peraturan Emosi Polivagal", desc: "Fahami sistem saraf anda melalui teori polivagal — dari mod survival ke hubungan sosial", kw: "teori polivagal,peraturan emosi,saraf vagus, #VibeCoding,#EmotionalFitness", hook: "Sistem saraf anda melindungi anda" },
    ja: { title: "ポリヴェーガル感情調節", desc: "ポリヴェーガル理論で神経系を理解する——生存モードから社会的つながりへの神経経路", kw: "ポリヴェーガル理論,感情調節,迷走神経", hook: "あなたの神経系が守っている" },
    ko: { title: "폴리베이걸 감정 조절", desc: "폴리베이걸 이론으로 신경계 이해하기 — 생존 모드에서 사회적 연결까지", kw: "폴리베이걸 이론,감정 조절,미주 신경", hook: "당신의 신경계가 당신을 보호하고 있습니다" },
    th: { title: "การควบคุมอารมณ์แบบพอลีเวเกิล", desc: "ทำความเข้าใจระบบประสาทผ่านทฤษฎีพอลีเวเกิล — จากโหมดเอาชีวิตรอดสู่การเชื่อมต่อทางสังคม", kw: "ทฤษฎีพอลีเวเกิล,การควบคุมอารมณ์,เส้นประสาทเวกัส", hook: "ระบบประสาทของคุณกำลังปกป้องคุณ" },
    es: { title: "Regulación Emocional Polivagal", desc: "Comprende tu sistema nervioso a través de la teoría polivagal — de la supervivencia a la conexión social", kw: "teoría polivagal,regulación emocional,nervio vago, #VibeCoding,#EmotionalFitness", hook: "Tu sistema nervioso te protege" },
  },
  neural_meditation: {
    zh: { title: "冥想的神经机制", desc: "冥想时你的大脑在发生什么——从默认模式网络到神经可塑性的完整科学解析", kw: "冥想,神经可塑性,默认模式网络,脑电波,正念, #VibeCoding,#EmotionalFitness", hook: "冥想时你的大脑在做什么" },
    en: { title: "Neural Mechanisms of Meditation", desc: "What happens in your brain during meditation — from the default mode network to neuroplasticity, the full science", kw: "meditation,neuroplasticity,default mode network,brain waves,mindfulness, #VibeCoding,#EmotionalFitness", hook: "What your brain does during meditation" },
    ms: { title: "Mekanisme Neural Meditasi", desc: "Apa yang berlaku dalam otak semasa meditasi — dari rangkaian mod lalai kepada neuroplastisitas", kw: "meditasi,neuroplastisitas,kesedaran, #VibeCoding,#EmotionalFitness", hook: "Apa yang otak anda lakukan semasa meditasi" },
    ja: { title: "瞑想の神経メカニズム", desc: "瞑想中に脳で何が起きているか——デフォルトモードネットワークから神経可塑性まで", kw: "瞑想,神経可塑性,デフォルトモードネットワーク", hook: "瞑想中にあなたの脳は何をしているか" },
    ko: { title: "명상의 신경 메커니즘", desc: "명상 중 뇌에서 무슨 일이 일어날까 — 기본 모드 네트워크부터 신경가소성까지", kw: "명상,신경가소성,기본 모드 네트워크", hook: "명상 중 당신의 뇌는 무엇을 하고 있을까" },
    th: { title: "กลไกทางประสาทของการทำสมาธิ", desc: "เกิดอะไรขึ้นในสมองระหว่างทำสมาธิ — จากเครือข่ายดีฟอลต์โหมดถึงความยืดหยุ่นของสมอง", kw: "การทำสมาธิ,ความยืดหยุ่นของสมอง,คลื่นสมอง", hook: "สมองของคุณทำอะไรระหว่างทำสมาธิ" },
    es: { title: "Mecanismos Neurales de la Meditación", desc: "Qué sucede en tu cerebro durante la meditación — de la red de modo predeterminado a la neuroplasticidad", kw: "meditación,neuroplasticidad,red de modo predeterminado, #VibeCoding,#EmotionalFitness", hook: "Lo que tu cerebro hace durante la meditación" },
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
      hook: data.hook,
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
    hook: data.hook,
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
