import dynamic from "next/dynamic"
import Projects from "../components/Projects"

const Scene = dynamic(() => import("@/components/Scene"), { ssr: false })

export default function Home() {
  return (
    <main className="h-full bg-cover bg-center" style={{ backgroundImage: 'url(/11bg.jpg)' }}>
        <Scene />
    </main>
  )
}