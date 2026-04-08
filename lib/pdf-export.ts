'use client'

import type { EnhancedAnalysisResult } from './openai-client'

export async function exportAnalysisToPDF(
  analysis: EnhancedAnalysisResult,
  documentPreview: string,
  fileName: string = 'analysis'
) {
  try {
    // Dynamically import jsPDF only on client side
    const { jsPDF } = await import('jspdf')
    const doc = new jsPDF('p', 'mm', 'a4')
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const margin = 15
    const lineHeight = 7
    let currentY = margin

    // Helper function to add text with wrapping
    const addWrappedText = (text: string, fontSize: number, isBold: boolean = false) => {
      doc.setFontSize(fontSize)
      if (isBold) {
        doc.setFont(undefined, 'bold')
      } else {
        doc.setFont(undefined, 'normal')
      }

      const lines = doc.splitTextToSize(text, pageWidth - 2 * margin)
      doc.text(lines, margin, currentY)
      currentY += lines.length * lineHeight * 0.5 + 3

      if (currentY > pageHeight - margin) {
        doc.addPage()
        currentY = margin
      }

      return lines.length
    }

    // Title
    addWrappedText('Legal Document Analysis Report', 16, true)
    currentY += 5

    // Document Info
    addWrappedText(`Generated: ${new Date().toLocaleString()}`, 10, false)
    currentY += 2

    // Risk Score
    doc.setFontSize(12)
    doc.setFont(undefined, 'bold')
    doc.text('Overall Risk Score:', margin, currentY)
    currentY += lineHeight

    doc.setFontSize(14)
    const riskColor = analysis.riskScore < 30 ? [34, 197, 94] : analysis.riskScore < 70 ? [251, 146, 60] : [239, 68, 68]
    doc.setTextColor(...riskColor)
    doc.text(`${analysis.riskScore}%`, margin + 50, currentY - lineHeight)
    doc.setTextColor(0, 0, 0)
    currentY += 8

    // Contract Type
    addWrappedText(`Contract Type: ${analysis.contractType}`, 11, true)
    currentY += 3

    // Identified Risks
    addWrappedText('Identified Risks:', 12, true)
    currentY += 2

    analysis.risks.forEach((risk, index) => {
      doc.setFontSize(10)
      doc.setFont(undefined, 'bold')
      const riskText = `${index + 1}. ${risk.issue} (${risk.severity})`
      doc.text(riskText, margin + 5, currentY)
      currentY += lineHeight

      doc.setFontSize(9)
      doc.setFont(undefined, 'normal')
      const riskLines = doc.splitTextToSize(risk.explanation, pageWidth - 2 * margin - 10)
      doc.text(riskLines, margin + 10, currentY)
      currentY += riskLines.length * lineHeight * 0.4 + 2

      if (currentY > pageHeight - margin - 20) {
        doc.addPage()
        currentY = margin
      }
    })

    currentY += 5

    // Suggested Amendments
    if (analysis.amendments && analysis.amendments.length > 0) {
      addWrappedText('Suggested Amendments:', 12, true)
      currentY += 2

      analysis.amendments.forEach((amendment, index) => {
        doc.setFontSize(10)
        doc.setFont(undefined, 'bold')
        doc.text(`Amendment ${index + 1}:`, margin + 5, currentY)
        currentY += lineHeight

        doc.setFontSize(9)
        doc.setFont(undefined, 'normal')

        // Original text
        doc.setTextColor(200, 0, 0)
        const originalLines = doc.splitTextToSize(`Original: "${amendment.original}"`, pageWidth - 2 * margin - 10)
        doc.text(originalLines, margin + 10, currentY)
        currentY += originalLines.length * lineHeight * 0.4 + 1

        // Suggested text
        doc.setTextColor(0, 150, 0)
        const suggestedLines = doc.splitTextToSize(`Suggested: "${amendment.suggested}"`, pageWidth - 2 * margin - 10)
        doc.text(suggestedLines, margin + 10, currentY)
        currentY += suggestedLines.length * lineHeight * 0.4 + 1

        // Reasoning
        doc.setTextColor(0, 0, 0)
        const reasoningLines = doc.splitTextToSize(`Reasoning: ${amendment.reasoning}`, pageWidth - 2 * margin - 10)
        doc.text(reasoningLines, margin + 10, currentY)
        currentY += reasoningLines.length * lineHeight * 0.4 + 3

        if (currentY > pageHeight - margin - 20) {
          doc.addPage()
          currentY = margin
        }
      })

      currentY += 5
    }

    // Negotiation Tips
    if (analysis.negotiationTips && analysis.negotiationTips.length > 0) {
      if (currentY > pageHeight - margin - 30) {
        doc.addPage()
        currentY = margin
      }

      addWrappedText('Negotiation Tips:', 12, true)
      currentY += 2

      analysis.negotiationTips.forEach((tip, index) => {
        doc.setFontSize(10)
        doc.setFont(undefined, 'bold')
        doc.text(`${index + 1}. ${tip.risk}`, margin + 5, currentY)
        currentY += lineHeight

        doc.setFontSize(9)
        doc.setFont(undefined, 'normal')

        const suggestionLines = doc.splitTextToSize(`Your Move: ${tip.suggestion}`, pageWidth - 2 * margin - 10)
        doc.text(suggestionLines, margin + 10, currentY)
        currentY += suggestionLines.length * lineHeight * 0.4 + 1

        const standardLines = doc.splitTextToSize(`Industry Standard: ${tip.industry_standard}`, pageWidth - 2 * margin - 10)
        doc.text(standardLines, margin + 10, currentY)
        currentY += standardLines.length * lineHeight * 0.4 + 2

        if (currentY > pageHeight - margin - 20) {
          doc.addPage()
          currentY = margin
        }
      })
    }

    // Footer
    const pageCount = doc.internal.pages.length - 1
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setFontSize(8)
      doc.setTextColor(150, 150, 150)
      doc.text(
        `Page ${i} of ${pageCount}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: 'center' }
      )
    }

    // Save the PDF
    const timestamp = new Date().toISOString().slice(0, 10)
    doc.save(`${fileName}-analysis-${timestamp}.pdf`)

    return true
  } catch (error) {
    console.error('Error generating PDF:', error)
    throw error
  }
}

export async function exportResultsToScreenshot(elementId: string, fileName: string = 'analysis') {
  try {
    // Dynamically import html2canvas only on client side
    const html2canvas = (await import('html2canvas')).default
    const element = document.getElementById(elementId)
    if (!element) {
      throw new Error('Element not found')
    }

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
    })

    const link = document.createElement('a')
    link.href = canvas.toDataURL('image/png')
    const timestamp = new Date().toISOString().slice(0, 10)
    link.download = `${fileName}-${timestamp}.png`
    link.click()

    return true
  } catch (error) {
    console.error('Error generating screenshot:', error)
    throw error
  }
}
