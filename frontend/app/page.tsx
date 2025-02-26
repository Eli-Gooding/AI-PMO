import { ProjectGrid } from "@/components/project-grid"
import { DashboardHeader } from "@/components/dashboard-header"
import { ProtectedRoute } from "@/components/protected-route"

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <DashboardHeader 
          title="Dashboard" 
          description="Welcome to your project management dashboard" 
        />
        <ProjectGrid />
      </div>
    </ProtectedRoute>
  )
}

