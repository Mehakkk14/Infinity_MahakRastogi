"use client"

import * as React from "react"
import { UploadPanel } from "./upload-panel"
import { ResultsPanel } from "./results-panel"
import { EmptyState } from "./empty-state"
import { LoadingState } from "./loading-state"
import { AnalysisHistory } from "./analysis-history"
import { saveAnalysis, type StoredAnalysis } from "@/lib/storage"

export type AnalysisState = "empty" | "loading" | "error" | "success"
export type Language = "en" | "hi" | "hinglish"
export type Decision = "safe" | "careful" | "risky"

export interface AnalysisResult {
  summary: string
  risks: string[]
  riskScore: number
  decision: Decision
  decisionReason: string
}

export function DashboardContent() {
  const [state, setState] = React.useState<AnalysisState>("empty")
  const [results, setResults] = React.useState<AnalysisResult | null>(null)
  const [language, setLanguage] = React.useState<Language>("en")
  const [documentText, setDocumentText] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)

  const handleAnalyze = async () => {
    if (!documentText.trim()) return

    setState("loading")
    setError(null)

    try {
      const response = await fetch("/api/documents/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          documentText: documentText,
        }),
      })

      if (!response.ok) {
        throw new Error(`Analysis failed: ${response.statusText}`)
      }

      const analysisResult = await response.json()
      setResults(analysisResult)
      setState("success")
      
      // Save to localStorage for history
      try {
        saveAnalysis("Pasted Document", documentText, analysisResult)
      } catch (e) {
        console.warn('Failed to save to history:', e)
      }
    } catch (err) {
      console.error("Analysis error:", err)
      setError(err instanceof Error ? err.message : "Analysis failed. Please try again.")
      setState("error")
    }
  }

  const handleLoadFromHistory = (analysis: StoredAnalysis) => {
    const { id, fileName, timestamp, documentPreview, ...results } = analysis
    setResults(results)
    setState("success")
  }

  const handleReset = () => {
    setState("empty")
    setResults(null)
    setDocumentText("")
    setError(null)
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Panel - Upload */}
        <UploadPanel
          documentText={documentText}
          setDocumentText={setDocumentText}
          onAnalyze={handleAnalyze}
          onReset={handleReset}
          isAnalyzing={state === "loading"}
          hasResults={state === "success"}
        />

        {/* Right Panel - Results */}
        <div className="flex flex-col gap-4">
          {state === "empty" && <EmptyState />}
          {state === "loading" && <LoadingState />}
          {state === "error" && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
              <p className="font-semibold">Analysis Error</p>
              <p className="mt-1 text-sm">{error}</p>
              <button
                onClick={handleReset}
                className="mt-3 rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
              >
                Try Again
              </button>
            </div>
          )}
          {state === "success" && results && (
            <ResultsPanel
              results={results}
              language={language}
              setLanguage={setLanguage}
            />
          )}
        </div>
      </div>

      {/* Analysis History */}
      <AnalysisHistory onSelectAnalysis={handleLoadFromHistory} />
    </div>
  )
}
