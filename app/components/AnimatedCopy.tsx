"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";
import SplitType from "split-type";

interface AnimatedCopyProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export default function AnimatedCopy({
  children,
  className = "",
  as: Tag = "span",
}: AnimatedCopyProps) {
  const ref = useRef<HTMLElement>(null);
  const splitRef = useRef<SplitType | null>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      splitRef.current = new SplitType(el, {
        types: "lines,words,chars",
        tagName: "span",
      });

      // Prevent character shifting when split (per SplitType docs)
      el.style.fontKerning = "none";

      // Overflow hidden on lines so word slide-up is clipped
      el.querySelectorAll<HTMLElement>(".line").forEach((line) => {
        line.style.overflow = "hidden";
        line.style.display = "block";
      });

      gsap.from(splitRef.current.words, {
        y: "100%",
        opacity: 1,
        duration: 0.5,
        ease: "power1.out",
        stagger: 0.1,
      });

      return () => {
        splitRef.current?.revert();
      };
    },
    { scope: ref },
  );

  return React.createElement(Tag, { ref, className }, children);
}
