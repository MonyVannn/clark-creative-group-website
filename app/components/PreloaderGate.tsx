"use client";

import { createContext, useEffect, useState } from "react";
import Preloader from "./Preloader";

export const PreloaderContext = createContext<{ isReady: boolean }>({
  isReady: true,
});

export default function PreloaderGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  const handleComplete = () => {
    setIsLoading(false);
  };

  return (
    <PreloaderContext.Provider value={{ isReady: !isLoading }}>
      <Preloader onComplete={handleComplete} />
      {children}
    </PreloaderContext.Provider>
  );
}
