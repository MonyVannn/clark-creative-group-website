"use client";

import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import { Nav } from "./MobileNav";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "#", label: "SERVICES" },
  { href: "#", label: "PORTAL" },
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
  const activeColor = isDarkTheme ? "text-white" : "text-[#606060]";
  const inactiveColor = isDarkTheme ? "text-gray-400" : "text-[#a0a0a0]";
  const underlineColor = isDarkTheme ? "bg-[#f2f2f2]" : "bg-[#606060]";

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
  const pathname = usePathname();

  return (
    <header
      data-preloader-target="nav"
      className={`sticky top-0 z-50 py-5 backdrop-blur-sm transition-colors duration-1400 bg-transparent `}
    >
      <div className="px-6 md:px-12 lg:px-16 flex items-center justify-between">
        {/* Brand */}
        <div className="shrink-0">
          <span
            className={`font-clash-display hidden md:block font-semibold tracking-wide transition-colors duration-1400 md:text-xl ${
              isDarkTheme ? "text-[#f6f8ff]" : "text-[#0a191f]"
            }`}
          >
            CLARK CREATIVE GROUP
          </span>
          <span
            className={`font-clash-display md:hidden text-2xl font-semibold tracking-wide transition-colors duration-1400 md:text-xl ${
              isDarkTheme ? "text-[#f6f8ff]" : "text-[#0a191f]"
            }`}
          >
            CLARK CREATIVE
          </span>
        </div>

        {/* Navigation */}
        <Nav />
        <nav className="items-center gap-8 md:gap-12 hidden lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              href={link.href}
              active={pathname === link.href}
              isDarkTheme={isDarkTheme}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="shrink-0 hidden lg:flex">
          <button
            className={`cursor-pointer px-5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-1400 hover:opacity-90 ${
              isDarkTheme
                ? "bg-[#ffc878] text-[#040b22]"
                : "bg-[#0a191f] text-[#f6f8ff]"
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
