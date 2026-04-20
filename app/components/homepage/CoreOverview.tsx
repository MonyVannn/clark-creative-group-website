"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import SplitText from "../ui/SplitText";
import SpaceSketchModel from "../ui/CoreOverview/SpaceSketchModel";
import StorySketchModel from "../ui/CoreOverview/StorySketchModel";
import SystemSketchModel from "../ui/CoreOverview/SystemSketchModel";
import { usePreloader } from "../PreloaderContext";

gsap.registerPlugin(ScrollTrigger);

export default function CoreOverview() {
  const { isPreloaderComplete } = usePreloader();
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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
    { scope: sectionRef, dependencies: [isPreloaderComplete] },
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
            className={`font-clash-display text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl transition-colors duration-1400 text-foreground`}
          >
            Three Pillars.
          </h2>
          <p
            ref={sublineRef}
            className={`font-satoshi max-w-2xl text-base font-medium md:text-lg transition-colors duration-1400 text-muted-foreground`}
          >
            Brand, systems, and strategy are not three separate problems. They
            are one architecture. We design them together.
          </p>
        </div>

        {/* 3-column card grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:grid-rows-[auto_auto_auto_auto_auto] md:gap-6 lg:gap-x-8 lg:gap-y-3 space-y-20 lg:space-y-0"
        >
          {/* Story Card */}
          <article
            className={`flex flex-col md:flex-row lg:grid lg:grid-rows-subgrid lg:row-span-5 gap-6 p-6 lg:p-8 transition-colors duration-1400`}
          >
            {/* Model container for Story */}
            <div className="w-full md:w-1/2 lg:w-full h-72 lg:h-120 order-0 md:order-2 lg:order-0">
              {/* Model layer */}
              <StorySketchModel className="w-full h-full" />
            </div>

            <div className="flex flex-col gap-3 w-full md:w-1/2 lg:contents">
              <SplitText
                text="Story"
                className={`font-clash-display text-2xl font-semibold md:text-3xl text-left transition-colors duration-1400 text-foreground`}
                textAlign="center"
                delay={50}
                duration={1.25}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
              />
              {/* <SplitText
                text="How your business feels"
                className={`font-clash-display text-lg font-medium md:text-xl text-left transition-colors duration-1400 text-foreground`}
                textAlign="center"
                delay={50}
                duration={1.25}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
              /> */}

              <div className="flex w-full flex-col gap-2">
                <p
                  className={`font-satoshi text-left text-sm font-bold md:text-lg transition-colors duration-1400 text-muted-foreground`}
                >
                  Promise: A space that knows what it's for.
                </p>
                <SplitText
                  text="The story you tell about your business is the business. If your message is unclear, your value gets missed. We help founders articulate what they do, why it matters, and how to communicate it in a way that builds trust. From brand positioning to investor-facing narrative, we shape the story that helps your business resonate."
                  className={`font-satoshi text-sm leading-relaxed md:text-lg transition-colors duration-1400 text-muted-foreground`}
                  textAlign="left"
                  delay={20}
                  duration={1}
                  ease="power3.out"
                  splitType="lines"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                />
              </div>

              <ul
                className={`feature-list font-satoshi text-sm leading-relaxed list-disc md:text-lg transition-colors duration-1400 text-muted-foreground`}
              >
                <li className="list-none font-bold text-left">Services:</li>
                <li className="ml-5 text-left">
                  Founder Narrative Development
                </li>
                <li className="ml-5 text-left">
                  Architectural Design and Consulting
                </li>
                <li className="ml-5 text-left">Spatial Brand Strategy</li>
                <li className="ml-5 text-left">
                  Workspace and Studio Design Direction
                </li>
                <li className="ml-5 text-left">Experience Concepting</li>
                <li className="ml-5 text-left">
                  Physical Experience Alignment
                </li>
              </ul>
            </div>
          </article>

          {/* Space Card */}
          <article
            className={`flex flex-col md:flex-row lg:grid lg:grid-rows-subgrid lg:row-span-5 gap-6 p-6 lg:p-8 transition-colors duration-1400`}
          >
            {/* Model container for Space */}
            <div className="w-full md:w-1/2 lg:w-full h-72 lg:h-120 ">
              {/* Model layer */}
              <SpaceSketchModel className="w-full h-full" />
            </div>

            <div className="flex flex-col gap-3 w-full md:w-1/2 lg:contents">
              <SplitText
                text="Space"
                className={`font-clash-display text-2xl font-semibold md:text-3xl text-left transition-colors duration-1400 text-foreground`}
                textAlign="center"
                delay={50}
                duration={1.25}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
              />
              {/* <SplitText
                text="How your business communicates"
                className={`font-clash-display text-lg font-medium md:text-xl text-left transition-colors duration-1400 text-foreground`}
                textAlign="center"
                delay={50}
                duration={1.25}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
              /> */}

              <div className="flex w-full flex-col gap-2">
                <p
                  className={`font-satoshi text-left text-sm font-bold md:text-lg transition-colors duration-1400 text-muted-foreground`}
                >
                  Promise: A brand that knows what it is, and what it isn't.
                </p>
                <SplitText
                  text="Your environment shapes everything. The spaces surrounding your business, physical, digital, and experiential, all influence how people perceive your brand, trust your work, and engage with what you offer. We help bring intentionality to those environments so they reflect the level of what you're building."
                  className={`font-satoshi text-sm text-justify leading-relaxed md:text-lg transition-colors duration-1400 text-muted-foreground`}
                  textAlign="left"
                  delay={20}
                  duration={1}
                  ease="power3.out"
                  splitType="lines"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                />
              </div>

              <ul
                className={`feature-list font-satoshi text-sm leading-relaxed list-disc md:text-lg transition-colors duration-1400 text-muted-foreground`}
              >
                <li className="list-none font-bold text-left">Services:</li>
                <li className="ml-5 text-left">
                  Founder Narrative Development
                </li>
                <li className="ml-5 text-left">Pitch Deck Storytelling</li>
                <li className="ml-5 text-left">Brand Positioning</li>
                <li className="ml-5 text-left">
                  Offer Clarity and Market Framing
                </li>
                <li className="ml-5 text-left">
                  Website Copy and Creative Direction
                </li>
                <li className="ml-5 text-left">
                  Content Strategy and Messaging Frameworks
                </li>
              </ul>
            </div>
          </article>

          {/* System Card */}
          <article
            className={`flex flex-col md:flex-row lg:grid lg:grid-rows-subgrid lg:row-span-5 gap-6 p-6 lg:p-8 transition-colors duration-1400 overflow-hidden`}
          >
            {/* Model container for System */}
            <div className="w-full md:w-1/2 lg:w-full h-72 lg:h-120 ">
              {/* Model layer */}
              <SystemSketchModel className="w-full h-full" />
            </div>

            <div className="flex flex-col gap-3 w-full md:w-1/2 lg:contents">
              <SplitText
                text="System"
                className={`font-clash-display text-2xl font-semibold md:text-3xl text-left transition-colors duration-1400 text-foreground`}
                textAlign="center"
                delay={50}
                duration={1.25}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
              />
              {/* <SplitText
                text="How your business functions"
                className={`font-clash-display text-lg font-medium md:text-xl text-left transition-colors duration-1400 text-foreground`}
                textAlign="center"
                delay={50}
                duration={1.25}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
              /> */}

              <div className="flex w-full flex-col gap-2">
                <p
                  className={`font-satoshi text-left text-sm font-bold md:text-lg transition-colors duration-1400 text-muted-foreground`}
                >
                  Promise: A business that knows what to do without you.
                </p>
                <SplitText
                  text="A strong voice can create attention but systems create persistent momentum. We build operations that support growth, reduce friction, and create a more functional business behind the scenes. This is where strategy becomes execution."
                  className={`font-satoshi text-sm leading-relaxed md:text-lg transition-colors duration-1400 text-muted-foreground`}
                  textAlign="left"
                  delay={20}
                  duration={1}
                  ease="power3.out"
                  splitType="lines"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                />
              </div>

              <ul
                className={`feature-list font-satoshi text-sm leading-relaxed list-disc md:text-lg transition-colors duration-1400 text-muted-foreground`}
              >
                <li className="list-none font-bold text-left">Services:</li>
                <li className="ml-5 text-left">
                  Business "Second Brain" Design
                </li>
                <li className="ml-5 text-left">Client Journey Design</li>
                <li className="ml-5 text-left">
                  Lead Capture and Follow-Up Systems
                </li>
                <li className="ml-5 text-left">CRM and Workflow Strategy</li>
                <li className="ml-5 text-left">Internal Process Design</li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
