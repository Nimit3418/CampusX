"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { RoundedBox, Float, Text, MeshTransmissionMaterial } from "@react-three/drei"
import { useRef } from "react"
import type * as THREE from "three"

function GlassCard({
  position,
  rotation,
  icon,
}: {
  position: [number, number, number]
  rotation?: [number, number, number]
  icon: string
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.05
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group position={position} rotation={rotation}>
        <RoundedBox ref={meshRef} args={[2.5, 1.5, 0.1]} radius={0.1} smoothness={4}>
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={0.5}
            chromaticAberration={0.2}
            anisotropy={0.3}
            distortion={0.1}
            distortionScale={0.2}
            temporalDistortion={0.1}
            metalness={0.1}
            roughness={0.2}
            transmission={0.95}
            color="#22d3ee"
          />
        </RoundedBox>
        <Text position={[0, 0, 0.1]} fontSize={0.4} color="#ffffff" font="/fonts/Inter-Bold.ttf">
          {icon}
        </Text>
      </group>
    </Float>
  )
}

export function FloatingCardScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#22d3ee" />
        <GlassCard position={[-2.5, 1, 0]} icon="Products" />
        <GlassCard position={[0, 0, -1]} icon="Services" />
        <GlassCard position={[2.5, -1, 0]} icon="Requests" />
      </Canvas>
    </div>
  )
}
