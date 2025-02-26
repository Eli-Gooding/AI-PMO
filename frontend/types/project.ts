export type ProjectUser = {
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

export type Project = {
  id: string
  name: string
  description: string
  status: "active" | "completed" | "on-hold"
  todos: string[]
  team: ProjectUser[]
  integrations: string[]
  users: ProjectUser[]
} 