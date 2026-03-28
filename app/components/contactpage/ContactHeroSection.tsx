"use client";

import SquareSketch from "../ui/SquareSketch";

export default function ContactHeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center pt-32 pb-24 text-center ">
      <div className="relative z-10 flex flex-col items-end justify-center">
        <div className="absolute -bottom-64 md:top-52 left-0 md:opacity-50 w-100 h-100 md:w-150 md:h-150 z-0 pointer-events-none">
          <SquareSketch className="opacity-50 -rotate-12" />
        </div>
        <h1 className="font-clash-display text-center md:text-left text-5xl md:text-7xl lg:text-6xl xl:text-8xl font-semibold text-[#f2f2f2] max-w-3xl lg:max-w-4xl tracking-tight">
          Let&apos;s Start With a Conversation
        </h1>

        <div className="font-satoshi text-center md:text-right font-medium uppercase text-[#f2f2f2] text-sm md:text-base leading-relaxed tracking-wider space-y-6 max-w-sm md:max-w-lg lg:max-w-2xl xl:max-w-2xl mt-20 md:mt-40 mb-12">
          <p>Thirty minutes.</p>
          <p>
            Your vision, your business, and where Space, Story, or System
            creates the most momentum.
          </p>
        </div>
      </div>
    </section>
  );
}
