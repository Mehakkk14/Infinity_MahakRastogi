import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProtectedRoute } from "@/components/protected-route"
import { DashboardContent } from "@/components/dashboard/dashboard-content"

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 bg-muted/20 py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Document Analyzer
              </h1>
              <p className="mt-2 text-muted-foreground">
                Upload your legal document and get instant AI-powered analysis
              </p>
            </div>
            <DashboardContent />
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}
