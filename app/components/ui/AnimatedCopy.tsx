"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import SplitType from "split-type";
import { usePreloader } from "../PreloaderContext";

interface AnimatedCopyProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  style?: React.CSSProperties;
}

export default function AnimatedCopy({
  children,
  className = "",
  as: Tag = "span",
  style,
}: AnimatedCopyProps) {
  const ref = useRef<HTMLElement>(null);
  const splitRef = useRef<SplitType | null>(null);
  const { isPreloaderComplete } = usePreloader();

  useGSAP(
    () => {
      if (!isPreloaderComplete) return;

      const el = ref.current;
      if (!el) return;

      if (!splitRef.current) {
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
      }

      const words = splitRef.current.words;
      if (!words?.length) return;

      // Never set y:0% before the tween; that was causing a flash of full text.
      // Start below the mask, then slide up (no gsap.from after a set to visible).
      gsap.set(words, { y: "100%" });
      gsap.set(el, { opacity: 1 });
      gsap.to(words, {
        y: "0%",
        duration: 0.5,
        ease: "power1.out",
        stagger: 0.1,
      });
    },
    { scope: ref, dependencies: [isPreloaderComplete] },
  );

  useEffect(() => {
    return () => {
      splitRef.current?.revert();
      splitRef.current = null;
    };
  }, []);

  return React.createElement(
    Tag,
    {
      ref,
      className,
      // Hide until first layout frame runs Split + gsap.set; avoids SSR/hydration flash of raw text.
      style: { opacity: 0, ...style },
    },
    children,
  );
}
