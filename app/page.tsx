import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import IntroSection from "./components/IntroSection";
import CoreOverview from "./components/CoreOverview";
import Footer from "./components/Footer";
import PreloaderGate from "./components/PreloaderGate";

export default function Home() {
  return (
    <PreloaderGate>
      {/* Header */}
      <Header />
      <div className="relative min-h-screen bg-[#f2f2f2] ">
        {/* Grid area - white visible outside via parent padding */}
        <div
          className="pointer-events-none absolute inset-8 md:inset-y-2 md:inset-x-16 z-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)
          `,
            backgroundSize: "18px 20px",
          }}
        />
        <div className="relative z-10 px-8 md:px-4 lg:px-16">
          <HeroSection />
        </div>
        <IntroSection />
        <div className="relative z-10 px-8 md:px-4 lg:px-16">
          <CoreOverview />
        </div>
      </div>
      <Footer />
    </PreloaderGate>
  );
}
