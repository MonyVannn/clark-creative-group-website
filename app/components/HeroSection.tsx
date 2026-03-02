"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FiArrowRight } from "react-icons/fi";
import SplitText from "./SplitText";

gsap.registerPlugin(useGSAP);

export default function HeroSection() {
  const descRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      descRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 1.2, ease: "power3.out" },
    );
  });

  return (
    <section className="absolute inset-0 container mx-auto flex">
      {/* Left column — heading anchored to bottom */}
      <div className="w-full h-fit relative top-1/4 text-[#FEFAE0]">
        <SplitText
          text="Crafting Life"
          as="h1"
          className="font-clash-display text-8xl font-semibold leading-none uppercase tracking-wide"
          triggerOnLoad
          initialDelay={0}
        />
        <SplitText
          text="By Design"
          as="h1"
          className="font-clash-display text-8xl font-semibold leading-none uppercase tracking-wide"
          triggerOnLoad
          initialDelay={0}
        />
        <SplitText
          text="- CLARK  CREATIVE  GROUP"
          as="h1"
          className="font-clash-display text-2xl font-medium leading-none uppercase tracking-wide"
          triggerOnLoad
          initialDelay={0}
        />
      </div>

      {/* Right column — body copy pinned to bottom-right */}
      <div className="absolute bottom-1/4 right-0 flex justify-end">
        <div
          ref={descRef}
          className="font-satoshi font-medium text-lg max-w-sm space-y-6 opacity-0 text-[#FEFAE0]"
        >
          <p className="leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit
            amet.
          </p>
          <p className="leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit
            amet consectetur.
          </p>
          <p className="leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit
            amet consectetur adipiscing elit quisque faucibus.
          </p>
          <p className="leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipiscing elit.
          </p>

          <button className="group flex h-10 items-center gap-2 rounded-full bg-white/10 pl-3 pr-4 cursor-pointer transition-all duration-300 ease-in-out hover:bg-white hover:pl-2 hover:text-black active:bg-white/80">
            <span className="rounded-full bg-[#FEFAE0] p-1 text-sm transition-colors duration-300 group-hover:bg-black">
              <FiArrowRight className="-translate-x-[200%] text-[0px] transition-all duration-300 group-hover:translate-x-0 group-hover:text-lg group-hover:text-white group-active:-rotate-45" />
            </span>
            <span className="transition-colors duration-300 group-hover:text-black">
              Get in touch
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
