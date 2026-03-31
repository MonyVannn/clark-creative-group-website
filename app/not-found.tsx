import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { ThemeProvider } from "./components/contexts/ThemeContext";
import NotFoundActions from "./components/notfoundpage/NotFoundActions";

export default function GlobalNotFound() {
  return (
    <ThemeProvider>
      <main className="relative min-h-screen bg-transparent">
        <Header />
        <div className="relative overflow-hidden">
          <div className="relative z-10 flex min-h-[74vh] flex-col items-center justify-center px-6 pb-20 pt-28 text-center md:px-10">
            <p className="mb-4 font-satoshi text-xs font-semibold uppercase tracking-[0.35em] text-[#f2f2f2]">
              Page Not Found
            </p>
            <h1 className="font-clash-display flex items-center gap-2 text-[clamp(5.5rem,23vw,14rem)] font-semibold leading-none tracking-tight sm:gap-4">
              <span>4</span>
              <span>0</span>
              <span>4</span>
            </h1>
            <p className="mt-6 max-w-xl font-satoshi text-sm leading-relaxed text-[#f2f2f2] md:text-base">
              The page you are looking for is unavailable or may have moved.
              Return to the homepage to keep exploring Clark Creative Group.
            </p>
            <NotFoundActions />
          </div>
        </div>
        <Footer />
      </main>
    </ThemeProvider>
  );
}
