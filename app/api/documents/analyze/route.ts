import { NextRequest, NextResponse } from 'next/server'
import { analyzeLegalDocument } from '@/lib/openai-client'
import { getDemoAnalysis } from '@/lib/demo'

export const maxDuration = 60 // Increase timeout for longer analyses

export async function POST(request: NextRequest) {
  try {
    const { documentText } = await request.json()

    if (!documentText || documentText.trim().length === 0) {
      return NextResponse.json(
        { error: 'Document text is required' },
        { status: 400 }
      )
    }

    if (!process.env.OPENAI_API_KEY) {
      console.log('Demo mode: OpenAI API key not configured')
      // Return demo analysis
      return NextResponse.json(getDemoAnalysis(Math.floor(Math.random() * 3)))
    }

    // Analyze with OpenAI
    const analysisResult = await analyzeLegalDocument(documentText)

    return NextResponse.json(analysisResult)
  } catch (error: unknown) {
    console.error('Analysis error:', error)
    
    // Extract error details
    const errorString = error instanceof Error ? error.message : JSON.stringify(error)
    const isRateLimit = errorString.includes('429') || errorString.includes('Too Many Requests') || errorString.includes('rate limit')

    if (isRateLimit) {
      console.log('Rate limited by OpenAI API, using demo mode')
      // Return demo analysis instead of error
      return NextResponse.json(getDemoAnalysis(Math.floor(Math.random() * 3)))
    }

    // For any other error, also fallback to demo mode
    console.log('API error - falling back to demo mode:', errorString)
    return NextResponse.json(getDemoAnalysis(Math.floor(Math.random() * 3)))
  }
}
