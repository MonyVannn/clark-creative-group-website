"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    title: "SPACE",
    label: "DESIGN PRINCIPLE",
    description:
      "Every great outcome starts with room to think. We create intentional space -- in strategy, design, and process -- so ideas have room to breathe and evolve.",
    pattern: "space",
  },
  {
    title: "STORY",
    label: "CREATIVE FRAMEWORK",
    description:
      "Facts inform, but stories transform. We craft narratives that connect your brand's purpose to your audience's reality -- turning complexity into clarity.",
    pattern: "story",
  },
  {
    title: "SYSTEM",
    label: "OPERATIONAL BACKBONE",
    description:
      "Vision without structure is just a wish. We build scalable systems that turn one-time wins into repeatable, compounding growth engines.",
    pattern: "system",
  },
] as const;

function GeometricArtBlock({
  pattern,
}: {
  pattern: (typeof CARDS)[number]["pattern"];
}) {
  const COLS = 6;
  const ROWS = 5;

  // Space: sparse scattered cells (openness)
  const spaceCells = new Set([2, 8, 15, 21, 28]);

  // Story: diagonal flow (narrative progression)
  const storyCells = new Set([0, 7, 14, 21, 28, 35, 6, 13, 20, 27]);

  // System: dense structured grid (order)
  const systemCells = new Set([
    0, 1, 2, 3, 4, 5, 6, 11, 12, 17, 18, 23, 24, 29, 30,
  ]);

  const getCells = () => {
    switch (pattern) {
      case "space":
        return spaceCells;
      case "story":
        return storyCells;
      case "system":
        return systemCells;
    }
  };

  const cells = getCells();

  return (
    <div
      className="grid w-full border border-[#191919]"
      style={{
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        aspectRatio: `${COLS} / ${ROWS}`,
      }}
    >
      {Array.from({ length: COLS * ROWS }, (_, i) => {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        const isLastCol = col === COLS - 1;
        const isLastRow = row === ROWS - 1;
        const isBlack = cells.has(i);

        return (
          <div
            key={i}
            className={`border-[#191919] ${!isLastCol ? "border-r" : ""} ${!isLastRow ? "border-b" : ""} ${isBlack ? "bg-[#191919]" : "bg-[#f2f2f2]"}`}
          />
        );
      })}
    </div>
  );
}

export default function CoreOverview() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        headlineRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
      )
        .fromTo(
          sublineRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.5",
        )
        .fromTo(
          cardsRef.current ? Array.from(cardsRef.current.children) : [],
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 },
          "-=0.3",
        );
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 lg:py-40">
      <div className="flex flex-col gap-12 md:gap-16 lg:gap-20">
        {/* Section intro */}
        <div className="flex flex-col gap-2">
          <h2
            ref={headlineRef}
            className="font-clash-display text-4xl font-semibold leading-tight text-[#191919] md:text-5xl lg:text-6xl"
          >
            Built on Three Pillars
          </h2>
          <p
            ref={sublineRef}
            className="font-satoshi max-w-2xl text-base font-medium text-[#606060] md:text-lg"
          >
            Space, Story, and System — the foundation of how we turn vision into
            reality.
          </p>
        </div>

        {/* 3-column card grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 lg:gap-8"
        >
          {CARDS.map((card) => (
            <article
              key={card.title}
              className="flex flex-col gap-6 border border-[#191919] bg-[#f2f2f2] p-6 md:p-6 lg:p-8"
            >
              <GeometricArtBlock pattern={card.pattern} />
              <div className="flex flex-col gap-3">
                <h3 className="font-clash-display text-2xl font-semibold text-[#191919] md:text-3xl">
                  {card.title}
                </h3>
                <span className="font-satoshi text-xs font-medium uppercase tracking-wider text-[#606060] -mt-3">
                  {card.label}
                </span>
                <p className="font-satoshi text-sm leading-relaxed text-[#191919] md:text-base">
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
