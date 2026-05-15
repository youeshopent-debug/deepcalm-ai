import type {
  EngineInput,
  EngineOutput,
  EmotionalValidation,
  TaskDecomposition,
  TaskStep,
  MindfulnessExercise,
  CrisisResource,
  DetectedPattern,
  AnxietyAnalysis,
  Locale,
  CognitiveTiers,
  CognitiveDistortionType,
  PatternAnalysisResult,
  EvaluationResult,
} from "@/types"
import {
  detectPatterns,
  detectCrisis,
  assessEmotionalIntensity,
} from "./cognitivePatterns"
import { evaluateOutput } from "./evaluateEngine"

// ── 正念练习库（7语）──

const MINDFULNESS_LIBRARY: Record<string, Record<Locale, MindfulnessExercise>> = {
  breathing_478: {
    zh: { type: "breathing_478", name: "4-7-8 呼吸法", instruction: "吸气4秒 → 屏气7秒 → 呼气8秒。重复3-5次。这能激活副交感神经系统，快速降低焦虑。", durationSeconds: 120, benefit: "迅速降低生理唤醒水平，激活迷走神经" },
    en: { type: "breathing_478", name: "4-7-8 Breathing", instruction: "Inhale 4s → Hold 7s → Exhale 8s. Repeat 3-5 times. Activates the parasympathetic nervous system.", durationSeconds: 120, benefit: "Rapidly lowers physiological arousal, activates vagus nerve" },
    ms: { type: "breathing_478", name: "Pernafasan 4-7-8", instruction: "Tarik nafas 4s → Tahan 7s → Hembus 8s. Ulang 3-5 kali. Aktifkan sistem saraf parasimpatetik.", durationSeconds: 120, benefit: "Menurunkan rangsangan fisiologi dengan cepat, mengaktifkan saraf vagus" },
    ja: { type: "breathing_478", name: "4-7-8呼吸法", instruction: "4秒吸気→7秒停止→8秒呼気。3〜5回繰り返します。副交感神経を活性化し、不安をすばやく軽減します。", durationSeconds: 120, benefit: "生理的覚醒を迅速に低下させ、迷走神経を活性化" },
    ko: { type: "breathing_478", name: "4-7-8 호흡법", instruction: "4초 들이마시기 → 7초 참기 → 8초 내쉬기. 3-5회 반복. 부교감신경계를 활성화하여 불안을 빠르게 낮춥니다.", durationSeconds: 120, benefit: "생리적 각성을 신속히 낮추고 미주신경 활성화" },
    th: { type: "breathing_478", name: "การหายใจ 4-7-8", instruction: "หายใจเข้า 4 วินาที → กลั้น 7 วินาที → หายใจออก 8 วินาที ทำซ้ำ 3-5 ครั้ง กระตุ้นระบบประสาทพาราซิมพาเทติก", durationSeconds: 120, benefit: "ลดระดับความตื่นตัวทางสรีรวิทยา กระตุ้นเวกัสเนิร์ฟ" },
    es: { type: "breathing_478", name: "Respiración 4-7-8", instruction: "Inhala 4s → Retén 7s → Exhala 8s. Repite 3-5 veces. Activa el sistema nervioso parasimpático.", durationSeconds: 120, benefit: "Reduce rápidamente la activación fisiológica, activa el nervio vago" },
  },
  grounding_54321: {
    zh: { type: "grounding_54321", name: "5-4-3-2-1 落地技术", instruction: "看5样东西 → 摸4样东西 → 听3种声音 → 闻2种气味 → 尝1种味道。把你拉回当下。", durationSeconds: 90, benefit: "中断焦虑回路，重新连接感官与当下" },
    en: { type: "grounding_54321", name: "5-4-3-2-1 Grounding", instruction: "See 5 things → Touch 4 → Hear 3 → Smell 2 → Taste 1. Anchors you in the present moment.", durationSeconds: 90, benefit: "Breaks anxiety loops by reconnecting senses with the present" },
    ms: { type: "grounding_54321", name: "Teknik Pembumian 5-4-3-2-1", instruction: "Lihat 5 benda → Sentuh 4 → Dengar 3 → Bau 2 → Rasa 1. Bawa diri anda ke masa kini.", durationSeconds: 90, benefit: "Mengganggu lingkaran kebimbangan dengan menghubungkan semula deria" },
    ja: { type: "grounding_54321", name: "5-4-3-2-1 グラウンディング", instruction: "5つ見る → 4つ触る → 3つ聞く → 2つ嗅ぐ → 1つ味わう。今この瞬間に意識を戻します。", durationSeconds: 90, benefit: "不安のループを断ち、感覚と現在をつなぎ直す" },
    ko: { type: "grounding_54321", name: "5-4-3-2-1 그라운딩", instruction: "5개 보기 → 4개 만지기 → 3개 듣기 → 2개 냄새 맡기 → 1개 맛보기. 지금 이 순간으로 돌아옵니다.", durationSeconds: 90, benefit: "불안 고리를 끊고 감각을 현재와 재연결" },
    th: { type: "grounding_54321", name: "การตั้งสติ 5-4-3-2-1", instruction: "เห็น 5 อย่าง → สัมผัส 4 → ได้ยิน 3 → ได้กลิ่น 2 → ลิ้มรส 1 นำคุณกลับสู่ปัจจุบันขณะ", durationSeconds: 90, benefit: "ขัดจังหวะวงจรความวิตกกังวล เชื่อมต่อประสาทสัมผัสกับปัจจุบัน" },
    es: { type: "grounding_54321", name: "Anclaje 5-4-3-2-1", instruction: "Ve 5 cosas → Toca 4 → Escucha 3 → Huele 2 → Prueba 1. Te ancla en el momento presente.", durationSeconds: 90, benefit: "Interrumpe los bucles de ansiedad reconectando los sentidos con el presente" },
  },
  body_scan: {
    zh: { type: "body_scan", name: "身体扫描", instruction: "闭上眼，从头顶到脚尖缓慢扫描身体的紧张部位。每次呼气时想象紧张的肌肉在释放。", durationSeconds: 300, benefit: "觉察身体积压的焦虑信号，促进身心放松" },
    en: { type: "body_scan", name: "Body Scan", instruction: "Close your eyes. Slowly scan from head to toe, noticing tension. Imagine releasing it with each exhale.", durationSeconds: 300, benefit: "Increases awareness of somatic anxiety signals, promotes relaxation" },
    ms: { type: "body_scan", name: "Imbasan Badan", instruction: "Tutup mata. Imbas perlahan dari kepala ke kaki, perhatikan ketegangan. Bayangkan melepaskannya dengan setiap hembusan nafas.", durationSeconds: 300, benefit: "Meningkatkan kesedaran terhadap isyarat kebimbangan fizikal, menggalakkan relaksasi" },
    ja: { type: "body_scan", name: "ボディスキャン", instruction: "目を閉じて、頭のてっぺんからつま先までゆっくりと体の緊張をスキャンします。息を吐くたびに緊張が解けていくのをイメージします。", durationSeconds: 300, benefit: "体に溜まった不安のサインに気づき、心身のリラックスを促進" },
    ko: { type: "body_scan", name: "바디 스캔", instruction: "눈을 감고 머리끝부터 발끝까지 천천히 긴장된 부위를 스캔합니다. 숨을 내쉴 때마다 긴장이 풀리는 것을 상상하세요.", durationSeconds: 300, benefit: "신체에 축적된 불안 신호를 인지하고 심신 이완 촉진" },
    th: { type: "body_scan", name: "สแกนร่างกาย", instruction: "หลับตา สแกนร่างกายจากศีรษะจรดปลายเท้า สังเกตจุดที่เกร็ง จินตนาการว่าคลายทุกครั้งที่หายใจออก", durationSeconds: 300, benefit: "เพิ่มการรับรู้สัญญาณความวิตกกังวลที่สะสมในร่างกาย ส่งเสริมการผ่อนคลาย" },
    es: { type: "body_scan", name: "Escáner Corporal", instruction: "Cierra los ojos. Escanea lentamente desde la cabeza hasta los pies, notando la tensión. Imagina liberarla con cada exhalación.", durationSeconds: 300, benefit: "Aumenta la conciencia de las señales de ansiedad somáticas, promueve la relajación" },
  },
}

// ── 困境类型拆解策略（7语）──

const DECOMPOSITION_STRATEGIES: Record<string, Record<Locale, (a: string) => TaskStep[]>> = {
  financial: {
    zh: (anxiety) => [
      { stepNumber: 1, title: "盘点现状", description: "写下目前的收入和支出清单，诚实面对数字。", duration: "20分钟", actionable: true },
      { stepNumber: 2, title: "找出一个削减点", description: "从支出清单中选一项可以立刻削减的开支。", duration: "10分钟", actionable: true },
      { stepNumber: 3, title: "生成一个增收方案", description: "想一个今天就能尝试的小副业或变现方式。", duration: "15分钟", actionable: true },
    ],
    en: (anxiety) => [
      { stepNumber: 1, title: "Audit Your Situation", description: "Write down your current income and expenses. Face the numbers honestly.", duration: "20 min", actionable: true },
      { stepNumber: 2, title: "Find One Cut", description: "Pick one expense you can reduce starting today.", duration: "10 min", actionable: true },
      { stepNumber: 3, title: "Brainstorm One Income Stream", description: "Think of one small side income you can try today.", duration: "15 min", actionable: true },
    ],
    ms: (anxiety) => [
      { stepNumber: 1, title: "Audit Situasi Anda", description: "Tulis pendapatan dan perbelanjaan semasa. Hadapi nombor dengan jujur.", duration: "20 min", actionable: true },
      { stepNumber: 2, title: "Cari Satu Potongan", description: "Pilih satu perbelanjaan yang boleh dikurangkan mulai hari ini.", duration: "10 min", actionable: true },
      { stepNumber: 3, title: "Hasilkan Satu Pendapatan", description: "Fikir satu pendapatan sampingan kecil yang boleh dicuba hari ini.", duration: "15 min", actionable: true },
    ],
    ja: (anxiety) => [
      { stepNumber: 1, title: "現状を棚卸し", description: "現在の収入と支出を書き出し、数字に正直に向き合いましょう。", duration: "20分", actionable: true },
      { stepNumber: 2, title: "削減点を1つ見つける", description: "支出リストから今日から削減できるものを1つ選びます。", duration: "10分", actionable: true },
      { stepNumber: 3, title: "収入源を1つ考える", description: "今日から試せる小さな副業や収入方法を考えます。", duration: "15分", actionable: true },
    ],
    ko: (anxiety) => [
      { stepNumber: 1, title: "현황 파악하기", description: "현재 수입과 지출 내역을 작성하고 숫자에 솔직해집니다.", duration: "20분", actionable: true },
      { stepNumber: 2, title: "하나 줄일 항목 찾기", description: "지출 목록에서 오늘부터 줄일 수 있는 항목을 하나 고릅니다.", duration: "10분", actionable: true },
      { stepNumber: 3, title: "수입원 하나 만들기", description: "오늘 시도할 수 있는 작은 부업이나 수입 방법을 생각합니다.", duration: "15분", actionable: true },
    ],
    th: (anxiety) => [
      { stepNumber: 1, title: "ตรวจสอบสถานการณ์", description: "เขียนรายรับและรายจ่ายปัจจุบันของคุณ เผชิญหน้ากับตัวเลขอย่างซื่อสัตย์", duration: "20 นาที", actionable: true },
      { stepNumber: 2, title: "หาจุดลดหนึ่งจุด", description: "เลือกรายจ่ายหนึ่งรายการที่คุณสามารถลดได้ตั้งแต่วันนี้", duration: "10 นาที", actionable: true },
      { stepNumber: 3, title: "สร้างรายได้หนึ่งทาง", description: "คิดหารายได้เสริมเล็กๆ ที่คุณสามารถลองได้วันนี้", duration: "15 นาที", actionable: true },
    ],
    es: (anxiety) => [
      { stepNumber: 1, title: "Audita tu Situación", description: "Escribe tus ingresos y gastos actuales. Enfréntate a los números con honestidad.", duration: "20 min", actionable: true },
      { stepNumber: 2, title: "Encuentra un Recorte", description: "Elige un gasto que puedas reducir desde hoy.", duration: "10 min", actionable: true },
      { stepNumber: 3, title: "Genera un Ingreso", description: "Piensa en un pequeño ingreso adicional que puedas probar hoy.", duration: "15 min", actionable: true },
    ],
  },
  midlife_transition: {
    zh: (anxiety) => [
      { stepNumber: 1, title: "定义你的价值观", description: "列出对你最重要的3个人生价值，不参考社会期待。", duration: "15分钟", actionable: true },
      { stepNumber: 2, title: "小步转型", description: "选一个你今天就可以尝试的新方向的小动作。", duration: "10分钟", actionable: true },
      { stepNumber: 3, title: "建立支持圈", description: "找到一个正在经历相似转型的人或社群。", duration: "20分钟", actionable: true },
    ],
    en: (anxiety) => [
      { stepNumber: 1, title: "Define Your Values", description: "List your top 3 values — not society's, yours.", duration: "15 min", actionable: true },
      { stepNumber: 2, title: "One Small Pivot", description: "Choose one tiny action toward your new direction.", duration: "10 min", actionable: true },
      { stepNumber: 3, title: "Build Your Circle", description: "Find one person or community going through a similar transition.", duration: "20 min", actionable: true },
    ],
    ms: (anxiety) => [
      { stepNumber: 1, title: "Tentukan Nilai Anda", description: "Senaraikan 3 nilai hidup terpenting anda — bukan masyarakat, tetapi nilai anda sendiri.", duration: "15 min", actionable: true },
      { stepNumber: 2, title: "Satu Pusingan Kecil", description: "Pilih satu tindakan kecil ke arah hala tuju baharu anda.", duration: "10 min", actionable: true },
      { stepNumber: 3, title: "Bina Lingkaran Anda", description: "Cari seorang atau komuniti yang melalui peralihan serupa.", duration: "20 min", actionable: true },
    ],
    ja: (anxiety) => [
      { stepNumber: 1, title: "自分の価値観を定義", description: "社会の期待ではなく、自分にとって最も重要な3つの価値観を挙げてください。", duration: "15分", actionable: true },
      { stepNumber: 2, title: "小さな一歩", description: "新しい方向への今日からできる小さな行動を1つ選びます。", duration: "10分", actionable: true },
      { stepNumber: 3, title: "支援の輪を作る", description: "同じような転機を経験している人やコミュニティを見つけます。", duration: "20分", actionable: true },
    ],
    ko: (anxiety) => [
      { stepNumber: 1, title: "가치관 정의하기", description: "사회적 기대가 아닌, 자신에게 가장 중요한 3가지 가치를 나열하세요.", duration: "15분", actionable: true },
      { stepNumber: 2, title: "작은 전환", description: "새로운 방향을 위한 오늘 할 수 있는 작은 행동을 하나 고르세요.", duration: "10분", actionable: true },
      { stepNumber: 3, title: "지원 그룹 만들기", description: "비슷한 전환을 겪고 있는 사람이나 커뮤니티를 찾으세요.", duration: "20분", actionable: true },
    ],
    th: (anxiety) => [
      { stepNumber: 1, title: "กำหนดคุณค่าของคุณ", description: "เขียน 3 คุณค่าชีวิตที่สำคัญที่สุดสำหรับคุณ โดยไม่อ้างอิงความคาดหวังของสังคม", duration: "15 นาที", actionable: true },
      { stepNumber: 2, title: "ก้าวเล็กๆ หนึ่งก้าว", description: "เลือกการกระทำเล็กๆ หนึ่งอย่างที่คุณสามารถทำได้วันนี้เพื่อไปสู่ทิศทางใหม่", duration: "10 นาที", actionable: true },
      { stepNumber: 3, title: "สร้างวงสนับสนุน", description: "หาคนหรือชุมชนที่กำลังผ่านการเปลี่ยนแปลงคล้ายกัน", duration: "20 นาที", actionable: true },
    ],
    es: (anxiety) => [
      { stepNumber: 1, title: "Define tus Valores", description: "Enumera tus 3 valores más importantes — no los de la sociedad, los tuyos.", duration: "15 min", actionable: true },
      { stepNumber: 2, title: "Un Pequeño Giro", description: "Elige una pequeña acción hacia tu nueva dirección.", duration: "10 min", actionable: true },
      { stepNumber: 3, title: "Construye tu Círculo", description: "Encuentra una persona o comunidad que esté pasando por una transición similar.", duration: "20 min", actionable: true },
    ],
  },
  insomnia: {
    zh: (anxiety) => [
      { stepNumber: 1, title: "设一个'床=睡眠'信号", description: "除了睡觉不用床。如果20分钟没睡着就起床。", duration: "持续", actionable: true },
      { stepNumber: 2, title: "睡前仪式", description: "睡前一小时关闭屏幕，做5分钟拉伸或阅读。", duration: "60分钟", actionable: true },
      { stepNumber: 3, title: "写担忧清单", description: "睡前把所有焦虑写下来锁进抽屉，告诉自己明天处理。", duration: "10分钟", actionable: true },
    ],
    en: (anxiety) => [
      { stepNumber: 1, title: "Bed = Sleep Signal", description: "Only use bed for sleep. Get up if not asleep in 20 min.", duration: "Ongoing", actionable: true },
      { stepNumber: 2, title: "Wind-Down Ritual", description: "No screens 1 hour before bed. Light stretch or reading.", duration: "60 min", actionable: true },
      { stepNumber: 3, title: "Worry Dump", description: "Write all worries before bed, lock them in a drawer, tell yourself tomorrow.", duration: "10 min", actionable: true },
    ],
    ms: (anxiety) => [
      { stepNumber: 1, title: "Katil = Isyarat Tidur", description: "Guna katil hanya untuk tidur. Bangun jika tidak dapat tidur dalam 20 min.", duration: "Berterusan", actionable: true },
      { stepNumber: 2, title: "Rutin Menenangkan", description: "Tiada skrin 1 jam sebelum tidur. Regangan ringan atau membaca.", duration: "60 min", actionable: true },
      { stepNumber: 3, title: "Lepaskan Kerisauan", description: "Tulis semua kerisauan sebelum tidur, kuncinya dalam laci, beritahu diri esok.", duration: "10 min", actionable: true },
    ],
    ja: (anxiety) => [
      { stepNumber: 1, title: "ベッド＝睡眠のシグナル", description: "ベッドは睡眠のみに使用。20分経っても眠れなければ一度起きましょう。", duration: "継続", actionable: true },
      { stepNumber: 2, title: "就寝前のルーティン", description: "就寝1時間前には画面をオフに。軽いストレッチや読書を。", duration: "60分", actionable: true },
      { stepNumber: 3, title: "悩みを書き出す", description: "寝る前にすべての不安を書き出して引き出しにしまい、明日考えると自分に言い聞かせます。", duration: "10分", actionable: true },
    ],
    ko: (anxiety) => [
      { stepNumber: 1, title: "침대=수면 신호", description: "침대는 수면용으로만 사용하세요. 20분 내로 잠이 안 오면 일어나세요.", duration: "지속", actionable: true },
      { stepNumber: 2, title: "취침 의식", description: "잠자기 1시간 전에 화면을 끄고 가벼운 스트레칭이나 독서를 하세요.", duration: "60분", actionable: true },
      { stepNumber: 3, title: "걱정 기록하기", description: "자기 전에 모든 걱정을 적어 서랍에 넣고, 내일 처리하겠다고 스스로 약속하세요.", duration: "10분", actionable: true },
    ],
    th: (anxiety) => [
      { stepNumber: 1, title: "เตียง = สัญญาณนอน", description: "ใช้เตียงสำหรับนอนเท่านั้น ถ้าไม่หลับใน 20 นาทีให้ลุกขึ้น", duration: "ต่อเนื่อง", actionable: true },
      { stepNumber: 2, title: "พิธีกรรมก่อนนอน", description: "ไม่มีหน้าจอ 1 ชั่วโมงก่อนนอน ยืดเส้นเบาๆ หรืออ่านหนังสือ", duration: "60 นาที", actionable: true },
      { stepNumber: 3, title: "เขียนความกังวล", description: "เขียนความกังวลทั้งหมดก่อนนอน ใส่ในลิ้นชัก บอกตัวเองว่าพรุ่งนี้ค่อยจัดการ", duration: "10 นาที", actionable: true },
    ],
    es: (anxiety) => [
      { stepNumber: 1, title: "Cama = Señal de Sueño", description: "Usa la cama solo para dormir. Levántate si no te duermes en 20 min.", duration: "Continuo", actionable: true },
      { stepNumber: 2, title: "Ritual de Relajación", description: "Sin pantallas 1 hora antes de dormir. Estiramiento ligero o lectura.", duration: "60 min", actionable: true },
      { stepNumber: 3, title: "Vuelca tus Preocupaciones", description: "Escribe todas las preocupaciones antes de dormir, guárdalas en un cajón y decídete a mañana.", duration: "10 min", actionable: true },
    ],
  },
  general: {
    zh: (anxiety) => [
      { stepNumber: 1, title: "给焦虑命名", description: "用一个词描述此刻的焦虑，给它贴上标签。", duration: "2分钟", actionable: true },
      { stepNumber: 2, title: "做一个微小行动", description: "从焦虑事项中挑出最小的一步，现在就做。", duration: "5分钟", actionable: true },
      { stepNumber: 3, title: "记录一个进展", description: "完成后写下你做了什么，它实际有没有想象中可怕。", duration: "3分钟", actionable: true },
    ],
    en: (anxiety) => [
      { stepNumber: 1, title: "Name the Anxiety", description: "Describe the anxiety in one word — labeling reduces its power.", duration: "2 min", actionable: true },
      { stepNumber: 2, title: "One Tiny Action", description: "Pick the smallest step you can take right now. Do it.", duration: "5 min", actionable: true },
      { stepNumber: 3, title: "Log Your Win", description: "Write down what you did and whether it was as bad as you feared.", duration: "3 min", actionable: true },
    ],
    ms: (anxiety) => [
      { stepNumber: 1, title: "Namakan Kebimbangan", description: "Terangkan kebimbangan dalam satu perkataan — melabel mengurangkan kuasanya.", duration: "2 min", actionable: true },
      { stepNumber: 2, title: "Satu Tindakan Kecil", description: "Pilih langkah terkecil yang boleh diambil sekarang. Lakukan.", duration: "5 min", actionable: true },
      { stepNumber: 3, title: "Catat Kemenangan Anda", description: "Tulis apa yang anda lakukan dan sama ada ia seburuk yang anda takuti.", duration: "3 min", actionable: true },
    ],
    ja: (anxiety) => [
      { stepNumber: 1, title: "不安に名前をつける", description: "今の不安を一言で表現しましょう。ラベリングすることで不安の力が弱まります。", duration: "2分", actionable: true },
      { stepNumber: 2, title: "小さな行動を1つ", description: "不安の中から最も小さな一歩を選び、今すぐ実行します。", duration: "5分", actionable: true },
      { stepNumber: 3, title: "進捗を記録", description: "実行したことと、実際には想像ほど怖くなかったかを書き留めます。", duration: "3分", actionable: true },
    ],
    ko: (anxiety) => [
      { stepNumber: 1, title: "불안에 이름 붙이기", description: "지금의 불안을 한 단어로 표현하세요. 이름을 붙이면 불안의 힘이 약해집니다.", duration: "2분", actionable: true },
      { stepNumber: 2, title: "하나의 작은 행동", description: "불안 항목 중 가장 작은 단계를 골라 지금 바로 실행하세요.", duration: "5분", actionable: true },
      { stepNumber: 3, title: "성과 기록하기", description: "무엇을 했는지, 실제로는 상상했던 것만큼 두렵지 않았는지 기록하세요.", duration: "3분", actionable: true },
    ],
    th: (anxiety) => [
      { stepNumber: 1, title: "ตั้งชื่อความวิตกกังวล", description: "อธิบายความวิตกกังวลด้วยคำเดียว การติดฉลากช่วยลดพลังของมัน", duration: "2 นาที", actionable: true },
      { stepNumber: 2, title: "หนึ่งการกระทำเล็กๆ", description: "เลือกขั้นตอนที่เล็กที่สุดที่คุณทำได้ตอนนี้ แล้วลงมือทำ", duration: "5 นาที", actionable: true },
      { stepNumber: 3, title: "บันทึกความสำเร็จ", description: "เขียนสิ่งที่คุณทำและว่ามันเลวร้ายอย่างที่คุณกลัวหรือไม่", duration: "3 นาที", actionable: true },
    ],
    es: (anxiety) => [
      { stepNumber: 1, title: "Nombra la Ansiedad", description: "Describe la ansiedad en una palabra — etiquetarla reduce su poder.", duration: "2 min", actionable: true },
      { stepNumber: 2, title: "Una Pequeña Acción", description: "Elige el paso más pequeño que puedas dar ahora. Hazlo.", duration: "5 min", actionable: true },
      { stepNumber: 3, title: "Registra tu Logro", description: "Escribe lo que hiciste y si fue tan malo como temías.", duration: "3 min", actionable: true },
    ],
  },
}

// ── 危机资源 ──

const CRISIS_RESOURCES: Record<string, CrisisResource[]> = {
  zh: [
    { region: "中国", hotline: "010-82951332", description: "北京心理危机研究与干预中心 — 24小时" },
    { region: "中国", hotline: "400-161-9995", description: "希望24热线 — 全国心理危机干预热线" },
    { region: "全球", hotline: "112", description: "本地紧急服务 — 立即拨打" },
    { region: "通用", hotline: "心理援助", description: "告诉身边的人，不要独自承担" },
  ],
  en: [
    { region: "International", hotline: "+1-800-273-8255", description: "National Suicide Prevention Lifeline — 24/7" },
    { region: "International", hotline: "741741", description: "Crisis Text Line — Text HOME to connect" },
    { region: "Global", hotline: "112", description: "Local emergency services — call immediately" },
    { region: "General", hotline: "Speak to someone", description: "Tell someone you trust. You don't have to face this alone." },
  ],
  ms: [
    { region: "Malaysia", hotline: "03-7627 2929", description: "Befrienders KL — 24 hour emotional support" },
    { region: "Malaysia", hotline: "15999", description: "KKM Talian Kasih — 24/7 crisis hotline" },
    { region: "Global", hotline: "112", description: "Perkhidmatan kecemasan tempatan — hubungi segera" },
    { region: "General", hotline: "Bercakap dengan seseorang", description: "Beritahu seseorang yang anda percayai. Anda tidak perlu hadapi ini sendirian." },
  ],
  ja: [
    { region: "日本", hotline: "0120-279-338", description: "いのちの電話 — 24時間対応" },
    { region: "日本", hotline: "03-5774-0992", description: "Tell Lifeline — 東京英語電話相談" },
    { region: "Global", hotline: "112", description: "緊急サービス — すぐに電話を" },
    { region: "General", hotline: "誰かに話す", description: "信頼できる人に話してください。一人で抱え込まないで。" },
  ],
  ko: [
    { region: "한국", hotline: "1393", description: "자살예방상담전화 — 24시간 운영" },
    { region: "한국", hotline: "1577-0199", description: "정신건강 위기상담전화 — 24/7" },
    { region: "Global", hotline: "112", description: "응급 서비스 — 즉시 전화하세요" },
    { region: "General", hotline: "누군가에게 말하기", description: "신뢰할 수 있는 사람에게 이야기하세요. 혼자 감당할 필요 없습니다." },
  ],
  th: [
    { region: "ไทย", hotline: "1323", description: "สายด่วนสุขภาพจิต 24 ชม. — กรมสุขภาพจิต" },
    { region: "ไทย", hotline: "02-713-6791", description: "Samaritans Thailand — สายด่วนวิกฤต" },
    { region: "Global", hotline: "112", description: "บริการฉุกเฉินท้องถิ่น — โทรทันที" },
    { region: "General", hotline: "พูดคุยกับใครสักคน", description: "บอกคนที่คุณไว้ใจ คุณไม่จำเป็นต้องเผชิญสิ่งนี้เพียงลำพัง" },
  ],
  es: [
    { region: "Internacional", hotline: "+34-024-911-385-385", description: "Línea de Prevención del Suicidio — 24/7" },
    { region: "Latinoamérica", hotline: "+52-55-5259-8121", description: "Línea de Crisis SAPTEL — atención 24 horas" },
    { region: "Global", hotline: "112", description: "Servicios de emergencia locales — llame de inmediato" },
    { region: "General", hotline: "Habla con alguien", description: "Dile a alguien de confianza. No tienes que enfrentar esto solo." },
  ],
}

// ── 情感验证生成 ──

function generateValidation(
  intensity: "low" | "medium" | "high" | "crisis",
  patterns: DetectedPattern[],
  locale: Locale,
): EmotionalValidation {
  const primaryPattern = patterns[0]
  const patternLabel = primaryPattern
    ? (locale === "zh"
        ? PRIMARY_PATTERN_LABELS_ZH[primaryPattern.type] || primaryPattern.type
        : PRIMARY_PATTERN_LABELS_EN[primaryPattern.type] || primaryPattern.type)
    : (locale === "zh" ? "焦虑" : "anxiety")

  if (intensity === "crisis") {
    const crisisMessages: Record<Locale, { emotion: string; statement: string }> = {
      zh: { emotion: "极端痛苦", statement: "你正在经历非常艰难的时期，这种痛苦是真实且值得被认真对待的。" },
      en: { emotion: "extreme distress", statement: "You are going through an extremely difficult time. This pain is real and deserves to be taken seriously." },
      ms: { emotion: "tekanan melampau", statement: "Anda sedang melalui masa yang sangat sukar. Kesakitan ini nyata dan perlu diambil serius." },
      ja: { emotion: "極度の苦痛", statement: "あなたは今、非常に困難な時期を経験しています。この苦しみは現実であり、真剣に向き合う価値があります。" },
      ko: { emotion: "극심한 고통", statement: "지금 매우 힘든 시간을 보내고 계십니다. 이 고통은 진짜이며 진지하게 다뤄져야 마땅합니다." },
      th: { emotion: "ความทุกข์อย่างรุนแรง", statement: "คุณกำลังผ่านช่วงเวลาที่ยากลำบากมาก ความเจ็บปวดนี้มีจริงและสมควรได้รับการดูแลอย่างจริงจัง" },
      es: { emotion: "angustia extrema", statement: "Estás pasando por un momento extremadamente difícil. Este dolor es real y merece ser tomado en serio." },
    }
    const msg = crisisMessages[locale] || crisisMessages.en
    return {
      intensity: "crisis",
      primaryEmotion: msg.emotion,
      emotionAppeal: "action",
      validationStatement: msg.statement,
    }
  }

  const isZh = locale === "zh"
  const validationPool = isZh
    ? [
        `你感到${patternLabel}，这是完全正常的反应。这种感受本身不是问题，问题在于我们如何理解它。`,
        `我能感受到你此刻的${patternLabel}。你愿意说出来，这本身就是一种勇气。`,
        `你的${patternLabel}是真实的，也是可以理解的。我们不需要否认它，而是学会与之共处。`,
        `你此刻的${patternLabel}背后，其实藏着你对某件事的在乎和重视。`,
      ]
    : [
        `Your feeling of ${patternLabel} is completely normal. The feeling itself isn't the problem — it's how we relate to it.`,
        `I can sense your ${patternLabel}. The fact that you're expressing it already takes courage.`,
        `Your ${patternLabel} is real and understandable. We don't need to deny it — we learn to coexist with it.`,
        `Behind your ${patternLabel} is something you deeply care about. Let's explore that.`,
      ]

  return {
    intensity,
    primaryEmotion: patternLabel,
    emotionAppeal: "acceptance",
    validationStatement: validationPool[patterns.length % validationPool.length],
  }
}

const PRIMARY_PATTERN_LABELS_ZH: Record<string, string> = {
  catastrophizing: "灾难化焦虑",
  black_and_white: "非黑即白的困扰",
  mind_reading: "对他人的过度猜测",
  emotional_reasoning: "情绪化的判断",
  overgeneralization: "过度概括的担忧",
  should_statements: "自我苛责",
  labeling: "自我标签的痛苦",
  personalization: "过度自责",
  fortune_telling: "对未来的恐惧",
  minimization: "低估自己",
  comparison: "与他人比较的失落",
  filtering: "负面聚焦",
}

const PRIMARY_PATTERN_LABELS_EN: Record<string, string> = {
  catastrophizing: "catastrophic anxiety",
  black_and_white: "all-or-nothing thinking",
  mind_reading: "overthinking about others",
  emotional_reasoning: "emotional overwhelm",
  overgeneralization: "overgeneralized worry",
  should_statements: "self-criticism",
  labeling: "self-labeling pain",
  personalization: "over-responsibility",
  fortune_telling: "fear of the future",
  minimization: "underestimating yourself",
  comparison: "comparison fatigue",
  filtering: "negative focus",
}

// ── 深度信念挖掘层（CBT三层） ──

function extractCognitiveTiers(
  text: string,
  patternAnalysis: PatternAnalysisResult,
  locale: Locale,
): CognitiveTiers {
  const isZh = locale === "zh"

  const nastLevel: string[] = []
  if (patternAnalysis.patterns.length > 0) {
    const primaryPattern = patternAnalysis.patterns[0]
    if (primaryPattern.matchedText) {
      nastLevel.push(primaryPattern.matchedText)
    }
  }
  if (nastLevel.length === 0) {
    const sentences = text.split(/[。！？\n.!?]/).filter(s => s.trim().length > 0)
    if (sentences.length > 0) {
      nastLevel.push(sentences[0].trim())
    }
  }

  const intermediateBeliefs: string[] = []
  for (const pattern of patternAnalysis.patterns.slice(0, 3)) {
    const rule = inferIntermediateBelief(pattern.type, isZh)
    if (rule) intermediateBeliefs.push(rule)
  }

  const coreBeliefs: string[] = []
  const core = inferCoreBelief(patternAnalysis, isZh)
  if (core) coreBeliefs.push(core)

  return { nastLevel, intermediateBeliefs, coreBeliefs }
}

function inferIntermediateBelief(
  type: CognitiveDistortionType,
  isZh: boolean,
): string | null {
  const beliefMap: Partial<Record<CognitiveDistortionType, string[]>> = {
    catastrophizing: isZh
      ? ["如果事情出错了，后果将无法承受。", "我必须时刻警惕最坏的情况才能保护自己。"]
      : ["If something goes wrong, the consequences will be unbearable.", "I must always watch for the worst to protect myself."],
    black_and_white: isZh
      ? ["如果我不是完美的，那我就是彻底的失败者。", "事情只有对错两种结果，没有中间状态。"]
      : ["If I'm not perfect, I'm a complete failure.", "Things are either right or wrong — there's no middle ground."],
    mind_reading: isZh
      ? ["我必须能猜到别人的想法，否则就会被排斥。", "如果我不确定对方怎么想，那一定是负面的。"]
      : ["I must be able to read others' minds, or I'll be rejected.", "If I'm not sure what they think, it must be negative."],
    emotional_reasoning: isZh
      ? ["如果我感觉某件事是真的，那它就一定是真的。", "我的情绪可以直接反映现实。"]
      : ["If I feel something is true, it must be true.", "My emotions directly reflect reality."],
    overgeneralization: isZh
      ? ["一次失败意味着永远都会失败。", "如果一件事出错了，所有类似的事都会出错。"]
      : ["One failure means I'll always fail.", "If one thing goes wrong, everything similar will go wrong."],
    should_statements: isZh
      ? ["我必须永远做到最好。", "我应该能掌控所有事。"]
      : ["I must always do my best.", "I should be able to control everything."],
    labeling: isZh
      ? ["如果我做错了事，那我就是一个坏人。", "一次失误就定义了我的全部。"]
      : ["If I do something wrong, I am a bad person.", "One mistake defines who I am."],
    personalization: isZh
      ? ["我必须为周围发生的所有坏事负责。", "如果别人不开心，那一定是我的错。"]
      : ["I must be responsible for everything bad that happens.", "If others are unhappy, it must be my fault."],
    fortune_telling: isZh
      ? ["如果我能预测到坏结果，那我就可以提前放弃。", "我的负面预测总是准的。"]
      : ["If I can predict a bad outcome, I can give up early.", "My negative predictions are always right."],
    minimization: isZh
      ? ["我的成就不值一提，只有完美才算数。", "我不应该为自己的努力感到骄傲。"]
      : ["My achievements don't count — only perfection matters.", "I shouldn't feel proud of my efforts."],
    comparison: isZh
      ? ["我必须比别人更好才有价值。", "如果别人比我强，那就说明我不够好。"]
      : ["I must be better than others to have value.", "If others are better than me, it means I'm not good enough."],
    filtering: isZh
      ? ["如果我只看坏的部分，就能避免失望。", "正面的东西不值得关注，只有问题才重要。"]
      : ["If I focus only on the bad, I can avoid disappointment.", "Positive things don't matter — only problems count."],
  }
  const beliefs = beliefMap[type]
  return beliefs ? beliefs[0] : null
}

function inferCoreBelief(
  patternAnalysis: PatternAnalysisResult,
  isZh: boolean,
): string | null {
  if (patternAnalysis.patterns.length === 0) return null

  const hasLabeling = patternAnalysis.patterns.some(p => p.type === "labeling")
  const hasPersonalization = patternAnalysis.patterns.some(p => p.type === "personalization")
  const hasCatastrophizing = patternAnalysis.patterns.some(p => p.type === "catastrophizing")

  if (hasLabeling || hasPersonalization) {
    return isZh ? "我是不好的 / 我是有缺陷的" : "I am bad / I am defective"
  }
  if (hasCatastrophizing) {
    return isZh ? "未来是危险的 / 世界是不可预测的" : "The future is dangerous / The world is unpredictable"
  }

  const primaryType = patternAnalysis.patterns[0].type
  const coreMap: Partial<Record<CognitiveDistortionType, string[]>> = {
    catastrophizing: isZh ? ["世界是危险的，我无法应对"] : ["The world is dangerous, I can't cope"],
    black_and_white: isZh ? ["我必须完美否则我就是失败的"] : ["I must be perfect or I'm a failure"],
    mind_reading: isZh ? ["我不被他人接纳"] : ["I'm not accepted by others"],
    emotional_reasoning: isZh ? ["我的感受定义了我"] : ["My feelings define who I am"],
    overgeneralization: isZh ? ["我做什么都会失败"] : ["I always fail at everything"],
    should_statements: isZh ? ["我永远不够努力"] : ["I never try hard enough"],
    labeling: isZh ? ["我有本质的缺陷"] : ["There's something fundamentally wrong with me"],
    personalization: isZh ? ["一切都是我的错"] : ["Everything is my fault"],
    fortune_telling: isZh ? ["未来注定是糟糕的"] : ["The future is doomed"],
    minimization: isZh ? ["我不配被认可"] : ["I don't deserve recognition"],
    comparison: isZh ? ["我比不上别人"] : ["I'm inferior to others"],
    filtering: isZh ? ["生活只有负面"] : ["Life is only negative"],
  }
  const core = coreMap[primaryType]
  return core ? core[0] : null
}

// ── 正念推荐 ──

function recommendMindfulness(
  patterns: DetectedPattern[],
  locale: Locale,
): MindfulnessExercise | undefined {
  if (patterns.length === 0) return undefined
  const primary = patterns[0].type

  if (primary === "catastrophizing" || primary === "fortune_telling") {
    return MINDFULNESS_LIBRARY.breathing_478[locale]
  }
  if (primary === "emotional_reasoning" || primary === "filtering") {
    return MINDFULNESS_LIBRARY.grounding_54321[locale]
  }
  if (primary === "should_statements" || primary === "labeling") {
    return MINDFULNESS_LIBRARY.body_scan[locale]
  }
  return MINDFULNESS_LIBRARY.breathing_478[locale]
}

// ── 任务拆解生成 ──

function decomposeTask(
  input: EngineInput,
  patterns: DetectedPattern[],
): TaskDecomposition | undefined {
  if (patterns.length === 0) return undefined
  const strategyKey = input.distressType || "general"
  const strategy = DECOMPOSITION_STRATEGIES[strategyKey] || DECOMPOSITION_STRATEGIES.general
  const steps = (strategy[input.locale] || strategy.en)(input.message)
  const isZh = input.locale === "zh"
  const rationale = isZh
    ? `将焦虑拆解为${steps.length}个小步骤，每一步都是可执行的。你不需要一次做完所有，做一步就是胜利。`
    : `Breaking down anxiety into ${steps.length} small steps. Each step is actionable. Doing just one is a win.`

  const phaseBreakdown: { milestone: string; miniSteps: string[] }[] = []
  if (steps.length > 0) {
    const mid = Math.ceil(steps.length / 2)
    phaseBreakdown.push({
      milestone: isZh ? "第一阶段" : "Phase One",
      miniSteps: steps.slice(0, mid).map(s => s.title),
    })
    if (mid < steps.length) {
      phaseBreakdown.push({
        milestone: isZh ? "第二阶段" : "Phase Two",
        miniSteps: steps.slice(mid).map(s => s.title),
      })
    }
  }

  return {
    originalAnxiety: input.message,
    steps,
    totalSteps: steps.length,
    rationale,
    phaseBreakdown,
  }
}

// ── 引擎入口函数 ──

export interface ProcessInput extends EngineInput {
  callLLM?: (prompt: string, messages?: { role: string; content: string }[]) => Promise<AnxietyAnalysis | null>
  mockFallback: (message: string, locale: Locale, mode: string) => AnxietyAnalysis
}

export async function counselorEngine(input: ProcessInput): Promise<EngineOutput> {
  const { message, locale, mode, callLLM, mockFallback } = input

  // 阶段1：认知检测（纯本地，零延迟）
  const patternAnalysis = detectPatterns(message, locale)
  const crisisResult = detectCrisis(message, locale)
  const intensity = assessEmotionalIntensity(message)
  const cognitiveTiers = extractCognitiveTiers(message, patternAnalysis, locale)

  // 阶段2：情感验证（本地生成）
  const emotionalValidation = generateValidation(
    intensity,
    patternAnalysis.patterns,
    locale,
  )

  // 阶段3：正念推荐
  const mindfulnessExercise = recommendMindfulness(
    patternAnalysis.patterns,
    locale,
  )

  // 阶段4：任务拆解
  const taskDecomposition = decomposeTask(input, patternAnalysis.patterns)

  // 阶段5：危机处理 — 覆盖兜底
  let crisisResources: CrisisResource[] | undefined
  if (crisisResult.level !== "none" || intensity === "crisis") {
    crisisResources = CRISIS_RESOURCES[locale] || CRISIS_RESOURCES.en
  }

  // 阶段6：LLM 生成主回复
  let mainResponse: AnxietyAnalysis

  if (callLLM) {
    const llmResult = await callLLM(message, buildEngineMessages(input, patternAnalysis))
    if (llmResult) {
      mainResponse = llmResult
    } else {
      mainResponse = mockFallback(message, locale, mode)
    }
  } else {
    mainResponse = mockFallback(message, locale, mode)
  }

  // 阶段7：质量评估
  const output: EngineOutput = {
    thinkingPattern: mainResponse.thinkingPattern,
    encouragement: mainResponse.encouragement,
    steps: mainResponse.steps,
    dailyNote: (mainResponse as any).dailyNote || "",
    patternAnalysis,
    cognitiveTiers,
    emotionalValidation,
    taskDecomposition,
    mindfulnessExercise,
    crisisResources,
    usage: (mainResponse as any).usage || undefined,
  }

  output.evaluation = evaluateOutput(output, {
    locale,
    crisis: crisisResult.level !== "none",
    patternCount: patternAnalysis.patternCount,
  })

  return output
}

// ── 构建引擎注入的上下文 ──

function buildEngineMessages(
  input: EngineInput,
  patternAnalysis: PatternAnalysisResult,
): { role: string; content: string }[] {
  const isZh = input.locale === "zh"
  const messages: { role: string; content: string }[] = []

  // [1] 语言锁定 — 强制 LLM 以用户输入语言回复
  const langName: Record<string, string> = {
    zh: "Chinese",
    en: "English",
    ms: "Malay",
    ja: "Japanese",
    ko: "Korean",
    th: "Thai",
    es: "Spanish",
  }
  const lang = langName[input.locale] || "Chinese"
  messages.push({
    role: "system",
    content: `[CRITICAL: LANGUAGE_LOCK] You MUST detect the language of the user's input and ALWAYS respond in the SAME language. Current locale: ${input.locale} (${lang}). Never switch to English or any other language during the conversation. This is a strict rule.`,
  })

  // [2] 认知扭曲检测注入
  if (patternAnalysis.patterns.length > 0) {
    const patternSummary = patternAnalysis.patterns
      .map((p, i) => {
        const label = isZh
          ? COGNITIVE_DISTORTION_LABELS_ZH[p.type]
          : COGNITIVE_DISTORTION_LABELS_EN[p.type]
        return `[${i + 1}] ${label} (confidence: ${p.confidence}, severity: ${p.severity})`
      })
      .join("\n")

    const diagnosis = isZh
      ? `【认知检测结果】检测到以下认知扭曲模式：\n${patternSummary}\n\n请在回复中自然地进行认知重构。`
      : `[Cognitive Detection] Detected patterns:\n${patternSummary}\n\nPlease naturally reframe these in your response.`

    messages.push({ role: "system", content: diagnosis })
  }

  // [3] CBT 三阶段框架指令
  messages.push({
    role: "system",
    content: `[CBT_FRAMEWORK] Follow this 3-step process in your response:
1) Emotional Validation: Identify the user's specific stressors (e.g., age, unemployment, financial pressure). Show deep empathy. Acknowledge their pain without judgment.
2) Cognitive Reframing: Identify and gently challenge catastrophic thinking patterns. Help the user see a more objective reality.
3) Task Decomposition: Offer 3 tiny, actionable steps at the end to restore the user's sense of agency.
Always maintain a warm, professional, and non-judgmental tone.`,
  })

  return messages
}

const COGNITIVE_DISTORTION_LABELS_ZH: Record<string, string> = {
  catastrophizing: "灾难化思维",
  black_and_white: "非黑即白",
  mind_reading: "读心术",
  emotional_reasoning: "情绪推理",
  overgeneralization: "过度概括",
  should_statements: "苛责陈述",
  labeling: "贴标签",
  personalization: "个人化",
  fortune_telling: "算命偏差",
  minimization: "弱化正面",
  comparison: "攀比思维",
  filtering: "负面过滤",
}

const COGNITIVE_DISTORTION_LABELS_EN: Record<string, string> = {
  catastrophizing: "Catastrophizing",
  black_and_white: "Black-and-White Thinking",
  mind_reading: "Mind Reading",
  emotional_reasoning: "Emotional Reasoning",
  overgeneralization: "Overgeneralization",
  should_statements: "Should Statements",
  labeling: "Labeling",
  personalization: "Personalization",
  fortune_telling: "Fortune Telling",
  minimization: "Minimization",
  comparison: "Comparison Trap",
  filtering: "Mental Filtering",
}
