"use client";

import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";

export const Heading = ({ children }: { children: ReactNode }) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const splitRef = useRef<SplitType | null>(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;

    splitRef.current = new SplitType(el, {
      types: "lines",
      tagName: "span",
    });

    el.querySelectorAll<HTMLElement>(".line").forEach((line) => {
      line.style.overflow = "hidden";
      line.style.display = "block";
    });

    const lines = splitRef.current.lines;
    if (!lines?.length) return;

    gsap.fromTo(
      lines,
      { yPercent: 120, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        stagger: 0.2,
        ease: "power2.inOut",
        duration: 0.8,
      },
    );

    return () => {
      splitRef.current?.revert();
      splitRef.current = null;
    };
  }, []);

  return (
    <h1
      ref={headingRef}
      className="font-clash-display text-center text-5xl font-semibold tracking-tight text-foreground md:text-7xl"
    >
      {children}
    </h1>
  );
};

export const SubHeading = ({ children }: { children: ReactNode }) => {
  const subHeadingRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = subHeadingRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0 },
      {
        opacity: 1,
        ease: "power2.inOut",
        duration: 0.8,
      },
    );
  }, []);

  return (
    <p
      ref={subHeadingRef}
      className="mt-8 text-center font-satoshi text-xl text-muted-foreground"
    >
      {children}
    </p>
  );
};

const PageTemplate = ({ children }: { children: ReactNode }) => {
  return (
    <div className="absolute inset-0 flex h-screen flex-col">
      <main className="flex flex-1 items-center justify-center px-6">
        <div className="mx-auto max-w-2xl text-center">{children}</div>
      </main>
    </div>
  );
};

export default PageTemplate;
