import { div } from "three/examples/jsm/nodes/Nodes.js"
import dynamic from "next/dynamic"
const Scene = dynamic(() => import("@/components/Scene"), { ssr: false })

export default function Hero() {
    return (
    <div className="h-full bg-gray-100">
        <Scene />
    </div>
    )
  }