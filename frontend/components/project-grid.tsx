"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Github, Trello, FileText, Plus } from "lucide-react"
import { ProjectDetailsModal } from "@/components/project-details-modal"
import { CreateProjectModal } from "@/components/create-project-modal"
import type { Project, ProjectUser } from "@/types/project"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

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
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const supabase = createClientComponentClient()

  const fetchProjects = async () => {
    try {
      // Fetch projects the user is a member or owner of
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select(`
          id,
          project_name,
          project_description,
          project_status,
          project_members (
            user:users (
              id,
              user_name,
              email
            )
          ),
          project_owners (
            user:users (
              id,
              user_name,
              email
            )
          )
        `)

      if (projectsError) throw projectsError

      // Transform the data to match our Project type
      const transformedProjects: Project[] = projectsData.map(project => ({
        id: project.id,
        name: project.project_name,
        description: project.project_description,
        status: project.project_status || 'active',
        todos: [], // TODO: Add todos table and fetch them
        team: [
          ...project.project_owners.map((owner: any) => ({
            id: owner.user.id,
            name: owner.user.user_name,
            image: '/placeholder.svg',
            role: 'Owner',
            lastCheckIn: {
              pastWeek: '',
              nextWeek: '',
              quarterGoals: ''
            }
          })),
          ...project.project_members.map((member: any) => ({
            id: member.user.id,
            name: member.user.user_name,
            image: '/placeholder.svg',
            role: 'Member',
            lastCheckIn: {
              pastWeek: '',
              nextWeek: '',
              quarterGoals: ''
            }
          }))
        ],
        integrations: [], // TODO: Add integrations table and fetch them
        users: [] // We'll populate this when opening the project details
      }))

      setProjects(transformedProjects)
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleProjectCreated = () => {
    fetchProjects()
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
                  className={cn("h-2 w-2 rounded-full", statusColors[project.status as keyof typeof statusColors])}
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

