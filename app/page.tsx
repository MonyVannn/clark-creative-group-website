import type { Metadata } from "next";
import Header from "./components/header/Header";
import HeroSection from "./components/homepage/HeroSection";
import IntroSection from "./components/homepage/IntroSection";
import TargetAudienceSection from "./components/homepage/TargetAudienceSection";
import CoreOverview from "./components/homepage/CoreOverview";
import WholePictureSection from "./components/homepage/WholePictureSection";
import HowWeWorkSection from "./components/homepage/HowWeWorkSection";
import TestimonialSection from "./components/homepage/TestimonialSection";
import Footer from "./components/footer/Footer";
import { ThemeProvider } from "./components/contexts/ThemeContext";
import Line from "./components/ui/Line";

export const metadata: Metadata = {
  title: "Clark Creative Group | Creative Advisory for Founders",
  description:
    "Creators of visionary lives and businesses. We design brands, build business systems, and connect the whole picture, Space, Story, System.",
  openGraph: {
    title: "Clark Creative Group | Creative Advisory for Founders",
    description:
      "A creative advisory for founders. Brand design, business systems, and strategy, all connected.",
    url: "/",
  },
};

export default function Home() {
  return (
    <ThemeProvider>
      <main className="relative min-h-screen bg-transparent">
        {/* Header */}
        <Header />
        <div className="relative min-h-screen">
          {/* Grid area - white visible outside via parent padding */}

          <div className="relative z-10  lg:px-16">
            <HeroSection />
            <IntroSection />
            <CoreOverview />
            <WholePictureSection />
            <HowWeWorkSection />
            <TestimonialSection />
          </div>
          <TargetAudienceSection />
        </div>
        <Footer />
      </main>
    </ThemeProvider>
  );
}
