"use client";

import { useEffect, useRef } from "react";
import SplitType from "split-type";
import gsap from "gsap";

interface ScreenFitTextProps {
  text: string;
  className?: string;
}

export default function ScreenFitText({ text, className = "" }: ScreenFitTextProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);
  const splitRef = useRef<SplitType | null>(null);

  useEffect(() => {
    resizeText();
    splitAndAnimate();

    const handleResize = () => {
      splitRef.current?.revert();
      resizeText();
      // Re-split silently after resize (no animation replay)
      if (textRef.current) {
        splitRef.current = new SplitType(textRef.current, { types: "lines,words" });
        applyLineClip();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      splitRef.current?.revert();
    };
  }, []);

  const resizeText = () => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    const containerWidth = container.offsetWidth;
    let min = 1;
    let max = 2500;

    while (min <= max) {
      const mid = Math.floor((min + max) / 2);
      text.style.fontSize = mid + "px";
      if (text.offsetWidth <= containerWidth) {
        min = mid + 1;
      } else {
        max = mid - 1;
      }
    }

    text.style.fontSize = max + "px";
  };

  const applyLineClip = () => {
    if (!textRef.current) return;
    textRef.current.querySelectorAll<HTMLElement>(".line").forEach((line) => {
      line.style.overflow = "hidden";
      line.style.display = "block";
    });
  };

  const splitAndAnimate = () => {
    if (!textRef.current) return;

    splitRef.current = new SplitType(textRef.current, { types: "lines,words" });
    applyLineClip();

    gsap.from(splitRef.current.words, {
      y: "100%",
      duration: 0.5,
      ease: "power1.out",
      stagger: 0.1,
    });
  };

  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      <span
        ref={textRef}
        className={`whitespace-nowrap leading-none ${className}`}
      >
        {text}
      </span>
    </div>
  );
}
