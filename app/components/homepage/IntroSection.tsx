"use client";

import CopyReveal from "../ui/CopyReveal";

export default function IntroSection() {
  return (
    <section className="intro-section relative w-full px-8 py-28 md:px-12  lg:px-16">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center gap-14 md:gap-16 lg:gap-20">
        <CopyReveal
          as="div"
          className="font-satoshi text-2xl font-medium leading-tight text-[#191919] text-center md:text-4xl lg:text-5xl"
          stagger={0.12}
        >
          We design brands with real voice. Build the systems that keep a
          business growing. And bring all the moving pieces together — because
          we see the whole board.
        </CopyReveal>
        <CopyReveal
          as="div"
          className="font-clash-display text-center text-4xl font-semibold text-[#191919] md:text-6xl lg:text-7xl"
          stagger={0.08}
          delay={0.2}
        >
          Space. Story. System.
        </CopyReveal>
      </div>
    </section>
  );
}
