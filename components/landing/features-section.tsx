import { FileText, AlertTriangle, Brain } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: FileText,
    title: "Simplify Legal Language",
    description:
      "Complex legal jargon becomes clear, everyday language. Understand exactly what you're agreeing to without needing a law degree.",
    gradient: "from-primary/20 to-primary/5",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: AlertTriangle,
    title: "Detect Risky Clauses",
    description:
      "Our AI automatically highlights potentially unfavorable terms, hidden fees, and clauses that could put you at a disadvantage.",
    gradient: "from-warning/20 to-warning/5",
    iconBg: "bg-warning/10",
    iconColor: "text-warning",
  },
  {
    icon: Brain,
    title: "AI Decision System",
    description:
      "Get a clear recommendation on whether to sign, proceed with caution, or walk away, along with reasoning you can trust.",
    gradient: "from-success/20 to-success/5",
    iconBg: "bg-success/10",
    iconColor: "text-success",
  },
]

export function FeaturesSection() {
  return (
    <section className="border-y border-border/40 bg-muted/30 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to review contracts
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Powered by advanced AI that understands legal documents like a seasoned attorney
          </p>
        </div>

        {/* Features grid */}
        <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              {/* Gradient background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
              />

              <CardHeader className="relative">
                <div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.iconBg} transition-transform duration-300 group-hover:scale-110`}
                >
                  <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
