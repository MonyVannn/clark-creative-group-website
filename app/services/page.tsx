import type { Metadata } from "next";
import Header from "../components/header/Header";
import Line from "../components/ui/Line";
import Footer from "../components/footer/Footer";
import ServicesHeroSection from "../components/servicespage/ServicesHeroSection";
import ServicesDetailsSection from "../components/servicespage/ServicesDetailsSection";
import HowWeWorkSection from "../components/servicespage/HowWeWorkSection";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore our service offerings across Space, Story, and System, from brand identity and content strategy to operational workflows, CRM, and automation.",
  openGraph: {
    title: "Services | Clark Creative Group",
    description:
      "Brand design, business systems, and strategy treated as one high-performance engine for founders.",
    url: "/services",
  },
};

export default function Page() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="relative min-h-screen overflow-x-hidden">
        <div className="relative z-10 px-8 md:px-6 lg:px-16">
          <ServicesHeroSection />
        </div>
        <ServicesDetailsSection />
        <div className="relative z-10 px-8 md:px-6 lg:px-16">
          <HowWeWorkSection />
        </div>
      </div>
      <Footer />
    </main>
  );
}
