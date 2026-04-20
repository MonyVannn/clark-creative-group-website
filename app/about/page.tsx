import type { Metadata } from "next";
import Header from "../components/header/Header";
import { ThemeProvider } from "../components/contexts/ThemeContext";
import Line from "../components/ui/Line";
import Footer from "../components/footer/Footer";
import AboutHeroSection from "../components/aboutpage/AboutHeroSection";
import TeamSection from "../components/aboutpage/TeamSection";
import VisionSection from "../components/aboutpage/VisionSection";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet the team behind Clark Creative Group. Founded by Roger and Hattie Clark, we partner design, narrative, and strategy to help founders build visionary lives and businesses.",
  openGraph: {
    title: "About Clark Creative Group",
    description:
      "Founded by Roger and Hattie Clark, a creative advisory built on clarity, environment, and momentum for founders.",
    url: "/about",
  },
};

export default function About() {
  return (
    <ThemeProvider>
      <main className="min-h-screen">
        <Header />
        <div className="relative min-h-screen overflow-x-hidden">
          <div className="relative z-10 px-8 md:px-6 lg:px-16">
            <AboutHeroSection />
            <TeamSection />
            <VisionSection />
          </div>
        </div>
        <Footer />
      </main>
    </ThemeProvider>
  );
}
