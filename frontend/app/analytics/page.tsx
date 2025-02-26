import { AnalyticsTable } from "@/components/analytics/analytics-table"
import { DashboardHeader } from "@/components/dashboard-header"

export default function AnalyticsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <DashboardHeader title="Analytics" description="Generate reports for your projects" />
      <AnalyticsTable />
    </div>
  )
}

