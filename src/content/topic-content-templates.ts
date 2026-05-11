import type { Locale } from '@/types'
import type { TopicContent, TopicFaqItem } from './topics'

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

近年来，正念减压（MBSR）和接纳承诺疗法（ACT）在睡眠领域的应用也获得了充分证据支持。正念练习通过降低睡前认知唤醒水平（如反复思虑和担忧）、减少对"必须睡着"的焦虑性监控，帮助患者打破"失眠-焦虑-失眠加重"的恶性循环。`,
    en: `Sleep is a fundamental physiological process that occupies roughly one-third of our lives. When we discuss {{T}}, understanding its underlying neuroscientific mechanisms is essential.

Human sleep alternates between Non-Rapid Eye Movement (NREM) and Rapid Eye Movement (REM) stages in approximately 90-minute cycles, repeating 4-6 times per night. NREM sleep is further divided into light sleep (N1, N2) and deep slow-wave sleep (N3), the latter being critical for physical restoration and immune function. REM sleep plays a vital role in memory consolidation and emotional regulation.

Approximately 30% of adults worldwide experience some form of sleep disturbance. Insomnia, the most prevalent sleep disorder, affects 10-30% of the general population. Chronic sleep deprivation leads not only to daytime fatigue, reduced attention, memory impairment, and mood instability, but also significantly increases the risk of cardiovascular disease, metabolic syndrome, and immune dysfunction.

From a neurochemical perspective, the sleep-wake cycle is orchestrated by multiple brainstem, hypothalamic, and basal forebrain nuclei. Adenosine accumulates during wakefulness as a homeostatic sleep pressure molecule; melatonin, secreted by the pineal gland, signals the body for nighttime rest; cortisol peaks in the morning to promote alertness.

Evidence-based interventions for {{T}} prioritize Cognitive Behavioral Therapy for Insomnia (CBT-I). Core components include stimulus control (going to bed only when sleepy), sleep restriction (consolidating the sleep window), cognitive restructuring (challenging dysfunctional beliefs about sleep), relaxation training, and sleep hygiene education. Clinical trials consistently demonstrate CBT-I's superior long-term efficacy over pharmacological interventions, without risks of dependence or tolerance.

Mindfulness-Based Stress Reduction (MBSR) and Acceptance and Commitment Therapy (ACT) have also accumulated strong evidence in sleep medicine. By reducing pre-sleep cognitive arousal—particularly rumination and anxious monitoring of sleep—mindfulness practices help disrupt the vicious cycle of insomnia-anxiety-worsening insomnia.`,
    ms: `Tidur adalah proses fisiologi asas yang mengisi kira-kira satu pertiga daripada kehidupan kita. Apabila membincangkan {{T}}, memahami mekanisme neurosaintifiknya adalah penting.

Tidur manusia bergilir antara peringkat Pergerakan Mata Bukan Pantas (NREM) dan Pergerakan Mata Pantas (REM) dalam kitaran kira-kira 90 minit, berulang 4-6 kali setiap malam. Tidur NREM dibahagikan kepada tidur ringan dan tidur dalam (gelombang perlahan), yang penting untuk pemulihan fizikal dan fungsi imun. Tidur REM memainkan peranan dalam konsolidasi ingatan dan regulasi emosi.

Kira-kira 30% orang dewasa di seluruh dunia mengalami gangguan tidur. Insomnia, gangguan tidur paling biasa, menjejaskan 10-30% populasi. Kekurangan tidur kronik membawa kepada keletihan siang hari, penurunan perhatian, gangguan ingatan, ketidakstabilan emosi, dan meningkatkan risiko penyakit kardiovaskular dan sindrom metabolik.

Intervensi berasaskan bukti untuk {{T}} mengutamakan Terapi Tingkah Laku Kognitif untuk Insomnia (CBT-I). Komponen utama termasuk kawalan rangsangan, sekatan tidur, restrukturisasi kognitif, latihan relaksasi, dan pendidikan kebersihan tidur. Kajian klinikal menunjukkan keberkesanan jangka panjang CBT-I mengatasi campur tangan farmakologi tanpa risiko pergantungan.`,
    es: `El sueño es un proceso fisiológico fundamental que ocupa aproximadamente un tercio de nuestras vidas. Al hablar de {{T}}, es esencial comprender sus mecanismos neurocientíficos subyacentes.

El sueño humano alterna entre etapas de Movimiento Ocular No Rápido (NREM) y Movimiento Ocular Rápido (REM) en ciclos de aproximadamente 90 minutos, repitiéndose 4-6 veces por noche. El sueño NREM se divide en sueño ligero y sueño profundo de ondas lentas, fundamental para la restauración física y la función inmunológica. El sueño REM desempeña un papel crucial en la consolidación de la memoria y la regulación emocional.

Aproximadamente el 30% de los adultos en todo el mundo experimenta algún tipo de trastorno del sueño. El insomnio, el trastorno del sueño más prevalente, afecta al 10-30% de la población general. La privación crónica del sueño conduce no solo a fatiga diurna, reducción de la atención, deterioro de la memoria e inestabilidad del estado de ánimo, sino que también aumenta significativamente el riesgo de enfermedades cardiovasculares y síndrome metabólico.

Las intervenciones basadas en evidencia para {{T}} priorizan la Terapia Cognitivo-Conductual para el Insomnio (TCC-I). Los componentes principales incluyen control de estímulos, restricción del sueño, reestructuración cognitiva, entrenamiento en relajación y educación sobre higiene del sueño. Los ensayos clínicos demuestran consistentemente la eficacia superior a largo plazo de la TCC-I sobre las intervenciones farmacológicas.`,
  },
  anxiety: {
    zh: `焦虑是人类最原始也最复杂的情绪之一，其根源深植于我们大脑的演化遗产中。当我们讨论「{{T}}」时，需要从神经生物学和心理学的交叉视角来理解它。

焦虑的神经基础主要涉及杏仁核（amygdala）、前额叶皮层（prefrontal cortex）和海马体（hippocampus）三个关键脑区的互动。杏仁核充当大脑的"烟雾探测器"，负责快速识别潜在威胁；前额叶皮层则扮演"执行控制中心"，负责评估威胁的真实性并调节杏仁核的反应。在焦虑障碍患者中，这一调节回路往往功能失调——杏仁核过度活跃，而前额叶皮层对杏仁核的抑制作用减弱。

全球焦虑障碍的终生患病率约为28.8%，使其成为最常见的精神障碍类别。广泛性焦虑症（GAD）的12个月患病率约为2-6%，社交焦虑障碍约为7-13%，惊恐障碍约为2-3%。女性患焦虑障碍的比例约为男性的1.5-2倍。在经济层面，焦虑障碍每年造成的全球生产力损失超过400亿美元。

认知行为疗法（CBT）是治疗焦虑障碍的一线心理干预，其效果已在数百项随机对照试验中得到验证。CBT的核心策略包括：认知重构（识别并挑战焦虑相关的扭曲思维）、暴露疗法（在安全环境下逐步面对恐惧刺激）、行为实验（检验灾难化预测的真实性）和放松训练（腹式呼吸、渐进性肌松）。

正念疗法通过培养对当下经验的非评判性觉察，帮助患者从"自动化焦虑反应"中脱离出来。研究表明，8周的正念减压（MBSR）课程可以显著降低杏仁核的灰质密度，同时增强前额叶皮层和岛叶的活性，从神经可塑性的层面改变大脑的焦虑反应模式。`,
    en: `Anxiety is among the most primal and complex human emotions, deeply rooted in our evolutionary heritage. When examining {{T}}, a cross-disciplinary understanding bridging neurobiology and psychology is essential.

The neural architecture of anxiety centers on three interconnected regions: the amygdala (serving as the brain's smoke detector for rapid threat identification), the prefrontal cortex (functioning as the executive control center for threat evaluation), and the hippocampus (contextualizing fear memories). In anxiety disorders, this regulatory circuit becomes dysfunctional—the amygdala shows hyperreactivity while prefrontal inhibitory control is attenuated.

Lifetime prevalence of anxiety disorders globally reaches approximately 28.8%, making them the most prevalent class of mental disorders. Generalized Anxiety Disorder has a 12-month prevalence of 2-6%, social anxiety disorder 7-13%, and panic disorder 2-3%. Women are affected at roughly 1.5-2 times the rate of men. The global economic burden of anxiety disorders exceeds $40 billion annually in lost productivity.

Cognitive Behavioral Therapy (CBT) stands as the first-line psychological intervention for anxiety disorders, validated by hundreds of randomized controlled trials. Core CBT strategies include cognitive restructuring (identifying and challenging distorted threat appraisals), exposure therapy (confronting feared stimuli in a graded, safe manner), behavioral experiments (testing catastrophic predictions against reality), and relaxation training.

Mindfulness-based approaches help individuals disengage from automatic anxiety reactions by cultivating non-judgmental present-moment awareness. Eight-week MBSR programs have been shown to reduce amygdala gray matter density while enhancing prefrontal and insular activity—demonstrating neuroplastic changes in the brain's threat-response circuitry.`,
    ms: `Kebimbangan adalah antara emosi manusia yang paling primitif dan kompleks, berakar dalam warisan evolusi kita. Apabila mengkaji {{T}}, pemahaman rentas disiplin yang menghubungkan neurobiologi dan psikologi adalah penting.

Seni bina neural kebimbangan berpusat pada tiga kawasan yang saling berkaitan: amigdala (pengesan asap otak untuk pengenalpastian ancaman pantas), korteks prefrontal (pusat kawalan eksekutif untuk penilaian ancaman), dan hippocampus (mengkontekstualkan ingatan ketakutan). Dalam gangguan kebimbangan, litar regulasi ini menjadi tidak berfungsi.

Prevalens seumur hidup gangguan kebimbangan di peringkat global adalah kira-kira 28.8%, menjadikannya kelas gangguan mental yang paling lazim. Gangguan Kebimbangan Umum mempunyai prevalens 12 bulan sebanyak 2-6%, gangguan kebimbangan sosial 7-13%.

Terapi Tingkah Laku Kognitif (CBT) adalah intervensi psikologi barisan pertama untuk gangguan kebimbangan, disahkan oleh ratusan ujian terkawal rawak. Strategi CBT teras termasuk restrukturisasi kognitif, terapi pendedahan, eksperimen tingkah laku, dan latihan relaksasi.`,
    es: `La ansiedad es una de las emociones humanas más primitivas y complejas, profundamente arraigada en nuestra herencia evolutiva. Al examinar {{T}}, es esencial un enfoque interdisciplinario que conecte la neurobiología y la psicología.

La arquitectura neuronal de la ansiedad se centra en tres regiones interconectadas: la amígdala (detector de humo del cerebro para la identificación rápida de amenazas), la corteza prefrontal (centro de control ejecutivo para la evaluación de amenazas) y el hipocampo (contextualización de recuerdos de miedo). En los trastornos de ansiedad, este circuito regulador se vuelve disfuncional.

La prevalencia de por vida de los trastornos de ansiedad a nivel mundial alcanza aproximadamente el 28.8%, lo que los convierte en la clase más prevalente de trastornos mentales. El Trastorno de Ansiedad Generalizada tiene una prevalencia anual del 2-6%.

La Terapia Cognitivo-Conductual (TCC) es la intervención psicológica de primera línea para los trastornos de ansiedad, validada por cientos de ensayos controlados aleatorios. Las estrategias centrales de la TCC incluyen reestructuración cognitiva, terapia de exposición, experimentos conductuales y entrenamiento en relajación.`,
  },
  grief_loss: {
    zh: `哀伤是人类面对失落时最深刻的情感体验之一。当我们探索「{{T}}」时，理解哀伤的心理学模型能够帮助我们更温柔地陪伴自己和他人走过这段旅程。

哀伤并非线性过程。经典的Kübler-Ross五阶段模型（否认、愤怒、协商、抑郁、接受）被广泛引用，但现代哀伤研究更倾向于认为哀伤是动态、非线性的，人们在不同的情绪状态之间来回摆动。Stroebe和Schut提出的"双程模型"（Dual Process Model）认为，健康的哀伤需要在"失落导向"（面对和沉浸在哀伤中）和"恢复导向"（适应没有逝者的新生活）之间动态切换。

复杂的哀伤障碍（Prolonged Grief Disorder）影响着约7-10%的丧亲者。其核心特征是持续超过12个月的强烈渴望或思念逝者、与逝者相关的情感痛苦、身份认同的瓦解、难以接受失落，以及社交功能退缩。2022年，世界卫生组织将复杂哀伤障碍正式纳入ICD-11诊断分类。

从依恋理论的角度看，哀伤是依恋纽带断裂后的自然反应。安全型依恋的人通常能够更好地整合失落经历，而焦虑型或回避型依恋的人可能发展出更复杂的哀伤反应，前者表现为难以放下，后者表现为情绪回避和抑制。

针对{{T}}的有效干预包括认知行为哀伤治疗（CBT-G）、叙事疗法（帮助重新构建与逝者的联结方式）、以及正念自我 compassion 练习。研究表明，社交支持网络的质量——而非数量——是预测哀伤结果的最强因素之一。`,
    en: `Grief represents one of the most profound human emotional experiences in response to loss. When exploring {{T}}, understanding psychological models of grief helps us navigate this journey with greater compassion.

Grief is not a linear process. While Kübler-Ross's five-stage model (denial, anger, bargaining, depression, acceptance) remains widely referenced, contemporary grief research increasingly recognizes grief as dynamic and oscillatory. Stroebe and Schut's Dual Process Model proposes that healthy grieving involves dynamic oscillation between loss-oriented coping (confronting and immersing in grief) and restoration-oriented coping (adapting to life without the deceased).

Prolonged Grief Disorder affects approximately 7-10% of bereaved individuals. Core features include intense yearning or longing for the deceased persisting beyond 12 months, emotional pain associated with the loss, identity disruption, difficulty accepting the loss, and social withdrawal. The WHO formally recognized Prolonged Grief Disorder in ICD-11 in 2022.

From an attachment theory perspective, grief represents the natural response to attachment bond disruption. Securely attached individuals typically integrate loss experiences more adaptively, while those with anxious or avoidant attachment styles may develop more complicated grief reactions.

Effective interventions for {{T}} include Cognitive Behavioral Grief Therapy (CBT-G), narrative therapy to reconstruct connections with the deceased, and mindfulness-based self-compassion practices. Research consistently shows that the quality—not quantity—of social support networks is among the strongest predictors of grief outcomes.`,
    ms: `Kesedihan mewakili salah satu pengalaman emosi manusia yang paling mendalam sebagai tindak balas kepada kehilangan. Apabila meneroka {{T}}, memahami model psikologi kesedihan membantu kita menavigasi perjalanan ini dengan lebih belas kasihan.

Kesedihan bukan proses linear. Walaupun model lima peringkat Kübler-Ross masih dirujuk secara meluas, penyelidikan kontemporari semakin mengiktiraf kesedihan sebagai dinamik dan berayun.

Gangguan Kesedihan Berpanjangan menjejaskan kira-kira 7-10% individu yang berkabung. Ciri teras termasuk kerinduan intensif yang berterusan melebihi 12 bulan, kesukaran menerima kehilangan, dan penarikan sosial. WHO secara rasmi mengiktiraf Gangguan Kesedihan Berpanjangan dalam ICD-11 pada 2022.

Intervensi berkesan untuk {{T}} termasuk Terapi Kesedihan Kognitif Tingkah Laku, terapi naratif, dan amalan belas kasihan diri berasaskan kesedaran. Kualiti rangkaian sokongan sosial adalah antara peramal terkuat hasil kesedihan.`,
    es: `El duelo representa una de las experiencias emocionales humanas más profundas en respuesta a la pérdida. Al explorar {{T}}, comprender los modelos psicológicos del duelo nos ayuda a navegar este viaje con mayor compasión.

El duelo no es un proceso lineal. Aunque el modelo de cinco etapas de Kübler-Ross sigue siendo ampliamente referenciado, la investigación contemporánea reconoce cada vez más el duelo como dinámico y oscilante.

El Trastorno de Duelo Prolongado afecta aproximadamente al 7-10% de las personas en duelo. Las características principales incluyen anhelo intenso que persiste más allá de 12 meses, dificultad para aceptar la pérdida y retraimiento social. La OMS reconoció formalmente este trastorno en la CIE-11 en 2022.

Las intervenciones efectivas para {{T}} incluyen Terapia Cognitivo-Conductual para el Duelo, terapia narrativa y prácticas de autocompasión basadas en mindfulness. La calidad de las redes de apoyo social es uno de los predictores más fuertes de los resultados del duelo.`,
  },
  loneliness: {
    zh: `孤独是人类普遍却最不被理解的情感之一。当我们审视「{{T}}」时，需要区分"独处"（solitude）和"孤独感"（loneliness）这两个本质不同的概念。独处是主动选择的物理状态，而孤独感是被动的、主观的痛苦体验——感觉与他人在情感上失去联结。

神经科学的研究揭示了一个惊人的发现：社会排斥和身体疼痛激活的是相同的大脑区域——前扣带皮层（dorsal anterior cingulate cortex）和前脑岛（anterior insula）。这意味着"心碎"不仅是诗意的比喻，更是神经层面的真实体验。Cacioppo的进化理论认为，孤独感作为一种进化信号，就像饥饿和口渴一样，促使我们修复和重建社会纽带。

慢性孤独感对健康的影响不容小觑。研究表明，长期孤独对死亡率的预测效应与每天吸15支烟相当，甚至超过了肥胖和缺乏运动的影响。孤独感与高血压、免疫功能抑制、睡眠质量下降、认知功能减退和抑郁症的发病风险显著相关。在老年人群中，孤独感使痴呆症风险增加约50%。

有效应对{{T}}需要多维度的策略。认知行为疗法可以帮助识别和改变导致社交退缩的负面预期（如"我不受欢迎"、"别人会觉得我无聊"）。社交技能训练和逐步暴露练习可以帮助重建社交信心。同时，质量优于数量——即使只有一两个深度的亲密关系，也能显著缓冲孤独感带来的健康风险。

正念自我慈悲练习（Mindful Self-Compassion）对孤独感尤其有益。当我们学会在自己的陪伴中感到安稳，孤独感——这种"与他人分离"的痛苦——会逐渐被"与自己联结"的平静所取代。`,
    en: `Loneliness is one of humanity's most universal yet least understood emotions. When examining {{T}}, it's crucial to distinguish between solitude (a chosen physical state) and loneliness (a subjective, painful experience of perceived social disconnection).

Neuroscientific research has revealed a striking finding: social rejection and physical pain activate overlapping brain regions—the dorsal anterior cingulate cortex and anterior insula. This means "heartache" is not merely poetic metaphor but a genuine neural experience. Cacioppo's evolutionary theory posits that loneliness, like hunger or thirst, evolved as a signal motivating us to repair and rebuild social bonds.

Chronic loneliness has profound health impacts. Research shows that prolonged loneliness predicts mortality at rates comparable to smoking 15 cigarettes daily, exceeding the effects of obesity and physical inactivity. Loneliness is significantly associated with hypertension, immune suppression, sleep disruption, cognitive decline, and increased depression risk. Among older adults, loneliness increases dementia risk by approximately 50%.

Effective approaches for {{T}} require multi-dimensional strategies. CBT helps identify and modify negative social expectations that perpetuate withdrawal. Social skills training and graded exposure rebuild social confidence. Critically, quality trumps quantity—even one or two deep, meaningful relationships significantly buffer against loneliness-related health risks.

Mindful Self-Compassion practice proves particularly beneficial. As we learn to feel at home in our own company, the pain of feeling separate from others gradually gives way to the peace of feeling connected to ourselves.`,
    ms: `Kesunyian adalah salah satu emosi yang paling universal tetapi paling kurang difahami. Apabila mengkaji {{T}}, adalah penting untuk membezakan antara kesendirian (keadaan fizikal yang dipilih) dan kesunyian (pengalaman subjektif yang menyakitkan).

Penyelidikan neurosaintifik mendedahkan bahawa penolakan sosial dan kesakitan fizikal mengaktifkan kawasan otak yang sama—korteks cingulate anterior dorsal dan insula anterior. Ini bermakna "sakit hati" bukan sekadar metafora puitis tetapi pengalaman neural yang tulen.

Kesunyian kronik mempunyai kesan kesihatan yang mendalam. Penyelidikan menunjukkan kesunyian berpanjangan meramalkan kematian pada kadar setanding dengan merokok 15 batang rokok setiap hari. Kesunyian dikaitkan dengan hipertensi, penindasan imun, gangguan tidur, dan penurunan kognitif.

Pendekatan berkesan untuk {{T}} memerlukan strategi pelbagai dimensi. CBT membantu mengenal pasti dan mengubah jangkaan sosial negatif. Kualiti hubungan mengatasi kuantiti—walaupun satu atau dua hubungan bermakna dapat melindungi daripada risiko kesihatan berkaitan kesunyian.`,
    es: `La soledad es una de las emociones más universales y menos comprendidas de la humanidad. Al examinar {{T}}, es crucial distinguir entre la soledad física (un estado elegido) y la soledad emocional (una experiencia subjetiva dolorosa de desconexión social percibida).

La investigación neurocientífica ha revelado un hallazgo sorprendente: el rechazo social y el dolor físico activan regiones cerebrales superpuestas: la corteza cingulada anterior dorsal y la ínsula anterior. Esto significa que el "dolor de corazón" no es solo una metáfora poética sino una experiencia neuronal genuina.

La soledad crónica tiene profundos impactos en la salud. Las investigaciones muestran que la soledad prolongada predice la mortalidad a tasas comparables a fumar 15 cigarrillos al día. La soledad se asocia significativamente con hipertensión, supresión inmunológica, alteraciones del sueño y deterioro cognitivo.

Los enfoques efectivos para {{T}} requieren estrategias multidimensionales. La TCC ayuda a identificar y modificar expectativas sociales negativas. La calidad de las relaciones supera a la cantidad: incluso una o dos relaciones significativas pueden proteger contra los riesgos para la salud relacionados con la soledad.`,
  },
  self_worth: {
    en: `{{T}} is fundamentally about how we perceive and evaluate our own value as human beings. Unlike self-esteem (which fluctuates with achievements and failures), self-worth is a deeper conviction about our inherent value—independent of performance, appearance, or others' approval.

Psychological research distinguishes between contingent self-worth (dependent on meeting certain standards) and true self-worth (stable, unconditional). The former creates a psychological treadmill where you must continuously prove your value, while the latter provides a secure foundation for authentic living.

Low self-worth often originates from early attachment experiences, repeated invalidation, or internalized critical voices. However, neuroplasticity research demonstrates that our self-evaluation systems remain malleable throughout life. Repetitive practice of self-compassion and cognitive reappraisal can literally rewire the neural circuits underlying self-evaluation.

The path to strengthening {{T}} involves three evidence-based components: recognizing and questioning the inner critic without engaging in a battle with it, cultivating self-compassion as a default response to perceived failures, and gradually internalizing successes through deliberate savoring rather than dismissing them as exceptions.`,
    zh: `{{T}}关乎我们如何感知和评价自己作为人类的内在价值。与自尊（因成就和失败而波动）不同，自我价值是一种更深层的核心信念——它独立于表现、外表和他人的认可。

心理学研究区分了条件性自我价值（依赖于满足特定标准）和真正的自我价值（稳定的、无条件的）。前者制造了一个心理跑步机——你必须不断证明自己的价值；后者则为真实生活提供了安全基础。

低自我价值通常源于早期依恋经历、反复的否定或内化的批评声音。然而，神经可塑性研究表明，自我评价系统在整个人生中保持可塑性。自我慈悲和认知重评的反复练习可以从根本上重塑自我评价的神经回路。

强化{{T}}的循证路径包括三个核心成分：识别并质疑内心批评者（不与它开战）、将自我慈悲培养为面对失败时的默认反应、以及通过从容品味（而非敷衍否定）来逐步内化成功体验。`,
  },
  relationships: {
    en: `{{T}} form the fabric of human experience. From attachment theory pioneered by John Bowlby to modern interpersonal neuroscience, research consistently shows that the quality of our relationships is the single strongest predictor of physical and mental health outcomes—stronger than smoking, exercise, or diet.

The 75-year Harvard Study of Adult Development, one of the longest longitudinal studies in history, concluded that the people who were most satisfied in their relationships at age 50 were the healthiest at age 80. Relationship quality predicted health outcomes better than cholesterol levels or blood pressure.

Modern relationship science focuses on several key factors: communication patterns (particularly the ability to repair after conflict), emotional attunement (accurately perceiving and responding to a partner's emotional state), and shared meaning systems. Gottman's research identifies that the ratio of positive to negative interactions during conflict must remain above 5:1 for relationships to thrive.

When faced with {{T}}, the most effective interventions include emotionally focused therapy (EFT), which has shown 70-75% recovery rates for relationship distress, and systematic training in communication skills that address the specific patterns of interaction rather than surface-level content of conflicts.`,
    zh: `{{T}}构成了人类经验的基底。从Bowlby的依恋理论到现代人际神经科学，研究一致表明：关系质量是身心健康最强的预测因子——比吸烟、运动或饮食的影响更大。

历时75年的哈佛成人发展研究——史上最长的纵向研究之一——得出结论：50岁时对关系最满意的人，到80岁时最健康。关系质量比胆固醇水平或血压更能预测健康结果。

现代关系科学聚焦几个关键因素：沟通模式（特别是冲突后的修复能力）、情绪调谐（准确感知并回应伴侣的情绪状态）、以及共享的意义系统。Gottman的研究指出，冲突中积极与消极互动的比例必须保持在5:1以上，关系才能蓬勃发展。

面对{{T}}时，最有效的干预包括情绪聚焦疗法（EFT，对关系痛苦有70-75%的恢复率），以及针对具体互动模式（而非冲突的表面内容）的系统性沟通技能训练。`,
  },
  identity: {
    en: `{{T}} is the answer to the question "Who am I?"—a complex integration of personal history, values, beliefs, social roles, and future aspirations. Erik Erikson's stage theory of psychosocial development identifies identity versus role confusion as the central crisis of adolescence, but contemporary research recognizes that identity formation is a lifelong process of revision and integration.

Modern identity research has moved beyond Erikson's framework to explore identity as a dynamic narrative. Dan McAdams' narrative identity theory proposes that people construct their identity through internalized, evolving life stories that integrate past experiences with imagined futures. The coherence and complexity of these narratives predict psychological well-being more strongly than any specific identity content.

Identity exploration involves two key dimensions: exploration (actively questioning and seeking information about possible identities) and commitment (making firm choices about identity direction). Marcia's identity status model identifies four statuses: achievement (exploration followed by commitment), moratorium (active exploration without commitment), foreclosure (commitment without exploration), and diffusion (neither exploration nor commitment).

When navigating {{T}}, the most adaptive approach involves what developmental psychologists call identity integration—the ability to hold multiple aspects of identity (professional, personal, cultural, relational) in a coherent whole rather than feeling fragmented or forced to choose between competing identity commitments.`,
    zh: `{{T}}是对"我是谁"这一问题的回答——个人历史、价值观、信念、社会角色和未来抱负的复杂整合。Erikson的心理社会发展阶段理论将身份认同vs角色混乱确定为青春期的核心危机，但当代研究认识到，身份形成是一个毕生的修正与整合过程。

现代身份研究已超越Erikson的框架，将身份视为动态叙事。McAdams的叙事身份理论认为，人们通过内化、演变的生命故事来构建身份，这些故事将过去经验与想象的未来整合在一起。这些叙事的连贯性和复杂性比任何具体的身份内容更能预测心理健康。

身份探索涉及两个关键维度：探索（主动质疑和寻求关于可能身份的信息）和承诺（对身份方向做出坚定选择）。Marcia的身份状态模型识别出四种状态：成就（探索后的承诺）、暂停（活跃探索但未承诺）、封闭（未经探索的承诺）和扩散（既无探索也无承诺）。

当面临{{T}}时，最具适应性的方法是发展心理学家所说的身份整合——能够将多个身份面向（职业的、个人的、文化的、关系的）保持在一个连贯的整体中，而不是感到分裂或被迫在不同身份承诺之间做选择。`,
  },
  mindfulness: {
    en: `{{T}} is the psychological capacity to pay attention to the present moment with intention, curiosity, and without judgment. While rooted in ancient contemplative traditions (particularly Buddhist vipassana and Zen), mindfulness has been extensively studied in modern neuroscience and clinical psychology over the past four decades.

The neurological effects of mindfulness practice are well-documented: regular practice increases gray matter density in the prefrontal cortex (improving executive function and emotional regulation), reduces amygdala reactivity (decreasing automatic stress responses), and strengthens the insula (enhancing interoceptive awareness and empathy). These changes are measurable after as little as 8 weeks of regular practice, as demonstrated in Kabat-Zinn's landmark MBSR (Mindfulness-Based Stress Reduction) research.

Importantly, {{T}} is not about emptying the mind or achieving a special state of relaxation. It is about developing a different relationship with experience—one characterized by approach rather than avoidance, curiosity rather than judgment, and stability rather than reactivity. This shift in relationship to experience is what produces the therapeutic benefits.

The core skills of mindfulness include: focused attention (sustaining attention on a chosen object, typically the breath), open monitoring (maintaining awareness of whatever arises without getting caught in it), and loving-kindness (cultivating positive emotional states toward self and others). Each skill engages partially distinct neural networks and produces different clinical outcomes.`,
    zh: `{{T}}是用意图、好奇和不评判的态度关注当下的心理能力。虽然根植于古老的沉思传统（特别是佛教内观和禅宗），正念在过去四十年中已在现代神经科学和临床心理学中得到广泛研究。

正念练习的神经效应有充分证据：规律练习增加前额叶皮层的灰质密度（改善执行功能和情绪调节），降低杏仁核反应性（减少自动压力反应），并增强脑岛（提升内感受觉知和共情能力）。Kabat-Zinn里程碑式的MBSR（正念减压）研究证明，仅8周的规律练习即可测量到这些变化。

重要的是，{{T}}不是关于清空头脑或达到某种特殊的放松状态。它是关于发展与体验的不同关系——以接近而非回避、好奇而非评判、稳定而非反应为特征。正是这种与体验关系的转变产生了治疗效果。

正念的核心技能包括：专注注意（在选定对象上维持注意力，通常是呼吸）、开放监控（对任何出现的内容保持觉知而不陷入其中）、以及慈心（培育对自己和他人的积极情绪状态）。每种技能激活部分不同的神经网络，产生不同的临床效果。`,
  },
  emotional_health: {
    en: `{{T}} refers to the capacity to experience, understand, regulate, and express emotions in ways that promote well-being and adaptive functioning. It is not the absence of negative emotions but the flexibility to respond to emotional experiences effectively rather than reactively.

The component model of emotional health includes four interrelated skills. Emotional awareness is the ability to accurately identify and label emotions as they occur—a skill that predicts better mental health outcomes across diverse populations. Emotional understanding refers to comprehension of the causes, functions, and trajectories of emotions. Emotional acceptance involves allowing emotions to be present without fighting them, suppressing them, or being controlled by them. Emotional regulation encompasses the strategies used to influence the intensity, duration, and expression of emotions.

Gross's process model of emotion regulation identifies five families of strategies organized by when they intervene in the emotion-generative process: situation selection, situation modification, attentional deployment, cognitive change, and response modulation. Cognitive reappraisal (changing how we think about a situation) is consistently associated with better emotional health outcomes, while expressive suppression (hiding emotional expression) is associated with worse outcomes.

To improve {{T}}, the most effective approaches include cognitive-behavioral therapy (which modifies maladaptive cognitive appraisals), dialectical behavior therapy skills (particularly distress tolerance and emotion regulation modules), and acceptance and commitment therapy (which enhances psychological flexibility in relating to emotions).`,
    zh: `{{T}}是以促进幸福和适应性功能的方式体验、理解、调节和表达情绪的能力。它不是没有负性情绪，而是灵活有效地回应情绪体验而非被动反应的能力。

情绪健康的成分模型包括四个相互关联的技能。情绪觉察是准确识别和标记情绪的能力——这是跨不同人群预测心理健康结果的强因子。情绪理解是对情绪的原因、功能和轨迹的理解。情绪接纳是允许情绪存在，不与它战斗、不压抑、也不被它控制。情绪调节包括用于影响情绪强度、持续时间和表达方式的策略。

Gross的情绪调节过程模型识别了五类策略，按它们在情绪生成过程中的干预时机组织：情境选择、情境修正、注意部署、认知改变和反应调节。认知重评（改变我们对情境的思考方式）始终与更好的情绪健康结果相关，而表达抑制（隐藏情绪表达）与更差的结果相关。

改善{{T}}的最有效方法包括：认知行为疗法（修正适应不良的认知评估）、辩证行为疗法技能（特别是痛苦耐受和情绪调节模块）、以及接纳承诺疗法（增强与情绪相关的心理灵活性）。`,
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