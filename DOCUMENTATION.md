# Clark Creative Group — Technical Documentation

> **Audience:** This document is written for any developer, technical contractor, or engineer who takes over maintenance or development of this project. It covers everything needed to understand, run, modify, and extend the site.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Repository Structure](#2-repository-structure)
3. [Tech Stack](#3-tech-stack)
4. [All Dependencies Explained](#4-all-dependencies-explained)
5. [Third-Party Services](#5-third-party-services)
6. [Environment Variables](#6-environment-variables)
7. [Getting Started — Local Development](#7-getting-started--local-development)
8. [Pages & Routing](#8-pages--routing)
9. [API Routes](#9-api-routes)
10. [Component Architecture](#10-component-architecture)
11. [Animation System](#11-animation-system)
12. [Styling & Design System](#12-styling--design-system)
13. [Typography & Fonts](#13-typography--fonts)
14. [SEO & Metadata](#14-seo--metadata)
15. [Image Handling](#15-image-handling)
16. [Key Patterns & Conventions](#16-key-patterns--conventions)
17. [Deployment](#17-deployment)
18. [Replacing or Switching Third-Party Services](#18-replacing-or-switching-third-party-services)

---

## 1. Project Overview

**Site:** [https://clarkcreativegroup.com](https://clarkcreativegroup.com)  
**Business:** Clark Creative Group — a creative advisory for founders, built around three pillars: **Space**, **Story**, and **System**.  
**Founded by:** Roger and Hattie Clark.  
**Contact email (public):** contact@clarkcreativegroup.com

The website is a marketing/branding site. Its goals are:

- Present the CCG brand and services to potential founder clients.
- Allow visitors to send a contact message or book a discovery call.
- Establish credibility through design quality, testimonials, and team profiles.

---

## 2. Repository Structure

```
clark-creative-group-website/
├── app/                          # Next.js App Router — all pages, components, API routes
│   ├── layout.tsx                # Root layout: fonts, providers, global metadata
│   ├── page.tsx                  # Homepage (/)
│   ├── about/page.tsx            # About page (/about)
│   ├── services/page.tsx         # Services page (/services)
│   ├── contact/page.tsx          # Contact page (/contact)
│   ├── privacy/page.tsx          # Privacy & Cookies Policy (/privacy)
│   ├── not-found.tsx             # Custom 404 page
│   ├── robots.ts                 # Auto-generates /robots.txt
│   ├── sitemap.ts                # Auto-generates /sitemap.xml
│   ├── globals.css               # Global styles, CSS variables, Tailwind import
│   ├── favicon.ico
│   ├── api/                      # Server-side API routes
│   │   ├── contact/route.ts      # POST /api/contact — sends email via Resend
│   │   └── request-call/route.ts # POST /api/request-call — sends call booking via Resend
│   ├── components/               # All React components (organized by page/feature)
│   │   ├── header/
│   │   ├── footer/
│   │   ├── layout/
│   │   ├── transitions/
│   │   ├── seo/
│   │   ├── ui/                   # Reusable/generic UI components
│   │   ├── homepage/
│   │   ├── aboutpage/
│   │   ├── servicespage/
│   │   ├── contactpage/
│   │   ├── privacypage/
│   │   ├── notfoundpage/
│   │   ├── LoadingScreen.tsx
│   │   └── PreloaderContext.tsx
│   └── lib/
│       └── theme.ts              # Brand color tokens (mirrors CSS variables)
├── public/                       # Static assets served at /
│   ├── fonts/                    # Self-hosted font files (Clash Display, Satoshi, Excalifont)
│   ├── logo.png
│   ├── topography.svg            # Subtle repeating background pattern
│   ├── hattie.png, roger.png … # Team & content images
│   └── …
├── next.config.ts                # Next.js config (allowed image domains)
├── tsconfig.json                 # TypeScript config
├── eslint.config.mjs             # ESLint config
├── postcss.config.mjs            # PostCSS config (for Tailwind v4)
├── pnpm-lock.yaml                # Lockfile — always commit this
├── pnpm-workspace.yaml           # pnpm workspace config
└── package.json                  # Scripts and dependencies
```

---

## 3. Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | **Next.js** (App Router) | 16.1.6 |
| Language | **TypeScript** | ^5 |
| UI Library | **React** | 19.2.3 |
| Styling | **Tailwind CSS v4** | ^4 |
| Package Manager | **pnpm** | (see lockfile) |
| Deployment | **Vercel** (recommended) | — |

---

## 4. All Dependencies Explained

### Production Dependencies

#### `next` (16.1.6)
The core framework. Uses the **App Router** (`app/` directory). This means pages are React Server Components by default; components that need browser APIs or interactivity are marked `"use client"`.

Key Next.js features in use:
- App Router file-based routing
- `layout.tsx` / `page.tsx` conventions
- `next/font` for optimized font loading
- `next/image` for optimized images
- Route Handlers (`app/api/**`) for server-side API endpoints
- `generateMetadata` / `metadata` exports for SEO
- Built-in `sitemap.ts` and `robots.ts` generators

#### `react` & `react-dom` (19.2.3)
Core React. React 19 is used — this is the latest major version and introduces improvements to transitions, hydration, and server/client rendering.

#### `typescript` (^5)
TypeScript is used throughout. Strict mode is enabled (`"strict": true` in `tsconfig.json`). The path alias `@/*` maps to the project root.

---

### Animation Libraries

#### `gsap` (^3.14.2) + `@gsap/react` (^2.1.2)
**GreenSock Animation Platform** — the primary animation engine.

- `gsap` provides the core animation API (`gsap.to`, `gsap.from`, `gsap.fromTo`, timelines).
- `ScrollTrigger` plugin: scroll-based animations (elements animate as you scroll).
- `SplitText` plugin: splits text into characters, words, or lines for staggered animations.
- `@gsap/react` provides the `useGSAP` hook — a React-aware wrapper for GSAP that ensures proper cleanup on component unmount.
- `gsap.matchMedia()` is used for responsive animations (different behavior on desktop vs mobile).

**Important:** GSAP's `autoRaf` is disabled. Instead, the GSAP ticker is driven by Lenis (see below). This keeps smooth scroll and scroll-triggered animations perfectly in sync.

#### `lenis` (1.3.18-dev.0)
**Lenis** provides buttery-smooth scrolling. It overrides native scroll behavior with an eased, interpolated version.

- Wrapped in `LenisProvider` (`app/components/layout/LenisProvider.tsx`).
- `LenisScrollTriggerSync` (`app/components/layout/LenisScrollTriggerSync.tsx`) hooks into the GSAP ticker to feed Lenis's RAF loop, ensuring `ScrollTrigger` positions are always accurate.
- Config: duration `1.2s`, exponential easing, smooth wheel enabled, touch sync disabled.

#### `framer-motion` (^12.34.3)
**Framer Motion** is used for declarative component-level animations.

Used in:
- `LoadingScreen.tsx` — `AnimatePresence` + `motion.div` for fade-out of the preloader.
- `MessageForm.tsx` and `BookCallPanel.tsx` — stagger reveal animations on form fields.
- `Header.tsx` — hover animation on nav links.

---

### 3D / WebGL Libraries

#### `three` (^0.183.2) + `@react-three/fiber` (^9.5.0) + `@react-three/drei` (^10.7.7)
The full **Three.js** stack for 3D rendering inside React.

- `three` is the core WebGL library.
- `@react-three/fiber` is the React renderer for Three.js — lets you write Three.js scenes as JSX.
- `@react-three/drei` provides helper components (orbit controls, shaders, loaders, etc.).

Used in the sketch/model components inside `app/components/ui/CoreOverview/` and `app/components/ui/HeroSectionHomepage/`:
- `SpaceSketchModel.tsx` — 3D sketch for the "Space" pillar card.
- `StorySketchModel.tsx` — 3D sketch for the "Story" pillar card.
- `SystemSketchModel.tsx` — 3D sketch for the "System" pillar card.
- `Hexa.tsx` / `HexaSketch.tsx` — Large 3D hexagon visual in the hero section.

#### `ogl` (^1.0.11)
**OGL** is a minimal WebGL library (lighter than Three.js). Used in specific low-level shader/canvas effects where Three.js overhead is not needed.

---

### Other UI & Utility Libraries

#### `split-type` (^0.3.4)
A lightweight library for splitting text elements into spans at the character, word, or line level. Used alongside GSAP's `SplitText` plugin for text reveal animations.

#### `lottie-react` (^2.4.1)
Renders **Lottie** animations (JSON-based vector animations exported from After Effects or similar tools). Available for use — check the components directory for any `.json` animation files in `public/`.

#### `react-icons` (^5.5.0)
Icon library providing hundreds of icon packs. In this project, **Feather Icons** (the `Fi` prefix) are used exclusively — e.g., `FiArrowRight`, `FiChevronDown`, `FiGlobe`, `FiClock`.

#### `unicornstudio-react` (2.0.1-1)
**Unicorn Studio** is a no-code motion design tool that exports interactive animated scenes as React components. If there are Unicorn Studio scenes embedded, they will appear as `<UnicornStudio … />` components. Log in at [app.unicorn.studio](https://app.unicorn.studio) to edit those scenes.

#### `resend` (^6.11.0)
The email-sending SDK (see [Section 5](#5-third-party-services)).

---

### Dev Dependencies

| Package | Purpose |
|---|---|
| `@tailwindcss/postcss` | PostCSS plugin to process Tailwind v4 |
| `tailwindcss` (^4) | Utility-first CSS framework (v4 uses a CSS-first config) |
| `@types/node`, `@types/react`, `@types/react-dom`, `@types/three` | TypeScript type definitions |
| `eslint` + `eslint-config-next` | Linting with Next.js rules |

---

## 5. Third-Party Services

### Resend (Email)

**What it is:** [Resend](https://resend.com) is a transactional email API. It is the only external service the application calls at runtime.

**How it is used:**  
Two API routes use Resend to send plain-text notification emails to the Clark Creative Group inbox whenever someone submits a form:

1. **Contact Form** (`POST /api/contact`) — sends when someone fills out the "Send a Message" form (on the Contact page and in the Footer).
2. **Book a Call** (`POST /api/request-call`) — sends when someone requests a call via the date/time picker on the Contact page.

**Emails sent contain:**
- Sender's name and email (set as `replyTo` so you can reply directly)
- Message content or requested call slot + timezone
- Optional phone number, company name, or notes

**Where to manage it:**  
Log in at [resend.com](https://resend.com). Under your account you will find:
- **API Keys** — the value for `RESEND_API_KEY`
- **Domains** — your verified sending domain (the domain used in `RESEND_FROM`)
- **Logs** — history of all sent emails and any errors

**What happens if Resend is down or the key is invalid:**  
The API routes return a `502` error and the form displays "Failed to send message. Please try again." No emails are lost to a queue — the user must resubmit.

**How to replace Resend:** See [Section 18](#18-replacing-or-switching-third-party-services).

---

### Unsplash (Remote Images)

Images hosted on `images.unsplash.com` and `plus.unsplash.com` are allowed through Next.js's `remotePatterns` config in `next.config.ts`. If any page uses `<Image src="https://images.unsplash.com/…" />`, this is where that permission lives.

---

## 6. Environment Variables

The application requires three environment variables to be set in your hosting environment (e.g., Vercel project settings). **None of these should ever be committed to the repository.**

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | ✅ Yes | Your Resend API key. Found in the Resend dashboard under **API Keys**. Format: `re_xxxxxxxxxxxxxxxx` |
| `RESEND_FROM` | ✅ Yes | The "from" email address for outgoing emails. Must be a verified sender in Resend. Example: `"Clark Creative Group <contact@clarkcreativegroup.com>"` |
| `CONTACT_TO_EMAIL` | ✅ Yes | The recipient email address — where contact form submissions and call requests are delivered. Example: `contact@clarkcreativegroup.com` |

**For local development**, create a `.env.local` file in the project root (this file is already in `.gitignore`):

```env
RESEND_API_KEY=re_your_key_here
RESEND_FROM=Your Name <you@yourdomain.com>
CONTACT_TO_EMAIL=recipient@yourdomain.com
```

---

## 7. Getting Started — Local Development

### Prerequisites

- **Node.js** ≥ 18.x (Node 20 LTS recommended)
- **pnpm** — install with `npm install -g pnpm`

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/MonyVannn/clark-creative-group-website.git
cd clark-creative-group-website

# 2. Install dependencies
pnpm install

# 3. Set up environment variables
cp .env.local.example .env.local   # if an example file exists, otherwise create manually
# Then fill in RESEND_API_KEY, RESEND_FROM, CONTACT_TO_EMAIL

# 4. Start the development server
pnpm dev
```

The site will be available at **http://localhost:3000**.

### Other Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server with hot reload |
| `pnpm build` | Build for production (runs type checking) |
| `pnpm start` | Start production server (after `pnpm build`) |
| `pnpm lint` | Run ESLint |

---

## 8. Pages & Routing

This project uses the **Next.js App Router**. Each folder inside `app/` with a `page.tsx` file becomes a route.

### Route Map

| URL | File | Description |
|---|---|---|
| `/` | `app/page.tsx` | **Homepage** — Hero, Intro, Core Overview (3 pillars), Whole Picture, How We Work, Testimonials |
| `/about` | `app/about/page.tsx` | **About page** — Hero, Team profiles (Roger & Hattie Clark), Vision section |
| `/services` | `app/services/page.tsx` | **Services page** — Hero, detailed service breakdowns, How We Work process |
| `/contact` | `app/contact/page.tsx` | **Contact page** — Hero, two-panel section: "Send a Message" form + "Book a Call" calendar widget |
| `/privacy` | `app/privacy/page.tsx` | **Privacy & Cookies Policy** — static legal text |
| `*` (404) | `app/not-found.tsx` | **Custom 404 page** — styled 404 with navigation back to homepage |
| `/sitemap.xml` | `app/sitemap.ts` | Auto-generated XML sitemap |
| `/robots.txt` | `app/robots.ts` | Auto-generated robots file |

### Navigation Links

The header contains: **HOME**, **ABOUT**, **SERVICES**, and a **CONTACT US** CTA button.  
The footer repeats: **HOME**, **ABOUT**, **SERVICES**, **CONTACT**.  
The mobile nav (hamburger menu) contains all four links.

---

## 9. API Routes

Both routes live under `app/api/` and are Next.js **Route Handlers** (server-side, no client bundle impact).

---

### `POST /api/contact`

**Used by:**
- `app/components/contactpage/MessageForm.tsx` (Contact page)
- `app/components/footer/Footer.tsx` (Footer inline form)

**Request body (JSON):**
```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane@example.com",
  "message": "Hello, I'd like to work with you.",
  "phone": "+1 555 000 0000",    // optional
  "company": "Acme Inc."          // optional
}
```

**Validation rules (server-side):**
- `firstName`, `lastName`: required, max 100 characters
- `email`: required, must contain `@`
- `message`: required, max 10,000 characters
- `phone`: optional, max 50 characters
- `company`: optional, max 200 characters

**Success response:** `{ "ok": true }` — HTTP 200  
**Error responses:** HTTP 400 (validation), HTTP 500/502 (server/Resend error)

**Email sent:** Subject line `New contact: Jane Doe`, plain-text body with all fields, `replyTo` set to the submitter's email.

---

### `POST /api/request-call`

**Used by:**
- `app/components/contactpage/BookCallPanel.tsx` (Contact page)

**Request body (JSON):**
```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane@example.com",
  "date": "2025-09-15",           // YYYY-MM-DD
  "hour": 10,                      // 0–23
  "minute": 0,                     // 0 or 30 (half-hour slots only)
  "timeZone": "America/New_York",  // IANA timezone string
  "notes": "Optional context"      // optional, max 2,000 characters
}
```

**Validation rules (server-side):**
- `firstName`, `lastName`: required, max 100 characters
- `email`: required, must contain `@`
- `date`: required, must match `YYYY-MM-DD`
- `hour`: required, integer 0–23
- `minute`: required, must be `0` or `30`
- `timeZone`: required, must be a valid IANA timezone (validated against `Intl.supportedValuesOf("timeZone")`)
- `notes`: optional, max 2,000 characters

**Success response:** `{ "ok": true }` — HTTP 200  
**Email sent:** Subject `Call request: Jane Doe, Sep 15 10:00 AM`, with full formatted date/time and timezone in the body.

---

## 10. Component Architecture

### Global Providers (in `app/layout.tsx`)

The root layout wraps all pages in the following provider hierarchy (outermost to innermost):

```
LenisProvider          → Smooth scroll
  PreloaderProvider    → Tracks whether the loading screen has completed
    LoadingScreen      → Shows the animated preloader; renders children after complete
      TransitionProvider → Handles page-to-page transition animations
        {children}     → The actual page content
```

Understanding this hierarchy is important when debugging animation timing issues.

---

### `LoadingScreen` (`app/components/LoadingScreen.tsx`)

A full-screen preloader shown on every page load. It:
1. Waits for `document.fonts.ready` (fonts loaded → progress to 40%).
2. Waits for `window` load event (all assets → progress to 100%).
3. Has a 4-second safety fallback that forces completion if something stalls.
4. Animates a left-side progress bar and a large percentage counter.
5. Locks scroll (`overflow: hidden` on `body`) while loading.
6. Fades out using Framer Motion's `AnimatePresence`.
7. Sets `isPreloaderComplete = true` in `PreloaderContext` when done.

**Why this matters for animations:** Most GSAP animations (via `useGSAP` hooks) check `isPreloaderComplete` before starting. This prevents scroll-triggered animations from firing during the preloader, which would cause them to be missed.

---

### `PreloaderContext` (`app/components/PreloaderContext.tsx`)

A simple React context with one boolean: `isPreloaderComplete`. Any component that should wait until the page has fully loaded before animating consumes this context via `usePreloader()`.

---

### `TransitionProvider` (`app/components/transitions/TransitionProvider.tsx`)

Handles page-to-page transitions. When `navigateTo(href)` is called:
1. Six vertical columns (styled with the gold accent color) slide up from the bottom, covering the screen.
2. After animation completes, `router.push(href)` navigates to the new page.
3. On the new page, the columns animate upward and off screen.

**Hook exposed:** `usePageTransition()` — returns `{ navigateTo }`.  
**Usage:** All internal navigation links use `navigateTo` instead of plain `<Link>` to ensure the transition plays.

---

### `LenisProvider` + `LenisScrollTriggerSync`

- `LenisProvider` wraps the whole app to enable smooth scrolling.
- `LenisScrollTriggerSync` is a small utility component rendered inside `LenisProvider` that connects Lenis's scroll events to GSAP's `ScrollTrigger.update()` and drives Lenis via the GSAP ticker. This is the standard integration pattern and is critical for scroll-based animations to work correctly.

---

### Header (`app/components/header/Header.tsx`)

- Sticky, transparent, with `backdrop-blur`.
- Shows logo (image + text), nav links (desktop), mobile hamburger menu.
- All nav links use `usePageTransition().navigateTo` for animated transitions.
- Active page gets an underline indicator.

### Mobile Nav (`app/components/header/MobileNav.tsx`)

- Hamburger button that opens a full-screen overlay nav.
- Contains all four nav links + social platform links.

### Footer (`app/components/footer/Footer.tsx`)

- Two-column layout: left has brand info + "Let's Talk" CTA; right has an inline contact form.
- The inline form posts to `/api/contact`.
- Bottom bar has Privacy link, nav links, and copyright.

---

### Contact Page Components

#### `ContactFormsSection` (`app/components/contactpage/ContactFormsSection.tsx`)
Tab/panel container that switches between `MessageForm` and `BookCallPanel`.

#### `MessageForm` (`app/components/contactpage/MessageForm.tsx`)
Full-featured contact form with first name, last name, email, and message. Posts to `/api/contact`. Uses Framer Motion for stagger-reveal animations.

#### `BookCallPanel` (`app/components/contactpage/BookCallPanel.tsx`)
A custom-built calendar/time picker (no external scheduling library). Features:
- Month calendar with weekday-only selectable dates (weekends disabled).
- Time slot picker (half-hour increments, standard business hours).
- Timezone selector with pre-defined IANA timezone options.
- Optional notes field.
- Posts to `/api/request-call`.

---

### UI Components (`app/components/ui/`)

| Component | Description |
|---|---|
| `SplitText.tsx` | Wraps GSAP's `SplitText` plugin; splits text and animates characters/words/lines on scroll. Waits for fonts and preloader to complete before animating. |
| `AnimatedCopy.tsx` | Simpler text animation component using GSAP for copy reveal effects. |
| `CopyReveal.tsx` | Block-wipe text reveal effect (a block slides over the text to reveal it). |
| `Line.tsx` | Animated decorative line separator. |
| `RotationLine.tsx` | A rotating/animated line element. |
| `NeuFollowButton.tsx` | Neumorphic-style button that follows the cursor. |
| `VisionStyleCard.tsx` | Card component used on the About page for vision statements. |
| `RectangleSketch.tsx` | Excalifont-style sketched rectangle illustration. |
| `SquareSketch.tsx` | Excalifont-style sketched square illustration. |
| `HeroSectionHomepage/Hexa.tsx` | 3D hexagon (Three.js/OGL) — the large animated shape in the homepage hero. |
| `HeroSectionHomepage/HexaSketch.tsx` | Sketch/line version of the hexagon shape. |
| `CoreOverview/SpaceSketchModel.tsx` | 3D WebGL model for the "Space" pillar card. |
| `CoreOverview/StorySketchModel.tsx` | 3D WebGL model for the "Story" pillar card. |
| `CoreOverview/SystemSketchModel.tsx` | 3D WebGL model for the "System" pillar card. |
| `CoreOverview/HexaBackground.tsx` | Background hexagonal pattern for the Core Overview section. |

---

### Page-Specific Components

#### Homepage
| Component | Section |
|---|---|
| `HeroSection` | Full-viewport hero with 3D hexagon + headline copy |
| `IntroSection` | Short intro paragraph |
| `CoreOverview` | Three-pillar cards (Space, Story, System) with 3D models |
| `WholePictureSection` | Explanation of the integrated approach |
| `HowWeWorkSection` | Process/methodology overview |
| `TestimonialSection` | Client testimonials |
| `StaggerTestimonials` | Staggered animation variant for testimonials |
| `TargetAudienceSection` | Who CCG works with |

#### About Page
| Component | Section |
|---|---|
| `AboutHeroSection` | Page hero |
| `TeamSection` | Team grid; uses `RogerProfile` and `HattieProfile` sub-components |
| `VisionSection` | Vision/values cards |

#### Services Page
| Component | Section |
|---|---|
| `ServicesHeroSection` | Page hero |
| `ServicesDetailsSection` | Detailed service breakdowns |
| `HowWeWorkSection` | Process section (services-specific version) |
| `ShuffleCards` | Animated card shuffle interaction |

---

## 11. Animation System

The site uses a layered animation system. Understanding how the layers interact is essential for debugging.

### Layer 1 — Smooth Scroll (Lenis)

Lenis intercepts native scroll and replaces it with eased, interpolated scroll. All scroll positions reported to GSAP reflect the Lenis position, not the native position.

**Config** (in `LenisProvider`):
- Duration: `1.2s`
- Easing: `1 - 2^(-10t)` (exponential ease-out)
- `autoRaf: false` — Lenis does NOT run its own requestAnimationFrame loop
- Instead, it is driven by `gsap.ticker.add(rafCallback)` in `LenisScrollTriggerSync`

### Layer 2 — Scroll Triggers (GSAP ScrollTrigger)

`ScrollTrigger` is registered in components that need scroll-based animation. Because Lenis drives the ticker, `ScrollTrigger.update()` is called on every Lenis scroll event, keeping positions accurate.

Common `ScrollTrigger` patterns used:
- `start: "top 80%"` — animation plays when element top reaches 80% of viewport
- `toggleActions: "play none none none"` — plays once, does not reverse
- `scrub: true` — animation progress tied directly to scroll position (parallax)
- `once: true` — fires once and kills itself (used in `SplitText`)

### Layer 3 — Preloader Gate

Almost every `useGSAP` hook begins with:
```ts
if (!isPreloaderComplete) return;
```
This prevents scroll-triggered animations from firing during the loading screen. When `isPreloaderComplete` becomes `true`, the hook re-runs with the actual dependencies.

### Layer 4 — Page Transitions (GSAP + Next.js Router)

The `TransitionProvider` creates an overlay of 6 gold-colored columns. On navigate:
1. Columns animate from `translateY(100%)` → `translateY(0%)` (slide up, cover screen).
2. `router.push()` fires only after columns fully cover the screen.
3. On new page render, columns animate to `translateY(-100%)` (slide off top).

### Layer 5 — Component-level Animations (Framer Motion)

Framer Motion is used for simpler, declarative animations that do not need scroll triggers:
- Fade in / slide up reveals on form sections.
- Hover micro-animations.
- `AnimatePresence` for the preloader exit.

---

## 12. Styling & Design System

### Tailwind CSS v4

This project uses Tailwind v4, which has a fundamentally different configuration approach from v3:
- **No `tailwind.config.js`** — configuration is done in CSS via `@theme inline { … }`.
- Tailwind is imported with `@import "tailwindcss"` in `globals.css`.
- Custom theme tokens are exposed as both CSS variables and Tailwind utilities.

### Design Tokens (`app/globals.css` + `app/lib/theme.ts`)

The design tokens are defined in two places that must be kept in sync:

**CSS variables (`:root` in `globals.css`):**
```css
--background: #040b22;       /* Deep navy — page background */
--foreground: #f6f8ff;       /* Near-white — primary text */
--muted-foreground: #a8b4cc; /* Blue-grey — secondary text */
--accent: #ffc878;           /* Gold — CTAs, buttons, highlights */
--accent-foreground: #040b22;/* Dark text on gold buttons */
--elevated: #0a1228;         /* Slightly lighter navy — cards, panels */
--border: #f6f8ff;           /* Full-brightness border */
--border-light: #e3e6ee;     /* Subtle border for light areas */
--card-border-muted: #374151;/* Dark grey for muted card borders */
--destructive: #ff9a9a;      /* Error / destructive red */
--success: #a8ffcb;          /* Success green */
--copy-reveal-block: #e5e5e5;/* Block wipe animation color */
--sketch-muted: #d3d3d3;     /* Sketch/diagram stroke color */
```

**TypeScript theme object (`app/lib/theme.ts`):**  
Mirrors the CSS variables for use in JavaScript (e.g., when configuring Three.js materials that need hex color values).

**Rule:** When updating a color, update **both** `globals.css` and `theme.ts`.

### Background Pattern

The page background is a repeating topographic SVG pattern (`/public/topography.svg`) layered over the dark navy background color. This is set in the `body` styles in `globals.css`.

### Custom Utility Classes

Defined in `globals.css`:

| Class | Description |
|---|---|
| `.container-wide` | Max-width 1280px, centered, with horizontal padding |
| `.container` | Responsive container with breakpoint-based max-widths |
| `.no-scrollbar` | Hides scrollbar (cross-browser) |
| `.font-clash-display` | Applies the Clash Display font |
| `.font-satoshi` | Applies the Satoshi font |
| `.block-line-wrapper`, `.block-revealer` | Used by the `CopyReveal` block-wipe text animation |

---

## 13. Typography & Fonts

All fonts are self-hosted in `public/fonts/` and loaded via Next.js's `next/font/local` (except Geist which uses `next/font/google`).

| Font | CSS Variable | Usage | Files Location |
|---|---|---|---|
| **Clash Display** | `--font-clash-display` | Headings, brand name, nav, display copy | `public/fonts/ClashDisplay_Complete/` |
| **Satoshi** | `--font-satoshi` | Body text, descriptions, form labels, buttons | `public/fonts/Satoshi_Complete/` |
| **Geist Sans** | `--font-geist-sans` | Fallback / utility text | Loaded from Google Fonts CDN |
| **Geist Mono** | `--font-geist-mono` | Monospace fallback | Loaded from Google Fonts CDN |
| **Excalifont** | (inline style) | Sketch/handwriting style in diagram illustrations | `public/fonts/Excalifont-Regular.woff2` |

**Both Clash Display and Satoshi are variable fonts** — a single `.woff2` file supports all weights. Font weight variations are controlled via CSS `font-weight`.

**Font loading strategy:**  
Both local fonts are loaded with Next.js `localFont()` as variable fonts. The `LoadingScreen` waits for `document.fonts.ready` before reporting 40% progress, ensuring fonts are rendered before the preloader completes and animations begin.

---

## 14. SEO & Metadata

### Page-level Metadata

Each `page.tsx` file exports a `metadata` object (or `generateMetadata` function for dynamic pages). This is the Next.js App Router way to set `<title>`, `<meta description>`, OpenGraph tags, and Twitter card tags.

Root metadata is in `app/layout.tsx`:
- `metadataBase: new URL("https://clarkcreativegroup.com")` — resolves relative URLs in metadata.
- Default title template: `"Clark Creative Group"` with per-page template `"%s | Clark Creative Group"`.

### Structured Data (JSON-LD)

`app/components/seo/JsonLd.tsx` injects two JSON-LD schemas into the `<head>` on every page:

1. **Organization** schema — includes name, URL, logo, email, and LinkedIn URL.
2. **WebSite** schema — name and URL.

This helps search engines understand the business context and may enable rich results.

### Sitemap & Robots

| File | Output URL | Notes |
|---|---|---|
| `app/sitemap.ts` | `/sitemap.xml` | All 5 routes with priority and change frequency |
| `app/robots.ts` | `/robots.txt` | Allows all crawlers; points to sitemap |

**Update sitemap.ts** when adding new public routes.

---

## 15. Image Handling

### Next.js `<Image>` Component

All images should use `next/image` (`<Image />`) instead of `<img>` to get:
- Automatic WebP conversion
- Lazy loading
- Proper `width`/`height` to prevent layout shift

### Allowed Remote Image Domains

Defined in `next.config.ts`:
```ts
remotePatterns: [
  { protocol: "https", hostname: "images.unsplash.com" },
  { protocol: "https", hostname: "plus.unsplash.com" },
]
```
If you need to load images from any other external domain, add it to this array.

### Local Images

Static images in `public/` are referenced as `/filename.ext` (no `public/` prefix in the `src`).

**Current images in `public/`:**
- `logo.png` — site logo (32×32, used in header)
- `hattie.png`, `roger.png`, `rog.png` — team member photos
- `hat.png`, `hat1.png` — alternate Hattie photos
- `blob.png`, `dg.png`, `executive.png`, `mindset.png`, `rise.png`, `space.png`, `square.png` — content/section images
- `topography.svg` — background pattern

---

## 16. Key Patterns & Conventions

### Server vs Client Components

By default in the App Router, components are **Server Components**. Mark a file with `"use client"` at the top when it uses:
- React hooks (`useState`, `useEffect`, `useRef`, `useContext`, etc.)
- Browser APIs (`window`, `document`, etc.)
- GSAP, Framer Motion, or any animation library
- Event handlers

**Rule of thumb:** Keep as many components as possible as Server Components. Only add `"use client"` where needed. Page files (`page.tsx`) can stay as server components while importing client components.

### Path Alias

```ts
import Something from "@/components/ui/SplitText"
// resolves to: ./components/ui/SplitText (relative to project root)
```

Configured in `tsconfig.json` as `"@/*": ["./*"]`.

### Component File Organization

Components are organized by page in `app/components/`:
- `homepage/` — only used on the homepage
- `aboutpage/` — only used on the about page
- `servicespage/` — only used on the services page
- `contactpage/` — only used on the contact page
- `privacypage/` — only used on the privacy page
- `notfoundpage/` — only used on the 404 page
- `ui/` — shared/reusable components used across pages
- `header/`, `footer/`, `layout/`, `transitions/`, `seo/` — structural components used globally

### Form Submission Pattern

Both contact forms follow the same pattern:
1. Client-side validation first (prevent obvious errors without a server round-trip).
2. `fetch()` POST to the API route with JSON body.
3. Display `submitError` (red text) on failure.
4. Display `submitSuccess` (green text) and reset form on success.
5. `isSubmitting` boolean disables the submit button during the request.

---

## 17. Deployment

The site is designed to deploy on **Vercel** (the company behind Next.js). No special configuration is needed — Vercel auto-detects Next.js projects.

### Deploying to Vercel

1. Push the repository to GitHub (already done).
2. Import the repository in the [Vercel dashboard](https://vercel.com/new).
3. Set the three environment variables in **Project Settings → Environment Variables**:
   - `RESEND_API_KEY`
   - `RESEND_FROM`
   - `CONTACT_TO_EMAIL`
4. Deploy. Vercel runs `pnpm build` automatically.

### Domain

The production domain is `clarkcreativegroup.com`. In Vercel, add this as a **Custom Domain** in the project settings. Vercel will handle SSL/HTTPS automatically.

### Build Command

```bash
pnpm build
```

This runs `next build`, which:
- Type-checks all TypeScript
- Bundles and optimizes all pages and assets
- Pre-renders static pages
- Outputs to `.next/`

### Deployment Checklist for New Developers

- [ ] All three environment variables are set in Vercel
- [ ] The sending domain in `RESEND_FROM` is verified in Resend
- [ ] `clarkcreativegroup.com` is pointed to Vercel's nameservers (or A/CNAME records)
- [ ] Test the contact form and book-a-call form in production after deploying

---

## 18. Replacing or Switching Third-Party Services

### Replacing Resend with Another Email Service

If you want to stop using Resend and switch to a different email provider (SendGrid, Postmark, AWS SES, Mailgun, etc.), here are the steps:

1. **Install the new provider's SDK** (e.g., `pnpm add @sendgrid/mail`).
2. **Update `app/api/contact/route.ts`:**
   - Remove `import { Resend } from "resend"` and the `resend` instance.
   - Replace the `resend.emails.send(…)` call with your new provider's send function.
   - Keep all the validation logic — it is provider-agnostic.
3. **Update `app/api/request-call/route.ts`** with the same change.
4. **Update environment variables** — remove `RESEND_API_KEY`/`RESEND_FROM`, add whatever your new provider requires.
5. **Uninstall the old package:** `pnpm remove resend`.

The email content (subject, body text, `replyTo`) is all plain-text and will work with any provider.

### Adding a Scheduling Tool (e.g., Calendly)

If you want to replace the custom `BookCallPanel` with a third-party scheduling tool like Calendly or Cal.com:

1. Embed the tool's widget or use their `<script>` / React SDK.
2. You can remove or disable `app/components/contactpage/BookCallPanel.tsx`.
3. You may be able to remove `app/api/request-call/route.ts` entirely if the scheduling tool handles its own notifications.

### Adding Analytics

No analytics are currently installed. To add:
- **Vercel Analytics:** Install `@vercel/analytics` and add `<Analytics />` to `app/layout.tsx`.
- **Google Analytics / Plausible / Fathom:** Add their script tag or React component inside `app/layout.tsx`, either directly or via a client component.

---

*This documentation was last updated: April 2026.*
