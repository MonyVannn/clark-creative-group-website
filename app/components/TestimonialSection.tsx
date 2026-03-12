"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);
import { IconType } from "react-icons";
import { FaHardHat, FaUtensils, FaTree } from "react-icons/fa";

const testimonials = [
  {
    Icon: FaHardHat,
    description:
      "A fence contractor with genuine drive. We built the digital systems and growth strategy that helped transition the operation from a solo endeavor to a multi-million dollar business. It’s the same founder at the helm, just with a much bigger engine driving the results.",
    name: "Midwest Fence",
    title: "Founder, Midwest Fence",
  },
  {
    Icon: FaUtensils,
    description:
      "A food company with a mission that deserved a significantly larger stage. We shaped the brand narrative and built the internal systems necessary to support it. This foundation cleared the way for nine state pilots, valued at $20M each.",
    name: "CoPow Foods",
    title: "Founder, CoPow Foods",
  },
  {
    Icon: FaTree,
    description:
      "A regenerative farm and retreat campus built from vision and raw land. We crafted the specific investment narrative that successfully brought $30M in partners to the table to fund the project.",
    name: "Sable Farms",
    title: "Founder, Sable Farms",
  },
];

interface Testimonial {
  Icon: IconType;
  title: string;
  name: string;
  description: string;
}

function SelectBtns({
  numTracks,
  setSelected,
  selected,
  isDarkTheme,
}: {
  numTracks: number;
  setSelected: Dispatch<SetStateAction<number>>;
  selected: number;
  isDarkTheme: boolean;
}) {
  return (
    <div className="flex gap-1 mt-8">
      {Array.from(Array(numTracks).keys()).map((n) => {
        return (
          <button
            key={n}
            onClick={() => setSelected(n)}
            className={`h-1.5 w-full relative transition-colors duration-1400 ${
              isDarkTheme ? "bg-white/20" : "bg-black/20"
            }`}
          >
            {selected === n ? (
              <motion.span
                className={`absolute top-0 left-0 bottom-0 transition-colors duration-1400 ${
                  isDarkTheme ? "bg-white" : "bg-black"
                }`}
                initial={{
                  width: "0%",
                }}
                animate={{
                  width: "100%",
                }}
                transition={{
                  duration: 5,
                }}
                onAnimationComplete={() => {
                  setSelected(selected === numTracks - 1 ? 0 : selected + 1);
                }}
              />
            ) : (
              <span
                className={`absolute top-0 left-0 bottom-0 transition-colors duration-1400 ${
                  isDarkTheme ? "bg-white" : "bg-black"
                }`}
                style={{
                  width: selected > n ? "100%" : "0%",
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

function Card({
  Icon,
  description,
  name,
  title,
  position,
  selected,
  setSelected,
  isDarkTheme,
}: Testimonial & {
  position: number;
  selected: number;
  setSelected: Dispatch<SetStateAction<number>>;
  isDarkTheme: boolean;
}) {
  const scale = position <= selected ? 1 : 1 + 0.015 * (position - selected);
  const offset = position <= selected ? 0 : 95 + (position - selected) * 3;
  const background = isDarkTheme
    ? position % 2
      ? "#2a2a2a"
      : "#f2f2f2"
    : "#f2f2f2";
  const color = isDarkTheme ? (position % 2 ? "white" : "#191919") : "#191919";

  return (
    <motion.div
      initial={false}
      style={{
        zIndex: position,
        transformOrigin: "left bottom",
        background,
        color,
        transition: "background 1.4s, color 1.4s",
      }}
      animate={{
        x: `${offset}%`,
        scale,
      }}
      whileHover={{
        translateX: position === selected ? 0 : -3,
      }}
      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}
      onClick={() => setSelected(position)}
      className="absolute top-0 left-0 w-full min-h-full p-8 lg:p-12 cursor-pointer flex flex-col justify-between"
    >
      <Icon className="text-7xl mx-auto" />
      <p className="font-satoshi text-lg lg:text-xl font-light italic my-8">
        &quot;{description}&quot;
      </p>
      <div>
        <span className="block font-clash-display font-semibold text-lg">
          {name}
        </span>
        <span className="block font-satoshi text-sm">{title}</span>
      </div>
    </motion.div>
  );
}

function Cards({
  testimonials: items,
  selected,
  setSelected,
  isDarkTheme,
}: {
  testimonials: Testimonial[];
  selected: number;
  setSelected: Dispatch<SetStateAction<number>>;
  isDarkTheme: boolean;
}) {
  return (
    <div className="p-4 relative h-[450px] lg:h-[500px] shadow-xl">
      {items.map((t, i) => (
        <Card
          {...t}
          key={i}
          position={i}
          selected={selected}
          setSelected={setSelected}
          isDarkTheme={isDarkTheme}
        />
      ))}
    </div>
  );
}

export default function TestimonialSection() {
  const [selected, setSelected] = useState(0);
  const { isDarkTheme, setIsDarkTheme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const setIsDarkThemeRef = useRef(setIsDarkTheme);

  useEffect(() => {
    setIsDarkThemeRef.current = setIsDarkTheme;
  });

  useGSAP(
    () => {
      const elem = sectionRef.current;
      const mainEl = elem?.closest("main");
      if (!elem || !mainEl) return;

      const color = elem.getAttribute("data-color") ?? "#191919";
      const defaultColor = "#f2f2f2";

      const st = ScrollTrigger.create({
        trigger: elem,
        start: "top 20%",
        markers: false,
        onEnter: () => {
          gsap.to(mainEl, { backgroundColor: color, duration: 1 });
          setIsDarkThemeRef.current(true);
        },
        onLeave: () => {
          gsap.to(mainEl, { backgroundColor: defaultColor, duration: 1 });
          setIsDarkThemeRef.current(false);
        },
        onLeaveBack: () => {
          gsap.to(mainEl, { backgroundColor: defaultColor, duration: 1 });
          setIsDarkThemeRef.current(false);
        },
        onEnterBack: () => {
          gsap.to(mainEl, { backgroundColor: color, duration: 1 });
          setIsDarkThemeRef.current(true);
        },
      });

      return () => st.kill();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      data-color="#191919"
      className=" py-24 px-4 lg:px-8 grid items-center grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 overflow-hidden"
    >
      <div className="p-10">
        <h3
          className={`font-clash-display text-5xl font-semibold transition-colors duration-1400 ${
            isDarkTheme ? "text-white" : "text-[#191919]"
          }`}
        >
          Case Studies
        </h3>
        <p
          className={`font-satoshi my-4 transition-colors duration-1400 ${
            isDarkTheme ? "text-neutral-400" : "text-neutral-600"
          }`}
        >
          Founders who build the next generation aren&apos;t hiring five vendors
          and hoping the pieces fit. They work with partners who see the whole
          picture.
        </p>
        <SelectBtns
          numTracks={testimonials.length}
          setSelected={setSelected}
          selected={selected}
          isDarkTheme={isDarkTheme}
        />
      </div>
      <Cards
        testimonials={testimonials}
        setSelected={setSelected}
        selected={selected}
        isDarkTheme={isDarkTheme}
      />
    </section>
  );
}
