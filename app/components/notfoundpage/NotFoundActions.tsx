"use client";

import Link from "next/link";
import { usePageTransition } from "../transitions/TransitionProvider";

export default function NotFoundActions() {
  const { navigateTo } = usePageTransition();

  return (
    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
      <Link
        href="/"
        onClick={(e) => {
          e.preventDefault();
          navigateTo("/");
        }}
        className="w-full bg-[#ffc878] px-8 py-3 text-center font-satoshi text-sm font-bold uppercase tracking-[0.2em] transition-colors duration-300 hover:bg-[#ffc878]/80 sm:w-auto"
      >
        Back Home
      </Link>
      <Link
        href="/contact"
        onClick={(e) => {
          e.preventDefault();
          navigateTo("/contact");
        }}
        className="w-full border border-[#ffc878] px-8 py-3 text-center font-satoshi text-sm font-semibold uppercase tracking-[0.2em] text-[#ffc878] transition-colors duration-300 hover:bg-[#ffc878] hover:text-[#f2f2f2] sm:w-auto"
      >
        Contact
      </Link>
    </div>
  );
}
