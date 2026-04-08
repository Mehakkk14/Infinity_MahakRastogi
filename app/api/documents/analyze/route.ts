import { NextRequest, NextResponse } from 'next/server'
import { analyzeLegalDocument } from '@/lib/openai-client'
import { getDemoAnalysis } from '@/lib/demo'
import { verifyIdToken, getAuthToken } from '@/lib/firebase-admin'
import { db } from '@/lib/firebase'
import { collection, addDoc, Timestamp } from 'firebase/firestore'

export const maxDuration = 60 // Increase timeout for longer analyses

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const token = getAuthToken(request)
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized - please sign in' },
        { status: 401 }
      )
    }

    // Verify token
    let userId: string
    try {
      const decodedToken = await verifyIdToken(token)
      userId = decodedToken.uid
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      )
    }

    const { documentText, language } = await request.json()

    if (!documentText || documentText.trim().length === 0) {
      return NextResponse.json(
        { error: 'Document text is required' },
        { status: 400 }
      )
    }

    if (!process.env.OPENAI_API_KEY) {
      console.log('Demo mode: OpenAI API key not configured')
      // Return demo analysis
      return NextResponse.json(getDemoAnalysis())
    }

    // Analyze with OpenAI
    const analysisResult = await analyzeLegalDocument(documentText, language || 'en')

    return NextResponse.json(analysisResult)
  } catch (error: unknown) {
    console.error('Analysis error:', error)
    
    // Extract error details
    const errorString = error instanceof Error ? error.message : JSON.stringify(error)
    const isRateLimit = errorString.includes('429') || errorString.includes('Too Many Requests') || errorString.includes('rate limit')

    if (isRateLimit) {
      console.log('Rate limited by OpenAI API, using demo mode')
      // Return demo analysis instead of error
      return NextResponse.json(getDemoAnalysis())
    }

    // For any other error, also fallback to demo mode
    console.log('API error - falling back to demo mode:', errorString)
    return NextResponse.json(getDemoAnalysis())
  }
}
