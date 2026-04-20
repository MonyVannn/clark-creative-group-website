"use client";

import { useMemo, useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  FiArrowRight,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiGlobe,
} from "react-icons/fi";

const TIMEZONES = [
  "America/Guayaquil",
  "America/Chicago",
  "America/New_York",
  "America/Los_Angeles",
  "America/Denver",
  "Europe/London",
  "UTC",
] as const;

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isWeekday(d: Date) {
  const day = d.getDay();
  return day >= 1 && day <= 5;
}

function getNextAvailableDate(baseDate: Date) {
  const start = startOfDay(baseDate);
  for (let i = 0; i < 45; i++) {
    const candidate = new Date(start);
    candidate.setDate(start.getDate() + i);
    if (isWeekday(candidate)) return candidate;
  }
  return start;
}

function formatTimeZoneLabel(tz: string) {
  try {
    const d = new Date();
    const offset =
      new Intl.DateTimeFormat("en-US", {
        timeZone: tz,
        timeZoneName: "longOffset",
      })
        .formatToParts(d)
        .find((p) => p.type === "timeZoneName")?.value ?? "";
    const abbr =
      new Intl.DateTimeFormat("en-US", {
        timeZone: tz,
        timeZoneName: "short",
      })
        .formatToParts(d)
        .find((p) => p.type === "timeZoneName")?.value ?? "";
    const suffix = abbr ? ` (${abbr})` : "";
    return `${offset} ${tz}${suffix}`;
  } catch {
    return tz;
  }
}

function formatSlot12(hour: number, minute: number) {
  const ref = new Date(2000, 0, 1, hour, minute, 0, 0);
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(ref);
}

function formatSlot24(hour: number, minute: number) {
  const ref = new Date(2000, 0, 1, hour, minute, 0, 0);
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(ref);
}

function buildSlotsForDay() {
  const slots: { hour: number; minute: number; label: string }[] = [];
  for (let h = 9; h <= 19; h++) {
    for (const m of [0, 30]) {
      slots.push({
        hour: h,
        minute: m,
        label: formatSlot12(h, m),
      });
    }
  }
  return slots;
}

const inputClass =
  "w-full rounded-none border border-[#f6f8ff]/20 bg-[#040b22]/70 px-4 py-3 font-satoshi text-sm text-[#f6f8ff] placeholder:text-[#f6f8ff]/35 outline-none transition-colors focus:border-[#ffc878]";

export default function BookCallPanel() {
  const today = useMemo(() => startOfDay(new Date()), []);
  const initialDate = useMemo(() => getNextAvailableDate(today), [today]);
  const [viewDate, setViewDate] = useState(() => new Date(initialDate));
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);
  const [selectedSlot, setSelectedSlot] = useState<{
    hour: number;
    minute: number;
  } | null>(() => {
    const [first] = buildSlotsForDay();
    return first ? { hour: first.hour, minute: first.minute } : null;
  });
  const [timeZone, setTimeZone] = useState<string>("America/Guayaquil");
  const [hourFormat, setHourFormat] = useState<"12h" | "24h">("12h");

  const [contactForm, setContactForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const calendarDays = useMemo(() => {
    const first = new Date(year, month, 1);
    const startPad = first.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: (Date | null)[] = [];
    for (let i = 0; i < startPad; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push(new Date(year, month, d));
    }
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [year, month]);

  const monthTitle = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(viewDate);

  const slots = selectedDate ? buildSlotsForDay() : [];

  const goMonth = (delta: number) => {
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + delta, 1));
  };

  const selectedDayLabel = selectedDate
    ? new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
        selectedDate,
      )
    : "Pick";
  const selectedDayDate = selectedDate
    ? new Intl.DateTimeFormat("en-US", { day: "numeric" }).format(selectedDate)
    : "--";

  const formatSlot = (hour: number, minute: number) =>
    hourFormat === "12h"
      ? formatSlot12(hour, minute)
      : formatSlot24(hour, minute);

  const selectedSlotLabel = selectedSlot
    ? formatSlot(selectedSlot.hour, selectedSlot.minute)
    : null;

  const selectedDateLabel = selectedDate
    ? new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }).format(selectedDate)
    : null;

  const canSubmit =
    !!selectedDate && !!selectedSlot && !isSubmitting && !submitSuccess;

  const handleSubmit = async () => {
    setSubmitError(null);

    const errs: Record<string, string> = {};
    if (!contactForm.firstName.trim())
      errs.firstName = "First name is required";
    if (!contactForm.lastName.trim()) errs.lastName = "Last name is required";
    if (!contactForm.email.trim() || !contactForm.email.includes("@"))
      errs.email = "A valid email is required";
    if (!selectedDate) errs.date = "Select a date";
    if (!selectedSlot) errs.slot = "Select a time slot";
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setIsSubmitting(true);
    try {
      const dateStr = [
        selectedDate!.getFullYear(),
        String(selectedDate!.getMonth() + 1).padStart(2, "0"),
        String(selectedDate!.getDate()).padStart(2, "0"),
      ].join("-");

      const res = await fetch("/api/request-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: contactForm.firstName,
          lastName: contactForm.lastName,
          email: contactForm.email,
          date: dateStr,
          hour: selectedSlot!.hour,
          minute: selectedSlot!.minute,
          timeZone,
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
      <div className="grid lg:grid-cols-[1.05fr_1.45fr_1fr]">
        <motion.aside
          variants={revealItem}
          className="border-b border-[#f6f8ff]/10 p-6 text-[#f6f8ff] md:p-7 lg:border-b-0 lg:border-r"
        >
          <h3 className="font-clash-display text-2xl leading-tight text-[#f6f8ff] md:text-3xl">
            30 Min Discovery
            <br />
            Call
          </h3>
          <p className="font-satoshi mt-4 max-w-[30ch] text-sm leading-7 text-[#f6f8ff]/70">
            A quick video call to get to know each other, and hear a little bit
            about your project.
          </p>
          <p className="font-satoshi mt-4 max-w-[30ch] text-sm leading-7 text-[#f6f8ff]/70">
            We welcome any questions you may have.
          </p>

          <div className="mt-8 space-y-4 font-satoshi text-sm text-[#f6f8ff]/85">
            <div className="flex items-center gap-3">
              <FiClock className="h-4 w-4 text-[#f6f8ff]/60" />
              <span>30m</span>
            </div>
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="h-3 w-3 rounded-none bg-[conic-gradient(from_180deg,#24d366_0deg,#fbbc05_140deg,#4285f4_260deg,#ea4335_360deg)]"
              />
              <span>Google Meet</span>
            </div>
          </div>
        </motion.aside>

        <motion.section
          variants={revealItem}
          className="border-b border-[#f6f8ff]/10 p-6 text-[#f6f8ff] sm:p-7 lg:border-b-0 lg:border-r"
        >
          <div className="mb-5 flex items-center justify-between">
            <h4 className="font-satoshi text-xl font-medium tracking-tight text-[#f6f8ff] md:text-2xl">
              {monthTitle}
            </h4>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => goMonth(-1)}
                className="cursor-pointer rounded-none p-2 text-[#f6f8ff]/70 transition-colors hover:bg-[#f6f8ff]/10 hover:text-[#f6f8ff]"
                aria-label="Previous month"
              >
                <FiChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => goMonth(1)}
                className="cursor-pointer rounded-none p-2 text-[#f6f8ff]/70 transition-colors hover:bg-[#f6f8ff]/10 hover:text-[#f6f8ff]"
                aria-label="Next month"
              >
                <FiChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-y-1 text-center font-satoshi text-xs tracking-wide text-[#f6f8ff]/45">
            {WEEKDAYS.map((d) => (
              <div key={d} className="pb-1 font-medium uppercase">
                {d}
              </div>
            ))}
            {calendarDays.map((cell, i) => {
              if (!cell) return <div key={`empty-${i}`} className="h-10" />;
              const past = cell < today;
              const isSelected = selectedDate && isSameDay(cell, selectedDate);
              const isAvailable = isWeekday(cell) && !past;
              return (
                <button
                  key={`${cell.getFullYear()}-${cell.getMonth()}-${cell.getDate()}`}
                  type="button"
                  disabled={!isAvailable}
                  onClick={() => {
                    setSelectedDate(cell);
                    const [firstSlot] = buildSlotsForDay();
                    setSelectedSlot(
                      firstSlot
                        ? { hour: firstSlot.hour, minute: firstSlot.minute }
                        : null,
                    );
                  }}
                  className={`mx-auto flex h-10 w-10 items-center justify-center rounded-none font-satoshi text-[15px] transition-colors ${
                    isSelected
                      ? "bg-[#ffc878] text-[#040b22]"
                      : isAvailable
                        ? "cursor-pointer bg-[#f6f8ff]/10 text-[#f6f8ff] hover:bg-[#f6f8ff]/20"
                        : "cursor-not-allowed text-[#f6f8ff]/30"
                  }`}
                >
                  {cell.getDate()}
                </button>
              );
            })}
          </div>
          <div className="mt-6 rounded-none border border-[#f6f8ff]/15 bg-[#040b22]/55 px-4 py-3">
            <p className="font-satoshi text-[11px] uppercase tracking-[0.14em] text-[#f6f8ff]/45">
              Selected slot
            </p>
            <p className="font-satoshi mt-1.5 text-sm text-[#f6f8ff]/90">
              {selectedDateLabel && selectedSlotLabel
                ? `${selectedDateLabel}, ${selectedSlotLabel}`
                : "Choose a date and time"}
            </p>
          </div>

          <div className="mt-5 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="call-first-name"
                  className="font-satoshi mb-1.5 block text-xs uppercase tracking-[0.14em] text-[#f6f8ff]/55"
                >
                  First name *
                </label>
                <input
                  id="call-first-name"
                  type="text"
                  placeholder="Jane"
                  value={contactForm.firstName}
                  onChange={(e) =>
                    setContactForm((s) => ({ ...s, firstName: e.target.value }))
                  }
                  className={inputClass}
                  autoComplete="given-name"
                />
                {fieldErrors.firstName && (
                  <p className="mt-1 font-satoshi text-xs text-[#ff9a9a]">
                    {fieldErrors.firstName}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="call-last-name"
                  className="font-satoshi mb-1.5 block text-xs uppercase tracking-[0.14em] text-[#f6f8ff]/55"
                >
                  Last name *
                </label>
                <input
                  id="call-last-name"
                  type="text"
                  placeholder="Doe"
                  value={contactForm.lastName}
                  onChange={(e) =>
                    setContactForm((s) => ({ ...s, lastName: e.target.value }))
                  }
                  className={inputClass}
                  autoComplete="family-name"
                />
                {fieldErrors.lastName && (
                  <p className="mt-1 font-satoshi text-xs text-[#ff9a9a]">
                    {fieldErrors.lastName}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="call-email"
                className="font-satoshi mb-1.5 block text-xs uppercase tracking-[0.14em] text-[#f6f8ff]/55"
              >
                Email *
              </label>
              <input
                id="call-email"
                type="email"
                placeholder="you@company.com"
                value={contactForm.email}
                onChange={(e) =>
                  setContactForm((s) => ({ ...s, email: e.target.value }))
                }
                className={inputClass}
                autoComplete="email"
              />
              {fieldErrors.email && (
                <p className="mt-1 font-satoshi text-xs text-[#ff9a9a]">
                  {fieldErrors.email}
                </p>
              )}
            </div>
          </div>
        </motion.section>

        <motion.section
          variants={revealItem}
          className="p-6 text-[#f6f8ff] sm:p-7 justify-between flex flex-col"
        >
          <div>
            <div className="flex items-start justify-between">
              <h4 className="font-satoshi text-xl font-medium tracking-tight text-[#f6f8ff] md:text-2xl">
                {selectedDayLabel} {selectedDayDate}
              </h4>
              <div className="inline-flex bg-[#040b22]">
                <button
                  type="button"
                  onClick={() => setHourFormat("12h")}
                  className={`cursor-pointer rounded-none px-3 py-1.5 font-satoshi text-sm transition-colors ${
                    hourFormat === "12h"
                      ? "bg-[#ffc878] text-[#040b22]"
                      : "text-[#f6f8ff]/70 hover:text-[#f6f8ff]"
                  }`}
                >
                  12h
                </button>
                <button
                  type="button"
                  onClick={() => setHourFormat("24h")}
                  className={`cursor-pointer rounded-none px-3 py-1.5 font-satoshi text-sm transition-colors ${
                    hourFormat === "24h"
                      ? "bg-[#ffc878] text-[#040b22]"
                      : "text-[#f6f8ff]/70 hover:text-[#f6f8ff]"
                  }`}
                >
                  24h
                </button>
              </div>
            </div>

            <ul
              data-lenis-prevent
              data-lenis-prevent-wheel
              data-lenis-prevent-touch
              className="mt-5 h-[260px] space-y-3 overflow-y-auto overscroll-y-contain pr-1"
            >
              {slots.map((slot) => {
                const active =
                  selectedSlot?.hour === slot.hour &&
                  selectedSlot?.minute === slot.minute;
                return (
                  <li key={`${slot.hour}-${slot.minute}`}>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedSlot({
                          hour: slot.hour,
                          minute: slot.minute,
                        })
                      }
                      className={`w-full cursor-pointer rounded-none border px-4 py-2.5 text-left font-satoshi text-xl leading-none transition-colors ${
                        active
                          ? "border-[#ffc878] bg-[#ffc878]/15 text-[#f6f8ff]"
                          : "border-[#f6f8ff]/35 bg-[#040b22]/80 text-[#f6f8ff] hover:border-[#f6f8ff]/60 hover:bg-[#f6f8ff]/10"
                      }`}
                    >
                      {formatSlot(slot.hour, slot.minute)}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="relative mt-5">
              <FiGlobe className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#f6f8ff]/60" />
              <select
                value={timeZone}
                onChange={(e) => setTimeZone(e.target.value)}
                className="w-full cursor-pointer appearance-none rounded-none border border-[#f6f8ff]/35 bg-[#040b22]/80 py-2.5 pl-9 pr-8 font-satoshi text-sm text-[#f6f8ff] outline-none transition-colors hover:border-[#f6f8ff]/60 hover:bg-[#f6f8ff]/10 focus:border-[#ffc878]"
                aria-label="Select time zone"
              >
                {TIMEZONES.map((tz) => (
                  <option key={tz} value={tz} className="bg-[#0a1228] text-[#f6f8ff]">
                    {formatTimeZoneLabel(tz)}
                  </option>
                ))}
              </select>
              <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#f6f8ff]/60" />
            </div>
          </div>
          <div>
            {submitError && (
              <p className="mt-4 font-satoshi text-xs text-[#ff9a9a]">
                {submitError}
              </p>
            )}

            {submitSuccess && (
              <p className="mt-4 font-satoshi text-xs text-[#a8ffcb]">
                Request sent. We&apos;ll be in touch soon.
              </p>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="group mt-4 inline-flex w-full cursor-pointer items-center justify-between gap-2.5 rounded-none border border-[#f6f8ff]/25 bg-[#040b22] px-4 py-2 font-satoshi text-sm font-medium text-[#f6f8ff]/90 transition-colors hover:border-[#ffc878] hover:text-[#f6f8ff] disabled:cursor-not-allowed disabled:border-[#f6f8ff]/15 disabled:text-[#f6f8ff]/40"
              aria-label={
                selectedDateLabel && selectedSlotLabel
                  ? `Request call for ${selectedDateLabel} at ${selectedSlotLabel}`
                  : "Select a date and time to request a call"
              }
            >
              <span>
                {isSubmitting
                  ? "Sending…"
                  : submitSuccess
                    ? "Request sent"
                    : "Request call"}
              </span>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-none bg-[#f6f8ff]/10 transition-colors group-hover:bg-[#ffc878] group-disabled:bg-[#f6f8ff]/5">
                <FiArrowRight className="h-3.5 w-3.5 text-[#f6f8ff] transition-colors group-hover:text-[#040b22] group-disabled:text-[#f6f8ff]/45" />
              </span>
            </button>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}
