"use client";

import CopyReveal from "./CopyReveal";

export default function AboutHeroSection({
  onCtaClick,
}: {
  onCtaClick?: () => void;
}) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center pt-32 pb-24 text-center overflow-hidden">
      <div className="z-10 flex flex-col items-end justify-center">
        <h1 className="font-clash-display text-left text-3xl md:text-5xl lg:text-6xl xl:text-8xl font-semibold text-[#191919] max-w-4xl tracking-tight">
          We set out to build a life. The company came from that.
        </h1>

        <div className="font-satoshi text-right font-medium uppercase text-[#191919] text-sm md:text-base leading-relaxed tracking-wider space-y-6 max-w-sm md:max-w-lg lg:max-w-2xl xl:max-w-2xl mt-40 mb-12">
          <p>
            Clark Creative Group started when Roger and Hattie Clark — childhood
            friends turned life partners — decided to take everything they knew
            about design, narrative, and strategy, and put it to work for
            founders who think the way they do.
          </p>

          <p>
            You get a lot further when these parts of your life start pulling in
            the same direction.
          </p>
        </div>

        <div className="self-end">
          <button
            onClick={onCtaClick}
            className="cursor-pointer rounded-full bg-[#d1d1d1] hover:bg-[#e2e2e2] px-8 py-4 font-satoshi font-medium uppercase text-[#191919] tracking-widest transition-colors duration-300"
          >
            Meet the Team
          </button>
        </div>
      </div>
    </section>
  );
}
