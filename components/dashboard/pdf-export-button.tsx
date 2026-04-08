'use client'

import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import type { AnalysisResult } from './dashboard-content'

interface PDFExportButtonProps {
  results: AnalysisResult
}

export function PDFExportButton({ results }: PDFExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [exportError, setExportError] = useState<string | null>(null)

  const handleExportPDF = async () => {
    setIsExporting(true)
    setExportError(null)
    try {
      // Dynamically import only when button is clicked
      const { exportAnalysisToPDF } = await import('@/lib/pdf-export')
      await exportAnalysisToPDF(results, '', 'contract-analysis')
    } catch (error) {
      setExportError('Failed to export PDF. Please try again.')
      console.error('PDF export error:', error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={handleExportPDF}
        disabled={isExporting}
        className="gap-2"
      >
        <Download className="h-4 w-4" />
        {isExporting ? 'Exporting...' : 'Export PDF'}
      </Button>
      {exportError && <p className="text-sm text-destructive">{exportError}</p>}
    </>
  )
}
