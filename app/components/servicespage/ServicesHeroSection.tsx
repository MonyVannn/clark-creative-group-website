"use client";

import Link from "next/link";
import ShuffleCards from "./ShuffleCards";
import RectangleSketch from "../ui/RectangleSketch";
import SquareSketch from "../ui/SquareSketch";

interface SketchConfig {
  id: number;
  type: "square" | "rectangle";
  top: string;
  left: string;
  rotate: number;
  opacity: number;
  scale: number;
}

const FIXED_SKETCHES: SketchConfig[] = [
  {
    id: 1,
    type: "square",
    top: "10%",
    left: "85%",
    rotate: 45,
    opacity: 0.35,
    scale: 1.2,
  },
  {
    id: 2,
    type: "rectangle",
    top: "15%",
    left: "5%",
    rotate: -20,
    opacity: 0.25,
    scale: 0.9,
  },
  {
    id: 3,
    type: "rectangle",
    top: "75%",
    left: "85%",
    rotate: 110,
    opacity: 0.4,
    scale: 1.3,
  },
];

export default function ServicesHeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center pt-32 pb-24 text-center ">
      {/* Background Sketches */}
      <div className="absolute inset-0 z-0 pointer-events-none ">
        {FIXED_SKETCHES.map((sketch) => (
          <div
            key={sketch.id}
            className="absolute w-64 h-64 md:w-96 md:h-96"
            style={{
              top: sketch.top,
              left: sketch.left,
              transform: `translate(-50%, -50%) rotate(${sketch.rotate}deg) scale(${sketch.scale})`,
              opacity: sketch.opacity,
            }}
          >
            {sketch.type === "square" ? (
              <SquareSketch className="w-full h-full" />
            ) : (
              <RectangleSketch className="w-full h-full" />
            )}
          </div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-end justify-center">
        <h1 className="font-clash-display text-center md:text-left text-5xl md:text-7xl lg:text-6xl xl:text-8xl font-semibold text-[#f2f2f2] max-w-3xl lg:max-w-4xl tracking-tight">
          Explore Our Services
        </h1>

        <div className="font-satoshi text-center md:text-right font-medium uppercase text-[#f2f2f2] text-sm md:text-base leading-relaxed tracking-wider space-y-6 max-w-sm md:max-w-lg lg:max-w-2xl xl:max-w-2xl mt-20 md:mt-40 mb-12">
          <p>
            We bridge the gap between how you look and how you operate by
            designing your brand, systems, and strategy as one fluid,
            high-performance engine.
          </p>
        </div>

        <div className="self-center md:self-end">
          <Link
            href="/contact"
            className="cursor-pointer bg-[#ffc878] hover:bg-[#ffc878]/80 px-8 py-4 font-satoshi font-bold uppercase text-[#191919] tracking-widest transition-colors duration-300"
          >
            Talk To Us
          </Link>
        </div>
      </div>
    </section>
  );
}
