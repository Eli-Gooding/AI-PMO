import { ProjectGrid } from "@/components/project-grid"
import { DashboardHeader } from "@/components/dashboard-header"

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <DashboardHeader />
      <ProjectGrid />
    </div>
  )
}

