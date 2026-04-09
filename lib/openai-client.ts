import OpenAI from 'openai'

let openaiClient: OpenAI | null = null

// Lazy-load OpenAI client to avoid initialization errors during build
export function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      timeout: 30000,
      maxRetries: 2,
    })
  }
  return openaiClient
}

export interface RiskAmendment {
  original: string
  suggested: string
  reasoning: string
}

export interface NegotiationTip {
  risk: string
  suggestion: string
  industry_standard: string
}

export interface EnhancedAnalysisResult {
  summary: string
  contractType: 'employment' | 'service' | 'nda' | 'lease' | 'other'
  risks: Array<{
    issue: string
    severity: 'critical' | 'high' | 'medium' | 'low'
    explanation: string
  }>
  riskScore: number
  decision: 'safe' | 'careful' | 'risky'
  decisionReason: string
  amendments: RiskAmendment[]
  negotiationTips: NegotiationTip[]
  riskBreakdown: {
    category: string
    percentage: number
  }[]
}

// Helper function with retry logic - accepts separate system and user messages
async function callOpenAIWithRetry(
  model: string,
  systemPrompt: string,
  userMessage: string,
  maxRetries: number = 3
): Promise<string> {
  const openai = getOpenAIClient()
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await openai.chat.completions.create({
        model: model,
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: userMessage,
          },
        ],
        temperature: 0,
        top_p: 1,
        max_tokens: 2000,
      })

      return response.choices[0].message.content || '{}'
    } catch (error: unknown) {
      const errorMsg = error instanceof Error ? error.message : String(error)
      const isRateLimit = errorMsg.includes('429') || errorMsg.includes('Too Many Requests')

      if (isRateLimit && attempt < maxRetries - 1) {
        throw error
      }

      if (attempt < maxRetries - 1 && !isRateLimit) {
        const backoffMs = Math.pow(2, attempt) * 1000
        console.log(`Attempt ${attempt + 1} failed, retrying in ${backoffMs}ms...`, errorMsg)
        await new Promise(resolve => setTimeout(resolve, backoffMs))
        continue
      }

      throw error
    }
  }

  throw new Error('Max retries exceeded')
}

export async function analyzeLegalDocument(documentText: string, language: string = 'en'): Promise<EnhancedAnalysisResult> {
  const limitedText = documentText.substring(0, 12000)

  const languageInstructions = {
    en: `Respond in English.`,
    hi: `Respond in Hindi (हिंदी). Use proper Hindi grammar and vocabulary.`,
    hinglish: `Respond in Hinglish (Hindi written in English). Mix Hindi words with English.`,
  }

  const systemInstructions = `You are an expert legal contract analyzer. Analyze the contract and respond with ONLY valid JSON (no markdown, no extra text).

${langInstruction}

Respond with this exact structure:
{
  "summary": "1-2 sentence overview",
  "contractType": "employment|service|nda|lease|other",
  "risks": [
    {
      "issue": "Issue name",
      "severity": "critical|high|medium|low",
      "explanation": "Why this is risky"
    }
  ],
  "riskScore": <0-100>,
  "decision": "safe|careful|risky",
  "decisionReason": "Why this decision",
  "amendments": [
    {
      "original": "Original problematic text",
      "suggested": "Better version",
      "reasoning": "Why this is better"
    }
  ],
  "negotiationTips": [
    {
      "risk": "Risk name",
      "suggestion": "How to negotiate it",
      "industry_standard": "What's typical in industry"
    }
  ],
  "riskBreakdown": [
    {"category": "Compensation", "percentage": 25},
    {"category": "Non-Compete", "percentage": 30}
  ]
}`

  const userDocument = `Contract to analyze:
${limitedText}`

  // Try GPT-4 first, fall back to GPT-3.5 if not available
  const models = ['gpt-4', 'gpt-3.5-turbo']
  let content: string | null = null
  let lastError: Error | null = null

  for (const model of models) {
    try {
      content = await callOpenAIWithRetry(model, systemInstructions, userDocument, 2)
      break
    } catch (error) {
      lastError = error as Error
      console.warn(`Model ${model} failed:`, error)
      continue
    }
  }

  if (!content) {
    throw lastError || new Error('All models failed')
  }

  // Clean up markdown
  let jsonStr = content.trim()
  if (jsonStr.startsWith('```json')) jsonStr = jsonStr.slice(7)
  else if (jsonStr.startsWith('```')) jsonStr = jsonStr.slice(3)
  if (jsonStr.endsWith('```')) jsonStr = jsonStr.slice(0, -3)
  jsonStr = jsonStr.trim()

  try {
    const result = JSON.parse(jsonStr) as EnhancedAnalysisResult

    return {
      summary: result.summary || 'Analysis complete',
      contractType: result.contractType || 'other',
      risks: Array.isArray(result.risks)
        ? result.risks.map(r => ({
            issue: r.issue || 'Unknown issue',
            severity: r.severity || 'medium',
            explanation: r.explanation || '',
          }))
        : [],
      riskScore: typeof result.riskScore === 'number' ? result.riskScore : 50,
      decision: ['safe', 'careful', 'risky'].includes(result.decision) ? result.decision : 'careful',
      decisionReason: result.decisionReason || 'Analysis complete',
      amendments: Array.isArray(result.amendments) ? result.amendments : [],
      negotiationTips: Array.isArray(result.negotiationTips) ? result.negotiationTips : [],
      riskBreakdown: Array.isArray(result.riskBreakdown)
        ? result.riskBreakdown.filter(r => r.percentage > 0)
        : [],
    }
  } catch (parseError) {
    console.error('Failed to parse JSON response:', content, parseError)
    throw new Error('Failed to parse AI response as JSON')
  }
}
