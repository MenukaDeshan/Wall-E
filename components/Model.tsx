import { useAnimations, useGLTF, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef, useLayoutEffect } from "react"
import type { AnimationAction, Group } from "three"
import gsap from 'gsap'

// Preload the GLTF model
useGLTF.preload("/wall-eanimated.glb")

export default function Model() {
  const group = useRef<Group>(null)
  const { animations, scene } = useGLTF("/wall-eanimated.glb")
  const { actions } = useAnimations(animations, scene)
  const scroll = useScroll()
  const animation = useRef<AnimationAction | null>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const action = actions.Scene
    if (!action) return

    action.reset().play().paused = true
    animation.current = action
    return () => {
      action.stop()
      animation.current = null
    }
  }, [actions])

  useLayoutEffect(() => {
    if (group.current) {
      tl.current = gsap.timeline({ defaults: { ease: 'power1.inOut' } })
      tl.current
        .to(group.current.position, { y: -1.0 }, 0)
        .to(group.current.position, { y: -1.5 }, 0.5)
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
      return () => {
        tl.current?.revert()
        tl.current = null
      }
    }
  }, [])

  useFrame(() => {
    const action = animation.current
    if (action) {
      action.time = (action.getClip().duration * scroll.offset) / 2
    }

    if (tl.current) {
      tl.current.seek(scroll.offset * tl.current.duration())
    }
  })

  return (
    <group ref={group} scale={0.6} rotation={[0.1, Math.PI * 2, 0]} position={[0, -1, 0]}>
      <primitive object={scene} />
    </group>
  )
}
