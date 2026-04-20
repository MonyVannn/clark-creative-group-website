"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import AnimatedCopy from "../ui/AnimatedCopy";
import Hexa from "../ui/HeroSectionHomepage/Hexa";
import Link from "next/link";
import { usePageTransition } from "../transitions/TransitionProvider";
import { usePreloader } from "../PreloaderContext";
gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const { navigateTo } = usePageTransition();
  const { isPreloaderComplete } = usePreloader();
  const sectionRef = useRef<HTMLElement>(null);
  const hexaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!isPreloaderComplete) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        gsap.to(hexaRef.current, {
          left: "80%",
          top: "110%",
          opacity: 0.6,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom center",
            scrub: true,
          },
        });
      });
    },
    { scope: sectionRef, dependencies: [isPreloaderComplete] },
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-dvh py-20 md:py-0 overflow-x-clip"
    >
      {/* Hexa 3D background - viewport-scaled, smaller at xl for 1440x900 */}
      <div
        ref={hexaRef}
        className="pointer-events-none absolute left-1/2 bottom-20 md:top-3/5 2xl:top-2/3 -translate-y-1/2 -translate-x-1/2 z-50 w-[min(300px,40vh)] h-[min(400px,40vh)] md:w-[min(600px,55vh)] md:h-[min(700px,70vh)] xl:w-[min(480px,54vh)] xl:h-[min(800px,75vh)] 2xl:w-[min(700px,65vh)] 2xl:h-[min(800px,75vh)] flex items-center justify-center"
      >
        <Hexa className="w-full h-full" />
      </div>

      {/* Content container - fills viewport for whole-screen hero */}
      <div className="relative z-10 h-dvh">
        {/* Copy row - absolute for consistent position across screen sizes */}
        <div className="absolute left-0 right-0 md:top-10 z-20 flex w-full flex-col px-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:px-12 xl:top-[clamp(2rem,6vh,6rem)] xl:gap-8 2xl:top-[clamp(6rem,12vh,12rem)] 2xl:gap-12">
          {/* Heading column */}
          <div className="md:min-w-0 md:flex-1">
            <h1 className="font-clash-display hidden lg:block text-5xl font-semibold leading-[1.3] text-foreground lg:text-7xl xl:text-6xl 2xl:text-7xl">
              <AnimatedCopy as="span" className="block">
                Partners of founders
              </AnimatedCopy>
              <AnimatedCopy as="span" className="block">
                building visions
              </AnimatedCopy>
              <AnimatedCopy as="span" className="block">
                bigger than
              </AnimatedCopy>
              <AnimatedCopy as="span" className="block">
                themselves.
              </AnimatedCopy>
            </h1>
            {/* {Mobile & Tablet} */}
            <h1 className="font-clash-display lg:hidden text-center md:text-left text-4xl font-semibold leading-[1.3] text-foreground md:text-7xl lg:text-8xl xl:text-7xl 2xl:text-8xl">
              <AnimatedCopy as="span" className="block">
                Partners of founders
              </AnimatedCopy>
              <AnimatedCopy as="span" className="block">
                building visions
              </AnimatedCopy>
              <AnimatedCopy as="span" className="block">
                bigger than themselves.
              </AnimatedCopy>
            </h1>
          </div>

          {/* Description + buttons column */}
          <div className="flex flex-col gap-6 lg:w-80 2xl:w-120 lg:shrink-0 lg:gap-8 xl:gap-6 2xl:gap-8">
            <AnimatedCopy
              as="p"
              className="font-satoshi text-center md:text-left text-sm font-medium uppercase leading-relaxed tracking-wide text-muted-foreground md:text-xl xl:text-base 2xl:text-xl mt-10"
            >
              Our work sits at the intersection of brand, business design, and
              strategic implementation, helping your company become
            </AnimatedCopy>
            <AnimatedCopy
              as="p"
              className="font-satoshi text-center md:text-left text-sm font-medium uppercase leading-relaxed tracking-wide text-muted-foreground md:text-xl xl:text-base 2xl:text-xl"
            >
              more clear, more compelling, and more operationally sound.
            </AnimatedCopy>

            <div className="flex flex-wrap flex-col gap-4 xl:gap-3 items-center md:items-baseline">
              <Link
                href="/services"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo("/services");
                }}
                className="w-64 bg-accent px-6 py-3 text-center font-satoshi font-bold text-sm uppercase tracking-wider text-accent-foreground transition-colors hover:bg-accent/80 cursor-pointer xl:w-full xl:px-5 xl:py-2.5 xl:text-xs 2xl:w-full 2xl:px-6 2xl:py-3 2xl:text-sm"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
