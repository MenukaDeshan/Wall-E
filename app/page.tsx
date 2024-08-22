import dynamic from "next/dynamic"

const Scene = dynamic(() => import("@/components/Scene"), { ssr: false })

export default function Home() {
  return (
    <main className="h-full">
      <div className="bg-cover bg-center h-full" style={{ backgroundImage: 'url(/11bg.jpg)' }}>
        <Scene />
      </div>
    </main>
  )
}