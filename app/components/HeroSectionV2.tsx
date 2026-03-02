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
    backgroundSize: "30px 30px",
  };

  return (
    <section
      className="h-screen w-screen bg-[#FEFAE0] p-10 pt-28"
      style={{ fontFamily: "var(--font-geist-sans)" }}
    >
      <FloatingNav />
      <div className="w-full h-full grid grid-rows-5 border-[#DDA15E] border-2">
        {/* Rows 1-2: Grid area */}
        <div className="relative w-full row-span-2" style={gridStyle}>
          <div className="absolute inset-0 flex items-center justify-center">
            <CcgLogo className="h-[clamp(6rem,62vw,72rem)] max-h-[72vh] w-auto text-[#DDA15E]" />
          </div>
        </div>

        {/* Row 3: Labels */}
        <div style={gridStyle}>
          {/* Divider */}
          <div className="h-[24px] w-full bg-[#DDA15E]" />
          <div className="grid grid-cols-2 sm:grid-cols-4 w-full h-full items-center gap-y-3 sm:gap-y-0 px-2 sm:px-0">
            {[
              ["DESIGN", "YOUR SPACE"],
              ["WRITE", "YOUR STORY"],
              ["MANAGE", "YOUR SYSTEM"],
            ].map(([line1, line2], i) => (
              <div key={i} className="px-3 sm:mx-auto font-medium z-50">
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
        <div className="w-full border-t-2 border-b-2 border-[#DDA15E]">
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

function CcgLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1080 1080"
      fill="currentColor"
      aria-label="Clark Creative Group"
      className={className}
    >
      <rect x="239.99" y="337.5" width="120" height="67.5" />
      <polygon points="287.73 694.77 240 742.5 60.01 562.51 60.01 517.49 85.23 492.27 287.73 694.77" />
      <polygon points="287.73 385.23 132.96 540 85.23 587.73 60.01 562.51 60.01 517.49 85.23 492.27 240 337.5 287.73 385.23" />
      <rect x="240" y="675" width="120" height="67.5" />
      <rect x="539.99" y="337.5" width="120" height="67.5" />
      <polygon points="587.72 694.77 539.99 742.5 360 562.51 360 517.49 385.22 492.27 587.72 694.77" />
      <polygon points="587.72 385.23 432.95 540 385.22 587.73 360 562.51 360 517.49 385.22 492.27 539.99 337.5 587.72 385.23" />
      <rect x="539.99" y="675" width="120" height="67.5" />
      <rect x="839.98" y="337.5" width="180.01" height="67.5" />
      <polygon points="887.71 694.77 839.98 742.5 659.99 562.51 659.99 517.49 685.21 492.27 887.71 694.77" />
      <polygon points="887.71 385.23 732.94 540 685.21 587.73 659.99 562.51 659.99 517.49 685.21 492.27 839.98 337.5 887.71 385.23" />
      <rect x="839.98" y="675" width="180.01" height="67.5" />
      <rect x="952.49" y="540" width="67.5" height="202.5" />
    </svg>
  );
}
