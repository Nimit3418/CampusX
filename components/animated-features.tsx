"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ShoppingBag, Sparkles, MessageSquare, ArrowRight } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: ShoppingBag,
    title: "Products",
    description: "Buy and sell essential campus items",
    details: "Textbooks, calculators, chargers, tech accessories, drawing tools, extension boards, and creative gear.",
    href: "/products",
    gradient: "from-cyan-400 to-cyan-600",
  },
  {
    icon: Sparkles,
    title: "Services",
    description: "Offer your skills and book micro-services",
    details:
      "PPT designing, coding help, tutoring, notes scanning, photography, video editing, resume design, and more.",
    href: "/services",
    gradient: "from-cyan-500 to-teal-500",
  },
  {
    icon: MessageSquare,
    title: "Requests",
    description: "Post what you need urgently",
    details:
      "Need an HDMI cable? Physics notes? Python debugging? Post a request and get instant responses from peers.",
    href: "/requests",
    gradient: "from-teal-400 to-cyan-500",
  },
]

export function AnimatedFeatures() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section ref={containerRef} className="py-24 px-4 sm:px-6 lg:px-8 relative">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="text-cyan-400 text-sm font-medium tracking-wider uppercase mb-4 block">
          Three Ways to Connect
        </span>
        <h2 className="text-4xl sm:text-5xl font-bold mb-6">
          <span className="text-gradient">Everything</span> your campus needs
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A complete micro-commerce ecosystem designed specifically for campus life
        </p>
      </motion.div>

      {/* Feature cards */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Link href={feature.href} className="block group h-full">
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card rounded-3xl p-8 h-full relative overflow-hidden"
                >
                  {/* Gradient background on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />

                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 glow-cyan`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-gradient transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-foreground/80 font-medium mb-3">{feature.description}</p>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{feature.details}</p>

                  {/* CTA */}
                  <div className="flex items-center text-cyan-400 font-medium">
                    <span>Explore {feature.title}</span>
                    <motion.div
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
