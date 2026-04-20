"use client";

import CopyReveal from "../ui/CopyReveal";
import HexaSketch from "../ui/HeroSectionHomepage/HexaSketch";

export default function IntroSection() {
  return (
    <section className="intro-section relative w-full px-8 py-28 md:px-12 lg:px-16 overflow-x-clip md:overflow-visible">
      <div className="absolute top-0 left-0 lg:-top-64 lg:left-40 w-[min(300px,40vh)] h-[min(400px,40vh)] md:w-[min(400px,50vh)] md:h-[min(500px,50vh)] lg:w-[min(600px,55vh)] lg:h-[min(700px,70vh)] xl:w-[min(480px,54vh)] xl:h-[min(800px,75vh)] 2xl:w-[min(700px,65vh)] 2xl:h-[min(800px,75vh)]">
        <HexaSketch className="w-full h-full opacity-50" />
      </div>
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center gap-14 md:gap-16 lg:gap-20">
        <CopyReveal
          as="div"
          className={`font-satoshi text-3xl font-medium leading-tight text-center md:text-3xl lg:text-4xl transition-colors duration-1400 text-foreground`}
          stagger={0.12}
        >
          We work with founders who have a strong vision but need the right
          environment, messaging, and execution to bring it to life at a higher
          level. We align how your business feels, communicates, and functions.
        </CopyReveal>
        <CopyReveal
          as="div"
          className={`font-satoshi text-3xl font-medium leading-tight text-center md:text-3xl lg:text-4xl transition-colors duration-1400 text-foreground`}
          stagger={0.12}
        >
          We do that through the thoughtful design of these pillars:
        </CopyReveal>
        <CopyReveal
          as="div"
          className={`font-clash-display -mt-12 text-center text-4xl font-semibold md:text-5xl lg:text-6xl transition-colors duration-1400 text-foreground`}
          stagger={0.08}
          delay={0.2}
        >
          Space. Story. System.
        </CopyReveal>
      </div>
    </section>
  );
}
