"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface SplitTextProps {
  text: string;
  className?: string;
  as?: React.ElementType;
  triggerOnLoad?: boolean;
  initialDelay?: number;
}

export default function SplitText({
  text,
  className,
  as: Tag = "h1",
  triggerOnLoad = false,
  initialDelay = 0,
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      const chars = el.querySelectorAll<HTMLElement>(".char");

      const toProps: gsap.TweenVars = {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.04,
        ease: "power3.out",
        delay: initialDelay,
      };

      if (triggerOnLoad) {
        gsap.fromTo(chars, { opacity: 0, y: 40 }, toProps);
      } else {
        gsap.fromTo(chars, { opacity: 0, y: 40 }, {
          ...toProps,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          },
        });
      }
    },
    { scope: containerRef }
  );

  return React.createElement(
    Tag,
    { ref: containerRef, className, "aria-label": text },
    text.split("").map((char, i) =>
      React.createElement(
        "span",
        { key: i, className: "char inline-block opacity-0" },
        char === " " ? "\u00A0" : char
      )
    )
  );
}
