"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Activity } from "lucide-react"

interface RiskBreakdown {
  category: string
  percentage: number
}

interface RiskDashboardProps {
  riskScore: number
  riskBreakdown: RiskBreakdown[]
  contractType: string
}

const COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6", "#ec4899"]

export function RiskDashboard({
  riskScore,
  riskBreakdown,
  contractType,
}: RiskDashboardProps) {
  const getRiskLevel = (score: number): string => {
    if (score < 30) return "Safe"
    if (score < 70) return "Careful"
    return "Risky"
  }

  const getRiskColor = (score: number): string => {
    if (score < 30) return "text-green-600"
    if (score < 70) return "text-amber-600"
    return "text-red-600"
  }

  const getRiskBgColor = (score: number): string => {
    if (score < 30) return "bg-green-100 dark:bg-green-950"
    if (score < 70) return "bg-amber-100 dark:bg-amber-950"
    return "bg-red-100 dark:bg-red-950"
  }

  const chartData = riskBreakdown.map((item) => ({
    name: item.category,
    value: item.percentage,
  }))

  return (
    <div className="space-y-4">
      {/* Risk Score Card */}
      <Card className={`p-6 ${getRiskBgColor(riskScore)}`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Activity className="h-5 w-5" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Overall Risk Score
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className={`text-4xl font-bold ${getRiskColor(riskScore)}`}>
                {riskScore}
              </span>
              <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                / 100
              </span>
            </div>
            <p className="mt-2 text-sm font-semibold">
              <Badge variant="outline">{getRiskLevel(riskScore)}</Badge>
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-600 dark:text-gray-400">Contract Type</p>
            <p className="text-lg font-semibold capitalize text-gray-900 dark:text-gray-100">
              {contractType}
            </p>
          </div>
        </div>
      </Card>

      {/* Risk Breakdown Chart */}
      {chartData.length > 0 && (
        <Card className="p-6">
          <h3 className="mb-4 font-semibold">Risk Breakdown by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      )}

      {/* Risk Categories Detail */}
      {chartData.length > 0 && (
        <Card className="p-4">
          <h4 className="mb-3 font-semibold text-sm">Risk Categories</h4>
          <div className="space-y-2">
            {chartData.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="flex-1 text-sm text-gray-700 dark:text-gray-300">
                  {item.name}
                </span>
                <span className="font-semibold text-sm">{item.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
