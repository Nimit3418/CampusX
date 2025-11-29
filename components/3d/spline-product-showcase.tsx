"use client"

import { SplineScene } from "./spline-scene"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

/**
 * Spline Product Showcase Component
 * 
 * To use your own Spline scene:
 * 1. Create a 3D product model at https://spline.design
 * 2. Add interactive features (rotation, hover effects, etc.)
 * 3. Export the scene and get the URL
 * 4. Replace the SPLINE_PRODUCT_SCENE_URL below
 * 
 * Tips for product scenes:
 * - Keep the model centered and well-lit
 * - Add subtle rotation or hover interactions
 * - Optimize for performance (keep poly count reasonable)
 */

// TODO: Replace with your product showcase Spline scene URL
const SPLINE_PRODUCT_SCENE_URL = "https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"

interface SplineProductShowcaseProps {
    title?: string
    description?: string
    sceneUrl?: string
    className?: string
}

export function SplineProductShowcase({
    title = "Interactive 3D Preview",
    description = "Rotate and explore the product in 3D",
    sceneUrl = SPLINE_PRODUCT_SCENE_URL,
    className = "",
}: SplineProductShowcaseProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={className}
        >
            <Card className="overflow-hidden glass border-white/10 bg-background/40 backdrop-blur-xl">
                {/* Header */}
                {(title || description) && (
                    <div className="p-6 border-b border-white/10">
                        {title && (
                            <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
                        )}
                        {description && (
                            <p className="text-sm text-muted-foreground">{description}</p>
                        )}
                    </div>
                )}

                {/* 3D Scene Container */}
                <div className="relative w-full aspect-square md:aspect-video">
                    <SplineScene
                        sceneUrl={sceneUrl}
                        className="w-full h-full"
                        onLoad={() => console.log("Product showcase loaded")}
                    />

                    {/* Interactive hint */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full glass border border-cyan-500/30 pointer-events-none"
                    >
                        <p className="text-xs text-cyan-400 font-medium">Click and drag to interact</p>
                    </motion.div>
                </div>

                {/* Feature badges */}
                <div className="p-4 flex flex-wrap gap-2 border-t border-white/10">
                    <span className="px-3 py-1 rounded-full text-xs font-medium glass border border-white/10 text-muted-foreground">
                        360° View
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium glass border border-white/10 text-muted-foreground">
                        Interactive
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium glass border border-white/10 text-muted-foreground">
                        Real-time 3D
                    </span>
                </div>
            </Card>
        </motion.div>
    )
}
