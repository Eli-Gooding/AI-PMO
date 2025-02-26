"use client"

import { useState } from "react"
import { X, ChevronRight } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type ProjectUser = {
  id: string
  name: string
  image: string
  role: string
  lastCheckIn: {
    pastWeek: string
    nextWeek: string
    quarterGoals: string
  }
}

type Project = {
  id: string
  name: string
  description: string
  status: "active" | "completed" | "on-hold"
  todos: string[]
  users: ProjectUser[]
}

type ProjectDetailsModalProps = {
  project: Project
  isOpen: boolean
  onClose: () => void
}

export function ProjectDetailsModal({ project, isOpen, onClose }: ProjectDetailsModalProps) {
  const [selectedUser, setSelectedUser] = useState<ProjectUser | null>(null)

  const statusColors = {
    active: "bg-green-500",
    completed: "bg-blue-500",
    "on-hold": "bg-yellow-500",
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{project.name}</DialogTitle>
          <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh] pr-4">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold">Description</h3>
              <p className="text-muted-foreground">{project.description}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Status</h3>
              <Badge className={statusColors[project.status]}>{project.status}</Badge>
            </div>
            <div>
              <h3 className="text-lg font-semibold">To-Do List</h3>
              <ul className="list-inside list-disc">
                {project.todos.map((todo, index) => (
                  <li key={index}>{todo}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Team Members</h3>
              <div className="space-y-2">
                {project.users.map((user) => (
                  <Button
                    key={user.id}
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setSelectedUser(user)}
                  >
                    <Avatar className="mr-2">
                      <AvatarImage src={user.image} alt={user.name} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <span>{user.name}</span>
                    <span className="ml-auto text-muted-foreground">{user.role}</span>
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ))}
              </div>
            </div>
            {selectedUser && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Avatar className="mr-2">
                      <AvatarImage src={selectedUser.image} alt={selectedUser.name} />
                      <AvatarFallback>{selectedUser.name[0]}</AvatarFallback>
                    </Avatar>
                    {selectedUser.name}'s Last Check-In
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Past Week</h4>
                    <p className="text-muted-foreground">{selectedUser.lastCheckIn.pastWeek}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Plan for Next Week</h4>
                    <p className="text-muted-foreground">{selectedUser.lastCheckIn.nextWeek}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Quarterly Goals Status</h4>
                    <p className="text-muted-foreground">{selectedUser.lastCheckIn.quarterGoals}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

