"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import SplitText from "../ui/SplitText";

// Mock data for the team members
const teamMembers = [
  {
    id: "01",
    name: "Roger Clark",
    position: "SYSTEMS + SPACE",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    linkedin: "#",
    bio1: "ROGER SPENT YEARS AS A LICENSED ARCHITECT DESIGNING LEGACY HOMES AND WELLNESS SANCTUARIES. SPACES WHERE EVERY DETAIL CARRIED INTENTION. HE LEARNED SOMETHING MOST PEOPLE SENSE BUT NEVER NAME: THE RIGHT ENVIRONMENT CHANGES HOW YOU THINK, HOW YOU PERFORM, HOW YOU LIVE.",
    bio2: "HE BRINGS THAT THINKING TO BUSINESS NOW. STRATEGY, SYSTEMS, SPACE — CONNECTED INTO ONE ARCHITECTURE. WHEN THINGS FEEL SCATTERED, HE'S THE ONE WHO LAYS IT ALL OUT AND SHOWS YOU HOW THE PIECES FIT.",
    bio3: "ARCHITECT BY TRAINING. SYSTEMS THINKER BY NATURE. THE PERSON WHO SEES THE WHOLE BOARD.",
  },
  {
    id: "02",
    name: "Hattie Clark",
    position: "STORY + VOICE",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
    linkedin: "#",
    bio1: "HATTIE FINDS THE TRUTH UNDERNEATH WHAT YOU'RE BUILDING AND GIVES IT THE WORDS IT DESERVES. SHE LISTENS TO THE HALF-FORMED THING YOU'RE STRUGGLING TO EXPLAIN AND HANDS IT BACK CLEAR, HONEST, AND READY TO USE.",
    bio2: "FOUNDERS WALK AWAY FROM CONVERSATIONS WITH HATTIE WITH TWO THINGS: CLARITY ON THEIR MESSAGE, AND THE NAME OF THE EXACT PERSON THEY NEED TO TALK TO NEXT.",
    bio3: "",
  },
];

export default function TeamSection() {
  const { isDarkTheme } = useTheme();

  const textColor = isDarkTheme ? "text-[#f2f2f2]" : "text-[#191919]";
  const mutedTextColor = isDarkTheme ? "text-neutral-400" : "text-[#393939]";
  const borderColor = isDarkTheme ? "border-[#f2f2f2]" : "border-[#191919]";
  const btnBg = isDarkTheme ? "bg-[#f2f2f2]" : "bg-[#191919]";
  const btnText = isDarkTheme ? "text-[#191919]" : "text-[#f2f2f2]";
  const btnHover = isDarkTheme ? "hover:bg-neutral-300" : "hover:bg-[#393939]";
  const transition = "transition-colors duration-1000";

  return (
    <section
      className={`relative w-full max-w-7xl mx-auto my-10 px-4 md:px-0 ${textColor} ${transition}`}
    >
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 md:-top-56 md:right-10 lg:right-40 opacity-30 md:opacity-50 w-100 h-100 z-0 pointer-events-none"
      >
        <Image
          src="/square.png"
          width={1000}
          height={1000}
          alt="square"
          className="w-full h-full object-contain"
        />
      </motion.div>
      <div className="pb-16 md:pb-24 max-w-3xl relative z-10">
        <SplitText
          tag="h2"
          splitType="words"
          textAlign="left"
          className="font-clash-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6"
          text="Meet the Minds Behind the Architecture"
        />
        <SplitText
          tag="p"
          splitType="lines"
          textAlign="left"
          className={`font-satoshi text-lg md:text-xl leading-relaxed ${mutedTextColor} ${transition}`}
          text="We bring together deep expertise in systems, space, and story to help you build something that matters. No fluff. Just clear thinking and honest execution."
        />
      </div>
      <div className={`border-t border-x ${borderColor} ${transition}`}>
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className={`w-full border-b flex flex-col ${borderColor} ${transition}`}
          >
            {/* Top Navbar */}
            <div
              className={`flex justify-between items-center px-6 py-4 border-b font-mono text-sm uppercase tracking-widest ${borderColor} ${transition}`}
            >
              <div className="flex items-center gap-4">
                <span className="text-xl font-medium">{member.id}</span>
              </div>
              <button
                className={`text-2xl hover:opacity-70 transition-opacity ${textColor} ${transition}`}
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col md:flex-row">
              {/* Left: Profile Square */}
              <div
                className={`w-full md:w-[35%] lg:w-[30%] p-10 aspect-square border-b md:border-b-0 md:border-r shrink-0 ${borderColor} ${transition}`}
              >
                <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
                  <motion.div
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                    />
                  </motion.div>
                </div>
              </div>

              {/* Right: Bio Header */}
              <div className="w-full md:w-[65%] lg:w-[70%] flex flex-col justify-between p-8 lg:p-12 relative min-h-75">
                <div className="flex flex-col items-start w-full">
                  <SplitText
                    tag="h2"
                    splitType="chars"
                    textAlign="left"
                    className="font-clash-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight mb-4 lg:mb-6"
                    text={member.name}
                  />
                  <SplitText
                    tag="h2"
                    splitType="words"
                    textAlign="left"
                    className="font-mono font-medium text-sm lg:text-xl uppercase tracking-[0.2em] opacity-80"
                    text={member.position}
                  />
                </div>

                {/* LinkedIn Button */}
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className={`mt-12 md:mt-0 md:absolute md:bottom-0 md:right-0 px-8 py-4 lg:px-12 lg:py-6 font-mono text-sm font-semibold tracking-widest uppercase inline-block ${btnBg} ${btnText} ${btnHover} ${transition}`}
                >
                  LINKEDIN
                </a>
              </div>
            </div>

            {/* Details Component */}
            <div
              className={`flex flex-col md:flex-row border-t p-8 lg:p-12 ${borderColor} ${transition}`}
            >
              {/* L-Arrow Anchor */}
              <div className="w-full md:w-[35%] lg:w-[30%] mb-8 md:mb-0 flex justify-start items-start pt-2">
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 60 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transition-colors duration-1000 ${isDarkTheme ? "stroke-[#f2f2f2]" : "stroke-[#191919]"}`}
                >
                  <path
                    d="M2.5 0V32.5H27"
                    stroke="inherit"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <path
                    d="M22 27L28 32.5L22 38"
                    stroke="inherit"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </svg>
              </div>

              {/* Typography Block */}
              <div className="w-full  md:w-[65%] lg:w-[70%] font-mono uppercase text-sm text-justify md:text-xl leading-9 tracking-[0.05em] space-y-8 pr-0 lg:pr-12 opacity-90">
                <SplitText
                  tag="p"
                  splitType="lines"
                  textAlign="justify"
                  text={member.bio1}
                />
                <SplitText
                  tag="p"
                  splitType="lines"
                  textAlign="justify"
                  text={member.bio2}
                />
                {member.bio3 && (
                  <SplitText
                    tag="p"
                    splitType="lines"
                    textAlign="justify"
                    text={member.bio3}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
