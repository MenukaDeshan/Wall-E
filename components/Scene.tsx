"use client"

import { Canvas } from "@react-three/fiber"
import { Backdrop, Float, Ring, ScrollControls, Sparkles, useProgress } from "@react-three/drei"
import { Component, Suspense, useRef, type ReactNode } from "react"
import Hero from "./Hero"
import Model from "./Model"

function Loader() {
  const { active, progress } = useProgress()
  if (!active) return null

  return <p className="scene-status" role="status">Loading 3D model… {Math.floor(progress)}%</p>
}

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    if (this.state.failed) {
      return <p className="scene-status" role="status">The 3D scene couldn’t load. Check that WebGL is enabled and reload the page.</p>
    }

    return this.props.children
  }
}

export default function Scene() {
  return (
    <SceneBoundary>
      <SceneCanvas />
      <Loader />
    </SceneBoundary>
  )
}

function SceneCanvas() {
  // Keep Fiber connected to Drei's scroll container when the canvas resizes.
  const scrollElementRef = useRef<HTMLElement>(null)

  return (
    <Canvas
      gl={{ antialias: true }}
      dpr={[1, 1.5]}
      eventSource={scrollElementRef}
      fallback={<p className="scene-status" role="status">This 3D experience requires WebGL.</p>}
    >
      <directionalLight position={[-1, 1, 10]} intensity={4} />
      <Suspense fallback={null}>
        <ScrollControls damping={0.5} pages={4} style={{ pointerEvents: "auto" }}>
          <Model />
          <Sparkles size={2} color="#fff" scale={[10, 10, 10]} />
          <Backdrop receiveShadow floor={20.5} segments={100} scale={[50, 30, 10]} position={[4, -10, 0]}>
            <meshStandardMaterial color="#212121" />
          </Backdrop>
          <Float floatingRange={[1, 1]}>
            <Ring scale={15} position={[0, -1, -3]} args={[0, 0.95, 60]}>
              <meshStandardMaterial color="#000000" />
            </Ring>
          </Float>
          <Hero scrollElementRef={scrollElementRef} />
        </ScrollControls>
      </Suspense>
    </Canvas>
  )
}
