import type { Locale } from "@/types"

const DISCLAIMER_TEXT: Record<Locale, { heading: string; body: string }> = {
  zh: {
    heading: "⚠️ 医疗免责声明",
    body: "DeepCalm AI 提供的内容仅供教育和信息参考之用，不构成医疗建议、诊断或治疗。如果你正在经历严重的心理健康危机，请立即联系当地的心理健康热线或急诊服务。DeepCalm AI 不能替代专业的医疗建议、诊断或治疗。始终寻求合格的健康提供者的建议。",
  },
  en: {
    heading: "⚠️ Medical Disclaimer",
    body: "The content provided by DeepCalm AI is for educational and informational purposes only and does not constitute medical advice, diagnosis, or treatment. If you are experiencing a serious mental health crisis, please contact your local mental health helpline or emergency services immediately. DeepCalm AI is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your qualified health provider.",
  },
  ms: {
    heading: "⚠️ Penafian Perubatan",
    body: "Kandungan yang disediakan oleh DeepCalm AI adalah untuk tujuan pendidikan dan maklumat sahaja dan tidak membentuk nasihat perubatan, diagnosis, atau rawatan. Jika anda mengalami krisis kesihatan mental yang serius, sila hubungi talian bantuan kesihatan mental tempatan atau perkhidmatan kecemasan dengan segera. DeepCalm AI bukan pengganti untuk nasihat perubatan profesional.",
  },
  ja: {
    heading: "⚠️ 医学的免責事項",
    body: "DeepCalm AI が提供するコンテンツは教育および情報提供のみを目的としており、医療アドバイス、診断、治療を構成するものではありません。深刻なメンタルヘルスの危機を経験している場合は、直ちに地域のメンタルヘルスホットラインまたは救急サービスに連絡してください。DeepCalm AI は専門的な医療アドバイス、診断、治療の代わりにはなりません。",
  },
  ko: {
    heading: "⚠️ 의학적 면책 조항",
    body: "DeepCalm AI가 제공하는 콘텐츠는 교육 및 정보 제공 목적으로만 제공되며 의학적 조언, 진단 또는 치료를 구성하지 않습니다. 심각한 정신 건강 위기를 겪고 있다면 즉시 지역 정신 건강 핫라인이나 응급 서비스에 연락하십시오. DeepCalm AI는 전문 의학적 조언, 진단 또는 치료를 대체할 수 없습니다.",
  },
  th: {
    heading: "⚠️ ข้อปฏิเสธความรับผิดชอบทางการแพทย์",
    body: "เนื้อหาที่ให้โดย DeepCalm AI มีวัตถุประสงค์เพื่อการศึกษาและข้อมูลเท่านั้น และไม่ได้ให้คำแนะนำทางการแพทย์ การวินิจฉัย หรือการรักษา หากคุณกำลังประสบวิกฤตสุขภาพจิตอย่างรุนแรง โปรดติดต่อสายด่วนสุขภาพจิตในพื้นที่หรือบริการฉุกเฉินทันที DeepCalm AI ไม่ใช่สิ่งทดแทนคำแนะนำทางการแพทย์ การวินิจฉัย หรือการรักษาจากผู้เชี่ยวชาญ",
  },
  es: {
    heading: "⚠️ Aviso Médico",
    body: "El contenido proporcionado por DeepCalm AI es solo para fines educativos e informativos y no constituye asesoramiento médico, diagnóstico o tratamiento. Si estás experimentando una crisis grave de salud mental, comunícate de inmediato con tu línea de ayuda de salud mental local o con los servicios de emergencia. DeepCalm AI no es un sustituto del asesoramiento, diagnóstico o tratamiento médico profesional.",
  },
}

interface MedicalDisclaimerProps {
  locale: Locale
}

export default function MedicalDisclaimer({ locale }: MedicalDisclaimerProps) {
  const text = DISCLAIMER_TEXT[locale] || DISCLAIMER_TEXT.en

  return (
    <div className="border-t border-nord-border/10 bg-nord-bg/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-[11px] leading-relaxed text-nord-text/30 text-center">
          <span className="font-semibold text-nord-text/40">{text.heading}</span>
          <span className="mx-1.5 text-nord-text/20">·</span>
          {text.body}
        </p>
      </div>
    </div>
  )
}
