import Link from "next/link"
import { ArrowRight, Upload, Brain, FileCheck, Shield } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload Your Document",
    description:
      "Simply drag and drop your legal document or paste the text directly. We support PDF, DOC, DOCX, and plain text formats. Your document is encrypted and processed securely.",
    details: [
      "Supports multiple file formats",
      "Drag and drop or paste text",
      "Bank-level encryption",
    ],
  },
  {
    number: "02",
    icon: Brain,
    title: "AI Analyzes Your Contract",
    description:
      "Our advanced AI, trained on millions of legal documents, reads through your contract in seconds. It identifies key terms, unusual clauses, and potential risks that could affect you.",
    details: [
      "Trained on legal datasets",
      "Identifies complex patterns",
      "Contextual understanding",
    ],
  },
  {
    number: "03",
    icon: FileCheck,
    title: "Get Your Results",
    description:
      "Receive a comprehensive analysis including a plain-language summary, highlighted risky clauses, an overall risk score, and a clear recommendation on whether to sign.",
    details: [
      "Plain-language summary",
      "Risk score (0-100)",
      "Clear sign/don't sign recommendation",
    ],
  },
]

export default function HowItWorksPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border/40 bg-muted/30 py-20 sm:py-28">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                How LegalEase AI Works
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Three simple steps to understand any legal document. No law degree required.
              </p>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-16 lg:space-y-24">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center gap-8 lg:flex-row lg:gap-16 ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content */}
                  <div className="flex-1 text-center lg:text-left">
                    <div className="mb-4 inline-flex items-center gap-3">
                      <span className="text-5xl font-bold text-primary/20">{step.number}</span>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                        <step.icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                      {step.title}
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">{step.description}</p>
                    <ul className="mt-6 space-y-3">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-center justify-center gap-2 lg:justify-start">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          <span className="text-sm text-muted-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Visual */}
                  <div className="flex-1">
                    <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm">
                      <CardContent className="flex aspect-[4/3] items-center justify-center p-8">
                        <div className="relative">
                          <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl" />
                          <div className="relative flex h-32 w-32 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm">
                            <step.icon className="h-16 w-16 text-primary" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="border-y border-border/40 bg-muted/30 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-success/10">
                <Shield className="h-8 w-8 text-success" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Your Privacy is Our Priority
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                We use bank-level encryption to protect your documents. Your files are processed securely and never stored permanently. We don&apos;t share your data with third parties.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-success" />
                  <span>256-bit encryption</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-success" />
                  <span>GDPR compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-success" />
                  <span>SOC 2 certified</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Ready to Try It?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Upload your first document and see LegalEase AI in action.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/dashboard">
                  <Button size="lg" className="group h-12 gap-2 px-8 text-base">
                    Start Analyzing
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                    View Demo First
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
