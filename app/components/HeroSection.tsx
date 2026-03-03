"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCallback, useRef } from "react";
import Spline from "@splinetool/react-spline";
import AnimatedCopy from "./AnimatedCopy";

gsap.registerPlugin(ScrollTrigger);

const MOUSE_MOVE_STRENGTH = 25;

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);
  const splineMouseRef = useRef<HTMLDivElement>(null);
  const mouseTweenRef = useRef<gsap.core.Tween | null>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const largeGridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        buttonsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
      ).fromTo(
        largeGridRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        "-=0.2",
      );
    },
    { scope: sectionRef },
  );

  useGSAP(
    () => {
      gsap.to(splineRef.current, {
        left: "85.67%",
        top: "140%",
        width: "1000px",
        height: "1000px",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: sectionRef },
  );

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!splineMouseRef.current) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const moveX = x * MOUSE_MOVE_STRENGTH;
    const moveY = y * MOUSE_MOVE_STRENGTH;
    if (mouseTweenRef.current) mouseTweenRef.current.kill();
    mouseTweenRef.current = gsap.to(splineMouseRef.current, {
      x: moveX,
      y: moveY,
      duration: 0.6,
      ease: "power2.out",
      overwrite: true,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!splineMouseRef.current) return;
    if (mouseTweenRef.current) mouseTweenRef.current.kill();
    gsap.to(splineMouseRef.current, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-visible"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Spline 3D background */}
      <div
        ref={splineRef}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-1 w-[700px] h-[700px]"
      >
        <div ref={splineMouseRef} className="h-full w-full">
          <Spline
            scene="https://prod.spline.design/tjWKQyWMHuEQYFmH/scene.splinecode"
            className="h-full w-full"
          />
        </div>
      </div>

      {/* Content container */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Copy row - absolute for consistent position across screen sizes */}
        <div className="absolute left-0 right-0 top-[clamp(6rem,12vh,12rem)] z-20 flex w-full flex-col px-6 md:flex-row md:items-end md:justify-between md:gap-12 lg:px-12">
          {/* Heading column */}
          <div className="mb-12 md:mb-0 md:min-w-0 md:flex-1">
            <h1 className="font-satoshi text-5xl font-medium leading-[1.3] text-[#191919] md:text-7xl lg:text-8xl">
              <AnimatedCopy as="span" className="block">
                Bridge the Gap
              </AnimatedCopy>
              <AnimatedCopy as="span" className="block">
                Between Vision
              </AnimatedCopy>
              <AnimatedCopy as="span" className="block">
                and Reality
              </AnimatedCopy>
            </h1>
          </div>

          {/* Description + buttons column */}
          <div className="flex flex-col gap-6 md:w-80 md:shrink-0 md:gap-8">
            <AnimatedCopy
              as="p"
              className="font-satoshi text-xs font-medium uppercase leading-relaxed tracking-tight text-[#191919] md:text-left md:text-xl"
            >
              Turn your vision into reality through structured systems and
              expert clarity.
            </AnimatedCopy>
            <div ref={buttonsRef} className="flex flex-wrap flex-col gap-4">
              <button
                type="button"
                className="rounded-full w-64 bg-[#d1d1d1] px-6 py-3 font-satoshi font-medium text-sm uppercase tracking-wider text-[#191919] transition-colors hover:bg-[#e2e2e2] cursor-pointer"
              >
                START RIGHT NOW
              </button>
              <button
                type="button"
                className="rounded-full w-64 bg-[#d1d1d1] px-6 py-3 font-satoshi font-medium text-sm uppercase tracking-wider text-[#191919] transition-colors hover:bg-[#e2e2e2] cursor-pointer"
              >
                EXPLORE OUR SERVICES
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
