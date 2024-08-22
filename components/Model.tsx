import { useAnimations, useGLTF, useScroll } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { Group } from "three"

useGLTF.preload("/wall-eanimated.glb")

export default function Model() {
  const group = useRef<Group>(null)
  const { nodes, materials, animations, scene } = useGLTF(
    "/wall-eanimated.glb"
  )
  const { actions, clips } = useAnimations(animations, scene)
  const scroll = useScroll()
  const { mouse } = useThree()

  useEffect(() => {
    console.log(actions)
    //@ts-ignore
    actions["Scene"].play().paused = true
    
    if (group.current) {
      // Set the model to a specific size when the component mounts
      group.current.scale.set(0.4, 0.4, 0.4) // Example: increase the size by 1.5 times
      group.current.rotation.set(0.1, Math.PI / 0.53, 0);
      group.current.position.set(0, -2.5, 0) // Example: move the model to x=1, y=0, z=-2
    }
  }, [])

  useFrame(() => {
    // Update animation based on scroll
    //@ts-ignore
    actions["Scene"].time =
      //@ts-ignore
      (actions["Scene"].getClip().duration * scroll.offset) / 2

  })

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  )
}


// import { useAnimations, useGLTF, useScroll } from "@react-three/drei"
// import { useFrame } from "@react-three/fiber"
// import { useEffect, useRef } from "react"
// import { Group } from "three"

// useGLTF.preload("/wall-eanimated.glb")

// export default function Model() {
//   const group = useRef<Group>(null)
//   const { nodes, materials, animations, scene } = useGLTF(
//     "/wall-eanimated.glb"
//   )
//   const { actions, clips } = useAnimations(animations, scene)
//   const scroll = useScroll()

//   useEffect(() => {
//     console.log(actions)
//     //@ts-ignore
//     actions["Scene"].play().paused = true
//   }, [])
//   useFrame(
//     () =>
//       //@ts-ignore
//       (actions["Scene"].time =
//         //@ts-ignore
//         (actions["Scene"].getClip().duration * scroll.offset) / 1)
//   )
//   return (
//     <group ref={group}>
//       <primitive object={scene} />
//     </group>
//   )
// }
