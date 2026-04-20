"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { usePreloader } from "../PreloaderContext";

gsap.registerPlugin(ScrollTrigger);

type Tier = {
  title: string;
  description: string;
  includes: string[];
};

const TIERS: Tier[] = [
  {
    title: "Foundation",
    description:
      "A focused foundational engagement for founders who need clarity, direction, and a stronger starting point.",
    includes: [
      "Brand clarity",
      "Messaging direction",
      "Website and digital presence strategy",
      "Strategic recommendations",
      "Foundational next-step roadmap",
    ],
  },
  {
    title: "Build",
    description:
      "A deeper engagement for businesses ready to strengthen their core pillars.",
    includes: [
      "Strategic deep dive",
      "Brand and website refinement",
      "Systems and infrastructure work",
      "Design services",
      "Offer and messaging alignment",
      "Implementation support",
    ],
  },
  {
    title: "Expansion Partner",
    description: "An ongoing creative and strategic partnership.",
    includes: [
      "Monthly strategic guidance",
      "Creative direction",
      "Messaging and offer support",
      "Systems refinement",
      "Trusted backboard access",
    ],
  },
];

export default function HowWeWorkSection() {
  const { isDarkTheme } = useTheme();
  const { isPreloaderComplete } = usePreloader();

  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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
          introRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.5",
        )
        .fromTo(
          gridRef.current ? Array.from(gridRef.current.children) : [],
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.15 },
          "-=0.3",
        );
    },
    { scope: sectionRef, dependencies: [isPreloaderComplete] },
  );

  const mutedText = isDarkTheme ? "text-gray-400" : "text-[#606060]";
  const strongText = isDarkTheme ? "text-white" : "text-[#0a191f]";
  const bodyText = isDarkTheme ? "text-gray-300" : "text-[#0a191f]";
  const dividerColor = isDarkTheme ? "border-white" : "border-black/10";

  return (
    <section
      ref={sectionRef}
      className="relative w-full px-6 py-28 md:px-12 lg:px-16"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-14 md:gap-16">
        <div className="flex flex-col gap-4">
          <span
            ref={eyebrowRef}
            className={`font-satoshi text-xs font-medium uppercase tracking-[0.25em] transition-colors duration-1400 ${mutedText}`}
          >
            How We Work
          </span>
          <h2
            ref={headlineRef}
            className={`font-clash-display text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl transition-colors duration-1400 ${strongText}`}
          >
            Interdisciplinary by design.
          </h2>
          <p
            ref={introRef}
            className={`font-satoshi max-w-2xl text-base font-medium md:text-lg transition-colors duration-1400 ${mutedText}`}
          >
            Our work is intentionally interdisciplinary. We look at the full
            picture of what you&apos;re building and identify where clarity,
            refinement, and structure will create the most leverage.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-8 lg:grid-rows-[auto_auto_auto_auto]"
        >
          {TIERS.map((tier) => (
            <article
              key={tier.title}
              className={`flex flex-col gap-5 border-t-6 pt-8 transition-colors duration-1400 lg:grid lg:grid-rows-subgrid lg:row-span-4 lg:gap-0 ${dividerColor}`}
            >
              <h3
                className={`font-clash-display text-2xl font-semibold md:text-3xl transition-colors duration-1400 ${strongText}`}
              >
                {tier.title}
              </h3>
              <p
                className={`font-satoshi text-base leading-relaxed md:text-lg transition-colors duration-1400 lg:pt-5 ${bodyText}`}
              >
                {tier.description}
              </p>
              <span
                className={`font-satoshi text-xs font-medium uppercase tracking-[0.25em] transition-colors duration-1400 lg:pt-5 ${mutedText}`}
              >
                Includes
              </span>
              <ul
                className={`font-satoshi flex flex-col gap-2 text-base leading-relaxed list-disc md:text-lg transition-colors duration-1400 lg:pt-3 ${bodyText}`}
              >
                {tier.includes.map((item) => (
                  <li key={item} className="ml-5">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
