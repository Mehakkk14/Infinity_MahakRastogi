import Link from "next/link"
import { ArrowRight, CheckCircle2, AlertCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function DemoPreviewSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            See LegalEase AI in Action
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Here&apos;s a preview of how our AI analyzes your documents
          </p>
        </div>

        {/* Demo preview */}
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-2 shadow-2xl shadow-primary/10 backdrop-blur-sm">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-border/50 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-destructive/60" />
                <div className="h-3 w-3 rounded-full bg-warning/60" />
                <div className="h-3 w-3 rounded-full bg-success/60" />
              </div>
              <div className="mx-auto rounded-lg bg-muted/50 px-6 py-1.5 text-xs text-muted-foreground">
                app.legalease.ai/dashboard
              </div>
            </div>

            {/* Dashboard preview content */}
            <div className="grid gap-4 p-6 md:grid-cols-2">
              {/* Left side - Upload area */}
              <div className="flex flex-col gap-4">
                <Card className="border-dashed border-primary/30 bg-primary/5">
                  <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mb-4 rounded-full bg-primary/10 p-4">
                      <svg
                        className="h-8 w-8 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    </div>
                    <p className="font-medium text-foreground">Upload your document</p>
                    <p className="mt-1 text-sm text-muted-foreground">PDF, DOC, or paste text</p>
                  </CardContent>
                </Card>

                <Card className="bg-card/80">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        65
                      </span>
                      Risk Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Progress value={65} className="h-2" />
                    <p className="mt-2 text-sm text-warning">Moderate Risk - Review Recommended</p>
                  </CardContent>
                </Card>
              </div>

              {/* Right side - Results */}
              <div className="flex flex-col gap-4">
                <Card className="bg-card/80">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Simple Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      This is a standard employment contract with a 90-day probation period. It includes a non-compete clause that limits your ability to work for competitors...
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-destructive/30 bg-destructive/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base text-destructive">
                      <AlertCircle className="h-4 w-4" />
                      Risky Clauses
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                      <span className="text-muted-foreground">24-month non-compete clause</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                      <span className="text-muted-foreground">Unlimited overtime requirements</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-warning/30 bg-warning/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base text-warning-foreground">
                      <AlertCircle className="h-4 w-4 text-warning" />
                      Should I Sign This?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warning/20">
                      <AlertCircle className="h-5 w-5 text-warning" />
                    </div>
                    <div>
                      <p className="font-semibold text-warning">Be Careful</p>
                      <p className="text-sm text-muted-foreground">Review highlighted issues first</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* CTA below preview */}
          <div className="mt-12 text-center">
            <Link href="/demo">
              <Button size="lg" variant="outline" className="group h-12 gap-2 px-8 text-base">
                Try the Full Demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
