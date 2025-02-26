import { CheckInChat } from "@/components/check-in/chat"
import { CheckInHistory } from "@/components/check-in/history"

export default function CheckInPage() {
  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      <CheckInHistory />
      <CheckInChat />
    </div>
  )
}

