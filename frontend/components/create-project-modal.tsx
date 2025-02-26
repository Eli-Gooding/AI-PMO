"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { ProjectUser } from "@/types/project"

interface CreateProjectModalProps {
  isOpen: boolean
  onClose: () => void
  onProjectCreated: () => void
}

export function CreateProjectModal({ isOpen, onClose, onProjectCreated }: CreateProjectModalProps) {
  const [projectName, setProjectName] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  const [tag, setTag] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [owners, setOwners] = useState<ProjectUser[]>([])
  const [members, setMembers] = useState<ProjectUser[]>([])
  const [users, setUsers] = useState<ProjectUser[]>([])
  const [openOwners, setOpenOwners] = useState(false)
  const [openMembers, setOpenMembers] = useState(false)

  const supabase = createClientComponentClient()

  const searchUsers = async (term: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('id, user_name, email')
      .ilike('user_name', `%${term}%`)
      .limit(5)

    if (data) {
      setUsers(data.map(user => ({
        id: user.id,
        name: user.user_name,
        image: '/placeholder.svg',
        role: '',
        lastCheckIn: {
          pastWeek: '',
          nextWeek: '',
          quarterGoals: ''
        }
      })))
    }
  }

  const handleCreateProject = async () => {
    try {
      // Insert new project
      const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .insert([
          {
            project_name: projectName,
            project_description: projectDescription,
            project_status: 'active'
          }
        ])
        .select()
        .single()

      if (projectError) throw projectError

      // Add project owners
      if (owners.length > 0) {
        const ownerRecords = owners.map(owner => ({
          user_id: owner.id,
          project_id: projectData.id
        }))
        
        await supabase.from('project_owners').insert(ownerRecords)
      }

      // Add project members
      if (members.length > 0) {
        const memberRecords = members.map(member => ({
          user_id: member.id,
          project_id: projectData.id
        }))
        
        await supabase.from('project_members').insert(memberRecords)
      }

      onProjectCreated()
      onClose()
    } catch (error) {
      console.error('Error creating project:', error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter project name"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tag">Project Tag</Label>
            <Input
              id="tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="Enter project tag"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="Enter project description"
            />
          </div>
          <div className="grid gap-2">
            <Label>Project Owners</Label>
            <Popover open={openOwners} onOpenChange={setOpenOwners}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openOwners}
                  className="justify-between"
                >
                  Select owners...
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[400px] p-0">
                <Command>
                  <CommandInput
                    placeholder="Search users..."
                    onValueChange={(search) => {
                      setSearchTerm(search)
                      searchUsers(search)
                    }}
                  />
                  <CommandEmpty>No users found.</CommandEmpty>
                  <CommandGroup>
                    {users.map((user) => (
                      <CommandItem
                        key={user.id}
                        onSelect={() => {
                          setOwners((prev) =>
                            prev.some((o) => o.id === user.id)
                              ? prev.filter((o) => o.id !== user.id)
                              : [...prev, user]
                          )
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            owners.some((o) => o.id === user.id)
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {user.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <div className="flex flex-wrap gap-2 mt-2">
              {owners.map((owner) => (
                <Badge
                  key={owner.id}
                  variant="secondary"
                  className="flex items-center gap-2"
                >
                  <Avatar className="h-6 w-6">
                    <AvatarFallback>{owner.name[0]}</AvatarFallback>
                  </Avatar>
                  {owner.name}
                </Badge>
              ))}
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Project Members</Label>
            <Popover open={openMembers} onOpenChange={setOpenMembers}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openMembers}
                  className="justify-between"
                >
                  Select members...
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[400px] p-0">
                <Command>
                  <CommandInput
                    placeholder="Search users..."
                    onValueChange={(search) => {
                      setSearchTerm(search)
                      searchUsers(search)
                    }}
                  />
                  <CommandEmpty>No users found.</CommandEmpty>
                  <CommandGroup>
                    {users.map((user) => (
                      <CommandItem
                        key={user.id}
                        onSelect={() => {
                          setMembers((prev) =>
                            prev.some((m) => m.id === user.id)
                              ? prev.filter((m) => m.id !== user.id)
                              : [...prev, user]
                          )
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            members.some((m) => m.id === user.id)
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {user.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <div className="flex flex-wrap gap-2 mt-2">
              {members.map((member) => (
                <Badge
                  key={member.id}
                  variant="secondary"
                  className="flex items-center gap-2"
                >
                  <Avatar className="h-6 w-6">
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  </Avatar>
                  {member.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleCreateProject}>Create Project</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 