import { AnalyticsTable } from "@/components/analytics/analytics-table"
import { DashboardHeader } from "@/components/dashboard-header"
import { ProtectedRoute } from "@/components/protected-route"

export default function AnalyticsPage() {
  return (
    <ProtectedRoute>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <DashboardHeader title="Analytics" description="Generate reports for your projects" />
        <AnalyticsTable />
      </div>
    </ProtectedRoute>
  )
}

