# Clark Creative Group — Website

Marketing site for **Clark Creative Group (CCG)**. This document describes the **visual identity as implemented in this repository** (colors, typography, layout). Values are taken from the code, not from an external brand manual.

---

## Color palette

Colors are mostly repeated as Tailwind arbitrary values (e.g. `bg-[#040b22]`). A small subset also exists as CSS custom properties in [`app/globals.css`](app/globals.css).

| Role | Hex | Notes (where it appears) |
|------|-----|---------------------------|
| **Page background** | `#040b22` | Default body background; mobile nav; cards; matches `--background`. |
| **Primary text (cool white)** | `#f6f8ff` | Headings, body, forms; matches `--foreground`. Often with opacity: `/90`, `/80`, `/75`, `/70`, `/60`, `/55`, `/50`, `/35` for hierarchy and placeholders. |
| **Secondary text (warm white)** | `#f2f2f2` | Hero titles, services/about/contact copy, lines, testimonials, 404. |
| **Accent / CTA** | `#ffc878` | Primary buttons, page transition overlay, focus rings on inputs, hover accents, carousel controls. Hover: `#ffc878/80`. |
| **Text on accent** | `#191919` or `#040b22` | Uppercase CTA labels (`#191919` on gold; `#040b22` on gold in some heroes/header). |
| **Light theme text** | `#0a191f` | Header logo and nav when not on dark sections. |
| **Light theme nav** | `#606060` / `#a0a0a0` | Active vs inactive nav on light backgrounds. |
| **Secondary button (light)** | `#0a191f` bg, `#f6f8ff` text | Header CTA when not using gold. |
| **Elevated / panel surfaces** | `#0a1228/90` | Contact and booking panels (semi-transparent over base). |
| **Borders (light neutrals)** | `#e3e6ee`, `#e5e5e5` | Team section borders; sketch blocks. |
| **Borders (on navy)** | `#f6f8ff` at `/30`, `/25`, `/20`, `/15`, `/10` | Dividers, inputs, footers. |
| **Form error** | `#ff9a9a` | Validation messages in [`app/components/contactpage/MessageForm.tsx`](app/components/contactpage/MessageForm.tsx). |
| **Testimonial UI** | `#ffffff`, `#374151` | Active vs inactive slide indicators. |
| **Tailwind neutrals** | `neutral-400`, `neutral-500`, `gray-300`, `gray-400`, `gray-600` | Muted links, placeholders, carousel chrome. |

**CSS variables** (see [`app/globals.css`](app/globals.css)):

- `--background`: `#040b22`
- `--foreground`: `#f6f8ff`

---

## Typography

### Font families

| Family | Role | Implementation |
|--------|------|----------------|
| **Clash Display** | Display headings, section titles, footer column labels | Variable WOFF2: [`public/fonts/ClashDisplay_Complete/Fonts/WEB/fonts/ClashDisplay-Variable.woff2`](public/fonts/ClashDisplay_Complete/Fonts/WEB/fonts/ClashDisplay-Variable.woff2). CSS variable: `--font-clash-display`. Use class: `font-clash-display`. |
| **Satoshi** | Body copy, UI, buttons, forms, navigation | Variable WOFF2: [`public/fonts/Satoshi_Complete/Fonts/WEB/fonts/Satoshi-Variable.woff2`](public/fonts/Satoshi_Complete/Fonts/WEB/fonts/Satoshi-Variable.woff2). CSS variable: `--font-satoshi`. Use class: `font-satoshi`. |
| **Geist Sans** | Loaded globally | CSS variable: `--font-geist-sans` (see [`app/layout.tsx`](app/layout.tsx)). |
| **Geist Mono** | Loaded globally | CSS variable: `--font-geist-mono`. |

Fonts are registered in [`app/layout.tsx`](app/layout.tsx) via `next/font` and applied to `<body>` through CSS variables.

### Patterns in use

- **Large heroes / page titles**: `font-clash-display`, `font-semibold`, `tracking-tight`, responsive sizes from `text-4xl` / `text-5xl` up to `text-8xl` on large breakpoints.
- **Section headings (e.g. privacy)**: `font-clash-display`, `text-2xl`–`text-4xl`, `font-medium` or `font-semibold`.
- **Eyebrows / labels**: `font-satoshi`, `text-xs`, `uppercase`, `tracking-widest` or `tracking-[0.2em]` / `tracking-[0.35em]`.
- **Buttons**: `font-satoshi`, `font-bold` or `font-semibold`, `uppercase`, `tracking-widest` / `tracking-[0.2em]`.
- **Body**: `font-satoshi`, `text-sm`–`text-base`, `leading-relaxed` or `leading-7`.

### Utilities in [`app/globals.css`](app/globals.css)

- `.font-clash-display` → `var(--font-clash-display)`
- `.font-satoshi` → `var(--font-satoshi)`
- `.font-newtitle` → `var(--font-newtitle)` — **the variable `--font-newtitle` is not defined in [`app/layout.tsx`](app/layout.tsx)**; this class is effectively unwired until a font is added.

### Base `body` font

[`app/globals.css`](app/globals.css) sets `font-family: Arial, Helvetica, sans-serif` on `body`. Most UI sets **Clash Display** or **Satoshi** explicitly via the classes above, so Geist variables on `<body>` are available but are not the default paragraph font.

---

## Background and layout

- **Texture**: Repeating [`public/topography.svg`](public/topography.svg) over the base background color `#040b22` (see [`app/globals.css`](app/globals.css)).
- **Wide container**: `.container-wide` — max width **1280px**, horizontal padding **1.5rem**.
- **Standard `.container`**: Responsive max widths at 640 / 768 / 1024 / 1280 / 1536px with **1.5rem** horizontal padding (same file).

---

## Design notes (codebase)

Hex values are duplicated across components rather than centralized in a theme file. A future refactor could map the semantic names above to CSS variables or Tailwind theme tokens and replace repeated arbitrary colors.

---

## Development

### Requirements

- Node.js (version compatible with Next.js 16)

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

### Stack (short)

- [Next.js](https://nextjs.org) (App Router), React, TypeScript, Tailwind CSS v4.

For framework details, see the [Next.js documentation](https://nextjs.org/docs).
