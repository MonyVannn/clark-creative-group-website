"use client";

import { theme } from "@/app/lib/theme";
import CopyReveal from "../ui/CopyReveal";
import Image from "next/image";
import SplitText from "../ui/SplitText";
import SquareSketch from "../ui/SquareSketch";

export default function TargetAudienceSection() {
  return (
    <section
      data-color={theme.foreground}
      className="relative w-full px-6 py-28 lg:py-40 md:px-12 lg:px-16"
    >
      <SquareSketch className="absolute bottom-0 right-10 opacity-35 w-64 h-64 md:w-120 md:h-120 rotate-45" />
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 md:gap-12 lg:gap-14">
        <SplitText
          text="Who is this for."
          tag="h2"
          splitType="words, chars"
          className={`font-clash-display font-semibold text-5xl lg:text-6xl leading-tight transition-colors duration-1000 text-foreground`}
          textAlign="left"
          delay={20}
        />

        <CopyReveal
          as="div"
          className={`font-satoshi text-lg md:text-xl lg:text-2xl leading-relaxed md:leading-relaxed lg:leading-snug text-muted-foreground`}
          blockColor={theme.copyRevealBlock}
          stagger={0.12}
          textAlign="left"
        >
          The landscape is shifting. Founders who build the next generation of
          businesses aren&apos;t hiring five vendors and hoping the pieces fit.
          They&apos;re working with partners who see the whole picture, and
          design every part to work together.
        </CopyReveal>

        <CopyReveal
          as="div"
          className={`font-satoshi text-lg md:text-xl lg:text-2xl leading-relaxed md:leading-relaxed lg:leading-snug text-muted-foreground`}
          blockColor={theme.copyRevealBlock}
          stagger={0.1}
          delay={0.2}
          textAlign="left"
        >
          If you build, grow, and create. If you have a vision and the will to
          make it real, whether that&apos;s a{" "}
          <span className="font-clash-display font-medium underline decoration-foreground/40 underline-offset-4">
            regenerative farm
          </span>
          , a{" "}
          <span className="font-clash-display font-medium underline decoration-foreground/40 underline-offset-4">
            food company with a mission
          </span>
          , a{" "}
          <span className="font-clash-display font-medium underline decoration-foreground/40 underline-offset-4">
            construction business ready to scale
          </span>
          , or something entirely new. If you believe your business can be an
          extension of your values and you&apos;re ready to build it that way.
          <span className="mt-4 block font-clash-display font-medium md:text-xl lg:text-4xl">
            you&apos;re in the right place.
          </span>
        </CopyReveal>
      </div>
    </section>
  );
}
