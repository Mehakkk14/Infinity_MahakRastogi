import { FileSearch, ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function EmptyState() {
  return (
    <Card className="flex min-h-[400px] items-center justify-center border-border/50 bg-card/50 backdrop-blur-sm">
      <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
        <div className="rounded-full bg-muted p-6">
          <FileSearch className="h-12 w-12 text-muted-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">No Document Uploaded</h3>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Upload a legal document or paste text to get started. Our AI will analyze it and provide insights within seconds.
          </p>
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm text-primary">
          <ArrowLeft className="h-4 w-4" />
          <span>Start by uploading your document</span>
        </div>
      </CardContent>
    </Card>
  )
}
