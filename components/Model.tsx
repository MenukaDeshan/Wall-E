import { useAnimations, useGLTF, useScroll } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef, useLayoutEffect } from "react"
import { Group } from "three"
import gsap from 'gsap'

// Preload the GLTF model
useGLTF.preload("/wall-eanimated.glb")

export default function Model() {
  const group = useRef<Group>(null)
  const { nodes, materials, animations, scene } = useGLTF("/wall-eanimated.glb")
  const { actions } = useAnimations(animations, scene)
  const scroll = useScroll()
  const tl = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    if (actions["Scene"]) {
      actions["Scene"].play().paused = true
    }
    
    if (group.current) {
      // Set initial transformations
      //Static size rotation and postition
      group.current.scale.set(0.6, 0.6, 0.6)
      group.current.rotation.set(0.1, Math.PI / 0.50, 0)
      group.current.position.set(0, -1.5, 0) //x,y,z
    }
  }, [actions])

  useLayoutEffect(() => {
    if (group.current) {
      tl.current = gsap.timeline({ defaults: { ease: 'power1.inOut' } })
      tl.current
        .to(group.current.position, { y: -1.5 }, 0)
        .to(group.current.position, { y: -2.5 }, 0.5)
        .to(group.current.rotation, {y: Math.PI / 0.53},2)
        .to(group.current.position, { x: 2, z:-2.0}, 3)
        .to(group.current.rotation, { y: Math.PI / 0.6 }, 6)
        .to(group.current.position, { x: -1, z:1}, 10)
        .to(group.current.rotation, {y: Math.PI / 0.45},10)

        .to(group.current.scale, { x: 0.7, y: 0.7, z: 0.7 }, 15)
        .to(group.current.rotation, { y: Math.PI /0.40 }, 18)
        .to(group.current.position, { x: -0.8}, 18.2)
        .to(group.current.position, { x: -0.4}, 18.4)
        .to(group.current.position, { x: -0.0}, 18.6)
        .to(group.current.position, { x: 0.4}, 18.8)
        .to(group.current.position, { x: 0.8}, 19.0)
        .to(group.current.position, { x: 1.2}, 19.2)
        .to(group.current.position, { x: 1.6}, 19.4)
        .to(group.current.position, { x: 2.0}, 19.6)
        .to(group.current.position, { x: 2.4}, 19.8)
        .to(group.current.position, { x: 2.8}, 20.0)
        .to(group.current.position, { x: 5.2}, 20.5)
        .to(group.current.position, { x: 7.6}, 21)
    }
  })

  useFrame(() => {
    if (actions["Scene"]) {
      actions["Scene"].time =
        (actions["Scene"].getClip().duration * scroll.offset) / 2
    }

    if (tl.current) {
      tl.current.seek(scroll.offset * tl.current.duration())
    }
  })

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  )
}
