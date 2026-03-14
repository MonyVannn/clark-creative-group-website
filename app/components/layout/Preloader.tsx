"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useCallback, useEffect, useRef } from "react";

gsap.registerPlugin(SplitText);

const COPY_1 =
  "Creative solutions shaped by strategy, bridging the gap between founder vision and structured clarity.";
const COPY_2 =
  "Systems thoughtfully built with purpose, expertly designed to guide you from vision to measurable reality.";

function animateCounter(
  element: HTMLElement | null,
  duration = 5,
  delay = 0,
): void {
  if (!element) return;
  let currentValue = 0;
  const updateInterval = 200;
  const maxDuration = duration * 1000;
  const startTime = Date.now();

  setTimeout(() => {
    const updateCounter = () => {
      const elapsedTime = Date.now() - startTime;
      const progress = elapsedTime / maxDuration;

      if (currentValue < 100 && elapsedTime < maxDuration) {
        const target = Math.floor(progress * 100);
        const jump = Math.floor(Math.random() * 25) + 5;
        currentValue = Math.min(currentValue + jump, target, 100);

        element.textContent = currentValue.toString().padStart(2, "0");
        setTimeout(updateCounter, updateInterval + Math.random() * 100);
      } else {
        element.textContent = "100";
      }
    };

    updateCounter();
  }, delay * 1000);
}

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const revealerRef = useRef<HTMLDivElement>(null);
  const copy1Ref = useRef<HTMLParagraphElement>(null);
  const copy2Ref = useRef<HTMLParagraphElement>(null);
  const counterRef = useRef<HTMLParagraphElement>(null);
  const splitRefs = useRef<{ revert: () => void }[]>([]);

  const runAnimation = useCallback(() => {
    const preloader = preloaderRef.current;
    const revealer = revealerRef.current;
    const copy1 = copy1Ref.current;
    const copy2 = copy2Ref.current;
    const counter = counterRef.current;

    if (!preloader || !revealer || !copy1 || !copy2 || !counter) return;

    const pageTargets = document.querySelectorAll<HTMLElement>(
      "[data-preloader-target]",
    );

    gsap.set(pageTargets, { y: "35svh", autoAlpha: 0 });

    const split1 = SplitText.create(copy1, {
      type: "lines",
      mask: "lines",
      linesClass: "line",
    });
    const split2 = SplitText.create(copy2, {
      type: "lines",
      mask: "lines",
      linesClass: "line",
    });
    const splitCounter = SplitText.create(counter, {
      type: "lines",
      mask: "lines",
      linesClass: "line",
    });
    splitRefs.current = [split1, split2, splitCounter];

    gsap.set([copy1, copy2, counter], { visibility: "visible" });

    animateCounter(counter, 4.5, 2);

    const tl = gsap.timeline({
      onComplete: () => {
        splitRefs.current.forEach((s) => s.revert());
        preloader.style.pointerEvents = "none";
        onComplete();
      },
    });

    tl.to([...split1.lines, ...split2.lines, ...splitCounter.lines], {
      y: "0%",
      duration: 1,
      stagger: 0.075,
      ease: "power3.out",
      delay: 1,
    })
      .to(
        revealer,
        {
          scale: 0.1,
          duration: 0.75,
          ease: "power2.out",
        },
        "<",
      )
      .to(revealer, {
        scale: 0.25,
        duration: 1,
        ease: "power3.out",
      })
      .to(revealer, {
        scale: 0.5,
        duration: 0.75,
        ease: "power3.out",
      })
      .to(revealer, {
        scale: 0.75,
        duration: 0.5,
        ease: "power2.out",
      })
      .to(revealer, {
        scale: 1,
        duration: 1,
        ease: "power3.out",
      })
      .to(
        preloader,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1.25,
          ease: "power3.out",
        },
        "-=1",
      )
      .to(
        pageTargets,
        {
          y: "0%",
          autoAlpha: 1,
          duration: 1.25,
          ease: "power3.out",
        },
        "<",
      );
  }, [onComplete]);

  useGSAP(
    () => {
      runAnimation();
    },
    { scope: preloaderRef, dependencies: [] },
  );

  useEffect(() => {
    return () => {
      splitRefs.current.forEach((s) => s.revert());
    };
  }, []);

  return (
    <div
      ref={preloaderRef}
      className="preloader fixed inset-0 z-[100] flex items-center overflow-hidden bg-[#191919] p-8"
      style={{
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      }}
    >
      <div
        ref={revealerRef}
        className="preloader-revealer absolute left-1/2 top-1/2 z-[2] aspect-square -translate-x-1/2 -translate-y-1/2 scale-0 bg-[#f2f2f2]"
      />

      <div className="preloader-copy flex flex-1 flex-col gap-0 md:flex-row">
        <div className="preloader-copy-col flex flex-1 items-center md:flex-row">
          <p
            ref={copy1Ref}
            className="w-full font-mono text-[0.8rem] font-medium uppercase leading-none tracking-tight text-white md:w-3/4"
            style={{ visibility: "hidden" }}
          >
            {COPY_1}
          </p>
        </div>
        <div className="preloader-copy-col flex flex-1 items-center md:flex-row">
          <p
            ref={copy2Ref}
            className="w-full font-mono text-[0.8rem] font-medium uppercase leading-none tracking-tight text-white md:w-3/4"
            style={{ visibility: "hidden" }}
          >
            {COPY_2}
          </p>
        </div>
      </div>

      <div className="preloader-counter flex flex-1 justify-end md:items-center">
        <p
          ref={counterRef}
          className="font-mono text-[0.8rem] font-medium uppercase leading-none tracking-tight text-white"
          style={{ visibility: "hidden" }}
        >
          00
        </p>
      </div>
    </div>
  );
}
