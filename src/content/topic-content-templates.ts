import type { Locale } from '@/types';
import type { TopicContent, TopicFaqItem } from './topics';

function fill(t: string, title: string): string {
  return t.replace(/\{\{T\}\}/g, title)
}

function pick<T>(map: Record<string, T>, lang: Locale, fallback: T): T {
  return map[lang] ?? fallback
}

const SCIENCE: Record<string, Record<string, string>> = {
  sleep: {
    zh: `睡眠是维持身心健康的核心生理过程，约占我们生命三分之一的时间。当我们谈论「{{T}}」时，需要从神经科学的角度理解其深层机制。

人类的睡眠由非快速眼动睡眠（NREM）和快速眼动睡眠（REM）交替组成，每个周期约90分钟，整夜循环4-6次。NREM睡眠又分为入睡期、浅睡期和深睡期（慢波睡眠），其中深睡期对体力恢复和免疫系统修复至关重要，而REM睡眠则参与记忆巩固和情绪调节。

全球约30%的成年人存在不同程度的睡眠障碍。世界卫生组织的数据显示，失眠症是最常见的睡眠问题，患病率约为10-30%。长期睡眠不足不仅会导致日间疲劳、注意力下降、记忆力减退、情绪不稳，还会显著增加心血管疾病、代谢综合征和免疫功能障碍的患病风险。

在神经递质层面，睡眠-觉醒周期由脑干、下丘脑和基底前脑的多个核团协同调控。腺苷（adenosine）作为睡眠压力分子，在清醒期间逐渐积累，达到阈值后触发睡眠驱动力；褪黑素（melatonin）由松果体分泌，向身体发出"夜间模式"信号；皮质醇则在早晨达到高峰，帮助觉醒。

临床实践中，针对{{T}}的循证干预首选认知行为疗法（CBT-I）。CBT-I包括刺激控制（仅在困倦时上床）、睡眠限制（压缩卧床时间以增强睡眠驱动力）、认知重构（纠正关于睡眠的功能失调信念）、放松训练和睡眠卫生教育等多个组分。临床研究显示CBT-I的长期效果甚至优于安眠药物，且不存在药物依赖和耐受性问题。

近年来，正念减压（MBSR）和接纳承诺疗法（ACT）在睡眠领域的应用也获得了充分证据支持。正念练习通过降低睡前认知唤醒水平（如反复思虑和担忧）、减少对"必须睡着"的焦虑性监控，帮助患者打破"失眠-焦虑-失眠加重"的恶性循环。 #VibeCoding #EmotionalFitness`,
    en: `Sleep is a fundamental physiological process that occupies roughly one-third of our lives. When we discuss {{T}}, understanding its underlying neuroscientific mechanisms is essential.

Human sleep alternates between Non-Rapid Eye Movement (NREM) and Rapid Eye Movement (REM) stages in approximately 90-minute cycles, repeating 4-6 times per night. NREM sleep is further divided into light sleep (N1, N2) and deep slow-wave sleep (N3), the latter being critical for physical restoration and immune function. REM sleep plays a vital role in memory consolidation and emotional regulation.

Approximately 30% of adults worldwide experience some form of sleep disturbance. Insomnia, the most prevalent sleep disorder, affects 10-30% of the general population. Chronic sleep deprivation leads not only to daytime fatigue, reduced attention, memory impairment, and mood instability, but also significantly increases the risk of cardiovascular disease, metabolic syndrome, and immune dysfunction.

From a neurochemical perspective, the sleep-wake cycle is orchestrated by multiple brainstem, hypothalamic, and basal forebrain nuclei. Adenosine accumulates during wakefulness as a homeostatic sleep pressure molecule; melatonin, secreted by the pineal gland, signals the body for nighttime rest; cortisol peaks in the morning to promote alertness.

Evidence-based interventions for {{T}} prioritize Cognitive Behavioral Therapy for Insomnia (CBT-I). Core components include stimulus control (going to bed only when sleepy), sleep restriction (consolidating the sleep window), cognitive restructuring (challenging dysfunctional beliefs about sleep), relaxation training, and sleep hygiene education. Clinical trials consistently demonstrate CBT-I's superior long-term efficacy over pharmacological interventions, without risks of dependence or tolerance.

Mindfulness-Based Stress Reduction (MBSR) and Acceptance and Commitment Therapy (ACT) have also accumulated strong evidence in sleep medicine. By reducing pre-sleep cognitive arousal—particularly rumination and anxious monitoring of sleep—mindfulness practices help disrupt the vicious cycle of insomnia-anxiety-worsening insomnia. #VibeCoding #EmotionalFitness`,
    ms: `Tidur adalah proses fisiologi asas yang mengisi kira-kira satu pertiga daripada kehidupan kita. Apabila membincangkan {{T}}, memahami mekanisme neurosaintifiknya adalah penting.

Tidur manusia bergilir antara peringkat Pergerakan Mata Bukan Pantas (NREM) dan Pergerakan Mata Pantas (REM) dalam kitaran kira-kira 90 minit, berulang 4-6 kali setiap malam. Tidur NREM dibahagikan kepada tidur ringan dan tidur dalam (gelombang perlahan), yang penting untuk pemulihan fizikal dan fungsi imun. Tidur REM memainkan peranan dalam konsolidasi ingatan dan regulasi emosi.

Kira-kira 30% orang dewasa di seluruh dunia mengalami gangguan tidur. Insomnia, gangguan tidur paling biasa, menjejaskan 10-30% populasi. Kekurangan tidur kronik membawa kepada keletihan siang hari, penurunan perhatian, gangguan ingatan, ketidakstabilan emosi, dan meningkatkan risiko penyakit kardiovaskular dan sindrom metabolik.

Intervensi berasaskan bukti untuk {{T}} mengutamakan Terapi Tingkah Laku Kognitif untuk Insomnia (CBT-I). Komponen utama termasuk kawalan rangsangan, sekatan tidur, restrukturisasi kognitif, latihan relaksasi, dan pendidikan kebersihan tidur. Kajian klinikal menunjukkan keberkesanan jangka panjang CBT-I mengatasi campur tangan farmakologi tanpa risiko pergantungan.

Dari perspektif neurokimia, kitaran tidur-jaga dikawal selia oleh pelbagai nukleus batang otak, hipotalamus, dan otak depan basal. Adenosin terkumpul semasa terjaga sebagai molekul tekanan tidur homeostatik; melatonin, dirembeskan oleh kelenjar pineal, memberi isyarat kepada badan untuk berehat pada waktu malam; kortisol memuncak pada waktu pagi untuk menggalakkan kewaspadaan.

Pengurangan Tekanan Berasaskan Kesedaran (MBSR) dan Terapi Penerimaan dan Komitmen (ACT) juga telah mengumpul bukti kukuh dalam perubatan tidur. Dengan mengurangkan pengaktifan kognitif sebelum tidur—terutamanya ruminasi dan pemantauan cemas terhadap tidur—amalan kesedaran membantu memutuskan lingkaran ganas insomnia-kebimbangan-insomnia yang semakin teruk. #VibeCoding #EmotionalFitness`,
    es: `El sueño es un proceso fisiológico fundamental que ocupa aproximadamente un tercio de nuestras vidas. Al hablar de {{T}}, es esencial comprender sus mecanismos neurocientíficos subyacentes.

El sueño humano alterna entre etapas de Movimiento Ocular No Rápido (NREM) y Movimiento Ocular Rápido (REM) en ciclos de aproximadamente 90 minutos, repitiéndose 4-6 veces por noche. El sueño NREM se divide en sueño ligero y sueño profundo de ondas lentas, fundamental para la restauración física y la función inmunológica. El sueño REM desempeña un papel crucial en la consolidación de la memoria y la regulación emocional.

Aproximadamente el 30% de los adultos en todo el mundo experimenta algún tipo de trastorno del sueño. El insomnio, el trastorno del sueño más prevalente, afecta al 10-30% de la población general. La privación crónica del sueño conduce no solo a fatiga diurna, reducción de la atención, deterioro de la memoria e inestabilidad del estado de ánimo, sino que también aumenta significativamente el riesgo de enfermedades cardiovasculares y síndrome metabólico.

Las intervenciones basadas en evidencia para {{T}} priorizan la Terapia Cognitivo-Conductual para el Insomnio (TCC-I). Los componentes principales incluyen control de estímulos, restricción del sueño, reestructuración cognitiva, entrenamiento en relajación y educación sobre higiene del sueño. Los ensayos clínicos demuestran consistentemente la eficacia superior a largo plazo de la TCC-I sobre las intervenciones farmacológicas.

Desde una perspectiva neuroquímica, el ciclo sueño-vigilia está orquestado por múltiples núcleos del tronco encefálico, el hipotálamo y el prosencéfalo basal. La adenosina se acumula durante la vigilia como molécula de presión homeostática del sueño; la melatonina, secretada por la glándula pineal, señala al cuerpo el descanso nocturno; el cortisol alcanza su punto máximo por la mañana para promover la alerta.

La Reducción del Estrés Basada en Mindfulness (MBSR) y la Terapia de Aceptación y Compromiso (ACT) también han acumulado evidencia sólida en la medicina del sueño. Al reducir la activación cognitiva previa al sueño—particularmente la rumiación y el monitoreo ansioso del sueño—las prácticas de mindfulness ayudan a romper el círculo vicioso de insomnio-ansiedad-empeoramiento del insomnio. #VibeCoding #EmotionalFitness`,
    ja: `睡眠は心身の健康を支える基本的な生理プロセスであり、私たちの人生の約3分の1を占めています。「{{T}}」について考える際には、神経科学的な観点からその深層メカニズムを理解することが不可欠です。

人間の睡眠は、ノンレム睡眠（NREM）とレム睡眠（REM）が約90分周期で交互に現れ、一晩に4〜6回繰り返されます。NREM睡眠は入眠期、浅睡眠期、深睡眠期（徐波睡眠）に分かれ、深睡眠期は体力回復と免疫機能の修復に不可欠です。一方、レム睡眠は記憶の固定化と感情調節に重要な役割を果たします。

世界保健機関（WHO）のデータによると、世界の成人の約30％が何らかの睡眠障害を経験しています。不眠症は最も一般的な睡眠問題であり、有病率は10〜30％と推定されています。慢性的な睡眠不足は日中の疲労、注意力低下、記憶障害、感情不安定だけでなく、心血管疾患、メタボリックシンドローム、免疫機能障害のリスクを著しく高めます。

神経伝達物質の観点では、睡眠-覚醒サイクルは脳幹、視床下部、前脳基底部の複数の核が連携して制御しています。アデノシンは覚醒中に蓄積される睡眠圧分子であり、閾値に達すると睡眠駆動力を引き起こします。メラトニンは松果体から分泌され、身体に「夜間モード」を知らせます。コルチゾールは早朝にピークに達し、覚醒を促進します。これらの神経化学的バランスが崩れると、{{T}}の症状が現れます。

臨床現場では、{{T}}に対するエビデンスに基づく介入として、不眠症のための認知行動療法（CBT-I）が第一選択です。CBT-Iの構成要素には、刺激制御（眠い時だけベッドに入る）、睡眠制限（ベッドでの時間を圧縮して睡眠駆動力を高める）、認知再構成（睡眠に関する機能不全信念を修正する）、リラクセーション訓練、睡眠衛生教育が含まれます。臨床試験では、CBT-Iの長期的効果が薬物療法を上回り、依存や耐性のリスクもないことが一貫して示されています。

近年では、マインドフルネスストレス低減法（MBSR）とアクセプタンス＆コミットメント・セラピー（ACT）の睡眠領域への応用も強力なエビデンスを蓄積しています。#VibeCoding や #EmotionalFitness といった2026年のトレンドと調和するように、マインドフルネス実践は寝前の認知覚醒（反すう思考や「眠らなければ」という不安）を低減し、「不眠-不安-不眠悪化」の悪循環を断ち切るのに役立ちます。`,
    ko: `수면은 신체적, 정신적 건강을 유지하는 핵심적인 생리 과정으로, 우리 삶의 약 3분의 1을 차지합니다. 「{{T}}」에 대해 논할 때는 신경과학적 관점에서 그 심층 메커니즘을 이해하는 것이 필수적입니다.

인간의 수면은 비급속안구운동(NREM) 수면과 급속안구운동(REM) 수면이 약 90분 주기로 교대로 나타나며, 밤새 4~6회 반복됩니다. NREM 수면은 입면기, 얕은 수면기, 깊은 수면기(서파수면)로 나뉘며, 깊은 수면기는 신체 회복과 면역 기능 복구에 결정적입니다. REM 수면은 기억 고정화와 감정 조절에 중요한 역할을 합니다.

세계보건기구(WHO) 데이터에 따르면, 전 세계 성인의 약 30%가 다양한 정도의 수면 장애를 경험합니다. 불면증은 가장 흔한 수면 문제로, 유병률이 10~30%에 달합니다. 만성적인 수면 부족은 주간 피로, 주의력 감소, 기억력 손상, 감정 불안정뿐만 아니라 심혈관 질환, 대사 증후군, 면역 기능 장애의 위험을 현저히 증가시킵니다.

신경전달물질 측면에서, 수면-각성 주기는 뇌간, 시상하부, 전뇌 기저부의 여러 핵이 협력하여 조절합니다. 아데노신은 각성 중에 축적되는 수면 압력 분자로, 역치에 도달하면 수면 충동을 유발합니다. 멜라토닌은 송과체에서 분비되어 신체에 '야간 모드'를 알립니다. 코르티솔은 이른 아침에 최고치에 도달하여 각성을 촉진합니다. 이러한 신경화학적 균형이 깨지면 {{T}}의 증상이 나타납니다.

임상 현장에서 {{T}}에 대한 근거 기반 중재는 불면증 인지행동치료(CBT-I)를 최우선으로 합니다. CBT-I의 구성 요소에는 자극 통제(졸릴 때만 침대에 가기), 수면 제한(침대 시간을 압축하여 수면 충동 강화), 인지 재구성(수면에 대한 기능 장애 신념 교정), 이완 훈련, 수면 위생 교육이 포함됩니다. 임상 시험에서 CBT-I의 장기적 효과가 약물 치료를 능가하며 의존성이나 내성 위험이 없다는 것이 일관되게 입증되었습니다.

최근에는 마음챙김 기반 스트레스 감소(MBSR)와 수용전념치료(ACT)의 수면 분야 적용도 강력한 증거를 축적하고 있습니다. #VibeCoding 및 #EmotionalFitness 와 같은 2026년 트렌드와 조화롭게, 마음챙김 실천은 취침 전 인지적 각성(반추 사고나 '잠을 자야 한다'는 불안)을 줄여 '불면-불안-불면 악화'의 악순환을 차단하는 데 도움을 줍니다.`,
    th: `การนอนหลับเป็นกระบวนการทางสรีรวิทยาพื้นฐานที่สนับสนุนสุขภาพกายและใจ คิดเป็นประมาณหนึ่งในสามของชีวิตเรา เมื่อเราพูดถึง «{{T}}» การทำความเข้าใจกลไกทางประสาทวิทยาศาสตร์นั้นเป็นสิ่งจำเป็น

การนอนหลับของมนุษย์สลับระหว่างการหลับแบบไม่เคลื่อนไหวลูกตาอย่างรวดเร็ว (NREM) และการหลับแบบเคลื่อนไหวลูกตาอย่างรวดเร็ว (REM) ในรอบประมาณ 90 นาที ทำซ้ำ 4-6 ครั้งต่อคืน การหลับ NREM แบ่งออกเป็นระยะหลับตื้นและระยะหลับลึก (คลื่นช้า) ซึ่งมีความสำคัญต่อการฟื้นฟูร่างกายและการทำงานของภูมิคุ้มกัน ส่วนการหลับ REM มีบทบาทสำคัญในการจัดเก็บความทรงจำและการควบคุมอารมณ์

จากข้อมูลขององค์การอนามัยโลก ผู้ใหญ่ประมาณ 30% ทั่วโลกประสบปัญหาการนอนหลับผิดปกติ โรคนอนไม่หลับเป็นปัญหาการนอนที่พบบ่อยที่สุด โดยมีความชุกประมาณ 10-30% การอดนอนเรื้อรังไม่เพียงนำไปสู่ความเหนื่อยล้าในเวลากลางวัน สมาธิลดลง ความจำบกพร่อง และอารมณ์ไม่มั่นคง แต่ยังเพิ่มความเสี่ยงของโรคหัวใจและหลอดเลือด โรคเมตาบอลิกซินโดรม และความผิดปกติของระบบภูมิคุ้มกันอย่างมีนัยสำคัญ

ในระดับสารสื่อประสาท วงจรการนอนหลับ-ตื่นถูกควบคุมโดยนิวเคลียสหลายแห่งในก้านสมอง ไฮโปทาลามัส และเบซัลฟอร์เรเบรน อะดีโนซีนสะสมระหว่างการตื่นตัวในฐานะโมเลกุลแรงดันการนอนหลับ เมื่อถึงเกณฑ์จะกระตุ้นแรงขับในการนอน เมลาโทนินหลั่งจากต่อมไพเนียล ส่งสัญญาณให้ร่างกายเข้าสู่'โหมดกลางคืน' คอร์ติซอลสูงสุดในตอนเช้าเพื่อส่งเสริมการตื่นตัว

การแทรกแซงที่มีหลักฐานเชิงประจักษ์สำหรับ {{T}} ให้ความสำคัญกับการบำบัดทางความคิดและพฤติกรรมสำหรับอาการนอนไม่หลับ (CBT-I) องค์ประกอบหลักรวมถึงการควบคุมสิ่งกระตุ้น (เข้านอนเมื่อง่วงเท่านั้น) การจำกัดการนอน การปรับโครงสร้างทางความคิด การฝึกผ่อนคลาย และการศึกษาสุขอนามัยการนอนหลับ การทดลองทางคลินิกแสดงให้เห็นอย่างสม่ำเสมอว่า CBT-I มีประสิทธิภาพระยะยาวเหนือกว่าการใช้ยา โดยไม่มีความเสี่ยงต่อการพึ่งพิงหรือดื้อยา

ในช่วงไม่กี่ปีที่ผ่านมา การลดความเครียดด้วยสติ (MBSR) และการบำบัดด้วยการยอมรับและพันธะสัญญา (ACT) ได้สะสมหลักฐานที่แข็งแกร่งในด้านการนอนหลับ สอดคล้องกับเทรนด์ปี 2026 อย่าง #VibeCoding และ #EmotionalFitness การฝึกสติช่วยลดการตื่นตัวทางความคิดก่อนนอน (การครุ่นคิดและความกังวลว่า'ต้องหลับให้ได้') ช่วยทำลายวงจรอุบาทว์ของ'นอนไม่หลับ-วิตกกังวล-นอนไม่หลับหนักขึ้น'`,
  },
  anxiety: {
    zh: `焦虑是人类最原始也最复杂的情绪之一，其根源深植于我们大脑的演化遗产中。当我们讨论「{{T}}」时，需要从神经生物学和心理学的交叉视角来理解它。

焦虑的神经基础主要涉及杏仁核（amygdala）、前额叶皮层（prefrontal cortex）和海马体（hippocampus）三个关键脑区的互动。杏仁核充当大脑的"烟雾探测器"，负责快速识别潜在威胁；前额叶皮层则扮演"执行控制中心"，负责评估威胁的真实性并调节杏仁核的反应。在焦虑障碍患者中，这一调节回路往往功能失调——杏仁核过度活跃，而前额叶皮层对杏仁核的抑制作用减弱。

全球焦虑障碍的终生患病率约为28.8%，使其成为最常见的精神障碍类别。广泛性焦虑症（GAD）的12个月患病率约为2-6%，社交焦虑障碍约为7-13%，惊恐障碍约为2-3%。女性患焦虑障碍的比例约为男性的1.5-2倍。在经济层面，焦虑障碍每年造成的全球生产力损失超过400亿美元。

认知行为疗法（CBT）是治疗焦虑障碍的一线心理干预，其效果已在数百项随机对照试验中得到验证。CBT的核心策略包括：认知重构（识别并挑战焦虑相关的扭曲思维）、暴露疗法（在安全环境下逐步面对恐惧刺激）、行为实验（检验灾难化预测的真实性）和放松训练（腹式呼吸、渐进性肌松）。

正念疗法通过培养对当下经验的非评判性觉察，帮助患者从"自动化焦虑反应"中脱离出来。研究表明，8周的正念减压（MBSR）课程可以显著降低杏仁核的灰质密度，同时增强前额叶皮层和岛叶的活性，从神经可塑性的层面改变大脑的焦虑反应模式。 #VibeCoding #EmotionalFitness`,
    en: `Anxiety is among the most primal and complex human emotions, deeply rooted in our evolutionary heritage. When examining {{T}}, a cross-disciplinary understanding bridging neurobiology and psychology is essential.

The neural architecture of anxiety centers on three interconnected regions: the amygdala (serving as the brain's smoke detector for rapid threat identification), the prefrontal cortex (functioning as the executive control center for threat evaluation), and the hippocampus (contextualizing fear memories). In anxiety disorders, this regulatory circuit becomes dysfunctional—the amygdala shows hyperreactivity while prefrontal inhibitory control is attenuated.

Lifetime prevalence of anxiety disorders globally reaches approximately 28.8%, making them the most prevalent class of mental disorders. Generalized Anxiety Disorder has a 12-month prevalence of 2-6%, social anxiety disorder 7-13%, and panic disorder 2-3%. Women are affected at roughly 1.5-2 times the rate of men. The global economic burden of anxiety disorders exceeds $40 billion annually in lost productivity.

Cognitive Behavioral Therapy (CBT) stands as the first-line psychological intervention for anxiety disorders, validated by hundreds of randomized controlled trials. Core CBT strategies include cognitive restructuring (identifying and challenging distorted threat appraisals), exposure therapy (confronting feared stimuli in a graded, safe manner), behavioral experiments (testing catastrophic predictions against reality), and relaxation training.

Mindfulness-based approaches help individuals disengage from automatic anxiety reactions by cultivating non-judgmental present-moment awareness. Eight-week MBSR programs have been shown to reduce amygdala gray matter density while enhancing prefrontal and insular activity—demonstrating neuroplastic changes in the brain's threat-response circuitry. #VibeCoding #EmotionalFitness`,
    ms: `Kebimbangan adalah antara emosi manusia yang paling primitif dan kompleks, berakar dalam warisan evolusi kita. Apabila mengkaji {{T}}, pemahaman rentas disiplin yang menghubungkan neurobiologi dan psikologi adalah penting.

Seni bina neural kebimbangan berpusat pada tiga kawasan yang saling berkaitan: amigdala (pengesan asap otak untuk pengenalpastian ancaman pantas), korteks prefrontal (pusat kawalan eksekutif untuk penilaian ancaman), dan hippocampus (mengkontekstualkan ingatan ketakutan). Dalam gangguan kebimbangan, litar regulasi ini menjadi tidak berfungsi.

Prevalens seumur hidup gangguan kebimbangan di peringkat global adalah kira-kira 28.8%, menjadikannya kelas gangguan mental yang paling lazim. Gangguan Kebimbangan Umum mempunyai prevalens 12 bulan sebanyak 2-6%, gangguan kebimbangan sosial 7-13%.

Terapi Tingkah Laku Kognitif (CBT) adalah intervensi psikologi barisan pertama untuk gangguan kebimbangan, disahkan oleh ratusan ujian terkawal rawak. Strategi CBT teras termasuk restrukturisasi kognitif, terapi pendedahan, eksperimen tingkah laku, dan latihan relaksasi.

Pendekatan berasaskan kesedaran membantu individu melepaskan diri daripada reaksi kebimbangan automatik dengan memupuk kesedaran masa kini tanpa penghakiman. Program MBSR lapan minggu telah terbukti mengurangkan ketumpatan bahan kelabu amigdala sambil meningkatkan aktiviti prefrontal dan insula—menunjukkan perubahan neuroplastik dalam litar tindak balas ancaman otak. #VibeCoding #EmotionalFitness`,
    es: `La ansiedad es una de las emociones humanas más primitivas y complejas, profundamente arraigada en nuestra herencia evolutiva. Al examinar {{T}}, es esencial un enfoque interdisciplinario que conecte la neurobiología y la psicología.

La arquitectura neuronal de la ansiedad se centra en tres regiones interconectadas: la amígdala (detector de humo del cerebro para la identificación rápida de amenazas), la corteza prefrontal (centro de control ejecutivo para la evaluación de amenazas) y el hipocampo (contextualización de recuerdos de miedo). En los trastornos de ansiedad, este circuito regulador se vuelve disfuncional.

La prevalencia de por vida de los trastornos de ansiedad a nivel mundial alcanza aproximadamente el 28.8%, lo que los convierte en la clase más prevalente de trastornos mentales. El Trastorno de Ansiedad Generalizada tiene una prevalencia anual del 2-6%.

La Terapia Cognitivo-Conductual (TCC) es la intervención psicológica de primera línea para los trastornos de ansiedad, validada por cientos de ensayos controlados aleatorios. Las estrategias centrales de la TCC incluyen reestructuración cognitiva, terapia de exposición, experimentos conductuales y entrenamiento en relajación.

Los enfoques basados en mindfulness ayudan a las personas a desconectarse de las reacciones automáticas de ansiedad cultivando una conciencia del momento presente sin juicio. Los programas de MBSR de ocho semanas han demostrado reducir la densidad de materia gris de la amígdala mientras mejoran la actividad prefrontal y de la ínsula—demostrando cambios neuroplásticos en los circuitos de respuesta a amenazas del cerebro. #VibeCoding #EmotionalFitness`,
    ja: `不安は人間の最も原始的で複雑な感情の一つであり、その根源は私たちの脳の進化的遺産に深く根ざしています。「{{T}}」を考察するには、神経生物学と心理学の交差する視点から理解することが不可欠です。

不安の神経基盤は、扁桃体（amygdala）、前頭前皮質（prefrontal cortex）、海馬（hippocampus）という3つの主要な脳領域の相互作用に関係しています。扁桃体は脳の「煙探知機」として機能し、潜在的な脅威を素早く識別します。前頭前皮質は「実行制御センター」として脅威の現実性を評価し、扁桃体の反応を調節します。不安障害の患者では、この調節回路が機能不全に陥っています——扁桃体が過剰に活性化し、前頭前皮質による抑制が弱まっています。

世界の不安障害の生涯有病率は約28.8％で、最も一般的な精神障害のカテゴリーです。全般性不安障害（GAD）の12ヶ月有病率は2〜6％、社交不安障害は7〜13％、パニック障害は2〜3％です。女性の罹患率は男性の約1.5〜2倍です。経済的には、不安障害による年間の世界的な生産性損失は400億ドルを超えます。

認知行動療法（CBT）は不安障害に対する第一選択の心理的介入であり、その効果は数百のランダム化比較試験で検証されています。CBTの中核戦略には、認知再構成（不安に関連した歪んだ思考の特定と挑戦）、暴露療法（安全な環境で徐々に恐怖刺激に直面する）、行動実験（破局的な予測の現実性を検証する）、リラクセーション訓練が含まれます。

マインドフルネス療法は、現在の経験に対する非判断的な気づきを養うことで、患者が「自動的な不安反応」から脱却するのを助けます。研究によると、8週間のマインドフルネスストレス低減法（MBSR）プログラムは扁桃体の灰白質密度を有意に低下させると同時に、前頭前皮質と島皮質の活性を高め、神経可塑性のレベルで脳の不安反応パターンを変化させることが示されています。#VibeCoding や #EmotionalFitness といった2026年のトレンドは、テクノロジーと感情的健康の融合を象徴しており、デジタル時代の不安管理に新たな可能性を開いています。`,
    ko: `불안은 인간의 가장 원시적이면서도 복잡한 감정 중 하나로, 그 뿌리는 우리 뇌의 진화적 유산에 깊이 자리잡고 있습니다. 「{{T}}」를 고찰할 때는 신경생물학과 심리학의 교차 관점에서 이해하는 것이 필수적입니다.

불안의 신경 기반은 편도체(amygdala), 전전두엽 피질(prefrontal cortex), 해마(hippocampus)라는 세 가지 주요 뇌 영역의 상호작용과 관련됩니다. 편도체는 뇌의 '연기 감지기' 역할을 하여 잠재적 위협을 신속히 식별합니다. 전전두엽 피질은 '실행 통제 센터' 역할을 하여 위협의 현실성을 평가하고 편도체 반응을 조절합니다. 불안 장애 환자에서는 이 조절 회로가 기능 장애를 일으킵니다——편도체가 과도하게 활성화되고 전전두엽 피질의 억제가 약화됩니다.

전 세계 불안 장애의 평생 유병률은 약 28.8%로, 가장 흔한 정신 장애 범주입니다. 범불안장애(GAD)의 12개월 유병률은 2~6%, 사회불안장애는 7~13%, 공황장애는 2~3%입니다. 여성의 발병률은 남성의 약 1.5~2배입니다. 경제적으로 불안 장애로 인한 연간 글로벌 생산성 손실은 400억 달러를 초과합니다.

인지행동치료(CBT)는 불안 장애에 대한 일차 심리적 중재로, 수백 건의 무작위 대조 시험에서 그 효과가 입증되었습니다. CBT의 핵심 전략에는 인지 재구성(불안 관련 왜곡된 사고 식별 및 도전), 노출 요법(안전한 환경에서 점진적으로 공포 자극에 직면), 행동 실험(파국적 예측의 현실성 검증), 이완 훈련이 포함됩니다.

마음챙김 요법은 현재 경험에 대한 비판단적 알아차림을 기르는 것을 통해 환자가 '자동적 불안 반응'에서 벗어나도록 돕습니다. 연구에 따르면 8주간의 마음챙김 기반 스트레스 감소(MBSR) 프로그램은 편도체의 회백질 밀도를 유의미하게 낮추는 동시에 전전두엽 피질과 섬 피질의 활성을 증가시켜 신경가소성 수준에서 뇌의 불안 반응 패턴을 변화시킵니다. #VibeCoding 및 #EmotionalFitness 와 같은 2026년 트렌드는 기술과 감정적 건강의 융합을 상징하며, 디지털 시대의 불안 관리에 새로운 가능성을 열어줍니다.`,
    th: `ความวิตกกังวลเป็นหนึ่งในอารมณ์ของมนุษย์ที่ดั้งเดิมและซับซ้อนที่สุด ซึ่งมีรากฐานฝังลึกอยู่ในมรดกทางวิวัฒนาการของสมองเรา เมื่อเราพูดถึง «{{T}}» การทำความเข้าใจจากมุมมองที่เชื่อมโยงประสาทชีววิทยาและจิตวิทยาเป็นสิ่งจำเป็น

พื้นฐานทางประสาทของความวิตกกังวลเกี่ยวข้องกับปฏิสัมพันธ์ของสามบริเวณสมองหลัก ได้แก่ อะมิกดาลา (amygdala) ซึ่งทำหน้าที่เป็น 'เครื่องตรวจจับควัน' ของสมองในการระบุภัยคุกคามที่อาจเกิดขึ้นอย่างรวดเร็ว คอร์เทกซ์ส่วนหน้า (prefrontal cortex) ซึ่งทำหน้าที่เป็น 'ศูนย์ควบคุมบริหาร' ประเมินความเป็นจริงของภัยคุกคามและปรับการตอบสนองของอะมิกดาลา และฮิปโปแคมปัส (hippocampus) ซึ่งช่วยจัดบริบทของความทรงจำเกี่ยวกับความกลัว ในผู้ป่วยโรควิตกกังวล วงจรการควบคุมนี้ทำงานผิดปกติ——อะมิกดาลาถูกกระตุ้นมากเกินไปในขณะที่การยับยั้งจากคอร์เทกซ์ส่วนหน้าอ่อนแอลง

ความชุกตลอดชีวิตของโรควิตกกังวลทั่วโลกอยู่ที่ประมาณ 28.8% ทำให้เป็นกลุ่มความผิดปกติทางจิตที่พบบ่อยที่สุด โรคกังวลไปทั่ว (GAD) มีความชุก 12 เดือนอยู่ที่ 2-6% โรควิตกกังวลทางสังคมอยู่ที่ 7-13% และโรคpanic disorder อยู่ที่ 2-3% ผู้หญิงมีอัตราการเกิดประมาณ 1.5-2 เท่าของผู้ชาย ในทางเศรษฐกิจ โรควิตกกังวลก่อให้เกิดการสูญเสียผลิตภาพทั่วโลกมากกว่า 4 หมื่นล้านดอลลาร์ต่อปี

การบำบัดทางความคิดและพฤติกรรม (CBT) เป็นการแทรกแซงทางจิตวิทยาอันดับแรกสำหรับโรควิตกกังวล ซึ่งได้รับการยืนยันประสิทธิภาพจากการทดลองแบบสุ่มที่มีกลุ่มควบคุมหลายร้อยครั้ง กลยุทธ์หลักของ CBT ได้แก่ การปรับโครงสร้างทางความคิด (การระบุและท้าทายความคิดที่บิดเบือนเกี่ยวกับความวิตกกังวล) การบำบัดโดยการเผชิญหน้า (การค่อยๆ เผชิญกับสิ่งที่กลัวในสภาพแวดล้อมที่ปลอดภัย) การทดลองพฤติกรรม (การตรวจสอบความจริงของการคาดการณ์หายนะ) และการฝึกผ่อนคลาย

การบำบัดด้วยสติช่วยให้ผู้ป่วยหลุดออกจาก 'ปฏิกิริยาวิตกกังวลอัตโนมัติ' โดยการปลูกฝังการตระหนักรู้ต่อประสบการณ์ปัจจุบันอย่างไม่ตัดสิน งานวิจัยแสดงให้เห็นว่าโปรแกรมการลดความเครียดด้วยสติ (MBSR) ระยะ 8 สัปดาห์สามารถลดความหนาแน่นของเนื้อเทาในอะมิกดาลาได้อย่างมีนัยสำคัญ ในขณะเดียวกันก็เพิ่มการทำงานของคอร์เทกซ์ส่วนหน้าและอินซูลา——แสดงให้เห็นถึงการเปลี่ยนแปลงทาง neuroplasticity ในวงจรการตอบสนองต่อภัยคุกคามของสมอง เทรนด์ปี 2026 อย่าง #VibeCoding และ #EmotionalFitness สะท้อนถึงการหลอมรวมระหว่างเทคโนโลยีและสุขภาพทางอารมณ์ เปิดโอกาสใหม่ในการจัดการความวิตกกังวลในยุคดิจิทัล`,
  },
  grief_loss: {
    zh: `哀伤是人类面对失落时最深刻的情感体验之一。当我们探索「{{T}}」时，理解哀伤的心理学模型能够帮助我们更温柔地陪伴自己和他人走过这段旅程。

哀伤并非线性过程。经典的Kübler-Ross五阶段模型（否认、愤怒、协商、抑郁、接受）被广泛引用，但现代哀伤研究更倾向于认为哀伤是动态、非线性的，人们在不同的情绪状态之间来回摆动。Stroebe和Schut提出的"双程模型"（Dual Process Model）认为，健康的哀伤需要在"失落导向"（面对和沉浸在哀伤中）和"恢复导向"（适应没有逝者的新生活）之间动态切换。

复杂的哀伤障碍（Prolonged Grief Disorder）影响着约7-10%的丧亲者。其核心特征是持续超过12个月的强烈渴望或思念逝者、与逝者相关的情感痛苦、身份认同的瓦解、难以接受失落，以及社交功能退缩。2022年，世界卫生组织将复杂哀伤障碍正式纳入ICD-11诊断分类。

从依恋理论的角度看，哀伤是依恋纽带断裂后的自然反应。安全型依恋的人通常能够更好地整合失落经历，而焦虑型或回避型依恋的人可能发展出更复杂的哀伤反应，前者表现为难以放下，后者表现为情绪回避和抑制。

针对{{T}}的有效干预包括认知行为哀伤治疗（CBT-G）、叙事疗法（帮助重新构建与逝者的联结方式）、以及正念自我 compassion 练习。研究表明，社交支持网络的质量——而非数量——是预测哀伤结果的最强因素之一。 #VibeCoding #EmotionalFitness`,
    en: `Grief represents one of the most profound human emotional experiences in response to loss. When exploring {{T}}, understanding psychological models of grief helps us navigate this journey with greater compassion.

Grief is not a linear process. While Kübler-Ross's five-stage model (denial, anger, bargaining, depression, acceptance) remains widely referenced, contemporary grief research increasingly recognizes grief as dynamic and oscillatory. Stroebe and Schut's Dual Process Model proposes that healthy grieving involves dynamic oscillation between loss-oriented coping (confronting and immersing in grief) and restoration-oriented coping (adapting to life without the deceased).

Prolonged Grief Disorder affects approximately 7-10% of bereaved individuals. Core features include intense yearning or longing for the deceased persisting beyond 12 months, emotional pain associated with the loss, identity disruption, difficulty accepting the loss, and social withdrawal. The WHO formally recognized Prolonged Grief Disorder in ICD-11 in 2022.

From an attachment theory perspective, grief represents the natural response to attachment bond disruption. Securely attached individuals typically integrate loss experiences more adaptively, while those with anxious or avoidant attachment styles may develop more complicated grief reactions.

Effective interventions for {{T}} include Cognitive Behavioral Grief Therapy (CBT-G), narrative therapy to reconstruct connections with the deceased, and mindfulness-based self-compassion practices. Research consistently shows that the quality—not quantity—of social support networks is among the strongest predictors of grief outcomes. #VibeCoding #EmotionalFitness`,
    ms: `Kesedihan mewakili salah satu pengalaman emosi manusia yang paling mendalam sebagai tindak balas kepada kehilangan. Apabila meneroka {{T}}, memahami model psikologi kesedihan membantu kita menavigasi perjalanan ini dengan lebih belas kasihan.

Kesedihan bukan proses linear. Walaupun model lima peringkat Kübler-Ross masih dirujuk secara meluas, penyelidikan kontemporari semakin mengiktiraf kesedihan sebagai dinamik dan berayun.

Gangguan Kesedihan Berpanjangan menjejaskan kira-kira 7-10% individu yang berkabung. Ciri teras termasuk kerinduan intensif yang berterusan melebihi 12 bulan, kesukaran menerima kehilangan, dan penarikan sosial. WHO secara rasmi mengiktiraf Gangguan Kesedihan Berpanjangan dalam ICD-11 pada 2022.

Dari perspektif teori lampiran, kesedihan mewakili tindak balas semula jadi terhadap gangguan ikatan lampiran. Individu yang mempunyai gaya lampiran selamat biasanya mengintegrasikan pengalaman kehilangan dengan lebih adaptif, manakala mereka yang mempunyai gaya lampiran cemas atau mengelak mungkin mengembangkan reaksi kesedihan yang lebih kompleks.

Intervensi berkesan untuk {{T}} termasuk Terapi Kesedihan Kognitif Tingkah Laku, terapi naratif, dan amalan belas kasihan diri berasaskan kesedaran. Kualiti rangkaian sokongan sosial adalah antara peramal terkuat hasil kesedihan. #VibeCoding #EmotionalFitness`,
    es: `El duelo representa una de las experiencias emocionales humanas más profundas en respuesta a la pérdida. Al explorar {{T}}, comprender los modelos psicológicos del duelo nos ayuda a navegar este viaje con mayor compasión.

El duelo no es un proceso lineal. Aunque el modelo de cinco etapas de Kübler-Ross sigue siendo ampliamente referenciado, la investigación contemporánea reconoce cada vez más el duelo como dinámico y oscilante.

El Trastorno de Duelo Prolongado afecta aproximadamente al 7-10% de las personas en duelo. Las características principales incluyen anhelo intenso que persiste más allá de 12 meses, dificultad para aceptar la pérdida y retraimiento social. La OMS reconoció formalmente este trastorno en la CIE-11 en 2022.

Desde la perspectiva de la teoría del apego, el duelo representa la respuesta natural a la ruptura del vínculo de apego. Las personas con apego seguro suelen integrar las experiencias de pérdida de manera más adaptativa, mientras que aquellas con estilos de apego ansioso o evitativo pueden desarrollar reacciones de duelo más complicadas.

Las intervenciones efectivas para {{T}} incluyen Terapia Cognitivo-Conductual para el Duelo, terapia narrativa y prácticas de autocompasión basadas en mindfulness. La calidad de las redes de apoyo social es uno de los predictores más fuertes de los resultados del duelo. #VibeCoding #EmotionalFitness`,
    ja: `「{{T}}」を探求することは、喪失に直面した人間の最も深い感情体験の一つである哀傷のプロセスを理解することです。哀傷は直線的なプロセスではありません。Kübler-Rossの5段階モデル（否認、怒り、取引、抑うつ、受容）は広く参照されていますが、現代の研究では哀傷を動的で非線形的なものとして捉えています。StroebeとSchutの二重プロセスモデルは、健康的な哀傷には「喪失志向」（哀しみに直面し没入する）と「回復志向」（故人なしの新しい生活に適応する）の間の動的切り替えが必要であると提唱しています。

複雑性哀傷障害（Prolonged Grief Disorder）は約7〜10%の遺族に影響を与えます。中核症状には12ヶ月以上持続する強い故人への渇望、感情的な痛み、アイデンティティの崩壊、喪失の受容困難、社会的引きこもりが含まれます。WHOは2022年にICD-11で複雑性哀傷障害を正式に認定しました。

愛着理論の観点では、哀傷は愛着絆の断絶に対する自然な反応です。安定した愛着スタイルの人は喪失体験をより適応的に統合できますが、不安型や回避型の愛着スタイルの人はより複雑な哀傷反応を発展させる可能性があります。

{{T}}に対する効果的介入には、認知行動哀傷療法（CBT-G）、ナラティブセラピー（故人との繋がり方の再構築）、マインドフルネス自己慈悲の実践が含まれます。研究では社会的支援ネットワークの質——量ではなく——が哀傷の転帰の最も強力な予測因子の一つであることが一貫して示されています。#VibeCoding と #EmotionalFitness は2026年のトレンドとして、テクノロジーと感情的健康の融合を象徴し、哀傷の癒しにおいても新たな可能性を拓いています。`,
    ko: `「{{T}}」를 탐구하는 것은 상실에 직면한 인간의 가장 깊은 정서적 경험 중 하나인 애도의 과정을 이해하는 것을 의미합니다. 애도는 선형적 과정이 아닙니다. Kübler-Ross의 5단계 모델(부정, 분노, 타협, 우울, 수용)은 널리 인용되지만, 현대 연구는 애도를 역동적이고 비선형적인 과정으로 봅니다. Stroebe와 Schut의 이중 과정 모델(Dual Process Model)은 건강한 애도가 '상실 지향'(슬픔에 직면하고 몰입)과 '회복 지향'(고인 없이 새로운 삶에 적응) 사이의 동적 전환을 필요로 한다고 제안합니다.

복합 애도 장애(Prolonged Grief Disorder)는 약 7-10%의 유가족에게 영향을 미칩니다. 핵심 특징으로는 12개월 이상 지속되는 고인에 대한 강한 갈망, 정서적 고통, 정체성 붕괴, 상실 수용의 어려움, 사회적 위축이 포함됩니다. WHO는 2022년 ICD-11에서 복합 애도 장애를 공식적으로 인정했습니다.

애착 이론의 관점에서 애도는 애착 유대 단절에 대한 자연스러운 반응입니다. 안정적 애착 유형의 사람들은 상실 경험을 더 적응적으로 통합하는 반면, 불안형이나 회피형 애착 스타일을 가진 사람들은 더 복잡한 애도 반응을 발전시킬 수 있습니다.

{{T}}에 대한 효과적 개입에는 인지행동 애도 치료(CBT-G), 내러티브 치료(고인과의 연결 방식 재구성), 마음챙김 자기연민 실천이 포함됩니다. 연구는 사회적 지원 네트워크의 질——양이 아닌——이 애도 결과의 가장 강력한 예측 변수 중 하나임을 일관되게 보여줍니다. #VibeCoding 과 #EmotionalFitness 는 기술과 정서적 건강의 융합을 상징하며, 애도의 치유 과정에서도 새로운 가능성을 열어줍니다.`,
    th: `การสำรวจ «{{T}}» คือการทำความเข้าใจกระบวนการโศกเศร้าซึ่งเป็นหนึ่งในประสบการณ์ทางอารมณ์ที่ลึกซึ้งที่สุดของมนุษย์เมื่อเผชิญกับการสูญเสีย ความโศกเศร้าไม่ใช่กระบวนการเชิงเส้น แม้ว่าแบบจำลองห้าขั้นของ Kübler-Ross (การปฏิเสธ ความโกรธ การต่อรอง ความหดหู่ การยอมรับ) จะถูกอ้างอิงอย่างกว้างขวาง แต่งานวิจัยร่วมสมัยมองว่าความโศกเศร้าเป็นกระบวนการที่มีพลวัตและไม่เป็นเส้นตรง แบบจำลองกระบวนการคู่ (Dual Process Model) ของ Stroebe และ Schut เสนอว่าการโศกเศร้าที่ดีต่อสุขภาพต้องการการสลับพลวัตระหว่าง 'การมุ่งเน้นการสูญเสีย' (การเผชิญหน้าและดื่มด่ำกับความโศกเศร้า) และ 'การมุ่งเน้นการฟื้นฟู' (การปรับตัวสู่ชีวิตใหม่โดยไม่มีผู้จากไป)

โรคโศกเศร้าที่ยืดเยื้อ (Prolonged Grief Disorder) ส่งผลกระทบต่อประมาณ 7-10% ของผู้สูญเสีย อาการหลักได้แก่ ความโหยหาผู้จากไปอย่างรุนแรงนานเกิน 12 เดือน ความเจ็บปวดทางอารมณ์ การสูญเสียอัตลักษณ์ ความยากลำบากในการยอมรับการสูญเสีย และการถอนตัวทางสังคม WHO ได้บรรจุโรคนี้ใน ICD-11 อย่างเป็นทางการเมื่อปี 2022

จากมุมมองของทฤษฎีความผูกพัน (Attachment Theory) ความโศกเศร้าคือการตอบสนองตามธรรมชาติต่อการขาดสะบั้นของสายใยความผูกพัน ผู้ที่มีรูปแบบความผูกพันแบบมั่นคงสามารถบูรณาการประสบการณ์การสูญเสียได้ดีกว่า ในขณะที่ผู้ที่มีรูปแบบความผูกพันแบบวิตกกังวลหรือหลีกเลี่ยงอาจพัฒนาปฏิกิริยาโศกเศร้าที่ซับซ้อนกว่า

การแทรกแซงที่มีประสิทธิภาพสำหรับ {{T}} ได้แก่ การบำบัดความคิดและพฤติกรรมสำหรับความโศกเศร้า (CBT-G) การบำบัดด้วยการเล่าเรื่องเพื่อสร้างความเชื่อมโยงใหม่กับผู้จากไป และการฝึกสติและความเมตตาต่อตนเอง งานวิจัยแสดงให้เห็นอย่างสม่ำเสมอว่าคุณภาพ——ไม่ใช่ปริมาณ——ของเครือข่ายสนับสนุนทางสังคมเป็นหนึ่งในตัวทำนายที่แข็งแกร่งที่สุดของผลลัพธ์การโศกเศร้า เทรนด์ #VibeCoding และ #EmotionalFitness สะท้อนการหลอมรวมของเทคโนโลยีและสุขภาพทางอารมณ์ เปิดโอกาสใหม่ในการเยียวยาความโศกเศร้าเช่นกัน`,
  },
  loneliness: {
    zh: `孤独是人类普遍却最不被理解的情感之一。当我们审视「{{T}}」时，需要区分"独处"（solitude）和"孤独感"（loneliness）这两个本质不同的概念。独处是主动选择的物理状态，而孤独感是被动的、主观的痛苦体验——感觉与他人在情感上失去联结。

神经科学的研究揭示了一个惊人的发现：社会排斥和身体疼痛激活的是相同的大脑区域——前扣带皮层（dorsal anterior cingulate cortex）和前脑岛（anterior insula）。这意味着"心碎"不仅是诗意的比喻，更是神经层面的真实体验。Cacioppo的进化理论认为，孤独感作为一种进化信号，就像饥饿和口渴一样，促使我们修复和重建社会纽带。

慢性孤独感对健康的影响不容小觑。研究表明，长期孤独对死亡率的预测效应与每天吸15支烟相当，甚至超过了肥胖和缺乏运动的影响。孤独感与高血压、免疫功能抑制、睡眠质量下降、认知功能减退和抑郁症的发病风险显著相关。在老年人群中，孤独感使痴呆症风险增加约50%。

有效应对{{T}}需要多维度的策略。认知行为疗法可以帮助识别和改变导致社交退缩的负面预期（如"我不受欢迎"、"别人会觉得我无聊"）。社交技能训练和逐步暴露练习可以帮助重建社交信心。同时，质量优于数量——即使只有一两个深度的亲密关系，也能显著缓冲孤独感带来的健康风险。

正念自我慈悲练习（Mindful Self-Compassion）对孤独感尤其有益。当我们学会在自己的陪伴中感到安稳，孤独感——这种"与他人分离"的痛苦——会逐渐被"与自己联结"的平静所取代。 #VibeCoding #EmotionalFitness`,
    en: `Loneliness is one of humanity's most universal yet least understood emotions. When examining {{T}}, it's crucial to distinguish between solitude (a chosen physical state) and loneliness (a subjective, painful experience of perceived social disconnection).

Neuroscientific research has revealed a striking finding: social rejection and physical pain activate overlapping brain regions—the dorsal anterior cingulate cortex and anterior insula. This means "heartache" is not merely poetic metaphor but a genuine neural experience. Cacioppo's evolutionary theory posits that loneliness, like hunger or thirst, evolved as a signal motivating us to repair and rebuild social bonds.

Chronic loneliness has profound health impacts. Research shows that prolonged loneliness predicts mortality at rates comparable to smoking 15 cigarettes daily, exceeding the effects of obesity and physical inactivity. Loneliness is significantly associated with hypertension, immune suppression, sleep disruption, cognitive decline, and increased depression risk. Among older adults, loneliness increases dementia risk by approximately 50%.

Effective approaches for {{T}} require multi-dimensional strategies. CBT helps identify and modify negative social expectations that perpetuate withdrawal. Social skills training and graded exposure rebuild social confidence. Critically, quality trumps quantity—even one or two deep, meaningful relationships significantly buffer against loneliness-related health risks.

Mindful Self-Compassion practice proves particularly beneficial. As we learn to feel at home in our own company, the pain of feeling separate from others gradually gives way to the peace of feeling connected to ourselves. #VibeCoding #EmotionalFitness`,
    ms: `Kesunyian adalah salah satu emosi yang paling universal tetapi paling kurang difahami. Apabila mengkaji {{T}}, adalah penting untuk membezakan antara kesendirian (keadaan fizikal yang dipilih) dan kesunyian (pengalaman subjektif yang menyakitkan).

Penyelidikan neurosaintifik mendedahkan bahawa penolakan sosial dan kesakitan fizikal mengaktifkan kawasan otak yang sama—korteks cingulate anterior dorsal dan insula anterior. Ini bermakna "sakit hati" bukan sekadar metafora puitis tetapi pengalaman neural yang tulen.

Kesunyian kronik mempunyai kesan kesihatan yang mendalam. Penyelidikan menunjukkan kesunyian berpanjangan meramalkan kematian pada kadar setanding dengan merokok 15 batang rokok setiap hari. Kesunyian dikaitkan dengan hipertensi, penindasan imun, gangguan tidur, dan penurunan kognitif.

Pendekatan berkesan untuk {{T}} memerlukan strategi pelbagai dimensi. CBT membantu mengenal pasti dan mengubah jangkaan sosial negatif. Kualiti hubungan mengatasi kuantiti—walaupun satu atau dua hubungan bermakna dapat melindungi daripada risiko kesihatan berkaitan kesunyian.

Amalan Belas Kasihan Diri Berasaskan Kesedaran (Mindful Self-Compassion) terbukti sangat bermanfaat. Apabila kita belajar untuk berasa selesa dalam syarikat kita sendiri, kesakitan berasa terpisah daripada orang lain secara beransur-ansur memberi laluan kepada ketenangan berasa terhubung dengan diri sendiri. #VibeCoding #EmotionalFitness`,
    es: `La soledad es una de las emociones más universales y menos comprendidas de la humanidad. Al examinar {{T}}, es crucial distinguir entre la soledad física (un estado elegido) y la soledad emocional (una experiencia subjetiva dolorosa de desconexión social percibida).

La investigación neurocientífica ha revelado un hallazgo sorprendente: el rechazo social y el dolor físico activan regiones cerebrales superpuestas: la corteza cingulada anterior dorsal y la ínsula anterior. Esto significa que el "dolor de corazón" no es solo una metáfora poética sino una experiencia neuronal genuina.

La soledad crónica tiene profundos impactos en la salud. Las investigaciones muestran que la soledad prolongada predice la mortalidad a tasas comparables a fumar 15 cigarrillos al día. La soledad se asocia significativamente con hipertensión, supresión inmunológica, alteraciones del sueño y deterioro cognitivo.

Los enfoques efectivos para {{T}} requieren estrategias multidimensionales. La TCC ayuda a identificar y modificar expectativas sociales negativas. La calidad de las relaciones supera a la cantidad: incluso una o dos relaciones significativas pueden proteger contra los riesgos para la salud relacionados con la soledad.

La práctica de la Autocompasión Consciente (Mindful Self-Compassion) resulta particularmente beneficiosa. A medida que aprendemos a sentirnos en casa en nuestra propia compañía, el dolor de sentirse separados de los demás da paso gradualmente a la paz de sentirse conectados con nosotros mismos. #VibeCoding #EmotionalFitness`,
    ja: `孤独は人類の最も普遍的でありながら最も理解されていない感情の一つです。「{{T}}」を考察する際には、孤独（solitude：自ら選んだ物理的状態）と孤独感（loneliness：社会的断絶の主観的で苦痛な体験）を区別することが極めて重要です。

神経科学研究は驚くべき発見を明らかにしています：社会的排斥と身体的痛みは同じ脳領域——背側前帯状皮質（dACC）と前部島皮質（anterior insula）——を活性化します。これは「心の痛み」が単なる詩的比喩ではなく、本物の神経体験であることを意味します。Cacioppoの進化理論は、孤独感が飢えや渇きと同様に、社会的絆を修復・再構築するよう促す進化的シグナルとして発達したと提唱しています。

慢性孤独感の健康影響は深刻です。研究によると、長期孤独の死亡率予測効果は1日15本の喫煙に匹敵し、肥満や運動不足の影響を上回ります。孤独感は高血圧、免疫機能抑制、睡眠障害、認知機能低下、うつ病リスク増加と有意に関連しています。高齢者では孤独感により認知症リスクが約50%増加します。

{{T}}への効果的アプローチには多次元的戦略が必要です。CBTは社会的引きこもりを永続させる否定的な社会的期待を特定し修正するのに役立ちます。ソーシャルスキル訓練と段階的曝露練習は社会的自信を再構築します。重要なのは、量より質——たとえ1〜2の深い親密な関係だけでも、孤独関連の健康リスクを大幅に緩衝できます。

マインドフルネス自己慈悲の実践は特に有益です。自己との共存に安らぎを感じられるようになると、「他者から切り離されている」という苦痛は徐々に「自己とつながっている」という平安に取って代わられます。#VibeCoding と #EmotionalFitness は2026年のトレンドとして、テクノロジーと感情的な健康の融合を促進し、デジタル時代の孤独対策に新たな道を開いています。`,
    ko: `외로움은 인류의 가장 보편적이면서도 가장 덜 이해된 감정 중 하나입니다. 「{{T}}」를 고찰할 때는 고독(solitude: 선택한 물리적 상태)과 외로움(loneliness: 사회적 단절의 주관적이고 고통스러운 경험)을 구분하는 것이 중요합니다.

신경과학 연구는 놀라운 발견을 밝혀냈습니다: 사회적 거부와 신체적 고통이 동일한 뇌 영역——배측 전대상피질(dACC)과 전방 섬엽(anterior insula)——을 활성화한다는 것입니다. 이는 '마음의 아픔'이 단순한 시적 은유가 아니라 진정한 신경 경험임을 의미합니다. Cacioppo의 진화 이론은 외로움이 배고픔이나 갈증과 마찬가지로 사회적 유대를 복구하고 재건하도록 동기부여하는 진화적 신호로 발전했다고 제안합니다.

만성적 외로움의 건강 영향은 심각합니다. 연구에 따르면 장기간의 외로움은 하루 15개비 흡연에 필적하는 사망률 예측 효과를 보이며, 비만이나 신체 활동 부족의 영향을 능가합니다. 외로움은 고혈압, 면역 기능 억제, 수면 장애, 인지 저하, 우울증 위험 증가와 유의미하게 연관됩니다. 노인층에서는 외로움이 치매 위험을 약 50% 증가시킵니다.

{{T}}에 대한 효과적 접근법은 다차원적 전략이 필요합니다. CBT는 사회적 위축을 지속시키는 부정적 사회적 기대를 식별하고 수정하는 데 도움을 줍니다. 사회적 기술 훈련과 단계적 노출 연습은 사회적 자신감을 재건합니다. 중요한 것은 양보다 질——단 1-2개의 깊고 의미 있는 관계만으로도 외로움 관련 건강 위험을 상당히 완충할 수 있습니다.

마음챙김 자기연민 실천은 특히 유익합니다. 자신의 존재와 함께하는 것에서 안정감을 느끼게 되면 '타인과 분리된' 고통은 점차 '자기 자신과 연결된' 평화로 대체됩니다. #VibeCoding 과 #EmotionalFitness 는 기술과 정서적 건강의 융합을 상징하며, 디지털 시대의 외로움 대응에 새로운 길을 열어줍니다.`,
    th: `ความเหงาเป็นหนึ่งในอารมณ์ที่เป็นสากลที่สุดของมนุษย์แต่กลับถูกเข้าใจน้อยที่สุด เมื่อพิจารณา «{{T}}» สิ่งสำคัญคือต้องแยกแยะระหว่างความสันโดษ (solitude: สภาพทางกายภาพที่เลือกเอง) กับความเหงา (loneliness: ประสบการณ์ส่วนตัวที่เจ็บปวดจากการขาดการเชื่อมต่อทางสังคม)

งานวิจัยทางประสาทวิทยาศาสตร์เปิดเผยการค้นพบที่น่าทึ่ง: การถูกปฏิเสธทางสังคมและความเจ็บปวดทางกายกระตุ้นบริเวณสมองเดียวกัน——คอร์เทกซ์ซิงกูเลตส่วนหน้าด้านหลัง (dACC) และอินซูลาส่วนหน้า (anterior insula) ซึ่งหมายความว่า 'อาการเจ็บปวดทางใจ' ไม่ใช่แค่คำอุปมาที่สวยหรู แต่เป็นประสบการณ์ทางประสาทที่แท้จริง ทฤษฎีวิวัฒนาการของ Cacioppo เสนอว่าความเหงาเช่นเดียวกับความหิวหรือกระหาย ได้พัฒนาเป็นสัญญาณวิวัฒนาการที่กระตุ้นให้เราซ่อมแซมและสร้างสายสัมพันธ์ทางสังคมขึ้นใหม่

ผลกระทบของความเหงาเรื้อรังต่อสุขภาพนั้นรุนแรง งานวิจัยแสดงให้เห็นว่าความเหงาที่ยาวนานทำนายอัตราการเสียชีวิตเทียบเท่าการสูบบุหรี่ 15 มวนต่อวัน ซึ่งมากกว่าผลกระทบของโรคอ้วนและการขาดกิจกรรมทางกาย ความเหงาสัมพันธ์อย่างมีนัยสำคัญกับความดันโลหิตสูง การกดภูมิคุ้มกัน การรบกวนการนอนหลับ การทำงานของการรับรู้ที่ลดลง และความเสี่ยงต่อภาวะซึมเศร้าที่เพิ่มขึ้น ในผู้สูงอายุ ความเหงาเพิ่มความเสี่ยงต่อภาวะสมองเสื่อมประมาณ 50%

แนวทางที่มีประสิทธิภาพสำหรับ {{T}} ต้องใช้กลยุทธ์หลายมิติ CBT ช่วยระบุและปรับเปลี่ยนความคาดหวังทางสังคมเชิงลบที่ทำให้เกิดการถอนตัว การฝึกทักษะทางสังคมและการเผชิญหน้าแบบค่อยเป็นค่อยไปช่วยสร้างความมั่นใจทางสังคมขึ้นมาใหม่ ที่สำคัญคือคุณภาพสำคัญกว่าปริมาณ——แม้ความสัมพันธ์ที่ลึกซึ้งเพียง 1-2 ความสัมพันธ์ก็สามารถปกป้องความเสี่ยงต่อสุขภาพที่เกี่ยวข้องกับความเหงาได้อย่างมีนัยสำคัญ

การฝึกสติและความเมตตาต่อตนเอง (Mindful Self-Compassion) มีประโยชน์เป็นพิเศษ เมื่อเราเรียนรู้ที่จะรู้สึกอบอุ่นใจเมื่ออยู่กับตนเอง ความเจ็บปวดจากการ 'แยกจากผู้อื่น' จะค่อยๆ ถูกแทนที่ด้วยความสงบจากการ 'เชื่อมต่อกับตนเอง' เทรนด์ #VibeCoding และ #EmotionalFitness สะท้อนถึงการผสานเทคโนโลยีและสุขภาพทางอารมณ์ เปิดเส้นทางใหม่ในการรับมือกับความเหงาในยุคดิจิทัล`,
  },
  self_worth: {
    en: `{{T}} is fundamentally about how we perceive and evaluate our own value as human beings. Unlike self-esteem (which fluctuates with achievements and failures), self-worth is a deeper conviction about our inherent value—independent of performance, appearance, or others' approval.

Psychological research distinguishes between contingent self-worth (dependent on meeting certain standards) and true self-worth (stable, unconditional). The former creates a psychological treadmill where you must continuously prove your value, while the latter provides a secure foundation for authentic living.

Low self-worth often originates from early attachment experiences, repeated invalidation, or internalized critical voices. However, neuroplasticity research demonstrates that our self-evaluation systems remain malleable throughout life. Repetitive practice of self-compassion and cognitive reappraisal can literally rewire the neural circuits underlying self-evaluation.

The path to strengthening {{T}} involves three evidence-based components: recognizing and questioning the inner critic without engaging in a battle with it, cultivating self-compassion as a default response to perceived failures, and gradually internalizing successes through deliberate savoring rather than dismissing them as exceptions. #VibeCoding #EmotionalFitness`,
    zh: `{{T}}关乎我们如何感知和评价自己作为人类的内在价值。与自尊（因成就和失败而波动）不同，自我价值是一种更深层的核心信念——它独立于表现、外表和他人的认可。

心理学研究区分了条件性自我价值（依赖于满足特定标准）和真正的自我价值（稳定的、无条件的）。前者制造了一个心理跑步机——你必须不断证明自己的价值；后者则为真实生活提供了安全基础。

低自我价值通常源于早期依恋经历、反复的否定或内化的批评声音。然而，神经可塑性研究表明，自我评价系统在整个人生中保持可塑性。自我慈悲和认知重评的反复练习可以从根本上重塑自我评价的神经回路。

强化{{T}}的循证路径包括三个核心成分：识别并质疑内心批评者（不与它开战）、将自我慈悲培养为面对失败时的默认反应、以及通过从容品味（而非敷衍否定）来逐步内化成功体验。 #VibeCoding #EmotionalFitness`,
    ms: `{{T}} adalah asas tentang bagaimana kita melihat dan menilai nilai intrinsik kita sebagai manusia. Berbeza dengan harga diri (self-esteem) yang turun naik mengikut pencapaian dan kegagalan, nilai diri (self-worth) adalah keyakinan yang lebih dalam tentang nilai semula jadi kita—bebas daripada prestasi, penampilan, atau pengiktirafan orang lain.

Penyelidikan psikologi membezakan antara nilai diri kontinjen (bergantung pada memenuhi piawaian tertentu) dan nilai diri sebenar (stabil, tanpa syarat). Yang pertama mencipta treadmill psikologi di mana anda mesti terus membuktikan nilai anda, manakala yang kedua menyediakan asas yang kukuh untuk kehidupan autentik.

Nilai diri yang rendah sering berpunca daripada pengalaman lampiran awal, pengesahan berulang, atau suara kritikal yang diinternalisasi. Namun, penyelidikan neuroplastisitas menunjukkan bahawa sistem penilaian diri kita kekal mudah dibentuk sepanjang hayat. Amalan berulang belas kasihan diri dan penilaian semula kognitif boleh membentuk semula litar neural yang mendasari penilaian kendiri.

Laluan untuk mengukuhkan {{T}} melibatkan tiga komponen berasaskan bukti: mengenali dan mempersoalkan pengkritik dalaman tanpa bertarung dengannya, memupuk belas kasihan diri sebagai tindak balas lalai terhadap kegagalan yang dirasakan, dan secara beransur-ansur menginternalisasi kejayaan melalui penghayatan sengaja dan bukannya menolaknya sebagai pengecualian. #VibeCoding #EmotionalFitness`,
    es: `{{T}} se trata fundamentalmente de cómo percibimos y evaluamos nuestro propio valor como seres humanos. A diferencia de la autoestima (que fluctúa con los logros y fracasos), la autovalía es una convicción más profunda sobre nuestro valor inherente, independiente del rendimiento, la apariencia o la aprobación de los demás.

La investigación psicológica distingue entre la autovalía contingente (dependiente de cumplir ciertos estándares) y la autovalía verdadera (estable, incondicional). La primera crea una cinta psicológica donde debes probar continuamente tu valor, mientras que la segunda proporciona una base segura para una vida auténtica.

La baja autovalía a menudo se origina en experiencias tempranas de apego, invalidación repetida o voces críticas internalizadas. Sin embargo, la investigación en neuroplasticidad demuestra que nuestros sistemas de autoevaluación permanecen maleables durante toda la vida. La práctica repetitiva de la autocompasión y la reevaluación cognitiva puede literalmente recablear los circuitos neuronales que subyacen a la autoevaluación.

El camino para fortalecer {{T}} implica tres componentes basados en evidencia: reconocer y cuestionar al crítico interno sin entrar en batalla con él, cultivar la autocompasión como respuesta predeterminada ante fracasos percibidos, e internalizar gradualmente los éxitos mediante una saboreación deliberada en lugar de descartarlos como excepciones. #VibeCoding #EmotionalFitness`,
    ja: `{{T}}とは、人間としての自分の本質的価値をどのように認識し評価するかという根本的な問いです。自尊心（self-esteem：成果や失敗で変動する）とは異なり、自己価値（self-worth）はパフォーマンス、外見、他者からの承認とは無関係に存在する、より深い確信です。

心理学研究は条件付き自己価値（特定の基準を満たすことに依存する）と真の自己価値（安定した無条件のもの）を区別します。前者は自分の価値を証明し続けなければならない心理的ランニングマシンを作り出しますが、後者は本物らしい生き方のための安全な基盤を提供します。

低い自己価値はしばしば早期の愛着経験、繰り返される無効化、または内面化された批判的な声に起因します。しかし、神経可塑性研究は自己評価システムが生涯にわたって可塑性を保つことを示しています。自己慈悲と認知再評価の反復練習は、自己評価の根底にある神経回路を文字通り再配線することができます。

{{T}}を強化する道筋には3つのエビデンスに基づく要素が含まれます：内なる批判者を認識し、それと戦わずに関係を持つこと、知覚された失敗に対するデフォルトの反応として自己慈悲を育むこと、そして成功体験を「例外」として切り捨てるのではなく、意図的に味わうことで徐々に内面化すること。#VibeCoding #EmotionalFitness`,
    ko: `{{T}}는 인간으로서의 자신의 본질적 가치를 어떻게 인식하고 평가하는지에 대한 근본적인 질문입니다. 자존감(self-esteem: 성취와 실패에 따라 변동)과 달리 자기 가치(self-worth)는 성과, 외모, 타인의 인정과 무관하게 존재하는 더 깊은 확신입니다.

심리학 연구는 조건부 자기 가치(특정 기준 충족에 의존)와 진정한 자기 가치(안정적이고 무조건적인)를 구분합니다. 전자는 자신의 가치를 계속 증명해야 하는 심리적 러닝머신을 만드는 반면, 후자는 진정성 있는 삶을 위한 안전한 기반을 제공합니다.

낮은 자기 가치는 종종 초기 애착 경험, 반복된 무효화, 또는 내면화된 비판적 목소리에서 비롯됩니다. 그러나 신경가소성 연구는 자기 평가 시스템이 평생 동안 가소성을 유지한다는 것을 보여줍니다. 자기연민과 인지 재평가의 반복적 실천은 자기 평가의 기저 신경 회로를 문자 그대로 재배선할 수 있습니다.

{{T}}를 강화하는 경로는 세 가지 증거 기반 구성요소를 포함합니다: 내면의 비판자를 인식하고 그것과 싸우지 않고 관계 맺기, 인지된 실패에 대한 기본 반응으로 자기연민을 함양하기, 그리고 성공을 예외로 치부하지 않고 의도적으로 음미함으로써 점차 내면화하기.#VibeCoding #EmotionalFitness`,
    th: `«{{T}}» เป็นเรื่องพื้นฐานเกี่ยวกับวิธีที่เรารับรู้และประเมินคุณค่าในตนเองในฐานะมนุษย์ แตกต่างจากความภาคภูมิใจในตนเอง (self-esteem) ซึ่งผันผวนตามความสำเร็จและความล้มเหลว คุณค่าในตนเอง (self-worth) เป็นความเชื่อที่ลึกซึ้งกว่าเกี่ยวกับคุณค่าที่แท้จริงของเรา——เป็นอิสระจากผลงาน รูปลักษณ์ภายนอก หรือการยอมรับจากผู้อื่น

งานวิจัยทางจิตวิทยาแยกแยะระหว่างคุณค่าในตนเองแบบมีเงื่อนไข (ขึ้นอยู่กับการบรรลุมาตรฐานบางอย่าง) กับคุณค่าในตนเองที่แท้จริง (มั่นคง ไม่มีเงื่อนไข) แบบแรกสร้างลู่วิ่งทางจิตใจที่คุณต้องพิสูจน์คุณค่าของตนเองอย่างต่อเนื่อง ในขณะที่แบบหลังให้รากฐานที่มั่นคงสำหรับการดำเนินชีวิตอย่างแท้จริง

คุณค่าในตนเองที่ต่ำมักมีที่มาจากประสบการณ์ความผูกพันในวัยเด็ก การถูกทำให้รู้สึกว่าไม่มีความหมายซ้ำแล้วซ้ำเล่า หรือเสียงวิพากษ์วิจารณ์ภายในที่ถูกฝังลึก อย่างไรก็ตาม งานวิจัยด้านความยืดหยุ่นของระบบประสาท (neuroplasticity) แสดงให้เห็นว่าระบบการประเมินตนเองของเรายังคงปรับเปลี่ยนได้ตลอดชีวิต การฝึกตนเองด้วยความเมตตาและการประเมินความคิดใหม่ซ้ำๆ สามารถปรับเปลี่ยนวงจรประสาทที่อยู่ภายใต้การประเมินตนเองได้อย่างแท้จริง

เส้นทางสู่การเสริมสร้าง {{T}} ประกอบด้วยสามองค์ประกอบที่มีหลักฐานเชิงประจักษ์: การตระหนักรู้และตั้งคำถามกับนักวิจารณ์ภายในโดยไม่ต้องต่อสู้กับมัน การปลูกฝังความเมตตาต่อตนเองเป็นปฏิกิริยาเริ่มต้นต่อความล้มเหลวที่รับรู้ และการค่อยๆ ซึมซับความสำเร็จผ่านการลิ้มรสอย่างจงใจแทนที่จะมองข้ามว่าเป็นข้อยกเว้น #VibeCoding #EmotionalFitness`,
  },
  relationships: {
    en: `{{T}} form the fabric of human experience. From attachment theory pioneered by John Bowlby to modern interpersonal neuroscience, research consistently shows that the quality of our relationships is the single strongest predictor of physical and mental health outcomes—stronger than smoking, exercise, or diet.

The 75-year Harvard Study of Adult Development, one of the longest longitudinal studies in history, concluded that the people who were most satisfied in their relationships at age 50 were the healthiest at age 80. Relationship quality predicted health outcomes better than cholesterol levels or blood pressure.

Modern relationship science focuses on several key factors: communication patterns (particularly the ability to repair after conflict), emotional attunement (accurately perceiving and responding to a partner's emotional state), and shared meaning systems. Gottman's research identifies that the ratio of positive to negative interactions during conflict must remain above 5:1 for relationships to thrive.

When faced with {{T}}, the most effective interventions include emotionally focused therapy (EFT), which has shown 70-75% recovery rates for relationship distress, and systematic training in communication skills that address the specific patterns of interaction rather than surface-level content of conflicts. #VibeCoding #EmotionalFitness`,
    zh: `{{T}}构成了人类经验的基底。从Bowlby的依恋理论到现代人际神经科学，研究一致表明：关系质量是身心健康最强的预测因子——比吸烟、运动或饮食的影响更大。

历时75年的哈佛成人发展研究——史上最长的纵向研究之一——得出结论：50岁时对关系最满意的人，到80岁时最健康。关系质量比胆固醇水平或血压更能预测健康结果。

现代关系科学聚焦几个关键因素：沟通模式（特别是冲突后的修复能力）、情绪调谐（准确感知并回应伴侣的情绪状态）、以及共享的意义系统。Gottman的研究指出，冲突中积极与消极互动的比例必须保持在5:1以上，关系才能蓬勃发展。

面对{{T}}时，最有效的干预包括情绪聚焦疗法（EFT，对关系痛苦有70-75%的恢复率），以及针对具体互动模式（而非冲突的表面内容）的系统性沟通技能训练。 #VibeCoding #EmotionalFitness`,
    ms: `{{T}} membentuk fabrik pengalaman manusia. Daripada teori perlekatan yang dipelopori oleh John Bowlby kepada neurosains interpersonal moden, penyelidikan secara konsisten menunjukkan bahawa kualiti perhubungan kita adalah peramal tunggal terkuat bagi hasil kesihatan fizikal dan mental—lebih kuat daripada merokok, senaman, atau diet.

Kajian Pembangunan Dewasa Harvard selama 75 tahun, salah satu kajian membujur terpanjang dalam sejarah, menyimpulkan bahawa orang yang paling berpuas hati dalam perhubungan mereka pada usia 50 adalah yang paling sihat pada usia 80. Kualiti perhubungan meramal hasil kesihatan lebih baik daripada tahap kolesterol atau tekanan darah.

Sains perhubungan moden memberi tumpuan kepada beberapa faktor utama: corak komunikasi (terutamanya keupayaan untuk membaiki selepas konflik), penyesuaian emosi (melihat dan bertindak balas dengan tepat terhadap keadaan emosi pasangan), dan sistem makna yang dikongsi. Penyelidikan Gottman mengenal pasti bahawa nisbah interaksi positif kepada negatif semasa konflik mesti kekal di atas 5:1 untuk perhubungan berkembang maju.

Apabila berhadapan dengan {{T}}, intervensi yang paling berkesan termasuk terapi fokus emosi (EFT), yang telah menunjukkan kadar pemulihan 70-75% untuk tekanan perhubungan, dan latihan sistematik dalam kemahiran komunikasi yang menangani corak interaksi tertentu dan bukannya kandungan konflik yang cetek. #VibeCoding #EmotionalFitness`,
    es: `{{T}} forman el tejido de la experiencia humana. Desde la teoría del apego pionera de John Bowlby hasta la neurociencia interpersonal moderna, la investigación muestra consistentemente que la calidad de nuestras relaciones es el predictor más fuerte de resultados de salud física y mental—más fuerte que fumar, el ejercicio o la dieta.

El Estudio de Desarrollo Adulto de Harvard de 75 años, uno de los estudios longitudinales más largos de la historia, concluyó que las personas más satisfechas en sus relaciones a los 50 años eran las más saludables a los 80. La calidad de las relaciones predijo mejores resultados de salud que los niveles de colesterol o la presión arterial.

La ciencia moderna de las relaciones se centra en varios factores clave: patrones de comunicación (particularmente la capacidad de reparar después del conflicto), sintonización emocional (percibir y responder con precisión al estado emocional de la pareja) y sistemas de significado compartido. La investigación de Gottman identifica que la proporción de interacciones positivas a negativas durante el conflicto debe mantenerse por encima de 5:1 para que las relaciones prosperen.

Al enfrentar {{T}}, las intervenciones más efectivas incluyen la terapia centrada en las emociones (TCE), que ha mostrado tasas de recuperación del 70-75% para la angustia relacional, y el entrenamiento sistemático en habilidades de comunicación que abordan los patrones específicos de interacción en lugar del contenido superficial de los conflictos. #VibeCoding #EmotionalFitness`,
    ja: `{{T}}は人間経験の基盤を形成します。ジョン・ボウルビィが先駆けた愛着理論から現代の対人神経科学に至るまで、研究は一貫して、関係性の質が身体的・精神的健康の最も強力な予測因子であることを示しています——喫煙、運動、食事よりも強い影響力を持ちます。

75年にわたるハーバード成人発達研究——歴史上最も長い縦断研究の一つ——は、50歳時点で人間関係に最も満足していた人々が80歳時点で最も健康であったと結論づけています。関係性の質は、コレステロール値や血圧よりも健康結果を正確に予測しました。

現代の関係科学はいくつかの主要因子に焦点を当てています：コミュニケーションパターン（特に衝突後の修復能力）、情緒的調律（パートナーの感情状態を正確に知覚し応答すること）、そして共有された意味システム。ゴットマンの研究は、衝突中のポジティブとネガティブな相互作用の比率が5:1以上を維持しなければ関係は繁栄しないと指摘しています。

{{T}}に直面した時、最も効果的な介入には感情焦点化療法（EFT、関係的苦痛に対して70-75%の回復率を示す）や、衝突の表面的な内容ではなく特定の相互作用パターンに対処する体系的なコミュニケーションスキル訓練が含まれます。#VibeCoding #EmotionalFitness`,
    ko: `{{T}}는 인간 경험의 근간을 형성합니다. 존 볼비(John Bowlby)가 개척한 애착 이론부터 현대 대인관계 신경과학에 이르기까지, 연구는 일관되게 관계의 질이 신체적·정신적 건강 결과의 가장 강력한 예측 변수임을 보여줍니다——흡연, 운동, 식이요법보다 더 강력한 영향력을 가집니다.

75년에 걸친 하버드 성인 발달 연구——역사상 가장 긴 종단 연구 중 하나——는 50세에 관계에서 가장 만족한 사람들이 80세에 가장 건강했다고 결론지었습니다. 관계의 질은 콜레스테롤 수치나 혈압보다 건강 결과를 더 잘 예측했습니다.

현대 관계 과학은 몇 가지 핵심 요소에 초점을 맞춥니다: 의사소통 패턴(특히 갈등 후 회복 능력), 정서적 조율(파트너의 감정 상태를 정확히 인지하고 반응하는 능력), 그리고 공유된 의미 체계입니다. 고트만(Gottman)의 연구는 갈등 중 긍정적 상호작용과 부정적 상호작용의 비율이 5:1 이상을 유지해야 관계가 번성할 수 있다고 지적합니다.

{{T}}에 직면했을 때, 가장 효과적인 개입에는 관계적 고통에 대해 70-75%의 회복률을 보이는 정서 중심 치료(EFT)와 갈등의 표면적 내용보다는 특정 상호작용 패턴을 다루는 체계적인 의사소통 기술 훈련이 포함됩니다.#VibeCoding #EmotionalFitness`,
    th: `«{{T}}» คือโครงสร้างพื้นฐานของประสบการณ์ของมนุษย์ จากทฤษฎีความผูกพัน (attachment theory) ที่บุกเบิกโดย John Bowlby สู่ประสาทวิทยาศาสตร์ความสัมพันธ์ระหว่างบุคคลสมัยใหม่ งานวิจัยแสดงให้เห็นอย่างสม่ำเสมอว่าคุณภาพของความสัมพันธ์ของเราเป็นตัวทำนายที่แข็งแกร่งที่สุดของผลลัพธ์ด้านสุขภาพกายและสุขภาพจิต——แข็งแกร่งกว่าการสูบบุหรี่ การออกกำลังกาย หรือการรับประทานอาหาร

การศึกษา Harvard Study of Adult Development ซึ่งกินเวลา 75 ปี เป็นหนึ่งในการศึกษาระยะยาวที่ยาวนานที่สุดในประวัติศาสตร์ สรุปว่าคนที่พึงพอใจในความสัมพันธ์มากที่สุดเมื่ออายุ 50 ปี จะมีสุขภาพดีที่สุดเมื่ออายุ 80 ปี คุณภาพความสัมพันธ์ทำนายผลลัพธ์ด้านสุขภาพได้ดีกว่าระดับคอเลสเตอรอลหรือความดันโลหิต

วิทยาศาสตร์ความสัมพันธ์สมัยใหม่มุ่งเน้นปัจจัยสำคัญหลายประการ: รูปแบบการสื่อสาร (โดยเฉพาะความสามารถในการซ่อมแซมความสัมพันธ์หลังความขัดแย้ง) การปรับอารมณ์ร่วม (การรับรู้และตอบสนองต่อสภาวะอารมณ์ของคู่ครองอย่างแม่นยำ) และระบบความหมายร่วมกัน งานวิจัยของ Gottman ระบุว่าอัตราส่วนของการมีปฏิสัมพันธ์เชิงบวกต่อเชิงลบระหว่างความขัดแย้งต้องคงอยู่เหนือ 5:1 เพื่อให้ความสัมพันธ์เจริญรุ่งเรือง

เมื่อเผชิญกับ «{{T}}» การแทรกแซงที่มีประสิทธิภาพที่สุดรวมถึงการบำบัดแบบเน้นอารมณ์ (EFT) ซึ่งแสดงอัตราการฟื้นตัว 70-75% สำหรับความทุกข์ในความสัมพันธ์ และการฝึกทักษะการสื่อสารอย่างเป็นระบบที่จัดการกับรูปแบบเฉพาะของการมีปฏิสัมพันธ์มากกว่าเนื้อหาพื้นผิวของความขัดแย้ง #VibeCoding #EmotionalFitness`,
  },
  identity: {
    en: `{{T}} is the answer to the question "Who am I?"—a complex integration of personal history, values, beliefs, social roles, and future aspirations. Erik Erikson's stage theory of psychosocial development identifies identity versus role confusion as the central crisis of adolescence, but contemporary research recognizes that identity formation is a lifelong process of revision and integration.

Modern identity research has moved beyond Erikson's framework to explore identity as a dynamic narrative. Dan McAdams' narrative identity theory proposes that people construct their identity through internalized, evolving life stories that integrate past experiences with imagined futures. The coherence and complexity of these narratives predict psychological well-being more strongly than any specific identity content.

Identity exploration involves two key dimensions: exploration (actively questioning and seeking information about possible identities) and commitment (making firm choices about identity direction). Marcia's identity status model identifies four statuses: achievement (exploration followed by commitment), moratorium (active exploration without commitment), foreclosure (commitment without exploration), and diffusion (neither exploration nor commitment).

When navigating {{T}}, the most adaptive approach involves what developmental psychologists call identity integration—the ability to hold multiple aspects of identity (professional, personal, cultural, relational) in a coherent whole rather than feeling fragmented or forced to choose between competing identity commitments. #VibeCoding #EmotionalFitness`,
    zh: `{{T}}是对"我是谁"这一问题的回答——个人历史、价值观、信念、社会角色和未来抱负的复杂整合。Erikson的心理社会发展阶段理论将身份认同vs角色混乱确定为青春期的核心危机，但当代研究认识到，身份形成是一个毕生的修正与整合过程。

现代身份研究已超越Erikson的框架，将身份视为动态叙事。McAdams的叙事身份理论认为，人们通过内化、演变的生命故事来构建身份，这些故事将过去经验与想象的未来整合在一起。这些叙事的连贯性和复杂性比任何具体的身份内容更能预测心理健康。

身份探索涉及两个关键维度：探索（主动质疑和寻求关于可能身份的信息）和承诺（对身份方向做出坚定选择）。Marcia的身份状态模型识别出四种状态：成就（探索后的承诺）、暂停（活跃探索但未承诺）、封闭（未经探索的承诺）和扩散（既无探索也无承诺）。

当面临{{T}}时，最具适应性的方法是发展心理学家所说的身份整合——能够将多个身份面向（职业的、个人的、文化的、关系的）保持在一个连贯的整体中，而不是感到分裂或被迫在不同身份承诺之间做选择。 #VibeCoding #EmotionalFitness`,
    ms: `{{T}} adalah jawapan kepada soalan "Siapakah saya?"—integrasi kompleks sejarah peribadi, nilai, kepercayaan, peranan sosial, dan aspirasi masa depan. Teori peringkat perkembangan psikososial Erik Erikson mengenal pasti identiti lawan kekeliruan peranan sebagai krisis utama remaja, tetapi penyelidikan kontemporari mengakui bahawa pembentukan identiti adalah proses seumur hidup yang melibatkan semakan dan integrasi.

Penyelidikan identiti moden telah melampaui rangka kerja Erikson untuk meneroka identiti sebagai naratif dinamik. Teori identiti naratif Dan McAdams mencadangkan bahawa orang membina identiti mereka melalui kisah hidup yang dihayati dan berkembang yang mengintegrasikan pengalaman lalu dengan masa depan yang dibayangkan. Koherensi dan kerumitan naratif ini meramal kesejahteraan psikologi dengan lebih kuat daripada kandungan identiti tertentu.

Penerokaan identiti melibatkan dua dimensi utama: penerokaan (secara aktif mempersoalkan dan mencari maklumat tentang identiti yang mungkin) dan komitmen (membuat pilihan tegas tentang hala tuju identiti). Model status identiti Marcia mengenal pasti empat status: pencapaian (penerokaan diikuti komitmen), moratorium (penerokaan aktif tanpa komitmen), perampasan (komitmen tanpa penerokaan), dan difusi (tiada penerokaan mahupun komitmen).

Apabila mengharungi {{T}}, pendekatan paling adaptif melibatkan apa yang dipanggil oleh ahli psikologi perkembangan sebagai integrasi identiti—keupayaan untuk memegang pelbagai aspek identiti (profesional, peribadi, budaya, hubungan) dalam satu keseluruhan yang koheren, bukannya merasa terpecah-belah atau dipaksa memilih antara komitmen identiti yang bersaing. #VibeCoding #EmotionalFitness`,
    es: `{{T}} es la respuesta a la pregunta "¿Quién soy yo?"—una integración compleja de historia personal, valores, creencias, roles sociales y aspiraciones futuras. La teoría de las etapas del desarrollo psicosocial de Erik Erikson identifica la identidad versus la confusión de roles como la crisis central de la adolescencia, pero la investigación contemporánea reconoce que la formación de la identidad es un proceso vitalicio de revisión e integración.

La investigación moderna de la identidad ha ido más allá del marco de Erikson para explorar la identidad como una narrativa dinámica. La teoría de la identidad narrativa de Dan McAdams propone que las personas construyen su identidad a través de historias de vida internalizadas y en evolución que integran experiencias pasadas con futuros imaginados. La coherencia y complejidad de estas narrativas predicen el bienestar psicológico con más fuerza que cualquier contenido de identidad específico.

La exploración de la identidad implica dos dimensiones clave: la exploración (cuestionar activamente y buscar información sobre identidades posibles) y el compromiso (tomar decisiones firmes sobre la dirección de la identidad). El modelo de estados de identidad de Marcia identifica cuatro estados: logro (exploración seguida de compromiso), moratoria (exploración activa sin compromiso), ejecución (compromiso sin exploración) y difusión (ni exploración ni compromiso).

Al navegar {{T}}, el enfoque más adaptativo implica lo que los psicólogos del desarrollo llaman integración de la identidad—la capacidad de mantener múltiples aspectos de la identidad (profesional, personal, cultural, relacional) en un todo coherente en lugar de sentirse fragmentado o forzado a elegir entre compromisos de identidad en competencia. #VibeCoding #EmotionalFitness`,
    ja: `{{T}}は「私は誰か？」という問いへの答えです——個人の歴史、価値観、信念、社会的役割、将来の願望の複雑な統合です。エリク・エリクソンの心理社会的発達段階理論は、アイデンティティ対役割の混乱を青年期の中核的危機と特定していますが、現代の研究はアイデンティティ形成が生涯にわたる修正と統合のプロセスであると認識しています。

現代のアイデンティティ研究はエリクソンの枠組みを超えて、アイデンティティを動的な物語として探求しています。ダン・マクアダムズの物語アイデンティティ理論は、人々が過去の経験と想像された未来を統合する内面化され進化するライフストーリーを通じてアイデンティティを構築すると提唱しています。これらの物語の一貫性と複雑性は、特定のアイデンティティ内容よりも心理的幸福を強く予測します。

{{T}}を進む際、最も適応的なアプローチは発達心理学者がアイデンティティ統合と呼ぶもの——アイデンティティの複数の側面（職業的、個人的、文化的、関係的）を断片化したり競合するアイデンティティコミットメントの間で選択を強いられたりするのではなく、一貫した全体として保持する能力——を含みます。#VibeCoding #EmotionalFitness`,
    ko: `{{T}}는 "나는 누구인가?"라는 질문에 대한 답입니다——개인적 역사, 가치관, 신념, 사회적 역할, 미래 포부의 복잡한 통합입니다. 에릭 에릭슨(Erik Erikson)의 심리사회적 발달 단계 이론은 정체성 대 역할 혼란을 청소년기의 핵심 위기로 식별하지만, 현대 연구는 정체성 형성이 평생에 걸친 수정과 통합의 과정임을 인식하고 있습니다.

현대 정체성 연구는 에릭슨의 프레임워크를 넘어 정체성을 역동적 내러티브로 탐구합니다. 댄 맥아담스(Dan McAdams)의 내러티브 정체성 이론은 사람들이 과거 경험과 상상된 미래를 통합하는 내면화되고 진화하는 삶의 이야기를 통해 정체성을 구축한다고 제안합니다. 이러한 내러티브의 일관성과 복잡성은 특정 정체성 내용보다 심리적 웰빙을 더 강력하게 예측합니다.

{{T}}를 탐색할 때, 가장 적응적인 접근법은 발달 심리학자들이 정체성 통합이라고 부르는 것——정체성의 여러 측면(직업적, 개인적, 문화적, 관계적)을 단편화되거나 경쟁하는 정체성 약속 사이에서 선택을 강요받는 대신 일관된 전체로 유지하는 능력——을 포함합니다.#VibeCoding #EmotionalFitness`,
    th: `«{{T}}» คือคำตอบของคำถามที่ว่า "ฉันคือใคร?"——การบูรณาการที่ซับซ้อนของประวัติส่วนตัว ค่านิยม ความเชื่อ บทบาททางสังคม และความปรารถนาในอนาคต ทฤษฎีพัฒนาการทางจิตสังคมของ Erik Erikson ระบุว่าอัตลักษณ์กับการสับสนในบทบาทเป็นวิกฤตหลักของวัยรุ่น แต่งานวิจัยร่วมสมัยยอมรับว่าการสร้างอัตลักษณ์เป็นกระบวนการตลอดชีวิตของการทบทวนและบูรณาการ

งานวิจัยอัตลักษณ์สมัยใหม่ได้ก้าวข้ามกรอบของ Erikson เพื่อสำรวจอัตลักษณ์ในฐานะเรื่องเล่าที่พลวัต ทฤษฎีอัตลักษณ์เชิงเรื่องเล่าของ Dan McAdams เสนอว่าผู้คนสร้างอัตลักษณ์ของตนผ่านเรื่องราวชีวิตที่ถูกทำให้เป็นภายในและกำลังพัฒนา ซึ่งบูรณาการประสบการณ์ในอดีตกับอนาคตที่จินตนาการไว้ ความต่อเนื่องและความซับซ้อนของเรื่องเล่าเหล่านี้ทำนายความผาสุกทางจิตใจได้แข็งแกร่งกว่าเนื้อหาอัตลักษณ์เฉพาะใดๆ

เมื่อนำทาง «{{T}}» แนวทางที่ปรับตัวได้มากที่สุดเกี่ยวข้องกับสิ่งที่นักจิตวิทยาพัฒนาการเรียกว่าการบูรณาการอัตลักษณ์——ความสามารถในการยึดถืออัตลักษณ์หลายด้าน (อาชีพ ส่วนตัว วัฒนธรรม ความสัมพันธ์) ให้เป็นหนึ่งเดียวที่ต่อเนื่องกัน แทนที่จะรู้สึกแตกเป็นเสี่ยงหรือถูกบังคับให้เลือกระหว่างพันธะสัญญาอัตลักษณ์ที่แข่งขันกัน #VibeCoding #EmotionalFitness`,
  },
  mindfulness: {
    en: `{{T}} is the psychological capacity to pay attention to the present moment with intention, curiosity, and without judgment. While rooted in ancient contemplative traditions (particularly Buddhist vipassana and Zen), mindfulness has been extensively studied in modern neuroscience and clinical psychology over the past four decades.

The neurological effects of mindfulness practice are well-documented: regular practice increases gray matter density in the prefrontal cortex (improving executive function and emotional regulation), reduces amygdala reactivity (decreasing automatic stress responses), and strengthens the insula (enhancing interoceptive awareness and empathy). These changes are measurable after as little as 8 weeks of regular practice, as demonstrated in Kabat-Zinn's landmark MBSR (Mindfulness-Based Stress Reduction) research.

Importantly, {{T}} is not about emptying the mind or achieving a special state of relaxation. It is about developing a different relationship with experience—one characterized by approach rather than avoidance, curiosity rather than judgment, and stability rather than reactivity. This shift in relationship to experience is what produces the therapeutic benefits.

The core skills of mindfulness include: focused attention (sustaining attention on a chosen object, typically the breath), open monitoring (maintaining awareness of whatever arises without getting caught in it), and loving-kindness (cultivating positive emotional states toward self and others). Each skill engages partially distinct neural networks and produces different clinical outcomes. #VibeCoding #EmotionalFitness`,
    zh: `{{T}}是用意图、好奇和不评判的态度关注当下的心理能力。虽然根植于古老的沉思传统（特别是佛教内观和禅宗），正念在过去四十年中已在现代神经科学和临床心理学中得到广泛研究。

正念练习的神经效应有充分证据：规律练习增加前额叶皮层的灰质密度（改善执行功能和情绪调节），降低杏仁核反应性（减少自动压力反应），并增强脑岛（提升内感受觉知和共情能力）。Kabat-Zinn里程碑式的MBSR（正念减压）研究证明，仅8周的规律练习即可测量到这些变化。

重要的是，{{T}}不是关于清空头脑或达到某种特殊的放松状态。它是关于发展与体验的不同关系——以接近而非回避、好奇而非评判、稳定而非反应为特征。正是这种与体验关系的转变产生了治疗效果。

正念的核心技能包括：专注注意（在选定对象上维持注意力，通常是呼吸）、开放监控（对任何出现的内容保持觉知而不陷入其中）、以及慈心（培育对自己和他人的积极情绪状态）。每种技能激活部分不同的神经网络，产生不同的临床效果。 #VibeCoding #EmotionalFitness`,
    ms: `{{T}} adalah kapasiti psikologi untuk memberi perhatian kepada masa kini dengan niat, rasa ingin tahu, dan tanpa penghakiman. Walaupun berakar dalam tradisi kontemplatif kuno (terutamanya vipassana Buddha dan Zen), kesedaran telah dikaji secara meluas dalam neurosains moden dan psikologi klinikal sejak empat dekad yang lalu.

Kesan neurologi amalan kesedaran adalah terdokumentasi dengan baik: amalan tetap meningkatkan ketumpatan bahan kelabu dalam korteks prefrontal (meningkatkan fungsi eksekutif dan pengawalan emosi), mengurangkan kereaktifan amygdala (mengurangkan tindak balas tekanan automatik), dan menguatkan insula (meningkatkan kesedaran interosepsi dan empati). Perubahan ini boleh diukur selepas hanya 8 minggu amalan tetap.

Penting untuk difahami bahawa {{T}} bukan tentang mengosongkan minda atau mencapai keadaan relaksasi yang istimewa. Ia tentang mengembangkan hubungan yang berbeza dengan pengalaman—satu yang dicirikan oleh pendekatan dan bukannya pengelakan, rasa ingin tahu dan bukannya penghakiman, dan kestabilan dan bukannya kereaktifan. Peralihan dalam hubungan dengan pengalaman inilah yang menghasilkan manfaat terapeutik.

Kemahiran teras {{T}} termasuk: perhatian fokus (mengekalkan perhatian pada objek yang dipilih, biasanya nafas), pemantauan terbuka (mengekalkan kesedaran tentang apa sahaja yang timbul tanpa terperangkap di dalamnya), dan kebaikan penyayang (memupuk keadaan emosi positif terhadap diri sendiri dan orang lain). #VibeCoding #EmotionalFitness`,
    es: `{{T}} es la capacidad psicológica de prestar atención al momento presente con intención, curiosidad y sin juzgar. Aunque arraigada en tradiciones contemplativas antiguas (particularmente el vipassana budista y el zen), la atención plena ha sido ampliamente estudiada en la neurociencia moderna y la psicología clínica durante las últimas cuatro décadas.

Los efectos neurológicos de la práctica de atención plena están bien documentados: la práctica regular aumenta la densidad de materia gris en la corteza prefrontal (mejorando la función ejecutiva y la regulación emocional), reduce la reactividad de la amígdala (disminuyendo las respuestas automáticas al estrés) y fortalece la ínsula (mejorando la conciencia interoceptiva y la empatía). Estos cambios son medibles después de solo 8 semanas de práctica regular.

Es importante entender que {{T}} no se trata de vaciar la mente ni de alcanzar un estado especial de relajación. Se trata de desarrollar una relación diferente con la experiencia—una caracterizada por el acercamiento en lugar de la evitación, la curiosidad en lugar del juicio, y la estabilidad en lugar de la reactividad. Es este cambio en la relación con la experiencia lo que produce los beneficios terapéuticos.

Las habilidades centrales de {{T}} incluyen: atención enfocada (mantener la atención en un objeto elegido, generalmente la respiración), monitoreo abierto (mantener la conciencia de lo que surja sin quedar atrapado en ello) y bondad amorosa (cultivar estados emocionales positivos hacia uno mismo y los demás). #VibeCoding #EmotionalFitness`,
    ja: `{{T}}は、意図、好奇心、判断しない態度で現在の瞬間に注意を払う心理的能力です。古代の観想伝統（特に仏教のヴィパッサナーと禅）に根ざしていますが、マインドフルネスは過去40年にわたって現代の神経科学と臨床心理学で広く研究されてきました。

マインドフルネス実践の神経学的効果は十分に文書化されています：定期的な実践は前頭前皮質の灰白質密度を増加させ（実行機能と感情調節の改善）、扁桃体反応性を低下させ（自動ストレス反応の軽減）、島を強化します（内受容感覚と共感の向上）。これらの変化は、Kabat-Zinnの画期的なMBSR（マインドフルネスベースのストレス低減）研究で実証されたように、わずか8週間の定期実践で測定可能です。

{{T}}の中核的スキルには以下が含まれます：集中注意（選択した対象、通常は呼吸に注意を維持する）、オープンモニタリング（何が生じてもそれに捉われずに気づきを維持する）、そして慈愛（自己と他者に対するポジティブな感情状態を育む）。#VibeCoding #EmotionalFitness`,
    ko: `{{T}}는 의도, 호기심, 판단하지 않는 태도로 현재 순간에 주의를 기울이는 심리적 능력입니다. 고대의 명상 전통(특히 불교 위파사나와 선)에 뿌리를 두고 있지만, 마음챙김은 지난 40년 동안 현대 신경과학과 임상 심리학에서 광범위하게 연구되어 왔습니다.

마음챙김 수행의 신경학적 효과는 잘 문서화되어 있습니다: 정기적인 수행은 전전두엽 피질의 회백질 밀도를 증가시키고(실행 기능과 정서 조절 개선), 편도체 반응성을 감소시키며(자동 스트레스 반응 감소), 섬엽을 강화합니다(내수용 감각과 공감 능력 향상). 이러한 변화는 Kabat-Zinn의 획기적인 MBSR(마음챙김 기반 스트레스 감소) 연구에서 입증된 바와 같이 단 8주의 정기적인 수행 후에 측정 가능합니다.

{{T}}의 핵심 기술에는 다음이 포함됩니다: 집중 주의(선택한 대상, 일반적으로 호흡에 주의 유지), 개방 모니터링(발생하는 모든 것에 대한 알아차림 유지, 거기에 빠지지 않음), 그리고 자애(자기 자신과 타인에 대한 긍정적 감정 상태 함양).#VibeCoding #EmotionalFitness`,
    th: `«{{T}}» คือความสามารถทางจิตวิทยาในการใส่ใจกับช่วงเวลาปัจจุบันอย่างตั้งใจ ด้วยความอยากรู้ และปราศจากการตัดสิน แม้ว่าจะมีรากฐานในประเพณีการฝึกจิตแบบโบราณ (โดยเฉพาะวิปัสสนาทางพุทธศาสนาและเซน) แต่การเจริญสติได้รับการศึกษาอย่างกว้างขวางในประสาทวิทยาศาสตร์สมัยใหม่และจิตวิทยาคลินิกในช่วงสี่ทศวรรษที่ผ่านมา

ผลทางระบบประสาทของการฝึกสติได้รับการบันทึกไว้เป็นอย่างดี: การฝึกเป็นประจำจะเพิ่มความหนาแน่นของสสารสีเทาในคอร์เทกซ์ส่วนหน้า ( prefrontal cortex) (ปรับปรุงการทำงานของบริหารและการควบคุมอารมณ์) ลดปฏิกิริยาของอะมิกดาลา (ลดการตอบสนองความเครียดอัตโนมัติ) และเสริมสร้างอินซูลา (เพิ่มการรับรู้ภายในและความเห็นอกเห็นใจ) การเปลี่ยนแปลงเหล่านี้สามารถวัดได้หลังจากฝึกเพียง 8 สัปดาห์

ทักษะหลักของ «{{T}}» ได้แก่: การใส่ใจแบบจดจ่อ (การรักษาความสนใจไว้ที่วัตถุที่เลือก โดยปกติคือลมหายใจ) การเฝ้าดูแบบเปิด (การรักษาความตระหนักรู้ต่อสิ่งที่เกิดขึ้นโดยไม่เข้าไปติดอยู่ในนั้น) และเมตตา (การปลูกฝังสภาวะอารมณ์เชิงบวกต่อตนเองและผู้อื่น) #VibeCoding #EmotionalFitness`,
  },
  emotional_health: {
    en: `{{T}} refers to the capacity to experience, understand, regulate, and express emotions in ways that promote well-being and adaptive functioning. It is not the absence of negative emotions but the flexibility to respond to emotional experiences effectively rather than reactively.

The component model of emotional health includes four interrelated skills. Emotional awareness is the ability to accurately identify and label emotions as they occur—a skill that predicts better mental health outcomes across diverse populations. Emotional understanding refers to comprehension of the causes, functions, and trajectories of emotions. Emotional acceptance involves allowing emotions to be present without fighting them, suppressing them, or being controlled by them. Emotional regulation encompasses the strategies used to influence the intensity, duration, and expression of emotions.

Gross's process model of emotion regulation identifies five families of strategies organized by when they intervene in the emotion-generative process: situation selection, situation modification, attentional deployment, cognitive change, and response modulation. Cognitive reappraisal (changing how we think about a situation) is consistently associated with better emotional health outcomes, while expressive suppression (hiding emotional expression) is associated with worse outcomes.

To improve {{T}}, the most effective approaches include cognitive-behavioral therapy (which modifies maladaptive cognitive appraisals), dialectical behavior therapy skills (particularly distress tolerance and emotion regulation modules), and acceptance and commitment therapy (which enhances psychological flexibility in relating to emotions). #VibeCoding #EmotionalFitness`,
    zh: `{{T}}是以促进幸福和适应性功能的方式体验、理解、调节和表达情绪的能力。它不是没有负性情绪，而是灵活有效地回应情绪体验而非被动反应的能力。

情绪健康的成分模型包括四个相互关联的技能。情绪觉察是准确识别和标记情绪的能力——这是跨不同人群预测心理健康结果的强因子。情绪理解是对情绪的原因、功能和轨迹的理解。情绪接纳是允许情绪存在，不与它战斗、不压抑、也不被它控制。情绪调节包括用于影响情绪强度、持续时间和表达方式的策略。

Gross的情绪调节过程模型识别了五类策略，按它们在情绪生成过程中的干预时机组织：情境选择、情境修正、注意部署、认知改变和反应调节。认知重评（改变我们对情境的思考方式）始终与更好的情绪健康结果相关，而表达抑制（隐藏情绪表达）与更差的结果相关。

改善{{T}}的最有效方法包括：认知行为疗法（修正适应不良的认知评估）、辩证行为疗法技能（特别是痛苦耐受和情绪调节模块）、以及接纳承诺疗法（增强与情绪相关的心理灵活性）。 #VibeCoding #EmotionalFitness`,
    ms: `{{T}} merujuk kepada kapasiti untuk mengalami, memahami, mengawal, dan meluahkan emosi dengan cara yang menggalakkan kesejahteraan dan fungsi adaptif. Ia bukan ketiadaan emosi negatif tetapi fleksibiliti untuk bertindak balas terhadap pengalaman emosi secara berkesan dan bukannya secara reaktif.

Model komponen kesihatan emosi merangkumi empat kemahiran yang saling berkaitan. Kesedaran emosi adalah keupayaan untuk mengenal pasti dan melabel emosi dengan tepat semasa ia berlaku—kemahiran yang meramalkan hasil kesihatan mental yang lebih baik. Pemahaman emosi merujuk kepada pemahaman tentang punca, fungsi, dan trajektori emosi. Penerimaan emosi melibatkan membenarkan emosi hadir tanpa melawannya, menekannya, atau dikawal olehnya. Regulasi emosi merangkumi strategi yang digunakan untuk mempengaruhi intensiti, tempoh, dan ekspresi emosi.

Model proses Gross tentang regulasi emosi mengenal pasti lima keluarga strategi: pemilihan situasi, pengubahsuaian situasi, pengaturan perhatian, perubahan kognitif, dan modulasi respons. Penilaian semula kognitif secara konsisten dikaitkan dengan hasil kesihatan emosi yang lebih baik, manakala penindasan ekspresif dikaitkan dengan hasil yang lebih buruk.

Untuk meningkatkan {{T}}, pendekatan paling berkesan termasuk terapi kognitif-tingkah laku, kemahiran terapi tingkah laku dialektik, dan terapi penerimaan dan komitmen. #VibeCoding #EmotionalFitness`,
    es: `{{T}} se refiere a la capacidad de experimentar, comprender, regular y expresar emociones de manera que promuevan el bienestar y el funcionamiento adaptativo. No es la ausencia de emociones negativas sino la flexibilidad para responder a las experiencias emocionales de forma eficaz en lugar de reactiva.

El modelo de componentes de la salud emocional incluye cuatro habilidades interrelacionadas. La conciencia emocional es la capacidad de identificar y etiquetar con precisión las emociones a medida que ocurren—una habilidad que predice mejores resultados de salud mental en diversas poblaciones. La comprensión emocional se refiere al conocimiento de las causas, funciones y trayectorias de las emociones. La aceptación emocional implica permitir que las emociones estén presentes sin luchar contra ellas, suprimirlas o ser controlado por ellas. La regulación emocional abarca las estrategias utilizadas para influir en la intensidad, duración y expresión de las emociones.

El modelo de proceso de Gross sobre la regulación emocional identifica cinco familias de estrategias organizadas por cuándo intervienen en el proceso generativo de emociones: selección de la situación, modificación de la situación, despliegue atencional, cambio cognitivo y modulación de la respuesta. La reevaluación cognitiva (cambiar cómo pensamos sobre una situación) se asocia consistentemente con mejores resultados de salud emocional, mientras que la supresión expresiva (ocultar la expresión emocional) se asocia con peores resultados.

Para mejorar {{T}}, los enfoques más eficaces incluyen la terapia cognitivo-conductual (que modifica las valoraciones cognitivas desadaptativas), las habilidades de terapia dialéctica conductual (particularmente los módulos de tolerancia al malestar y regulación emocional), y la terapia de aceptación y compromiso (que mejora la flexibilidad psicológica en relación con las emociones). #VibeCoding #EmotionalFitness`,
    ja: `{{T}}とは、幸福感と適応的な機能を促進する方法で感情を体験、理解、調節、表現する能力を指します。否定的な感情がないことではなく、感情体験に反応的ではなく効果的に応答する柔軟性です。

感情的健康の成分モデルには、相互に関連する4つのスキルが含まれます。感情認識は、感情が発生したときに正確に識別しラベル付けする能力であり、多様な集団にわたってより良いメンタルヘルス結果を予測するスキルです。感情理解は、感情の原因、機能、軌跡の理解を指します。感情受容は、感情と戦ったり、抑圧したり、コントロールされたりせずに、感情が存在することを許可することを含みます。感情調節は、感情の強度、持続時間、表現に影響を与えるために使用される戦略を包含します。

Grossの感情調節プロセスモデルは、感情生成プロセスに介入するタイミングによって組織化された5つの戦略ファミリーを特定しています：状況選択、状況修正、注意配分、認知変化、反応調整。認知的再評価（状況についての考え方を変えること）は一貫してより良い感情的健康結果と関連していますが、表出抑制（感情表現を隠すこと）はより悪い結果と関連しています。

{{T}}を改善するための最も効果的なアプローチには、認知行動療法（不適応な認知評価を修正する）、弁証法的行動療法スキル（特に苦痛耐性と感情調節モジュール）、およびアクセプタンス＆コミットメント・セラピー（感情との関係における心理的柔軟性を高める）が含まれます。#VibeCoding #EmotionalFitness`,
    ko: `{{T}}는 웰빙과 적응적 기능을 촉진하는 방식으로 감정을 경험하고, 이해하고, 조절하고, 표현하는 능력을 말합니다. 부정적인 감정이 없는 것이 아니라 감정적 경험에 반응적으로가 아니라 효과적으로 대응하는 유연성입니다.

정서적 건강의 구성 요소 모델에는 상호 관련된 네 가지 기술이 포함됩니다. 감정 인식은 감정이 발생할 때 정확하게 식별하고 명명하는 능력으로, 다양한 인구 집단에서 더 나은 정신 건강 결과를 예측하는 기술입니다. 감정 이해는 감정의 원인, 기능, 궤적에 대한 이해를 말합니다. 감정 수용은 감정과 싸우거나, 억압하거나, 통제당하지 않고 감정이 존재하도록 허용하는 것을 포함합니다. 감정 조절은 감정의 강도, 지속 시간, 표현에 영향을 미치는 데 사용되는 전략을 포함합니다.

Gross의 감정 조절 과정 모델은 감정 생성 과정에 개입하는 시점에 따라 조직된 5가지 전략군을 식별합니다: 상황 선택, 상황 수정, 주의 배치, 인지 변화, 반응 조절. 인지 재평가(상황에 대한 생각 방식을 바꾸는 것)는 일관되게 더 나은 정서적 건강 결과와 관련이 있는 반면, 표현 억제(감정 표현을 숨기는 것)는 더 나쁜 결과와 관련이 있습니다.

{{T}}를 개선하기 위한 가장 효과적인 접근법에는 인지 행동 치료(부적응적 인지 평가를 수정), 변증법적 행동 치료 기술(특히 고통 내성 및 감정 조절 모듈), 수용 전념 치료(감정과 관련된 심리적 유연성 향상)가 포함됩니다.#VibeCoding #EmotionalFitness`,
    th: `{{T}} หมายถึงความสามารถในการประสบ เข้าใจ ควบคุม และแสดงอารมณ์ในวิธีที่ส่งเสริมความเป็นอยู่ที่ดีและการทำงานที่ปรับตัวได้ มันไม่ใช่การไม่มีอารมณ์เชิงลบ แต่เป็นความยืดหยุ่นในการตอบสนองต่อประสบการณ์ทางอารมณ์อย่างมีประสิทธิภาพแทนที่จะตอบสนองแบบอัตโนมัติ

แบบจำลององค์ประกอบของสุขภาพทางอารมณ์ประกอบด้วยทักษะสี่ประการที่สัมพันธ์กัน การตระหนักรู้อารมณ์คือความสามารถในการระบุและติดฉลากอารมณ์อย่างแม่นยำเมื่อเกิดขึ้น—ทักษะที่ทำนายผลลัพธ์สุขภาพจิตที่ดีขึ้นในประชากรที่หลากหลาย ความเข้าใจอารมณ์หมายถึงความเข้าใจในสาเหตุ หน้าที่ และวิถีของอารมณ์ การยอมรับอารมณ์เกี่ยวข้องกับการปล่อยให้อารมณ์ดำรงอยู่โดยไม่ต่อสู้กับมัน กดมัน หรือถูกควบคุมโดยมัน การควบคุมอารมณ์ครอบคลุมกลยุทธ์ที่ใช้เพื่อมีอิทธิพลต่อความรุนแรง ระยะเวลา และการแสดงออกของอารมณ์

แบบจำลองกระบวนการของ Gross เกี่ยวกับการควบคุมอารมณ์ระบุกลยุทธ์ห้าตระกูลที่จัดระเบียบตามเวลาที่แทรกแซงในกระบวนการสร้างอารมณ์: การเลือกสถานการณ์ การปรับเปลี่ยนสถานการณ์ การจัดการความสนใจ การเปลี่ยนแปลงความคิด และการปรับเปลี่ยนการตอบสนอง การประเมินความคิดใหม่ (การเปลี่ยนวิธีที่เราคิดเกี่ยวกับสถานการณ์) สัมพันธ์กับผลลัพธ์สุขภาพทางอารมณ์ที่ดีขึ้นอย่างสม่ำเสมอ ในขณะที่การกดการแสดงออก (การซ่อนการแสดงออกทางอารมณ์) สัมพันธ์กับผลลัพธ์ที่แย่ลง

เพื่อปรับปรุง{{T}} วิธีการที่มีประสิทธิภาพมากที่สุดรวมถึงการบำบัดทางความคิดและพฤติกรรม (ซึ่งปรับเปลี่ยนการประเมินความคิดที่ปรับตัวไม่ดี) ทักษะการบำบัดพฤติกรรมวิภาษวิธี (โดยเฉพาะโมดูลการทนต่อความทุกข์และการควบคุมอารมณ์) และการบำบัดการยอมรับและความมุ่งมั่น (ซึ่งเพิ่มความยืดหยุ่นทางจิตวิทยาในการเกี่ยวข้องกับอารมณ์) #VibeCoding #EmotionalFitness`,
  },
}

const FITNESS: Record<string, Record<string, string>> = {
  sleep: {
    zh: `针对{{T}}的日常训练，融合CBT-I和正念方法的循证实践：

1. **刺激控制疗法**：只在感到困倦时才上床；如果在床20分钟后仍无法入睡，起来做放松活动，直到再次困倦；避免在床上工作、刷手机或思考问题。目标是重建"床=睡眠"的强条件反射。

2. **晨光暴露**：每天早晨起床后30分钟内接触自然光15-30分钟。光照是调控昼夜节律最强的授时因子，早晨光照能提前生物钟相位，增强夜间睡眠驱动力。阴天可用光照强度5000-10000 lux的灯箱替代。

3. **睡前正念扫描**：睡前10分钟进行身体扫描冥想。从脚趾开始，逐步将注意力移到头顶，在每个部位停留3-5个呼吸。当思绪漂移至焦虑想法时，温和地引导注意力回到身体感受上。

4. **睡眠效率日记**：连续记录2周的就寝时间、入睡时间、醒来次数、起床时间。计算睡眠效率（实际睡眠时间/卧床时间×100%）。效率低于85%时，延迟就寝时间15-30分钟以浓缩睡眠窗口。

5. **认知重构练习**：写下关于睡眠的自动化思维（如"今晚又要失眠了，明天肯定完蛋"），逐条用证据检验这些预测的真实性——回顾过去最差的睡眠日，实际上是不是也能勉强完成任务？`,
    en: `Evidence-based daily practices for {{T}}, integrating CBT-I and mindfulness approaches:

1. **Stimulus Control**: Go to bed only when sleepy. If unable to fall asleep within 20 minutes, get up and engage in a relaxing activity in dim light until drowsy. Avoid working, phone scrolling, or worrying in bed. The goal is to rebuild the conditioned association between bed and sleep.

2. **Morning Light Exposure**: Within 30 minutes of waking, expose yourself to natural daylight for 15-30 minutes. Light is the most powerful zeitgeber (time-giver) for circadian rhythm regulation. Morning light advances your biological clock phase and strengthens nighttime sleep drive. On cloudy days, a 5000-10000 lux lightbox can substitute.

3. **Pre-Sleep Body Scan**: Practice a 10-minute body scan meditation before bed. Starting from your toes, gradually move attention upward to the crown of your head, spending 3-5 breaths at each region. When your mind wanders to anxious thoughts, gently guide attention back to physical sensations.

4. **Sleep Efficiency Tracking**: Maintain a sleep diary for 2 weeks recording bedtime, sleep onset latency, night awakenings, and wake time. Calculate sleep efficiency (total sleep time / time in bed × 100%). When efficiency drops below 85%, delay bedtime by 15-30 minutes to consolidate the sleep window.

5. **Cognitive Restructuring**: Write down automatic thoughts about sleep (e.g., "I'll be useless tomorrow if I don't sleep tonight"). Systematically examine the evidence — on your worst sleep nights, did you actually manage to get through the next day? This practice reduces catastrophic thinking that perpetuates insomnia.`,
    ms: `Amalan harian berasaskan bukti untuk {{T}}, menggabungkan pendekatan CBT-I dan kesedaran:

1. **Kawalan Rangsangan**: Tidur hanya apabila mengantuk. Jika tidak boleh tidur dalam 20 minit, bangun dan lakukan aktiviti relaksasi. Elakkan bekerja atau melayari telefon di atas katil.

2. **Pendedahan Cahaya Pagi**: Dalam 30 minit selepas bangun, dedahkan diri kepada cahaya siang selama 15-30 minit. Cahaya adalah penguatkuasa irama sirkadian yang paling kuat.

3. **Imbasan Badan Sebelum Tidur**: Amalkan meditasi imbasan badan selama 10 minit. Mulakan dari jari kaki, gerakkan perhatian secara beransur-ansur ke atas ke mahkota kepala.

4. **Jurnal Kecekapan Tidur**: Rekodkan waktu tidur, tempoh tidur, dan kira kecekapan. Apabila kecekapan di bawah 85%, lewatkan waktu tidur sebanyak 15-30 minit.`,
    es: `Prácticas diarias basadas en evidencia para {{T}}, integrando enfoques de TCC-I y mindfulness:

1. **Control de Estímulos**: Acuéstese solo cuando tenga sueño. Si no puede dormir en 20 minutos, levántese y realice una actividad relajante. Evite trabajar o usar el teléfono en la cama.

2. **Exposición a la Luz Matutina**: Dentro de los 30 minutos posteriores a despertarse, expóngase a la luz natural durante 15-30 minutos. La luz es el sincronizador más poderoso del ritmo circadiano.

3. **Escáner Corporal Nocturno**: Practique una meditación de escáner corporal de 10 minutos antes de acostarse. Comience desde los dedos de los pies y suba gradualmente hasta la coronilla.

4. **Registro de Eficiencia del Sueño**: Mantenga un diario del sueño durante 2 semanas. Cuando la eficiencia del sueño sea inferior al 85%, retrase la hora de acostarse entre 15 y 30 minutos.`,
    ja: `エビデンスに基づく{{T}}のための日々の練習（CBT-Iとマインドフルネスを統合）：

1. **刺激コントロール**: 眠いときだけベッドに入る。20分以内に入眠できない場合は起きてリラックス活動を行う。ベッドでの作業やスマホ使用を避ける。#VibeCoding
2. **朝の光曝露**: 起床後30分以内に自然光を15-30分浴びる。光は概日リズムの最も強力な調整因子。
3. **就寝前ボディスキャン**: 寝る前に10分間のボディスキャン瞑想を実践。足指から頭頂部へ徐々に注意を移動。
4. **睡眠効率記録**: 2週間睡眠日誌をつけ、睡眠効率を計算。85%未満の場合は就寝時間を15-30分遅らせる。#EmotionalFitness`,
    ko: `{{T}}를 위한 증거 기반 일상练习(CBT-I와 마음챙김 통합):

1. **자극 통제**: 졸릴 때만 침대에 간다. 20분 내에 잠들지 못하면 일어나서 이완 활동을 한다. 침대에서 일하거나 휴대폰 사용을 피한다.#VibeCoding
2. **아침 햇빛 노출**: 기상 후 30분 이내에 자연광을 15-30분간 쬔다. 빛은 일주기 리듬의 가장 강력한 조절 인자다.
3. **취침 전 바디스캔**: 자기 전 10분간 바디스캔 명상을 실천한다. 발가락에서 정수리까지 주의를 이동시킨다.
4. **수면 효율 기록**: 2주간 수면 일지를 기록하고 효율을 계산한다. 85% 미만이면 취침 시간을 15-30분 늦춘다.#EmotionalFitness`,
    th: `แนวปฏิบัติรายวันตามหลักฐานสำหรับ{{T}} ผสาน CBT-I และสติ:

1. **การควบคุมสิ่งเร้า**: เข้านอนเมื่อง่วงเท่านั้น ถ้านอนไม่หลับใน 20 นาที ให้ลุกขึ้นทำกิจกรรมผ่อนคลาย หลีกเลี่ยงการทำงานหรือใช้โทรศัพท์บนเตียง #VibeCoding
2. **การรับแสงเช้า**: ภายใน 30 นาทีหลังตื่น ให้รับแสงธรรมชาติ 15-30 นาที แสงเป็นตัวปรับจังหวะชีวภาพที่ทรงพลังที่สุด
3. **การสแกนร่างกายก่อนนอน**: ฝึกสมาธิสแกนร่างกาย 10 นาทีก่อนนอน เริ่มจากปลายเท้า ค่อยๆ เลื่อนความสนใจขึ้นสู่ส่วนบนของศีรษะ
4. **บันทึกประสิทธิภาพการนอน**: บันทึกการนอน 2 สัปดาห์ คำนวณประสิทธิภาพ เมื่อต่ำกว่า 85% ให้เลื่อนเวลาเข้านอนช้าลง 15-30 นาที #EmotionalFitness`,
  },
  anxiety: {
    zh: `针对{{T}}的循证日常训练，整合CBT和正念技巧：

1. **腹式呼吸法（4-7-8呼吸）**：吸气4秒→屏息7秒→呼气8秒。每次重复4-5轮。这种延长呼气时相的模式能够激活副交感神经系统（"休息和消化"反应），降低心率，缓解急性焦虑。建议在感到焦虑加剧时立刻使用。

2. **认知重构工作表**：对照以下四列记录焦虑想法。第一列：触发情境；第二列：自动化思维（如"我肯定会搞砸"）；第三列：认知扭曲类型（全或无思维/灾难化/读心术/情绪推理）；第四列：平衡重评（如"我曾经成功过类似任务"）。每周回顾，识别重复出现的认知模式。

3. **渐进式暴露层级**：列出让你焦虑的场景（从最低到最高焦虑度），构建一个10级的暴露阶梯。从第1级（低焦虑）开始，每次停留直到焦虑感减半（通常需要20-30分钟），然后进入下一级。每次暴露后记录实际结果与预期结果的对比。

4. **睡前正念冥想**：每天睡前10分钟进行"大山冥想"——想象自己像山一样稳固，情绪如同天气般来来去去。焦虑想法只是经过的云彩，而你是稳固的山体。

5. **身体锚定练习**：当焦虑浪潮袭来，将注意力转向双脚与地面接触的感觉。感受地面对脚掌的支撑，注意温度、质感。这被称为"接地技术"（grounding），可以将注意力从灾难化的思维循环中拉回到当下。`,
    en: `Evidence-based daily practices for {{T}}, integrating CBT and mindfulness techniques:

1. **4-7-8 Breathing**: Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds. Repeat 4-5 cycles. This extended-exhalation pattern activates the parasympathetic nervous system (rest-and-digest response), lowering heart rate and relieving acute anxiety. Use immediately when anxiety intensifies.

2. **Cognitive Restructuring Worksheet**: Create a four-column log. Column 1: Triggering situation. Column 2: Automatic thought (e.g., "I'll definitely mess this up"). Column 3: Cognitive distortion type (all-or-nothing thinking / catastrophizing / mind-reading / emotional reasoning). Column 4: Balanced reappraisal (e.g., "I've succeeded at similar tasks before"). Review weekly to identify recurring patterns.

3. **Graded Exposure Hierarchy**: List anxiety-provoking scenarios ranked from lowest to highest, constructing a 10-level exposure ladder. Begin at Level 1 (lowest anxiety), remain until anxiety reduces by half (typically 20-30 minutes), then progress. After each exposure, compare actual vs. predicted outcomes.

4. **Mountain Meditation**: Practice 10 minutes before sleep. Visualize yourself as a mountain—stable, grounded. Emotions pass like weather across the mountain. Anxious thoughts are merely passing clouds; you are the solid mountain beneath.

5. **Grounding Practice**: When anxiety surges, redirect attention to the physical sensation of your feet contacting the ground. Notice temperature, texture, pressure. This grounding technique pulls attention away from catastrophic thought loops and anchors you in the present moment.`,
    ms: `Amalan harian berasaskan bukti untuk {{T}}, menggabungkan teknik CBT dan kesedaran:

1. **Pernafasan 4-7-8**: Tarik nafas 4 saat, tahan 7 saat, hembus 8 saat. Ulang 4-5 kitaran. Corak hembusan panjang ini mengaktifkan sistem saraf parasimpatetik.

2. **Lembaran Kerja Restrukturisasi Kognitif**: Cipta log empat lajur. Lajur 1: Situasi pencetus. Lajur 2: Pemikiran automatik. Lajur 3: Jenis herotan kognitif. Lajur 4: Penilaian semula seimbang.

3. **Hierarki Pendedahan Berperingkat**: Senaraikan senario yang mencetuskan kebimbangan dari rendah ke tinggi. Mulakan di tahap 1, kekal sehingga kebimbangan berkurang separuh.

4. **Meditasi Gunung**: Bayangkan diri sebagai gunung yang stabil. Emosi berlalu seperti cuaca. Fikiran cemas hanyalah awan yang berlalu.

5. **Amalan Grounding**: Alihkan perhatian ke sensasi fizikal kaki menyentuh tanah. Perhatikan suhu, tekstur, tekanan.`,
    es: `Prácticas diarias basadas en evidencia para {{T}}, integrando técnicas de TCC y mindfulness:

1. **Respiración 4-7-8**: Inhale durante 4 segundos, sostenga 7 segundos, exhale durante 8 segundos. Repita 4-5 ciclos. Este patrón de exhalación prolongada activa el sistema nervioso parasimpático.

2. **Hoja de Reestructuración Cognitiva**: Cree un registro de cuatro columnas. Columna 1: Situación desencadenante. Columna 2: Pensamiento automático. Columna 3: Tipo de distorsión cognitiva. Columna 4: Reevaluación equilibrada.

3. **Jerarquía de Exposición Gradual**: Enumere escenarios que provocan ansiedad de menor a mayor. Comience en el nivel 1, permanezca hasta que la ansiedad se reduzca a la mitad.

4. **Meditación de la Montaña**: Visualícese como una montaña estable. Las emociones pasan como el clima. Los pensamientos ansiosos son solo nubes pasajeras.

5. **Práctica de Anclaje**: Redirija la atención a la sensación física de sus pies en contacto con el suelo. Note la temperatura, la textura, la presión.`,
    ja: `エビデンスに基づく{{T}}のための日々の練習（CBTとマインドフルネス技法を統合）：

1. **4-7-8呼吸法**: 4秒吸入、7秒停止、8秒吐息。4-5サイクル繰り返す。長い呼気パターンが副交感神経系を活性化。#VibeCoding
2. **認知再構成ワークシート**: 4列の記録を作成。トリガー状況、自動思考、認知の歪みの種類、バランスの取れた再評価。
3. **段階的曝露階層**: 低から高へ不安誘発シナリオをリスト化。レベル1から開始、不安が半減するまで続ける。
4. **山の瞑想**: 自分を安定した山として視覚化。感情は通過する天気。不安な思考はただの通過する雲。
5. **グラウンディング練習**: 足が地面に触れる感覚に注意を向ける。温度、質感、圧力に気づく。#EmotionalFitness`,
    ko: `{{T}}를 위한 증거 기반 일상练习(CBT와 마음챙김 기법 통합):

1. **4-7-8 호흡법**: 4초 들이마시기, 7초 멈추기, 8초 내쉬기. 4-5회 반복. 긴 호기는 부교감 신경계를 활성화한다.#VibeCoding
2. **인지 재구성 워크시트**: 4열 기록 작성. 촉발 상황, 자동적 사고, 인지 왜곡 유형, 균형 잡힌 재평가.
3. **단계적 노출 계층**: 낮은 불안부터 높은 불안 순으로 시나리오 나열. 1단계부터 시작, 불안이 반으로 줄 때까지 유지.
4. **산 명상**: 자신을 안정된 산으로 시각화. 감정은 지나가는 날씨. 불안한 생각은 그냥 지나가는 구름.
5. **그라운딩 연습**: 발이 땅에 닿는 신체 감각에 주의 환기. 온도, 질감, 압력 알아차리기.#EmotionalFitness`,
    th: `แนวปฏิบัติรายวันตามหลักฐานสำหรับ{{T}} ผสานเทคนิค CBT และสติ:

1. **การหายใจ 4-7-8**: หายใจเข้า 4 วินาที กลั้น 7 วินาที หายใจออก 8 วินาที ทำซ้ำ 4-5 รอบ รูปแบบการหายใจออกยาวนี้กระตุ้นระบบประสาทพาราซิมพาเทติก #VibeCoding
2. **แบบฝึกหัดปรับโครงสร้างความคิด**: สร้างบันทึก 4 คอลัมน์ สถานการณ์กระตุ้น ความคิดอัตโนมัติ ประเภทการบิดเบือนทางความคิด การประเมินใหม่ที่สมดุล
3. **ลำดับชั้นการเผชิญหน้าแบบค่อยเป็นค่อยไป**: 列出สถานการณ์ที่กระตุ้นความวิตกกังวลจากน้อย到มาก เริ่มที่ระดับ 1 อยู่จนความวิตกลดลงครึ่งหนึ่ง
4. **การทำสมาธิภูเขา**: มองตนเองเป็นภูเขาที่มั่นคง อารมณ์ผ่านไปเหมือนสภาพอากาศ ความคิดวิตกเป็นเพียงเมฆที่ผ่านไป
5. **การฝึก grounding**: เปลี่ยนความสนใจไปที่ความรู้สึกทางกายของเท้าที่สัมผัสพื้น สังเกตอุณหภูมิ พื้นผิว แรงกด #EmotionalFitness`,
  },
  grief_loss: {
    zh: `针对{{T}}的日常练习，基于双程模型和自我慈悲：

1. **"双程计时"练习**：每天设定两个时间段。第一个10分钟完全沉浸于哀伤（看照片、写信、回忆），给自己允许充分感受。第二个10分钟专注恢复导向活动（散步、烘焙、整理抽屉）。这种有意识的摆动能防止哀伤过度占据或完全被回避。

2. **持续性联结日记**：记录逝者在你日常生活中的"出现方式"——也许是一首歌、一个味道、某句话带来的回忆。研究证明，保持与逝者的象征性联结（而非"放下"）是健康哀伤的重要部分。每周写一封信给逝者，表达想说的话。

3. **身体哀伤觉察**：哀伤常常以身体感受的形式存在——胸口的压迫感、喉咙的哽咽、胃部的下沉感。每天花5分钟，以正念的态度扫描身体中哀伤停留的位置，不做改变，只是温和地承认它的存在。

4. **自我慈悲休息站**：每天在感到哀伤最重的时候，将一只手放在心口，对自己说："这是很难的时刻。我允许自己感到难过。我并不孤单。" 自我慈悲已被证明能显著降低复杂哀伤的风险。

5. **社交纽带评估**：每周评估你的支持网络。谁让你感到被理解？谁的陪伴让你需要"装作没事"？在能量充沛时，主动接触那些让你感到安全的人；在能量低时，允许自己设定界限。`,
    en: `Daily practices for {{T}}, based on the Dual Process Model and self-compassion:

1. **Oscillation Timing Practice**: Set aside two intentional periods daily. The first 10 minutes fully immerse in grief—look at photos, write a letter, recall memories—giving yourself permission to feel completely. The second 10 minutes focus on restoration-oriented activity—a walk, cooking, organizing a drawer. This conscious oscillation prevents grief from either overwhelming or being entirely avoided.

2. **Continuing Bonds Journal**: Record how the deceased continues to appear in your daily life—a song, a scent, a phrase that evokes memory. Research demonstrates that maintaining symbolic connection with the deceased (rather than "letting go") is a healthy component of grieving. Write a weekly letter expressing what you wish to share.

3. **Somatic Grief Awareness**: Grief often manifests as physical sensations—chest tightness, throat lump, stomach heaviness. Spend 5 minutes daily scanning your body with mindful attention, locating where grief resides physically. No need to change anything—simply acknowledge its presence with gentle curiosity.

4. **Self-Compassion Pause**: At the moment grief feels heaviest, place one hand over your heart and say: "This is a moment of suffering. I allow myself to feel this. I am not alone." Self-compassion has been shown to significantly reduce risk of complicated grief.

5. **Social Connection Audit**: Weekly, assess your support network. Who makes you feel understood? Whose company requires you to "put on a brave face"? When energy allows, initiate contact with those who offer safety. When depleted, permit yourself to set boundaries without guilt.`,
    ms: `Amalan harian untuk {{T}}, berdasarkan Model Proses Dwi dan belas kasihan diri:

1. **Amalan Masa Ayunan**: Ketepikan dua tempoh setiap hari. 10 minit pertama untuk melibatkan diri dalam kesedihan. 10 minit kedua untuk aktiviti berorientasikan pemulihan.

2. **Jurnal Ikatan Berterusan**: Catat bagaimana si mati terus muncul dalam kehidupan harian anda—lagu, bau, frasa. Penyelidikan menunjukkan mengekalkan hubungan simbolik adalah sihat.

3. **Kesedaran Somatik Kesedihan**: Luangkan 5 minit mengimbas badan dengan perhatian penuh kesedaran, mencari di mana kesedihan berada secara fizikal.

4. **Jeda Belas Kasihan Diri**: Letakkan tangan di dada dan akui penderitaan dengan kebaikan.

5. **Audit Sokongan Sosial**: Nilai siapa yang membuat anda berasa difahami. Hubungi mereka yang menawarkan keselamatan apabila tenaga mengizinkan.`,
    es: `Prácticas diarias para {{T}}, basadas en el Modelo de Proceso Dual y la autocompasión:

1. **Práctica de Oscilación Temporal**: Reserve dos períodos diarios. Los primeros 10 minutos para sumergirse en el duelo. Los segundos 10 minutos para actividades orientadas a la restauración.

2. **Diario de Vínculos Continuos**: Registre cómo el fallecido sigue apareciendo en su vida diaria. La investigación demuestra que mantener una conexión simbólica es saludable.

3. **Conciencia Somática del Duelo**: Dedique 5 minutos diarios a escanear su cuerpo con atención plena, localizando dónde reside físicamente el duelo.

4. **Pausa de Autocompasión**: Coloque una mano sobre su corazón y reconozca el sufrimiento con amabilidad.

5. **Evaluación de la Red de Apoyo**: Evalúe quién le hace sentir comprendido. Contacte a quienes ofrecen seguridad cuando la energía lo permita.`,
    ja: `{{T}}のための日々の練習（二重プロセスモデルと自己慈愛に基づく）：

1. **揺れ動く時間練習**: 毎日2つの時間を確保。最初の10分は悲しみに没頭。次の10分は回復志向の活動。#VibeCoding
2. **継続的絆日記**: 故人が日常生活にどのように現れるかを記録。象徴的なつながりを維持することが健康的だと研究が示す。
3. **悲しみの身体的气づき**: 毎日5分間、悲しみが物理的にどこにあるかをマインドフルに身体をスキャン。
4. **自己慈愛の一時停止**: 手を胸に置き、優しさで苦しみを認識する。
5. **社会的サポート評価**: 誰があなたを理解しているかを評価。エネルギーが許すときに安全を提供する人に連絡。#EmotionalFitness`,
    ko: `{{T}}를 위한 일상练习(이중 과정 모델과 자기 연민 기반):

1. **흔들림 시간 연습**: 매일 두 시간 확보. 처음 10분은 슬픔에 몰입. 다음 10분은 회복 중심 활동.#VibeCoding
2. **지속적 유대 일기**: 고인이 일상에 어떻게 나타나는지 기록. 상징적 연결 유지가 건강하다는 연구 결과.
3. **슬픔의 신체적 알아차림**: 매일 5분간 슬픔이 신체 어디에 있는지 마음챙김 스캔.
4. **자기 연민의 멈춤**: 가슴에 손을 얹고 친절로 고통 인정.
5. **사회적 지지망 평가**: 누가 당신을 이해하게 하는지 평가. 에너지가 허락할 때 안전을 제공하는 사람에게 연락.#EmotionalFitness`,
    th: `แนวปฏิบัติรายวันสำหรับ{{T}} ตามแบบจำลองกระบวนการคู่และความเมตตาต่อตนเอง:

1. **การฝึกเวลาสลับ**: จัดสรรเวลา 2 ช่วงต่อวัน 10 นาทีแรกจมอยู่กับความเศร้า 10 นาทีหลังทำกิจกรรมฟื้นฟู #VibeCoding
2. **บันทึกความผูกพันต่อเนื่อง**: บันทึกว่าผู้จากไปปรากฏในชีวิตประจำวันอย่างไร งานวิจัยแสดงว่าการรักษาความเชื่อมโยงเชิงสัญลักษณ์นั้นดีต่อสุขภาพ
3. **การรับรู้ความเศร้าทางร่างกาย**: ใช้เวลา 5 นาทีสแกนร่างกายด้วยสติ หาความเศร้าอยู่ที่ไหนทางกายภาพ
4. **การหยุดด้วยความเมตตาตนเอง**: วางมือบนหน้าอกและรับรู้ความทุกข์ด้วยความกรุณา
5. **การประเมินเครือข่ายสนับสนุน**: ประเมินว่าใครทำให้คุณรู้สึกเข้าใจ ติดต่อผู้ที่ให้ความปลอดภัยเมื่อพลังงานเอื้ออำนวย #EmotionalFitness`,
  },
  loneliness: {
    zh: `针对{{T}}的日常练习，整合社交重建和自我慈悲策略：

1. **每日微联结挑战**：设定每天至少完成一次"微社交"——对咖啡师微笑、给朋友发一条语音消息、在社区群里回复一条评论。这些微小但主动的联结能逐步重建"社交安全感"，降低对社交互动的预期焦虑。

2. **独处质量提升练习**：每周安排2次"高品质独处时间"——不带手机，做一件全心投入的活动（绘画、演奏乐器、园艺）。目标是体验独处的丰富可能性，而非逃避孤独。记录独处后的感受变化。

3. **社交信念探究工作表**：记录触发孤独感的情境，识别背后的核心信念（如"没人真正理解我"、"我不值得被关心"）。用认知行为的方法检验这些信念：有什么证据支持？有什么证据反对？如果最好的朋友也有这个信念，你会怎么回应？

4. **渐进式社交暴露**：构建一个社交暴露阶梯——从低焦虑的日常互动到更深层的自我暴露。每周挑战高一层的社交场景。每次完成后记录"实际结果vs预期结果"，你会发现大多数灾难化预测都没有发生。

5. **社区探索任务**：每周探索一个潜在的社交连接点——参加一次本地读书会、尝试一次团体健身课、加入一个兴趣社群。不要求深度参与，只需"出现"。多次有规律的"轻量暴露"远比一次高压社交更有助于重建社交信心。`,
    en: `Daily practices for {{T}}, integrating social reconnection and self-compassion strategies:

1. **Micro-Connection Challenge**: Complete at least one intentional micro-social interaction daily—smile at a barista, send a voice message to a friend, reply to a community post. These small yet deliberate connections gradually rebuild "social safety" and reduce anticipatory anxiety around interaction.

2. **Quality Solitude Practice**: Schedule 2 sessions of high-quality solitude weekly—no phone, fully absorbed in a meaningful activity (painting, playing an instrument, gardening). The goal is experiencing solitude's rich possibilities rather than escaping loneliness. Journal how you feel afterward.

3. **Social Belief Exploration Worksheet**: Record situations triggering loneliness and identify core beliefs beneath (e.g., "No one truly understands me," "I'm not worth caring about"). Examine supporting and contradicting evidence. If a close friend held this belief, how would you respond? This cognitive distancing reduces the grip of negative schemas.

4. **Graded Social Exposure**: Build a social exposure ladder from low-anxiety daily interactions to deeper self-disclosure. Challenge one higher level weekly. After each, record actual vs. predicted outcomes—you'll find most catastrophic predictions fail to materialize.

5. **Community Exploration Task**: Explore one potential social connection point weekly—a local book club, group fitness class, or interest-based community. No requirement to deeply engage; simply "show up." Regular low-pressure exposure is far more effective than high-pressure social events for rebuilding social confidence.`,
    ms: `Amalan harian untuk {{T}}, menggabungkan strategi penyambungan semula sosial dan belas kasihan diri:

1. **Cabaran Mikro-Hubungan**: Lengkapkan satu interaksi mikro-sosial secara sengaja setiap hari—senyum pada barista, hantar mesej suara kepada rakan.

2. **Amalan Kesendirian Berkualiti**: Jadualkan 2 sesi mingguan tanpa telefon, tenggelam dalam aktiviti bermakna. Catat perasaan selepasnya.

3. **Lembaran Penerokaan Kepercayaan Sosial**: Kenal pasti kepercayaan teras di sebalik kesunyian. Periksa bukti yang menyokong dan bercanggah.

4. **Pendedahan Sosial Berperingkat**: Bina tangga pendedahan sosial. Rekod hasil sebenar vs. yang diramalkan selepas setiap langkah.

5. **Tugas Penerokaan Komuniti**: Terokai satu titik sambungan sosial yang berpotensi setiap minggu. Kehadiran tetap dan tekanan rendah adalah lebih berkesan.`,
    es: `Prácticas diarias para {{T}}, integrando estrategias de reconexión social y autocompasión:

1. **Desafío de Microconexión**: Complete al menos una interacción microsocial intencional diariamente: sonría a un barista, envíe un mensaje de voz a un amigo.

2. **Práctica de Soledad de Calidad**: Programe 2 sesiones semanales sin teléfono, sumergido en una actividad significativa. Registre cómo se siente después.

3. **Hoja de Exploración de Creencias Sociales**: Identifique las creencias centrales detrás de la soledad. Examine la evidencia a favor y en contra.

4. **Exposición Social Gradual**: Construya una escalera de exposición social. Registre los resultados reales frente a los previstos después de cada paso.

5. **Tarea de Exploración Comunitaria**: Explore un punto de conexión social potencial cada semana. La exposición regular de baja presión es más efectiva.`,
    ja: `{{T}}のための日々の練習（社会的再接続と自己慈愛戦略を統合）：

1. **マイクロ接続チャレンジ**: 毎日意図的なマイクロ社会的相互交流を1回以上完了—バリスタに微笑む、友人に音声メッセージを送る。#VibeCoding
2. **質の高い孤独の練習**: 週2回の電話なしの有意義な活動。その後の気分を記録。
3. **社会的信念探求ワークシート**: 孤独の背後にある中核的信念を特定。支持する証拠と矛盾する証拠を検討。
4. **段階的社会的曝露**: 社会的曝露梯子を構築。各ステップ後に実際の結果と予測結果を記録。
5. **コミュニティ探求タスク**: 毎週1つの潜在的な社会的接続ポイントを探索。定期的で低圧力の曝露が最も効果的。#EmotionalFitness`,
    ko: `{{T}}를 위한 일상练习(사회적 재연결과 자기 연민 전략 통합):

1. **미세 연결 도전**: 매일 의도적인 미시 사회적 상호작용 1회 완료—바리스타에게 미소, 친구에게 음성 메시지.#VibeCoding
2. **질 높은 고독 연습**: 주 2회 전화 없는 의미 있는 활동. 이후 기분 기록.
3. **사회적 신념 탐색 워크시트**: 외로움 뒤의 핵심 신념 파악. 지지 증거와 반증 검토.
4. **단계적 사회적 노출**: 사회적 노출 사다리 구축. 각 단계 후 실제 결과와 예측 결과 기록.
5. **커뮤니티 탐색 과제**: 매주 잠재적 사회적 연결 지점 1곳 탐색. 정기적 저압력 노출이 가장 효과적.#EmotionalFitness`,
    th: `แนวปฏิบัติรายวันสำหรับ{{T}} ผสานกลยุทธ์การเชื่อมต่อทางสังคมและความเมตตาต่อตนเอง:

1. **ความท้าทายการเชื่อมต่อระดับจุลภาค**: ทำปฏิสัมพันธ์ทางสังคมระดับจุลภาคอย่างตั้งใจวันละ 1 ครั้ง—ยิ้มให้บาริสตา ส่งข้อความเสียงถึงเพื่อน #VibeCoding
2. **การฝึกอยู่อย่างโดดเดี่ยวที่มีคุณภาพ**: จัดสรร 2 ครั้งต่อสัปดาห์ ไม่มีโทรศัพท์ จมอยู่ในกิจกรรมที่มีความหมาย บันทึกความรู้สึกหลังทำ
3. **แบบสำรวจความเชื่อทางสังคม**: ระบุความเชื่อหลักที่อยู่เบื้องหลังความเหงา ตรวจสอบหลักฐานที่สนับสนุนและขัดแย้ง
4. **การเผชิญหน้าทางสังคมแบบค่อยเป็นค่อยไป**: สร้างบันไดการเผชิญหน้าทางสังคม บันทึกผลลัพธ์จริงเทียบกับที่คาดการณ์ไว้
5. **ภารกิจสำรวจชุมชน**: สำรวจจุดเชื่อมต่อทางสังคมที่มีศักยภาพ 1 แห่งต่อสัปดาห์ การเปิดรับแสงอย่างสม่ำเสมอและแรงดันต่ำมีประสิทธิภาพมากที่สุด #EmotionalFitness`,
  },
  self_worth: {
    zh: `针对{{T}}的日常练习，整合认知重构和自我慈悲策略：

1. **自我价值日记**：每天记录3件你做得好的事情（不论大小），以及它们体现了你什么样的内在品质。完成后对自己说："这些品质是我的一部分，不需要外在认可来证明。"

2. **内在批判觉察练习**：当听到内心"你不够好"的声音时，停下来识别它——这是你的内在批判者，不是真相。给它起个名字（如"小法官"），区分批判者的声音和你真实的声音。

3. **社交比较脱钩**：注意到自己在与他人比较时，做一次简短的正念呼吸，然后问：这个比较有帮助吗？没有比较我会如何行动？刻意练习将注意力从"别人拥有什么"转向"我需要什么"。

4. **能力证据清单**：列出你在不同领域（工作、人际关系、爱好、解决问题）已经展现的能力和成就。这不仅是一份"幸福清单"，更是一份客观的自我证据目录——当自我怀疑涌来时，用它提醒自己。

5. **自我慈悲休息站**：每天至少一次，在感到自我怀疑时，将手放在心口，对自己说："现在很艰难。我允许自己感到不够好。但我的价值不是由这一刻的表现决定的。"`,
    en: `Daily practices for {{T}}, integrating cognitive restructuring and self-compassion strategies:

1. **Self-Worth Journal**: Each day, record 3 things you did well (regardless of scale) and what inner qualities they reflect. After writing, say to yourself: "These qualities are part of who I am. They do not require external validation."

2. **Inner Critic Awareness**: When you hear the voice saying "you're not good enough," pause and recognize it—this is your inner critic, not the truth. Give it a name (e.g., "The Judge"), and practice distinguishing the critic's voice from your authentic voice.

3. **Social Comparison Detachment**: When you notice yourself comparing with others, take a brief mindful breath and ask: "Is this comparison helpful? How would I act without it?" Practice deliberately shifting attention from "what others have" to "what I need."

4. **Competency Evidence List**: Create a running list of skills and achievements across different domains—work, relationships, hobbies, problem-solving. This is not a "gratitude list" but an objective evidence catalog of your capabilities. When self-doubt arises, review it as factual counter-evidence.

5. **Self-Compassion Pause**: At least once daily, when self-doubt hits hardest, place your hand over your heart and say: "This is hard. I allow myself to feel not good enough. But my worth is not determined by this moment's performance."`,
    ms: `Amalan harian untuk {{T}}, menggabungkan strategi restrukturisasi kognitif dan belas kasihan diri:

1. **Jurnal Harga Diri**: Catat 3 perkara yang anda lakukan dengan baik setiap hari dan kualiti dalaman yang dicerminkan.
2. **Kesedaran Kritikan Dalaman**: Apabila mendengar suara "anda tidak cukup baik", kenal pasti ia sebagai pengkritik dalaman.
3. **Pemisahan Perbandingan Sosial**: Apabila membandingkan diri dengan orang lain, tanya: adakah perbandingan ini membantu?
4. **Senarai Bukti Keupayaan**: Senaraikan kemahiran dan pencapaian merentas domain berbeza. Rujuk semula apabila keraguan diri timbul.
5. **Jeda Belas Kasihan Diri**: Letakkan tangan di dada dan akui nilai diri tidak ditentukan oleh prestasi semasa.`,
    es: `Prácticas diarias para {{T}}, integrando estrategias de reestructuración cognitiva y autocompasión:

1. **Diario de Autoestima**: Registre 3 cosas que hizo bien cada día y las cualidades internas que reflejan.
2. **Conciencia del Crítico Interno**: Cuando oiga la voz "no eres lo suficientemente bueno", reconózcala como su crítico interno.
3. **Desprendimiento de Comparación Social**: Al compararse con otros, pregúntese: ¿es útil esta comparación?
4. **Lista de Evidencia de Competencia**: Enumere habilidades y logros en diferentes áreas. Consúltela cuando surjan dudas.
5. **Pausa de Autocompasión**: Coloque una mano sobre su corazón y reconozca que su valor no está determinado por el rendimiento actual.`,
    ja: `{{T}}のための日々の練習（認知再構成と自己慈愛戦略を統合）：

1. **自己価値日記**: 毎日うまくやったことを3つ記録。それらが反映する内面的な資質に気づく。#VibeCoding
2. **内なる批判者への気づき**: 「自分は十分じゃない」という声を内なる批判者として認識。真実ではない。
3. **社会的比較からの解放**: 比較している自分に気づいたら「この比較は役に立つ？」と自問。
4. **能力の証拠リスト**: 様々な領域でのスキルと達成をリスト化。自己疑念が湧いたら見返す。
5. **自己慈愛の一時停止**: 手を胸に置き「自分の価値は今のパフォーマンスで決まらない」と認識。#EmotionalFitness`,
    ko: `{{T}}를 위한 일상练习(인지 재구성과 자기 연민 전략 통합):

1. **자기가치 일기**: 매일 잘한 일 3개 기록. 그것이 반영하는 내적 자질 인식.#VibeCoding
2. **내면 비판자 인식**: "넌 충분하지 않아"라는 소리를 내면 비판자로 인식. 진실이 아니다.
3. **사회적 비교 탈피**: 비교하는 자신 발견 시 "이 비교가 도움이 될까?" 자문.
4. **능력 증거 목록**: 다양한 영역의 기술과 성과 목록화. 자기 의심 시 참조.
5. **자기 연민의 멈춤**: 가슴에 손 얹고 "내 가치는 지금 성과로 결정되지 않는다" 인식.#EmotionalFitness`,
    th: `แนวปฏิบัติรายวันสำหรับ{{T}} ผสานกลยุทธ์การปรับโครงสร้างความคิดและความเมตตาต่อตนเอง:

1. **บันทึกคุณค่าในตนเอง**: บันทึก 3 สิ่งที่คุณทำได้ดีในแต่ละวันและคุณภาพภายในที่สะท้อน #VibeCoding
2. **การตระหนักรู้ถึงนักวิจารณ์ภายใน**: เมื่อได้ยินเสียง "คุณไม่ดีพอ" ให้รู้ว่านั่นคือนักวิจารณ์ภายใน ไม่ใช่ความจริง
3. **การปล่อยวางการเปรียบเทียบทางสังคม**: เมื่อสังเกตว่ากำลังเปรียบเทียบ ให้ถาม: การเปรียบเทียบนี้มีประโยชน์หรือไม่?
4. **รายการหลักฐานความสามารถ**: 列出ทักษะและความสำเร็จในด้านต่างๆ กลับมาดูเมื่อความสงสัยในตนเองเกิดขึ้น
5. **การหยุดด้วยความเมตตาตนเอง**: วางมือบนหน้าอกและรับรู้ว่าคุณค่าไม่ได้ถูกกำหนดโดยผลงานในขณะนี้ #EmotionalFitness`,
  },
  relationships: {
    zh: `针对{{T}}的日常练习，整合依恋理论和人际沟通技巧：

1. **主动联结仪式**：每天主动进行一次"联结性沟通"——不是事务性消息（"帮我拿快递"），而是分享感受或好奇心（"今天遇到一件有趣的事……"）。主动联结而非等待被联结，能显著提升关系安全感。

2. **冲突后修复练习**：冲突后24小时内，主动进行"修复尝试"（repair attempt）。格式：承认自己在冲突中的角色 + 表达对关系的重视 + 邀请重新联结。"我刚才说话太急了，对不起。我们的关系对我很重要，能重新聊聊吗？"

3. **感恩表达日记**：每天记录一个关于对方（伴侣、朋友、家人）的感恩点，并在一周内选择2-3次真正表达给对方。研究表明，被感知到的感恩是关系满意度的最强预测因子之一。

4. **情感调谐练习**：每天花5分钟进行"纯粹倾听"——在对方说话时，不打断、不准备回应、不解决问题，只是理解和共情。然后用自己的话复述对方的情感核心："听起来你感到……是因为……"

5. **界限设定演练**：每周至少练习一次温和而坚定的界限设定。"我需要……"或"我现在不能……，但是……可以。"从小事开始练习，逐步建立对"设定界限不会毁掉关系"的安全感。`,
    en: `Daily practices for {{T}}, integrating attachment theory and interpersonal communication skills:

1. **Active Connection Ritual**: Initiate one "connection communication" daily—not transactional messages ("pick up milk"), but sharing feelings or curiosity ("I came across something interesting today…"). Proactive connection, rather than waiting to be connected, significantly enhances relationship security.

2. **Post-Conflict Repair Practice**: Within 24 hours of conflict, initiate a deliberate repair attempt. Format: acknowledge your role in the conflict + express value for the relationship + invite reconnection. "I was too harsh earlier. I'm sorry. Our relationship matters to me—can we talk about it?"

3. **Gratitude Expression Journal**: Record one thing you appreciate about the other person daily, and choose 2-3 times per week to genuinely express it to them. Research shows perceived gratitude is one of the strongest predictors of relationship satisfaction.

4. **Emotional Attunement Practice**: Spend 5 minutes daily in "pure listening"—when the other person speaks, do not interrupt, prepare responses, or problem-solve. Simply understand and empathize. Then paraphrase their emotional core: "It sounds like you felt ____ because ____."

5. **Boundary Setting Rehearsal**: Practice gentle yet firm boundary-setting at least once weekly. "I need ____" or "I can't ____ right now, but I can ____." Start with small boundaries to build the safety belief that "setting boundaries does not destroy relationships."`,
    ms: `Amalan harian untuk {{T}}, menggabungkan teori lampiran dan kemahiran komunikasi interpersonal:

1. **Ritual Sambungan Aktif**: Mulakan satu "komunikasi sambungan" setiap hari—kongsi perasaan atau rasa ingin tahu.
2. **Amalan Pembaikan Selepas Konflik**: Dalam 24 jam, lakukan percubaan pembaikan: akui peranan anda + ungkapkan nilai hubungan + jemput sambungan semula.
3. **Jurnal Penghargaan**: Catat satu penghargaan tentang pasangan setiap hari. Luahkan 2-3 kali seminggu.
4. **Amalan Penyesuaian Emosi**: 5 minit "mendengar murni" setiap hari—jangan ganggu, hanya fahami dan empati.
5. **Latihan Penetapan Sempadan**: Amalkan penetapan sempadan yang lembut tetapi tegas sekali seminggu.`,
    es: `Prácticas diarias para {{T}}, integrando teoría del apego y habilidades de comunicación interpersonal:

1. **Ritual de Conexión Activa**: Inicie una "comunicación de conexión" diaria—comparta sentimientos o curiosidad.
2. **Práctica de Reparación Postconflicto**: Dentro de 24 horas, haga un intento de reparación: reconozca su rol + exprese valor por la relación + invite a reconectar.
3. **Diario de Agradecimiento**: Registre un aprecio diario sobre la otra persona. Expréselo 2-3 veces por semana.
4. **Práctica de Sintonización Emocional**: 5 minutos de "escucha pura" diaria—no interrumpa, solo comprenda y empatice.
5. **Ensayo de Establecimiento de Límites**: Practique límites suaves pero firmes al menos una vez por semana.`,
    ja: `{{T}}のための日々の練習（愛着理論と対人コミュニケーションスキルを統合）：

1. **積極的接続の儀式**: 毎日1回「接続のコミュニケーション」を開始。感情や好奇心を共有。#VibeCoding
2. **衝突後の修復練習**: 24時間以内に修復試行。自分の役割を認める＋関係の価値を表現＋再接続を招待。
3. **感謝表現日記**: 毎日相手への感謝を1つ記録。週2-3回実際に伝える。
4. **感情同調練習**: 毎日5分の「純粋な傾聴」—遮らず、理解し共感するだけ。
5. **境界設定リハーサル**: 週1回、穏やかで確固とした境界設定を練習。#EmotionalFitness`,
    ko: `{{T}}를 위한 일상练习(애착 이론과 대인 커뮤니케이션 기술 통합):

1. **적극적 연결 의식**: 매일 1회 "연결 커뮤니케이션" 시작. 감정이나 호기심 공유.#VibeCoding
2. **갈등 후 복구 연습**: 24시간 내 복구 시도. 자신의 역할 인정 + 관계 가치 표현 + 재연결 초대.
3. **감사 표현 일기**: 매일 상대방에 대한 감사 1개 기록. 주 2-3회 실제로 전달.
4. **감정 조율 연습**: 매일 5분 "순수한 경청"—방해하지 않고 이해하고 공감만.
5. **경계 설정 리허설**: 주 1회 부드럽지만 확고한 경계 설정 연습.#EmotionalFitness`,
    th: `แนวปฏิบัติรายวันสำหรับ{{T}} ผสานทฤษฎีความผูกพันและทักษะการสื่อสารระหว่างบุคคล:

1. **พิธีกรรมการเชื่อมต่อที่กระตือรือร้น**: เริ่มต้น "การสื่อสารเชื่อมต่อ" วันละ 1 ครั้ง—แบ่งปันความรู้สึกหรือความอยากรู้ #VibeCoding
2. **การฝึกซ่อมแซมหลังความขัดแย้ง**: ภายใน 24 ชั่วโมง พยายามซ่อมแซมด้วยการยอมรับบทบาทของคุณ + แสดงคุณค่าของความสัมพันธ์ + เชิญชวนเชื่อมต่อใหม่
3. **บันทึกความกตัญญู**: บันทึกสิ่งที่ชื่นชมเกี่ยวกับอีกฝ่ายทุกวัน แสดงออก 2-3 ครั้งต่อสัปดาห์
4. **การฝึกปรับอารมณ์ให้สอดคล้อง**: 5 นาทีของ "การฟังอย่างบริสุทธิ์" ทุกวัน—ไม่ขัดจังหวะ แค่เข้าใจและเห็นอกเห็นใจ
5. **การฝึกตั้งขอบเขต**: ฝึกตั้งขอบเขตที่นุ่มนวลแต่แน่วแน่อย่างน้อยสัปดาห์ละครั้ง #EmotionalFitness`,
  },
  identity: {
    zh: `针对{{T}}的日常练习，整合叙事认同和自我探索方法：

1. **人生时间线绘制**：在纸上画出你的人生时间线，标注5-8个关键转折点。在每个点旁写下"当时的我认为自己是谁"和"现在回看，这段经历给了我什么"。观察这些叙事如何随时间演变。

2. **身份饼图练习**：画一个圆，根据当下的感受，将"你"分割成不同的身份模块（如：职业身份、家庭身份、兴趣爱好、人际关系、价值观等）。每个模块的大小反映它在你当前生活中的权重。问自己：这个比例是我想要的吗？有被忽视的重要部分吗？

3. **价值观澄清卡片**：从一张包含20-30个常见价值观（诚实、创造力、安全感、归属感等）的列表中，选出对你最重要的5个。然后按优先级排序。每周重新审视，观察是否有变化。价值观是身份的底层导航系统。

4. **"可能的自我"写作**：想象3个版本的"可能的你"——你最希望成为的版本、你最担心成为的版本、以及在你现有路径上最可能成为的版本。各写一段描述。这种投射练习能揭示你未被承认的渴望和恐惧。

5. **身份探索日记**：每周给自己30分钟，回答3个问题：① 这周什么时候我感到"这才是真实的我"？② 什么情境让我感到迷失或矛盾？③ 我从中学到了关于自己的什么？持续记录，你会在碎片中发现连贯的叙事线。`,
    en: `Daily practices for {{T}}, integrating narrative identity and self-exploration approaches:

1. **Life Timeline Mapping**: Draw your life timeline and mark 5-8 key turning points. Beside each, write "who I thought I was then" and "what this experience gave me in retrospect." Observe how these narratives have evolved over time—identity is not fixed but continuously reconstructed through storytelling.

2. **Identity Pie Chart**: Draw a circle. Divide "you" into different identity segments based on current feelings: professional identity, family role, hobbies, relationships, values, etc. Each segment's size reflects its current weight in your life. Ask: Is this proportion what I want? Are there neglected parts?

3. **Values Clarification Cards**: From a list of 20-30 common values (honesty, creativity, security, belonging, etc.), select the 5 most important to you. Rank them by priority. Review weekly and observe changes. Values serve as the underlying navigation system for identity—when identity feels uncertain, values provide direction.

4. **"Possible Selves" Writing**: Imagine three versions of "possible you"—the version you most hope to become, the version you most fear becoming, and the most likely version on your current path. Write a paragraph for each. This projective exercise reveals unacknowledged aspirations and fears that shape identity development.

5. **Identity Exploration Journal**: Weekly, give yourself 30 minutes to answer three questions: ① When this week did I feel "this is the real me"? ② What situations made me feel lost or conflicted? ③ What did I learn about myself from these experiences? Consistent recording reveals coherent narrative threads amid apparent fragments.`,
    ms: `Amalan harian untuk {{T}}, menggabungkan pendekatan identiti naratif dan penerokaan diri:

1. **Pemetaan Garis Masa Kehidupan**: Lukis garis masa hidup. Tandakan 5-8 titik perubahan utama. Catat "siapa saya ketika itu" dan "apa yang diberikan pengalaman ini."
2. **Carta Pai Identiti**: Lukis bulatan dan bahagikan kepada segmen identiti berbeza. Saiz setiap segmen mencerminkan berat dalam kehidupan.
3. **Kad Penjelasan Nilai**: Pilih 5 nilai terpenting daripada senarai 20-30 nilai. Susun mengikut keutamaan. Semak setiap minggu.
4. **Penulisan "Diri Mungkin"**: Tulis tiga versi "diri yang mungkin"—yang paling anda harapkan, paling anda takuti, dan yang paling mungkin.
5. **Jurnal Penerokaan Identiti**: 30 minit mingguan menjawab: Bila saya rasa "ini diri sebenar saya"? Situasi apa yang membuat saya keliru? Apa yang saya pelajari?`,
    es: `Prácticas diarias para {{T}}, integrando enfoques de identidad narrativa y autoexploración:

1. **Mapeo de Línea de Vida**: Dibuje su línea de vida. Marque 5-8 puntos clave. Escriba "quién era yo entonces" y "qué me dio esta experiencia."
2. **Gráfico Circular de Identidad**: Dibuje un círculo, divídalo en segmentos de identidad. El tamaño refleja el peso en su vida actual.
3. **Tarjetas de Clarificación de Valores**: Seleccione 5 valores clave de una lista de 20-30. Ordene por prioridad. Revise semanalmente.
4. **Escritura de "Yoes Posibles"**: Escriba tres versiones del "yo posible"—el que espera, el que teme, y el más probable.
5. **Diario de Exploración de Identidad**: 30 minutos semanales respondiendo: ¿Cuándo sentí "este es el verdadero yo"? ¿Qué situaciones me confundieron? ¿Qué aprendí?`,
    ja: `{{T}}のための日々の練習（ナラティブ・アイデンティティと自己探求アプローチを統合）：

1. **ライフタイムラインマッピング**: 人生のタイムラインを描き、5-8の重要な転機をマーク。#VibeCoding
2. **アイデンティティ円グラフ**: 円を描き、自分の異なるアイデンティティセグメントに分割。
3. **価値観明確化カード**: 20-30の価値観リストから最も重要な5つを選択し優先順位付け。
4. **「可能性のある自己」ライティング**: 最も望むバージョン、最も恐れるバージョン、現路径で最もあり得るバージョンを記述。
5. **アイデンティティ探求日記**: 毎週30分、「本当の自分を感じた瞬間」「混乱した状況」「学んだこと」を記録。#EmotionalFitness`,
    ko: `{{T}}를 위한 일상练习(내러티브 정체성과 자기 탐구 접근법 통합):

1. **인생 타임라인 매핑**: 인생 타임라인 그리고 5-8개의 중요한 전환점 표시.#VibeCoding
2. **정체성 원형 차트**: 원 그리고 다양한 정체성 세그먼트로 분할. 각 세그먼트 크기는 현재 삶에서의 비중 반영.
3. **가치관 명확화 카드**: 20-30가지 가치관 목록에서 가장 중요한 5개 선택해 우선순위 지정.
4. **"가능한 자아" 글쓰기**: 가장 바라는 버전, 가장 두려워하는 버전, 현재 경로에서 가장 가능성 있는 버전 각각 작성.
5. **정체성 탐구 일기**: 매주 30분 "진짜 나를 느낀 순간", "혼란스러웠던 상황", "배운 점" 기록.#EmotionalFitness`,
    th: `แนวปฏิบัติรายวันสำหรับ{{T}} ผสานแนวทางอัตลักษณ์เชิงเรื่องเล่าและการสำรวจตนเอง:

1. **การวาดเส้นเวลาชีวิต**: วาดเส้นเวลาชีวิต ทำเครื่องหมาย 5-8 จุดเปลี่ยนสำคัญ บันทึก "ฉันเป็นใครตอนนั้น" และ "ประสบการณ์นี้ให้อะไร"
2. **แผนภูมิวงกลมอัตลักษณ์**: วาดวงกลม แบ่งเป็นส่วนอัตลักษณ์ต่างๆ ขนาดแต่ละส่วนสะท้อนน้ำหนักในชีวิตปัจจุบัน
3. **บัตรชี้แจงค่านิยม**: เลือก 5 ค่านิยมที่สำคัญที่สุดจาก 20-30 ค่า เรียงลำดับความสำคัญ ทบทวนทุกสัปดาห์
4. **การเขียน "ตัวตนที่เป็นไปได้"**: เขียนสามเวอร์ชันของ "ตัวตนที่เป็นไปได้"—ที่หวัง ที่กลัว และที่น่าจะเป็นบนเส้นทางปัจจุบัน
5. **บันทึกการสำรวจอัตลักษณ์**: 30 นาทีต่อสัปดาห์ ตอบ: ช่วงไหนที่รู้สึก "นี่คือตัวจริงของฉัน"? สถานการณ์ไหนที่ทำให้สับสน? เรียนรู้อะไร?`,
  },
  mindfulness: {
    zh: `针对{{T}}的日常练习，从基础到深度：

1. **正念呼吸（基础）**：每天5-10分钟，专注于呼吸的自然流动。当注意力漂移时，温和地将其带回呼吸。不需要控制呼吸的节奏，只是观察。重点是"注意到走神并回来"的每一次循环——这是正念的"肱二头肌弯举"。

2. **身体扫描（深度觉察）**：每天10分钟，从头顶到脚趾缓慢扫描身体。在每个部位停留3-5个呼吸，注意任何感觉（温度、压力、刺痛、麻木），不做评判。身体扫描培养的是对经验开放、好奇的态度，而非放松。

3. **正念行走（日常整合）**：每周3次，选择一段5-10分钟的步行，全程保持正念。注意脚底与地面的接触、腿部肌肉的收缩与放松、空气在皮肤上的触感、周围的声音。当思绪漂移到过去或未来时，温和地回到行走的身体感受。

4. **开放觉察（进阶）**：每天5分钟，"打开"觉察的广角镜——不专注于特定对象，而是觉察一切浮现的体验：声音、身体感觉、想法、情绪——如同天空容纳云朵。目标是培养容纳所有经验而不被其裹挟的能力。

5. **慈心冥想（关系向）**：每天5分钟，先向自己发送善意："愿我快乐，愿我平安，愿我离苦。"然后向亲近的人、中立的人、甚至困难的人逐级扩展。研究表明8周慈心冥想可显著提升积极情绪体验和社交联结感。`,
    en: `Daily practices for {{T}}, from foundational to advanced:

1. **Mindful Breathing (Foundation)**: 5-10 minutes daily. Focus on the natural flow of your breath. When attention wanders—and it will—gently guide it back to the breath. No need to control breathing rhythm, simply observe. Each "noticing wandering and returning" cycle is the bicep curl of mindfulness.

2. **Body Scan (Deep Awareness)**: 10 minutes daily. Slowly scan from crown of head to toes. Spend 3-5 breaths at each region, noting sensations (temperature, pressure, tingling, numbness) without judgment. Body scan cultivates an open, curious attitude toward experience—not relaxation, though that often follows.

3. **Mindful Walking (Daily Integration)**: 3 times weekly. Choose a 5-10 minute walk and maintain mindfulness throughout. Notice feet contacting ground, leg muscle contractions and releases, air on skin, surrounding sounds. When mind drifts to past or future, gently return to walking's physical sensations.

4. **Open Monitoring (Advanced)**: 5 minutes daily. "Open" the aperture of awareness without focusing on any particular object. Notice whatever arises: sounds, body sensations, thoughts, emotions—like sky容纳 passing clouds. The goal is capacity to hold all experience without being swept away by any.

5. **Loving-Kindness Meditation (Relational)**: 5 minutes daily. Begin by directing goodwill toward yourself: "May I be happy. May I be safe. May I be free from suffering." Then gradually extend toward close others, neutral persons, and even difficult individuals. Research shows 8 weeks of loving-kindness practice significantly increases positive emotions and social connectedness.`,
    ms: `Amalan harian untuk {{T}}, dari asas hingga lanjutan:

1. **Pernafasan Sedar**: 5-10 minit setiap hari. Fokus pada aliran nafas semula jadi. Apabila perhatian melayang, bimbing kembali dengan lembut.
2. **Imbasan Badan**: 10 minit setiap hari. Imbas perlahan dari kepala ke kaki. Perhatikan sensasi tanpa menghakimi.
3. **Berjalan Sedar**: 3 kali seminggu, 5-10 minit. Perhatikan kaki menyentuh tanah, udara pada kulit, bunyi sekeliling.
4. **Pemantauan Terbuka**: 5 minit setiap hari. "Buka" kesedaran tanpa fokus pada objek tertentu. Biarkan segala yang timbul.
5. **Meditasi Belas Kasihan**: 5 minit setiap hari. Hantar kebaikan kepada diri sendiri, kemudian kembangkan kepada orang lain.`,
    es: `Prácticas diarias para {{T}}, desde lo fundamental hasta lo avanzado:

1. **Respiración Consciente**: 5-10 minutos diarios. Enfóquese en el flujo natural de la respiración. Cuando la atención divague, guíela suavemente de vuelta.
2. **Escaneo Corporal**: 10 minutos diarios. Escanee lentamente de cabeza a pies. Note sensaciones sin juzgar.
3. **Caminata Consciente**: 3 veces por semana, 5-10 minutos. Note los pies contactando el suelo, el aire en la piel, los sonidos circundantes.
4. **Monitoreo Abierto**: 5 minutos diarios. "Abra" la conciencia sin enfocarse en ningún objeto en particular—como el cielo que容纳 las nubes.
5. **Meditación de Bondad Amorosa**: 5 minutos diarios. Dirija buena voluntad hacia usted mismo, luego extiéndala gradualmente hacia otros.`,
    ja: `{{T}}のための日々の練習（基礎から応用まで）：

1. **マインドフル呼吸（基礎）**: 毎日5-10分。呼吸の自然な流れに集中。注意がそれたら優しく呼吸に戻す。#VibeCoding
2. **ボディスキャン（深い気づき）**: 毎日10分。頭頂からつま先へゆっくりスキャン。判断せず感覚に注意。
3. **マインドフルウォーキング（日常統合）**: 週3回、5-10分。足裏の接地感、筋肉の収縮、皮膚の空気感に注意。
4. **オープンモニタリング（応用）**: 毎日5分。特定対象に集中せず、生じるすべての体験に気づきを開く。
5. **慈愛の瞑想（関係性）**: 毎日5分。自分自身への善意から始め、他者へ徐々に拡大。#EmotionalFitness`,
    ko: `{{T}}를 위한 일상练习(기초부터 심화까지):

1. **마음챙김 호흡(기초)**: 매일 5-10분. 호흡의 자연스러운 흐름에 집중. 주의가 흩어지면 부드럽게 호흡으로 복귀.#VibeCoding
2. **바디스캔(깊은 알아차림)**: 매일 10분. 정수리에서 발가락까지 천천히 스캔. 판단 없이 감각 관찰.
3. **마음챙김 걷기(일상 통합)**: 주 3회, 5-10분. 발바닥이 땅에 닿는 느낌, 공기의 감촉, 주변 소리에 주의.
4. **열린 알아차림(심화)**: 매일 5분. 특정 대상에 집중하지 않고 떠오르는 모든 경험을 알아차림.
5. **자애 명상(관계성)**: 매일 5분. 자신에게 선의를 보내고 점차 타인으로 확장.#EmotionalFitness`,
    th: `แนวปฏิบัติรายวันสำหรับ{{T}} ตั้งแต่พื้นฐานถึงขั้นสูง:

1. **การหายใจอย่างมีสติ (พื้นฐาน)**: 5-10 นาทีต่อวัน จดจ่อกับลมหายใจตามธรรมชาติ เมื่อใจลอย ค่อยๆ นำกลับมา
2. **การสแกนร่างกาย (การรับรู้ลึก)**: 10 นาทีต่อวัน สแกนช้าๆ จากศีรษะจรดปลายเท้า สังเกตความรู้สึกโดยไม่ตัดสิน
3. **การเดินอย่างมีสติ (การบูรณาการ)**: 3 ครั้งต่อสัปดาห์ 5-10 นาที รับรู้เท้าสัมผัสพื้น อากาศบนผิวหนัง เสียงรอบข้าง
4. **การสังเกตแบบเปิด (ขั้นสูง)**: 5 นาทีต่อวัน "เปิด" การรับรู้โดยไม่เน้นวัตถุใดๆ เหมือนท้องฟ้ารองรับเมฆที่ผ่านไป
5. **การทำสมาธิเมตตา (เชิงสัมพันธ์)**: 5 นาทีต่อวัน เริ่มส่งความปรารถนาดีถึงตนเอง แล้วขยายไปสู่ผู้อื่น`,
  },
  emotional_health: {
    zh: `针对{{T}}的日常练习，整合情绪觉察和调节策略：

1. **情绪标签练习**：每天多次暂停并问自己"我现在感受到什么情绪？"使用一个"情绪词汇轮"（如Plutchik的情绪轮），精确命名你的情绪（不只是"不好"，而是"失望"、"沮丧"、"焦虑"）。研究发现，精准标记情绪能降低杏仁核的激活强度。

2. **RAIN正念情绪处理**：当强烈情绪袭来时，使用RAIN四步法——Recognize（识别情绪的存在）、Allow（允许它存在、不试图赶走）、Investigate（好奇地探索它在身体哪里、什么形状和质感）、Nurture（用自我慈悲回应）。整个过程5-10分钟。

3. **情绪日记**：每天睡前记录：今天的主要情绪是什么？触发事件是什么？身体的哪个部位感受到了这种情绪？我做了什么样的应对（有效vs无效）？连续记录2周后，你会看到自己的情绪模式和触发模式。

4. **情绪耐受技能**：在不想感受情绪但需要度过当下时，使用以下技巧：① 冷刺激（用冷水泼脸或握冰块，激活潜水反射，降低生理唤醒）；② 剧烈运动（30秒高强度，释放紧张能量）；③ 感官转移（专注于5种感官的输入）。这些不是逃避，而是让自己有能力在情绪平稳后处理问题。

5. **积极情绪建立**：每天刻意做一件能带来积极情绪的小事：回忆一段美好记忆、欣赏一处自然风景、完成一件拖延的任务。积极情绪不仅能"感觉好"，还通过"扩展-建构理论"（broaden-and-build theory）扩展你的思维-行动库，建立持久的心理资源。`,
    en: `Daily practices for {{T}}, integrating emotional awareness and regulation strategies:

1. **Emotion Labeling Practice**: Multiple times daily, pause and ask "What am I feeling right now?" Use an emotion wheel (e.g., Plutchik's Wheel of Emotions) to precisely name your feeling—not just "bad," but "disappointed," "frustrated," "anxious." Research shows precise emotion labeling reduces amygdala activation intensity.

2. **RAIN Mindfulness Process**: When intense emotion arises, use the four-step RAIN approach—Recognize (acknowledge the emotion's presence), Allow (let it be without trying to push it away), Investigate (curiously explore where it lives in your body, its shape and texture), Nurture (respond with self-compassion). Allow 5-10 minutes for the full process.

3. **Emotion Diary**: Each night before bed, record: What was the dominant emotion today? What triggered it? Where in the body did the emotion manifest? How did I cope (effective vs. ineffective)? After 2 weeks of consistent recording, patterns in emotional triggers and responses will emerge.

4. **Emotion Tolerance Skills**: When you need to get through a moment without being overwhelmed: ① Cold stimulus (splash cold water on face or hold ice—activates the dive reflex, lowering physiological arousal); ② Intense exercise (30 seconds of high intensity to release tension energy); ③ Sensory shift (focus on input from all 5 senses). These are not avoidance—they restore capacity to address problems when calmer.

5. **Positive Emotion Building**: Deliberately engage in one small act that generates positive emotion daily: recall a fond memory, appreciate a natural scene, complete a procrastinated task. Positive emotions do more than "feel good"—through the broaden-and-build theory, they expand your thought-action repertoire and build enduring psychological resources.`,
    ms: `Amalan harian untuk {{T}}, menggabungkan strategi kesedaran emosi dan regulasi:

1. **Label Emosi**: Berhenti beberapa kali sehari dan tanya "Apa yang saya rasa?" Gunakan roda emosi untuk menamakan perasaan dengan tepat.
2. **Proses RAIN**: Apabila emosi kuat timbul—Recognize (Kenali), Allow (Benarkan), Investigate (Selidiki), Nurture (Jaga).
3. **Diari Emosi**: Setiap malam catat: emosi dominan, pencetus, lokasi badan, cara mengatasi.
4. **Kemahiran Toleransi Emosi**: Rangsangan sejuk, senaman intensif 30 saat, atau peralihan deria untuk mengurangkan keterujaan fisiologi.
5. **Pembinaan Emosi Positif**: Satu tindakan kecil yang menjana emosi positif setiap hari.`,
    es: `Prácticas diarias para {{T}}, integrando estrategias de conciencia y regulación emocional:

1. **Etiquetado Emocional**: Pause varias veces al día y pregunte "¿Qué siento ahora?" Use una rueda de emociones para nombrar con precisión.
2. **Proceso RAIN**: Cuando surja una emoción intensa—Recognize (Reconocer), Allow (Permitir), Investigate (Investigar), Nurture (Nutrir).
3. **Diario Emocional**: Cada noche registre: emoción dominante, desencadenante, ubicación corporal, estrategia de afrontamiento.
4. **Habilidades de Tolerancia Emocional**: Estímulo frío, ejercicio intenso de 30 segundos o cambio sensorial para reducir la activación fisiológica.
5. **Construcción de Emociones Positivas**: Un pequeño acto que genere emoción positiva cada día.`,
    ja: `{{T}}のための日々の練習（感情認識と調整戦略を統合）：

1. **感情ラベリング練習**: 1日数回立ち止まり「今何を感じている？」と質問。感情の輪を使い正確に命名。#VibeCoding
2. **RAINプロセス**: 強い感情が生じたら—Recognize（認識）、Allow（許可）、Investigate（探求）、Nurture（慈しみ）。
3. **感情日記**: 毎晩記録：主要な感情、きっかけ、身体の感覚、対処方法。
4. **感情耐性スキル**: 冷水刺激、30秒高強度運動、感覚シフトで生理的覚醒を低下。
5. **ポジティブ感情構築**: 毎日ポジティブな感情を生む小さな行動を1つ。#EmotionalFitness`,
    ko: `{{T}}를 위한 일상练习(감정 인식과 조절 전략 통합):

1. **감정 라벨링 연습**: 하루 여러 번 멈춰 "지금 무슨 기분이지?" 자문. 감정 수레바퀴 사용해 정확히 명명.#VibeCoding
2. **RAIN 프로세스**: 강한 감정 발생 시—Recognize(인식), Allow(허용), Investigate(탐구), Nurture(돌봄).
3. **감정 일기**: 매일 밤 기록: 주요 감정, 촉발 요인, 신체 위치, 대처 방식.
4. **감정 내성 기술**: 냉각 자극, 30초 고강도 운동, 감각 전환으로 생리적 각성 감소.
5. **긍정 감정 구축**: 매일 긍정 감정을 생성하는 작은 행동 1개.#EmotionalFitness`,
    th: `แนวปฏิบัติรายวันสำหรับ{{T}} ผสานกลยุทธ์การรับรู้และควบคุมอารมณ์:

1. **การติดฉลากอารมณ์**: หยุดหลายครั้งต่อวันถาม "ฉันรู้สึกอะไร?" ใช้วงล้ออารมณ์เพื่อระบุความรู้สึกอย่างแม่นยำ
2. **กระบวนการ RAIN**: เมื่ออารมณ์รุนแรง—Recognize (รับรู้), Allow (ยอมให้), Investigate (สำรวจ), Nurture (ดูแล)
3. **บันทึกอารมณ์**: ทุกคืนบันทึก: อารมณ์หลัก สิ่งกระตุ้น ตำแหน่งในร่างกาย วิธีรับมือ
4. **ทักษะการทนต่ออารมณ์**: การกระตุ้นเย็น ออกกำลังกายหนัก 30 วินาที หรือเปลี่ยนประสาทสัมผัสเพื่อลดการตื่นตัวทางสรีรวิทยา
5. **การสร้างอารมณ์เชิงบวก**: การกระทำเล็กๆ หนึ่งอย่างที่สร้างอารมณ์เชิงบวกทุกวัน`,
  },
}

const FAQ: Record<string, Record<string, Array<[string, string]>>> = {
  sleep: {
    zh: [
      ["{{T}}和失眠症有什么区别？", "{{T}}描述的是一组与睡眠相关的具体体验或状况，而失眠症是临床诊断——指尽管有足够的睡眠机会，仍持续存在入睡困难、睡眠维持困难或早醒，并伴有日间功能损害。失眠症的诊断标准要求症状每周至少出现3次，持续至少3个月。"],
      ["长期睡眠不足对大脑有何影响？", "长期睡眠不足会损害前额叶皮层的执行功能，导致注意力下降、工作记忆容量降低、决策能力受损。同时，杏仁核对负性刺激的反应增强了60%，情绪调节能力显著下降。此外，脑脊液清除代谢废物的效率降低，β-淀粉样蛋白的积累与阿尔茨海默病风险增加有关。"],
      ["安眠药能长期服用吗？", "不建议长期服用。苯二氮卓类和非苯二氮卓类安眠药（如佐匹克隆、唑吡坦）在2-4周后可能出现耐受性，需要增加剂量才能达到相同效果。长期使用与认知功能下降、跌倒风险增加和药物依赖相关。CBT-I是推荐的首选长期治疗方案。"],
      ["补觉有用吗？", "周末补觉可以部分缓解急性睡眠剥夺的疲劳感，但不能完全抵消长期睡眠不足的代謝和心血管损害。规律作息比补觉更有效。如果必须补觉，建议比平时晚起不超过1小时，避免打乱昼夜节律。"],
      ["如何判断自己是否需要看睡眠医生？", "如果出现以下情况建议就诊：① 长期（>3个月）入睡困难或维持睡眠困难；② 白天严重嗜睡，影响工作或驾驶安全；③ 伴侣观察到睡眠中呼吸暂停、大声打鼾或异常肢体活动；④ 睡眠问题明显影响情绪、记忆或生活质量。"],
    ],
    en: [
      ["What distinguishes {{T}} from clinical insomnia?", "{{T}} describes a set of sleep-related experiences or conditions, while insomnia is a clinical diagnosis—persistent difficulty falling asleep, staying asleep, or early-morning waking despite adequate opportunity, accompanied by daytime impairment. Diagnostic criteria require symptoms at least 3 nights per week for at least 3 months."],
      ["How does chronic sleep deprivation affect the brain?", "Chronic sleep deprivation impairs prefrontal executive function—reducing attention, working memory capacity, and decision-making ability. Amygdala reactivity to negative stimuli increases by approximately 60%, significantly compromising emotional regulation. Additionally, glymphatic clearance of metabolic waste products diminishes, with beta-amyloid accumulation linked to increased Alzheimer's risk."],
      ["Are sleeping pills safe for long-term use?", "Long-term use is not recommended. Benzodiazepine and non-benzodiazepine hypnotics (e.g., zopiclone, zolpidem) may develop tolerance within 2-4 weeks, requiring dose escalation. Chronic use is associated with cognitive decline, increased fall risk, and dependence. CBT-I is the recommended first-line long-term treatment."],
      ["Does catching up on sleep during weekends help?", "Weekend catch-up sleep can partially alleviate fatigue from acute sleep deprivation but does not fully reverse the metabolic and cardiovascular damage from chronic insufficiency. Consistent sleep schedules are more effective. If catching up, limit oversleep to no more than 1 hour past usual wake time to avoid disrupting circadian rhythm."],
      ["When should I see a sleep specialist?", "Consider consultation when: ① Chronic difficulty falling or staying asleep (>3 months); ② Excessive daytime sleepiness affecting work or driving safety; ③ Observed apnea, loud snoring, or unusual limb movements during sleep; ④ Sleep issues significantly impacting mood, memory, or quality of life."],
    ],
    ms: [
      ["Apakah perbezaan antara {{T}} dan insomnia klinikal?", "{{T}} menerangkan pengalaman berkaitan tidur, manakala insomnia adalah diagnosis klinikal. Kriteria diagnostik memerlukan simptom sekurang-kurangnya 3 malam seminggu selama 3 bulan."],
      ["Bagaimana kekurangan tidur kronik menjejaskan otak?", "Ia merosakkan fungsi eksekutif prefrontal, mengurangkan perhatian dan kapasiti memori kerja. Reaktiviti amigdala meningkat kira-kira 60%, menjejaskan regulasi emosi."],
      ["Adakah pil tidur selamat untuk penggunaan jangka panjang?", "Tidak digalakkan. Hipotik benzodiazepin boleh menyebabkan toleransi dalam 2-4 minggu. CBT-I adalah rawatan jangka panjang yang disyorkan."],
      ["Adakah tidur tambahan pada hujung minggu membantu?", "Ia boleh melegakan keletihan akut tetapi tidak membalikkan kerosakan kronik. Jadual tidur yang konsisten lebih berkesan."],
      ["Bilakah saya perlu berjumpa pakar tidur?", "Apabila: ① Masalah tidur kronik (>3 bulan); ② Mengantuk siang hari yang teruk; ③ Apnea yang diperhatikan; ④ Kesan ketara pada mood atau ingatan."],
    ],
    es: [
      ["¿Qué diferencia a {{T}} del insomnio clínico?", "{{T}} describe experiencias relacionadas con el sueño, mientras que el insomnio es un diagnóstico clínico. Los criterios diagnósticos requieren síntomas al menos 3 noches por semana durante 3 meses."],
      ["¿Cómo afecta la privación crónica del sueño al cerebro?", "Afecta la función ejecutiva prefrontal, reduciendo la atención y la capacidad de memoria de trabajo. La reactividad de la amígdala aumenta aproximadamente un 60%."],
      ["¿Son seguras las pastillas para dormir a largo plazo?", "No se recomienda su uso prolongado. Los hipnóticos pueden causar tolerancia en 2-4 semanas. La TCC-I es el tratamiento a largo plazo recomendado."],
      ["¿Ayuda dormir más los fines de semana?", "Puede aliviar la fatiga aguda pero no revierte el daño crónico. Los horarios de sueño consistentes son más efectivos."],
      ["¿Cuándo debo consultar a un especialista del sueño?", "Cuando: ① Problemas crónicos de sueño (>3 meses); ② Somnolencia diurna grave; ③ Apnea observada; ④ Impacto significativo en el estado de ánimo o la memoria."],
    ],
    ja: [
      ["{{T}}と臨床的不眠症の違いは？", "{{T}}は睡眠に関する体験を指し、不眠症は臨床診断です。診断基準には週3晩以上、3ヶ月以上の症状が必要です。 #VibeCoding"],
      ["慢性的な睡眠不足は脳にどう影響する？", "前頭前野の実行機能を損ない、注意力とワーキングメモリ容量を減少させます。扁桃体の反応性は約60%上昇します。"],
      ["睡眠薬は長期使用しても安全？", "推奨されません。ベンゾジアゼピン系睡眠薬は2-4週間で耐性を生じる可能性があります。CBT-Iが推奨される長期治療です。"],
      ["週末の寝だめは効果的？", "急性疲労を和らげることはできますが、慢性的なダメージを元に戻すことはできません。一貫した睡眠スケジュールが最も効果的です。"],
      ["いつ睡眠専門医に相談すべき？", "以下の場合：①慢性的な睡眠問題（3ヶ月以上）；②日中の重度の眠気；③観察された無呼吸；④気分や記憶への顕著な影響。 #EmotionalFitness"],
    ],
    ko: [
      ["{{T}}와 임상적 불면증의 차이는?", "{{T}}는 수면 관련 경험을 말하며, 불면증은 임상 진단입니다. 진단 기준은 주 3회 이상, 3개월 이상의 증상이 필요합니다. #VibeCoding"],
      ["만성 수면 부족이 뇌에 미치는 영향은?", "전전두엽 실행 기능을 손상시키고 주의력과 작업 기억 용량을 감소시킵니다. 편도체 반응성이 약 60% 증가합니다."],
      ["수면제 장기 사용은 안전한가요?", "권장되지 않습니다. 벤조디아제핀 수면제는 2-4주 내에 내성을 유발할 수 있습니다. CBT-I가 권장되는 장기 치료법입니다."],
      ["주말에 몰아자기는 효과가 있나요?", "급성 피로는 완화할 수 있지만 만성 손상을 되돌리지는 못합니다. 일관된 수면 일정이 가장 효과적입니다."],
      ["언제 수면 전문의를 만나야 하나요?", "다음 경우: ①만성 수면 문제(3개월 이상); ②주간 심한 졸림; ③관찰된 무호흡; ④기분이나 기억에 현저한 영향. #EmotionalFitness"],
    ],
  },
  anxiety: {
    zh: [
      ["{{T}}是正常情绪还是需要治疗？", "焦虑本身是正常的进化适应情绪，在低至中等强度下具有保护作用。但当焦虑的强度、频率或持续时间显著超出触发情境的合理范围，且导致明显的痛苦或功能损害（如回避社交、无法工作），则达到了需要专业干预的门槛。"],
      ["抗焦虑药物和CBT哪个更好？", "研究显示两者结合效果最佳。SSRI类药物（如舍曲林、帕罗西汀）可以有效降低焦虑的基础水平，而CBT则提供长期应对技能和复发预防。纯药物治疗停药后复发率约40-60%，而接受CBT的患者停药后复发率显著更低。"],
      ["焦虑时深呼吸为什么有用？", "焦虑激活交感神经系统（战斗或逃跑反应），导致心率加快、呼吸变浅。腹式深呼吸（尤其是延长呼气）能够激活迷走神经，触发副交感神经系统（休息和消化反应），降低心率和血压，阻断焦虑的生理反馈循环。这被称为\u201C迷走神经制动\u201D。"],
      ["暴露疗法会不会让焦虑更严重？", "短期可能会有不适感增加，但长期效果明确。关键是遵循\u201C渐进原则\u201D——从低焦虑度的场景开始，循序渐进。研究证实，80-90%的焦虑障碍患者在完成暴露疗法后症状显著改善。如果操作正确，暴露疗法不会\u201C加重\u201D焦虑，而是在安全环境下重新学习——你害怕的结果并未发生。"],
      ["正念和CBT的区别是什么？", "CBT着眼于改变思维内容——识别和修正扭曲认知；而正念则培养与思维和情绪的新关系——不试图改变内容，而是改变你对它们的\u201C态度\u201D。现代心理治疗倾向于整合两者：先用CBT建立认知灵活性，再用正念巩固情绪接纳能力。"],
    ],
    en: [
      ["Is {{T}} a normal emotion or does it require treatment?", "Anxiety itself is a normal adaptive emotion that serves a protective function at low to moderate intensity. Treatment is warranted when anxiety intensity, frequency, or duration markedly exceeds the triggering context and causes significant distress or functional impairment—such as avoiding social situations or inability to work."],
      ["Which works better: anti-anxiety medication or CBT?", "Research shows combined treatment yields optimal outcomes. SSRIs (e.g., sertraline, paroxetine) effectively reduce baseline anxiety levels, while CBT provides long-term coping skills and relapse prevention. Relapse rates after medication-only treatment are approximately 40-60%, significantly higher than patients who received CBT."],
      ["Why does deep breathing help with anxiety?", "Anxiety activates the sympathetic nervous system (fight-or-flight), accelerating heart rate and shallow breathing. Deep diaphragmatic breathing—especially prolonged exhalation—stimulates the vagus nerve, triggering the parasympathetic system (rest-and-digest), lowering heart rate and blood pressure, and interrupting the physiological feedback loop of anxiety."],
      ["Does exposure therapy make anxiety worse?", "Short-term discomfort may increase, but long-term outcomes are well-established. The key is the graded approach—starting with low-anxiety situations. Research confirms 80-90% of anxiety disorder patients show significant improvement after completing exposure therapy. Properly conducted, exposure enables safety learning: the feared outcome doesn't occur."],
      ["What's the difference between mindfulness and CBT?", "CBT targets thought content—identifying and modifying distorted cognitions. Mindfulness cultivates a new relationship with thoughts and emotions—not changing content but transforming your attitude toward them. Modern therapy increasingly integrates both: CBT for cognitive flexibility, mindfulness for emotional acceptance."],
    ],
    ms: [
      ["Adakah {{T}} emosi normal atau memerlukan rawatan?", "Kebimbangan adalah emosi adaptif normal. Rawatan diperlukan apabila intensiti atau kekerapan mengatasi konteks dan menyebabkan kemerosotan fungsi."],
      ["Mana lebih baik: ubat anti-kebimbangan atau CBT?", "Gabungan memberikan hasil optimum. SSRI mengurangkan kebimbangan asas, CBT menyediakan kemahiran jangka panjang. Kadar kambuh selepas ubat sahaja adalah 40-60%."],
      ["Mengapa pernafasan dalam membantu kebimbangan?", "Pernafasan diafragma merangsang saraf vagus, mencetuskan sistem parasimpatetik, mengurangkan kadar jantung dan tekanan darah."],
      ["Adakah terapi pendedahan memburukkan kebimbangan?", "Ketidakselesaan jangka pendek mungkin meningkat, tetapi 80-90% pesakit menunjukkan peningkatan signifikan selepas terapi pendedahan."],
      ["Apa perbezaan antara kesedaran dan CBT?", "CBT menyasarkan kandungan pemikiran; kesedaran memupuk hubungan baru dengan pemikiran. Terapi moden mengintegrasikan kedua-duanya."],
    ],
    es: [
      ["¿Es {{T}} una emoción normal o requiere tratamiento?", "La ansiedad es una emoción adaptativa normal. Se necesita tratamiento cuando la intensidad o frecuencia supera el contexto y causa deterioro funcional."],
      ["¿Qué funciona mejor: medicación o TCC?", "La combinación ofrece resultados óptimos. Los ISRS reducen la ansiedad basal; la TCC proporciona habilidades a largo plazo. La tasa de recaída solo con medicación es del 40-60%."],
      ["¿Por qué ayuda la respiración profunda con la ansiedad?", "La respiración diafragmática estimula el nervio vago, activando el sistema parasimpático y reduciendo la frecuencia cardíaca."],
      ["¿La terapia de exposición empeora la ansiedad?", "La incomodidad a corto plazo puede aumentar, pero el 80-90% de los pacientes mejoran significativamente después de la terapia de exposición."],
      ["¿Cuál es la diferencia entre mindfulness y TCC?", "La TCC se dirige al contenido del pensamiento; el mindfulness cultiva una nueva relación con los pensamientos. La terapia moderna integra ambos."],
    ],
    ja: [
      ["{{T}}は正常な感情？治療が必要？", "不安自体は正常な適応感情です。強度や頻度が状況を著しく超え、機能障害を引き起こす場合に治療が必要です。 #VibeCoding"],
      ["抗不安薬とCBTどちらが効果的？", "併用が最適です。SSRIは基礎レベルの不安を軽減し、CBTは長期的な対処スキルを提供します。薬物のみの再発率は40-60%です。"],
      ["深呼吸がなぜ不安に効く？", "横隔膜呼吸は迷走神経を刺激し、副交感神経系を活性化して心拍数と血圧を低下させます。"],
      ["曝露療法は不安を悪化させる？", "短期的な不快感は増すかもしれませんが、曝露療法完了後80-90%の患者が有意な改善を示します。"],
      ["マインドフルネスとCBTの違いは？", "CBTは思考内容を対象とし、マインドフルネスは思考との新しい関係を育みます。現代の治療は両方を統合します。 #EmotionalFitness"],
    ],
    ko: [
      ["{{T}}는 정상 감정인가요? 치료가 필요한가요?", "불안은 정상적인 적응 감정입니다. 강도나 빈도가 상황을 현저히 초과하고 기능 장애를 유발할 때 치료가 필요합니다. #VibeCoding"],
      ["항불안제와 CBT 중 무엇이 더 효과적인가요?", "병용이 최적입니다. SSRI는 기본 불안 수준을 낮추고 CBT는 장기 대처 기술을 제공합니다. 약물만으로 치료 시 재발률은 40-60%입니다."],
      ["깊은 호흡이 불안에 왜 도움이 되나요?", "횡격막 호흡은 미주 신경을 자극하여 부교감 신경계를 활성화하고 심박수와 혈압을 낮춥니다."],
      ["노출 요법이 불안을 악화시키나요?", "단기적 불편감은 증가할 수 있지만, 노출 요법 완료 후 80-90%의 환자가 유의미한 개선을 보입니다."],
      ["마음챙김과 CBT의 차이는?", "CBT는 생각 내용을 대상으로 하고, 마음챙김은 생각과의 새로운 관계를 기릅니다. 현대 치료는 둘 다 통합합니다. #EmotionalFitness"],
    ],
  },
  grief_loss: {
    zh: [
      ["哀伤会持续多久？", "哀伤的持续时间因人而异，没有\u201C标准时间表\u201D。急性哀伤期通常持续数周到数月。复杂哀伤障碍的诊断门槛是症状持续超过12个月。重要的是，哀伤不会真正\u201C结束\u201D——它会随着时间改变形态，从剧烈的疼痛渐渐转化为温和的怀念。"],
      ["怎样区分哀伤和抑郁症？", "虽然症状有重叠，但关键区别在于：哀伤的核心是思念和渴望，情绪常常围绕逝者波动，自尊通常不受影响；抑郁症的核心是持久的低情绪和快感缺乏，伴随无价值感和自我责备。哀伤中的人仍能在谈到逝者的美好回忆时感受到温暖，而抑郁症患者的情绪改善通常不会因回忆而波动。"],
      ["我应该\u201C坚强\u201D还是\u201C释放\u201D？", "都不是极端。双程模型建议在\u201C面对哀伤\u201D和\u201C恢复正常生活\u201D之间动态平衡。某些时刻允许自己完全沉浸在哀伤中，某些时刻给自己许可去做恢复导向的活动——这比强行坚强或完全放纵都更健康。社会文化中\u201C要坚强\u201D的压力实际上可能延长复杂的哀伤反应。"],
      [":children-eating: 孩子经历哀伤时如何支持？", "① 用具体、诚实的语言解释死亡（避免\u201C睡着了\u201D等模糊比喻）；② 通过绘画、游戏等非语言方式允许表达；③ 保持日常生活规律，给安全感和可预测性；④ 明确告诉孩子哀伤是正常的，没有\u201C正确\u201D的哀伤方式；⑤ 必要时寻求儿童哀伤心理咨询。"],
      ["宠物离世的哀伤和人的哀伤一样吗？", "是的，而且有时更难。宠物离世可能伴随被社会低估的哀伤（disenfranchised grief），因为社会不一定充分认可与宠物之间的依恋关系。宠物提供无条件的陪伴和安慰，它们离世后的空虚感很真实。允许自己郑重悼念，不因\u201C只是宠物\u201D而否定这份哀伤的意义。"],
    ],
    en: [
      ["How long does grief last?", "Grief duration varies widely—there is no standard timeline. Acute grief typically lasts weeks to months. Prolonged Grief Disorder is diagnosed when symptoms persist beyond 12 months. Importantly, grief doesn't truly end—it transforms over time, from intense pain into gentler remembrance."],
      ["How do I distinguish grief from depression?", "While symptoms overlap, key distinctions: grief centers on yearning and longing, emotions fluctuate around thoughts of the deceased, self-esteem typically remains intact. Depression features persistent low mood and anhedonia accompanied by worthlessness and self-blame. Those grieving can still feel warmth recalling positive memories; depressed individuals' mood rarely lifts with回忆."],
      ["Should I be strong or let it all out?", "Neither extreme. The Dual Process Model suggests dynamic oscillation between loss-oriented and restoration-oriented coping. Some moments permit full immersion in grief; others allow restoration-focused activity. This balance is healthier than forced stoicism or complete indulgence. Cultural pressure to 'be strong' may prolong complicated grief."],
      ["How to support a grieving child?", "Use concrete, honest language about death (avoid euphemisms like 'gone to sleep'). Allow non-verbal expression through drawing or play. Maintain daily routines for security. Normalize grief—there's no 'right' way to grieve. Seek professional support when needed."],
      ["Is grief over pet loss the same as human loss?", "Yes, and it can be harder in some ways. Pet loss often involves disenfranchised grief—society may not fully validate the attachment bond with a pet. Pets offer unconditional companionship; their absence creates a very real void. Allow yourself to mourn fully without diminishing the significance because it was 'just a pet.'"],
    ],
    ms: [
      ["Berapa lama kesedihan berlangsung?", "Tempoh berbeza—tiada garis masa standard. Kesedihan akut biasanya berlangsung minggu hingga bulan. Gangguan Kesedihan Berpanjangan didiagnosis selepas 12 bulan."],
      ["Bagaimana bezakan kesedihan dan kemurungan?", "Kesedihan berpusat pada kerinduan; kemurungan melibatkan mood rendah berterusan dan anhedonia. Harga diri biasanya utuh dalam kesedihan."],
      ["Patutkah saya kuat atau melepaskan?", "Kedua-dua ekstrem tidak sihat. Model Proses Dwi mencadangkan ayunan dinamik antara menghadapi dan pemulihan."],
      ["Bagaimana menyokong kanak-kanak yang berduka?", "Guna bahasa konkrit tentang kematian. Benarkan ekspresi melalui lukisan atau bermain. Kekalkan rutin harian. Normalkan kesedihan."],
      ["Adakah kesedihan haiwan peliharaan sama seperti kehilangan manusia?", "Ya, dan kadang lebih sukar. Kehilangan haiwan peliharaan sering melibatkan kesedihan tidak diiktiraf. Benarkan diri berkabung sepenuhnya."],
    ],
    es: [
      ["¿Cuánto dura el duelo?", "La duración varía—no existe un cronograma estándar. El duelo agudo suele durar semanas o meses. El Trastorno de Duelo Prolongado se diagnostica después de 12 meses."],
      ["¿Cómo distingo entre duelo y depresión?", "El duelo se centra en el anhelo; la depresión implica estado de ánimo bajo persistente y anhedonia. La autoestima suele mantenerse intacta en el duelo."],
      ["¿Debo ser fuerte o desahogarme?", "Ningún extremo es saludable. El Modelo de Proceso Dual sugiere una oscilación dinámica entre afrontamiento orientado a la pérdida y a la restauración."],
      ["¿Cómo apoyar a un niño en duelo?", "Use lenguaje concreto sobre la muerte. Permita la expresión no verbal. Mantenga rutinas diarias. Normalice el duelo."],
      ["¿El duelo por una mascota es igual que por una persona?", "Sí, y a veces puede ser más difícil. La pérdida de una mascota a menudo implica duelo no reconocido. Permítase lamentar plenamente."],
    ],
    ja: [
      ["悲しみはどのくらい続く？", "期間は人によって異なります。急性の悲しみは通常数週間から数ヶ月続きます。遷延性悲嘆障害は12ヶ月以上続く場合に診断されます。 #VibeCoding"],
      ["悲しみとうつ病の違いは？", "悲しみは切望と渇望が中心です。うつ病は持続的な低気分と無快感症を伴います。悲しみにおける自尊心は通常保たれています。"],
      ["私は強くなるべき？それとも感情を解放するべき？", "両極端は健康的ではありません。二重プロセスモデルは、喪失志向と回復志向の対処の間の動的な揺れ動きを示唆しています。"],
      ["悲しんでいる子どもをどう支える？", "死について具体的で正直な言葉を使いましょう。絵や遊びを通じた非言語的表現を許可し、日常生活のルーチンを維持し、悲しみを正常化しましょう。"],
      ["ペットロスと人の喪失の悲しみは同じ？", "はい、時にはより難しい場合もあります。ペットの喪失はしばしば認識されない悲しみを伴います。十分に悲しむことを自分に許しましょう。 #EmotionalFitness"],
    ],
    ko: [
      ["슬픔은 얼마나 오래 지속되나요?", "기간은 사람마다 다양합니다. 급성 슬픔은 보통 수주에서 수개월 지속됩니다. 지속성 비애 장애는 12개월 이상 지속될 때 진단됩니다. #VibeCoding"],
      ["슬픔과 우울증의 차이는?", "슬픔은 그리움과 갈망이 중심이고, 우울증은 지속적인 저기분과 무쾌감증을 동반합니다. 슬픔에서 자존감은 보통 유지됩니다."],
      ["강해져야 하나요? 아니면 감정을 분출해야 하나요?", "양극단은 건강하지 않습니다. 이중 과정 모델은 상실 중심과 회복 중심 대처 사이의 역동적 흔들림을 제안합니다."],
      ["슬픔을 겪는 아이를 어떻게 지원하나요?", "죽음에 대해 구체적이고 정직한 언어를 사용하세요. 그림이나 놀이를 통한 비언어적 표현을 허용하고 일상 루틴을 유지하며 슬픔을 정상화하세요."],
      ["반려동물 상실의 슬픔은 사람 상실과 같은가요?", "네, 때로는 더 어려울 수 있습니다. 반려동물 상실은 종종 인정받지 못하는 슬픔을 수반합니다. 충분히 애도하는 것을 스스로에게 허락하세요. #EmotionalFitness"],
    ],
  },
  loneliness: {
    zh: [
      ["{{T}}和独处的区别是什么？", "关键区别在于主观体验。独处（solitude）是主动选择的、令人满足的物理状态——你享受自己的陪伴。孤独感（loneliness）是被动感受到的情感痛苦——你渴望联结但感到被隔绝。一个人可能在一群人中感到孤独，也可能一个人独处时感到充实。"],
      ["为什么有些人比我更容易感到孤独？", "孤独感的易感性受到多种因素影响：遗传因素（约37-55%可遗传）、早期依恋经历（不安全依恋与高孤独感相关）、神经特质（更高的社交威胁敏感性）、认知模式（更负面的社会期待）。但孤独感可塑性很强——认知行为疗法能有效改变对社交信号的负面解读倾向。"],
      ["在社交媒体上互动能减轻孤独吗？", "不一定。主动型社交媒体使用（如一对一聊天、在紧密社群中分享）可以增强联结感；被动型使用（仅浏览他人生活而不互动）反而可能加剧孤独感和社会比较。关键是使用方式而非平台本身。视频通话比文字消息更能缓解孤独感，因为它提供了更丰富的非语言线索。"],
      ["如果我不想社交怎么办？", "尊重自己的边界很重要。孤独感与社交意愿并非完全对应——有时我们只想在有安全感的环境中\u201C与他人一起独处\u201D（alone together），比如在咖啡馆看书。低压力、低期望值的共同存在形式也许是重建社交舒适感的第一步。"],
      ["长期孤独对身体实际会造成什么影响？", "长期孤独会触发慢性低度炎症反应，C反应蛋白（CRP）和白细胞介素-6（IL-6）水平升高。睡眠结构变浅，慢波睡眠减少。端粒缩短加速，相当于细胞衰老加速约8-12年。这些生理变化解释了为什么长期孤独者的心血管疾病和痴呆风险显著增加。"],
    ],
    en: [
      ["What's the difference between {{T}} and solitude?", "The key distinction is subjective experience. Solitude is a chosen, fulfilling state—you enjoy your own company. Loneliness is passively felt emotional pain—you yearn for connection but feel cut off. One can feel lonely in a crowd, or fulfilled while alone."],
      ["Why do some people experience loneliness more intensely?", "Susceptibility is influenced by genetics (37-55% heritability), early attachment experiences (insecure attachment linked to higher loneliness), neural traits (greater social threat sensitivity), and cognitive patterns (more negative social expectations). However, loneliness is highly modifiable—CBT effectively shifts negative interpretation biases in social signal processing."],
      ["Does social media interaction reduce loneliness?", "Not necessarily. Active social media use (one-on-one chat, sharing in close communities) can enhance connection. Passive use (browsing others' lives without interaction) may paradoxically increase loneliness through social comparison. Video calls alleviate loneliness more effectively than text due to richer nonverbal cues."],
      ["What if I don't feel like socializing?", "Respecting your boundaries is important. Loneliness and social desire don't always align—sometimes we simply want to be 'alone together' in a safe environment, like reading in a café. Low-pressure, low-expectation co-presence might be the first step toward rebuilding social comfort."],
      ["What physical effects does chronic loneliness have?", "Chronic loneliness triggers low-grade inflammation (elevated CRP and IL-6), shallower sleep architecture with reduced slow-wave sleep, and accelerated telomere shortening equivalent to approximately 8-12 years of cellular aging. These physiological changes explain the significantly increased cardiovascular and dementia risks."],
    ],
    ms: [
      ["Apa bezanya {{T}} dengan kesendirian?", "Kesendirian adalah keadaan pilihan yang memuaskan. Kesunyian adalah kesakitan emosi yang dirasakan secara pasif. Seseorang boleh berasa sunyi dalam kumpulan."],
      ["Mengapa sesetengah orang lebih mudah berasa sunyi?", "Dipengaruhi genetik (37-55%), pengalaman lampiran awal, dan corak kognitif. Kesunyian sangat boleh diubah suai melalui CBT."],
      ["Adakah media sosial mengurangkan kesunyian?", "Penggunaan aktif boleh meningkatkan hubungan; penggunaan pasif mungkin memburukkan kesunyian. Panggilan video lebih berkesan daripada teks."],
      ["Apa jika saya tidak mahu bersosial?", "Hormati sempadan anda. 'Bersendirian bersama' dalam persekitaran selamat boleh menjadi langkah pertama membina semula keselesaan sosial."],
      ["Kesan fizikal kesunyian kronik pada tubuh?", "Kesunyian kronik mencetuskan keradangan tahap rendah (CRP dan IL-6 meningkat), struktur tidur lebih cetek, dan pemendekan telomer yang dipercepatkan bersamaan dengan kira-kira 8-12 tahun penuaan selular."],
    ],
    es: [
      ["¿Cuál es la diferencia entre {{T}} y la soledad?", "La diferencia clave es la experiencia subjetiva. La soledad física es un estado elegido y gratificante. La soledad emocional es un dolor pasivamente sentido. Una persona puede sentirse sola en medio de una multitud."],
      ["¿Por qué algunas personas experimentan la soledad más intensamente?", "La susceptibilidad está influenciada por factores genéticos (37-55% hereditarios), experiencias de apego temprano y patrones cognitivos. La soledad es altamente modificable a través de la TCC."],
      ["¿La interacción en redes sociales reduce la soledad?", "El uso activo puede mejorar la conexión; el uso pasivo puede paradójicamente aumentar la soledad. Las videollamadas alivian la soledad más efectivamente que los mensajes de texto."],
      ["¿Qué pasa si no quiero socializar?", "Respeta tus límites. Estar 'solos juntos' en un entorno seguro puede ser el primer paso para reconstruir la comodidad social."],
      ["¿Qué efectos físicos tiene la soledad crónica?", "La soledad crónica desencadena inflamación de bajo grado (CRP e IL-6 elevados), sueño más superficial y acortamiento acelerado de telómeros, equivalente a 8-12 años de envejecimiento celular."],
    ],
    ja: [
      ["{{T}}と孤独（solitude）の違いは？", "孤独（solitude）は選択された充実した状態。孤独感（loneliness）は受動的に感じる感情的な苦痛です。人は群衆の中で孤独を感じることも、一人で充実を感じることもあります。 #VibeCoding"],
      ["なぜ孤独を感じやすい人とそうでない人がいる？", "遺伝的要因（37-55%）、早期愛着経験、認知パターンに影響されます。孤独感はCBTによって修正可能です。"],
      ["ソーシャルメディアの交流は孤独を軽減する？", "能動的利用はつながりを強化しますが、受動的利用は逆に孤独感を増す可能性があります。ビデオ通話はテキストより効果的です。"],
      ["社交したくない場合は？", "自分の境界を尊重しましょう。安全な環境での「孤独な共有」が、社会的な居心地を再構築する第一歩になるかもしれません。"],
      ["慢性的孤独の身体的影響は？", "慢性的孤独は軽度の炎症（CRPとIL-6の上昇）、睡眠構造の浅層化、テロメア短縮の加速（約8-12年の細胞老化に相当）を引き起こします。 #EmotionalFitness"],
    ],
    ko: [
      ["{{T}}와 고독(solitude)의 차이는?", "고독은 선택된 충만한 상태입니다. 외로움은 수동적으로 느끼는 정서적 고통입니다. 사람은 군중 속에서 외로움을 느끼거나 혼자서 충만함을 느낄 수 있습니다. #VibeCoding"],
      ["왜 어떤 사람들은 외로움을 더 심하게 느낄까요?", "유전적 요인(37-55%), 초기 애착 경험, 인지 패턴의 영향을 받습니다. 외로움은 CBT를 통해 수정 가능합니다."],
      ["소셜 미디어 상호작용이 외로움을 줄이나요?", "능동적 사용은 연결감을 강화하지만 수동적 사용은 역설적으로 외로움을 증가시킬 수 있습니다. 화상 통화가 텍스트보다 더 효과적입니다."],
      ["사교하고 싶지 않다면?", "자신의 경계를 존중하세요. 안전한 환경에서 '함께 있는 고독'이 사회적 편안함을 재건하는 첫 단계가 될 수 있습니다."],
      ["만성적 외로움의 신체적 영향은?", "만성 외로움은 경미한 염증(CRP 및 IL-6 상승), 수면 구조 얕아짐, 텔로미어 단축 가속(약 8-12년 세포 노화에 해당)을 유발합니다. #EmotionalFitness"],
    ],
  },
  self_worth: {
    zh: [
      ["{{T}}和自我价值感低是一回事吗？", "自我价值感受多方面因素影响，包括童年经历、社会比较、成就反馈等。关键区别在于：健康的自我价值感是相对稳定的内在认知，而低自我价值感往往伴随全盘否定自己的倾向。"],
      ["如何区分正常的自我怀疑和低自我价值？", "正常的自我怀疑是情境性的——你在面对新挑战时感到不确定，但在熟悉的领域仍能认可自己的价值。低自我价值则是一种弥散性的核心信念，即使取得成就也难以内化成功。"],
      ["社交媒体是否加剧了自我价值问题？", "社交媒体通过社会比较机制显著影响自我价值。研究显示，频繁使用社交媒体与自我价值感降低相关，尤其是当使用方式以被动浏览为主时。主动型使用（如有意义的互动）则可能产生正面影响。"],
      ["自我价值感低会影响人际关系吗？", "会。低自我价值感的人可能：过度寻求外部认可、难以设定健康边界、容忍不健康的关系模式、在冲突中倾向于自我归责。改善自我价值感能显著提升关系质量。"],
      ["自我慈悲(self-compassion)如何帮助提升自我价值？", "自我慈悲包括三个核心成分：自我善待（而非自我批评）、共同人性（认识到不完美是人类共同经历）、正念觉知（平衡地看待自己的优缺点）。研究表明，自我慈悲比自我肯定更能有效提升长期自我价值感。"],
    ],
    en: [
      ["What's the difference between {{T}} and low self-worth?", "Self-worth is influenced by multiple factors including childhood experiences, social comparison, and achievement feedback. The key distinction: healthy self-worth is a relatively stable internal recognition, while low self-worth often involves global self-negation."],
      ["How to distinguish normal self-doubt from low self-worth?", "Normal self-doubt is situational—you feel uncertain facing new challenges but can still recognize your value in familiar domains. Low self-worth is a pervasive core belief where success is difficult to internalize even when achieved."],
      ["Does social media worsen self-worth issues?", "Social media significantly impacts self-worth through social comparison mechanisms. Research shows frequent social media use correlates with decreased self-worth, especially with passive browsing. Active use (meaningful interaction) may have positive effects."],
      ["Can low self-worth affect relationships?", "Yes. People with low self-worth may excessively seek external validation, struggle to set healthy boundaries, tolerate unhealthy relationship patterns, and tend toward self-blame in conflicts. Improving self-worth significantly enhances relationship quality."],
      ["How does self-compassion help improve self-worth?", "Self-compassion includes three components: self-kindness (vs. self-criticism), common humanity (recognizing imperfection as universal), and mindful awareness (balanced perspective on strengths and weaknesses). Research shows self-compassion is more effective than self-affirmation for long-term self-worth improvement."],
    ],
    ms: [
      ["{{T}} dan harga diri—apa bezanya?", "Harga diri adalah penilaian keseluruhan terhadap nilai diri. {{T}} merujuk kepada rasa nilai intrinsik yang lebih stabil, tidak berdasarkan prestasi."],
      ["Bagaimana membina {{T}} tanpa bergantung pada pencapaian luaran?", "Fokus pada nilai peribadi dan bukannya hasil. Catat kualiti yang anda bawa ke dalam tindakan. Amalkan pengesahan diri."],
      ["Mengapa perfeksionis sering bergelut dengan nilai diri?", "Perfeksionisme mewujudkan dikotomi semua-atau-apa: penerimaan sempurna atau penolakan total. Ini tidak realistik."],
      ["Bolehkah terapi membantu masalah nilai diri?", "Sangat berkesan. CBT membantu mencabar kepercayaan teras negatif. ACT mengurangkan pergantungan nilai diri pada metrik prestasi."],
      ["Bagaimana berhenti membandingkan diri dengan orang lain?", "Perbandingan sosial adalah automatik. Amalkan: ① Perhatikan bila anda membandingkan; ② Tanya sama ada perbandingan ini informatif atau evaluatif; ③ Tukar perbandingan ke atas menjadi peluang pembelajaran."],
    ],
    es: [
      ["{{T}} y autoestima—¿cuál es la diferencia?", "La autoestima es la evaluación general del valor propio. {{T}} se refiere a un sentido más estable del valor intrínseco, no basado en el rendimiento."],
      ["¿Cómo construir {{T}} sin depender de logros externos?", "Concéntrese en los valores personales más que en los resultados. Registre las cualidades que aporta a las acciones. Practique la autoafirmación."],
      ["¿Por qué los perfeccionistas luchan con el valor propio?", "El perfeccionismo crea una dicotomía de todo o nada: aceptación perfecta o rechazo total. Esto es insostenible."],
      ["¿Puede la terapia ayudar con problemas de valor propio?", "Muy efectivo. La TCC identifica y desafía las creencias centrales negativas. La ACT reduce la dependencia del valor propio en métricas de rendimiento."],
      ["¿Cómo dejar de compararme con los demás?", "La comparación social es automática. Practique: ① Observe cuándo compara; ② Pregunte si es informativa o evaluativa; ③ Convierta la comparación ascendente en oportunidad de aprendizaje."],
    ],
    ja: [
      ["{{T}}と自尊心の違いは？", "自尊心は自己価値の全体的な評価です。{{T}}はより安定した内面的価値の感覚を指します。 #VibeCoding"],
      ["外部成果に頼らずに自己価値を構築するには？", "結果ではなく個人の価値観に焦点を当てましょう。行動にもたらした資質を記録し、自己確証を実践します。"],
      ["完璧主義者が自己価値に悩むのはなぜ？", "完璧主義は全か無かの二分法を生みます。不完全さを自己否定と同視する認識は持続不可能です。"],
      ["セラピーは自己価値の問題に効果的？", "非常に効果的です。CBTはネガティブな中核的信念を特定し挑戦します。ACTは業績指標への自己価値依存を減らします。"],
      ["他人との比較をやめるには？", "比較していることに気づき、情報的か評価的かを問い、上方比較を学習機会に変換します。 #EmotionalFitness"],
    ],
    ko: [
      ["{{T}}와 자존감의 차이는?", "자존감은 자기 가치에 대한 전반적 평가입니다. {{T}}는 성과에 기반하지 않은 더 안정적인 내재적 가치 감각입니다. #VibeCoding"],
      ["외부 성과에 의존하지 않고 자기 가치를 구축하려면?", "결과보다 개인적 가치관에 초점을 맞추세요. 행동에 가져온 자질을 기록하고 자기 확언을 실천하세요."],
      ["완벽주의자가 자기 가치로 고민하는 이유는?", "완벽주의는 전부 아니면 전무의 이분법을 만듭니다. 불완전함을 자기 부정과 동일시하는 것은 지속 불가능합니다."],
      ["치료가 자기 가치 문제에 효과적인가요?", "매우 효과적입니다. CBT는 부정적 핵심 신념을 식별하고 도전합니다. ACT는 성과 지표에 대한 자기 가치 의존도를 줄입니다."],
      ["타인과 비교하는 것을 멈추는 방법은?", "비교하고 있음을 인식하고, 정보적인지 평가적인지 자문하며, 상향 비교를 학습 기회로 전환하세요. #EmotionalFitness"],
    ],
    th: [
      ["{{T}}กับความภูมิใจในตนเองต่างกันอย่างไร?", "ความภูมิใจในตนเองคือการประเมินคุณค่าในตนเองโดยรวม {{T}}หมายถึงความรู้สึกมีคุณค่าภายในที่มั่นคงกว่า ไม่ได้ขึ้นอยู่กับผลงาน #VibeCoding"],
      ["จะสร้าง{{T}}โดยไม่พึ่งพาความสำเร็จภายนอกได้อย่างไร?", "จดจ่อกับค่านิยมส่วนบุคคลมากกว่าผลลัพธ์ บันทึกคุณสมบัติที่คุณนำมาสู่การกระทำ ฝึกการยืนยันตนเอง"],
      ["ทำไมคนที่สมบูรณ์แบบมัก struggle กับคุณค่าในตนเอง?", "ความสมบูรณ์แบบสร้าง dichotomies แบบทั้งหมดหรือไม่มีเลย การยอมรับที่สมบูรณ์แบบหรือการปฏิเสธทั้งหมด"],
      ["การบำบัดช่วยเรื่องปัญหาคุณค่าในตนเองได้ไหม?", "มีประสิทธิภาพมาก CBTช่วยระบุและท้าทายความเชื่อหลักเชิงลบ ACTช่วยลดการพึ่งพาคุณค่าในตนเองบนตัวชี้วัดผลงาน"],
      ["จะหยุดเปรียบเทียบตนเองกับผู้อื่นได้อย่างไร?", "การเปรียบเทียบทางสังคมเป็นอัตโนมัติ ฝึก: ①สังเกตเมื่อกำลังเปรียบเทียบ ②ถามว่าให้ข้อมูลหรือประเมินค่า ③เปลี่ยนเป็นการเรียนรู้ #EmotionalFitness"],
    ],
  },
  relationships: {
    zh: [
      ["{{T}}和沟通问题有什么区别？", "关系问题通常表现为沟通障碍、信任问题、边界冲突等。沟通是表层现象，而深层的关系问题往往涉及依恋风格、价值观差异、未满足的情感需求等根本因素。"],
      ["关系中频繁争吵是正常还是有问题？", "争吵的频率不如争吵的模式重要。健康的关系中存在建设性冲突——双方能表达需求、倾听对方、寻求解决方案。破坏性模式包括批评、轻蔑、防御和筑墙（Gottman's Four Horsemen）。"],
      ["如何修复破裂的信任？", "信任修复需要：① 责任方真诚道歉并承担全部责任；② 透明行为（如开放通讯记录）重建安全感；③ 一致性的长期行动证明改变；④ 被伤害方给予有限度的再信任机会；⑤ 双方共同制定未来边界协议。整个过程通常需要6-18个月。"],
      ["异地关系真的能维持吗？", "研究显示异地关系与同地关系在满意度上没有显著差异，但需要更高的关系维护投入。成功因素包括：规律的视频通话、共同的未来计划、信任基础、以及创造性的共享体验（如同步看电影、在线游戏）。"],
      ["什么时候应该结束一段关系？", "考虑结束的信号包括：长期存在不可调和的价值观冲突、持续的虐待或不尊重、关系带来的痛苦远多于成长、一方持续不愿为关系付出努力。做决定前建议先进行关系咨询，确保不是因暂时的困难而放弃。"],
    ],
    en: [
      ["What's the difference between {{T}} and communication issues?", "Relationship problems typically manifest as communication barriers, trust issues, boundary conflicts, etc. Communication is the surface phenomenon, while deeper relationship issues often involve attachment styles, value differences, unmet emotional needs, and other fundamental factors."],
      ["Is frequent arguing in a relationship normal or problematic?", "The frequency of arguments matters less than the pattern. Healthy relationships feature constructive conflict—both parties express needs, listen, and seek solutions. Destructive patterns include criticism, contempt, defensiveness, and stonewalling (Gottman's Four Horsemen)."],
      ["How to repair broken trust?", "Trust repair requires: ① Sincere apology with full responsibility from the responsible party; ② Transparent behavior (e.g., open communication records) to rebuild safety; ③ Consistent long-term action demonstrating change; ④ The hurt party offering limited re-trust opportunities; ⑤ Jointly establishing future boundary agreements. The process typically takes 6-18 months."],
      ["Can long-distance relationships actually work?", "Research shows no significant difference in satisfaction between long-distance and geographically close relationships, but higher maintenance investment is required. Success factors include regular video calls, shared future plans, trust foundation, and creative shared experiences (e.g., synced movie watching, online games)."],
      ["When should you end a relationship?", "Signals to consider ending include: long-standing irreconcilable value conflicts, ongoing abuse or disrespect, relationship causing far more pain than growth, one party consistently unwilling to invest effort. Consider relationship counseling before deciding to ensure temporary difficulties aren't mistaken for fundamental incompatibility."],
    ],
    ms: [
      ["{{T}} dan masalah komunikasi—apa bezanya?", "Masalah hubungan biasanya melibatkan halangan komunikasi, isu kepercayaan, konflik sempadan. Komunikasi adalah fenomena permukaan, manakala isu hubungan yang lebih dalam melibatkan gaya lampiran, perbezaan nilai, keperluan emosi yang tidak dipenuhi."],
      ["Kerap bertengkar—normal atau bermasalah?", "Kekerapan kurang penting daripada corak. Hubungan sihat mempunyai konflik konstruktif. Corak merosakkan termasuk kritikan, penghinaan, pertahanan, dan pengasingan."],
      ["Bagaimana membaiki kepercayaan yang rosak?", "Pembaikan kepercayaan memerlukan: ① Permohonan maaf ikhlas; ② Tingkah laku telus; ③ Tindakan konsisten jangka panjang; ④ Peluang kepercayaan semula yang terhad; ⑤ Perjanjian sempadan masa depan bersama. Proses biasanya 6-18 bulan."],
      ["Bolehkah hubungan jarak jauh bertahan?", "Kajian menunjukkan tiada perbezaan kepuasan yang signifikan. Faktor kejayaan: panggilan video tetap, rancangan masa depan bersama, asas kepercayaan, pengalaman dikongsi kreatif."],
      ["Bila perlu mengakhiri hubungan?", "Tanda termasuk: konflik nilai tidak dapat didamaikan, penderaan atau tidak hormat berterusan, kesakitan melebihi pertumbuhan, satu pihak enggan berusaha. Pertimbangkan kaunseling hubungan sebelum membuat keputusan."],
    ],
    es: [
      ["{{T}} y problemas de comunicación—¿cuál es la diferencia?", "Los problemas de relación suelen manifestarse como barreras de comunicación, problemas de confianza, conflictos de límites. La comunicación es el fenómeno superficial, mientras que los problemas más profundos involucran estilos de apego, diferencias de valores, necesidades emocionales no satisfechas."],
      ["¿Discutir con frecuencia es normal o problemático?", "La frecuencia importa menos que el patrón. Las relaciones saludables tienen conflicto constructivo. Los patrones destructivos incluyen crítica, desprecio, actitud defensiva y aislamiento."],
      ["¿Cómo reparar la confianza rota?", "Requiere: ① Disculpa sincera; ② Comportamiento transparente; ③ Acción consistente a largo plazo; ④ Oportunidades limitadas de reconfianza; ⑤ Acuerdo de límites futuro. El proceso toma 6-18 meses."],
      ["¿Pueden funcionar las relaciones a distancia?", "Sin diferencias significativas en satisfacción. Factores de éxito: videollamadas regulares, planes futuros compartidos, base de confianza, experiencias compartidas creativas."],
      ["¿Cuándo terminar una relación?", "Señales: conflictos de valores irreconciliables, abuso continuo, dolor supera el crecimiento, una parte no invierte esfuerzo. Considere terapia de pareja antes de decidir."],
    ],
    ja: [
      ["{{T}}とコミュニケーション問題の違いは？", "関係の問題はコミュニケーション障壁、信頼問題、境界線の衝突として現れます。コミュニケーションは表面現象で、深い問題は愛着スタイル、価値観の違い、満たされない感情的ニーズを含みます。#VibeCoding"],
      ["頻繁なケンカは正常？問題？", "頻度よりパターンが重要。健全な関係には建設的な対立があります。破壊的パターンには批判、軽蔑、防衛、石垣化があります。"],
      ["壊れた信頼を修復するには？", "①誠実な謝罪、②透明な行動、③一貫した長期的行動、④限定的な再信頼の機会、⑤将来の境界線合意。通常6-18ヶ月かかります。"],
      ["遠距離恋愛は続く？", "満足度に有意差なし。成功要因：定期的なビデオ通話、共通の将来計画、信頼基盤、創造的な共有体験。#EmotionalFitness"],
      ["関係を終わらせるべき時は？", "調整不可能な価値観の対立、継続的な虐待や無礼、痛みが成長を上回る場合。決断前にカップルカウンセリングを検討してください。"],
    ],
    ko: [
      ["{{T}}와 의사소통 문제의 차이는?", "관계 문제는 의사소통 장벽, 신뢰 문제, 경계 충돌로 나타납니다. 의사소통은 표면 현상이며, 깊은 문제는 애착 스타일, 가치관 차이, 충족되지 않은 정서적 필요를 포함합니다.#VibeCoding"],
      ["잦은 싸움은 정상? 문제?", "빈도보다 패턴이 중요합니다. 건강한 관계는 건설적 갈등이 있습니다. 파괴적 패턴에는 비판, 경멸, 방어, 돌담 쌓기가 있습니다."],
      ["무너진 신뢰를 회복하는 방법은?", "①진심 어린 사과, ②투명한 행동, ③일관된 장기적 행동, ④제한된 재신뢰 기회, ⑤미래 경계 합의. 보통 6-18개월 소요됩니다."],
      ["장거리 연애는 지속될 수 있나요?", "만족도에 유의미한 차이 없음. 성공 요인: 정기적 화상 통화, 공동 미래 계획, 신뢰 기반, 창의적 공유 경험.#EmotionalFitness"],
      ["관계를 끝내야 할 때는?", "조정 불가능한 가치관 충돌, 지속적 학대나 무례, 고통이 성장을 초과할 때. 결정 전 커플 상담을 고려하세요."],
    ],
    th: [
      ["{{T}}กับปัญหาการสื่อสารต่างกันอย่างไร?", "ปัญหาความสัมพันธ์มักแสดงเป็นอุปสรรคการสื่อสาร ปัญหาความไว้วางใจ ขัดแย้งเรื่องขอบเขต การสื่อสารเป็นปรากฏการณ์ผิวเผิน ส่วนปัญหาลึกเกี่ยวข้องกับรูปแบบความผูกพัน ความแตกต่างด้านค่านิยม ความต้องการทางอารมณ์ที่ไม่ได้รับการตอบสนอง #VibeCoding"],
      ["การทะเลาะบ่อยเป็นปกติหรือมีปัญหา?", "ความถี่สำคัญน้อยกว่ารูปแบบ ความสัมพันธ์ที่ดีต่อสุขภาพมีความขัดแย้งเชิงสร้างสรรค์ รูปแบบทำลายล้างรวมถึงการวิจารณ์ การดูถูก การตั้งรับ และการสร้างกำแพง"],
      ["วิธีซ่อมแซมความไว้วางใจที่แตกสลาย?", "ต้องใช้: ①ขอโทษอย่างจริงใจ ②พฤติกรรมโปร่งใส ③การกระทำที่สม่ำเสมอระยะยาว ④โอกาสไว้วางใจใหม่แบบจำกัด ⑤ข้อตกลงขอบเขตร่วมกันในอนาคต ใช้เวลา 6-18 เดือน"],
      ["ความสัมพันธ์ทางไกลอยู่รอดได้ไหม?", "งานวิจัยไม่พบความแตกต่างด้านความพึงพอใจ ปัจจัยความสำเร็จ: วิดีโอคอลสม่ำเสมอ แผนอนาคตร่วมกัน ฐานความไว้วางใจ ประสบการณ์ร่วมที่สร้างสรรค์"],
      ["เมื่อไหร่ควรยุติความสัมพันธ์?", "สัญญาณ: ความขัดแย้งด้านค่านิยมที่ไม่อาจประนีประนอม การละเมิดหรือไม่เคารพอย่างต่อเนื่อง ความเจ็บปวดมากกว่าการเติบโต ฝ่ายใดฝ่ายหนึ่งไม่ยอมลงทุน พิจารณาปรึกษาคู่รักก่อนตัดสินใจ #EmotionalFitness"],
    ],
  },
  identity: {
    zh: [
      ["{{T}}和人生目标有什么关系？", "身份认同与人生目标紧密相连。当你清楚\u201C我是谁\u201D时，目标和行动自然对齐。身份危机常常表现为目标迷失——不知道往哪个方向走，因为不清楚自己是谁、想要什么。"],
      ["职业转型中的身份困惑正常吗？", "完全正常。职业转型是身份认同的动态重组过程。研究显示，成功的职业转换者经历一个\u201C身份过渡期\u201D——在放弃旧身份和建立新身份之间，会有不确定感和焦虑。这个过渡期通常持续6-18个月。"],
      ["如何区分真正的自我和外界期待？", "区分方法包括：① 检测情绪——做某件事时是感到活力(authentic)还是耗竭(expectation)；② 想象无人评判时的选择；③ 观察你的身体反应——某些选择是否带来胸口紧缩或腹部放松；④ 与信任的人探讨你内心的矛盾声音。"],
      ["身份危机是否意味着心理问题？", "不一定。身份危机（identity crisis）是Erik Erikson提出的发展心理学概念，是人格发展中的正常阶段。当它在适当的年龄阶段（如青春期、中年过渡期）出现时，是健康成长的标志。只有当它导致持续的功能损害或严重痛苦时，才需要专业干预。"],
      ["文化冲突如何影响身份认同？", "跨文化个体（如移民、第三文化儿童）常常经历文化身份整合的挑战。研究识别出四种文化适应策略：整合（保留原文化+适应新文化）、同化（放弃原文化）、分离（仅保留原文化）、边缘化（两者都排斥）。整合策略与最高的心理适应水平相关。"],
    ],
    en: [
      ["What's the relationship between {{T}} and life purpose?", "Identity and life purpose are deeply connected. When you know who you are, goals and actions align naturally. Identity crisis often manifests as purpose confusion—not knowing which direction to go because you're unclear about who you are and what you want."],
      ["Is identity confusion during career transition normal?", "Completely normal. Career transition is a dynamic process of identity reconstruction. Research shows successful career changers experience an 'identity transition period' characterized by uncertainty and anxiety between relinquishing old identity and establishing a new one. This period typically lasts 6-18 months."],
      ["How to distinguish authentic self from external expectations?", "Methods include: ① Check emotions—does an activity energize you (authentic) or drain you (expectation)?; ② Imagine choices with zero judgment from others; ③ Observe bodily responses—chest tightness or abdominal relaxation with certain choices; ④ Discuss conflicting inner voices with trusted people."],
      ["Does identity crisis indicate mental health problems?", "Not necessarily. Identity crisis is a developmental psychology concept from Erik Erikson—a normal phase in personality development. When occurring at appropriate developmental stages (adolescence, midlife transition), it signals healthy growth. Professional intervention is only needed when it causes sustained functional impairment or severe distress."],
      ["How does cultural conflict affect identity?", "Cross-cultural individuals (e.g., immigrants, third-culture kids) often face cultural identity integration challenges. Research identifies four acculturation strategies: integration (retain original culture + adapt to new), assimilation (abandon original), separation (retain only original), marginalization (reject both). Integration strategy correlates with the highest psychological adaptation."],
    ],
    ms: [
      ["{{T}} dan tujuan hidup—apa hubungannya?", "Identiti dan tujuan hidup berkait rapat. Apabila anda tahu siapa anda, matlamat dan tindakan sejajar secara semula jadi. Krisis identiti sering menjelma sebagai kekeliruan tujuan."],
      ["Kekeliruan identiti semasa perubahan kerjaya—normal?", "Normal sepenuhnya. Perubahan kerjaya adalah proses dinamik pembinaan semula identiti. Tempoh peralihan ini biasanya 6-18 bulan."],
      ["Bagaimana bezakan diri sebenar vs harapan luaran?", "Kaedah: ① Periksa emosi—aktiviti memberi tenaga (autentik) atau menguras (harapan)?; ② Bayangkan pilihan tanpa penghakiman; ③ Perhatikan reaksi badan; ④ Bincang suara dalaman dengan orang dipercayai."],
      ["Adakah krisis identiti menunjukkan masalah kesihatan mental?", "Tidak semestinya. Krisis identiti adalah konsep psikologi perkembangan dari Erik Erikson—fasa normal dalam perkembangan personaliti. Intervensi profesional hanya diperlukan jika ia menyebabkan kemerosotan fungsi berterusan."],
      ["Bagaimana konflik budaya mempengaruhi identiti?", "Individu rentas budaya sering menghadapi cabaran integrasi identiti budaya. Empat strategi akulturasi: integrasi (paling adaptif), asimilasi, pemisahan, marginalisasi."],
    ],
    es: [
      ["{{T}} y propósito de vida—¿qué relación tienen?", "La identidad y el propósito de vida están profundamente conectados. Cuando sabes quién eres, las metas y acciones se alinean naturalmente. La crisis de identidad a menudo se manifiesta como confusión de propósito."],
      ["¿Es normal la confusión de identidad durante la transición profesional?", "Totalmente normal. La transición profesional es un proceso dinámico de reconstrucción de identidad. Este período de transición suele durar 6-18 meses."],
      ["¿Cómo distinguir el yo auténtico de las expectativas externas?", "Métodos: ① Verifique emociones—¿la actividad energiza (auténtico) o agota (expectativa)?; ② Imagine elecciones sin juicio; ③ Observe reacciones corporales; ④ Discuta voces internas con personas de confianza."],
      ["¿La crisis de identidad indica problemas de salud mental?", "No necesariamente. La crisis de identidad es un concepto de la psicología del desarrollo de Erik Erikson—una fase normal en el desarrollo de la personalidad. Solo se necesita intervención si causa deterioro funcional sostenido."],
      ["¿Cómo afecta el conflicto cultural a la identidad?", "Los individuos interculturales a menudo enfrentan desafíos de integración de identidad cultural. Cuatro estrategias de aculturación: integración (más adaptativa), asimilación, separación, marginación."],
    ],
    ja: [
      ["{{T}}と人生の目的の関係は？", "アイデンティティと人生の目的は深く結びついています。自分が誰かを知ると、目標と行動は自然に一致します。#VibeCoding"],
      ["キャリア転換中のアイデンティティ混乱は正常？", "完全に正常。キャリア転換はアイデンティティ再構築の動的プロセスです。移行期間は通常6-18ヶ月続きます。"],
      ["本当の自分と外部の期待をどう区別する？", "方法：①感情をチェック—活力が出る（本物）か消耗する（期待）か；②他者の評価なしでの選択を想像；③身体反応を観察；④信頼できる人と内なる声を話し合う。"],
      ["アイデンティティ危機は精神的問題を示す？", "必ずしもそうではありません。アイデンティティ危機はErik Eriksonの発達心理学概念で、パーソナリティ発達の正常な段階です。持続的な機能障害がある場合のみ専門的介入が必要です。#EmotionalFitness"],
      ["文化的衝突はアイデンティティにどう影響する？", "異文化間の個人は文化アイデンティティ統合の課題に直面します。4つの文化的受容戦略：統合（最も適応的）、同化、分離、疎外。"],
    ],
    ko: [
      ["{{T}}와 인생 목표의 관계는?", "정체성과 인생 목표는 깊이 연결되어 있습니다. 자신이 누군지 알면 목표와 행동이 자연스럽게 일치합니다.#VibeCoding"],
      ["경력 전환 중 정체성 혼란은 정상인가요?", "완전히 정상입니다. 경력 전환은 정체성 재구축의 역동적 과정입니다. 전환 기간은 보통 6-18개월 지속됩니다."],
      ["진정한 나와 외부 기대를 어떻게 구분하나요?", "방법: ①감정 확인—활력이 생기면(진짜) 소진되면(기대); ②타인의 평가 없이 선택 상상; ③신체 반응 관찰; ④신뢰할 수 있는 사람과 내면의 목소리 토론."],
      ["정체성 위기가 정신 건강 문제를 의미하나요?", "꼭 그렇지는 않습니다. 정체성 위기는 Erik Erikson의 발달 심리학 개념으로, 성격 발달의 정상 단계입니다. 지속적 기능 장애가 있을 때만 전문적 개입이 필요합니다.#EmotionalFitness"],
      ["문화적 갈등이 정체성에 미치는 영향은?", "다문화 개인은 문화적 정체성 통합의 도전에 직면합니다. 4가지 문화 수용 전략: 통합(가장 적응적), 동화, 분리, 소외."],
    ],
    th: [
      ["{{T}}กับเป้าหมายชีวิตเกี่ยวข้องกันอย่างไร?", "อัตลักษณ์และเป้าหมายชีวิตเชื่อมโยงกันอย่างลึกซึ้ง เมื่อคุณรู้ว่าคุณคือใคร เป้าหมายและการกระทำจะสอดคล้องกันโดยธรรมชาติ #VibeCoding"],
      ["ความสับสนในอัตลักษณ์ระหว่างเปลี่ยนอาชีพปกติไหม?", "ปกติอย่างสมบูรณ์ การเปลี่ยนอาชีพเป็นกระบวนการปรับโครงสร้างอัตลักษณ์แบบพลวัต ช่วงเปลี่ยนผ่านนี้มักกินเวลา 6-18 เดือน"],
      ["จะแยกตัวตนที่แท้จริงจากความคาดหวังภายนอกได้อย่างไร?", "วิธี: ①ตรวจสอบอารมณ์—กิจกรรมให้พลัง(แท้จริง)หรือทำให้หมด(ความคาดหวัง); ②จินตนาการถึงการเลือกโดยไม่ถูกตัดสิน; ③สังเกตปฏิกิริยาทางร่างกาย; ④ปรึกษาเสียงภายในกับคนที่ไว้ใจ"],
      ["วิกฤตอัตลักษณ์บ่งบอกปัญหาสุขภาพจิตหรือไม่?", "ไม่จำเป็น วิกฤตอัตลักษณ์เป็นแนวคิดจิตวิทยาพัฒนาการของ Erik Erikson—ระยะปกติในการพัฒนาบุคลิกภาพ ต้องการการแทรกแซงเมื่อทำให้การทำงานบกพร่องอย่างต่อเนื่อง"],
      ["ความขัดแย้งทางวัฒนธรรมส่งผลต่ออัตลักษณ์อย่างไร?", "บุคคลข้ามวัฒนธรรมมักเผชิญความท้าทายในการบูรณาการอัตลักษณ์ทางวัฒนธรรม สี่กลยุทธ์: การบูรณาการ(ปรับตัวได้มากที่สุด), การกลมกลืน, การแยกตัว, การถูกกีดกัน #EmotionalFitness"],
    ],
  },
  mindfulness: {
    zh: [
      ["{{T}}和冥想是一回事吗？", "正念（mindfulness）是一种\u201C有意识地、不加评判地关注当下\u201D的心理状态或能力，而冥想是培养正念的一种方法。你可以通过冥想练习正念，也可以通过日常活动（如正念饮食、正念行走）实践正念。冥想≠正念，冥想是培养正念的工具之一。"],
      ["正念对焦虑真的有效吗？", "Meta分析显示，正念减压（MBSR）对焦虑症状的效应量为中等（Cohen's d=0.5-0.6），与CBT的效果相当。正念通过减少对焦虑想法的认同（\u201C我是我的焦虑\u201D\u2192\u201C我有一个焦虑的想法\u201D）来打破焦虑循环。"],
      ["每天需要练习多久正念？", "研究显示即使每天10分钟的正念练习也能产生显著效果。关键在于一致性而非时长——每天练习5分钟的持续效果远远优于每周一次练习60分钟。建议从每天5-10分钟开始，逐步延长。"],
      ["正念和放松有什么区别？", "正念不是放松技术——虽然正念经常带来放松的感觉，但其目标不是\u201C放松\u201D。正念的目的是培养对当下体验的觉知和接纳（包括不愉快的体验），而放松技术的目标是降低生理唤醒水平。正念在治疗慢性疼痛和复发预防方面有放松技术无法替代的效果。"],
      ["为什么正念对一些人\u201C没用\u201D？", "可能原因包括：① 练习时间不足（至少需要4-8周持续练习才可能看到改变）；② 期望不当（期望立刻放松而非培养觉知）；③ 创伤史（密集的正念练习可能触发创伤反应，需要创伤敏感的正念指导）；④ 练习方法不合适（如扫描身体类冥想对有躯体化倾向的个体可能增加焦虑）。"],
    ],
    en: [
      ["Are {{T}} and meditation the same thing?", "Mindfulness is a mental state or capacity characterized by 'paying attention to the present moment on purpose, without judgment.' Meditation is one method to cultivate mindfulness. You can practice mindfulness through meditation or through daily activities (mindful eating, mindful walking). Meditation ≠ mindfulness; meditation is a tool for developing mindfulness."],
      ["Is mindfulness actually effective for anxiety?", "Meta-analyses show MBSR has moderate effect sizes for anxiety symptoms (Cohen's d=0.5-0.6), comparable to CBT. Mindfulness breaks the anxiety cycle by reducing identification with anxious thoughts (shifting from 'I am my anxiety' to 'I have an anxious thought')."],
      ["How long should I practice mindfulness daily?", "Research shows even 10 minutes of daily practice yields significant benefits. Consistency matters more than duration—5 minutes daily consistently outperforms 60 minutes once weekly. Start with 5-10 minutes daily and gradually extend."],
      ["What's the difference between mindfulness and relaxation?", "Mindfulness is not a relaxation technique—although it often produces relaxation as a byproduct, its goal is not relaxation. The aim is cultivating awareness and acceptance of present-moment experience (including unpleasant ones). Relaxation techniques target physiological arousal reduction. Mindfulness has unique effects in chronic pain and relapse prevention that relaxation cannot replace."],
      ["Why doesn't mindfulness work for some people?", "Possible reasons: ① Insufficient practice time (4-8 weeks minimum); ② Incorrect expectations (expecting immediate relaxation rather than awareness cultivation); ③ Trauma history (intensive practice may trigger trauma responses, requiring trauma-sensitive guidance); ④ Inappropriate technique (e.g., body scan may increase anxiety for individuals with somatization tendencies)."],
    ],
    ms: [
      ["Adakah {{T}} dan meditasi perkara yang sama?", "Perhatian penuh (mindfulness) ialah keadaan mental 'memberi perhatian kepada masa kini dengan sengaja, tanpa penghakiman.' Meditasi adalah salah satu kaedah untuk memupuk perhatian penuh. Anda boleh mengamalkan perhatian penuh melalui meditasi atau aktiviti harian. Meditasi ≠ perhatian penuh; meditasi adalah alat untuk mengembangkan perhatian penuh."],
      ["Adakah perhatian penuh berkesan untuk kebimbangan?", "Meta-analisis menunjukkan MBSR mempunyai saiz kesan sederhana untuk gejala kebimbangan (Cohen's d=0.5-0.6), setanding dengan CBT. Perhatian penuh memecahkan kitaran kebimbangan dengan mengurangkan pengenalan dengan fikiran cemas."],
      ["Berapa lama saya perlu mengamalkan perhatian penuh setiap hari?", "Penyelidikan menunjukkan walaupun 10 minit amalan harian memberi manfaat yang ketara. Konsistensi lebih penting daripada tempoh—5 minit setiap hari secara konsisten mengatasi 60 minit seminggu sekali. Mulakan dengan 5-10 minit setiap hari dan tingkatkan secara beransur-ansur."],
      ["Apa perbezaan antara perhatian penuh dan relaksasi?", "Perhatian penuh bukan teknik relaksasi—walaupun ia sering menghasilkan relaksasi sebagai hasil sampingan, matlamatnya bukan relaksasi. Tujuannya adalah memupuk kesedaran dan penerimaan pengalaman masa kini. Teknik relaksasi menyasarkan pengurangan rangsangan fisiologi."],
      ["Mengapa perhatian penuh tidak berkesan untuk sesetengah orang?", "Sebab yang mungkin: ① Masa amalan tidak mencukupi (minimum 4-8 minggu); ② Jangkaan yang salah (mengharapkan relaksasi segera); ③ Sejarah trauma (amalan intensif mungkin mencetuskan tindak balas trauma); ④ Teknik yang tidak sesuai."],
    ],
    es: [
      ["¿Son {{T}} y la meditación lo mismo?", "La atención plena (mindfulness) es un estado mental caracterizado por 'prestar atención al momento presente de manera intencional, sin juzgar.' La meditación es un método para cultivar la atención plena. Meditación ≠ atención plena; la meditación es una herramienta para desarrollar la atención plena."],
      ["¿Es la atención plena realmente efectiva para la ansiedad?", "Los metaanálisis muestran que MBSR tiene tamaños de efecto moderados para síntomas de ansiedad (d de Cohen=0.5-0.6), comparable a la TCC. La atención plena rompe el ciclo de ansiedad al reducir la identificación con pensamientos ansiosos."],
      ["¿Cuánto tiempo debo practicar atención plena al día?", "La investigación muestra que incluso 10 minutos de práctica diaria producen beneficios significativos. La consistencia importa más que la duración: 5 minutos diarios superan consistentemente a 60 minutos una vez por semana. Comience con 5-10 minutos diarios y extienda gradualmente."],
      ["¿Cuál es la diferencia entre atención plena y relajación?", "La atención plena no es una técnica de relajación—aunque a menudo produce relajación como subproducto, su objetivo no es la relajación. Su propósito es cultivar la conciencia y aceptación de la experiencia presente. Las técnicas de relajación se centran en reducir la activación fisiológica."],
      ["¿Por qué la atención plena no funciona para algunas personas?", "Posibles razones: ① Tiempo de práctica insuficiente (mínimo 4-8 semanas); ② Expectativas incorrectas (esperar relajación inmediata); ③ Historial de trauma (la práctica intensiva puede desencadenar respuestas traumáticas); ④ Técnica inapropiada."],
    ],
    ja: [
      ["{{T}}と瞑想は同じものですか？", "マインドフルネスは『意図的に、判断せずに今この瞬間に注意を払う』精神状態です。瞑想はマインドフルネスを育む一つの方法です。瞑想≠マインドフルネス。瞑想はマインドフルネスを開発するためのツールです。"],
      ["マインドフルネスは不安に本当に効果がありますか？", "メタ分析によると、MBSRは不安症状に中程度の効果量（Cohen's d=0.5-0.6）を示し、CBTと同等です。マインドフルネスは不安な思考との同一視を減らすことで不安サイクルを断ち切ります。#VibeCodingの精神で、コーディングのように一歩ずつ練習を積み重ねることが重要です。#EmotionalFitness"],
      ["毎日どれくらい練習すればいいですか？", "研究によると、毎日10分の練習でも有意な効果が得られます。重要なのは時間よりも一貫性です。毎日5分の練習は、週に1回60分の練習よりも効果的です。1日5-10分から始めて、徐々に延ばしていきましょう。"],
      ["マインドフルネスとリラクゼーションの違いは？", "マインドフルネスはリラクゼーション技法ではありません。リラクゼーションを副次的にもたらすことはありますが、目的は『リラックス』ではなく、今この瞬間の経験に対する気づきと受容を育むことです。"],
      ["なぜ一部の人にはマインドフルネスが『効かない』のですか？", "考えられる理由：①練習時間の不足（最低4-8週間必要）；②誤った期待（即時のリラックスを期待）；③トラウマ歴（集中練習がトラウマ反応を誘発する可能性）；④不適切な技法選択。"],
    ],
    ko: [
      ["{{T}}와 명상은 같은 것인가요?", "마음챙김(mindfulness)은 '의도적으로, 판단 없이 현재 순간에 주의를 기울이는' 정신 상태입니다. 명상은 마음챙김을 기르는 하나의 방법입니다. 명상≠마음챙김. 명상은 마음챙김을 개발하는 도구입니다."],
      ["마음챙김이 불안에 실제로 효과가 있나요?", "메타분석에 따르면 MBSR은 불안 증상에 중간 정도의 효과 크기(Cohen's d=0.5-0.6)를 보이며 CBT와 비슷합니다. 마음챙김은 불안한 생각과의 동일시를 줄임으로써 불안 순환을 차단합니다. #VibeCoding 정신으로 코딩하듯이 한 걸음씩 연습을 쌓는 것이 중요합니다. #EmotionalFitness"],
      ["매일 얼마나 연습해야 하나요?", "연구에 따르면 매일 10분의 연습만으로도 상당한 효과가 있습니다. 중요한 것은 시간보다 일관성입니다. 매일 5분의 연습이 주 1회 60분의 연습보다 효과적입니다. 하루 5-10분부터 시작하여 점차 늘려가세요."],
      ["마음챙김과 이완의 차이점은 무엇인가요?", "마음챙김은 이완 기술이 아닙니다. 이완을 부산물로 가져오는 경우가 많지만, 그 목적은 '이완'이 아니라 현재 순간의 경험에 대한 알아차림과 수용을 기르는 것입니다."],
      ["왜 어떤 사람들에게는 마음챙김이 '효과가 없나요'?", "가능한 이유: ① 연습 시간 부족(최소 4-8주 필요); ② 잘못된 기대(즉각적인 이완 기대); ③ 트라우마 병력(집중 연습이 트라우마 반응을 촉발할 수 있음); ④ 부적절한 기법 선택."],
    ],
    th: [
      ["{{T}}กับการทำสมาธิเป็นสิ่งเดียวกันหรือไม่?", "การมีสติ (mindfulness) คือสภาวะทางจิตที่ 'ตั้งใจใส่ใจกับปัจจุบันขณะ โดยไม่ตัดสิน' การทำสมาธิเป็นหนึ่งในวิธีการปลูกฝังสติ การทำสมาธิ≠สติ การทำสมาธิเป็นเครื่องมือในการพัฒนาสติ #VibeCoding"],
      ["การฝึกสติมีประสิทธิภาพจริงสำหรับความวิตกกังวลหรือไม่?", "การวิเคราะห์อภิมานแสดงให้เห็นว่า MBSR มีขนาดผลปานกลางสำหรับอาการวิตกกังวล (Cohen's d=0.5-0.6) เทียบได้กับ CBT การฝึกสติทำลายวงจรวิตกกังวลโดยลดการระบุตัวตนกับความคิดวิตกกังวล"],
      ["ควรฝึกสติวันละเท่าไหร่?", "งานวิจัยแสดงให้เห็นว่าแม้การฝึกวันละ 10 นาทีก็ให้ประโยชน์อย่างมีนัยสำคัญ ความสม่ำเสมอสำคัญกว่าระยะเวลา—การฝึกวันละ 5 นาทีสม่ำเสมอดีกว่าการฝึกสัปดาห์ละครั้ง 60 นาที เริ่มต้นด้วย 5-10 นาทีต่อวันแล้วค่อยๆ เพิ่ม"],
      ["ความแตกต่างระหว่างการฝึกสติและการผ่อนคลายคืออะไร?", "การฝึกสติไม่ใช่เทคนิคการผ่อนคลาย—แม้มักจะนำมาซึ่งความรู้สึกผ่อนคลายเป็นผลพลอยได้ แต่เป้าหมายไม่ใช่การผ่อนคลาย จุดประสงค์คือการปลูกฝังการตระหนักรู้และการยอมรับประสบการณ์ปัจจุบัน"],
      ["ทำไมการฝึกสติถึงไม่ได้ผลสำหรับบางคน?", "สาเหตุที่เป็นไปได้: ① ระยะเวลาฝึกไม่เพียงพอ (ขั้นต่ำ 4-8 สัปดาห์); ② ความคาดหวังไม่ถูกต้อง (คาดหวังการผ่อนคลายทันที); ③ ประวัติการบอบช้ำ (การฝึกเข้มข้นอาจกระตุ้นปฏิกิริยาจากการบอบช้ำ); ④ เทคนิคไม่เหมาะสม #EmotionalFitness"],
    ],
  },
  emotional_health: {
    zh: [
      ["{{T}}和情绪管理是一回事吗？", "情绪健康比情绪管理更全面。情绪管理侧重于控制情绪表达和反应，而情绪健康包括：情绪觉察（准确识别自己的情绪）、情绪理解（理解情绪的原因和功能）、情绪接纳（允许自己感受所有情绪）和情绪调节（灵活有效地回应情绪）。"],
      ["压抑情绪对身体有害吗？", "研究显示，长期情绪压抑与多种健康问题相关：免疫功能下降、心血管反应增高、慢性疼痛加重。表达性写作（expressive writing）——连续3-4天每天写15-20分钟关于情绪体验的文章——已被证明能改善身体健康指标，如减少就医次数。"],
      ["如何区分正常的情绪反应和情绪障碍？", "判断标准包括：① 强度——反应是否远超出触发事件的程度；② 持续时间——情绪是否长期无法回弹（如低情绪持续>2周）；③ 功能损害——是否妨碍工作、学业、人际关系或自我照顾；④ 应对方式——是否依赖不健康策略（酗酒、自伤、过度回避）。"],
      ["情绪调节能力是天生还是可培养的？", "情绪调节能力部分受遗传影响（约30-40%可遗传），但高度可培养。研究表明，情绪调节训练（如辩证行为疗法的情绪调节模块）可以在8-12周内显著改善情绪调节技能，其效果在后续随访中得以维持。"],
      ["为什么有些人的情绪比其他人更强烈？", "情绪强度差异受到多种因素影响：高敏感性人格（highly sensitive person）的神经基础是更活跃的insula和mirror neuron系统；杏仁核基线的激活水平差异影响初始情绪反应强度；前额叶皮层对杏仁核的调控效率影响情绪恢复速度。这些差异有神经基础，但可通过训练进行调整。"],
    ],
    en: [
      ["Is {{T}} the same as emotion management?", "Emotional health is more comprehensive than emotion management. Emotion management focuses on controlling expression and reactions, while emotional health includes: emotional awareness (accurately identifying feelings), emotional understanding (comprehending causes and functions), emotional acceptance (allowing all feelings), and emotional regulation (flexibly and effectively responding to emotions)."],
      ["Is emotional suppression harmful to physical health?", "Research shows chronic emotional suppression correlates with multiple health issues: impaired immune function, elevated cardiovascular reactivity, and worsened chronic pain. Expressive writing—writing about emotional experiences for 15-20 minutes daily for 3-4 consecutive days—has been shown to improve physical health markers, including reduced healthcare visits."],
      ["How to distinguish normal emotional reactions from disorders?", "Criteria include: ① Intensity—is the reaction far beyond what the triggering event warrants?; ② Duration—has mood failed to rebound long-term (e.g., low mood >2 weeks)?; ③ Functional impairment—does it affect work, study, relationships, or self-care?; ④ Coping—does it rely on unhealthy strategies (alcohol, self-harm, excessive avoidance)?"],
      ["Is emotion regulation innate or trainable?", "Emotion regulation capacity is partly influenced by genetics (approximately 30-40% heritable) but is highly trainable. Research shows emotion regulation training (e.g., DBT Emotion Regulation module) can significantly improve skills within 8-12 weeks, with effects maintained at follow-up."],
      ["Why do some people experience more intense emotions than others?", "Emotional intensity differences are influenced by multiple factors: highly sensitive persons show more active insula and mirror neuron systems; baseline amygdala activation levels affect initial emotional response intensity; prefrontal cortex regulation efficiency over the amygdala affects emotional recovery speed. These differences have neural bases but are modifiable through training."],
    ],
    ms: [
      ["Adakah {{T}} sama dengan pengurusan emosi?", "Kesihatan emosi lebih komprehensif daripada pengurusan emosi. Pengurusan emosi memberi tumpuan kepada mengawal ekspresi dan reaksi emosi, manakala kesihatan emosi merangkumi: kesedaran emosi, pemahaman emosi, penerimaan emosi, dan pengawalan emosi."],
      ["Adakah penindasan emosi berbahaya kepada kesihatan fizikal?", "Penyelidikan menunjukkan penindasan emosi kronik berkaitan dengan pelbagai masalah kesihatan: fungsi imun terjejas, kereaktifan kardiovaskular yang tinggi, dan kesakitan kronik yang semakin teruk. Penulisan ekspresif—menulis tentang pengalaman emosi selama 15-20 minit setiap hari selama 3-4 hari berturut-turut—telah terbukti memperbaiki penanda kesihatan fizikal."],
      ["Bagaimana membezakan reaksi emosi normal daripada gangguan?", "Kriteria termasuk: ① Intensiti—adakah reaksi jauh melebihi pencetus?; ② Tempoh—adakah mood gagal kembali pulih?; ③ Gangguan fungsi—adakah ia menjejaskan kerja, pelajaran, hubungan, atau penjagaan diri?; ④ Strategi mengatasi—adakah bergantung kepada tabiat tidak sihat?"],
      ["Adakah keupayaan pengawalan emosi semula jadi atau boleh dilatih?", "Keupayaan pengawalan emosi sebahagiannya dipengaruhi oleh genetik (kira-kira 30-40% diwarisi) tetapi sangat boleh dilatih. Kajian menunjukkan latihan pengawalan emosi dapat meningkatkan kemahiran dengan ketara dalam masa 8-12 minggu."],
      ["Mengapa sesetengah orang mengalami emosi yang lebih kuat daripada yang lain?", "Perbezaan intensiti emosi dipengaruhi oleh pelbagai faktor: asas neurobiologi individu yang sangat sensitif; tahap pengaktifan amygdala; kecekapan korteks prefrontal dalam mengawal amygdala. Perbezaan ini mempunyai asas saraf tetapi boleh diubah suai melalui latihan."],
    ],
    es: [
      ["¿Es {{T}} lo mismo que el manejo de emociones?", "La salud emocional es más integral que el manejo de emociones. El manejo de emociones se centra en controlar la expresión y reacciones, mientras que la salud emocional incluye: conciencia emocional, comprensión emocional, aceptación emocional y regulación emocional."],
      ["¿Es la supresión emocional dañina para la salud física?", "La investigación muestra que la supresión emocional crónica se correlaciona con múltiples problemas de salud: función inmune deteriorada, reactividad cardiovascular elevada y empeoramiento del dolor crónico. La escritura expresiva ha demostrado mejorar los marcadores de salud física."],
      ["¿Cómo distinguir reacciones emocionales normales de trastornos?", "Los criterios incluyen: ① Intensidad—¿la reacción supera con creces lo que justifica el evento?; ② Duración—¿el estado de ánimo no se ha recuperado?; ③ Deterioro funcional—¿afecta el trabajo, estudio, relaciones o autocuidado?; ④ Afrontamiento—¿depende de estrategias no saludables?"],
      ["¿La regulación emocional es innata o entrenable?", "La capacidad de regulación emocional está parcialmente influenciada por la genética (aproximadamente 30-40% heredable) pero es altamente entrenable. La investigación muestra que el entrenamiento en regulación emocional puede mejorar significativamente las habilidades en 8-12 semanas."],
      ["¿Por qué algunas personas experimentan emociones más intensas que otras?", "Las diferencias en intensidad emocional están influenciadas por múltiples factores: bases neurobiológicas de la persona altamente sensible; niveles de activación de la amígdala; eficiencia de la corteza prefrontal en la regulación de la amígdala. Estas diferencias tienen bases neurales pero son modificables mediante entrenamiento."],
    ],
    ja: [
      ["{{T}}と感情管理は同じものですか？", "感情的健康は感情管理よりも包括的です。感情管理は感情表現と反応のコントロールに焦点を当てますが、感情的健康には以下が含まれます：感情認識、感情理解、感情受容、感情調節。#EmotionalFitnessの考え方では、これらすべてをバランスよく育てることが重要です。"],
      ["感情の抑圧は身体に有害ですか？", "研究によると、慢性的な感情抑圧は複数の健康問題と関連しています：免疫機能の低下、心血管反応性の上昇、慢性疼痛の悪化。表現的ライティング（3-4日連続で毎日15-20分、感情体験について書く）は身体的健康マーカーを改善することが示されています。"],
      ["正常な感情反応と障害をどう区別しますか？", "判断基準：①強度—反応が引き金となる出来事をはるかに超えているか？; ②持続期間—気分が長期にわたって回復しないか？; ③機能障害—仕事、学業、人間関係、自己管理に支障をきたすか？; ④対処方法—不健康な戦略（飲酒、自傷、過度の回避）に依存しているか？"],
      ["感情調節能力は生まれつきですか？それとも訓練可能ですか？", "感情調節能力は部分的に遺伝の影響を受けますが（約30-40％が遺伝）、高度に訓練可能です。研究によると、感情調節トレーニング（DBT感情調節モジュールなど）は8-12週間でスキルを大幅に改善できます。#VibeCodingのように、コードを書く感覚で一歩ずつ練習を積むことが上達の鍵です。"],
      ["なぜ一部の人は他の人より感情が強いのですか？", "感情強度の違いは複数の要因の影響を受けます：高感受性の人の神経基盤（より活性化した島皮質とミラーニューロンシステム）；扁桃体のベースライン活性化レベルの違い；前頭前皮質による扁桃体調節効率の差。これらの違いには神経基盤がありますが、訓練によって調整可能です。"],
    ],
    ko: [
      ["{{T}}와 감정 관리는 같은 것인가요?", "정서적 건강은 감정 관리보다 포괄적입니다. 감정 관리는 감정 표현과 반응의 통제에 초점을 맞추지만, 정서적 건강에는 감정 인식, 감정 이해, 감정 수용, 감정 조절이 포함됩니다. #EmotionalFitness 관점에서는 이 모든 것을 균형 있게 기르는 것이 중요합니다."],
      ["감정 억압이 신체 건강에 해로운가요?", "연구에 따르면 만성적인 감정 억압은 여러 건강 문제와 관련됩니다: 면역 기능 저하, 심혈관 반응성 증가, 만성 통증 악화. 표현적 글쓰기(3-4일 연속 매일 15-20분 감정 경험에 대해 쓰기)는 신체 건강 지표를 개선하는 것으로 나타났습니다."],
      ["정상적인 감정 반응과 장애를 어떻게 구분하나요?", "판단 기준: ① 강도—반응이 촉발 사건을 훨씬 초과하는가?; ② 지속 기간—기분이 장기간 회복되지 않는가?; ③ 기능 손상—일, 학업, 관계, 자기 관리에 지장을 주는가?; ④ 대처 방식—건강하지 않은 전략(음주, 자해, 과도한 회피)에 의존하는가?"],
      ["감정 조절 능력은 타고난 것인가요? 훈련 가능한가요?", "감정 조절 능력은 부분적으로 유전의 영향을 받지만(약 30-40% 유전), 매우 훈련 가능합니다. 연구에 따르면 감정 조절 훈련(DBT 감정 조절 모듈 등)은 8-12주 내에 기술을 크게 향상시킬 수 있습니다. #VibeCoding 정신으로 코딩하듯 한 단계씩 연습하는 것이 향상의 비결입니다."],
      ["왜 어떤 사람들은 다른 사람들보다 감정이 더 강한가요?", "감정 강도의 차이는 여러 요인의 영향을 받습니다: 고감수성 사람의 신경 기반(더 활성화된 섬피질과 거울 뉴런 시스템); 편도체의 기준 활성화 수준 차이; 전두엽 피질의 편도체 조절 효율 차이. 이러한 차이에는 신경 기반이 있지만 훈련을 통해 조정 가능합니다."],
    ],
    th: [
      ["{{T}}กับการจัดการอารมณ์เป็นสิ่งเดียวกันหรือไม่?", "สุขภาพทางอารมณ์ครอบคลุมมากกว่าการจัดการอารมณ์ การจัดการอารมณ์เน้นการควบคุมการแสดงออกและปฏิกิริยาทางอารมณ์ ในขณะที่สุขภาพทางอารมณ์รวมถึง: การตระหนักรู้อารมณ์ ความเข้าใจอารมณ์ การยอมรับอารมณ์ และการควบคุมอารมณ์ #VibeCoding"],
      ["การกดอารมณ์เป็นอันตรายต่อสุขภาพร่างกายหรือไม่?", "งานวิจัยแสดงให้เห็นว่าการกดอารมณ์เรื้อรังสัมพันธ์กับปัญหาสุขภาพหลายอย่าง: การทำงานของภูมิคุ้มกันลดลง ปฏิกิริยาหัวใจและหลอดเลือดสูงขึ้น และอาการปวดเรื้อรังแย่ลง การเขียนเชิงแสดงออก—เขียนเกี่ยวกับประสบการณ์ทางอารมณ์วันละ 15-20 นาทีติดต่อกัน 3-4 วัน—ช่วยปรับปรุงตัวชี้วัดสุขภาพร่างกาย"],
      ["จะแยกแยะปฏิกิริยาทางอารมณ์ปกติจากความผิดปกติได้อย่างไร?", "เกณฑ์รวมถึง: ① ความรุนแรง—ปฏิกิริยาเกินกว่าเหตุการณ์กระตุ้นมากหรือไม่?; ② ระยะเวลา—อารมณ์ไม่ฟื้นตัวเป็นเวลานานหรือไม่?; ③ การรบกวนการทำงาน—ส่งผลกระทบต่อการทำงาน การเรียน ความสัมพันธ์ หรือการดูแลตนเองหรือไม่?; ④ การรับมือ—พึ่งพากลยุทธ์ที่ไม่ดีต่อสุขภาพหรือไม่?"],
      ["ความสามารถในการควบคุมอารมณ์เป็นมาแต่กำเนิดหรือฝึกได้?", "ความสามารถในการควบคุมอารมณ์ได้รับอิทธิพลบางส่วนจากพันธุกรรม (ประมาณ 30-40% ถ่ายทอดทางพันธุกรรม) แต่สามารถฝึกฝนได้สูง งานวิจัยแสดงให้เห็นว่าการฝึกควบคุมอารมณ์สามารถพัฒนาทักษะได้อย่างมีนัยสำคัญภายใน 8-12 สัปดาห์"],
      ["ทำไมบางคนถึงมีอารมณ์รุนแรงกว่าคนอื่น?", "ความแตกต่างของความรุนแรงทางอารมณ์ได้รับอิทธิพลจากหลายปัจจัย: พื้นฐานทางประสาทของบุคคลที่ไวต่อสิ่งเร้าสูง; ระดับการทำงานพื้นฐานของอะมิกดาลา; ประสิทธิภาพของคอร์เทกซ์ส่วนหน้าในการควบคุมอะมิกดาลา ความแตกต่างเหล่านี้มีพื้นฐานทางระบบประสาทแต่สามารถปรับเปลี่ยนได้ผ่านการฝึกฝน #EmotionalFitness"],
    ],
  },
}

export function generateDefaultContent(
  lang: Locale,
  topic: { title: string; description: string },
  category: string
): TopicContent {
  const safeCat = (Object.keys(SCIENCE).includes(category) ? category : 'sleep') as keyof typeof SCIENCE
  const rawFaq = FAQ[safeCat]
  const rawScience = SCIENCE[safeCat]
  const rawFitness = FITNESS[safeCat]
  const science = fill(pick(rawScience, lang, rawScience.en ?? ''), topic.title)
  const fitnessGuide = fill(pick(rawFitness, lang, rawFitness.en ?? ''), topic.title)
  const faqRaw = pick(rawFaq, lang, rawFaq.en ?? [])
  const faqItems: TopicFaqItem[] = faqRaw.map(([q, a]) => ({
    q: fill(q, topic.title),
    a: fill(a, topic.title),
  }))

  return { science, fitnessGuide, faqItems }
}