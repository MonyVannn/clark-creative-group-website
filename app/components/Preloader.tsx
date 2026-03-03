"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { motion, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const BG = "#191919";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [displayPercent, setDisplayPercent] = useState(0);
  const [stage, setStage] = useState<"loading" | "square">("loading");
  const containerRef = useRef<HTMLDivElement>(null);
  const squareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 2.5,
      ease: "easeInOut",
      onUpdate: (v) => setDisplayPercent(Math.round(v)),
      onComplete: () => setStage("square"),
    });
    return () => controls.stop();
  }, []);

  useGSAP(
    () => {
      if (stage !== "square" || !squareRef.current || !containerRef.current)
        return;

      const square = squareRef.current;
      const container = containerRef.current;
      const vw = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0,
      );
      const vh = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight || 0,
      );
      const diagonal = Math.sqrt(vw * vw + vh * vh);
      const squareSize = 100;
      const scaleToCover = diagonal / (squareSize * Math.SQRT2) + 1;

      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });

      tl.set(square, { opacity: 1 })
        .to(square, {
          scale: scaleToCover,
          duration: 1.3,
          ease: "power2.in",
        })
        .to(container, { opacity: 0, duration: 0.4, ease: "power2.out" });
    },
    { scope: containerRef, dependencies: [stage] },
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: BG }}
      aria-hidden="true"
    >
      {stage === "loading" && (
        <motion.span
          className="font-mono text-sm font-medium text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {displayPercent}%
        </motion.span>
      )}

      <div
        ref={squareRef}
        className="absolute left-1/2 top-1/2 h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 bg-[#f2f2f2] opacity-0"
        style={{ transformOrigin: "center center" }}
      />
    </div>
  );
}
