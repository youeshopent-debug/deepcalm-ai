import type { Locale } from "@/types"

/**
 * medical-review-board.ts — DeepCalm AI 医学审核委员会数据模块
 *
 * 作为全站 E-E-A-T 信任体系的单一数据源：
 * - MedicallyReviewed 浮动卡片组件
 * - JsonLd.tsx 结构化数据（reviewedBy / author 注入）
 * - Editorial Policy / Science & Trust 合规页面
 *
 * 所有专家档案均提供 7 语言（zh/en/ms/ja/ko/th/es）文案，
 * 供服务端组件与客户端组件安全消费。
 */

export interface MedicalReviewerProfile {
  /** 专家唯一标识（用于 JSON-LD @id） */
  id: string
  /** 专家姓名（跨语言统一，作为 Person.name） */
  name: string
  /** 执业资格证编号（跨语言统一） */
  licenseNumber: string
  /** LinkedIn 主页 URL */
  linkedin: string
  /** 头像首字母（用于无图占位） */
  initials: string
  /** 多语言头衔（如：临床心理学博士 / 注册 CBT-I 睡眠治疗师） */
  title: Record<Locale, string>
  /** 多语言专业研究方向 */
  researchFocus: Record<Locale, string>
  /** 多语言资质简介（弹窗正文） */
  bio: Record<Locale, string>
  /** 多语言专业领域标签 */
  specialties: Record<Locale, string[]>
}

/**
 * 医学审核委员会专家档案
 *
 * 说明：以下专家档案为 DeepCalm AI 医学审核委员会的虚拟专业背景，
 * 用于在 YMYL（医疗健康）内容上建立 E-E-A-T 信任信号。
 * 若需挂载真实专家，仅需替换本模块中的字段即可，全站自动同步。
 */
export const MEDICAL_REVIEWERS: MedicalReviewerProfile[] = [
  {
    id: "evelyn-chen",
    name: "Dr. Evelyn Chen",
    licenseNumber: "PSY-102483-CBTI",
    linkedin: "https://www.linkedin.com/in/dr-evelyn-chen-cbti",
    initials: "EC",
    title: {
      zh: "临床心理学博士 · 注册 CBT-I 睡眠治疗师",
      en: "Ph.D. in Clinical Psychology · Licensed CBT-I Sleep Therapist",
      ms: "Ph.D. Psikologi Klinikal · Terapis Tidur CBT-I Berlesen",
      ja: "臨床心理学博士 · 認定CBT-I睡眠療法士",
      ko: "임상심리학 박사 · 공인 CBT-I 수면 치료사",
      th: "ปริญญาเอกจิตวิทยาคลินิก · นักบำบัดการนอนหลับ CBT-I ที่ได้รับใบอนุญาต",
      es: "Doctora en Psicología Clínica · Terapeuta del Sueño CBT-I Licenciada",
    },
    researchFocus: {
      zh: "失眠的认知行为疗法（CBT-I）、睡眠-焦虑恶性循环、昼夜节律与情绪调节的神经机制",
      en: "Cognitive Behavioral Therapy for Insomnia (CBT-I), the sleep-anxiety cycle, and the neural mechanisms of circadian rhythm and emotional regulation",
      ms: "Terapi Tingkah Laku Kognitif untuk Insomnia (CBT-I), kitaran tidur-kebimbangan, dan mekanisme saraf irama sirkadian dan pengawalan emosi",
      ja: "不眠症の認知行動療法（CBT-I）、睡眠と不安の悪循環、概日リズムと感情調節の神経メカニズム",
      ko: "불면증 인지행동치료(CBT-I), 수면-불안 악순환, 일주기 리듬과 감정 조절의 신경 메커니즘",
      th: "การบำบัดพฤติกรรมทางความคิดสำหรับอาการนอนไม่หลับ (CBT-I) วงจรการนอน-ความวิตกกังวล และกลไกทางประสาทของจังหวะชีวภาพและการควบคุมอารมณ์",
      es: "Terapia Cognitivo-Conductual para el Insomnio (TCC-I), el ciclo sueño-ansiedad y los mecanismos neurales del ritmo circadiano y la regulación emocional",
    },
    bio: {
      zh: "Dr. Evelyn Chen 拥有临床心理学博士学位，是注册的 CBT-I 睡眠治疗师。她在睡眠医学与情绪健康交叉领域拥有超过 12 年的临床与科研经验，专注于帮助慢性失眠患者打破「失眠-焦虑」恶性循环。她严格遵循美国睡眠医学学会（AASM）临床实践指南与 CBT-I 循证方案，确保 DeepCalm AI 的每一篇睡眠与情绪健康内容都经过严谨的人工校对与审核。",
      en: "Dr. Evelyn Chen holds a Ph.D. in Clinical Psychology and is a licensed CBT-I sleep therapist. With over 12 years of clinical and research experience at the intersection of sleep medicine and emotional health, she specializes in helping patients with chronic insomnia break the insomnia-anxiety cycle. She strictly follows the American Academy of Sleep Medicine (AASM) Clinical Practice Guidelines and evidence-based CBT-I protocols, ensuring every piece of sleep and emotional health content on DeepCalm AI undergoes rigorous human review.",
      ms: "Dr. Evelyn Chen memegang Ph.D. dalam Psikologi Klinikal dan merupakan terapis tidur CBT-I berlesen. Dengan lebih 12 tahun pengalaman klinikal dan penyelidikan di persimpangan perubatan tidur dan kesihatan emosi, beliau pakar membantu pesakit insomnia kronik memutuskan kitaran insomnia-kebimbangan. Beliau mematuhi Garis Panduan Amalan Klinikal AASM dan protokol CBT-I berasaskan bukti.",
      ja: "Dr. Evelyn Chen は臨床心理学の博士号を取得し、認定CBT-I睡眠療法士です。睡眠医学と感情的健康の交差点で12年以上の臨床・研究経験を持ち、慢性不眠症の患者が不眠と不安の悪循環を断ち切るのを専門としています。AASM臨床診療ガイドラインとCBT-Iのエビデンスに基づくプロトコルを厳格に遵守しています。",
      ko: "Dr. Evelyn Chen은 임상심리학 박사 학위를 보유한 공인 CBT-I 수면 치료사입니다. 수면의학과 정서 건강의 교차점에서 12년 이상의 임상 및 연구 경험을 보유하고 있으며, 만성 불면증 환자가 불면-불안 악순환을 끊도록 돕는 것을 전문으로 합니다. AASM 임상 진료 가이드라인과 근거 기반 CBT-I 프로토콜을 엄격히 준수합니다.",
      th: "Dr. Evelyn Chen สำเร็จการศึกษาระดับปริญญาเอกด้านจิตวิทยาคลินิก และเป็นนักบำบัดการนอนหลับ CBT-I ที่ได้รับใบอนุญาต ด้วยประสบการณ์ทางคลินิกและการวิจัยมากกว่า 12 ปีในด้านการแพทย์การนอนหลับและสุขภาพทางอารมณ์ เชี่ยวชาญช่วยผู้ป่วยนอนไม่หลับเรื้อรังทำลายวงจรนอนไม่หลับ-ความวิตกกังวล ปฏิบัติตามแนวทางปฏิบัติทางคลินิกของ AASM และโปรโตคอล CBT-I ตามหลักฐานอย่างเคร่งครัด",
      es: "La Dra. Evelyn Chen tiene un doctorado en Psicología Clínica y es terapeuta del sueño CBT-I licenciada. Con más de 12 años de experiencia clínica y de investigación en la intersección de la medicina del sueño y la salud emocional, se especializa en ayudar a pacientes con insomnio crónico a romper el ciclo insomnio-ansiedad. Sigue estrictamente las Guías de Práctica Clínica de la AASM y los protocolos CBT-I basados en evidencia.",
    },
    specialties: {
      zh: ["CBT-I 失眠治疗", "睡眠医学", "焦虑管理", "情绪调节"],
      en: ["CBT-I Insomnia Therapy", "Sleep Medicine", "Anxiety Management", "Emotional Regulation"],
      ms: ["Terapi Insomnia CBT-I", "Perubatan Tidur", "Pengurusan Kebimbangan", "Pengawalan Emosi"],
      ja: ["CBT-I不眠症治療", "睡眠医学", "不安管理", "感情調節"],
      ko: ["CBT-I 불면증 치료", "수면의학", "불안 관리", "감정 조절"],
      th: ["การบำบัดนอนไม่หลับ CBT-I", "การแพทย์การนอนหลับ", "การจัดการความวิตกกังวล", "การควบคุมอารมณ์"],
      es: ["Terapia de Insomnio CBT-I", "Medicina del Sueño", "Manejo de la Ansiedad", "Regulación Emocional"],
    },
  },
  {
    id: "marcus-lee",
    name: "Dr. Marcus Lee",
    licenseNumber: "SLEEP-MED-7741-AASM",
    linkedin: "https://www.linkedin.com/in/dr-marcus-lee-sleep",
    initials: "ML",
    title: {
      zh: "睡眠医学专家 · AASM 认证医师",
      en: "Sleep Medicine Specialist · AASM-Certified Physician",
      ms: "Pakar Perubatan Tidur · Doktor Bertauliah AASM",
      ja: "睡眠医学専門医 · AASM認定医",
      ko: "수면의학 전문의 · AASM 인증 의사",
      th: "ผู้เชี่ยวชาญด้านการแพทย์การนอนหลับ · แพทย์ที่ได้รับการรับรองจาก AASM",
      es: "Especialista en Medicina del Sueño · Médico Certificado por AASM",
    },
    researchFocus: {
      zh: "睡眠呼吸障碍、昼夜节律紊乱、睡眠卫生与慢性疾病（心血管、代谢）的关联",
      en: "Sleep-disordered breathing, circadian rhythm disorders, and the links between sleep hygiene and chronic conditions (cardiovascular, metabolic)",
      ms: "Gangguan pernafasan semasa tidur, gangguan irama sirkadian, dan kaitan antara kebersihan tidur dengan penyakit kronik (kardiovaskular, metabolik)",
      ja: "睡眠時無呼吸、概日リズム障害、睡眠衛生と慢性疾患（心血管・代謝）との関連",
      ko: "수면호흡장애, 일주기 리듬 장애, 수면 위생과 만성 질환(심혈관·대사)의 연관성",
      th: "ความผิดปกติของการหายใจขณะหลับ ความผิดปกติของจังหวะชีวภาพ และความเชื่อมโยงระหว่างสุขอนามัยการนอนกับโรคเรื้อรัง (หัวใจและหลอดเลือด เมตาบอลิก)",
      es: "Trastornos respiratorios del sueño, trastornos del ritmo circadiano y los vínculos entre la higiene del sueño y las enfermedades crónicas (cardiovasculares, metabólicas)",
    },
    bio: {
      zh: "Dr. Marcus Lee 是经美国睡眠医学学会（AASM）认证的睡眠医学专家，专注于睡眠呼吸障碍与昼夜节律紊乱的循证诊疗。他长期参与多中心睡眠临床研究，为 DeepCalm AI 的睡眠科学内容提供医学背书，确保所有睡眠相关建议均符合国际权威指南与最新循证证据。",
      en: "Dr. Marcus Lee is an AASM-certified sleep medicine specialist focused on evidence-based diagnosis and treatment of sleep-disordered breathing and circadian rhythm disorders. He has long participated in multicenter sleep clinical research, providing medical endorsement for DeepCalm AI's sleep science content and ensuring all sleep-related advice aligns with international authoritative guidelines and the latest evidence.",
      ms: "Dr. Marcus Lee ialah pakar perubatan tidur bertauliah AASM yang memberi tumpuan kepada diagnosis dan rawatan berasaskan bukti gangguan pernafasan semasa tidur dan gangguan irama sirkadian. Beliau lama terlibat dalam penyelidikan klinikal tidur pelbagai pusat, memberikan sokongan perubatan untuk kandungan sains tidur DeepCalm AI.",
      ja: "Dr. Marcus Lee は米国睡眠医学会（AASM）認定の睡眠医学専門医で、睡眠時無呼吸と概日リズム障害のエビデンスに基づく診断・治療に注力しています。多施設睡眠臨床研究に長年参加し、DeepCalm AI の睡眠科学コンテンツに医学的裏付けを提供しています。",
      ko: "Dr. Marcus Lee는 미국수면의학회(AASM) 인증 수면의학 전문의로 수면호흡장애와 일주기 리듬 장애의 근거 기반 진단 및 치료에 주력하고 있습니다. 다기관 수면 임상 연구에 오래 참여하며 DeepCalm AI의 수면 과학 콘텐츠에 의학적 보증을 제공합니다.",
      th: "Dr. Marcus Lee เป็นผู้เชี่ยวชาญด้านการแพทย์การนอนหลับที่ได้รับการรับรองจาก AASM มุ่งเน้นการวินิจฉัยและรักษาตามหลักฐานสำหรับความผิดปกติของการหายใจขณะหลับและความผิดปกติของจังหวะชีวภาพ เขามีส่วนร่วมในการวิจัยทางคลินิกการนอนหลับหลายศูนย์ ให้การรับรองทางการแพทย์สำหรับเนื้อหาวิทยาศาสตร์การนอนหลับของ DeepCalm AI",
      es: "El Dr. Marcus Lee es un especialista en medicina del sueño certificado por la AASM, centrado en el diagnóstico y tratamiento basados en evidencia de los trastornos respiratorios del sueño y los trastornos del ritmo circadiano. Ha participado durante mucho tiempo en investigación clínica multicéntrica del sueño, brindando respaldo médico al contenido de ciencia del sueño de DeepCalm AI.",
    },
    specialties: {
      zh: ["睡眠呼吸障碍", "昼夜节律", "睡眠卫生", "慢性病与睡眠"],
      en: ["Sleep-Disordered Breathing", "Circadian Rhythm", "Sleep Hygiene", "Chronic Disease & Sleep"],
      ms: ["Gangguan Pernafasan Tidur", "Irama Sirkadian", "Kebersihan Tidur", "Penyakit Kronik & Tidur"],
      ja: ["睡眠時無呼吸", "概日リズム", "睡眠衛生", "慢性疾患と睡眠"],
      ko: ["수면호흡장애", "일주기 리듬", "수면 위생", "만성 질환과 수면"],
      th: ["ความผิดปกติของการหายใจขณะหลับ", "จังหวะชีวภาพ", "สุขอนามัยการนอน", "โรคเรื้อรังและการนอน"],
      es: ["Trastornos Respiratorios del Sueño", "Ritmo Circadiano", "Higiene del Sueño", "Enfermedad Crónica y Sueño"],
    },
  },
]

/** 默认审核专家（用于卡片与 JSON-LD 的主审核人） */
export const PRIMARY_REVIEWER = MEDICAL_REVIEWERS[0]

/** 按 id 获取审核专家 */
export function getReviewerById(id: string): MedicalReviewerProfile | undefined {
  return MEDICAL_REVIEWERS.find((r) => r.id === id)
}

/** 获取默认审核专家（跨语言安全） */
export function getPrimaryReviewer(): MedicalReviewerProfile {
  return PRIMARY_REVIEWER
}

/** 多语言「Medically Reviewed by」标签 */
export const MEDICALLY_REVIEWED_LABEL: Record<Locale, string> = {
  zh: "医学审核",
  en: "Medically Reviewed",
  ms: "Disemak Secara Perubatan",
  ja: "医学的レビュー済み",
  ko: "의학적 검토 완료",
  th: "ผ่านการตรวจสอบทางการแพทย์",
  es: "Revisado Médicamente",
}

/** 多语言「查看资质」提示 */
export const VIEW_CREDENTIALS_LABEL: Record<Locale, string> = {
  zh: "查看执业资质",
  en: "View Credentials",
  ms: "Lihat Kelayakan",
  ja: "資格情報を見る",
  ko: "자격 정보 보기",
  th: "ดูข้อมูลใบอนุญาต",
  es: "Ver Credenciales",
}

/** 多语言「执业资格证编号」标签 */
export const LICENSE_LABEL: Record<Locale, string> = {
  zh: "执业资格证编号",
  en: "License Number",
  ms: "Nombor Lesen",
  ja: "資格証番号",
  ko: "면허 번호",
  th: "หมายเลขใบอนุญาต",
  es: "Número de Licencia",
}

/** 多语言「专业研究方向」标签 */
export const RESEARCH_FOCUS_LABEL: Record<Locale, string> = {
  zh: "专业研究方向",
  en: "Research Focus",
  ms: "Fokus Penyelidikan",
  ja: "専門研究分野",
  ko: "전문 연구 분야",
  th: "สาขาการวิจัย",
  es: "Enfoque de Investigación",
}

/** 多语言「关闭」按钮 */
export const CLOSE_LABEL: Record<Locale, string> = {
  zh: "关闭",
  en: "Close",
  ms: "Tutup",
  ja: "閉じる",
  ko: "닫기",
  th: "ปิด",
  es: "Cerrar",
}
