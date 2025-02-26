"use client"

import { useState } from "react"

import { format } from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

const pastCheckIns = [
  {
    id: 1,
    date: new Date("2024-02-18"),
    summary: "Completed API integration, started work on frontend components",
    status: "completed",
  },
  {
    id: 2,
    date: new Date("2024-02-11"),
    summary: "Working on database schema and backend architecture",
    status: "completed",
  },
  {
    id: 3,
    date: new Date("2024-02-04"),
    summary: "Project kickoff and initial planning",
    status: "completed",
  },
]

export function CheckInHistory() {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div className={cn("border-r bg-muted/40 transition-all duration-300", isExpanded ? "w-80" : "w-0")}>
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b px-6 py-3">
          <h2 className="font-semibold">History</h2>
          <Button variant="ghost" size="icon" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ChevronLeft /> : <ChevronRight />}
          </Button>
        </div>

        {isExpanded && (
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {pastCheckIns.map((checkIn) => (
                <Button key={checkIn.id} variant="ghost" className="w-full justify-start">
                  <div className="flex flex-col items-start gap-1">
                    <span className="text-sm font-medium">{format(checkIn.date, "MMMM d, yyyy")}</span>
                    <p className="text-xs text-muted-foreground line-clamp-2">{checkIn.summary}</p>
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  )
}

