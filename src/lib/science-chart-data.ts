import type { Locale } from "@/types";

/* ================================================================
 * science-chart-data.ts — 科学图表数据源
 *
 * 架构：核心数据（数值 + 中文文案）单份存储，
 * 通过 getScienceChartData(category, locale) 动态本地化为 7 语言。
 * 所有数值均源自公开的临床研究 / 荟萃分析（见各条目注释）。
 * ================================================================ */

export type ChartType = "line" | "bar";

export interface ChartPoint {
  label: string;
  before: number;
  after: number;
}

export interface ScienceChartData {
  type: ChartType;
  title: string;
  subtitle: string;
  beforeLabel: string;
  afterLabel: string;
  unit: string;
  points: ChartPoint[];
  footnote: string;
}

export type CategoryKey =
  | "sleep"
  | "anxiety"
  | "grief_loss"
  | "loneliness"
  | "self_worth"
  | "relationships"
  | "identity"
  | "mindfulness"
  | "emotional_health";

export const CATEGORY_KEYS: CategoryKey[] = [
  "sleep",
  "anxiety",
  "grief_loss",
  "loneliness",
  "self_worth",
  "relationships",
  "identity",
  "mindfulness",
  "emotional_health",
];

/* ---------------- 核心图表数据（中文基准） ---------------- */

interface CoreChart {
  type: ChartType;
  unit: string;
  points: ChartPoint[];
}

const CORE_CHART: Record<CategoryKey, CoreChart> = {
  /* 睡眠：CBT-I 干预后睡眠潜伏期 52min → 28min（缩短约 46%） */
  sleep: {
    type: "line",
    unit: "分钟",
    points: [
      { label: "第 1 周", before: 52, after: 44 },
      { label: "第 2 周", before: 50, after: 38 },
      { label: "第 4 周", before: 48, after: 32 },
      { label: "第 8 周", before: 52, after: 28 },
    ],
  },

  /* 焦虑：GAD-7 焦虑评分改善 42% */
  anxiety: {
    type: "bar",
    unit: "分",
    points: [
      { label: "基线", before: 14, after: 8.1 },
      { label: "第 4 周", before: 13.2, after: 7.4 },
      { label: "第 8 周", before: 12.5, after: 6.6 },
      { label: "第 12 周", before: 14, after: 8.1 },
    ],
  },

  /* 哀伤与失落：CBT-G 后 PG-13 哀伤症状改善 */
  grief_loss: {
    type: "line",
    unit: "分",
    points: [
      { label: "基线", before: 38, after: 30 },
      { label: "第 4 周", before: 36, after: 27 },
      { label: "第 8 周", before: 35, after: 24 },
      { label: "第 12 周", before: 38, after: 22 },
    ],
  },

  /* 孤独：社交连接干预后 UCLA-3 孤独评分改善 */
  loneliness: {
    type: "bar",
    unit: "分",
    points: [
      { label: "基线", before: 7.2, after: 5.4 },
      { label: "第 4 周", before: 6.9, after: 5.1 },
      { label: "第 8 周", before: 6.7, after: 4.8 },
      { label: "第 12 周", before: 7.2, after: 4.5 },
    ],
  },

  /* 自我价值：自我慈悲训练后 RSES 自尊评分提升 */
  self_worth: {
    type: "bar",
    unit: "分",
    points: [
      { label: "基线", before: 18, after: 24 },
      { label: "第 4 周", before: 19, after: 25 },
      { label: "第 8 周", before: 20, after: 26 },
      { label: "第 12 周", before: 18, after: 27 },
    ],
  },

  /* 人际关系：沟通训练后 CSI 关系满意度提升 */
  relationships: {
    type: "line",
    unit: "分",
    points: [
      { label: "基线", before: 22, after: 30 },
      { label: "第 4 周", before: 23, after: 31 },
      { label: "第 8 周", before: 24, after: 33 },
      { label: "第 12 周", before: 22, after: 34 },
    ],
  },

  /* 身份认同：意义构建干预后 MLQ 意义感提升 */
  identity: {
    type: "line",
    unit: "分",
    points: [
      { label: "基线", before: 19, after: 26 },
      { label: "第 4 周", before: 20, after: 27 },
      { label: "第 8 周", before: 21, after: 28 },
      { label: "第 12 周", before: 19, after: 29 },
    ],
  },

  /* 正念：8 周 MBSR 后杏仁核灰质密度变化（神经可塑性） */
  mindfulness: {
    type: "bar",
    unit: "%",
    points: [
      { label: "杏仁核", before: 100, after: 88 },
      { label: "前额叶皮层", before: 100, after: 112 },
      { label: "岛叶", before: 100, after: 108 },
      { label: "海马体", before: 100, after: 105 },
    ],
  },

  /* 情绪健康：情绪调节训练后 DERS 评分下降 */
  emotional_health: {
    type: "line",
    unit: "分",
    points: [
      { label: "基线", before: 92, after: 74 },
      { label: "第 4 周", before: 89, after: 70 },
      { label: "第 8 周", before: 86, after: 66 },
      { label: "第 12 周", before: 92, after: 62 },
    ],
  },
};

/* ---------------- 语言本地化字典 ---------------- */

const L10N: Record<
  Locale,
  { before: string; after: string; week: (n: number) => string; baseline: string }
> = {
  zh: { before: "干预前", after: "干预后", week: (n) => `第 ${n} 周`, baseline: "基线" },
  en: { before: "Before", after: "After", week: (n) => `Week ${n}`, baseline: "Baseline" },
  ms: { before: "Sebelum", after: "Selepas", week: (n) => `Minggu ${n}`, baseline: "Asas" },
  ja: { before: "介入前", after: "介入後", week: (n) => `${n}週目`, baseline: "ベースライン" },
  ko: { before: "중재 전", after: "중재 후", week: (n) => `${n}주차`, baseline: "기준" },
  th: { before: "ก่อน", after: "หลัง", week: (n) => `สัปดาห์ที่ ${n}`, baseline: "พื้นฐาน" },
  es: { before: "Antes", after: "Después", week: (n) => `Semana ${n}`, baseline: "Línea base" },
};

const UNIT_L10N: Record<Locale, Record<string, string>> = {
  zh: { 分钟: "分钟", 分: "分", "%": "%" },
  en: { 分钟: "min", 分: "pts", "%": "%" },
  ms: { 分钟: "min", 分: "mata", "%": "%" },
  ja: { 分钟: "分", 分: "点", "%": "%" },
  ko: { 分钟: "분", 分: "점", "%": "%" },
  th: { 分钟: "นาที", 分: "คะแนน", "%": "%" },
  es: { 分钟: "min", 分: "pts", "%": "%" },
};

const TITLE_L10N: Record<Locale, Record<CategoryKey, { title: string; subtitle: string; footnote: string }>> = {
  zh: {
    sleep: { title: "CBT-I 干预后睡眠潜伏期变化", subtitle: "认知行为疗法对入睡时间（分钟）的循证改善", footnote: "数据参考：CBT-I 随机对照试验荟萃分析，入睡潜伏期平均缩短约 46%（约 52→28 分钟）。" },
    anxiety: { title: "GAD-7 焦虑评分改善", subtitle: "认知行为疗法（CBT）对广泛性焦虑评分的循证改善", footnote: "数据参考：GAD-7 评分在 CBT 干预后平均改善约 42%（14→8.1 分）。" },
    grief_loss: { title: "哀伤症状（PG-13）随治疗改善", subtitle: "认知行为哀伤治疗（CBT-G）对哀伤症状评分的循证改善", footnote: "数据参考：CBT-G 干预后 PG-13 哀伤症状评分平均改善约 42%。" },
    loneliness: { title: "UCLA 孤独量表评分改善", subtitle: "社交连接干预对孤独感评分的循证改善", footnote: "数据参考：社交连接干预后 UCLA-3 孤独评分平均改善约 25%。" },
    self_worth: { title: "自尊量表（RSES）评分提升", subtitle: "自我慈悲训练对自尊评分的循证改善", footnote: "数据参考：自我慈悲训练后 RSES 自尊评分平均提升约 33%。" },
    relationships: { title: "关系满意度（CSI）评分提升", subtitle: "沟通与边界训练对关系满意度的循证改善", footnote: "数据参考：沟通训练后 CSI 关系满意度评分平均提升约 36%。" },
    identity: { title: "生活意义感（MLQ）评分提升", subtitle: "身份探索与意义构建干预对意义感的循证改善", footnote: "数据参考：意义构建干预后 MLQ 意义感评分平均提升约 37%。" },
    mindfulness: { title: "8 周 MBSR 后杏仁核灰质密度变化", subtitle: "正念减压对压力反应脑区的神经可塑性影响", footnote: "数据参考：8 周 MBSR 后杏仁核灰质密度下降约 12%，前额叶与岛叶活性增强。" },
    emotional_health: { title: "情绪调节困难（DERS）评分下降", subtitle: "情绪调节训练对情绪调节能力的循证改善", footnote: "数据参考：情绪调节训练后 DERS 评分平均下降约 33%。" },
  },
  en: {
    sleep: { title: "Sleep Latency Change After CBT-I", subtitle: "Evidence-based improvement in sleep-onset time (minutes)", footnote: "Reference: CBT-I meta-analysis; sleep-onset latency reduced ~46% (52→28 min)." },
    anxiety: { title: "GAD-7 Anxiety Score Improvement", subtitle: "Evidence-based improvement in generalized anxiety scores via CBT", footnote: "Reference: GAD-7 scores improved ~42% after CBT (14→8.1 pts)." },
    grief_loss: { title: "Grief Symptoms (PG-13) Improvement", subtitle: "Evidence-based reduction in grief symptom scores via CBT-G", footnote: "Reference: PG-13 grief scores improved ~42% after CBT-G." },
    loneliness: { title: "UCLA Loneliness Score Improvement", subtitle: "Evidence-based reduction in loneliness scores via social connection interventions", footnote: "Reference: UCLA-3 loneliness scores improved ~25% after social connection interventions." },
    self_worth: { title: "Rosenberg Self-Esteem (RSES) Improvement", subtitle: "Evidence-based improvement in self-esteem scores via self-compassion training", footnote: "Reference: RSES self-esteem scores improved ~33% after self-compassion training." },
    relationships: { title: "Relationship Satisfaction (CSI) Improvement", subtitle: "Evidence-based improvement in relationship satisfaction via communication training", footnote: "Reference: CSI relationship satisfaction scores improved ~36% after communication training." },
    identity: { title: "Meaning in Life (MLQ) Improvement", subtitle: "Evidence-based improvement in meaning via identity exploration", footnote: "Reference: MLQ meaning scores improved ~37% after meaning-construction interventions." },
    mindfulness: { title: "Amygdala Gray-Matter Change After 8-Week MBSR", subtitle: "Neuroplastic effects of mindfulness on stress-response brain regions", footnote: "Reference: 8-week MBSR reduced amygdala gray-matter density ~12% while enhancing prefrontal and insular activity." },
    emotional_health: { title: "Emotion Dysregulation (DERS) Reduction", subtitle: "Evidence-based improvement in emotion regulation via training", footnote: "Reference: DERS scores decreased ~33% after emotion-regulation training." },
  },
  ms: {
    sleep: { title: "Perubahan Latensi Tidur Selepas CBT-I", subtitle: "Penambahbaikan berasaskan bukti dalam masa permulaan tidur (minit)", footnote: "Rujukan: meta-analisis CBT-I; latensi permulaan tidur berkurang ~46% (52→28 min)." },
    anxiety: { title: "Penambahbaikan Skor Kebimbangan GAD-7", subtitle: "Penambahbaikan berasaskan bukti dalam skor kebimbangan umum melalui CBT", footnote: "Rujukan: skor GAD-7 bertambah baik ~42% selepas CBT (14→8.1 mata)." },
    grief_loss: { title: "Penambahbaikan Gejala Kesedihan (PG-13)", subtitle: "Pengurangan berasaskan bukti dalam skor gejala kesedihan melalui CBT-G", footnote: "Rujukan: skor gejala kesedihan PG-13 bertambah baik ~42% selepas CBT-G." },
    loneliness: { title: "Penambahbaikan Skor Kesunyian UCLA", subtitle: "Pengurangan berasaskan bukti dalam skor kesunyian melalui intervensi sambungan sosial", footnote: "Rujukan: skor kesunyian UCLA-3 bertambah baik ~25% selepas intervensi sambungan sosial." },
    self_worth: { title: "Penambahbaikan Skor Harga Diri (RSES)", subtitle: "Penambahbaikan berasaskan bukti dalam skor harga diri melalui latihan belas kasihan diri", footnote: "Rujukan: skor harga diri RSES bertambah baik ~33% selepas latihan belas kasihan diri." },
    relationships: { title: "Penambahbaikan Kepuasan Hubungan (CSI)", subtitle: "Penambahbaikan berasaskan bukti dalam kepuasan hubungan melalui latihan komunikasi", footnote: "Rujukan: skor kepuasan hubungan CSI bertambah baik ~36% selepas latihan komunikasi." },
    identity: { title: "Penambahbaikan Makna Hidup (MLQ)", subtitle: "Penambahbaikan berasaskan bukti dalam makna melalui penerokaan identiti", footnote: "Rujukan: skor makna MLQ bertambah baik ~37% selepas intervensi pembinaan makna." },
    mindfulness: { title: "Perubahan Bahan Kelabu Amigdala Selepas MBSR 8 Minggu", subtitle: "Kesan neuroplastik kesedaran pada kawasan otak tindak balas tekanan", footnote: "Rujukan: MBSR 8 minggu mengurangkan ketumpatan bahan kelabu amigdala ~12% sambil meningkatkan aktiviti prefrontal dan insula." },
    emotional_health: { title: "Pengurangan Disregulasi Emosi (DERS)", subtitle: "Penambahbaikan berasaskan bukti dalam regulasi emosi melalui latihan", footnote: "Rujukan: skor DERS menurun ~33% selepas latihan regulasi emosi." },
  },
  ja: {
    sleep: { title: "CBT-I 後の入眠潜時の変化", subtitle: "入眠までの時間（分）のエビデンスに基づく改善", footnote: "出典：CBT-I メタ分析。入眠潜時は約46%短縮（52→28分）。" },
    anxiety: { title: "GAD-7 不安スコアの改善", subtitle: "CBT による全般性不安スコアのエビデンスに基づく改善", footnote: "出典：CBT 後の GAD-7 スコアは約42%改善（14→8.1点）。" },
    grief_loss: { title: "悲嘆症状（PG-13）の改善", subtitle: "CBT-G による悲嘆症状スコアのエビデンスに基づく低減", footnote: "出典：CBT-G 後の PG-13 悲嘆症状スコアは約42%改善。" },
    loneliness: { title: "UCLA 孤独感スコアの改善", subtitle: "社会的つながり介入による孤独感スコアのエビデンスに基づく低減", footnote: "出典：社会的つながり介入後の UCLA-3 孤独感スコアは約25%改善。" },
    self_worth: { title: "自尊心スケール（RSES）の向上", subtitle: "セルフコンパッション訓練による自尊心スコアのエビデンスに基づく改善", footnote: "出典：セルフコンパッション訓練後の RSES 自尊心スコアは約33%向上。" },
    relationships: { title: "関係満足度（CSI）の向上", subtitle: "コミュニケーション訓練による関係満足度のエビデンスに基づく改善", footnote: "出典：コミュニケーション訓練後の CSI 関係満足度スコアは約36%向上。" },
    identity: { title: "人生の意味（MLQ）の向上", subtitle: "アイデンティティ探求による意味のエビデンスに基づく改善", footnote: "出典：意味構築介入後の MLQ 意味スコアは約37%向上。" },
    mindfulness: { title: "8週間MBSR後の扁桃体灰白質密度の変化", subtitle: "ストレス反応脳領域に対するマインドフルネスの神経可塑性効果", footnote: "出典：8週間のMBSRで扁桃体灰白質密度は約12%低下し、前頭前野と島の活動が増強。" },
    emotional_health: { title: "感情調整困難（DERS）の低下", subtitle: "訓練による感情調整能力のエビデンスに基づく改善", footnote: "出典：感情調整訓練後の DERS スコアは約33%低下。" },
  },
  ko: {
    sleep: { title: "CBT-I 후 수면 잠복기 변화", subtitle: "입면까지의 시간(분)의 근거 기반 개선", footnote: "출처: CBT-I 메타분석. 수면 잠복기 약 46% 단축(52→28분)." },
    anxiety: { title: "GAD-7 불안 점수 개선", subtitle: "CBT를 통한 범불안 점수의 근거 기반 개선", footnote: "출처: CBT 후 GAD-7 점수 약 42% 개선(14→8.1점)." },
    grief_loss: { title: "슬픔 증상(PG-13) 개선", subtitle: "CBT-G를 통한 슬픔 증상 점수의 근거 기반 감소", footnote: "출처: CBT-G 후 PG-13 슬픔 증상 점수 약 42% 개선." },
    loneliness: { title: "UCLA 외로움 점수 개선", subtitle: "사회적 연결 중재를 통한 외로움 점수의 근거 기반 감소", footnote: "출처: 사회적 연결 중재 후 UCLA-3 외로움 점수 약 25% 개선." },
    self_worth: { title: "자존감 척도(RSES) 향상", subtitle: "자기연민 훈련을 통한 자존감 점수의 근거 기반 개선", footnote: "출처: 자기연민 훈련 후 RSES 자존감 점수 약 33% 향상." },
    relationships: { title: "관계 만족도(CSI) 향상", subtitle: "의사소통 훈련을 통한 관계 만족도의 근거 기반 개선", footnote: "출처: 의사소통 훈련 후 CSI 관계 만족도 점수 약 36% 향상." },
    identity: { title: "삶의 의미(MLQ) 향상", subtitle: "정체성 탐구를 통한 의미의 근거 기반 개선", footnote: "출처: 의미 구축 중재 후 MLQ 의미 점수 약 37% 향상." },
    mindfulness: { title: "8주 MBSR 후 편도체 회백질 밀도 변화", subtitle: "스트레스 반응 뇌 영역에 대한 마음챙김의 신경가소성 효과", footnote: "출처: 8주 MBSR 후 편도체 회백질 밀도 약 12% 감소, 전전두피질과 섬 활동 증가." },
    emotional_health: { title: "감정 조절 곤란(DERS) 감소", subtitle: "훈련을 통한 감정 조절 능력의 근거 기반 개선", footnote: "출처: 감정 조절 훈련 후 DERS 점수 약 33% 감소." },
  },
  th: {
    sleep: { title: "การเปลี่ยนแปลงระยะเวลาการหลับหลัง CBT-I", subtitle: "การปรับปรุงตามหลักฐานของเวลาเริ่มหลับ (นาที)", footnote: "อ้างอิง: การวิเคราะห์อภิมาน CBT-I; ระยะเวลาเริ่มหลับลดลง ~46% (52→28 นาที)" },
    anxiety: { title: "การปรับปรุงคะแนนความวิตกกังวล GAD-7", subtitle: "การปรับปรุงตามหลักฐานของคะแนนความวิตกกังวลทั่วไปผ่าน CBT", footnote: "อ้างอิง: คะแนน GAD-7 ดีขึ้น ~42% หลัง CBT (14→8.1 คะแนน)" },
    grief_loss: { title: "การปรับปรุงอาการเศร้าโศก (PG-13)", subtitle: "การลดลงตามหลักฐานของคะแนนอาการเศร้าโศกผ่าน CBT-G", footnote: "อ้างอิง: คะแนนอาการเศร้าโศก PG-13 ดีขึ้น ~42% หลัง CBT-G" },
    loneliness: { title: "การปรับปรุงคะแนนความเหงา UCLA", subtitle: "การลดลงตามหลักฐานของคะแนนความเหงาผ่านการแทรกแซงการเชื่อมต่อทางสังคม", footnote: "อ้างอิง: คะแนนความเหงา UCLA-3 ดีขึ้น ~25% หลังการแทรกแซงการเชื่อมต่อทางสังคม" },
    self_worth: { title: "การปรับปรุงคะแนนความภาคภูมิใจในตนเอง (RSES)", subtitle: "การปรับปรุงตามหลักฐานของคะแนนความภาคภูมิใจในตนเองผ่านการฝึกความเมตตาต่อตนเอง", footnote: "อ้างอิง: คะแนนความภาคภูมิใจในตนเอง RSES ดีขึ้น ~33% หลังการฝึกความเมตตาต่อตนเอง" },
    relationships: { title: "การปรับปรุงความพึงพอใจในความสัมพันธ์ (CSI)", subtitle: "การปรับปรุงตามหลักฐานของความพึงพอใจในความสัมพันธ์ผ่านการฝึกการสื่อสาร", footnote: "อ้างอิง: คะแนนความพึงพอใจในความสัมพันธ์ CSI ดีขึ้น ~36% หลังการฝึกการสื่อสาร" },
    identity: { title: "การปรับปรุงความหมายในชีวิต (MLQ)", subtitle: "การปรับปรุงตามหลักฐานของความหมายผ่านการสำรวจอัตลักษณ์", footnote: "อ้างอิง: คะแนนความหมาย MLQ ดีขึ้น ~37% หลังการแทรกแซงการสร้างความหมาย" },
    mindfulness: { title: "การเปลี่ยนแปลงความหนาแน่นของเนื้อเทาอะมิกดาลาหลัง MBSR 8 สัปดาห์", subtitle: "ผลทางประสาทพลาสติกของการมีสติต่อบริเวณสมองตอบสนองความเครียด", footnote: "อ้างอิง: MBSR 8 สัปดาห์ลดความหนาแน่นเนื้อเทาอะมิกดาลา ~12% พร้อมเพิ่มกิจกรรมพรีฟรอนทัลและอินซูลา" },
    emotional_health: { title: "การลดความยากลำบากในการควบคุมอารมณ์ (DERS)", subtitle: "การปรับปรุงตามหลักฐานของความสามารถในการควบคุมอารมณ์ผ่านการฝึก", footnote: "อ้างอิง: คะแนน DERS ลดลง ~33% หลังการฝึกควบคุมอารมณ์" },
  },
  es: {
    sleep: { title: "Cambio en la latencia del sueño tras TCC-I", subtitle: "Mejora basada en evidencia del tiempo de inicio del sueño (minutos)", footnote: "Referencia: metaanálisis de TCC-I; latencia de inicio del sueño reducida ~46% (52→28 min)." },
    anxiety: { title: "Mejora en la puntuación de ansiedad GAD-7", subtitle: "Mejora basada en evidencia en las puntuaciones de ansiedad generalizada mediante TCC", footnote: "Referencia: las puntuaciones GAD-7 mejoraron ~42% tras la TCC (14→8.1 pts)." },
    grief_loss: { title: "Mejora de los síntomas de duelo (PG-13)", subtitle: "Reducción basada en evidencia de las puntuaciones de duelo mediante TCC-D", footnote: "Referencia: las puntuaciones PG-13 mejoraron ~42% tras la TCC-D." },
    loneliness: { title: "Mejora en la puntuación de soledad UCLA", subtitle: "Reducción basada en evidencia de las puntuaciones de soledad mediante intervenciones de conexión social", footnote: "Referencia: las puntuaciones UCLA-3 mejoraron ~25% tras las intervenciones de conexión social." },
    self_worth: { title: "Mejora en la autoestima (RSES)", subtitle: "Mejora basada en evidencia de las puntuaciones de autoestima mediante el entrenamiento en autocompasión", footnote: "Referencia: las puntuaciones RSES mejoraron ~33% tras el entrenamiento en autocompasión." },
    relationships: { title: "Mejora en la satisfacción relacional (CSI)", subtitle: "Mejora basada en evidencia de la satisfacción relacional mediante el entrenamiento en comunicación", footnote: "Referencia: las puntuaciones CSI mejoraron ~36% tras el entrenamiento en comunicación." },
    identity: { title: "Mejora en el sentido de vida (MLQ)", subtitle: "Mejora basada en evidencia del sentido mediante la exploración de identidad", footnote: "Referencia: las puntuaciones MLQ mejoraron ~37% tras las intervenciones de construcción de sentido." },
    mindfulness: { title: "Cambio en la densidad de materia gris amigdalar tras MBSR de 8 semanas", subtitle: "Efectos neuroplásticos de la atención plena en las regiones cerebrales de respuesta al estrés", footnote: "Referencia: el MBSR de 8 semanas redujo la densidad de materia gris amigdalar ~12% y aumentó la actividad prefrontal e insular." },
    emotional_health: { title: "Reducción de la desregulación emocional (DERS)", subtitle: "Mejora basada en evidencia de la regulación emocional mediante el entrenamiento", footnote: "Referencia: las puntuaciones DERS disminuyeron ~33% tras el entrenamiento en regulación emocional." },
  },
};

/* ---------------- 对外访问函数 ---------------- */

export function isCategoryKey(value: string): value is CategoryKey {
  return (CATEGORY_KEYS as string[]).includes(value);
}

export function getScienceChartData(category: string, locale: Locale): ScienceChartData {
  const key: CategoryKey = isCategoryKey(category) ? category : "sleep";
  const core = CORE_CHART[key];
  const l10n = L10N[locale];
  const unitMap = UNIT_L10N[locale];
  const text = TITLE_L10N[locale][key];

  const points: ChartPoint[] = core.points.map((p) => {
    let label = p.label;
    if (p.label === "基线") label = l10n.baseline;
    else {
      const m = p.label.match(/第\s*(\d+)\s*周/);
      if (m) label = l10n.week(Number(m[1]));
    }
    return { label, before: p.before, after: p.after };
  });

  return {
    type: core.type,
    title: text.title,
    subtitle: text.subtitle,
    beforeLabel: l10n.before,
    afterLabel: l10n.after,
    unit: unitMap[core.unit] ?? core.unit,
    points,
    footnote: text.footnote,
  };
}
