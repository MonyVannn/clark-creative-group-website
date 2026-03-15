"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCallback, useMemo, useRef } from "react";
import Spline from "@splinetool/react-spline";
import AnimatedCopy from "../ui/AnimatedCopy";

gsap.registerPlugin(ScrollTrigger);

const MOUSE_MOVE_STRENGTH = 25;
const GRID_COLS = 5;
const GRID_ROWS = 4;
const EDGE_BLACK_PROBABILITY = 0.4; // ~40% of edge cells become black
const GRID_SEED = 42; // Fixed seed for deterministic SSR/client parity

function createSeededRandom(seed: number) {
  return () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
}

function getEdgeBlackCells(): Set<number> {
  const black = new Set<number>();
  const total = GRID_COLS * GRID_ROWS;
  const random = createSeededRandom(GRID_SEED);
  for (let i = 0; i < total; i++) {
    const col = i % GRID_COLS;
    const row = Math.floor(i / GRID_COLS);
    const isEdge =
      row === 0 || row === GRID_ROWS - 1 || col === 0 || col === GRID_COLS - 1;
    if (isEdge && random() < EDGE_BLACK_PROBABILITY) black.add(i);
  }
  return black;
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);
  const splineMouseRef = useRef<HTMLDivElement>(null);
  const mouseTweenRef = useRef<gsap.core.Tween | null>(null);
  const largeGridRef = useRef<HTMLDivElement>(null);

  const edgeBlackCells = useMemo(() => getEdgeBlackCells(), []);

  useGSAP(
    () => {
      gsap.to(splineRef.current, {
        left: "80%",
        top: "110%",
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom center",
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
      className="relative min-h-dvh overflow-visible"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Spline 3D background - viewport-scaled, smaller at xl for 1440x900 */}
      <div
        ref={splineRef}
        className="pointer-events-none absolute left-1/2 top-2/3 2xl:top-1/2 -translate-y-1/2 -translate-x-1/2 z-50 w-[min(600px,55vh)] h-[min(700px,70vh)] xl:w-[min(480px,54vh)] xl:h-[min(800px,75vh)] 2xl:w-[min(700px,65vh)] 2xl:h-[min(800px,75vh)]"
      >
        <div ref={splineMouseRef} className="h-full w-full">
          <Spline
            scene="https://prod.spline.design/ib9PB3lUzxmxoVK7/scene.splinecode"
            className="h-full w-full scale-50 xl:scale-75 2xl:scale-100"
          />
        </div>
      </div>

      {/* Content container - fills viewport for whole-screen hero */}
      <div className="relative z-10 h-dvh">
        {/* Copy row - absolute for consistent position across screen sizes */}
        <div
          data-preloader-target="hero-content"
          className="absolute left-0 right-0 md:top-10 z-20 flex w-full flex-col px-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:px-12 xl:top-[clamp(2rem,6vh,6rem)] xl:gap-8 2xl:top-[clamp(6rem,12vh,12rem)] 2xl:gap-12"
        >
          {/* Heading column */}
          <div className="md:min-w-0 md:flex-1">
            <h1 className="font-clash-display hidden lg:block text-5xl font-semibold leading-[1.3] text-[#191919] lg:text-8xl xl:text-7xl 2xl:text-8xl">
              <AnimatedCopy as="span" className="block">
                Creators of
              </AnimatedCopy>
              <AnimatedCopy as="span" className="block">
                Visionary Lives
              </AnimatedCopy>
              <AnimatedCopy as="span" className="block">
                and Businesses.
              </AnimatedCopy>
            </h1>
            {/* {Mobile & Tablet} */}
            <h1 className="font-clash-display lg:hidden text-center md:text-left text-4xl font-semibold leading-[1.3] text-[#191919] md:text-7xl lg:text-8xl xl:text-7xl 2xl:text-8xl">
              <AnimatedCopy as="span" className="block">
                Creators of
              </AnimatedCopy>
              <AnimatedCopy as="span" className="block">
                Visionary Lives
              </AnimatedCopy>
              <AnimatedCopy as="span" className="block">
                and Businesses.
              </AnimatedCopy>
            </h1>
          </div>

          {/* Description + buttons column */}
          <div className="flex flex-col gap-6 lg:w-80 lg:shrink-0 lg:gap-8 xl:w-72 xl:gap-6 2xl:w-80 2xl:gap-8">
            <AnimatedCopy
              as="p"
              className="font-satoshi text-center md:text-left text-sm font-medium uppercase leading-relaxed tracking-tight text-[#191919]  md:text-xl xl:text-lg 2xl:text-xl mt-10"
            >
              A creative advisory for founders. We design brands, build business
              systems, and connect the whole picture.
            </AnimatedCopy>
            <div className="flex flex-wrap flex-col gap-4 xl:gap-3">
              <button
                type="button"
                className="rounded-full w-64 bg-[#d1d1d1] px-6 py-3 font-satoshi font-medium text-sm uppercase tracking-wider text-[#191919] transition-colors hover:bg-[#e2e2e2] cursor-pointer xl:w-56 xl:px-5 xl:py-2.5 xl:text-xs 2xl:w-64 2xl:px-6 2xl:py-3 2xl:text-sm"
              >
                Start a Conversation
              </button>
            </div>
          </div>
        </div>
        {/* Rectangle Grid - scales with viewport via aspect-ratio */}
        <div
          ref={largeGridRef}
          data-preloader-target="hero-grid"
          className="absolute left-0 z-1 grid w-full grid-cols-5 grid-rows-4 border border-[#191919] aspect-5/4 h-auto max-h-[min(55vh,520px)] min-h-[clamp(200px,35vw,280px)] bottom-[clamp(6rem,12vh,13rem)] sm:min-h-[clamp(240px,40vw,320px)] md:max-h-[min(50vh,480px)] lg:min-h-[clamp(260px,38vw,340px)] xl:bottom-[clamp(2rem,6vh,6rem)] xl:max-h-[min(48vh,460px)] 2xl:bottom-[clamp(8rem,15vh,13rem)] 2xl:max-h-[min(52vh,540px)]"
        >
          {Array.from({ length: GRID_COLS * GRID_ROWS }, (_, i) => {
            const col = i % GRID_COLS;
            const row = Math.floor(i / GRID_COLS);
            const isLastCol = col === GRID_COLS - 1;
            const isLastRow = row === GRID_ROWS - 1;
            const isBlack = edgeBlackCells.has(i);

            return (
              <div
                key={i}
                className={`w-full border-[#191919] ${!isLastCol ? "border-r" : ""} ${!isLastRow ? "border-b" : ""} ${isBlack ? "bg-[#191919]" : ""}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
