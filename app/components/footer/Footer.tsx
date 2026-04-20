"use client";

import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { usePageTransition } from "../transitions/TransitionProvider";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "/services", label: "SERVICES" },
  { href: "/contact", label: "CONTACT" },
];

const socialPlatforms = ["LinkedIn", "Instagram"];

export default function Footer() {
  const { navigateTo } = usePageTransition();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);

    const newErrors: Record<string, string> = {};
    if (!formState.name.trim()) newErrors.name = "Name is required";
    if (!formState.email.trim()) newErrors.email = "Email is required";
    else if (!formState.email.includes("@"))
      newErrors.email = "Enter a valid email";
    if (!formState.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const trimmedName = formState.name.trim();
    const space = trimmedName.indexOf(" ");
    const firstName =
      space === -1 ? trimmedName : trimmedName.slice(0, space).trim();
    const lastName =
      space === -1 ? "-" : trimmedName.slice(space + 1).trim() || "-";

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email: formState.email.trim(),
          message: formState.message.trim(),
          phone: formState.phone.trim() || undefined,
          company: formState.company.trim() || undefined,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setSubmitError(
          data?.error ?? "Something went wrong. Please try again.",
        );
        return;
      }

      setSubmitSuccess(true);
      setFormState({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });
    } catch {
      setSubmitError("Network error. Please check your connection and retry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="relative bg-background text-foreground border-t border-border/30 overflow-hidden z-10">
      {/* Main Content */}
      <div className="relative z-10 container-wide mx-auto px-6 py-16 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          {/* Left Column - Contact & Connect */}
          <div className="flex flex-col gap-10 md:gap-12 md:flex-col lg:gap-12">
            <p className="font-clash-display text-4xl text-foreground font-semibold">
              CLARK CREATIVE
            </p>
            <p className="font-clash-display text-4xl text-foreground font-semibold -mt-10 md:-mt-14">
              GROUP
            </p>
            <h3 className="font-satoshi w-2/3 -mt-5 md:-mt-10 text-muted-foreground">
              We partner with a small number of founders at a time. Every
              engagement gets our full attention and our full creativity. If
              you&apos;re building something that doesn&apos;t fit neatly into
              one category, we might be your people.
            </h3>
            <Link
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                navigateTo("/contact");
              }}
              className="self-start cursor-pointer bg-accent hover:bg-accent/80 px-5 py-2.5 font-satoshi text-xs font-bold uppercase text-accent-foreground tracking-widest transition-colors duration-300"
            >
              Let&apos;s Talk
            </Link>
            <div className="flex flex-col gap-8 md:flex-row lg:flex-col">
              <div>
                <h3 className="font-clash-display text-xs font-medium uppercase tracking-widest text-foreground">
                  CONTACT
                </h3>
                <p className="mt-2 font-satoshi text-sm text-muted-foreground">
                  contact@clarkcreativegroup.com
                </p>
              </div>
              <div>
                <h3 className="font-clash-display text-xs font-medium uppercase tracking-widest text-foreground">
                  CONNECT
                </h3>
                <ul className="mt-2 space-y-1">
                  {socialPlatforms.map((platform) => (
                    <li key={platform}>
                      <a
                        href="#"
                        className="font-satoshi text-sm text-muted-foreground transition-colors hover:text-foreground"
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
            <h3 className="font-clash-display text-xs font-medium uppercase tracking-widest text-foreground">
              GET IN TOUCH
            </h3>
            <p className="mt-2 font-satoshi text-sm text-muted-foreground">
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
                    className="w-full border-b border-border/30 bg-transparent px-0 py-2 font-satoshi text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-foreground"
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
                    className="w-full border-b border-border/30 bg-transparent px-0 py-2 font-satoshi text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-foreground"
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
                    className="w-full border-b border-border/30 bg-transparent px-0 py-2 font-satoshi text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-foreground"
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
                    className="w-full border-b border-border/30 bg-transparent px-0 py-2 font-satoshi text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-foreground"
                  />
                </div>
              </div>
              <div>
                <div className="relative min-h-[180px] rounded border-b border-border/30 overflow-hidden">
                  <textarea
                    placeholder="Message*"
                    value={formState.message}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, message: e.target.value }))
                    }
                    rows={4}
                    className="relative z-10 w-full resize-none border-0 bg-transparent px-0 py-3 font-satoshi text-sm text-foreground placeholder:text-muted-foreground outline-none"
                  />
                </div>
                {errors.message && (
                  <p className="mt-1 text-xs text-red-400">{errors.message}</p>
                )}
              </div>
              {submitError && (
                <p className="font-satoshi text-xs text-destructive">
                  {submitError}
                </p>
              )}
              {submitSuccess && (
                <p className="font-satoshi text-xs text-success">
                  Message sent. We&apos;ll be in touch soon.
                </p>
              )}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex items-center gap-3 text-sm font-medium tracking-wide text-foreground transition-opacity hover:opacity-80 disabled:pointer-events-none disabled:opacity-50"
                >
                  <span>{isSubmitting ? "Sending…" : "Let's Talk"}</span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border/60 transition-colors group-hover:border-foreground">
                    <FiArrowRight className="h-3.5 w-3.5" />
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Utility Navigation Bar */}
      <div className="relative z-10 border-t border-border/20 bg-background">
        <div className="container-wide mx-auto flex flex-col items-center justify-between gap-4 px-6 py-6 lg:flex-row lg:px-16">
          <a
            href="/privacy"
            onClick={(e) => {
              e.preventDefault();
              navigateTo("/privacy");
            }}
            className="font-satoshi text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            Privacy / Cookies Policy
          </a>
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  if (!link.href.startsWith("/")) return;
                  e.preventDefault();
                  navigateTo(link.href);
                }}
                className="font-satoshi text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
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
      <div className="relative z-10 border-t border-border/20">
        <div className="container-wide mx-auto flex flex-col items-center justify-between gap-4 px-6 py-4 lg:flex-row lg:px-16">
          <p className="max-w-2xl text-center font-satoshi text-[10px] leading-relaxed text-muted-foreground lg:text-left">
            Creators of Visionary Lives and Businesses
          </p>
          <p className="shrink-0 font-satoshi text-[10px] text-muted-foreground">
            © 2025 Clark Creative Group
          </p>
        </div>
      </div>
    </footer>
  );
}
