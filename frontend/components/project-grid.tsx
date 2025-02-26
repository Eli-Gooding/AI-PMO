"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Github, Trello, FileText, Plus } from "lucide-react"
import { ProjectDetailsModal } from "@/components/project-details-modal"
import { CreateProjectModal } from "@/components/create-project-modal"
import type { Project } from "@/types/project"

const projects: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Complete overhaul of the company website with new branding",
    status: "active",
    todos: ["Finalize homepage design", "Implement responsive layout", "Integrate CMS", "Conduct user testing"],
    team: [
      { 
        id: "1", 
        name: "Alice", 
        image: "/placeholder.svg", 
        role: "Project Manager",
        lastCheckIn: {
          pastWeek: "Finalized project timeline and assigned tasks to team members.",
          nextWeek: "Begin stakeholder interviews and create initial wireframes.",
          quarterGoals: "On track to complete the redesign by end of Q2.",
        }
      },
      { 
        id: "2", 
        name: "Bob", 
        image: "/placeholder.svg", 
        role: "UI Designer",
        lastCheckIn: {
          pastWeek: "Created mood boards and initial color schemes.",
          nextWeek: "Start designing key pages based on approved wireframes.",
          quarterGoals: "50% complete on creating the new design system.",
        }
      },
      { 
        id: "3", 
        name: "Charlie", 
        image: "/placeholder.svg", 
        role: "Frontend Developer",
        lastCheckIn: {
          pastWeek: "Set up the new development environment and project structure.",
          nextWeek: "Begin implementing the homepage design.",
          quarterGoals: "Research and propose new frontend technologies to improve performance.",
        }
      },
    ],
    integrations: ["github", "trello", "docs"],
    users: [
      {
        id: "1",
        name: "Alice",
        image: "/placeholder.svg",
        role: "Project Manager",
        lastCheckIn: {
          pastWeek: "Finalized project timeline and assigned tasks to team members.",
          nextWeek: "Begin stakeholder interviews and create initial wireframes.",
          quarterGoals: "On track to complete the redesign by end of Q2.",
        },
      },
      {
        id: "2",
        name: "Bob",
        image: "/placeholder.svg",
        role: "UI Designer",
        lastCheckIn: {
          pastWeek: "Created mood boards and initial color schemes.",
          nextWeek: "Start designing key pages based on approved wireframes.",
          quarterGoals: "50% complete on creating the new design system.",
        },
      },
      {
        id: "3",
        name: "Charlie",
        image: "/placeholder.svg",
        role: "Frontend Developer",
        lastCheckIn: {
          pastWeek: "Set up the new development environment and project structure.",
          nextWeek: "Begin implementing the homepage design.",
          quarterGoals: "Research and propose new frontend technologies to improve performance.",
        },
      },
    ],
  },
  // ... (add more projects with similar structure)
]

const statusColors = {
  active: "bg-green-500",
  completed: "bg-blue-500",
  "on-hold": "bg-yellow-500",
}

const integrationIcons = {
  github: Github,
  trello: Trello,
  docs: FileText,
}

export function ProjectGrid() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  const handleProjectCreated = () => {
    // TODO: Refresh projects list
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="flex-1" />
        <Button onClick={() => setShowCreateModal(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Project
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="flex flex-col cursor-pointer transition-shadow hover:shadow-md"
            onClick={() => setSelectedProject(project)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{project.name}</h3>
                <div
                  className={cn("h-2 w-2 rounded-full", statusColors[project.status])}
                />
              </div>
              <p className="text-sm text-muted-foreground">{project.description}</p>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex -space-x-2">
                {project.team.map((member, i) => (
                  <Avatar key={i} className="border-2 border-background">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex space-x-2">
                {project.integrations.map((integration) => {
                  const Icon = integrationIcons[integration as keyof typeof integrationIcons]
                  return (
                    <Badge key={integration} variant="secondary">
                      <Icon className="mr-1 h-3 w-3" />
                      {integration}
                    </Badge>
                  )
                })}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      {selectedProject && (
        <ProjectDetailsModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
      <CreateProjectModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onProjectCreated={handleProjectCreated}
      />
    </>
  )
}

