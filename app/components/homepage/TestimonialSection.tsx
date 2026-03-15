"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Image from "next/image";
import { useTheme } from "../contexts/ThemeContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "../ui/SplitText";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "A fence contractor with genuine drive. We built the digital systems and growth strategy that helped transition the operation from a solo endeavor to a multi-million dollar business. It's the same founder at the helm, just with a much bigger engine driving the results.",
    name: "Midwest Fence",
    title: "Founder, Midwest Fence",
    avatar: "/square.png",
  },
  {
    quote:
      "A food company with a mission that deserved a significantly larger stage. We shaped the brand narrative and built the internal systems necessary to support it. This foundation cleared the way for nine state pilots, valued at $20M each.",
    name: "CoPow Foods",
    title: "Founder, CoPow Foods",
    avatar: "/square.png",
  },
  {
    quote:
      "A regenerative farm and retreat campus built from vision and raw land. We crafted the specific investment narrative that successfully brought $30M in partners to the table to fund the project.",
    name: "Sable Farms",
    title: "Founder, Sable Farms",
    avatar: "/square.png",
  },
];

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
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
        start: "top center",
        markers: false,
        onEnter: () => {
          gsap.to(mainEl, { backgroundColor: color, duration: 1 });
          setIsDarkThemeRef.current(true);
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

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <section
      ref={sectionRef}
      data-color="#191919"
      className="w-full py-24 lg:py-80 px-8 lg:px-24 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24 overflow-hidden"
    >
      {/* Left Column */}
      <div className="w-full lg:w-5/12 flex flex-col justify-between h-full min-h-75 lg:min-h-100">
        <div>
          <SplitText
            text="From our "
            tag="h2"
            splitType="words, chars"
            className={`font-clash-display font-semibold text-5xl lg:text-7xl leading-tight transition-colors duration-1000 ${isDarkTheme ? "text-[#f2f2f2]" : "text-[#191919]"}`}
            textAlign="left"
            delay={20}
          />
          <br />
          <SplitText
            text="community."
            tag="h2"
            splitType="words, chars"
            className={`font-clash-display font-semibold text-5xl lg:text-7xl leading-tight transition-colors duration-1000 ${isDarkTheme ? "text-[#f2f2f2]" : "text-[#191919]"}`}
            textAlign="left"
            delay={25}
          />
          <div className="mt-6 lg:mt-8">
            <SplitText
              text="Here's what other subscribers had to say about Clark Creative Group."
              tag="p"
              splitType="words"
              className={`font-satoshi text-lg lg:text-xl max-w-sm font-light transition-colors duration-1000 ${isDarkTheme ? "text-neutral-400" : "text-neutral-600"}`}
              textAlign="left"
              delay={40}
            />
          </div>
        </div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex gap-4 mt-12 lg:mt-auto"
        >
          <button
            onClick={prevTestimonial}
            className={`cursor-pointer w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-300 ${
              isDarkTheme
                ? "border-white/20 hover:bg-white/10 text-white"
                : "border-neutral-300 hover:bg-neutral-200 text-[#191919]"
            }`}
            aria-label="Previous Testimonial"
          >
            <FiArrowLeft className="text-2xl" />
          </button>
          <button
            onClick={nextTestimonial}
            className={`cursor-pointer w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-300 ${
              isDarkTheme
                ? "border-white/20 hover:bg-white/10 text-white"
                : "border-neutral-300 hover:bg-neutral-200 text-[#191919]"
            }`}
            aria-label="Next Testimonial"
          >
            <FiArrowRight className="text-2xl" />
          </button>
        </motion.div>
      </div>

      {/* Right Column */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full lg:w-7/12 relative min-h-87.5 lg:min-h-100 flex flex-col justify-center"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6, type: "spring" }}
          className={`text-8xl lg:text-9xl font-serif absolute -top-8 lg:-top-16 left-0 leading-none transition-colors duration-1000 ${isDarkTheme ? "text-[#f2f2f2]/30" : "text-[#191919]/20"}`}
        >
          &ldquo;
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="pt-12"
          >
            <p
              className={`font-satoshi text-2xl lg:text-4xl leading-normal lg:leading-relaxed font-normal tracking-wide transition-colors duration-1000 ${isDarkTheme ? "text-white" : "text-[#191919]"}`}
            >
              {testimonials[currentIndex].quote}
            </p>

            <div className="flex items-center gap-4 mt-10">
              <div className="w-14 h-14 rounded-full overflow-hidden relative">
                <Image
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span
                  className={`font-satoshi font-bold text-lg transition-colors duration-1000 ${isDarkTheme ? "text-white" : "text-[#191919]"}`}
                >
                  {testimonials[currentIndex].name}
                </span>
                <span
                  className={`font-satoshi text-sm mt-0.5 transition-colors duration-1000 ${isDarkTheme ? "text-neutral-400" : "text-neutral-500"}`}
                >
                  {testimonials[currentIndex].title}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
