// Translation helper for LegalEase AI
// Converts legal analysis results to Hindi and Hinglish

export type Language = "en" | "hi" | "hinglish"

// Comprehensive term translation dictionary
const legalTerms: Record<Language, Record<string, string>> = {
  en: {},
  hi: {
    // Common legal terms
    "non-compete": "गैर-स्पर्धा",
    "non-compete clause": "गैर-स्पर्धा खंड",
    "intellectual": "बौद्धिक",
    "property": "संपत्ति",
    "intellectual property": "बौद्धिक संपत्ति",
    "ip assignment": "आईपी असाइनमेंट",
    "arbitration": "मध्यस्थता",
    "termination": "समाप्ति",
    "at-will": "इच्छा पर",
    "confidentiality": "गोपनीयता",
    "liability": "दायित्व",
    "indemnification": "क्षतिपूर्ति",
    "overtime": "ओवरटाइम",
    "jury trial": "जूरी ट्रायल",
    "binding": "बाध्यकारी",
    "months": "महीने",
    "cannot": "नहीं कर सकते",
    "must": "को अवश्य",
    "will": "होगा",
    "compensation": "मुआवजा",
    "benefits": "लाभ",
    "health insurance": "स्वास्थ्य बीमा",
    "retirement": "सेवानिवृत्ति",
    "agreement": "समझौता",
    "contract": "अनुबंध",
    "employee": "कर्मचारी",
    "employer": "नियोक्ता",
    "company": "कंपनी",
    "work": "काम",
    "hours": "घंटे",
    "work hours": "कार्य घंटे",
    "restrictions": "प्रतिबंध",
    "clause": "खंड",
    "risky": "जोखिम भरा",
    "critical": "गंभीर",
    "high": "उच्च",
    "medium": "मध्यम",
    "low": "कम",
  },
  hinglish: {
    "non-compete": "Non-compete",
    "non-compete clause": "Non-compete clause",
    "intellectual": "intellectual",
    "property": "property",
    "intellectual property": "IP",
    "ip assignment": "IP assignment",
    "arbitration": "arbitration",
    "termination": "termination",
    "at-will": "at-will",
    "confidentiality": "confidentiality",
    "liability": "liability",
    "indemnification": "indemnification",
    "overtime": "overtime",
    "jury trial": "jury ka trial",
    "binding": "binding",
    "months": "mahine",
    "cannot": "nahi kar sakte",
    "must": "ko zaroor",
    "will": "hoga",
    "compensation": "compensation",
    "benefits": "benefits",
    "health insurance": "health insurance",
    "retirement": "retirement",
    "agreement": "agreement",
    "contract": "contract",
    "employee": "employee",
    "employer": "employer",
    "company": "company",
    "work": "kaam",
    "hours": "ghante",
    "work hours": "kaam ke ghante",
    "restrictions": "restrictions",
    "clause": "clause",
    "risky": "risky",
    "critical": "critical",
    "high": "high",
    "medium": "medium",
    "low": "low",
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
    "Risk Breakdown by Category": "Category wise risk breakdown",
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

// Smart text translation - translates individual words in longer text
export function smartTranslateText(text: string, language: Language): string {
  if (language === "en") return text

  let result = text
  const terms = legalTerms[language]

  // Sort by length (longest first) to match longer phrases first
  const sortedTerms = Object.entries(terms).sort((a, b) => b[0].length - a[0].length)

  for (const [english, translated] of sortedTerms) {
    // Case-insensitive replacement for whole words
    const regex = new RegExp(`\\b${english}\\b`, "gi")
    result = result.replace(regex, translated)
  }

  return result
}

export function getLanguageLabel(language: Language): string {
  const labels = {
    en: "EN",
    hi: "हिंदी",
    hinglish: "Hinglish",
  }
  return labels[language]
}

// Translate entire analysis result
export function translateAnalysisResult(result: any, language: Language): any {
  if (language === "en") return result

  return {
    ...result,
    summary: smartTranslateText(result.summary, language),
    decisionReason: smartTranslateText(result.decisionReason, language),
    risks: result.risks?.map((risk: any) => ({
      ...risk,
      issue: smartTranslateText(risk.issue, language),
      explanation: smartTranslateText(risk.explanation, language),
      severity: translateSeverity(risk.severity, language),
    })) || [],
    amendments: result.amendments?.map((amendment: any) => ({
      ...amendment,
      original: smartTranslateText(amendment.original, language),
      suggested: smartTranslateText(amendment.suggested, language),
      reasoning: smartTranslateText(amendment.reasoning, language),
    })) || [],
    negotiationTips: result.negotiationTips?.map((tip: any) => ({
      ...tip,
      risk: smartTranslateText(tip.risk, language),
      suggestion: smartTranslateText(tip.suggestion, language),
      industry_standard: smartTranslateText(tip.industry_standard, language),
    })) || [],
    riskBreakdown: result.riskBreakdown?.map((breakdown: any) => ({
      ...breakdown,
      category: smartTranslateText(breakdown.category, language),
    })) || [],
  }
}
