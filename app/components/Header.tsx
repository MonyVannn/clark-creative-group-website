"use client";

import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

const navLinks = [
  { href: "/", label: "HOME", active: true },
  { href: "#", label: "ABOUT", active: false },
  { href: "#", label: "SERVICES", active: false },
  { href: "#", label: "PORTAL", active: false },
];

function NavLink({
  href,
  children,
  active,
  isDarkTheme,
}: {
  href: string;
  children: string;
  active?: boolean;
  isDarkTheme: boolean;
}) {
  const activeColor = isDarkTheme ? "text-neutral-400" : "text-[#606060]";
  const inactiveColor = isDarkTheme ? "text-neutral-500" : "text-[#a0a0a0]";
  const underlineColor = isDarkTheme ? "bg-neutral-400" : "bg-[#606060]";

  return (
    <a href={href} className="block overflow-hidden">
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
    </a>
  );
}

export default function Header() {
  const { isDarkTheme } = useTheme();

  return (
    <header
      data-preloader-target="nav"
      className={`sticky top-0 z-50 py-5 backdrop-blur-md transition-colors duration-1400 ${
        isDarkTheme ? "bg-[#191919]/90" : "bg-[#f2f2f2]"
      }`}
    >
      <div className="md:px-12 lg:px-16 flex items-center justify-between">
        {/* Brand */}
        <div className="shrink-0">
          <span
            className={`font-clash-display text-lg font-semibold tracking-wide transition-colors duration-1400 md:text-xl ${
              isDarkTheme ? "text-white" : "text-[#171717]"
            }`}
          >
            CLARK CREATIVE GROUP
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-8 md:gap-12">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              href={link.href}
              active={link.active}
              isDarkTheme={isDarkTheme}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="shrink-0">
          <button
            className={`rounded-md cursor-pointer px-5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-1400 hover:opacity-90 ${
              isDarkTheme
                ? "bg-white text-[#191919]"
                : "bg-[#191919] text-white"
            }`}
            type="button"
          >
            CONTACT US
          </button>
        </div>
      </div>
    </header>
  );
}
