import Header from "./components/header/Header";
import HeroSection from "./components/homepage/HeroSection";
import IntroSection from "./components/homepage/IntroSection";
import TargetAudienceSection from "./components/homepage/TargetAudienceSection";
import CoreOverview from "./components/aboutpage/CoreOverview";
import TestimonialSection from "./components/homepage/TestimonialSection";
import Footer from "./components/footer/Footer";
import PreloaderGate from "./components/layout/PreloaderGate";
import { ThemeProvider } from "./components/contexts/ThemeContext";
import Line from "./components/ui/Line";

export default function Home() {
  return (
    <PreloaderGate>
      <ThemeProvider>
        <main className="min-h-screen bg-[#f2f2f2]">
          {/* Header */}
          <Header />
          <div className="relative min-h-screen">
            {/* Grid area - white visible outside via parent padding */}
            <div
              className="pointer-events-none absolute inset-6 inset-y-0 md:inset-y-2 lg:inset-x-16 z-0"
              style={{
                backgroundImage: `
            linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)
          `,
                backgroundSize: "18px 20px",
              }}
            />
            <div className="relative z-10 px-8 md:px-6 lg:px-16">
              <HeroSection />
              <IntroSection />
              <CoreOverview />
              <TestimonialSection />
            </div>
            <TargetAudienceSection />
          </div>
          <Line />

          <Footer />
        </main>
      </ThemeProvider>
    </PreloaderGate>
  );
}
