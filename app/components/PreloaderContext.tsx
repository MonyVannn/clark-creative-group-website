"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface PreloaderContextType {
  isPreloaderComplete: boolean;
  setIsPreloaderComplete: (value: boolean) => void;
}

const PreloaderContext = createContext<PreloaderContextType>({
  isPreloaderComplete: false,
  setIsPreloaderComplete: () => {},
});

export const usePreloader = () => useContext(PreloaderContext);

export function PreloaderProvider({ children }: { children: ReactNode }) {
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);

  return (
    <PreloaderContext.Provider value={{ isPreloaderComplete, setIsPreloaderComplete }}>
      {children}
    </PreloaderContext.Provider>
  );
}
