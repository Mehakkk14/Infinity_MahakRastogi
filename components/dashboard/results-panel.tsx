"use client"

import dynamic from "next/dynamic"
import { AlertCircle, CheckCircle2, XCircle, FileText, AlertTriangle, Languages } from "lucide-react"
import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { translateSeverity, translateTitle, translateText, type Language as TranslationLanguage } from "@/lib/translations"
import type { AnalysisResult, Language, Decision } from "./dashboard-content"
import { AmendmentsPanel } from "./amendments-panel"
import { NegotiationTips } from "./negotiation-tips"
import { RiskDashboard } from "./risk-dashboard"

const PDFExportButton = dynamic(() => import("./pdf-export-button").then(mod => ({ default: mod.PDFExportButton })), { ssr: false })

interface ResultsPanelProps {
  results: AnalysisResult
  language: Language
  setLanguage: (lang: Language) => void
}

const translations: Record<Language, {
  summary: string
  decision: string
  decisionReason: string
}> = {
  en: {
    summary: "",
    decision: "",
    decisionReason: "",
  },
  hi: {
    summary:
      "यह टेककॉर्प इंक में सॉफ्टवेयर डेवलपर पद के लिए एक मानक रोजगार अनुबंध है। अनुबंध 40-घंटे का कार्य सप्ताह, आधार वेतन, स्वास्थ्य लाभ और 90-दिन की परिवीक्षा अवधि की रूपरेखा देता है।",
    decision: "सावधान रहें",
    decisionReason:
      "जबकि आधार शर्तें मानक हैं, गैर-प्रतिस्पर्धा खंड और आईपी असाइनमेंट सामान्य से अधिक व्यापक हैं।",
  },
  hinglish: {
    summary:
      "Ye ek standard employment contract hai TechCorp Inc mein Software Developer position ke liye. Contract mein 40-hour work week, base salary, health benefits, aur 90-day probation period mentioned hai.",
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
    <div className="flex flex-col gap-4 max-h-[80vh] overflow-y-auto pr-2">
      {/* Language Toggle & Export */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
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
          <PDFExportButton results={results} />
        </CardContent>
      </Card>

      {/* Risk Dashboard */}
      <RiskDashboard
        riskScore={results.riskScore}
        riskBreakdown={results.riskBreakdown || []}
        contractType={results.contractType || 'other'}
      />

      {/* Summary Card */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5 text-primary" />
            {translateTitle("Summary", language)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="leading-relaxed text-muted-foreground">{displaySummary}</p>
        </CardContent>
      </Card>

      {/* Risks Card */}
      {results.risks && results.risks.length > 0 && (
        <Card className="border-destructive/30 bg-destructive/5 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg text-destructive">
              <AlertCircle className="h-5 w-5" />
              {translateTitle("Identified Risks", language)} ({results.risks.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {results.risks.map((risk, index) => (
                <li key={index} className="space-y-1">
                  <div className="flex items-start gap-2">
                    <span className={`mt-1 px-2 py-0.5 rounded text-xs font-medium ${
                      risk.severity === 'critical' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200' :
                      risk.severity === 'high' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-200' :
                      risk.severity === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {translateSeverity(risk.severity, language)}
                    </span>
                    <span className="font-semibold text-sm text-foreground">{language === "en" ? risk.issue : translateText(risk.issue, language)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground ml-8">{language === "en" ? risk.explanation : translateText(risk.explanation, language)}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Decision Card */}
      <Card className={cn("border backdrop-blur-sm", config.borderColor, config.bgColor)}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <DecisionIcon className={cn("h-5 w-5", config.color)} />
            {translateTitle("Should I Sign This?", language)}
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

      {/* Amendments Panel */}
      {results.amendments && results.amendments.length > 0 && (
        <AmendmentsPanel amendments={results.amendments} />
      )}

      {/* Negotiation Tips */}
      {results.negotiationTips && results.negotiationTips.length > 0 && (
        <NegotiationTips tips={results.negotiationTips} />
      )}
    </div>
  )
}
