"use client";

import { useRef } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { motion } from "framer-motion";
import Image from "next/image";
import SplitText from "../ui/SplitText";

export default function VisionSection() {
  const { isDarkTheme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const textColor = "text-[#f2f2f2]";
  const mutedTextColor = "text-neutral-400";
  const transition = "transition-colors duration-1000";

  return (
    <section
      ref={sectionRef}
      data-color="#191919"
      className="relative py-32 max-w-7xl mx-auto lg:py-48 flex flex-col justify-center "
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
          text="What We Believe"
        />
        <SplitText
          tag="p"
          splitType="lines"
          textAlign="left"
          className={`font-satoshi text-lg md:text-xl leading-relaxed ${mutedTextColor} ${transition}`}
          text="A set of internal laws for external results. We strip away the noise to focus on what actually moves the needle: environment, momentum, and the radical pursuit of clarity."
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
        className={`grid grid-cols-1 divide-y ${divideColor} border ${borderColor} md:grid-cols-2 md:divide-x md:divide-y-0 transition-colors duration-1000`}
      >
        <Card
          isDarkTheme={isDarkTheme}
          index={0}
          title="You move faster when you know exactly"
          title2=" where you are and where you're headed."
          description="Clarity first. Then speed comes naturally."
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <Card
          isDarkTheme={isDarkTheme}
          index={1}
          title="Your environment shapes "
          title2="your outcome."
          description="We've seen it in architecture. We've lived it in business. The space around you is always shaping what's possible."
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>
      <div
        className={`grid grid-cols-1 divide-y ${divideColor} border-x border-b ${borderColor} md:grid-cols-2 md:divide-x md:divide-y-0 transition-colors duration-1000`}
      >
        <Card
          isDarkTheme={isDarkTheme}
          index={2}
          title="Business and life can run on "
          title2="the same frequency."
          description="When they do, everything compounds. Your values reinforce your work. Your work feeds your life. We built Clark Creative Group as proof that this is real."
          src="https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=2379&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <Card
          isDarkTheme={isDarkTheme}
          index={3}
          title="Use what"
          title2=" you have."
          description="Make the decision right instead of endlessly searching for the right decision. Start with what's in front of you."
          src="https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>
    </div>
  );
};

const Card = ({
  isDarkTheme,
  title,
  title2,
  description,
  src,
  index = 0,
}: {
  isDarkTheme: boolean;
  title: string;
  title2: string;
  description: string;
  src: string;
  index?: number;
}) => {
  const hoverBg = "hover:bg-neutral-900";
  const hoverText = "group-hover:text-[#ffc878]";
  const mutedText = "text-neutral-400";
  const descHoverText = "group-hover:text-[#f2f2f2]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.15 }}
      className={`group relative flex h-[400px] flex-col justify-between overflow-hidden p-6 transition-colors duration-1000 ${hoverBg} md:h-80 md:p-9`}
    >
      <h2 className="text-3xl font-clash-display font-medium leading-tight z-10">
        <span
          className={`transition-colors duration-500 ${mutedText} ${hoverText}`}
        >
          {title}
        </span>
        {title2}
      </h2>
      <div
        className={`font-satoshi flex items-center gap-1.5 transition-colors duration-500 z-10 ${mutedText} ${descHoverText}`}
      >
        {description}
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 top-0 opacity-0 blur-sm grayscale transition-all group-hover:opacity-10 group-active:scale-105 group-active:opacity-30 group-active:blur-0 group-active:grayscale-0 z-0"
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <Corners isDarkTheme={isDarkTheme} />
    </motion.div>
  );
};

const Corners = ({ isDarkTheme }: { isDarkTheme: boolean }) => {
  const cornerColor = "bg-[#ffc878]";

  return (
    <>
      <span
        className={`absolute left-px top-px z-10 h-3 w-px origin-top scale-0 ${cornerColor} transition-all duration-500 group-hover:scale-100`}
      />
      <span
        className={`absolute left-px top-px z-10 h-px w-3 origin-left scale-0 ${cornerColor} transition-all duration-500 group-hover:scale-100`}
      />
      <span
        className={`absolute bottom-px right-px z-10 h-3 w-px origin-bottom scale-0 ${cornerColor} transition-all duration-500 group-hover:scale-100`}
      />
      <span
        className={`absolute bottom-px right-px z-10 h-px w-3 origin-right scale-0 ${cornerColor} transition-all duration-500 group-hover:scale-100`}
      />
      <span
        className={`absolute bottom-px left-px z-10 h-3 w-px origin-bottom scale-0 ${cornerColor} transition-all duration-500 group-hover:scale-100`}
      />
      <span
        className={`absolute bottom-px left-px z-10 h-px w-3 origin-left scale-0 ${cornerColor} transition-all duration-500 group-hover:scale-100`}
      />
      <span
        className={`absolute right-px top-px z-10 h-3 w-px origin-top scale-0 ${cornerColor} transition-all duration-500 group-hover:scale-100`}
      />
      <span
        className={`absolute right-px top-px z-10 h-px w-3 origin-right scale-0 ${cornerColor} transition-all duration-500 group-hover:scale-100`}
      />
    </>
  );
};
