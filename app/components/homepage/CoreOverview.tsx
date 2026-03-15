"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import CopyReveal from "../ui/CopyReveal";
import { FaServicestack } from "react-icons/fa6";
import SplitText from "../ui/SplitText";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    title: "01. Space",
    description:
      "Your environment shapes everything. Not just the room — the website, the community, the entire world you and your customers move through. We design those environments. Physical. Digital. Social. When the container matches the ambition, momentum is natural.",
    services: [
      "Architectural Design & Consulting",
      "Brand Environment Audits",
      "Website & Digital Presence Architecture",
      "Workspace & Studio Design Direction",
    ],
    pattern: "space",
  },
  {
    title: "02. Story",
    description:
      "The story you tell about your business is the business. We gather the truths underneath — sit with founders, listen to what's really there — and craft a narrative the right people can't ignore. Clear voice. Real message. The kind of story people repeat without being asked.",
    services: [
      "Brand Strategy & Voice",
      "Founder Story Development",
      "Investor & Stakeholder Narratives",
      "Content Strategy & Messaging Frameworks",
    ],
    pattern: "story",
  },
  {
    title: "03. System",
    description:
      "Business systems multiply your best work. Every day. We build automation, AI tools, and operational architecture designed around how you actually work — custom AI workflows for key team members, dashboards that show real numbers, communication rhythms that hold a growing company together.",
    services: [
      "Business Automation & AI Integration",
      "CRM & Operations Architecture",
      "Growth Dashboards & KPI Systems",
      "Team Workflow & Communication Design",
    ],
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
            Three Pillars
          </h2>
          <p
            ref={sublineRef}
            className="font-satoshi max-w-2xl text-base font-medium text-[#606060] md:text-lg"
          >
            Brand, systems, and strategy are not three separate problems. They
            are one architecture. We design them together.
          </p>
        </div>

        {/* 3-column card grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 gap-8 lg:grid-cols-3 md:gap-6 lg:gap-8"
        >
          {CARDS.map((card) => (
            <article
              key={card.title}
              className="flex flex-col md:flex-row gap-6 border border-[#191919] bg-[#f2f2f2] p-6 lg:p-8 lg:flex-col"
            >
              {/* Wrap the GeometricArtBlock in a div to control its size on tablet */}
              <div className="w-full md:w-1/2 lg:w-full">
                <GeometricArtBlock pattern={card.pattern} />
              </div>

              <div className="flex flex-col gap-3 w-full md:w-1/2 lg:w-full">
                <SplitText
                  text={card.title}
                  className="font-clash-display text-2xl font-semibold text-[#191919] md:text-3xl text-left"
                  textAlign="left"
                  delay={50}
                  duration={1.25}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                />

                <SplitText
                  text={card.description}
                  className="font-satoshi text-sm leading-relaxed text-[#191919] md:text-base"
                  textAlign="left"
                  delay={20}
                  duration={1}
                  ease="power3.out"
                  splitType="lines"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                />

                <ul className="font-satoshi list-disc pl-5 text-sm leading-relaxed text-[#191919] md:text-base">
                  {card.services.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
