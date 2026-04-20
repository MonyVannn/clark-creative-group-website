"use client";

import { motion } from "framer-motion";

export default function FloatingNav() {
  return (
    <nav className="fixed  top-8 flex w-fit items-center gap-6 rounded-lg border border-accent bg-accent p-2 text-sm text-accent-foreground z-60">
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
        <span className="flex h-[20px] items-center text-accent-foreground">
          {children}
        </span>
      </motion.div>
    </a>
  );
}

function JoinButton() {
  return (
    <button
      className="relative z-0 flex items-center cursor-pointer gap-2 overflow-hidden whitespace-nowrap rounded-lg border border-accent-foreground/40 px-4 py-1.5 font-medium text-accent-foreground transition-all duration-300
        before:absolute before:inset-0 before:-z-10 before:translate-y-[200%] before:scale-[2.5] before:rounded-[100%] before:bg-foreground before:transition-transform before:duration-1000 before:content-['']
        hover:scale-105 hover:border-foreground hover:text-accent-foreground hover:before:translate-y-[0%]
        active:scale-100"
    >
      Contact Us
    </button>
  );
}
