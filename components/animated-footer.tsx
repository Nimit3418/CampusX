"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Sparkles, Github, Twitter } from "lucide-react"

export function AnimatedFooter() {
  return (
    <footer className="border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gradient">CampusXchange</span>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-8 text-sm"
          >
            {["Products", "Services", "Requests"].map((link) => (
              <Link
                key={link}
                href={`/${link.toLowerCase()}`}
                className="text-muted-foreground hover:text-cyan-400 transition-colors"
              >
                {link}
              </Link>
            ))}
          </motion.div>

          {/* Social & Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <span className="text-sm text-muted-foreground">Built for students, by students</span>
            <div className="flex items-center gap-2">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-8 h-8 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-cyan-400 transition-colors"
              >
                <Github className="h-4 w-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-8 h-8 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-cyan-400 transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 pt-8 border-t border-white/10 text-center"
        >
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} CampusXchange. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}
