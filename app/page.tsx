"use client"

import dynamic from "next/dynamic"

const Scene = dynamic(() => import("@/components/Scene"), {
  ssr: false,
  loading: () => <p className="scene-status" role="status">Loading WALL-E…</p>,
})

export default function Home() {
  return (
    <main className="experience">
      <Scene />
    </main>
  )
}
