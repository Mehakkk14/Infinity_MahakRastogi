// Translation helper for LegalEase AI
// Converts common legal terms and phrases to Hindi and Hinglish

export type Language = "en" | "hi" | "hinglish"

const riskLabels: Record<Language, Record<string, string>> = {
  en: {},
  hi: {
    "non-compete": "गैर-स्पर्धा",
    "non-compete clause": "गैर-स्पर्धा खंड",
    "intellectual property": "बौद्धिक संपत्ति",
    "ip assignment": "आईपी असाइनमेंट",
    "arbitration": "मध्यस्थता",
    "termination": "समाप्ति",
    "at-will": "इच्छा पर",
    "confidentiality": "गोपनीयता",
    "liability": "दायित्व",
    "indemnification": "क्षतिपूर्ति",
    "overtime": "ओवरटाइम",
    "right to jury trial": "जूरी ट्रायल का अधिकार",
    "binding arbitration": "बाध्यकारी मध्यस्थता",
    "months": "महीने",
    "cannot": "नहीं कर सकते",
    "must": "को अवश्य",
    "will": "होगा",
  },
  hinglish: {
    "non-compete": "Non-compete",
    "non-compete clause": "Non-compete clause",
    "intellectual property": "Intellectual property",
    "ip assignment": "IP assignment",
    "arbitration": "Arbitration",
    "termination": "Termination",
    "at-will": "At-will",
    "confidentiality": "Confidentiality",
    "liability": "Liability",
    "indemnification": "Indemnification",
    "overtime": "Overtime",
    "right to jury trial": "Jury trial ka haq",
    "binding arbitration": "Binding arbitration",
    "months": "mahine",
    "cannot": "nahi kar sakte",
    "must": "ko zaroor",
    "will": "hoga",
  },
}

const severityLabels: Record<Language, Record<string, string>> = {
  en: {
    critical: "Critical",
    high: "High",
    medium: "Medium",
    low: "Low",
  },
  hi: {
    critical: "गंभीर",
    high: "उच्च",
    medium: "मध्यम",
    low: "कम",
  },
  hinglish: {
    critical: "Critical",
    high: "High",
    medium: "Medium",
    low: "Low",
  },
}

const titleLabels: Record<Language, Record<string, string>> = {
  en: {
    "Summary": "Summary",
    "Identified Risks": "Identified Risks",
    "Should I Sign This?": "Should I Sign This?",
    "Safe to Sign": "Safe to Sign",
    "Be Careful": "Be Careful",
    "Do Not Sign": "Do Not Sign",
    "Suggested Amendments": "Suggested Amendments",
    "Negotiation Tips": "Negotiation Tips",
    "Risk Breakdown by Category": "Risk Breakdown by Category",
  },
  hi: {
    "Summary": "सारांश",
    "Identified Risks": "पहचाने गए जोखिम",
    "Should I Sign This?": "क्या मुझे इस पर हस्ताक्षर करने चाहिए?",
    "Safe to Sign": "हस्ताक्षर करने के लिए सुरक्षित",
    "Be Careful": "सावधान रहें",
    "Do Not Sign": "पर हस्ताक्षर न करें",
    "Suggested Amendments": "सुझाए गए संशोधन",
    "Negotiation Tips": "बातचीत के सुझाव",
    "Risk Breakdown by Category": "श्रेणी के अनुसार जोखिम विभाजन",
  },
  hinglish: {
    "Summary": "Summary",
    "Identified Risks": "Identified Risks",
    "Should I Sign This?": "Kya mujhe is par sign karna chahiye?",
    "Safe to Sign": "Sign karne ke liye safe hai",
    "Be Careful": "Dhyan se dekho",
    "Do Not Sign": "Sign mat karo",
    "Suggested Amendments": "Suggested Changes",
    "Negotiation Tips": "Baat-cheet ke tips",
    "Risk Breakdown by Category": "Category ke hisaab se risk breakdown",
  },
}

export function translateSeverity(severity: string, language: Language): string {
  if (language === "en") return severity.charAt(0).toUpperCase() + severity.slice(1)
  return severityLabels[language][severity] || severity
}

export function translateTitle(title: string, language: Language): string {
  if (language === "en") return title
  return titleLabels[language][title] || title
}

export function translateText(text: string, language: Language): string {
  if (language === "en") return text

  let translated = text
  const labels = riskLabels[language]

  if (language === "hi" || language === "hinglish") {
    // Simple replacement for common terms (case-insensitive)
    for (const [english, local] of Object.entries(labels)) {
      const regex = new RegExp(`\\b${english}\\b`, "gi")
      translated = translated.replace(regex, local)
    }
  }

  return translated
}

export function getLanguageLabel(language: Language): string {
  const labels = {
    en: "EN",
    hi: "हिंदी",
    hinglish: "Hinglish",
  }
  return labels[language]
}
