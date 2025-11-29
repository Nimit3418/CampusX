"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial, Sphere, Box, Torus, Environment, Stars } from "@react-three/drei"
import { useRef, useMemo } from "react"
import type * as THREE from "three"

function FloatingShape({
  position,
  color,
  speed = 1,
  distort = 0.3,
  scale = 1,
}: {
  position: [number, number, number]
  color: string
  speed?: number
  distort?: number
  scale?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={position} scale={scale}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  )
}

function FloatingBox({
  position,
  color,
  scale = 1,
}: {
  position: [number, number, number]
  color: string
  scale?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={2} floatIntensity={1}>
      <Box ref={meshRef} args={[1, 1, 1]} position={position} scale={scale}>
        <meshStandardMaterial color={color} roughness={0.1} metalness={0.9} transparent opacity={0.8} />
      </Box>
    </Float>
  )
}

function FloatingTorus({
  position,
  color,
  scale = 1,
}: {
  position: [number, number, number]
  color: string
  scale?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.4
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <Float speed={1.8} rotationIntensity={1.5} floatIntensity={1.5}>
      <Torus ref={meshRef} args={[1, 0.4, 32, 64]} position={position} scale={scale}>
        <meshStandardMaterial color={color} roughness={0.15} metalness={0.85} transparent opacity={0.9} />
      </Torus>
    </Float>
  )
}

function ParticleField() {
  const count = 200
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return pos
  }, [])

  const pointsRef = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#22d3ee" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#22d3ee" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
        <spotLight position={[0, 10, 0]} intensity={0.8} color="#67e8f9" angle={0.3} />

        {/* Main floating shapes */}
        <FloatingShape position={[-3.5, 1.5, -2]} color="#22d3ee" scale={1.2} distort={0.4} />
        <FloatingShape position={[3.5, -1, -1]} color="#06b6d4" scale={0.8} distort={0.3} speed={0.8} />
        <FloatingBox position={[-2, -2, -3]} color="#0891b2" scale={0.6} />
        <FloatingBox position={[4, 2, -4]} color="#22d3ee" scale={0.4} />
        <FloatingTorus position={[2.5, 1.5, -2]} color="#67e8f9" scale={0.5} />
        <FloatingTorus position={[-4, 0, -3]} color="#06b6d4" scale={0.35} />

        {/* Small accent shapes */}
        <FloatingShape position={[0, 3, -5]} color="#a5f3fc" scale={0.3} distort={0.5} speed={1.2} />
        <FloatingShape position={[-5, -1, -4]} color="#cffafe" scale={0.25} distort={0.4} speed={1.5} />
        <FloatingBox position={[5, -2, -5]} color="#22d3ee" scale={0.3} />

        <ParticleField />
        <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
        <Environment preset="night" />
      </Canvas>
    </div>
  )
}
