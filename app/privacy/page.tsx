import type { Metadata } from "next";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import PrivacyContent from "../components/privacypage/PrivacyContent";

export const metadata: Metadata = {
  title: "Privacy / Cookies Policy | Clark Creative Group",
  description:
    "Learn how Clark Creative Group handles website privacy, form submissions, and cookies.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="relative min-h-screen overflow-x-hidden">
        <div className="relative z-10 px-8 md:px-6 lg:px-16">
          <PrivacyContent />
        </div>
      </div>
      <Footer />
    </main>
  );
}
