// Translation helper for LegalEase AI
// Converts legal analysis results to Hindi and Hinglish - COMPLETE translations only

export type Language = "en" | "hi" | "hinglish"

// Comprehensive translations for complete sentences and phrases
const completePhrases: Record<Language, Record<string, string>> = {
  en: {},
  hi: {
    // Contract types
    "employment contract": "रोजगार अनुबंध",
    "service agreement": "सेवा समझौता",
    "non-disclosure agreement": "गोपनीयता समझौता",
    "lease agreement": "पट्टा समझौता",
    
    // Common analysis phrases
    "Standard terms with reasonable": "मानक शर्तों के साथ उचित",
    "This is a balanced": "यह एक संतुलित है",
    "Safe to sign": "हस्ताक्षर करने के लिए सुरक्षित",
    "covering technology trade secrets": "प्रौद्योगिकी व्यापार रहस्य को कवर करता है",
    "Clear scope of what is considered confidential": "स्पष्ट दायरा कि क्या गोपनीय माना जाता है",
    
    // Risk related
    "NDA includes residual knowledge": "एनडीए में अवशिष्ट ज्ञान खंड शामिल है",
    "allowing use of general knowledge retained in unaided memory": "सामान्य ज्ञान का उपयोग करने की अनुमति जो स्मृति में बना रहता है",
    "NDA already includes fair residual knowledge": "एनडीए में पहले से ही उचित अवशिष्ट ज्ञान खंड शामिल है",
    "no changes needed": "कोई बदलाव की आवश्यकता नहीं",
    "Most NDAs include residual knowledge carve-outs": "अधिकांश एनडीए में अवशिष्ट ज्ञान अपवाद शामिल हैं",
    
    // Decision phrases
    "This is a negotiation opportunity": "यह एक बातचीत का अवसर है",
    "Should be addressed before signing": "हस्ताक्षर करने से पहले संबोधित किया जाना चाहिए",
    "Strongly recommend negotiating": "दृढ़ता से बातचीत करने की सिफारिश करते हैं",
    "Do not sign": "हस्ताक्षर न करें",
    "Be careful": "सावधान रहें",
    "Review this clause": "इस खंड की समीक्षा करें",
  },
  hinglish: {
    "employment contract": "employment contract",
    "service agreement": "service agreement",
    "non-disclosure agreement": "NDA",
    "lease agreement": "lease agreement",
  },
}

// Comprehensive term translation dictionary - EXTENSIVE
const legalTerms: Record<Language, Record<string, string>> = {
  en: {},
  hi: {
    // Core legal terms
    "non-compete": "गैर-स्पर्धा",
    "non-compete clause": "गैर-स्पर्धा खंड",
    "non-disclosure": "गैर-प्रकटीकरण",
    "intellectual property": "बौद्धिक संपत्ति",
    "ip assignment": "आईपी असाइनमेंट",
    "arbitration": "मध्यस्थता",
    "termination": "समाप्ति",
    "at-will employment": "इच्छा पर रोजगार",
    "confidentiality": "गोपनीयता",
    "confidential": "गोपनीय",
    "confidential information": "गोपनीय जानकारी",
    "trade secrets": "व्यापार रहस्य",
    "liability": "दायित्व",
    "indemnification": "क्षतिपूर्ति",
    "indemnify": "क्षतिपूर्ति देना",
    "overtime": "ओवरटाइम",
    "jury trial": "जूरी ट्रायल",
    "binding": "बाध्यकारी",
    "limitation of liability": "दायित्व की सीमा",
    "force majeure": "अप्रतिरोध्य बल",
    "severability": "पृथक्करण",
    "entire agreement": "संपूर्ण समझौता",
    
    // Time-related
    "months": "महीने",
    "years": "साल",
    "days": "दिन",
    "three years": "तीन साल",
    "period": "अवधि",
    "duration": "अवधि",
    
    // Action words
    "cannot": "नहीं कर सकते",
    "cannot compete": "प्रतिस्पर्धा नहीं कर सकते",
    "must": "को अवश्य",
    "will": "होगा",
    "shall": "करेगा",
    "may": "हो सकता है",
    "restrict": "प्रतिबंधित करना",
    "restricted": "प्रतिबंधित",
    "allow": "अनुमति देना",
    "prohibit": "मना करना",
    
    // Employment-related
    "compensation": "मुआवजा",
    "salary": "वेतन",
    "wage": "मजदूरी",
    "benefits": "लाभ",
    "health insurance": "स्वास्थ्य बीमा",
    "retirement": "सेवानिवृत्ति",
    "401k": "सेवानिवृत्ति योजना",
    "vacation": "छुट्टी",
    "paid time off": "वेतन सहित समय",
    
    // Legal roles
    "employee": "कर्मचारी",
    "employer": "नियोक्ता",
    "company": "कंपनी",
    "party": "पक्ष",
    "parties": "पक्षों",
    
    // Work-related
    "work": "काम",
    "working": "काम कर रहे हैं",
    "hours": "घंटे",
    "work hours": "कार्य घंटे",
    "remote": "दूरस्थ",
    "on-site": "साइट पर",
    
    // Contract basics
    "restrictions": "प्रतिबंध",
    "restriction": "प्रतिबंध",
    "clause": "खंड",
    "section": "खंड",
    "article": "आर्टिकल",
    "agreement": "समझौता",
    "contract": "अनुबंध",
    "terms": "शर्तें",
    "conditions": "शर्तें",
    "contingency": "आकस्मिकता",
    
    // Risk words
    "risky": "जोखिम भरा",
    "risk": "जोखिम",
    "critical": "गंभीर",
    "high": "उच्च",
    "medium": "मध्यम",
    "low": "कम",
    "severe": "गंभीर",
    "unfavorable": "प्रतिकूल",
    "problematic": "समस्याग्रस्त",
    "concern": "चिंता",
    "issue": "समस्या",
    
    // Decision words (comprehensive)
    "safe": "सुरक्षित",
    "safe to sign": "हस्ताक्षर के लिए सुरक्षित",
    "be careful": "सावधान रहें",
    "proceed with caution": "सावधानी से आगे बढ़ें",
    "do not sign": "हस्ताक्षर न करें",
    "walk away": "दूर चले जाएं",
    "recommend": "सिफारिश करते हैं",
    "negotiable": "बातचीत योग्य",
    "non-negotiable": "गैर-बातचीत योग्य",
    
    // Specific legal concepts
    "residual knowledge": "अवशिष्ट ज्ञान",
    "unaided memory": "बिना सहायता की स्मृति",
    "general knowledge": "सामान्य ज्ञान",
    "carve-out": "अपवाद",
    "carve-outs": "अपवाद",
    "scope": "दायरा",
    "consideration": "प्रतिफल",
    "mutual": "पारस्परिक",
    "unilateral": "एकतरफा",
    
    // Common phrases in contracts
    "notice": "सूचना",
    "governing law": "संचालन कानून",
    "jurisdiction": "क्षेत्राधिकार",
    "effective date": "प्रभावी तारीख",
    "termination date": "समाप्ति की तारीख",
    "renewal": "नवीनीकरण",
    "assignment": "असाइनमेंट",
    "assignment of rights": "अधिकारों का असाइनमेंट",
    
    // Analysis specific
    "summary": "सारांश",
    "overview": "अवलोकन",
    "analysis": "विश्लेषण",
    "breakdown": "विभाजन",
    "category": "श्रेणी",
    "identified": "पहचानी गई",
    "risks identified": "पहचाने गए जोखिम",
    "amended": "संशोधित",
    "amendment": "संशोधन",
    "suggested": "सुझाए गए",
    "suggestion": "सुझाव",
    "negotiation": "बातचीत",
    "tips": "सुझाव",
    "standard": "मानक",
    "industry standard": "उद्योग मानक",
    "industry": "उद्योग",
    
    // Additional common words
    "or": "या",
    "and": "और",
    "is": "है",
    "with": "के साथ",
    "by": "द्वारा",
    "to": "को",
    "from": "से",
    "in": "में",
    "on": "पर",
    "at": "पर",
    "you": "आप",
    "your": "आपके",
    "the": "यह",
    "a": "एक",
    "an": "एक",
    "that": "कि",
    "this": "यह",
    "be": "होना",
    "not": "नहीं",
    "no": "नहीं",
    "yes": "हाँ",
    
    // Additional phrases
    "nda": "एनडीए",
    "nondisclosure agreement": "गैर-प्रकटीकरण समझौता",
    "why this is risky": "यह क्यों जोखिम भरा है",
    "original problematic text": "मूल समस्याग्रस्त पाठ",
    "better version": "बेहतर संस्करण",
    "why this is better": "यह क्यों बेहतर है",
    "how to negotiate it": "इसके लिए बातचीत कैसे करें",
    "what's typical in industry": "उद्योग में क्या सामान्य है",
  },
  hinglish: {
    "non-compete": "non-compete",
    "intellectual property": "intellectual property",
    "confidentiality": "confidentiality",
    "arbitration": "arbitration",
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
    "Overall Risk Score": "Overall Risk Score",
    "Contract Type": "Contract Type",
    "Risk Breakdown by Category": "Risk Breakdown by Category",
    "Risk Categories": "Risk Categories",
    "Summary": "Summary",
    "Identified Risks": "Identified Risks",
    "Should I Sign This?": "Should I Sign This?",
    "Safe to Sign": "Safe to Sign",
    "Be Careful": "Be Careful",
    "Do Not Sign": "Do Not Sign",
    "Suggested Amendments": "Suggested Amendments",
    "Negotiation Tips": "Negotiation Tips",
  },
  hi: {
    "Overall Risk Score": "कुल जोखिम स्कोर",
    "Contract Type": "अनुबंध का प्रकार",
    "Risk Breakdown by Category": "श्रेणी के अनुसार जोखिम विभाजन",
    "Risk Categories": "जोखिम श्रेणी",
    "Summary": "सारांश",
    "Identified Risks": "पहचाने गए जोखिम",
    "Should I Sign This?": "क्या मुझे इस पर हस्ताक्षर करने चाहिए?",
    "Safe to Sign": "हस्ताक्षर करने के लिए सुरक्षित",
    "Be Careful": "सावधान रहें",
    "Do Not Sign": "पर हस्ताक्षर न करें",
    "Suggested Amendments": "सुझाए गए संशोधन",
    "Negotiation Tips": "बातचीत के सुझाव",
  },
  hinglish: {
    "Overall Risk Score": "Overall Risk Score",
    "Contract Type": "Contract Type",
    "Risk Breakdown by Category": "Risk Breakdown by Category",
    "Risk Categories": "Risk Categories",
    "Summary": "Summary",
    "Identified Risks": "Identified Risks",
    "Should I Sign This?": "Kya mujhe is par sign karna chahiye?",
    "Safe to Sign": "Sign karne ke liye safe hai",
    "Be Careful": "Dhyan se dekho",
    "Do Not Sign": "Sign mat karo",
    "Suggested Amendments": "Suggested Changes",
    "Negotiation Tips": "Baat-cheet ke tips",
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

// Comprehensive text translation - translates phrases first, then individual words
export function smartTranslateText(text: string, language: Language): string {
  if (language === "en") return text
  if (!text) return text

  let result = text

  // First pass: translate complete phrases
  const phrases = Object.entries(completePhrases[language])
  const sortedPhrases = phrases.sort((a, b) => b[0].length - a[0].length)

  for (const [english, translated] of sortedPhrases) {
    const regex = new RegExp(`\\b${english}\\b`, "gi")
    result = result.replace(regex, translated)
  }

  // Second pass: translate individual terms
  const terms = legalTerms[language]
  const sortedTerms = Object.entries(terms).sort((a, b) => b[0].length - a[0].length)

  for (const [english, translated] of sortedTerms) {
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

// Translate entire analysis result - COMPREHENSIVE
export function translateAnalysisResult(result: any, language: Language): any {
  if (language === "en") return result

  return {
    ...result,
    contractType: translateContractType(result.contractType, language),
    summary: smartTranslateText(result.summary, language),
    decisionReason: smartTranslateText(result.decisionReason, language),
    decision: translateDecision(result.decision, language),
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

function translateDecision(decision: string, language: Language): string {
  if (language === "en") return decision
  
  const decisionMap: Record<Language, Record<string, string>> = {
    en: {},
    hi: {
      safe: "सुरक्षित",
      careful: "सावधान",
      risky: "जोखिम भरा",
    },
    hinglish: {
      safe: "safe",
      careful: "careful",
      risky: "risky",
    },
  }
  
  return decisionMap[language][decision] || decision
}

function translateContractType(type: string, language: Language): string {
  if (language === "en") return type
  
  const typeMap: Record<Language, Record<string, string>> = {
    en: {},
    hi: {
      employment: "रोजगार",
      service: "सेवा",
      nda: "एनडीए",
      lease: "पट्टा",
      other: "अन्य",
    },
    hinglish: {
      employment: "employment",
      service: "service",
      nda: "NDA",
      lease: "lease",
      other: "other",
    },
  }
  
  return typeMap[language][type] || type
}
