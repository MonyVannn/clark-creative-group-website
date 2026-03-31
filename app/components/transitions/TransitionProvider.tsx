"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";

type TransitionContextValue = {
  navigateTo: (href: string) => void;
};

const TransitionContext = createContext<TransitionContextValue>({
  navigateTo: () => {},
});

export const usePageTransition = () => useContext(TransitionContext);

export default function TransitionProvider({
  children,
  column = 6,
}: {
  children: ReactNode;
  column?: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isTransitioning = useRef(false);

  useEffect(() => {
    if (!isTransitioning.current) return;

    const cols = colRefs.current.filter(Boolean);
    gsap.to(cols, {
      y: "-100%",
      duration: 0.3,
      ease: "power3.inOut",
      stagger: 0.05,
      onComplete: () => {
        isTransitioning.current = false;
      },
    });
  }, [pathname]);

  const navigateTo = useCallback(
    (href: string) => {
      if (isTransitioning.current) return;
      if (pathname === href) return;

      isTransitioning.current = true;
      const cols = colRefs.current.filter(Boolean);
      gsap.set(cols, { y: "100%" });

      gsap.to(cols, {
        y: "0%",
        duration: 0.3,
        ease: "power3.inOut",
        stagger: 0.05,
        onComplete: () => {
          router.push(href);
        },
      });
    },
    [pathname, router],
  );

  return (
    <TransitionContext.Provider value={{ navigateTo }}>
      {children}
      <div className="pointer-events-none fixed inset-0 z-50 flex h-screen w-screen">
        {Array.from({ length: column }).map((_, idx) => (
          <div
            key={idx}
            ref={(el) => {
              colRefs.current[idx] = el;
            }}
            className="h-full w-full bg-[#ffc878]  "
            style={{ transform: "translateY(100%)" }}
          />
        ))}
      </div>
    </TransitionContext.Provider>
  );
}
