# Clark Creative Group — Website

Marketing site for **Clark Creative Group (CCG)** — Next.js App Router, React 19, and Tailwind CSS v4. Production URL: [clarkcreativegroup.com](https://clarkcreativegroup.com).

This README covers **how to run and configure the project**, **routes and APIs**, and **visual identity as implemented in code** (colors, typography, layout). Design values are taken from the repository, not from an external brand manual.

---

## Project overview

| Route | Purpose |
|-------|---------|
| `/` | Homepage (hero, core overview, testimonials, CTAs) |
| `/about` | Team, vision, profiles |
| `/services` | Services hero, details, how we work |
| `/contact` | Contact hero, message form, book-a-call panel |
| `/privacy` | Privacy policy |
| Custom 404 | [`app/not-found.tsx`](app/not-found.tsx) |

**SEO:** [`app/sitemap.ts`](app/sitemap.ts) and [`app/robots.ts`](app/robots.ts) serve `/sitemap.xml` and `/robots.txt`. Structured data lives in [`app/components/seo/JsonLd.tsx`](app/components/seo/JsonLd.tsx). Site-wide metadata is set in [`app/layout.tsx`](app/layout.tsx).

**App shell:** [`LenisProvider`](app/components/layout/LenisProvider.tsx) (smooth scrolling), [`PreloaderProvider`](app/components/PreloaderContext.tsx) + [`LoadingScreen`](app/components/LoadingScreen.tsx), and [`TransitionProvider`](app/components/transitions/TransitionProvider.tsx) wrap page content for loading and route transitions.

---

## Configuration

Contact and “request a call” flows send email through [Resend](https://resend.com) from API routes. For local testing of forms, set:

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | Resend API key |
| `RESEND_FROM` | Verified sender address (e.g. `CCG <noreply@yourdomain.com>`) |
| `CONTACT_TO_EMAIL` | Inbox that receives submissions |

Routes: [`app/api/contact/route.ts`](app/api/contact/route.ts) (message form), [`app/api/request-call/route.ts`](app/api/request-call/route.ts) (booking request).

---

## Color palette

Semantic colors are defined in **CSS** ([`app/globals.css`](app/globals.css) `:root` + `@theme inline` for Tailwind v4) and mirrored in **TypeScript** ([`app/lib/theme.ts`](app/lib/theme.ts)) for components that need hex in JS (e.g. Three.js, charts). Many components still use Tailwind arbitrary values (`bg-[#040b22]`, etc.); prefer the theme tokens when touching related UI.

| Role | Hex | Notes (where it appears) |
|------|-----|---------------------------|
| **Page background** | `#040b22` | Default body background; mobile nav; cards; `--background`. |
| **Primary text (cool white)** | `#f6f8ff` | Headings, body, forms; `--foreground`. Often with opacity: `/90`, `/80`, `/75`, `/70`, `/60`, `/55`, `/50`, `/35` for hierarchy and placeholders. |
| **Muted foreground** | `#a8b4cc` | Supporting body copy on dark backgrounds; `--muted-foreground`. |
| **Secondary text (warm white)** | `#f2f2f2` | Hero titles, services/about/contact copy, lines, testimonials, 404. |
| **Accent / CTA** | `#ffc878` | Primary buttons, page transition overlay, focus rings, hover accents, carousel controls. Hover: `#ffc878/80`. `--accent`. |
| **Text on accent** | `#040b22` | Uppercase CTA labels on gold; `--accent-foreground`. |
| **Light theme text** | `#0a191f` | Header logo and nav when not on dark sections. |
| **Light theme nav** | `#606060` / `#a0a0a0` | Active vs inactive nav on light backgrounds. |
| **Secondary button (light)** | `#0a191f` bg, `#f6f8ff` text | Header CTA when not using gold. |
| **Elevated / panel surfaces** | `#0a1228` | Contact and booking panels; `--elevated` (often combined with opacity in UI). |
| **Copy-reveal blocks** | `#e5e5e5` | Copy reveal wipe animation; `--copy-reveal-block`. |
| **Sketch strokes (muted)** | `#d3d3d3` | Diagram / sketch lines; `--sketch-muted`. |
| **Borders (light neutrals)** | `#e3e6ee`, `#e5e5e5` | Team section borders; sketch blocks; `--border-light`. |
| **Borders (on navy)** | `#f6f8ff` at `/30`, `/25`, `/20`, `/15`, `/10` | Dividers, inputs, footers. |
| **Form / validation error** | `#ff9a9a` | Validation messages; `--destructive`. |
| **Success** | `#a8ffcb` | Positive feedback where used; `--success`. |
| **Card border (muted)** | `#374151` | Muted card chrome; `--card-border-muted`. |
| **Testimonial UI** | `#ffffff`, `#374151` | Active vs inactive slide indicators. |
| **Tailwind neutrals** | `neutral-400`, `neutral-500`, `gray-300`, `gray-400`, `gray-600` | Muted links, placeholders, carousel chrome. |

**CSS variables** (see [`app/globals.css`](app/globals.css)): `--background`, `--foreground`, `--muted-foreground`, `--accent`, `--accent-foreground`, `--border`, `--copy-reveal-block`, `--sketch-muted`, `--border-light`, `--elevated`, `--destructive`, `--success`, `--card-border-muted`.

---

## Typography

### Font families

| Family | Role | Implementation |
|--------|------|----------------|
| **Clash Display** | Display headings, section titles, footer column labels | Variable WOFF2: [`public/fonts/ClashDisplay_Complete/Fonts/WEB/fonts/ClashDisplay-Variable.woff2`](public/fonts/ClashDisplay_Complete/Fonts/WEB/fonts/ClashDisplay-Variable.woff2). Registered in [`app/layout.tsx`](app/layout.tsx) with `next/font/local`. CSS variable: `--font-clash-display`. Class: `font-clash-display`. |
| **Satoshi** | Body copy, UI, buttons, forms, navigation | Variable WOFF2: [`public/fonts/Satoshi_Complete/Fonts/WEB/fonts/Satoshi-Variable.woff2`](public/fonts/Satoshi_Complete/Fonts/WEB/fonts/Satoshi-Variable.woff2). Same pattern: `--font-satoshi`, class `font-satoshi`. |
| **Geist Sans** | Loaded globally | `next/font/google` → `--font-geist-sans` in [`app/layout.tsx`](app/layout.tsx). |
| **Geist Mono** | Loaded globally | `--font-geist-mono`. |

### Patterns in use

- **Large heroes / page titles**: `font-clash-display`, `font-semibold`, `tracking-tight`, responsive sizes from `text-4xl` / `text-5xl` up to `text-8xl` on large breakpoints.
- **Section headings (e.g. privacy)**: `font-clash-display`, `text-2xl`–`text-4xl`, `font-medium` or `font-semibold`.
- **Eyebrows / labels**: `font-satoshi`, `text-xs`, `uppercase`, `tracking-widest` or `tracking-[0.2em]` / `tracking-[0.35em]`.
- **Buttons**: `font-satoshi`, `font-bold` or `font-semibold`, `uppercase`, `tracking-widest` / `tracking-[0.2em]`.
- **Body**: `font-satoshi`, `text-sm`–`text-base`, `leading-relaxed` or `leading-7`.

### Utilities in [`app/globals.css`](app/globals.css)

- `.font-clash-display` → `var(--font-clash-display)`
- `.font-satoshi` → `var(--font-satoshi)`
- `.font-newtitle` → `var(--font-newtitle)` — **the variable `--font-newtitle` is not defined in [`app/layout.tsx`](app/layout.tsx)**; this class is unused until a font is wired up.

### Base `body` font

[`app/globals.css`](app/globals.css) sets `font-family: Arial, Helvetica, sans-serif` on `body`. Most UI sets **Clash Display** or **Satoshi** explicitly via the classes above, so Geist variables on `<body>` are available but are not the default paragraph font.

---

## Background and layout

- **Texture**: Repeating [`public/topography.svg`](public/topography.svg) over the base background (see [`app/globals.css`](app/globals.css)).
- **Wide container**: `.container-wide` — max width **1280px**, horizontal padding **1.5rem**.
- **Standard `.container`**: Responsive max widths at 640 / 768 / 1024 / 1280 / 1536px with **1.5rem** horizontal padding (same file).

---

## Design notes (codebase)

Brand colors are centralized in [`app/globals.css`](app/globals.css) and [`app/lib/theme.ts`](app/lib/theme.ts). Individual components may still use raw hex in class names; new work should prefer the shared tokens where practical.

---

## Development

### Requirements

- Node.js (version compatible with Next.js 16; LTS recommended)

### Commands

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

| Script | Description |
|--------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run lint` | ESLint |

### Stack

- [Next.js 16](https://nextjs.org) (App Router), React 19, TypeScript, Tailwind CSS v4
- **Motion / scroll:** [Framer Motion](https://www.framer.com/motion/), [GSAP](https://gsap.com/) + [@gsap/react](https://greensock.com/react/), [Lenis](https://lenis.darkroom.engineering/), [split-type](https://github.com/lukePeavey/SplitType)
- **3D / canvas:** [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/), [@react-three/drei](https://github.com/pmndrs/drei), [ogl](https://oframe.github.io/ogl-examples/), [unicornstudio-react](https://www.npmjs.com/package/unicornstudio-react)
- **Other UI:** [lottie-react](https://github.com/Gamote/lottie-react), [react-icons](https://react-icons.github.io/react-icons/)
- **Email:** [Resend](https://resend.com) (API routes)

For framework details, see the [Next.js documentation](https://nextjs.org/docs).
