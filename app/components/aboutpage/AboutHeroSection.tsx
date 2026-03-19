"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutHeroSection({
  onCtaClick,
}: {
  onCtaClick?: () => void;
}) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center pt-32 pb-24 text-center overflow-hidden">
      <div className="relative z-10 flex flex-col items-end justify-center">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-0 opacity-20 md:opacity-50 w-50 h-50 z-0 pointer-events-none scale-x-[-1]"
        >
          <Image
            src="/square.png"
            width={1000}
            height={1000}
            alt="square"
            className="w-full h-full object-contain"
          />
        </motion.div>
        <h1 className="font-clash-display text-center md:text-left text-5xl md:text-7xl lg:text-6xl xl:text-8xl font-semibold text-[#f2f2f2] max-w-3xl lg:max-w-4xl tracking-tight">
          We set out to build a life. The company came from that.
        </h1>

        <div className="font-satoshi text-center md:text-right font-medium uppercase text-[#f2f2f2] text-sm md:text-base leading-relaxed tracking-wider space-y-6 max-w-sm md:max-w-lg lg:max-w-2xl xl:max-w-2xl mt-20 md:mt-40 mb-12">
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

        <div className="self-center md:self-end">
          <button
            onClick={onCtaClick}
            className="cursor-pointer rounded-full bg-[#ffc878] hover:bg-[#ffc878]/80 px-8 py-4 font-satoshi font-medium uppercase text-[#191919] tracking-widest transition-colors duration-300"
          >
            Meet the Team
          </button>
        </div>
      </div>
    </section>
  );
}
