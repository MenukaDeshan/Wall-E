"use client"

import { Canvas } from "@react-three/fiber"
import Model from "./Model"
import Hero from "./Hero"
import { Suspense, useEffect } from "react"
import { useProgress, Html, ScrollControls, Scroll, RoundedBox, Environment,Sparkles,Backdrop,Float, Ring } from "@react-three/drei"
import baffle from "baffle";

function Loader() {
  const { progress, active } = useProgress()
  return <Html center>{progress.toFixed(1)} % loaded</Html>
}

export default function Scene() {
  useEffect(()=> {
    const target = baffle('.title')
    target.set({
      characters: 'W A L L - E',
      speed: 200
    })
    target.start()
    target.reveal(1000,1000)
  },[])
  return (
    <Canvas gl={{ antialias: true }} dpr={[1, 1.5]} className="relative h-svh">
      <directionalLight position={[-1, 1, 10]} intensity={4} />
      <Suspense fallback={<Loader />}>
        <ScrollControls damping={0.5} pages={4}>
          <Model />
          <Sparkles size={2} color={"#fff"} scale={[10,10,10]}></Sparkles>
          <Backdrop
            receiveShadow
            floor={20.5} // Stretches the floor segment, 0.25 by default
            segments={100} // Mesh-resolution, 20 by default
            scale={[50,30,10]}
            position={[4,-10,0]}
          >
            <meshStandardMaterial color="#212121" />
          </Backdrop>  

          <Float
            speed={1} // Animation speed, defaults to 1
            rotationIntensity={1} // XYZ rotation intensity, defaults to 1
            floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
            floatingRange={[1, 1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
          >
          <Ring scale={15} position-z={-3.0} position-y={-1} args={[0, 0.95, 60]} receiveShadow>
            <meshStandardMaterial color="#000000" />
          </Ring>
          </Float>
          <Hero />
        </ScrollControls>
      </Suspense>
    </Canvas>
  )
}