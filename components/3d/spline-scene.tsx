"use client"

import Spline from "@splinetool/react-spline"
import { Suspense, useState } from "react"
import { Loader2 } from "lucide-react"

interface SplineSceneProps {
    sceneUrl: string
    className?: string
    fallback?: React.ReactNode
    onLoad?: () => void
}

function SplineLoader() {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
                <p className="text-sm text-muted-foreground">Loading 3D scene...</p>
            </div>
        </div>
    )
}

function SplineError({ message }: { message?: string }) {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-background/30">
            <div className="text-center p-6 rounded-lg glass border border-red-500/30">
                <p className="text-sm text-red-400">{message || "Failed to load 3D scene"}</p>
            </div>
        </div>
    )
}

export function SplineScene({ sceneUrl, className = "", fallback, onLoad }: SplineSceneProps) {
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    const handleLoad = () => {
        setIsLoading(false)
        onLoad?.()
    }

    const handleError = () => {
        setIsLoading(false)
        setHasError(true)
    }

    return (
        <div className={`relative ${className}`}>
            <Suspense fallback={fallback || <SplineLoader />}>
                {isLoading && <SplineLoader />}
                {hasError && <SplineError />}
                <Spline
                    scene={sceneUrl}
                    onLoad={handleLoad}
                    onError={handleError}
                    className="w-full h-full"
                />
            </Suspense>
        </div>
    )
}
