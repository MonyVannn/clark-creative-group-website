"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const SPRING_OPTIONS = {
  mass: 1.5,
  stiffness: 500,
  damping: 100,
};

interface NeuFollowButtonProps {
  label?: string;
  variant?: "light" | "dark";
}

export default function NeuFollowButton({
  label = "GET IN TOUCH",
  variant = "light",
}: NeuFollowButtonProps) {
  const ref = useRef<HTMLButtonElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, SPRING_OPTIONS);
  const ySpring = useSpring(y, SPRING_OPTIONS);

  const transform = useMotionTemplate`translateX(${xSpring}px) translateY(${ySpring}px)`;

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { height, width } = ref.current.getBoundingClientRect();
    const { offsetX, offsetY } = e.nativeEvent;
    const xPct = offsetX / width;
    const yPct = 1 - offsetY / height;
    x.set(12 + xPct * 12);
    y.set(-(12 + yPct * 12));
  };

  const handleReset = () => {
    x.set(0);
    y.set(0);
  };

  const isDark = variant === "dark";

  return (
    <div
      className={`h-14 w-2/3 ${isDark ? "bg-[#FFC878]/10" : "bg-[#1E1F1C]/90"}`}
    >
      <motion.button
        ref={ref}
        style={{ transform }}
        onMouseMove={handleMove}
        onMouseLeave={handleReset}
        onMouseDown={handleReset}
        className={`group flex h-full w-full items-center cursor-pointer justify-between border-2 px-3 sm:px-6 font-mono text-[clamp(0.6rem,1vw,1.25rem)] font-semibold uppercase tracking-widest transition-colors duration-300 ${
          isDark
            ? "border-[#2D3748] bg-[#050B18] text-[#F5F5F5]"
            : "border-[#1E1F1C]/80 bg-[#FEFAE0] text-[#1E1F1C]/80"
        }`}
      >
        <Copy>{label}</Copy>
        <Arrow isDark={isDark} />
      </motion.button>
    </div>
  );
}

function Copy({ children }: { children: string }) {
  return (
    <span className="relative overflow-hidden">
      <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
        {children}
      </span>
      <span className="absolute left-0 top-0 block translate-y-full transition-transform duration-300 group-hover:translate-y-0">
        {children}
      </span>
    </span>
  );
}

function Arrow({ isDark }: { isDark: boolean }) {
  return (
    <div className="pointer-events-none flex h-5 w-5 overflow-hidden text-xl">
      <FiArrowRight
        className={`shrink-0 -translate-x-full transition-transform duration-300 group-hover:translate-x-0 ${
          isDark ? "text-[#FFC878]" : "text-[#D2A161]"
        }`}
      />
      <FiArrowRight className="shrink-0 -translate-x-full transition-transform duration-300 group-hover:translate-x-0" />
    </div>
  );
}
