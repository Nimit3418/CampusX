"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { TrendingUp, Shield, Zap, CreditCard, Star, MessageCircle } from "lucide-react"

const benefits = [
  {
    icon: TrendingUp,
    title: "Earn Micro-Income",
    description: "Monetize your skills and assets while helping fellow students",
  },
  {
    icon: Shield,
    title: "Campus-Only",
    description: "Safe, trusted community with verified student members only",
  },
  {
    icon: Zap,
    title: "Instant Connect",
    description: "Get what you need fast with real-time notifications",
  },
  {
    icon: CreditCard,
    title: "Flexible Payments",
    description: "Pay via UPI or cash — whatever works for both parties",
  },
  {
    icon: Star,
    title: "Ratings & Reviews",
    description: "Build your reputation with verified reviews from real transactions",
  },
  {
    icon: MessageCircle,
    title: "In-App Chat",
    description: "Message sellers, providers, and requesters directly within the app",
  },
]

export function AnimatedBenefits() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section ref={containerRef} className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm font-medium tracking-wider uppercase mb-4 block">
            Why Choose CampusXchange
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Built for <span className="text-gradient">campus life</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Features designed specifically for the student experience
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="glass-card rounded-2xl p-6 h-full group cursor-default"
                >
                  <div className="flex gap-4">
                    <motion.div
                      whileHover={{ rotate: 10 }}
                      className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shrink-0 group-hover:glow-cyan transition-all duration-300"
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1 group-hover:text-gradient transition-all duration-300">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
