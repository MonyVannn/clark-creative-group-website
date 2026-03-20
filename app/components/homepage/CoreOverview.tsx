"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import CopyReveal from "../ui/CopyReveal";
import { FaServicestack } from "react-icons/fa6";
import SplitText from "../ui/SplitText";
import { useTheme } from "../contexts/ThemeContext";
import SpaceSketchModel from "../ui/CoreOverview/SpaceSketchModel";
import StorySketchModel from "../ui/CoreOverview/StorySketchModel";
import SystemSketchModel from "../ui/CoreOverview/SystemSketchModel";
import HexaBackground from "../ui/CoreOverview/HexaBackground";

gsap.registerPlugin(ScrollTrigger);

export default function CoreOverview() {
  const { isDarkTheme } = useTheme();
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

      const featureLists = gsap.utils.toArray(".feature-list") as HTMLElement[];
      featureLists.forEach((list) => {
        gsap.fromTo(
          list.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: list,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 lg:py-40 overflow-x-hidden px-6 md:px-12 lg:px-16"
    >
      <div className="flex flex-col gap-12 md:gap-16 xl:gap-0 2xl:gap-16">
        {/* Section intro */}
        <div className="flex flex-col gap-2">
          <h2
            ref={headlineRef}
            className={`font-clash-display text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl transition-colors duration-1400 ${
              isDarkTheme ? "text-white" : "text-[#0a191f]"
            }`}
          >
            Three Pillars.
          </h2>
          <p
            ref={sublineRef}
            className={`font-satoshi max-w-2xl text-base font-medium md:text-lg transition-colors duration-1400 ${
              isDarkTheme ? "text-gray-400" : "text-[#606060]"
            }`}
          >
            Brand, systems, and strategy are not three separate problems. They
            are one architecture. We design them together.
          </p>
        </div>

        {/* 3-column card grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 gap-8 lg:grid-cols-3 md:gap-6 lg:gap-8 space-y-20 lg:space-y-0"
        >
          {/* Space Card */}
          <article
            className={`flex flex-col md:flex-row lg:flex-col gap-6 p-6 lg:p-8 transition-colors duration-1400`}
          >
            {/* Model container for Space */}
            <div className="w-full md:w-1/2 lg:w-full h-72 lg:h-120 ">
              {/* Model layer */}
              <SpaceSketchModel className="w-full h-full" />
            </div>

            <div className="flex flex-col gap-3 w-full md:w-1/2 lg:w-full">
              <SplitText
                text="01. Space"
                className={`font-clash-display text-2xl font-semibold md:text-3xl text-left transition-colors duration-1400 ${
                  isDarkTheme ? "text-white" : "text-[#0a191f]"
                }`}
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
                text="Your environment shapes everything. Not just the room — the website, the community, the entire world you and your customers move through. We design those environments. Physical. Digital. Social. When the container matches the ambition, momentum is natural."
                className={`font-satoshi text-sm leading-relaxed md:text-base transition-colors duration-1400 ${
                  isDarkTheme ? "text-gray-300" : "text-[#0a191f]"
                }`}
                textAlign="left"
                delay={20}
                duration={1}
                ease="power3.out"
                splitType="lines"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
              />

              <ul
                className={`feature-list font-satoshi list-disc pl-5 text-sm leading-relaxed md:text-base transition-colors duration-1400 ${
                  isDarkTheme ? "text-gray-300" : "text-[#0a191f]"
                }`}
              >
                <li>Architectural Design & Consulting</li>
                <li>Brand Environment Audits</li>
                <li>Website & Digital Presence Architecture</li>
                <li>Workspace & Studio Design Direction</li>
              </ul>
            </div>
          </article>

          {/* Story Card */}
          <article
            className={`flex flex-col md:flex-row lg:flex-col gap-6 p-6 lg:p-8 transition-colors duration-1400`}
          >
            {/* Model container for Story */}
            <div className="w-full md:w-1/2 lg:w-full h-72 lg:h-120 order-0 md:order-2 lg:order-0">
              {/* Model layer */}
              <StorySketchModel className="w-full h-full" />
            </div>

            <div className="flex flex-col gap-3 w-full md:w-1/2 lg:w-full">
              <SplitText
                text="02. Story"
                className={`font-clash-display text-2xl font-semibold md:text-3xl text-left transition-colors duration-1400 ${
                  isDarkTheme ? "text-white" : "text-[#0a191f]"
                }`}
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
                text="The story you tell about your business is the business. We gather the truths underneath — sit with founders, listen to what's really there — and craft a narrative the right people can't ignore. Clear voice. Real message. The kind of story people repeat without being asked."
                className={`font-satoshi text-sm leading-relaxed md:text-base transition-colors duration-1400 ${
                  isDarkTheme ? "text-gray-300" : "text-[#0a191f]"
                }`}
                textAlign="left"
                delay={20}
                duration={1}
                ease="power3.out"
                splitType="lines"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
              />

              <ul
                className={`feature-list font-satoshi list-disc pl-5 text-sm leading-relaxed md:text-base transition-colors duration-1400 ${
                  isDarkTheme ? "text-gray-300" : "text-[#0a191f]"
                }`}
              >
                <li>Brand Strategy & Voice</li>
                <li>Founder Story Development</li>
                <li>Investor & Stakeholder Narratives</li>
                <li>Content Strategy & Messaging Frameworks</li>
              </ul>
            </div>
          </article>

          {/* System Card */}
          <article
            className={`flex flex-col md:flex-row lg:flex-col gap-6 p-6 lg:p-8 transition-colors duration-1400 overflow-hidden`}
          >
            {/* Model container for System */}
            <div className="w-full md:w-1/2 lg:w-full h-72 lg:h-120 ">
              {/* Model layer */}
              <SystemSketchModel className="w-full h-full" />
            </div>

            <div className="flex flex-col gap-3 w-full md:w-1/2 lg:w-full">
              <SplitText
                text="03. System"
                className={`font-clash-display text-2xl font-semibold md:text-3xl text-left transition-colors duration-1400 ${
                  isDarkTheme ? "text-white" : "text-[#0a191f]"
                }`}
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
                text="Business systems multiply your best work. Every day. We build automation, AI tools, and operational architecture designed around how you actually work — custom AI workflows for key team members, dashboards that show real numbers, communication rhythms that hold a growing company together."
                className={`font-satoshi text-sm leading-relaxed md:text-base transition-colors duration-1400 ${
                  isDarkTheme ? "text-gray-300" : "text-[#0a191f]"
                }`}
                textAlign="left"
                delay={20}
                duration={1}
                ease="power3.out"
                splitType="lines"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
              />

              <ul
                className={`feature-list font-satoshi list-disc pl-5 text-sm leading-relaxed md:text-base transition-colors duration-1400 ${
                  isDarkTheme ? "text-gray-300" : "text-[#0a191f]"
                }`}
              >
                <li>Business Automation & AI Integration</li>
                <li>CRM & Operations Architecture</li>
                <li>Growth Dashboards & KPI Systems</li>
                <li>Team Workflow & Communication Design</li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
