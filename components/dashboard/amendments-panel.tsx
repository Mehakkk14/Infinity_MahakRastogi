"use client"

import { RiskAmendment } from "@/lib/openai-client"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, AlertCircle } from "lucide-react"

interface AmendmentsPanelProps {
  amendments: RiskAmendment[]
}

export function AmendmentsPanel({ amendments }: AmendmentsPanelProps) {
  if (!amendments || amendments.length === 0) {
    return null
  }

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Check className="h-5 w-5 text-green-600" />
          <h3 className="font-semibold text-lg">Suggested Amendments</h3>
          <Badge variant="secondary">{amendments.length}</Badge>
        </div>

        <div className="space-y-4">
          {amendments.map((amendment, index) => (
            <div
              key={index}
              className="space-y-3 border-l-2 border-amber-200 bg-amber-50 p-3 dark:border-amber-900 dark:bg-amber-950/30"
            >
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
                  Original Clause
                </p>
                <p className="text-sm italic text-red-600 line-through dark:text-red-400">
                  "{amendment.original}"
                </p>
              </div>

              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
                  Suggested Version
                </p>
                <p className="text-sm font-medium text-green-700 dark:text-green-400">
                  "{amendment.suggested}"
                </p>
              </div>

              <div>
                <p className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
                  <AlertCircle className="h-3 w-3" />
                  Why This Matters
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {amendment.reasoning}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
