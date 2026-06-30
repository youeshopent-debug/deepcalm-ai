const XLSX = require('xlsx');
const path = require('path');

const EXCEL_PATH = path.join(__dirname, '..', 'output', 'DEEPCALM_Dossier_20260512', '功能清单', 'DEEPCALM_Feature_Inventory.xlsx');

const mapping = [
  // ── CBT-I Components ──
  {
    cn: '睡眠限制疗法', en: 'Sleep Restriction Therapy',
    feature: 'AI睡眠分析+签到追踪',
    theory_cn: 'CBT-I 核心干预：限制卧床时间以增强睡眠驱动力', theory_en: 'CBT-I core: restrict time in bed to strengthen sleep drive',
    symptoms: '入睡困难、睡眠维持困难、睡眠效率低',
    metric: '睡眠效率(SE)、入睡潜伏期(SOL)',
    contraindication: '双相障碍躁狂期、癫痫患者',
    evidence: 'Oxford 1a (RCT systematic review)'
  },
  {
    cn: '刺激控制疗法', en: 'Stimulus Control Therapy',
    feature: '睡眠周期计算器+环境音',
    theory_cn: '重建"床=睡觉"的条件反射', theory_en: 'Rebuild "bed=sleep" conditioned association',
    symptoms: '慢性失眠、床与焦虑的条件反射',
    metric: '入睡潜伏期(SOL)、觉醒次数',
    contraindication: '严重日间嗜睡者',
    evidence: 'Oxford 1a (AASM clinical guideline)'
  },
  {
    cn: '认知重建', en: 'Cognitive Restructuring',
    feature: '认知重构工具',
    theory_cn: '识别并挑战关于睡眠/焦虑的功能失调信念', theory_en: 'Identify & challenge dysfunctional beliefs about sleep/anxiety',
    symptoms: '灾难化思维、过度担心失眠后果',
    metric: ' dysfunctional beliefs scale(DBAS)',
    contraindication: '严重认知障碍',
    evidence: 'Oxford 1b (individual RCT)'
  },
  {
    cn: '放松训练', en: 'Relaxation Training',
    feature: '呼吸计数器+身体扫描+渐进放松',
    theory_cn: '降低生理警觉度，抑制交感神经', theory_en: 'Reduce physiological arousal, inhibit sympathetic nervous system',
    symptoms: '入睡前躯体紧张、焦虑性肌肉紧绷',
    metric: '心率变异性(HRV)、肌电图(EMG)',
    contraindication: '无绝对禁忌',
    evidence: 'Oxford 2a (systematic review cohort)'
  },
  {
    cn: '睡眠卫生教育', en: 'Sleep Hygiene Education',
    feature: '睡眠指南+话题百科',
    theory_cn: '优化睡眠环境与行为习惯', theory_en: 'Optimize sleep environment & behavioral habits',
    symptoms: '不良睡眠习惯、环境干扰',
    metric: '匹兹堡睡眠质量指数(PSQI)',
    contraindication: '无',
    evidence: 'Oxford 2b (individual cohort study)'
  },
  {
    cn: '矛盾意向法', en: 'Paradoxical Intention',
    feature: 'AI催眠引导',
    theory_cn: '放弃入睡努力以破除表现焦虑', theory_en: 'Abandon sleep effort to break performance anxiety',
    symptoms: '因"必须睡着"而加剧失眠',
    metric: '入睡潜伏期(SOL)',
    contraindication: '严重焦虑急性期',
    evidence: 'Oxford 2b (small RCT)'
  },

  // ── Mindfulness Components ──
  {
    cn: '正念冥想', en: 'Mindfulness Meditation',
    feature: '引导放松+呼吸计数器',
    theory_cn: '正念减压(MBSR)：非评判性当下觉察', theory_en: 'MBSR: non-judgmental present-moment awareness',
    symptoms: '广泛性焦虑、反刍思维、情绪失调',
    metric: 'GAD-7、五因素正念量表(FFMQ)',
    contraindication: '未经处理的PTSD闪回',
    evidence: 'Oxford 1b (multiple RCTs)'
  },
  {
    cn: '正念身体扫描', en: 'Mindful Body Scan',
    feature: '身体扫描工具',
    theory_cn: '将注意力依次引导至身体各部位', theory_en: 'Sequential attention guidance through body regions',
    symptoms: '躯体化焦虑、慢性疼痛伴焦虑',
    metric: '躯体警觉度量表(SOMS)',
    contraindication: '严重躯体疼痛急性期',
    evidence: 'Oxford 2a (systematic review)'
  },
  {
    cn: '感恩练习', en: 'Gratitude Practice',
    feature: '感恩日记',
    theory_cn: '积极心理学：培养积极情绪资源', theory_en: 'Positive psychology: cultivate positive emotional resources',
    symptoms: '低落情绪、睡前思维奔逸',
    metric: '感恩问卷(GQ-6)、积极情感量表',
    contraindication: '无',
    evidence: 'Oxford 2a (meta-analysis)'
  },

  // ── Exposure Components ──
  {
    cn: '想象暴露', en: 'Imaginal Exposure',
    feature: 'AI心理咨询（焦虑场景）',
    theory_cn: '在安全环境中逐步面对焦虑场景', theory_en: 'Gradual confrontation with anxiety scenarios in safe environment',
    symptoms: '社交焦虑、演讲恐惧、健康焦虑',
    metric: '主观困扰单位(SUDS)、回避行为量表',
    contraindication: '急性自杀风险、未稳定的PTSD',
    evidence: 'Oxford 1a (Cochrane review)'
  },
  {
    cn: '内感暴露', en: 'Interoceptive Exposure',
    feature: '焦虑场景指南',
    theory_cn: '主动诱发焦虑躯体感觉以降低恐惧', theory_en: 'Deliberately induce anxiety body sensations to reduce fear',
    symptoms: '惊恐发作、健康焦虑（疑病）',
    metric: '惊恐严重度量表(PDSS)',
    contraindication: '严重心血管疾病',
    evidence: 'Oxford 1b (RCT)'
  },

  // ── Additional ──
  {
    cn: '情绪追踪', en: 'Mood Tracking',
    feature: '情绪曲线+签到',
    theory_cn: '自我监测：提升情绪觉察与模式识别', theory_en: 'Self-monitoring: enhance emotional awareness & pattern recognition',
    symptoms: '情绪波动、焦虑触发因素识别',
    metric: '情绪变异性指数',
    contraindication: '无',
    evidence: 'Oxford 3b (individual case-control)'
  },
  {
    cn: '社会支持', en: 'Social Support',
    feature: '共振墙',
    theory_cn: '集体效能感与普同感：减少孤独', theory_en: 'Collective efficacy & universality: reduce isolation',
    symptoms: '孤独感、归属感缺失',
    metric: 'UCLA孤独感量表',
    contraindication: '无',
    evidence: 'Oxford 2b (cohort study)'
  },
  {
    cn: '危机干预', en: 'Crisis Intervention',
    feature: '紧急工具',
    theory_cn: '即刻安全评估与资源链接', theory_en: 'Immediate safety assessment & resource linkage',
    symptoms: '自杀意念、自伤行为、惊恐发作',
    metric: '自杀风险筛查、危机热线接通率',
    contraindication: '无（资源导航非治疗）',
    evidence: 'Oxford 4 (expert consensus)'
  },
  {
    cn: 'AI共情对话', en: 'AI Empathetic Dialogue',
    feature: 'AI心理咨询',
    theory_cn: '基于共情回应的心理支持', theory_en: 'Empathy-based psychological support',
    symptoms: '轻度至中度情绪困扰',
    metric: '会话后情绪自评改善',
    contraindication: '急性精神病性症状',
    evidence: 'Oxford 4 (expert opinion, emerging field)'
  },
];

const rows = mapping.map((m, i) => ({
  '序号': i + 1,
  '干预名称（中文）': m.cn,
  'Intervention': m.en,
  '对应功能': m.feature,
  '心理学理论（中文）': m.theory_cn,
  'Theory': m.theory_en,
  '目标症状': m.symptoms,
  '评估指标': m.metric,
  '禁忌症': m.contraindication,
  '循证等级 (Oxford CEBM)': m.evidence
}));

const wb = XLSX.readFile(EXCEL_PATH);

// Check if sheet already exists
const existingSheets = wb.SheetNames;
if (existingSheets.includes('CBT-I映射表')) {
  XLSX.utils.delete_sheet(wb, 'CBT-I映射表');
}

const ws = XLSX.utils.json_to_sheet(rows);
ws['!cols'] = [
  { wch: 5 },   // 序号
  { wch: 20 },  // 干预名称（中文）
  { wch: 26 },  // Intervention
  { wch: 28 },  // 对应功能
  { wch: 40 },  // 心理学理论（中文）
  { wch: 45 },  // Theory
  { wch: 35 },  // 目标症状
  { wch: 35 },  // 评估指标
  { wch: 28 },  // 禁忌症
  { wch: 28 },  // 循证等级
];

XLSX.utils.book_append_sheet(wb, ws, 'CBT-I映射表');
XLSX.writeFile(wb, EXCEL_PATH);
console.log('✅ CBT-I 映射表已追加到 Excel 第二工作表');
console.log(`📊 共 ${mapping.length} 条干预记录`);
