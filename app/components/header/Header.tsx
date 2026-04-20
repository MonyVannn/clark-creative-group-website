"use client";

import { motion } from "framer-motion";
import { Nav } from "./MobileNav";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { usePageTransition } from "../transitions/TransitionProvider";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "/services", label: "SERVICES" },
];

function NavLink({
  href,
  children,
  active,
  onNavigate,
}: {
  href: string;
  children: string;
  active?: boolean;
  onNavigate: (href: string) => void;
}) {
  const activeColor = "text-foreground";
  const inactiveColor = "text-muted-foreground";
  const underlineColor = "bg-foreground";
  const isInternalPath = href.startsWith("/");

  return (
    <Link
      href={href}
      onClick={(e) => {
        if (!isInternalPath) return;
        e.preventDefault();
        onNavigate(href);
      }}
      className="block overflow-hidden"
    >
      <motion.div
        whileHover={{ y: -20 }}
        transition={{ ease: "backInOut", duration: 0.5 }}
        className="h-[20px]"
      >
        <span
          className={`flex h-[20px] items-center text-sm font-medium tracking-wide transition-colors duration-1400 ${
            active ? activeColor : inactiveColor
          }`}
        >
          {children}
        </span>
        <span
          className={`flex h-[20px] items-center text-sm font-medium tracking-wide transition-colors duration-1400 ${activeColor}`}
        >
          {children}
        </span>
      </motion.div>
      {active && (
        <div
          className={`mt-1 h-px w-full transition-colors duration-1400 ${underlineColor}`}
          aria-hidden
        />
      )}
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const { navigateTo } = usePageTransition();

  return (
    <header
      className={`sticky top-0 z-50 py-5 backdrop-blur-sm transition-colors duration-1400 bg-transparent `}
    >
      <div className="px-6 md:px-12 lg:px-16 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigateTo("/");
          }}
          className="shrink-0 flex items-center gap-2"
        >
          <Image
            src="/logo.png"
            alt="Clark Creative Group"
            width={32}
            height={32}
          />
          <span
            className={`font-clash-display hidden md:block font-semibold tracking-wide transition-colors duration-1400 md:text-xl text-foreground`}
          >
            CLARK CREATIVE GROUP
          </span>
          <span
            className={`font-clash-display md:hidden text-2xl font-semibold tracking-wide transition-colors duration-1400 md:text-xl text-foreground`}
          >
            CLARK CREATIVE
          </span>
        </Link>

        {/* Navigation */}
        <Nav />
        <nav className="items-center gap-8 md:gap-12 hidden lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              href={link.href}
              active={pathname === link.href}
              onNavigate={navigateTo}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="shrink-0 hidden lg:flex">
          <Link
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              navigateTo("/contact");
            }}
            className={`px-5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-1400 hover:opacity-90 bg-accent text-accent-foreground`}
          >
            CONTACT US
          </Link>
        </div>
      </div>
    </header>
  );
}
