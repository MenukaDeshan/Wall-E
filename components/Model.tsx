import { useGLTF, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef, useLayoutEffect } from "react"
import { AnimationMixer, type AnimationAction, type Group } from "three"
import gsap from 'gsap'

// Preload the GLTF model
useGLTF.preload("/wall-eanimated.glb")

export default function Model() {
  const group = useRef<Group>(null)
  const { animations, scene } = useGLTF("/wall-eanimated.glb")
  const scroll = useScroll()
  const animation = useRef<AnimationAction | null>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)

  useLayoutEffect(() => {
    const clip = animations.find((animation) => animation.name === "Scene")
    if (!clip) return

    const mixer = new AnimationMixer(scene)
    const action = mixer.clipAction(clip)
    action.reset().play().paused = true
    animation.current = action
    return () => {
      action.stop()
      mixer.uncacheRoot(scene)
      animation.current = null
    }
  }, [animations, scene])

  useLayoutEffect(() => {
    if (group.current) {
      tl.current = gsap.timeline({ paused: true, defaults: { duration: 0.9, ease: 'sine.inOut' } })
      tl.current
        .to(group.current.position, { y: -1.5 }, 0.5)
        .to(group.current.rotation, {y: Math.PI / 0.53},2)
        .to(group.current.position, { x: 2, z:-2.0}, 3)
        .to(group.current.rotation, { y: Math.PI / 0.6 }, 6)
        .to(group.current.position, { x: -1, z:1}, 10)
        .to(group.current.rotation, {y: Math.PI / 0.45},10)

        .to(group.current.scale, { x: 0.7, y: 0.7, z: 0.7 }, 15)
        .to(group.current.rotation, { y: Math.PI /0.40 }, 18)
        .to(group.current.position, { x: 7.6, duration: 3.3, ease: 'power2.in' }, 18.2)
      return () => {
        tl.current?.revert()
        tl.current = null
      }
    }
  }, [])

  useFrame(() => {
    const progress = Math.min(1, Math.max(0, scroll.offset))
    const action = animation.current
    if (action) {
      action.time = (action.getClip().duration * progress) / 2
      action.getMixer().update(0)
    }

    tl.current?.progress(progress)
  })

  return (
    <group ref={group} scale={0.6} rotation={[0.1, Math.PI * 2, 0]} position={[0, -1, 0]}>
      <primitive object={scene} />
    </group>
  )
}
