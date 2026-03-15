"use client";

import { createContext } from "react";

export const PreloaderContext = createContext<{ isReady: boolean }>({
  isReady: true,
});
