"use client"

import { AlertCircle, CheckCircle2, XCircle, FileText, AlertTriangle, Languages } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import type { AnalysisResult, Language, Decision } from "./dashboard-content"

interface ResultsPanelProps {
  results: AnalysisResult
  language: Language
  setLanguage: (lang: Language) => void
}

const translations: Record<Language, {
  summary: string
  risks: string[]
  decision: string
  decisionReason: string
}> = {
  en: {
    summary: "",
    risks: [],
    decision: "",
    decisionReason: "",
  },
  hi: {
    summary:
      "यह टेककॉर्प इंक में सॉफ्टवेयर डेवलपर पद के लिए एक मानक रोजगार अनुबंध है। अनुबंध 40-घंटे का कार्य सप्ताह, आधार वेतन, स्वास्थ्य लाभ और 90-दिन की परिवीक्षा अवधि की रूपरेखा देता है।",
    risks: [
      "गैर-प्रतिस्पर्धा खंड 24 महीने के लिए प्रतियोगियों के साथ रोजगार प्रतिबंधित करता है",
      "असीमित ओवरटाइम खंड बिना अतिरिक्त मुआवजे के",
      "व्यक्तिगत परियोजनाओं सहित व्यापक बौद्धिक संपदा असाइनमेंट",
    ],
    decision: "सावधान रहें",
    decisionReason:
      "जबकि आधार शर्तें मानक हैं, गैर-प्रतिस्पर्धा खंड और आईपी असाइनमेंट सामान्य से अधिक व्यापक हैं।",
  },
  hinglish: {
    summary:
      "Ye ek standard employment contract hai TechCorp Inc mein Software Developer position ke liye. Contract mein 40-hour work week, base salary, health benefits, aur 90-day probation period mentioned hai.",
    risks: [
      "Non-compete clause 24 months tak competitors ke saath kaam karne se rokta hai",
      "Unlimited overtime clause hai bina extra payment ke",
      "Broad IP assignment hai jo personal projects ko bhi cover karta hai",
    ],
    decision: "Dhyan se dekho",
    decisionReason:
      "Base terms standard hain, lekin non-compete aur IP assignment typical se zyada broad hai. Inhe negotiate karne ki sochein.",
  },
}

const decisionConfig: Record<Decision, {
  label: string
  color: string
  bgColor: string
  borderColor: string
  icon: typeof CheckCircle2
}> = {
  safe: {
    label: "Safe to Sign",
    color: "text-success",
    bgColor: "bg-success/10",
    borderColor: "border-success/30",
    icon: CheckCircle2,
  },
  careful: {
    label: "Be Careful",
    color: "text-warning",
    bgColor: "bg-warning/10",
    borderColor: "border-warning/30",
    icon: AlertTriangle,
  },
  risky: {
    label: "Do Not Sign",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    borderColor: "border-destructive/30",
    icon: XCircle,
  },
}

export function ResultsPanel({ results, language, setLanguage }: ResultsPanelProps) {
  const config = decisionConfig[results.decision]
  const DecisionIcon = config.icon

  const displaySummary = language === "en" ? results.summary : translations[language].summary
  const displayRisks = language === "en" ? results.risks : translations[language].risks
  const displayDecision = language === "en" ? config.label : translations[language].decision
  const displayReason = language === "en" ? results.decisionReason : translations[language].decisionReason

  const getRiskScoreColor = (score: number) => {
    if (score <= 30) return "text-success"
    if (score <= 60) return "text-warning"
    return "text-destructive"
  }

  const getRiskScoreLabel = (score: number) => {
    if (score <= 30) return "Low Risk"
    if (score <= 60) return "Moderate Risk"
    return "High Risk"
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Language Toggle */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardContent className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Languages className="h-4 w-4" />
            <span>Language</span>
          </div>
          <div className="flex gap-1 rounded-lg bg-muted/50 p-1">
            {(["en", "hi", "hinglish"] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-all",
                  language === lang
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {lang === "en" ? "EN" : lang === "hi" ? "हिंदी" : "Hinglish"}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary Card */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5 text-primary" />
            Simple Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="leading-relaxed text-muted-foreground">{displaySummary}</p>
        </CardContent>
      </Card>

      {/* Risk Alerts Card */}
      <Card className="border-destructive/30 bg-destructive/5 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg text-destructive">
            <AlertCircle className="h-5 w-5" />
            Risky Clauses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {displayRisks.map((risk, index) => (
              <li key={index} className="flex items-start gap-3">
                <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                <span className="text-sm text-muted-foreground">{risk}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Risk Score Card */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-lg">
            <span>Risk Score</span>
            <span className={cn("text-2xl font-bold", getRiskScoreColor(results.riskScore))}>
              {results.riskScore}%
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress 
            value={results.riskScore} 
            className="h-3"
          />
          <p className={cn("mt-2 text-sm font-medium", getRiskScoreColor(results.riskScore))}>
            {getRiskScoreLabel(results.riskScore)}
          </p>
        </CardContent>
      </Card>

      {/* Decision Card */}
      <Card className={cn("border backdrop-blur-sm", config.borderColor, config.bgColor)}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <DecisionIcon className={cn("h-5 w-5", config.color)} />
            Should I Sign This?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className={cn("flex h-14 w-14 items-center justify-center rounded-full", config.bgColor)}>
              <DecisionIcon className={cn("h-7 w-7", config.color)} />
            </div>
            <div>
              <p className={cn("text-xl font-bold", config.color)}>{displayDecision}</p>
              <p className="mt-1 text-sm text-muted-foreground">{displayReason}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
