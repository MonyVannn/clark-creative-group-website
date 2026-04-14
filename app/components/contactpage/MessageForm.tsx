"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const inputClass =
  "w-full rounded-none border border-[#f6f8ff]/20 bg-[#040b22]/70 px-4 py-3 font-satoshi text-sm text-[#f6f8ff] placeholder:text-[#f6f8ff]/35 outline-none transition-colors focus:border-[#ffc878]";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const revealContainer: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: EASE_OUT,
      staggerChildren: 0.1,
    },
  },
};

const revealItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT },
  },
};

export default function MessageForm() {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
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
    if (!formState.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formState.lastName.trim())
      newErrors.lastName = "Last name is required";
    if (!formState.email.trim()) newErrors.email = "Email is required";
    if (!formState.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setSubmitError(
          data?.error ?? "Something went wrong. Please try again.",
        );
        return;
      }

      setSubmitSuccess(true);
      setFormState({ firstName: "", lastName: "", email: "", message: "" });
    } catch {
      setSubmitError("Network error. Please check your connection and retry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="mt-6 overflow-hidden rounded-none border border-[#f6f8ff]/20 bg-[#0a1228]/90"
      variants={revealContainer}
      initial="hidden"
      animate="show"
    >
      <div className="grid lg:grid-cols-[0.95fr_1.25fr]">
        <motion.aside
          variants={revealItem}
          className="border-b border-[#f6f8ff]/10 p-6 text-[#f6f8ff] sm:p-7 lg:border-b-0 lg:border-r"
        >
          <motion.h4
            variants={revealItem}
            className="font-clash-display text-2xl leading-tight text-[#f6f8ff] md:text-3xl"
          >
            Send a
            <br />
            Message
          </motion.h4>
          <motion.p
            variants={revealItem}
            className="font-satoshi mt-4 max-w-[30ch] text-sm leading-7 text-[#f6f8ff]/70"
          >
            Tell us about your goals, timeline, and what you need. We usually
            respond within one business day.
          </motion.p>
        </motion.aside>

        <motion.form
          variants={revealItem}
          onSubmit={handleSubmit}
          className="space-y-6 p-6 sm:p-7"
        >
          <motion.div variants={revealItem} className="grid gap-5 sm:grid-cols-2">
            <motion.div variants={revealItem}>
              <label
                htmlFor="contact-first-name"
                className="font-satoshi mb-2 block text-xs uppercase tracking-[0.14em] text-[#f6f8ff]/55"
              >
                First name *
              </label>
              <input
                id="contact-first-name"
                type="text"
                placeholder="Jane"
                value={formState.firstName}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, firstName: e.target.value }))
                }
                className={inputClass}
                autoComplete="given-name"
              />
              {errors.firstName && (
                <p className="mt-2 font-satoshi text-xs text-[#ff9a9a]">
                  {errors.firstName}
                </p>
              )}
            </motion.div>
            <motion.div variants={revealItem}>
              <label
                htmlFor="contact-last-name"
                className="font-satoshi mb-2 block text-xs uppercase tracking-[0.14em] text-[#f6f8ff]/55"
              >
                Last name *
              </label>
              <input
                id="contact-last-name"
                type="text"
                placeholder="Doe"
                value={formState.lastName}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, lastName: e.target.value }))
                }
                className={inputClass}
                autoComplete="family-name"
              />
              {errors.lastName && (
                <p className="mt-2 font-satoshi text-xs text-[#ff9a9a]">
                  {errors.lastName}
                </p>
              )}
            </motion.div>
          </motion.div>

          <motion.div variants={revealItem}>
            <label
              htmlFor="contact-email"
              className="font-satoshi mb-2 block text-xs uppercase tracking-[0.14em] text-[#f6f8ff]/55"
            >
              Email *
            </label>
            <input
              id="contact-email"
              type="email"
              placeholder="you@company.com"
              value={formState.email}
              onChange={(e) =>
                setFormState((s) => ({ ...s, email: e.target.value }))
              }
              className={inputClass}
              autoComplete="email"
            />
            {errors.email && (
              <p className="mt-2 font-satoshi text-xs text-[#ff9a9a]">
                {errors.email}
              </p>
            )}
          </motion.div>

          <motion.div variants={revealItem}>
            <label
              htmlFor="contact-message"
              className="font-satoshi mb-2 block text-xs uppercase tracking-[0.14em] text-[#f6f8ff]/55"
            >
              Message *
            </label>
            <textarea
              id="contact-message"
              placeholder="Share project details, goals, and anything we should know."
              value={formState.message}
              onChange={(e) =>
                setFormState((s) => ({ ...s, message: e.target.value }))
              }
              rows={6}
              className={`${inputClass} min-h-[170px] resize-y py-3.5`}
            />
            {errors.message && (
              <p className="mt-2 font-satoshi text-xs text-[#ff9a9a]">
                {errors.message}
              </p>
            )}
          </motion.div>

          {submitError && (
            <motion.p
              variants={revealItem}
              className="font-satoshi text-xs text-[#ff9a9a]"
            >
              {submitError}
            </motion.p>
          )}

          {submitSuccess && (
            <motion.p
              variants={revealItem}
              className="font-satoshi text-xs text-[#a8ffcb]"
            >
              Message sent — we&apos;ll be in touch soon.
            </motion.p>
          )}

          <motion.div
            variants={revealItem}
            className="flex items-center justify-between gap-4 pt-1"
          >
            <p className="font-satoshi text-xs text-[#f6f8ff]/55">
              We keep your details private and never share them.
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group inline-flex cursor-pointer items-center justify-between gap-2.5 rounded-none border border-[#f6f8ff]/25 bg-[#040b22] px-4 py-2.5 font-satoshi text-sm text-[#f6f8ff]/90 transition-colors hover:border-[#ffc878] hover:text-[#f6f8ff] disabled:pointer-events-none disabled:opacity-50"
            >
              <span>{isSubmitting ? "Sending…" : "Send message"}</span>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-none bg-[#f6f8ff]/10 transition-colors group-hover:bg-[#ffc878]">
                <FiArrowRight className="h-3.5 w-3.5 text-[#f6f8ff] transition-colors group-hover:text-[#040b22]" />
              </span>
            </button>
          </motion.div>
        </motion.form>
      </div>
    </motion.div>
  );
}
