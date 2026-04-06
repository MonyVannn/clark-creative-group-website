"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { usePreloader } from "./PreloaderContext";

export default function LoadingScreen({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { setIsPreloaderComplete } = usePreloader();

  const [isLoading, setIsLoading] = useState(true);
  const [displayProgress, setDisplayProgress] = useState(0);

  const targetProgressRef = useRef(0);
  const [fontsReady, setFontsReady] = useState(false);

  // 1) Wait for fonts
  useEffect(() => {
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(() => {
        setFontsReady(true);
        if (targetProgressRef.current < 40) {
          targetProgressRef.current = 40;
        }
      });
    } else {
      // Fallback if document.fonts is not supported
      setFontsReady(true);
      if (targetProgressRef.current < 40) {
        targetProgressRef.current = 40;
      }
    }
  }, []);

  // 2) Wait for page load
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (document.readyState === "complete") {
        targetProgressRef.current = 100;
      } else {
        const handleLoad = () => {
          targetProgressRef.current = 100;
        };
        window.addEventListener("load", handleLoad);
        return () => window.removeEventListener("load", handleLoad);
      }
    }
  }, [pathname]);

  // 3) 4-second safety fallback after fonts are ready
  useEffect(() => {
    if (fontsReady) {
      const timer = setTimeout(() => {
        targetProgressRef.current = 100;
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [fontsReady]);

  // 4) Progress Animation Loop
  useEffect(() => {
    let animationFrameId: number;

    const updateProgress = () => {
      setDisplayProgress((prev) => {
        const target = targetProgressRef.current;
        const diff = target - prev;

        // Snap to target if very close
        if (Math.abs(diff) < 0.5) {
          return target;
        }

        // Ease towards target
        return prev + diff * 0.07;
      });

      animationFrameId = requestAnimationFrame(updateProgress);
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // 4) Exit condition
  useEffect(() => {
    if (displayProgress >= 99.5) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        setIsPreloaderComplete(true);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [displayProgress, setIsPreloaderComplete]);

  // 6) Scroll lock
  useEffect(() => {
    if (typeof document !== "undefined") {
      if (isLoading) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }
    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, [isLoading]);

  // Derived progress values
  const currentPercentage = Math.min(
    100,
    Math.max(1, Math.round(displayProgress)),
  );

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 z-200 flex flex-col justify-end overflow-hidden"
            style={{
              background:
                "linear-gradient(to bottom, #01030d, #040b22, #07153b)",
            }}
          >
            {/* CSS Noise Fallback layer */}
            <div
              className="pointer-events-none absolute inset-0 opacity-10 mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                animation: "noise-jitter 0.2s steps(2) infinite alternate",
              }}
            />

            <style
              dangerouslySetInnerHTML={{
                __html: `
              @keyframes noise-jitter {
                0% { transform: translate(0, 0) scale(1.05); }
                100% { transform: translate(-1%, -1%) scale(1.05); }
              }
            `,
              }}
            />

            {/* Left Bar Indicator */}
            <div
              className="absolute left-0 bottom-0 w-1 md:w-2 bg-[#ffc878]"
              style={{ height: `${displayProgress}%` }}
            />

            {/* Content */}
            <div className="pl-6 md:pl-12 pb-12 z-10 pointer-events-none flex flex-col justify-end">
              <h1 className="font-clash-display text-4xl md:text-6xl lg:text-7xl xl:text-[8rem] 2xl:text-[12rem] font-bold text-[#f6f8ff] tracking-tight m-0 leading-none">
                CLARK CREATIVE
              </h1>
              <div className="font-satoshi text-6xl md:text-8xl lg:text-[10rem] xl:text-[14rem] font-bold text-[#ffc878] m-0 leading-none mt-2 md:mt-4">
                {currentPercentage}%
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {children}
      </motion.div>
    </>
  );
}
