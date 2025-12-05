"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, X, UserIcon, LogOut, LayoutDashboard, Plus } from "lucide-react"
import { GlobalSearch } from "@/components/global-search"

export function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  const navLinks = [
    { href: "/products", label: "Products" },
    { href: "/services", label: "Services" },
    { href: "/requests", label: "Requests" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
              <span className="text-background font-bold text-sm">SL</span>
            </div>
            <span className="font-semibold text-xl">CampusXchange</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors ${pathname.startsWith(link.href)
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth & Search - Added GlobalSearch component */}
          <div className="hidden md:flex items-center gap-3">
            <GlobalSearch />
            {user ? (
              <>
                <Link href="/create">
                  <Button size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-1" />
                    Create
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                        <UserIcon className="h-3.5 w-3.5" />
                      </div>
                      <span className="max-w-[100px] truncate">{user.email?.split("@")[0]}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="cursor-pointer">
                        <LayoutDashboard className="h-4 w-4 mr-2" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        <UserIcon className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">
                    Log in
                  </Button>
                </Link>
                <Link href="/auth/sign-up">
                  <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <div className="px-2">
                <GlobalSearch />
              </div>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`py-2 transition-colors ${pathname.startsWith(link.href) ? "text-foreground font-medium" : "text-muted-foreground"
                    }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-border flex flex-col gap-2">
                {user ? (
                  <>
                    <Link href="/create" onClick={() => setMobileMenuOpen(false)}>
                      <Button size="sm" variant="outline" className="w-full bg-transparent">
                        <Plus className="h-4 w-4 mr-1" />
                        Create Listing
                      </Button>
                    </Link>
                    <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                      <Button size="sm" variant="ghost" className="w-full justify-start">
                        <LayoutDashboard className="h-4 w-4 mr-2" />
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-full justify-start text-destructive"
                      onClick={handleSignOut}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="ghost" size="sm" className="w-full">
                        Log in
                      </Button>
                    </Link>
                    <Link href="/auth/sign-up" onClick={() => setMobileMenuOpen(false)}>
                      <Button size="sm" className="w-full bg-foreground text-background hover:bg-foreground/90">
                        Sign up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
