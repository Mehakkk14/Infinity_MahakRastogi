"use client"

import { NegotiationTip } from "@/lib/openai-client"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap } from "lucide-react"

interface NegotiationTipsProps {
  tips: NegotiationTip[]
}

export function NegotiationTips({ tips }: NegotiationTipsProps) {
  if (!tips || tips.length === 0) {
    return null
  }

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-lg">Negotiation Tips</h3>
          <Badge variant="secondary">{tips.length}</Badge>
        </div>

        <div className="space-y-3">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="space-y-2 border-l-2 border-blue-200 bg-blue-50 p-3 dark:border-blue-900 dark:bg-blue-950/30"
            >
              <p className="font-semibold text-blue-900 dark:text-blue-100">
                {tip.risk}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">Your Move:</span> {tip.suggestion}
              </p>
              <p className="text-xs italic text-gray-600 dark:text-gray-400">
                Standard: {tip.industry_standard}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
