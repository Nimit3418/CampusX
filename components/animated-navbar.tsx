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
import { Menu, X, UserIcon, LogOut, LayoutDashboard, Plus, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function AnimatedNavbar() {
  const [user, setUser] = useState<User | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const supabase = createClient()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass border-b border-white/10 shadow-lg shadow-cyan-500/5" : "bg-transparent"
        }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center glow-cyan"
            >
              <Sparkles className="h-5 w-5 text-white" />
            </motion.div>
            <span className="font-bold text-xl text-gradient">CampusXchange</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <Link
                  href={link.href}
                  className={`relative px-4 py-2 rounded-lg transition-all duration-300 ${pathname.startsWith(link.href) ? "text-cyan-400" : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {link.label}
                  {pathname.startsWith(link.href) && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-cyan-400/10 rounded-lg border border-cyan-400/20"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link href="/create">
                  <Button size="sm" className="btn-premium text-primary-foreground border-0">
                    <Plus className="h-4 w-4 mr-1" />
                    Create
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2 glass hover:bg-white/10">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center">
                        <UserIcon className="h-4 w-4 text-white" />
                      </div>
                      <span className="max-w-[100px] truncate">{user.email?.split("@")[0]}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 glass border-white/10">
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
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-400">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    Log in
                  </Button>
                </Link>
                <Link href="/auth/sign-up">
                  <Button size="sm" className="btn-premium text-primary-foreground border-0">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="md:hidden p-2 glass rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden py-4 border-t border-white/10 overflow-hidden"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className={`block py-3 px-4 rounded-lg transition-colors ${pathname.startsWith(link.href)
                          ? "text-cyan-400 bg-cyan-400/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                        }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-2">
                  {user ? (
                    <>
                      <Link href="/create" onClick={() => setMobileMenuOpen(false)}>
                        <Button size="sm" className="w-full btn-premium text-primary-foreground border-0">
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
                        className="w-full justify-start text-red-400"
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
                        <Button size="sm" className="w-full btn-premium text-primary-foreground border-0">
                          Get Started
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
