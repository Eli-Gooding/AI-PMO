import Link from "next/link"
import { Home, CheckSquare, BarChart3 } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export function MainNav() {
  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <CheckSquare className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">ProjectCheck</span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link href="/" className={cn(buttonVariants({ variant: "ghost" }), "hover:bg-transparent hover:text-primary")}>
          <Home className="mr-2 h-4 w-4" />
          Dashboard
        </Link>
        <Link
          href="/check-in"
          className={cn(buttonVariants({ variant: "ghost" }), "hover:bg-transparent hover:text-primary")}
        >
          <CheckSquare className="mr-2 h-4 w-4" />
          Check-Ins
        </Link>
        <Link
          href="/analytics"
          className={cn(buttonVariants({ variant: "ghost" }), "hover:bg-transparent hover:text-primary")}
        >
          <BarChart3 className="mr-2 h-4 w-4" />
          Analytics
        </Link>
      </nav>
    </div>
  )
}

