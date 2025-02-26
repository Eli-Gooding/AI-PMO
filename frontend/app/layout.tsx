import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { headers } from "next/headers"

import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { AuthProvider } from "@/lib/auth-context"
import { ErrorBoundary } from "@/components/error-boundary"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Project Management & Check-In",
  description: "Modern project management and check-in application",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get the current path
  const headersList = headers()
  const pathname = headersList.get("x-invoke-path") || ""
  
  // Determine if we should show the header (hide on auth-related pages and 404)
  const authPaths = ["/login", "/signup", "/forgot-password", "/reset-password"]
  const is404 = pathname === "/not-found" || pathname.includes("/_not-found")
  const showHeader = !authPaths.some(path => pathname.includes(path)) && !is404
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <AuthProvider>
              <div className="flex min-h-screen flex-col">
                {showHeader && (
                  <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="flex h-14 items-center px-4 w-full justify-between">
                      <MainNav />
                      <div className="flex items-center space-x-4">
                        <UserNav />
                      </div>
                    </div>
                  </header>
                )}
                <main className="flex-1">{children}</main>
              </div>
            </AuthProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}