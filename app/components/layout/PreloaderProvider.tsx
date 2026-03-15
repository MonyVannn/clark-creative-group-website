"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { PreloaderContext } from "./PreloaderContext";
import Preloader from "./Preloader";

export default function PreloaderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Initialise once: show the preloader only when the first render lands on "/".
  const [isLoading, setIsLoading] = useState(() => pathname === "/");

  // showPreloader is true only while we are on "/" AND the animation hasn't
  // completed yet. After completion (setIsLoading(false)) it stays false for
  // the entire session, so navigating away and back skips the animation.
  const showPreloader = pathname === "/" && isLoading;

  useEffect(() => {
    document.body.style.overflow = showPreloader ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showPreloader]);

  return (
    <PreloaderContext.Provider value={{ isReady: !showPreloader }}>
      {showPreloader && (
        <Preloader onComplete={() => setIsLoading(false)} />
      )}
      {children}
    </PreloaderContext.Provider>
  );
}
