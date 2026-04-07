import type { Metadata } from "next";
import Header from "../components/header/Header";
import { ThemeProvider } from "../components/contexts/ThemeContext";
import Line from "../components/ui/Line";
import Footer from "../components/footer/Footer";
import ContactHeroSection from "../components/contactpage/ContactHeroSection";
import ContactFormsSection from "../components/contactpage/ContactFormsSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start with a thirty-minute conversation. Share your vision and discover where Space, Story, or System creates the most momentum for your business.",
  openGraph: {
    title: "Contact Clark Creative Group",
    description:
      "Let's start with a conversation — thirty minutes about your vision, your business, and where to create momentum.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <ThemeProvider>
      <main className="min-h-screen">
        <Header />
        <div className="relative min-h-screen overflow-x-hidden">
          <div className="relative z-10 px-8 md:px-6 lg:px-16">
            <ContactHeroSection />
            <ContactFormsSection />
          </div>
        </div>
        <Footer />
      </main>
    </ThemeProvider>
  );
}
