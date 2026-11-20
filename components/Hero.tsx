import { Scroll, useScroll } from "@react-three/drei"
import { useEffect, type RefObject } from "react"

export default function Hero({ scrollElementRef }: { scrollElementRef: RefObject<HTMLElement | null> }) {
  const { el } = useScroll()

  useEffect(() => {
    scrollElementRef.current = el
    el.setAttribute("tabindex", "0")
    el.setAttribute("role", "region")
    el.setAttribute("aria-label", "WALL-E story")
    return () => {
      scrollElementRef.current = null
    }
  }, [el, scrollElementRef])

  return (
    <Scroll html style={{ width: "100%" }}>
      <div className="story">
        <header className="story-intro">
          <h1>WALL·E</h1>
          <p>Scroll to follow WALL-E <span aria-hidden="true">↓</span></p>
        </header>

        <section className="story-panel story-earth">
          <h2>Alone on Earth</h2>
          <p>In 2805, WALL-E spends his days cleaning up a deserted Earth, one cube of rubbish at a time.</p>
        </section>

        <section className="story-panel story-eve">
          <h2>Along comes EVE</h2>
          <p>When a probe from the starship Axiom arrives, WALL-E follows her across the galaxy.</p>
        </section>

        <section className="story-panel story-finale">
          <h2>There&apos;s plenty of space out in space!</h2>
        </section>
      </div>
    </Scroll>
  )
}
