"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useState } from "react";
import BookCallPanel from "./BookCallPanel";
import MessageForm from "./MessageForm";

type TabId = "message" | "book";

const TAB_BUTTON_CLASSES =
  "relative z-10 cursor-pointer rounded-none px-5 py-2.5 font-satoshi text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#f6f8ff]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#040b22]";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_IN: [number, number, number, number] = [0.4, 0, 1, 1];

const revealContainer: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: EASE_OUT,
      staggerChildren: 0.12,
    },
  },
};

const revealItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

const panelReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.25, ease: EASE_IN },
  },
};

export default function ContactFormsSection() {
  const [tab, setTab] = useState<TabId>("book");
  const messageTabId = "contact-message-tab";
  const bookTabId = "contact-book-tab";
  const messagePanelId = "contact-message-panel";
  const bookPanelId = "contact-book-panel";

  return (
    <section
      className="relative w-full pb-24 pt-8 md:pb-32"
      aria-label="Contact options"
    >
      <motion.div
        className="mx-auto w-full max-w-4xl"
        variants={revealContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2
          variants={revealItem}
          className="font-clash-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6"
        >
          Get in touch
        </motion.h2>
        <motion.p
          variants={revealItem}
          className="font-satoshi text-lg md:text-xl leading-relaxed text-[#f6f8ff]/80"
        >
          Send a message or book a discovery call—we&apos;ll follow up with next
          steps.
        </motion.p>

        <motion.div
          variants={revealItem}
          className="mt-10 flex justify-center md:justify-start"
          role="tablist"
          aria-label="Choose contact type"
        >
          <div className="inline-flex rounded-none border border-[#f6f8ff]/20 p-1">
            <div className="relative flex w-fit items-center rounded-none">
              <button
                type="button"
                role="tab"
                id={messageTabId}
                aria-selected={tab === "message"}
                aria-controls={messagePanelId}
                onClick={() => setTab("message")}
                className={`${TAB_BUTTON_CLASSES} ${
                  tab === "message"
                    ? "text-[#040b22]"
                    : "text-[#f6f8ff]/80 hover:text-[#f6f8ff]"
                }`}
              >
                Message
              </button>
              <button
                type="button"
                role="tab"
                id={bookTabId}
                aria-selected={tab === "book"}
                aria-controls={bookPanelId}
                onClick={() => setTab("book")}
                className={`${TAB_BUTTON_CLASSES} ${
                  tab === "book"
                    ? "text-[#040b22]"
                    : "text-[#f6f8ff]/80 hover:text-[#f6f8ff]"
                }`}
              >
                Book a call
              </button>
              <div
                className={`absolute inset-0 z-0 flex ${
                  tab === "book" ? "justify-end" : "justify-start"
                }`}
              >
                <motion.span
                  layout
                  transition={{
                    type: "spring",
                    damping: 15,
                    stiffness: 250,
                  }}
                  className="pointer-events-none h-full w-1/2 rounded-none bg-[#ffc878]"
                />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={revealItem} className="mt-8">
          <AnimatePresence mode="wait" initial={false}>
            {tab === "message" && (
              <motion.div
                key="message-panel"
                variants={panelReveal}
                initial="hidden"
                animate="show"
                exit="exit"
                role="tabpanel"
                id={messagePanelId}
                aria-labelledby={messageTabId}
              >
                <MessageForm />
              </motion.div>
            )}
            {tab === "book" && (
              <motion.div
                key="book-panel"
                variants={panelReveal}
                initial="hidden"
                animate="show"
                exit="exit"
                role="tabpanel"
                id={bookPanelId}
                aria-labelledby={bookTabId}
              >
                <BookCallPanel />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
}
