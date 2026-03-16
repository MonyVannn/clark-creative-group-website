import Header from "./components/header/Header";
import HeroSection from "./components/homepage/HeroSection";
import IntroSection from "./components/homepage/IntroSection";
import TargetAudienceSection from "./components/homepage/TargetAudienceSection";
import CoreOverview from "./components/homepage/CoreOverview";
import TestimonialSection from "./components/homepage/TestimonialSection";
import Footer from "./components/footer/Footer";
import PreloaderGate from "./components/layout/PreloaderGate";
import { ThemeProvider } from "./components/contexts/ThemeContext";
import Line from "./components/ui/Line";

export default function Home() {
  return (
    <PreloaderGate>
      <ThemeProvider>
        <main className="relative min-h-screen bg-transparent">
          {/* Header */}
          <Header />
          <div className="relative min-h-screen">
            {/* Grid area - white visible outside via parent padding */}

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
