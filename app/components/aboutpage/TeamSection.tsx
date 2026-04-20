"use client";

import { theme } from "@/app/lib/theme";
import Image from "next/image";
import { motion } from "framer-motion";
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
    position: "Award winning designer with a systems mind",
    linkedin: "https://www.linkedin.com/in/roger-clark-30a2a0b0/",
    bio1: "Roger is grounded, resourceful, systematic.",
    bio2: "With past experience designing legacy residential compounds and wellness sanctuaries, Roger favors design that responds to its context and where every decision serves the whole.",
    bio3: "A business needs to respond to its founder the same way. At CCG, he brings a design lens to the entire business to weave story, space, and system into one thread.",
  },
  {
    id: "02",
    name: "Hattie Clark",
    position: "Story + Voice + Connection",
    linkedin: "https://www.linkedin.com/in/hattie-clark-5a8161105/",
    bio1: "She asks the questions most people don't, listens to the half-formed version of what you're trying to say, and hands it back in a way that actually lands. Clear. Honest. Usable.",
    bio2: "Founders usually walk away from conversations with her with two things: clarity on their message, and a clearer sense of what to do next. She reflects the story back to you clearly and helps shape where it goes next. As a natural connector, she often knows exactly who or what could strengthen what you're building.",
    bio3: "If you're interested in having Hattie host you on a podcast or lead an in-person brand experience, you can note that in the contact form.",
  },
];

export default function TeamSection() {
  const textColor = "text-foreground";
  const mutedTextColor = "text-muted-foreground";
  const borderColor = "border-border-light";
  const btnBg = "bg-accent";
  const btnText = "text-accent-foreground";
  const btnHover = "hover:bg-accent/80";
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
                  className={`transition-colors duration-1000 stroke-foreground`}
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
                  blockColor={theme.copyRevealBlock}
                  stagger={0.12}
                  textAlign="left"
                >
                  {member.bio1}
                </CopyReveal>
                <CopyReveal
                  as="div"
                  blockColor={theme.copyRevealBlock}
                  stagger={0.12}
                  textAlign="left"
                >
                  {member.bio2}
                </CopyReveal>
                {member.bio3 && (
                  <CopyReveal
                    as="div"
                    blockColor={theme.copyRevealBlock}
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
