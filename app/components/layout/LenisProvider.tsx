"use client";

import { Lenis } from "lenis/react";
import { LenisScrollTriggerSync } from "./LenisScrollTriggerSync";
import "lenis/dist/lenis.css";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <Lenis
      root
      options={{
        autoRaf: false, // Use GSAP ticker instead for ScrollTrigger sync
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false,
        anchors: true,
      }}
    >
      <LenisScrollTriggerSync />
      {children}
    </Lenis>
  );
}
