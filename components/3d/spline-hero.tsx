"use client"

import { SplineScene } from "./spline-scene"
import { motion } from "framer-motion"

/**
 * Spline Hero Scene Component
 * 
 * To use your own Spline scene:
 * 1. Create or edit a scene at https://spline.design
 * 2. Click "Export" → "Code Export" → "React"
 * 3. Copy the scene URL from the export
 * 4. Replace the SPLINE_SCENE_URL below with your URL
 * 
 * Example URL format: "https://prod.spline.design/YOUR-SCENE-ID/scene.splinecode"
 */

// TODO: Replace this with your actual Spline scene URL
const SPLINE_SCENE_URL = "https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"

export function SplineHero() {
    return (
        <div className="absolute inset-0 z-0">
            {/* Gradient overlays for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background/80 pointer-events-none z-10" />

            {/* Spline 3D Scene */}
            <SplineScene
                sceneUrl={SPLINE_SCENE_URL}
                className="w-full h-full"
                onLoad={() => console.log("Spline hero scene loaded")}
            />

            {/* Animated glow effect */}
            <motion.div
                className="absolute inset-0 pointer-events-none z-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]" />
            </motion.div>
        </div>
    )
}
