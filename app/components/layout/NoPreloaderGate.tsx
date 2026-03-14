"use client";

import { PreloaderContext } from "./PreloaderGate";

export default function NoPreloaderGate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PreloaderContext.Provider value={{ isReady: true }}>
      {children}
    </PreloaderContext.Provider>
  );
}
