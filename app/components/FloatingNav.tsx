"use client";

import { motion } from "framer-motion";

export default function FloatingNav() {
  return (
    <nav className="fixed  top-8 flex w-fit items-center gap-6 rounded-lg border border-[#BC6C25] bg-[#BC6C25] p-2 text-sm text-[#FEFAE0] z-50">
      <Logo />
      <NavLink href="#">Home</NavLink>
      <NavLink href="#">About</NavLink>
      <NavLink href="#">Services</NavLink>
      <NavLink href="#">Work</NavLink>
      <JoinButton />
    </nav>
  );
}

function Logo() {
  return (
    <span className="ml-2 font-clash-display text-xl font-bold tracking-widest text-white uppercase">
      CCG
    </span>
  );
}

function NavLink({ href, children }: { href: string; children: string }) {
  return (
    <a href={href} className="block overflow-hidden">
      <motion.div
        whileHover={{ y: -20 }}
        transition={{ ease: "backInOut", duration: 0.5 }}
        className="h-[20px]"
      >
        <span className="flex h-[20px] items-center">{children}</span>
        <span className="flex h-[20px] items-center text-[#FEFAE0]">
          {children}
        </span>
      </motion.div>
    </a>
  );
}

function JoinButton() {
  return (
    <button
      className="relative z-0 flex items-center cursor-pointer gap-2 overflow-hidden whitespace-nowrap rounded-lg border border-[#DDA15E] px-4 py-1.5 font-medium text-[#FEFAE0] transition-all duration-300
        before:absolute before:inset-0 before:-z-10 before:translate-y-[200%] before:scale-[2.5] before:rounded-[100%] before:bg-[#FEFAE0] before:transition-transform before:duration-1000 before:content-['']
        hover:scale-105 hover:border-[#FEFAE0] hover:text-neutral-900 hover:before:translate-y-[0%]
        active:scale-100"
    >
      Contact Us
    </button>
  );
}
