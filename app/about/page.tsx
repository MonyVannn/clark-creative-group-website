import Header from "../components/Header";
import { ThemeProvider } from "../contexts/ThemeContext";
import Line from "../components/Line";
import Footer from "../components/Footer";
import AboutHeroSection from "../components/AboutHeroSection";
import NoPreloaderGate from "../components/NoPreloaderGate";

export default function About() {
  return (
    <NoPreloaderGate>
      <ThemeProvider>
        <main className="min-h-screen bg-[#f2f2f2]">
          <Header />
          <div className="relative min-h-screen">
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
              <AboutHeroSection />
            </div>
          </div>
          <Line />
          <Footer />
        </main>
      </ThemeProvider>
    </NoPreloaderGate>
  );
}
