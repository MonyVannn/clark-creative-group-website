"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useRef } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { usePreloader } from "../PreloaderContext";
import { usePageTransition } from "../transitions/TransitionProvider";
import SquareSketch from "../ui/SquareSketch";

gsap.registerPlugin(ScrollTrigger);

const AUDIENCE = [
  "Founders at an inflection point: scaling, launching something new, repositioning, or raising capital",
  "Visionaries whose plans don't fit neatly into one service category",
  "Founders who've tried the five-vendor approach and watched the pieces fail to fit",
  "Leaders who think holistically about life and business and need a partner who does the same",
];

export default function WholePictureSection() {
  const { isDarkTheme } = useTheme();
  const { isPreloaderComplete } = usePreloader();
  const { navigateTo } = usePageTransition();

  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const audienceHeadingRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!isPreloaderComplete) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        eyebrowRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
      )
        .fromTo(
          headlineRef.current,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.2",
        )
        .fromTo(
          subheadRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.5",
        )
        .fromTo(
          bodyRef.current ? Array.from(bodyRef.current.children) : [],
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
          "-=0.3",
        )
        .fromTo(
          audienceHeadingRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          "-=0.2",
        )
        .fromTo(
          listRef.current ? Array.from(listRef.current.children) : [],
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
          "-=0.2",
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.1",
        );
    },
    { scope: sectionRef, dependencies: [isPreloaderComplete] },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full px-6 py-28 md:px-12 lg:px-16"
    >
      <SquareSketch className="absolute top-20 2xl:left-1/5 opacity-25 w-64 h-64 md:w-120 md:h-120 rotate-12" />
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 md:gap-12">
        <div className="flex flex-col gap-4">
          <span
            ref={eyebrowRef}
            className={`font-satoshi text-xs font-medium uppercase tracking-[0.25em] transition-colors duration-1400 ${
              isDarkTheme ? "text-gray-400" : "text-[#606060]"
            }`}
          >
            The Whole Picture
          </span>
          <h2
            ref={headlineRef}
            className={`font-clash-display text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl transition-colors duration-1400 ${
              isDarkTheme ? "text-white" : "text-[#0a191f]"
            }`}
          >
            A business that knows itself.
          </h2>
          <p
            ref={subheadRef}
            className={`font-satoshi max-w-2xl text-base font-medium md:text-lg transition-colors duration-1400 ${
              isDarkTheme ? "text-gray-400" : "text-[#606060]"
            }`}
          >
            Story, space, and system, woven into one thread.
          </p>
        </div>

        <div
          ref={bodyRef}
          className={`font-satoshi flex flex-col gap-5 text-base leading-relaxed md:text-lg transition-colors duration-1400 ${
            isDarkTheme ? "text-gray-300" : "text-[#0a191f]"
          }`}
        >
          <p>
            The three pillars work on their own. But when they&apos;re designed
            together, brand, systems, and space as one cohesive architecture,
            everything compounds. The brand informs the system. The system
            serves the experience. The space tells the story.
          </p>
          <p>
            This is the full engagement. One team holding your entire vision.
            One cadence. One point of contact from the first conversation
            through every phase of the build.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h3
            ref={audienceHeadingRef}
            className={`font-clash-display text-xl font-semibold md:text-2xl transition-colors duration-1400 ${
              isDarkTheme ? "text-white" : "text-[#0a191f]"
            }`}
          >
            Who this is for:
          </h3>
          <ul
            ref={listRef}
            className={`font-satoshi flex flex-col gap-2 text-base leading-relaxed list-disc md:text-lg transition-colors duration-1400 ${
              isDarkTheme ? "text-gray-300" : "text-[#0a191f]"
            }`}
          >
            {AUDIENCE.map((item) => (
              <li key={item} className="ml-5">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div ref={ctaRef} className="pt-2">
          <Link
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              navigateTo("/contact");
            }}
            className="inline-block bg-[#ffc878] px-8 py-4 font-satoshi font-bold uppercase text-sm tracking-widest text-[#040b22] transition-colors duration-300 hover:bg-[#ffc878]/80 cursor-pointer"
          >
            Start a Conversation
          </Link>
        </div>
      </div>
    </section>
  );
}
