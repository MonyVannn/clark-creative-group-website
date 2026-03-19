"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Image from "next/image";
import { useTheme } from "../contexts/ThemeContext";
import SplitText from "../ui/SplitText";

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
  const { isDarkTheme } = useTheme();

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
      // ref={sectionRef}
      data-color="#f2f2f2"
      className="w-full py-24 lg:py-80 px-6 lg:px-24 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24"
    >
      {/* Left Column */}
      <div className="w-full lg:w-5/12 flex flex-col justify-between min-h-[320px] lg:min-h-[400px] shrink-0">
        <div>
          <SplitText
            text="From our "
            tag="h2"
            splitType="words, chars"
            className={`font-clash-display font-semibold text-5xl lg:text-7xl leading-tight transition-colors duration-1000 ${isDarkTheme ? "text-white" : "text-[#0a191f]"}`}
            textAlign="left"
            delay={20}
          />
          <br />
          <SplitText
            text="community."
            tag="h2"
            splitType="words, chars"
            className={`font-clash-display font-semibold text-5xl lg:text-7xl leading-tight transition-colors duration-1000 ${isDarkTheme ? "text-white" : "text-[#0a191f]"}`}
            textAlign="left"
            delay={25}
          />
          <div className="mt-6 lg:mt-8">
            <SplitText
              text="Here's what other subscribers had to say about Clark Creative Group."
              tag="p"
              splitType="words"
              className={`font-satoshi text-lg lg:text-xl max-w-sm font-light transition-colors duration-1000 ${isDarkTheme ? "text-gray-400" : "text-gray-700"}`}
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
                : "border-[#0a191f]/20 hover:bg-[#0a191f]/10 text-[#0a191f]"
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
                : "border-[#0a191f]/20 hover:bg-[#0a191f]/10 text-[#0a191f]"
            }`}
            aria-label="Next Testimonial"
          >
            <FiArrowRight className="text-2xl" />
          </button>
        </motion.div>
      </div>

      {/* Right Column - fixed height so section doesn't jump when changing testimonials */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full lg:w-7/12 relative h-[420px] lg:h-[460px] xl:h-[500px] flex flex-col shrink-0 overflow-hidden"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6, type: "spring" }}
          className={`text-8xl lg:text-9xl font-serif absolute top-0 md:-top-8 lg:-top-16 left-0 leading-none transition-colors duration-1000 ${isDarkTheme ? "text-white/30" : "text-[#0a191f]/20"}`}
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
            className="pt-12 h-full flex flex-col"
          >
            <p
              className={`font-satoshi text-2xl lg:text-4xl leading-normal lg:leading-relaxed font-normal tracking-wide transition-colors duration-1000 ${isDarkTheme ? "text-white" : "text-[#0a191f]"}`}
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
                  className={`font-satoshi font-bold text-lg transition-colors duration-1000 ${isDarkTheme ? "text-white" : "text-[#0a191f]"}`}
                >
                  {testimonials[currentIndex].name}
                </span>
                <span
                  className={`font-satoshi text-sm mt-0.5 transition-colors duration-1000 ${isDarkTheme ? "text-gray-400" : "text-gray-700"}`}
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
