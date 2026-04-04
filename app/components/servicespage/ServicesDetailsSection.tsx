"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ShuffleCards from "./ShuffleCards";
import { useTheme } from "../contexts/ThemeContext";
import SquareSketch from "../ui/SquareSketch";
import SplitText from "../ui/SplitText";
import RectangleSketch from "../ui/RectangleSketch";
import RotationLine from "../ui/RotationLine";

const SERVICES_DATA = [
  {
    id: "01",
    title: "SPACE",
    description:
      "Your environment shapes everything. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl.",
    list: [
      "Architectural Design & Consulting",
      "Brand Environment Audits",
      "Workspace & Studio Design Direction",
      "Community & Social Environment Strategy",
    ],
  },
  {
    id: "02",
    title: "STORY",
    description:
      "The story you tell about your business is the business. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.",
    list: [
      "Brand Identity & Messaging",
      "Content Strategy & Copywriting",
      "Campaign Development",
      "Digital Presence & Web Design",
    ],
  },
  {
    id: "03",
    title: "SYSTEM",
    description:
      "Business systems multiply your best work. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl.",
    list: [
      "Operational Workflows",
      "Sales Funnel Optimization",
      "CRM Implementation",
      "Automation & Tool Integration",
    ],
  },
];

const easeOutSnappy = [0.22, 1, 0.36, 1] as const;
const easeInQuick = [0.4, 0, 1, 1] as const;

const copyContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.22, ease: easeInQuick },
  },
};

const copyItem = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: easeOutSnappy },
  },
};

export default function ServicesDetailsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { isDarkTheme } = useTheme();

  const activeService = SERVICES_DATA[activeIndex] || SERVICES_DATA[0];

  const textColor = isDarkTheme ? "text-[#f2f2f2]" : "text-[#f2f2f2]";
  const transition = "transition-colors duration-1000";

  return (
    <section
      className={`relative w-full max-w-7xl mx-auto px-8 py-24 z-10 ${textColor} ${transition}`}
    >
      <div className="pb-16 md:pb-24 max-w-3xl relative z-10">
        <SquareSketch className="absolute -top-44 left-0 w-150 h-150 opacity-20 pointer-events-none rotate-12 " />

        <SplitText
          tag="h2"
          splitType="words"
          textAlign="left"
          className="font-clash-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6"
          text="What We Build for Your Business"
        />
        <SplitText
          tag="p"
          splitType="lines"
          textAlign="left"
          className={`font-satoshi text-lg md:text-xl leading-relaxed  ${transition}`}
          text="Our services connect your space, your story, and your systems—transforming how you work, communicate, and grow. Explore each core pillar below to see how we bring clarity and strength to every part of your business."
        />
      </div>
      <div className="flex flex-col lg:flex-row relative items-center lg:items-start lg:gap-8 xl:gap-10">
        {/* Left Column: ShuffleCards */}
        <div className="w-full lg:w-[65%] lg:min-w-0 lg:shrink-0 flex items-center justify-center relative z-20">
          <RotationLine className="scale-50 absolute -bottom-32" />
          <div className="flex items-center justify-center transform scale-[0.6] sm:scale-[0.7] md:scale-[0.65] lg:scale-[0.75] xl:scale-[0.9] origin-center z-10 w-full h-full">
            <ShuffleCards onActiveCardChange={setActiveIndex} />
          </div>
        </div>

        {/* Right Column: Dynamic Content */}
        <div
          className={`w-full lg:w-[35%] lg:min-w-0 flex flex-col relative z-10 ${transition}`}
        >
          <RectangleSketch className="absolute -bottom-52 left-1/2 -translate-x-1/2 lg:left-auto lg:right-0 lg:translate-x-0 w-150 h-150 opacity-20 pointer-events-none rotate-90" />

          {/* Content Area */}
          <div className="flex-1 flex flex-col justify-start relative min-h-[650px] md:min-h-[700px] lg:min-h-0">
            <div className="flex-1 flex flex-col items-center justify-center text-center lg:items-start lg:justify-start lg:text-left z-10 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  className="flex flex-col items-center lg:items-start w-full font-satoshi text-sm md:text-xl leading-loose tracking-[0.05em] text-center lg:text-left"
                  variants={copyContainer}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                >
                  <motion.p
                    variants={copyItem}
                    className="mb-10 text-justify w-full"
                  >
                    {activeService.description}
                  </motion.p>
                  {activeService.list.map((item, idx) => (
                    <motion.p
                      key={`${activeService.id}-${idx}`}
                      variants={copyItem}
                      className={`flex items-center justify-center lg:justify-start text-center lg:text-left w-full ${
                        idx > 0 ? "mt-4" : ""
                      }`}
                    >
                      {item}
                    </motion.p>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
