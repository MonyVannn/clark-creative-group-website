"use client";

import ScreenFitText from "./ScreenFitText";
import NeuFollowButton from "./NeuFollowButton";
import FloatingNav from "./FloatingNav";

export default function HeroSectionV2() {
  const gridStyle: React.CSSProperties = {
    backgroundImage: [
      "linear-gradient(to right, rgba(188, 108, 37, 0.2) 1px, transparent 1px)",
      "linear-gradient(to bottom, rgba(188, 108, 37, 0.2) 1px, transparent 1px)",
    ].join(", "),
    backgroundSize: "24px 24px",
  };

  return (
    <section
      className="h-screen w-screen bg-[#FEFAE0] p-10 pt-28"
      style={{ fontFamily: "var(--font-geist-sans)" }}
    >
      <FloatingNav />
      <div className="w-full h-full grid grid-rows-5 border-[#BC6C25] border-2">
        {/* Rows 1-2: Grid area */}
        <div className="w-full row-span-2" style={gridStyle} />

        {/* Row 3: Labels */}
        <div style={gridStyle}>
          {/* Divider */}
          <div className="h-[24px] w-full bg-[#BC6C25]" />
          <div className="grid grid-cols-2 sm:grid-cols-4 w-full h-full items-center gap-y-3 sm:gap-y-0 px-2 sm:px-0">
            {[
              ["DESIGN", "YOUR SPACE"],
              ["WRITE", "YOUR STORY"],
              ["MANAGE", "YOUR SYSTEM"],
            ].map(([line1, line2], i) => (
              <div key={i} className="px-3 sm:mx-auto font-medium">
                <p
                  className="font-mono text-[clamp(0.6rem,1.2vw,1.75rem)] tracking-[0.15em] leading-snug text-[#1E1F1C]/80 uppercase"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  {line1}
                  <br />
                  {line2}
                </p>
              </div>
            ))}
            {/* CTA button — hidden on the smallest screens, shown sm+ */}
            <div className="hidden sm:flex items-center justify-center px-3">
              <NeuFollowButton label="GET IN TOUCH" />
            </div>
          </div>
        </div>

        {/* Row 4: Primary branding */}
        <div className="w-full border-t border-b border-[#BC6C25]">
          <div className="relative h-full">
            <ScreenFitText
              text="CLARK CREATIVE GROUP"
              className="absolute bottom-0 font-black uppercase tracking-[-0.02em] text-[#1E1F1C]"
            />
          </div>
        </div>

        {/* Row 5: Tagline */}
        <div className="w-full ">
          <div className="relative h-full">
            <ScreenFitText
              text="RECLAIM YOUR TIME. Automate for Growth."
              className="absolute bottom-0 font-black uppercase tracking-[-0.02em] text-[#1E1F1C]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
