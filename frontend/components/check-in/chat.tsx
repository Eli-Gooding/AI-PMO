"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  type: "system" | "user"
  content: string
  timestamp: Date
}

const prompts = [
  {
    id: "past-week",
    content: "Let's review last week. What did you accomplish? Were there any challenges?",
  },
  {
    id: "next-week",
    content: "What are your goals for next week? How will you measure success?",
  },
  {
    id: "quarterly",
    content: "Looking at your quarterly goals, how are you progressing? Any concerns?",
  },
]

export function CheckInChat() {
  const [started, setStarted] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [currentPrompt, setCurrentPrompt] = useState(0)
  const [input, setInput] = useState("")

  const handleStart = () => {
    setStarted(true)
    setMessages([
      {
        id: "welcome",
        type: "system",
        content: prompts[0].content,
        timestamp: new Date(),
      },
    ])
  }

  const handleSend = () => {
    if (!input.trim()) return

    const newMessages = [
      ...messages,
      {
        id: Math.random().toString(),
        type: "user",
        content: input,
        timestamp: new Date(),
      },
    ]

    if (currentPrompt < prompts.length - 1) {
      newMessages.push({
        id: prompts[currentPrompt + 1].id,
        type: "system",
        content: prompts[currentPrompt + 1].content,
        timestamp: new Date(),
      })
      setCurrentPrompt(currentPrompt + 1)
    }

    setMessages(newMessages)
    setInput("")
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="border-b px-6 py-3">
        <h1 className="text-xl font-semibold">Weekly Check-In</h1>
        <p className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {!started ? (
            <div className="flex h-full items-center justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700" onClick={handleStart}>
                Start Check-In
              </Button>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex w-max max-w-[80%] flex-col gap-2 rounded-lg px-4 py-2",
                  message.type === "system" ? "bg-muted" : "ml-auto bg-primary text-primary-foreground",
                )}
              >
                <p className="text-sm">{message.content}</p>
                <span className="text-xs opacity-70">{message.timestamp.toLocaleTimeString()}</span>
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      {started && (
        <div className="border-t p-4">
          <div className="flex gap-4">
            <Textarea
              placeholder="Type your response..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[80px]"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
            />
            <Button size="icon" className="h-[80px] w-[80px] bg-green-600 hover:bg-green-700" onClick={handleSend}>
              <Send className="h-6 w-6" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

