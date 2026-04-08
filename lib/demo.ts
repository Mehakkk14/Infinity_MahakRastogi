import { EnhancedAnalysisResult } from './openai-client'

// Sample analysis results for demo purposes
const sampleAnalyses: EnhancedAnalysisResult[] = [
  {
    summary:
      'Employment contract with above-average non-compete restrictions and strong IP assignment clauses. Contains arbitration provision that limits legal recourse.',
    contractType: 'employment',
    risks: [
      {
        issue: 'Restrictive Non-Compete Clause',
        severity: 'high',
        explanation: '24-month restriction within 500-mile radius is excessive for tech industry standard of 6-12 months.',
      },
      {
        issue: 'Broad IP Assignment',
        severity: 'high',
        explanation: 'All work-related and personal projects assigned to company, even outside work hours.',
      },
      {
        issue: 'Mandatory Arbitration',
        severity: 'medium',
        explanation: 'Limits your right to sue in court; arbitration often favors corporations.',
      },
      {
        issue: 'At-Will Employment Clause',
        severity: 'low',
        explanation: 'Standard clause allowing either party to terminate without cause.',
      },
    ],
    riskScore: 68,
    decision: 'careful',
    decisionReason:
      'The non-compete and IP clauses are concerning and should be negotiated before signing. Arbitration clause reduces legal protections.',
    amendments: [
      {
        original: 'Employee shall not compete within 500 miles for 24 months after employment',
        suggested: 'Employee shall not compete within 50 miles for 6 months after employment',
        reasoning: 'Market standard for tech industry is 6-12 months, 50-100 miles radius. 24 months is excessive and may be unenforceable.',
      },
      {
        original: 'All work product, whether during or outside work hours, is property of Company',
        suggested:
          'Work product created during work hours or using company resources is property of Company. Personal projects outside work are employee property.',
        reasoning: 'Prevents company from claiming ownership of your side projects and personal hobbies.',
      },
      {
        original: 'All disputes shall be settled by binding arbitration',
        suggested: 'Disputes under $50,000 may be arbitrated. Disputes over $50,000 may be litigated in court.',
        reasoning: 'Preserves your right to legal action for significant disputes while maintaining efficiency for minor issues.',
      },
    ],
    negotiationTips: [
      {
        risk: 'Non-Compete Clause',
        suggestion: 'Try negotiating down to 6 months and 25-50 mile radius. Cite tech industry standards.',
        industry_standard: 'Tech companies typically use 6-12 month non-competes with 25-100 mile radius',
      },
      {
        risk: 'IP Assignment',
        suggestion: 'Request carve-out for personal projects created on your own time and equipment.',
        industry_standard: 'Most tech companies allow you to retain IP for side projects if not competitive',
      },
      {
        risk: 'Arbitration Clause',
        suggestion: 'Request mutual arbitration or remove arbitration requirement entirely.',
        industry_standard: 'Many companies are removing mandatory arbitration clauses due to employee concerns',
      },
    ],
    riskBreakdown: [
      { category: 'Non-Compete', percentage: 35 },
      { category: 'IP Assignment', percentage: 30 },
      { category: 'Arbitration', percentage: 20 },
      { category: 'Standard Terms', percentage: 15 },
    ],
  },
  {
    summary:
      'Service agreement with vendor for consulting services. Liability caps are below market standard and payment terms are net-60 which impacts cash flow.',
    contractType: 'service',
    risks: [
      {
        issue: 'Low Liability Cap',
        severity: 'high',
        explanation: 'Liability capped at single month fee, standard is 12 months of fees.',
      },
      {
        issue: 'Extended Payment Terms',
        severity: 'medium',
        explanation: 'Net-60 payment terms create cash flow pressure for service providers.',
      },
      {
        issue: 'Termination Rights',
        severity: 'medium',
        explanation: 'Client can terminate without cause with only 30 days notice.',
      },
    ],
    riskScore: 55,
    decision: 'careful',
    decisionReason:
      'Liability protection is weak and payment terms are unfavorable. Consider renegotiating liability caps and payment schedule.',
    amendments: [
      {
        original: 'Liability capped at gross fees from the month in which claim arose',
        suggested: 'Liability capped at 12 months of average monthly fees, not to exceed $100,000',
        reasoning: 'Protects service provider from disproportionate liability exposure. Industry standard is 12 months.',
      },
      {
        original: 'Payment due within 60 days of invoice',
        suggested: 'Payment due within 30 days of invoice. Late payments accrue 1.5% monthly interest.',
        reasoning: 'Improves cash flow and incentivizes timely payment through penalty clause.',
      },
    ],
    negotiationTips: [
      {
        risk: 'Low Liability',
        suggestion: 'Push for liability cap of 12 months fees, capped at contract value.',
        industry_standard: 'Service agreements typically cap liability at 12 months of fees',
      },
      {
        risk: 'Payment Terms',
        suggestion: 'Request net-30 payment terms and include 1.5% late fee after 15 days.',
        industry_standard: 'Net-30 is standard in service industry; late fees are common incentive',
      },
    ],
    riskBreakdown: [
      { category: 'Liability', percentage: 45 },
      { category: 'Payment Terms', percentage: 35 },
      { category: 'Termination Rights', percentage: 20 },
    ],
  },
  {
    summary:
      'NDA covering technology trade secrets. Standard terms with reasonable confidentiality period of 3 years. Clear scope of what is considered confidential.',
    contractType: 'nda',
    risks: [
      {
        issue: 'Residual Knowledge Clause',
        severity: 'low',
        explanation:
          'NDA includes residual knowledge clause allowing use of general knowledge retained in unaided memory.',
      },
    ],
    riskScore: 25,
    decision: 'safe',
    decisionReason:
      'This is a balanced NDA with standard terms. The confidentiality period (3 years) and scope are reasonable. Safe to sign.',
    amendments: [],
    negotiationTips: [
      {
        risk: 'Residual Knowledge',
        suggestion: 'NDA already includes fair residual knowledge clause - no changes needed.',
        industry_standard: 'Most NDAs include residual knowledge carve-outs',
      },
    ],
    riskBreakdown: [{ category: 'Well-Balanced Terms', percentage: 100 }],
  },
]

export function getDemoAnalysis(): EnhancedAnalysisResult {
  return sampleAnalyses[Math.floor(Math.random() * sampleAnalyses.length)]
}
