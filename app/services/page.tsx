import Header from "../components/header/Header";
import { ThemeProvider } from "../components/contexts/ThemeContext";
import Line from "../components/ui/Line";
import Footer from "../components/footer/Footer";
import ServicesHeroSection from "../components/servicespage/ServicesHeroSection";
import NoPreloaderGate from "../components/layout/NoPreloaderGate";

export default function Page() {
  return (
    <NoPreloaderGate>
      <ThemeProvider>
        <main className="min-h-screen">
          <Header />
          <div className="relative min-h-screen overflow-x-hidden">
            <div className="relative z-10 px-8 md:px-6 lg:px-16">
              <ServicesHeroSection />
            </div>
          </div>
          <Line />
          <Footer />
        </main>
      </ThemeProvider>
    </NoPreloaderGate>
  );
}
