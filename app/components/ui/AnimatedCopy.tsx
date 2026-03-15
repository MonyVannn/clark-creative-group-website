"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useContext, useEffect, useRef } from "react";
import SplitType from "split-type";
import { PreloaderContext } from "../layout/PreloaderContext";

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
  const { isReady } = useContext(PreloaderContext);

  useGSAP(
    () => {
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

      if (isReady) {
        // Reset to natural position first (previous gsap.set persists when deps change
        // because useGSAP doesn't revert by default), so gsap.from has a proper "to" value
        gsap.set(splitRef.current.words, { y: "0%" });
        gsap.from(splitRef.current.words, {
          y: "100%",
          opacity: 1,
          duration: 0.5,
          ease: "power1.out",
          stagger: 0.1,
        });
      } else {
        gsap.set(splitRef.current.words, { y: "100%" });
      }
    },
    { scope: ref, dependencies: [isReady] },
  );

  useEffect(() => {
    return () => {
      splitRef.current?.revert();
      splitRef.current = null;
    };
  }, []);

  return React.createElement(Tag, { ref, className }, children);
}
