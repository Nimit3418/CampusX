"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HeroScene } from "@/components/3d/hero-scene"
import { SplineHero } from "@/components/3d/spline-hero"
import { AnimatedNavbar } from "@/components/animated-navbar"
import { AnimatedStats } from "@/components/animated-stats"
import { AnimatedFeatures } from "@/components/animated-features"
import { AnimatedBenefits } from "@/components/animated-benefits"
import { AnimatedCTA } from "@/components/animated-cta"
import { AnimatedFooter } from "@/components/animated-footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Grid pattern background */}
      <div className="fixed inset-0 grid-pattern pointer-events-none" />

      {/* Animated Navbar */}
      <AnimatedNavbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        {/* 3D Background Scene - Choose one: */}

        {/* Option 1: React Three Fiber (current) */}
        <HeroScene />

        {/* Option 2: Spline (uncomment to use) */}
        {/* <SplineHero /> */}

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-500/30 mb-8"
            >
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span className="text-sm font-medium text-cyan-400">Campus Marketplace</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-8 text-balance"
            >
              <span className="block text-foreground">Everything for</span>
              <span className="block text-gradient glow-text">Campus Life</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 text-pretty leading-relaxed"
            >
              Buy and sell products, book micro-services, and post urgent requests — all in one unified campus
              marketplace built for students.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/auth/sign-up">
                <Button size="lg" className="btn-premium text-primary-foreground border-0 h-14 px-8 text-base">
                  Get Started
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </motion.span>
                </Button>
              </Link>
              <Link href="/products">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 px-8 text-base glass border-white/20 hover:bg-white/10 hover:border-cyan-500/30 bg-transparent"
                >
                  Explore Marketplace
                </Button>
              </Link>
            </motion.div>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-16 flex flex-wrap items-center justify-center gap-3"
            >
              {[
                { name: "Products", href: "/products" },
                { name: "Services", href: "/services" },
                { name: "Requests", href: "/requests" },
              ].map((item, index) => (
                <Link key={item.name} href={item.href}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="px-5 py-2.5 rounded-full glass border border-white/10 text-sm font-medium text-muted-foreground hover:text-cyan-400 hover:border-cyan-500/30 transition-all cursor-pointer"
                  >
                    {item.name}
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="w-1.5 h-1.5 rounded-full bg-cyan-400"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <AnimatedStats />

      {/* Features Section */}
      <AnimatedFeatures />

      {/* Benefits Section */}
      <AnimatedBenefits />

      {/* CTA Section */}
      <AnimatedCTA />

      {/* Footer */}
      <AnimatedFooter />
    </div>
  )
}
