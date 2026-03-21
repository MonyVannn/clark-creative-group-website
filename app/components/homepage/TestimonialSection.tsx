"use client";

import { motion } from "framer-motion";
import SplitText from "../ui/SplitText";
import {
  StaggerTestimonials,
  StaggerTestimonialItem,
} from "./StaggerTestimonials";

// Note: The item at the end of the array will be the initially centered/active card
const testimonialsData = [
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

const staggerItems: StaggerTestimonialItem[] = testimonialsData.map((t) => ({
  testimonial: t.quote,
  by: t.title,
  imgSrc: t.avatar,
}));

export default function TestimonialSection() {
  return (
    <section
      data-color="#f2f2f2"
      className="w-full h-full py-12 flex flex-col items-center justify-center overflow-x-hidden"
    >
      <div className="w-full px-6 lg:px-24 mx-auto flex flex-col items-center justify-center">
        <div className="flex flex-col">
          <SplitText
            text="Case Studies"
            tag="h2"
            splitType="words, chars"
            className="font-clash-display font-semibold text-5xl lg:text-6xl leading-tight transition-colors duration-1000 text-white"
            textAlign="center"
            delay={20}
          />
          <br />
          <div>
            <SplitText
              text="Here's what other subscribers had to say about Clark Creative Group."
              tag="p"
              splitType="words"
              className="font-satoshi text-lg lg:text-xl max-w-sm font-light transition-colors duration-1000 text-gray-400"
              textAlign="center"
              delay={40}
            />
          </div>
        </div>
      </div>

      {/* Full-bleed carousel block */}
      <motion.div
        className="w-full h-full"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        <StaggerTestimonials items={staggerItems} />
      </motion.div>
    </section>
  );
}
