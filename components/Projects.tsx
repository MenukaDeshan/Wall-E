import gsap from "gsap";
import React, { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const Elem = sectionRef.current;
    const video1Elem = videoRef1.current;
    const video2Elem = videoRef2.current;
    const elements = titleRef.current?.querySelectorAll("h1") || [];

    if (Elem && video1Elem && video2Elem) {
      // Pin the section
      gsap.to(Elem, {
        scrollTrigger: {
          trigger: Elem,
          start: "top top",
          end: "bottom+=500 bottom",
          scrub: 1,
          pin: true,
          pinSpacing: true,
        },
      });

      const t2 = gsap.timeline({
        scrollTrigger: {
          trigger: Elem,
          start: "top top",
          end: "bottom+=500 bottom",
          scrub: 1,
        },
      });

      t2.to(video1Elem, { scale: 0.3 }, "key1")
        .to(video2Elem, { scale: 0.6 }, "key1");

      elements.forEach((el) => {
        t2.fromTo(
          el,
          {
            x: 100,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: el,
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
              // markers: true,
            },
          }
        );
      });

      return () => {
        t2.kill();
      };
    }
  }, []);

  return (
    <div ref={sectionRef} className="relative w-screen min-h-screen overflow-hidden bg-white">
      <video
        ref={videoRef1}
        src="/path/to/video1.mp4"
        type="video/mp4"
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-screen object-cover object-bottom z-10"
      />
      <video
        ref={videoRef2}
        src="/path/to/video2.mp4"
        type="video/mp4"
        autoPlay
        muted
        loop
        className="absolute top-0 right-[40%] w-[60%] h-auto z-0 md:right-0 md:top-[10%]"
      />
      <div
        ref={titleRef}
        className="absolute top-0 right-0 flex flex-col items-center w-[50%] h-full md:top-[60%] md:right-[2rem] sm:top-[70%] sm:right-[40%]"
      >
        <h1 className="text-6xl md:text-5xl sm:text-4xl capitalize">Ready.</h1>
        <h1 className="text-6xl md:text-5xl sm:text-4xl capitalize ml-24">Steady.</h1>
        <h1 className="text-6xl md:text-5xl sm:text-4xl capitalize ml-48">Action.</h1>
      </div>
    </div>
  );
}
