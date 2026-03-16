"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

interface CopyRevealProps {
  children: React.ReactNode;
  animateOnScroll?: boolean;
  delay?: number;
  blockColor?: string;
  stagger?: number;
  duration?: number;
  className?: string;
  as?: React.ElementType;
  textAlign?: "left" | "center" | "right";
}

export default function CopyReveal({
  children,
  animateOnScroll = true,
  delay = 0,
  blockColor = "#f2f2f2",
  stagger = 0.15,
  duration = 0.75,
  className = "",
  as: Tag = "div",
  textAlign = "center",
}: CopyRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const splitRef = useRef<SplitType | null>(null);
  const linesRef = useRef<HTMLElement[]>([]);
  const blocksRef = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      el.style.fontKerning = "none";

      splitRef.current = new SplitType(el, {
        types: "lines",
        tagName: "span",
      });

      linesRef.current = [];
      blocksRef.current = [];

      const lineElements = el.querySelectorAll<HTMLElement>(".line");
      const alignStyles =
        textAlign === "left"
          ? { marginLeft: "0", marginRight: "auto" }
          : textAlign === "right"
            ? { marginLeft: "auto", marginRight: "0" }
            : { marginLeft: "auto", marginRight: "auto" };

      lineElements.forEach((line) => {
        const wrapper = document.createElement("div");
        wrapper.className = "block-line-wrapper";
        Object.assign(wrapper.style, alignStyles);
        line.parentNode?.insertBefore(wrapper, line);
        wrapper.appendChild(line);

        const block = document.createElement("div");
        block.className = "block-revealer";
        block.style.backgroundColor = blockColor;
        wrapper.appendChild(block);

        linesRef.current.push(line);
        blocksRef.current.push(block);
      });

      gsap.set(linesRef.current, { opacity: 0 });
      gsap.set(blocksRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      const createBlockRevealAnimation = (
        block: HTMLDivElement,
        line: HTMLElement,
        index: number,
      ) => {
        const tl = gsap.timeline({ delay: delay + index * stagger });
        tl.to(block, {
          scaleX: 1,
          duration,
          ease: "power4.inOut",
        });
        tl.set(line, { opacity: 1 });
        tl.set(block, { transformOrigin: "right center" });
        tl.to(block, {
          scaleX: 0,
          duration,
          ease: "power4.inOut",
        });
        return tl;
      };

      if (animateOnScroll) {
        blocksRef.current.forEach((block, index) => {
          const tl = createBlockRevealAnimation(
            block,
            linesRef.current[index],
            index,
          );
          tl.pause();
          ScrollTrigger.create({
            trigger: el,
            start: "top 90%",
            once: true,
            onEnter: () => tl.play(),
          });
        });
      } else {
        blocksRef.current.forEach((block, index) => {
          createBlockRevealAnimation(block, linesRef.current[index], index);
        });
      }

      return () => {
        const wrappers = el.querySelectorAll(".block-line-wrapper");
        wrappers.forEach((wrapper) => {
          const line = wrapper.firstElementChild;
          if (line && wrapper.parentNode) {
            wrapper.parentNode.insertBefore(line, wrapper);
          }
          wrapper.remove();
        });
        splitRef.current?.revert();
      };
    },
    {
      scope: containerRef,
      dependencies: [
        animateOnScroll,
        delay,
        blockColor,
        stagger,
        duration,
        textAlign,
      ],
    },
  );

  const props = {
    ref: containerRef,
    className,
    children,
  } as React.ComponentPropsWithoutRef<typeof Tag> & {
    ref: React.RefObject<HTMLElement>;
    children: React.ReactNode;
  };

  return React.createElement(Tag, props);
}
