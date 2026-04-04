"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import SplitText from "../ui/SplitText";
import RectangleSketch from "../ui/RectangleSketch";
import CopyReveal from "../ui/CopyReveal";
import HattieProfile from "./HattieProfile";
import RogerProfile from "./RogerProfile";

// Mock data for the team members
const teamMembers: {
  id: string;
  name: string;
  position: string;
  linkedin: string;
  bio1: string;
  bio2: string;
  bio3: string;
  image?: string;
}[] = [
  {
    id: "01",
    name: "Roger Clark",
    position: "SYSTEMS + SPACE",
    linkedin: "#",
    bio1: "Roger spent years as a licensed architect designing legacy homes and wellness sanctuaries. Spaces where every detail carried intention. He learned something most people sense but never name: the right environment changes how you think, how you perform, how you live.",
    bio2: "He brings that thinking to business now. Strategy, systems, space — connected into one architecture. When things feel scattered, he's the one who lays it all out and shows you how the pieces fit.",
    bio3: "Architect by training. Systems thinker by nature. The person who sees the whole board.",
  },
  {
    id: "02",
    name: "Hattie Clark",
    position: "STORY + VOICE",
    linkedin: "#",
    bio1: "Hattie finds the truth underneath what you're building and gives it the words it deserves. She listens to the half-formed thing you're struggling to explain and hands it back clear, honest, and ready to use.",
    bio2: "Founders walk away from conversations with Hattie with two things: clarity on their message, and the name of the exact person they need to talk to next.",
    bio3: "",
  },
];

export default function TeamSection() {
  const { isDarkTheme } = useTheme();

  const textColor = isDarkTheme ? "text-[#f2f2f2]" : "text-[#f2f2f2]";
  const mutedTextColor = isDarkTheme ? "text-neutral-400" : "text-neutral-400";
  const borderColor = isDarkTheme ? "border-[#e3e6ee]" : "border-[#e3e6ee]";
  const btnBg = isDarkTheme ? "bg-[#ffc878]" : "bg-[#ffc878]";
  const btnText = isDarkTheme ? "text-[#191919]" : "text-[#191919]";
  const btnHover = isDarkTheme
    ? "hover:bg-[#ffc878]/80"
    : "hover:bg-[#ffc878]/80";
  const transition = "transition-colors duration-1000";

  return (
    <section
      id="team"
      className={`relative w-full max-w-7xl mx-auto my-10 px-4 md:px-0 ${textColor} ${transition}`}
    >
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
                <div className="relative w-full h-full min-h-0 flex items-center justify-center">
                  <motion.div
                    initial={{ y: "100%", opacity: 0 }}
                    whileInView={{ y: 0, opacity: 100 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
                    className="relative h-full w-full min-h-0 flex items-center justify-center"
                  >
                    {member.id === "01" ? (
                      <RogerProfile
                        role="img"
                        aria-label={member.name}
                        className="h-full w-full "
                        preserveAspectRatio="xMidYMid meet"
                      />
                    ) : member.id === "02" ? (
                      <HattieProfile
                        role="img"
                        aria-label={member.name}
                        className="h-full w-full "
                        preserveAspectRatio="xMidYMid meet"
                      />
                    ) : (
                      <Image
                        src={member.image!}
                        alt={member.name}
                        fill
                        className="object-cover object-top"
                      />
                    )}
                  </motion.div>
                </div>
              </div>

              {/* Right: Bio Header */}
              <div className="w-full md:w-[65%] lg:w-[70%] flex flex-col justify-between p-8 lg:p-12 relative min-h-75">
                <RectangleSketch className="absolute opacity-50 rotate-90 w-100 h-100 top-0 -left-32" />

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
              <div className="w-full  md:w-[65%] lg:w-[70%] font-satoshi text-sm text-justify md:text-xl leading-9 tracking-[0.05em] space-y-8 pr-0 lg:pr-12 opacity-90">
                <CopyReveal
                  as="div"
                  blockColor="#e5e5e5"
                  stagger={0.12}
                  textAlign="left"
                >
                  {member.bio1}
                </CopyReveal>
                <CopyReveal
                  as="div"
                  blockColor="#e5e5e5"
                  stagger={0.12}
                  textAlign="left"
                >
                  {member.bio2}
                </CopyReveal>
                {member.bio3 && (
                  <CopyReveal
                    as="div"
                    blockColor="#e5e5e5"
                    stagger={0.12}
                    textAlign="left"
                  >
                    {member.bio3}
                  </CopyReveal>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
