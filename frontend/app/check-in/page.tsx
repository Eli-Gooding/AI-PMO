import { CheckInChat } from "@/components/check-in/chat"
import { CheckInHistory } from "@/components/check-in/history"
import { ProtectedRoute } from "@/components/protected-route"

export default function CheckInPage() {
  return (
    <ProtectedRoute>
      <div className="flex h-[calc(100vh-3.5rem)]">
        <CheckInHistory />
        <CheckInChat />
      </div>
    </ProtectedRoute>
  )
}

