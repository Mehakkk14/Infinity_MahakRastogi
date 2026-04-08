import { AnalysisResult } from '@/components/dashboard/dashboard-content'

// Sample analysis results for demo purposes
const sampleAnalyses: AnalysisResult[] = [
  {
    summary: "Standard employment contract for software engineer position at a tech company with 40-hour work week, competitive salary, and standard benefits package.",
    risks: [
      "Non-compete clause restricts employment with competitors for 24 months after leaving",
      "Unlimited overtime clause with no additional compensation specified",
      "Broad intellectual property assignment includes personal projects created on company time",
      "30-day notice period required from employee, but only 7 days from employer",
      "Arbitration clause waives right to jury trial in disputes"
    ],
    riskScore: 65,
    decision: "careful",
    decisionReason: "While base terms are relatively standard for tech industry, the non-compete and IP assignment clauses are broader than typical. Consider negotiating these before signing, especially the IP clause."
  },
  {
    summary: "Standard commercial lease agreement for office space with 3-year term, includes maintenance obligations and standard commercial terms.",
    risks: [
      "Automatic 3-year renewal with 60-day notice to opt-out only from landlord side",
      "Tenant responsible for all maintenance costs including major repairs",
      "Rent increases 5% annually without CPI adjustment",
      "Limited liability for landlord in case of property damage"
    ],
    riskScore: 42,
    decision: "careful",
    decisionReason: "Moderate risk. The automatic renewal clause is favorable to landlord. Request CPI-based increases instead of fixed 5%, and clarify which major repairs are landlord responsibility."
  },
  {
    summary: "Simple service agreement between independent contractor and small business for marketing services.",
    risks: [],
    riskScore: 15,
    decision: "safe",
    decisionReason: "Low risk. Well-balanced terms with clear scope of work, reasonable payment terms, and fair termination clause. This is a standard market-rate agreement."
  },
]

export function getDemoAnalysis(index: number = 0): AnalysisResult {
  return sampleAnalyses[index % sampleAnalyses.length]
}

export function isDemoMode(): boolean {
  // Demo mode if no API key or explicitly enabled
  return !process.env.NEXT_PUBLIC_DEMO_MODE && !process.env.OPENAI_API_KEY
}
