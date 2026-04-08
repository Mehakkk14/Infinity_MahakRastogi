import Link from "next/link"
import { ArrowRight, FileText, AlertCircle, XCircle, AlertTriangle, CheckCircle2, Languages } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

const sampleContract = `EMPLOYMENT AGREEMENT

This Employment Agreement ("Agreement") is made and entered into as of January 15, 2024, by and between TechCorp Inc. ("Company") and the undersigned individual ("Employee").

1. POSITION AND DUTIES
The Company hereby employs the Employee as a Senior Software Developer. Employee shall perform such duties as are customarily associated with such position and as may be assigned from time to time by the Company.

2. COMPENSATION AND BENEFITS
a) Base Salary: The Company shall pay Employee a base salary of $120,000 per year.
b) Benefits: Employee shall be entitled to participate in the Company's health insurance, 401(k), and other benefit programs.

3. WORK SCHEDULE
Employee agrees to work a minimum of 40 hours per week. Additional hours may be required as necessary to complete assigned tasks, without additional compensation.

4. NON-COMPETE COVENANT
For a period of twenty-four (24) months following termination of employment, Employee shall not engage in any business activity that competes with the Company within a 100-mile radius.

5. INTELLECTUAL PROPERTY
All inventions, discoveries, designs, and works of authorship created by Employee during employment, whether during working hours or otherwise, shall be the sole and exclusive property of the Company.

6. TERMINATION
a) By Company: The Company may terminate this Agreement with seven (7) days written notice.
b) By Employee: Employee must provide thirty (30) days written notice prior to resignation.

7. ARBITRATION
Any disputes arising under this Agreement shall be resolved through binding arbitration, waiving the right to a jury trial.`

const analysisResults = {
  summary:
    "This is a standard employment contract for a Senior Software Developer position at TechCorp Inc. offering a $120,000 annual salary with benefits. The contract includes a 40-hour minimum work week, health insurance, and 401(k) participation. However, it contains several clauses that warrant careful consideration before signing.",
  risks: [
    {
      title: "24-Month Non-Compete Clause",
      description: "Restricts employment with competitors for 2 years within a 100-mile radius. This is unusually long and broad.",
      severity: "high",
    },
    {
      title: "Unlimited Overtime Without Pay",
      description: "The contract requires additional hours 'as necessary' without additional compensation.",
      severity: "high",
    },
    {
      title: "Broad Intellectual Property Assignment",
      description: "Assigns ALL inventions to the company, even those created outside work hours on personal time.",
      severity: "medium",
    },
    {
      title: "Unequal Termination Notice",
      description: "You must give 30 days notice, but the company only needs to give 7 days.",
      severity: "medium",
    },
    {
      title: "Mandatory Arbitration",
      description: "Waives your right to a jury trial for any disputes.",
      severity: "medium",
    },
  ],
  riskScore: 72,
  decision: "careful" as const,
  decisionReason:
    "While the base compensation and benefits are competitive, the non-compete clause and IP assignment are broader than industry standard. We recommend negotiating these terms before signing.",
}

export default function DemoPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-muted/20 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Badge variant="secondary" className="mb-2">
                Demo Mode
              </Badge>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Sample Contract Analysis
              </h1>
              <p className="mt-2 text-muted-foreground">
                See how LegalEase AI analyzes a real employment contract
              </p>
            </div>
            <Link href="/dashboard">
              <Button className="group gap-2">
                Analyze Your Own
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {/* Two column layout */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Left - Contract Preview */}
            <div className="space-y-4">
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="h-5 w-5 text-primary" />
                    Original Contract
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="max-h-[600px] overflow-y-auto rounded-lg bg-muted/50 p-4 font-mono text-sm leading-relaxed text-muted-foreground">
                    <pre className="whitespace-pre-wrap">{sampleContract}</pre>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right - Analysis Results */}
            <div className="space-y-4">
              {/* Language Toggle */}
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Languages className="h-4 w-4" />
                    <span>Language</span>
                  </div>
                  <div className="flex gap-1 rounded-lg bg-muted/50 p-1">
                    <button className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground shadow-sm">
                      EN
                    </button>
                    <button className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
                      हिंदी
                    </button>
                    <button className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
                      Hinglish
                    </button>
                  </div>
                </CardContent>
              </Card>

              {/* Summary */}
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="h-5 w-5 text-primary" />
                    Simple Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed text-muted-foreground">
                    {analysisResults.summary}
                  </p>
                </CardContent>
              </Card>

              {/* Risk Alerts */}
              <Card className="border-destructive/30 bg-destructive/5 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg text-destructive">
                    <AlertCircle className="h-5 w-5" />
                    Risky Clauses ({analysisResults.risks.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {analysisResults.risks.map((risk, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <XCircle
                          className={`mt-0.5 h-5 w-5 shrink-0 ${
                            risk.severity === "high"
                              ? "text-destructive"
                              : "text-warning"
                          }`}
                        />
                        <div>
                          <p className="font-medium text-foreground">{risk.title}</p>
                          <p className="mt-0.5 text-sm text-muted-foreground">
                            {risk.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Risk Score */}
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-lg">
                    <span>Risk Score</span>
                    <span className="text-2xl font-bold text-destructive">
                      {analysisResults.riskScore}%
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress value={analysisResults.riskScore} className="h-3" />
                  <p className="mt-2 text-sm font-medium text-destructive">
                    High Risk - Review Required
                  </p>
                </CardContent>
              </Card>

              {/* Decision */}
              <Card className="border-warning/30 bg-warning/5 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                    Should I Sign This?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-warning/20">
                      <AlertTriangle className="h-7 w-7 text-warning" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-warning">Be Careful</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {analysisResults.decisionReason}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="py-12">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                  Ready to Analyze Your Own Documents?
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
                  Upload your contracts, agreements, or any legal document and get instant AI-powered analysis.
                </p>
                <Link href="/dashboard" className="mt-8 inline-block">
                  <Button size="lg" className="group h-12 gap-2 px-8 text-base">
                    Start Analyzing
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
