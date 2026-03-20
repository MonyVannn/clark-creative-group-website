"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Image from "next/image";

const BORDER_SIZE = 2;
const CORNER_CLIP = 50;
const CORNER_LINE_LEN = Math.sqrt(
  CORNER_CLIP * CORNER_CLIP + CORNER_CLIP * CORNER_CLIP,
);

const ROTATE_DEG = 2.5;
const STAGGER = 15;
const CENTER_STAGGER = -65;
const SPREAD_DIVISOR = 1.2;

export type StaggerTestimonialItem = {
  testimonial: string;
  by: string;
  imgSrc: string;
};

type TestimonialType = StaggerTestimonialItem & {
  tempId: number;
};

interface StaggerTestimonialsProps {
  items: StaggerTestimonialItem[];
}

export const StaggerTestimonials = ({ items }: StaggerTestimonialsProps) => {
  const [cardSize, setCardSize] = useState(400);
  const [cardHeight, setCardHeight] = useState(400);
  const containerRef = useRef<HTMLDivElement>(null);

  const [testimonials, setTestimonials] = useState<TestimonialType[]>(
    items.map((item) => ({ ...item, tempId: Math.random() })),
  );

  const handleMove = (position: number) => {
    const copy = [...testimonials];

    if (position > 0) {
      for (let i = position; i > 0; i--) {
        const firstEl = copy.shift();
        if (!firstEl) return;
        copy.push({ ...firstEl, tempId: Math.random() });
      }
    } else {
      for (let i = position; i < 0; i++) {
        const lastEl = copy.pop();
        if (!lastEl) return;
        copy.unshift({ ...lastEl, tempId: Math.random() });
      }
    }

    setTestimonials(copy);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleResize = () => {
      const width = container.offsetWidth;
      const newSize = Math.round(Math.min(Math.max(width * 0.28, 300), 560));
      setCardSize(newSize);
      if (width < 768) {
        setCardHeight(newSize * 1.6);
      } else if (width < 1024) {
        setCardHeight(newSize * 1.75);
      } else {
        setCardHeight(newSize);
      }
    };

    handleResize();
    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-screen max-w-[100vw] min-h-[850px] overflow-hidden transition-colors duration-1000 left-1/2 -translate-x-1/2`}
    >
      {testimonials.map((t, idx) => {
        let position = 0;

        // Position 0 is the center card. The snippet formula handles odd-length array matching the middle.
        // With 3 items, idx 0 -> position -1
        // idx 1 -> position 0
        // idx 2 -> position 1
        if (testimonials.length % 2) {
          position = idx - (testimonials.length - 1) / 2;
        } else {
          position = idx - testimonials.length / 2;
        }

        return (
          <TestimonialCard
            key={t.tempId}
            testimonial={t}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
            cardHeight={cardHeight}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-8 z-20">
        <button
          onClick={() => handleMove(-1)}
          className="cursor-pointer grid h-14 w-14 place-content-center text-3xl transition-colors border border-gray-600 text-gray-300 hover:bg-[#ffc878] hover:text-black rounded-full"
        >
          <FiArrowLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className="cursor-pointer grid h-14 w-14 place-content-center text-3xl transition-colors border border-gray-600 text-gray-300 hover:bg-[#ffc878] hover:text-black rounded-full"
        >
          <FiArrowRight />
        </button>
      </div>
    </div>
  );
};

interface TestimonialCardProps {
  position: number;
  testimonial: TestimonialType;
  handleMove: (position: number) => void;
  cardSize: number;
  cardHeight: number;
}

const TestimonialCard = ({
  position,
  testimonial,
  handleMove,
  cardSize,
  cardHeight,
}: TestimonialCardProps) => {
  const isActive = position === 0;

  const activeBg = "bg-[#ffc878]";
  const activeText = "text-black";
  const inactiveBg = "bg-[#040b22]";
  const inactiveText = "text-gray-300";

  const borderColor = isActive ? "#ffffff" : "#374151";
  const shadowColor = "rgba(255,255,255,0.15)";

  return (
    <motion.div
      initial={false}
      onClick={() => handleMove(position)}
      className={`
      absolute left-1/2 top-1/2 cursor-pointer p-8 transition-colors duration-500 flex flex-col justify-between
      ${isActive ? `z-10 ${activeBg}` : `z-0 ${inactiveBg}`}
      `}
      style={{
        borderWidth: BORDER_SIZE,
        borderColor: borderColor,
        clipPath: `polygon(${CORNER_CLIP}px 0%, calc(100% - ${CORNER_CLIP}px) 0%, 100% ${CORNER_CLIP}px, 100% 100%, calc(100% - ${CORNER_CLIP}px) 100%, ${CORNER_CLIP}px 100%, 0 100%, 0 0)`,
      }}
      animate={{
        width: cardSize,
        height: cardHeight, // Taller than wide to fit longer quotes
        x: `calc(-50% + ${position * (cardSize / SPREAD_DIVISOR)}px)`,
        y: `calc(-50% + ${
          isActive ? CENTER_STAGGER : position % 2 ? STAGGER : -STAGGER
        }px)`,
        rotate: isActive ? 0 : position % 2 ? ROTATE_DEG : -ROTATE_DEG,
        boxShadow: isActive
          ? `0px 8px 0px 4px ${shadowColor}`
          : "0px 0px 0px 0px transparent",
      }}
      transition={{
        type: "spring",
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
    >
      <span
        className={`absolute block origin-top-right rotate-45 object-cover ${
          isActive ? "bg-[#ffffff]" : "bg-[#374151]"
        }`}
        style={{
          right: -BORDER_SIZE,
          top: CORNER_CLIP - BORDER_SIZE,
          width: CORNER_LINE_LEN,
          height: BORDER_SIZE,
        }}
      />

      <div>
        <div className="mb-6 relative h-16 w-16">
          <Image
            src={testimonial.imgSrc}
            alt={`Avatar of ${testimonial.by}`}
            fill
            sizes="64px"
            className="object-cover "
          />
        </div>
        <h3
          className={`font-satoshi text-base sm:text-lg lg:text-2xl font-medium leading-relaxed ${
            isActive ? activeText : inactiveText
          }`}
        >
          "{testimonial.testimonial}"
        </h3>
      </div>
      <p
        className={`mt-6 text-base italic font-bold ${
          isActive ? "text-gray-900" : "text-gray-500"
        }`}
      >
        — {testimonial.by}
      </p>
    </motion.div>
  );
};
