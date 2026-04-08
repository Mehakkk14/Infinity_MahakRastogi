'use client'

import * as React from 'react'
import { Clock, Trash2, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { deleteAnalysis, getAnalysisHistory, formatDate, type StoredAnalysis } from '@/lib/storage'
import { cn } from '@/lib/utils'

interface AnalysisHistoryProps {
  onSelectAnalysis?: (analysis: StoredAnalysis) => void
}

export function AnalysisHistory({ onSelectAnalysis }: AnalysisHistoryProps) {
  const [history, setHistory] = React.useState<StoredAnalysis[]>([])
  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    setIsClient(true)
    setHistory(getAnalysisHistory())
  }, [])

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    deleteAnalysis(id)
    setHistory(getAnalysisHistory())
  }

  const getRiskIcon = (decision: string) => {
    switch (decision) {
      case 'safe':
        return <CheckCircle2 className="h-4 w-4 text-success" />
      case 'careful':
        return <AlertTriangle className="h-4 w-4 text-warning" />
      case 'risky':
        return <XCircle className="h-4 w-4 text-destructive" />
      default:
        return null
    }
  }

  if (!isClient) return null

  if (history.length === 0) {
    return null
  }

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Recent Analyses
        </CardTitle>
        <CardDescription>
          Your last {history.length} documents analyzed
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {history.map((analysis) => (
            <button
              key={analysis.id}
              onClick={() => onSelectAnalysis?.(analysis)}
              className="w-full text-left"
            >
              <div className="flex items-start gap-3 rounded-lg border border-border/50 p-3 transition-colors hover:bg-muted/50">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {getRiskIcon(analysis.decision)}
                    <p className="font-medium truncate text-sm">{analysis.fileName}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDate(analysis.timestamp)}
                  </p>
                  <p className="text-xs text-muted-foreground truncate mt-1">
                    {analysis.documentPreview}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className={cn(
                      'text-xs font-semibold',
                      analysis.riskScore <= 30 ? 'text-success' : 
                      analysis.riskScore <= 70 ? 'text-warning' :
                      'text-destructive'
                    )}>
                      {analysis.riskScore}% risk
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => handleDelete(analysis.id, e)}
                    className="h-8 w-8 p-0"
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                  </Button>
                </div>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
