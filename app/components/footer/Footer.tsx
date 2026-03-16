"use client";

import { useState } from "react";
import Spline from "@splinetool/react-spline";
import { FiArrowRight } from "react-icons/fi";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "/services", label: "SERVICES" },
  { href: "/contact", label: "CONTACT" },
];

const socialPlatforms = ["LinkedIn", "Instagram"];

function FooterCTA({
  children,
  href,
  onClick,
}: {
  children: string;
  href?: string;
  onClick?: () => void;
}) {
  const className =
    "group flex items-center gap-3 text-sm font-medium tracking-wide text-[#f6f8ff] transition-opacity hover:opacity-80 cursor-pointer";
  const content = (
    <>
      <span>{children}</span>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#f6f8ff]/60 transition-colors group-hover:border-[#f6f8ff]">
        <FiArrowRight className="h-3.5 w-3.5" />
      </span>
    </>
  );
  if (href) {
    return (
      <a href={href} className={className}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={className}>
      {content}
    </button>
  );
}

export default function Footer() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!formState.name.trim()) newErrors.name = "Name is required";
    if (!formState.email.trim()) newErrors.email = "Email is required";
    if (!formState.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // UI only - no backend
      setFormState({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });
    }
  };

  return (
    <footer className="relative bg-[#040b22] text-[f2f2f2] overflow-hidden z-10">
      {/* Spline scene - bottom right of footer */}
      <div className="pointer-events-none absolute top-0 right-0 z-0 h-[600px] w-[500px]">
        <Spline
          scene="https://prod.spline.design/f-MiHctywQQqwRd7/scene.splinecode"
          className="h-full w-full scale-200 opacity-5"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container-wide mx-auto px-6 py-16 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          {/* Left Column - Contact & Connect */}
          <div className="flex flex-col gap-10 md:gap-12 md:flex-col lg:gap-12">
            <p className="font-clash-display text-4xl text-[#f6f8ff]-400 font-semibold">
              CLARK CREATIVE
            </p>
            <p className="font-clash-display text-4xl text-[#f6f8ff]-400 font-semibold -mt-10 md:-mt-14">
              GROUP
            </p>
            <h3 className="font-satoshi w-2/3 -mt-5 md:-mt-10 text-neutral-400">
              We partner with a small number of founders at a time. Every
              engagement gets our full attention and our full creativity.
            </h3>
            <div className="flex flex-col gap-8 md:flex-row lg:flex-col">
              <div>
                <h3 className="font-clash-display text-xs font-medium uppercase tracking-widest text-[#f6f8ff]">
                  CONTACT
                </h3>
                <p className="mt-2 font-satoshi text-sm text-neutral-400">
                  contact@clarkcreativegroup.com
                </p>
              </div>
              <div>
                <h3 className="font-clash-display text-xs font-medium uppercase tracking-widest text-[#f6f8ff]">
                  CONNECT
                </h3>
                <ul className="mt-2 space-y-1">
                  {socialPlatforms.map((platform) => (
                    <li key={platform}>
                      <a
                        href="#"
                        className="font-satoshi text-sm text-neutral-400 transition-colors hover:text-[#f6f8ff]"
                      >
                        {platform}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Inquiry Form */}
          <div>
            <h3 className="font-clash-display text-xs font-medium uppercase tracking-widest text-[#f6f8ff]">
              GET IN TOUCH
            </h3>
            <p className="mt-2 font-satoshi text-sm text-neutral-400">
              Thirty minutes. Your vision, your business, and where Space,
              Story, or System creates the most momentum.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name*"
                    value={formState.name}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, name: e.target.value }))
                    }
                    className="w-full border-b border-[#f6f8ff]/30 bg-transparent px-0 py-2 font-satoshi text-sm text-[#f6f8ff] placeholder-neutral-500 outline-none transition-colors focus:border-[#f6f8ff]"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                  )}
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email*"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, email: e.target.value }))
                    }
                    className="w-full border-b border-[#f6f8ff]/30 bg-transparent px-0 py-2 font-satoshi text-sm text-[#f6f8ff] placeholder-neutral-500 outline-none transition-colors focus:border-[#f6f8ff]"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                  )}
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formState.phone}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, phone: e.target.value }))
                    }
                    className="w-full border-b border-[#f6f8ff]/30 bg-transparent px-0 py-2 font-satoshi text-sm text-[#f6f8ff] placeholder-neutral-500 outline-none transition-colors focus:border-[#f6f8ff]"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={formState.company}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, company: e.target.value }))
                    }
                    className="w-full border-b border-[#f6f8ff]/30 bg-transparent px-0 py-2 font-satoshi text-sm text-[#f6f8ff] placeholder-neutral-500 outline-none transition-colors focus:border-[#f6f8ff]"
                  />
                </div>
              </div>
              <div>
                <div className="relative min-h-[180px] rounded border-b border-[#f6f8ff]/30 overflow-hidden">
                  <textarea
                    placeholder="Message*"
                    value={formState.message}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, message: e.target.value }))
                    }
                    rows={4}
                    className="relative z-10 w-full resize-none border-0 bg-transparent px-0 py-3 font-satoshi text-sm text-[#f6f8ff] placeholder-neutral-500 outline-none"
                  />
                </div>
                {errors.message && (
                  <p className="mt-1 text-xs text-red-400">{errors.message}</p>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="group flex items-center gap-3 text-sm font-medium tracking-wide text-[#f6f8ff] transition-opacity hover:opacity-80"
                >
                  <span>Let&apos;s Talk</span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#f6f8ff]/60 transition-colors group-hover:border-[#f6f8ff]">
                    <FiArrowRight className="h-3.5 w-3.5" />
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Utility Navigation Bar */}
      <div className="relative z-10 border-t border-[#f6f8ff]/20 bg-[#040b22]">
        <div className="container-wide mx-auto flex flex-col items-center justify-between gap-4 px-6 py-6 lg:flex-row lg:px-16">
          <a
            href="#"
            className="font-satoshi text-xs uppercase tracking-widest text-neutral-400 transition-colors hover:text-[#f6f8ff]"
          >
            Privacy / Cookies Policy
          </a>
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-satoshi text-xs uppercase tracking-widest text-neutral-400 transition-colors hover:text-[#f6f8ff]"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <span className="font-clash-display text-sm font-semibold tracking-wide">
            Clark Creative Group
          </span>
        </div>
      </div>

      {/* Technical Fine Print */}
      <div className="relative z-10 border-t border-[#f6f8ff]/20">
        <div className="container-wide mx-auto flex flex-col items-center justify-between gap-4 px-6 py-4 lg:flex-row lg:px-16">
          <p className="max-w-2xl text-center font-satoshi text-[10px] leading-relaxed text-neutral-500 lg:text-left">
            Creators of Visionary Lives and Businesses
          </p>
          <p className="shrink-0 font-satoshi text-[10px] text-neutral-500">
            © 2025 Clark Creative Group
          </p>
        </div>
      </div>
    </footer>
  );
}
