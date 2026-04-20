"use client";

import Link from "next/link";
import SquareSketch from "../ui/SquareSketch";
import AnimatedCopy from "../ui/AnimatedCopy";
import { usePageTransition } from "../transitions/TransitionProvider";

export default function AboutHeroSection() {
  const { navigateTo } = usePageTransition();

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center pt-32 pb-24 text-center ">
      <div className="relative z-10 flex flex-col items-end justify-center">
        <div className="absolute -bottom-64 md:top-52 left-0 md:opacity-50 w-100 h-100 md:w-150 md:h-150 z-0 pointer-events-none">
          <SquareSketch className="opacity-50 -rotate-12" />
        </div>
        <h1 className="font-clash-display text-center md:text-left text-5xl md:text-7xl lg:text-6xl xl:text-8xl font-semibold text-[#f2f2f2] max-w-3xl lg:max-w-4xl tracking-tight">
          <AnimatedCopy as="span" className="block">
            We set out to build a life. The company came from that.
          </AnimatedCopy>
        </h1>

        <div className="font-satoshi text-center md:text-right font-medium uppercase text-[#f2f2f2] text-sm md:text-base leading-relaxed tracking-wider space-y-6 max-w-sm md:max-w-lg lg:max-w-2xl xl:max-w-2xl mt-20 md:mt-40 mb-12">
          <AnimatedCopy as="span" className="block">
            Clark Creative Group started when Roger and Hattie Clark, childhood
            friends turned life partners, decided to take everything they knew
            about design, narrative, and strategy, and put it to work for
            founders who think the way they do.
          </AnimatedCopy>
          <AnimatedCopy as="span" className="block">
            You get a lot further when these parts of your life start pulling in
            the same direction.
          </AnimatedCopy>
        </div>

        <div className="self-center md:self-end">
          <Link
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              navigateTo("/contact");
            }}
            className="cursor-pointer bg-[#ffc878] hover:bg-[#ffc878]/80 px-8 py-4 font-satoshi font-bold uppercase text-[#191919] tracking-widest transition-colors duration-300"
          >
            Talk To Us
          </Link>
        </div>
      </div>
    </section>
  );
}
