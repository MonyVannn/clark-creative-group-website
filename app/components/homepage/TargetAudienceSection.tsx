"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CopyReveal from "../ui/CopyReveal";
import { useTheme } from "../contexts/ThemeContext";
import Image from "next/image";
import SplitText from "../ui/SplitText";

gsap.registerPlugin(ScrollTrigger);

export default function TargetAudienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { isDarkTheme, setIsDarkTheme } = useTheme();
  const setIsDarkThemeRef = useRef(setIsDarkTheme);

  useGSAP(
    () => {
      const elem = sectionRef.current;
      const mainEl = elem?.closest("main");
      if (!elem || !mainEl) return;

      const color = elem.getAttribute("data-color") ?? "#191919";

      const st = ScrollTrigger.create({
        trigger: elem,
        end: "bottom top",
        markers: false,
        onEnter: () => {
          gsap.to(mainEl, { backgroundColor: color, duration: 1 });
          setIsDarkThemeRef.current(true);
        },
        onEnterBack: () => {
          gsap.to(mainEl, { backgroundColor: color, duration: 1 });
          setIsDarkThemeRef.current(true);
        },
      });

      return () => st.kill();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      data-color="#191919"
      className="relative w-full px-8 py-28 lg:py-40 md:px-12 lg:px-16"
    >
      <Image
        src="/blob.png"
        width={600}
        height={600}
        alt="blob"
        className="absolute top-0 2xl:left-1/5 opacity-15 w-[400px] h-[400px]"
      />
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 md:gap-12 lg:gap-14">
        <SplitText
          text="Who is this for."
          tag="h2"
          splitType="words, chars"
          className={`font-clash-display font-semibold text-5xl lg:text-7xl leading-tight transition-colors duration-1000 ${isDarkTheme ? "text-[#f2f2f2]" : "text-[#191919]"}`}
          textAlign="left"
          delay={20}
        />

        <CopyReveal
          as="div"
          className={`font-satoshi text-lg md:text-xl lg:text-2xl leading-relaxed md:leading-relaxed lg:leading-snug ${
            isDarkTheme ? "text-neutral-100" : "text-[#191919]"
          }`}
          blockColor="#f2f2f2"
          stagger={0.12}
          textAlign="left"
        >
          The landscape is shifting. Founders who build the next generation of
          businesses aren&apos;t hiring five vendors and hoping the pieces fit.
          They&apos;re working with partners who see the whole picture — and
          design every part to work together.
        </CopyReveal>

        <CopyReveal
          as="div"
          className={`font-satoshi text-lg md:text-xl lg:text-2xl leading-relaxed md:leading-relaxed lg:leading-snug ${
            isDarkTheme ? "text-neutral-200" : "text-[#191919]"
          }`}
          blockColor="#f2f2f2"
          stagger={0.1}
          delay={0.2}
          textAlign="left"
        >
          If you build, grow, and create. If you have a vision and the will to
          make it real — whether that&apos;s a{" "}
          <span className="font-clash-display font-medium underline decoration-white/40 underline-offset-4">
            regenerative farm
          </span>
          , a{" "}
          <span className="font-clash-display font-medium underline decoration-white/40 underline-offset-4">
            food company with a mission
          </span>
          , a{" "}
          <span className="font-clash-display font-medium underline decoration-white/40 underline-offset-4">
            construction business ready to scale
          </span>
          , or something entirely new. If you believe your business can be an
          extension of your values and you&apos;re ready to build it that way —
          <span className="mt-4 block font-clash-display font-medium md:text-xl lg:text-4xl">
            you&apos;re in the right place.
          </span>
        </CopyReveal>
      </div>
    </section>
  );
}
