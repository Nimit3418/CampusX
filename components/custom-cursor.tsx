"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false)
    const [isHovering, setIsHovering] = useState(false)

    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)

    const springConfig = { damping: 25, stiffness: 200 }
    const cursorXSpring = useSpring(cursorX, springConfig)
    const cursorYSpring = useSpring(cursorY, springConfig)

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16)
            cursorY.set(e.clientY - 16)
            setIsVisible(true)
        }

        const handleMouseEnter = () => setIsVisible(true)
        const handleMouseLeave = () => setIsVisible(false)

        // Check if element is interactive
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const isInteractive =
                target.tagName === "BUTTON" ||
                target.tagName === "A" ||
                target.closest("button") !== null ||
                target.closest("a") !== null ||
                target.style.cursor === "pointer" ||
                target.classList.contains("cursor-pointer")

            setIsHovering(isInteractive)
        }

        window.addEventListener("mousemove", moveCursor)
        window.addEventListener("mouseenter", handleMouseEnter)
        window.addEventListener("mouseleave", handleMouseLeave)
        window.addEventListener("mouseover", handleMouseOver)

        return () => {
            window.removeEventListener("mousemove", moveCursor)
            window.removeEventListener("mouseenter", handleMouseEnter)
            window.removeEventListener("mouseleave", handleMouseLeave)
            window.removeEventListener("mouseover", handleMouseOver)
        }
    }, [cursorX, cursorY])

    return (
        <>
            {/* Main cursor dot */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    opacity: isVisible ? 1 : 0,
                }}
            >
                <motion.div
                    className="w-full h-full rounded-full bg-cyan-400"
                    animate={{
                        scale: isHovering ? 1.5 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                />
            </motion.div>

            {/* Trailing cursor ring */}
            <motion.div
                className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-[9998] mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    opacity: isVisible ? 0.5 : 0,
                }}
            >
                <motion.div
                    className="w-full h-full rounded-full border-2 border-cyan-400"
                    animate={{
                        scale: isHovering ? 1.8 : 1,
                    }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                />
            </motion.div>
        </>
    )
}
