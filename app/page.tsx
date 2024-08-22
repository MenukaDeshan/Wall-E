import dynamic from "next/dynamic"
import Hero from "@/components/Hero"

const Scene = dynamic(() => import("@/components/Scene"), { ssr: false })

export default function Home() {
  return (
    <main className="h-full bg-cover bg-center h-full" style={{ backgroundImage: 'url(/11bg.jpg)' }}>
        <Hero />
    </main>
  )
}