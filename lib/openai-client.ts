import OpenAI from 'openai'

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 30000,
  maxRetries: 2,
})

// Helper function with retry logic
async function callOpenAIWithRetry(
  model: string,
  prompt: string,
  maxRetries: number = 3
): Promise<string> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await openai.chat.completions.create({
        model: model,
        messages: [
          {
            role: 'system',
            content: `You are a legal document expert. Analyze the provided contract and respond in valid JSON format (no markdown, just pure JSON). 
Respond ONLY with a JSON object, no other text. The JSON must have these exact fields:
{
  "summary": "1-2 sentence summary of the document",
  "risks": ["risk 1", "risk 2", "risk 3"],
  "riskScore": <number 0-100>,
  "decision": "safe" or "careful" or "risky",
  "decisionReason": "explanation for the decision"
}

Risks should be specific concerns about the contract. Risk score: 0-30 = safe, 31-70 = careful, 71-100 = risky.`,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.3,
        max_tokens: 1000,
      })

      return response.choices[0].message.content || '{}'
    } catch (error: unknown) {
      const errorMsg = error instanceof Error ? error.message : String(error)
      const isRateLimit = errorMsg.includes('429') || errorMsg.includes('Too Many Requests')

      // Don't retry on rate limit - fail immediately
      if (isRateLimit && attempt < maxRetries - 1) {
        throw error // Pass through to outer handler
      }

      // Retry other errors with backoff
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

export async function analyzeLegalDocument(documentText: string): Promise<{
  summary: string
  risks: string[]
  riskScore: number
  decision: 'safe' | 'careful' | 'risky'
  decisionReason: string
}> {
  // Limit document length
  const limitedText = documentText.substring(0, 12000)
  const prompt = `Analyze this contract:\n\n${limitedText}`

  // Try GPT-4 first, fall back to GPT-3.5 if not available
  const models = ['gpt-4', 'gpt-3.5-turbo']
  let content: string | null = null
  let lastError: Error | null = null

  for (const model of models) {
    try {
      content = await callOpenAIWithRetry(model, prompt, 2)
      break // Success
    } catch (error) {
      lastError = error as Error
      console.warn(`Model ${model} failed:`, error)
      continue
    }
  }

  if (!content) {
    throw lastError || new Error('All models failed')
  }

  // Clean up potential markdown formatting
  let jsonStr = content.trim()
  if (jsonStr.startsWith('```json')) {
    jsonStr = jsonStr.slice(7)
  } else if (jsonStr.startsWith('```')) {
    jsonStr = jsonStr.slice(3)
  }
  if (jsonStr.endsWith('```')) {
    jsonStr = jsonStr.slice(0, -3)
  }
  jsonStr = jsonStr.trim()

  try {
    const result = JSON.parse(jsonStr)

    return {
      summary: result.summary || 'No summary available',
      risks: Array.isArray(result.risks) ? result.risks : [],
      riskScore: typeof result.riskScore === 'number' ? result.riskScore : 50,
      decision: ['safe', 'careful', 'risky'].includes(result.decision) ? result.decision : 'careful',
      decisionReason: result.decisionReason || 'Analysis complete',
    }
  } catch (parseError) {
    console.error('Failed to parse JSON response:', content, parseError)
    throw new Error('Failed to parse AI response as JSON')
  }
}
