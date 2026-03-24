"use client";

import { useRef } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { motion } from "framer-motion";
import SplitText from "../ui/SplitText";
import { VisionStyleCard } from "../ui/VisionStyleCard";

export default function HowWeWorkSection() {
  const { isDarkTheme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const textColor = "text-[#f6f8ff]";
  const mutedTextColor = "text-neutral-400";
  const transition = "transition-colors duration-1000";

  return (
    <section
      ref={sectionRef}
      data-color="#191919"
      className="relative py-10 max-w-7xl mx-auto lg:py-18 flex flex-col justify-center"
    >
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-52 md:top-40 -right-20 md:right-0 opacity-5 md:w-100 md:h-100 z-0 pointer-events-none"
      ></motion.div>
      <div className="max-w-3xl relative z-10">
        <SplitText
          tag="h2"
          splitType="words"
          textAlign="left"
          className={`font-clash-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6 ${textColor} ${transition}`}
          text="How We Work"
        />
        <SplitText
          tag="p"
          splitType="lines"
          textAlign="left"
          className={`font-satoshi text-lg md:text-xl leading-relaxed ${mutedTextColor} ${transition}`}
          text="We're a small team of designers, developers, and strategists who are passionate about creating beautiful and functional websites."
        />
      </div>

      <GridCards isDarkTheme={isDarkTheme} />
    </section>
  );
}

const GridCards = ({ isDarkTheme }: { isDarkTheme: boolean }) => {
  const borderColor = "border-neutral-700";
  const divideColor = "divide-neutral-700";
  const textColor = "text-[#f2f2f2]";

  return (
    <div
      className={`w-full mt-16 px-4 md:px-0 transition-colors duration-1000 ${textColor}`}
    >
      <div
        className={`grid grid-cols-1 divide-y ${divideColor} border ${borderColor} md:grid-cols-3 md:divide-x md:divide-y-0 transition-colors duration-1000`}
      >
        <VisionStyleCard
          isDarkTheme={isDarkTheme}
          index={0}
          title=""
          title2="Kickstarter"
          description="Foundation. Brand clarity, digital presence, strategic framework. The starting point everything else builds from."
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <VisionStyleCard
          isDarkTheme={isDarkTheme}
          index={1}
          title=""
          title2="Builders"
          description="Three months. Deep work across brand, systems, and strategy. We build the infrastructure for your next stage of growth."
          src="https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=2379&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <VisionStyleCard
          isDarkTheme={isDarkTheme}
          index={2}
          title=""
          title2="Partner"
          description="Long-term creative partnership. Ongoing strategy, deep collaboration, shared belief in the outcome."
          src="https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>
    </div>
  );
};
