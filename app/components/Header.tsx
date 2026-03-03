"use client";

import { motion } from "framer-motion";

const navLinks = [
  { href: "#", label: "HOME", active: true },
  { href: "#", label: "FOUNDERS", active: false },
  { href: "#", label: "COMPANIES", active: false },
  { href: "#", label: "OPENINGS", active: false },
];

function NavLink({
  href,
  children,
  active,
}: {
  href: string;
  children: string;
  active?: boolean;
}) {
  return (
    <a href={href} className="block overflow-hidden">
      <motion.div
        whileHover={{ y: -20 }}
        transition={{ ease: "backInOut", duration: 0.5 }}
        className="h-[20px]"
      >
        <span
          className={`flex h-[20px] items-center text-sm font-medium tracking-wide ${
            active ? "text-[#606060]" : "text-[#a0a0a0]"
          }`}
        >
          {children}
        </span>
        <span className="flex h-[20px] items-center text-sm font-medium tracking-wide text-[#606060]">
          {children}
        </span>
      </motion.div>
      {active && <div className="mt-1 h-px w-full bg-[#606060]" aria-hidden />}
    </a>
  );
}

export default function Header() {
  return (
    <header
      data-preloader-target="nav"
      className="sticky top-0 z-50 bg-[#f2f2f2] py-5 backdrop-blur-md"
    >
      <div className="md:px-12 lg:px-16 flex items-center justify-between">
        {/* Brand */}
        <div className="shrink-0">
          <span className="font-clash-display text-lg font-semibold tracking-wide text-[#171717] md:text-xl">
            CLARK CREATIVE GROUP
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-8 md:gap-12">
          {navLinks.map((link) => (
            <NavLink key={link.label} href={link.href} active={link.active}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="shrink-0">
          <button
            className="rounded-md bg-[#191919] cursor-pointer px-5 py-2.5 text-sm font-semibold tracking-wide text-white transition-opacity hover:opacity-90"
            type="button"
          >
            CONTACT US
          </button>
        </div>
      </div>
    </header>
  );
}
