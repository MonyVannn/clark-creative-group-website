"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Image from "next/image";
import { theme } from "@/app/lib/theme";

const BORDER_SIZE = 2;
const CORNER_CLIP = 50;
const CORNER_LINE_LEN = Math.sqrt(
  CORNER_CLIP * CORNER_CLIP + CORNER_CLIP * CORNER_CLIP,
);

const ROTATE_DEG = 2.5;
const STAGGER = 15;
const CENTER_STAGGER = -65;
const SPREAD_DIVISOR = 1.2;
const MAX_VISIBLE_OFFSET = 1;

export type StaggerTestimonialItem = {
  testimonial: string;
  name: string;
  title: string;
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
      const vh = window.innerHeight;
      const newSize = Math.round(Math.min(Math.max(width * 0.28, 300), 560));
      setCardSize(newSize);
      if (width < 768) {
        setCardHeight(newSize * 1.52);
      } else if (width < 1024) {
        setCardHeight(newSize * 1.62);
      } else {
        let hMult = width < 1536 ? 1.22 : 1.08;
        if (width / vh > 1.5) {
          hMult += 0.05;
        }
        setCardHeight(Math.round(newSize * Math.min(hMult, 1.38)));
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
      className={`relative w-screen max-w-[100vw] min-h-[880px] overflow-hidden transition-colors duration-1000 left-1/2 -translate-x-1/2`}
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
          className="cursor-pointer grid h-14 w-14 place-content-center text-3xl transition-colors border border-muted-foreground/35 text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-full"
        >
          <FiArrowLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className="cursor-pointer grid h-14 w-14 place-content-center text-3xl transition-colors border border-muted-foreground/35 text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-full"
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
  const isVisible = Math.abs(position) <= MAX_VISIBLE_OFFSET;
  const handleQuoteWheel = (e: React.WheelEvent<HTMLHeadingElement>) => {
    if (!isActive) return;

    const el = e.currentTarget;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const canScroll = scrollHeight > clientHeight;

    if (!canScroll) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    const isScrollingDown = e.deltaY > 0;
    const atTop = scrollTop <= 0;
    const atBottom = scrollTop + clientHeight >= scrollHeight - 1;

    // Keep wheel events trapped inside the quote while it can scroll.
    if ((isScrollingDown && !atBottom) || (!isScrollingDown && !atTop)) {
      e.stopPropagation();
      return;
    }

    // Prevent wheel from bubbling to page scroll when quote hits boundaries.
    e.preventDefault();
    e.stopPropagation();
  };

  const activeBg = "bg-accent";
  const activeText = "text-accent-foreground";
  const inactiveBg = "bg-background";
  const inactiveText = "text-muted-foreground";

  const borderColor = isActive ? theme.foreground : theme.cardBorderMuted;
  const shadowColor = "rgba(255,255,255,0.15)";

  return (
    <motion.div
      initial={false}
      onClick={() => handleMove(position)}
      className={`
      absolute left-1/2 top-1/2 cursor-pointer p-8 transition-colors duration-500 flex flex-col justify-between overflow-hidden
      ${isActive ? `z-10 ${activeBg}` : `z-0 ${inactiveBg}`}
      ${isVisible ? "pointer-events-auto" : "pointer-events-none"}
      `}
      style={{
        borderWidth: BORDER_SIZE,
        borderColor: borderColor,
        clipPath: `polygon(${CORNER_CLIP}px 0%, calc(100% - ${CORNER_CLIP}px) 0%, 100% ${CORNER_CLIP}px, 100% 100%, calc(100% - ${CORNER_CLIP}px) 100%, ${CORNER_CLIP}px 100%, 0 100%, 0 0)`,
      }}
      animate={{
        width: cardSize,
        height: cardHeight, // Taller than wide to fit longer quotes
        x: isVisible
          ? `calc(-50% + ${position * (cardSize / SPREAD_DIVISOR)}px)`
          : `calc(-50% + ${Math.sign(position || 1) * cardSize * 1.8}px)`,
        y: isVisible
          ? `calc(-50% + ${
              isActive ? CENTER_STAGGER : position % 2 ? STAGGER : -STAGGER
            }px)`
          : "calc(-50% + 0px)",
        rotate: isVisible ? (isActive ? 0 : position % 2 ? ROTATE_DEG : -ROTATE_DEG) : 0,
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.92,
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
          isActive ? "bg-foreground" : "bg-card-border-muted"
        }`}
        style={{
          right: -BORDER_SIZE,
          top: CORNER_CLIP - BORDER_SIZE,
          width: CORNER_LINE_LEN,
          height: BORDER_SIZE,
        }}
      />

      <div className="flex min-h-0 flex-1 flex-col">
        <div className="mb-6 flex items-center gap-4">
          <div className="relative h-16 w-16 shrink-0">
            <Image
              src={testimonial.imgSrc}
              alt={`Avatar of ${testimonial.by}`}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
          <div>
            <h2
              className={`font-clash-display text-lg font-semibold ${
                isActive ? "text-accent-foreground" : "text-foreground"
              }`}
            >
              {testimonial.name}
            </h2>
            <p
              className={`font-satoshi text-xs uppercase tracking-wider ${
                isActive ? "text-accent-foreground/85" : "text-muted-foreground"
              }`}
            >
              {testimonial.title}
            </p>
          </div>
        </div>
        <div className="relative min-h-0 flex-1">
          <h3
            className={`h-full whitespace-pre-line font-satoshi text-base sm:text-lg lg:text-lg font-medium leading-relaxed ${
              isActive
                ? `${activeText} no-scrollbar overscroll-contain overflow-y-auto pr-2`
                : `${inactiveText} overflow-hidden`
            }`}
            onWheelCapture={handleQuoteWheel}
            onTouchMoveCapture={(e) => {
              if (!isActive) return;
              e.stopPropagation();
            }}
          >
            "{testimonial.testimonial}"
          </h3>
          {!isActive && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-background to-transparent" />
          )}
        </div>
      </div>
      <p
        className={`mt-4 shrink-0 text-base italic font-bold ${
          isActive ? "text-accent-foreground" : "text-muted-foreground"
        }`}
      >
        {testimonial.by}
      </p>
    </motion.div>
  );
};
