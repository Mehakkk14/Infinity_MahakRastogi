'use client'

import { AnalysisResult } from '@/components/dashboard/dashboard-content'

export interface StoredAnalysis extends AnalysisResult {
  id: string
  fileName: string
  timestamp: number
  documentPreview: string
}

const STORAGE_KEY = 'legalease_analyses'
const MAX_STORED = 10

export function saveAnalysis(fileName: string, documentPreview: string, results: AnalysisResult): StoredAnalysis {
  const stored: StoredAnalysis = {
    ...results,
    id: Date.now().toString(),
    fileName,
    timestamp: Date.now(),
    documentPreview: documentPreview.substring(0, 200),
  }

  const existing = getAnalysisHistory()
  const updated = [stored, ...existing].slice(0, MAX_STORED)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))

  return stored
}

export function getAnalysisHistory(): StoredAnalysis[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function deleteAnalysis(id: string): void {
  const history = getAnalysisHistory()
  const updated = history.filter(a => a.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
