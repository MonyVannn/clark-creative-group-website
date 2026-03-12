# About Page Implementation Plan

## Overview

Create an About page (`/about`) with a full-width centered hero section that tells the Clark Creative Group origin story. The page follows the homepage patterns (grid background, padding, animations) while introducing a modified decorative grid for visual distinction.

---

## Hero Section Design

### Layout: Full Width Centered (Option B)

```
┌─────────────────────────────────────────────────────────────┐
│                        [Header]                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│     ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░    │  ← Grid background
│                                                              │
│              We set out to build a life.                     │  ← Headline (centered)
│              The company came from that.                     │
│                                                              │
│     ┌─────────────────────────────────────────────────┐     │
│     │  Clark Creative Group started when Roger and    │     │  ← Body text (centered, max-width)
│     │  Hattie Clark — childhood friends turned life   │     │
│     │  partners — decided to take everything they     │     │
│     │  knew about design, narrative, and strategy...  │     │
│     └─────────────────────────────────────────────────┘     │
│                                                              │
│              ┌──────────────────────────┐                   │
│              │     Meet the Team        │                   │  ← CTA Button
│              └──────────────────────────┘                   │
│                                                              │
│     ┌───┬───┬───┬───┬───┬───┐                               │
│     │░░░│   │   │   │   │░░░│  ← Modified decorative grid   │
│     ├───┼───┼───┼───┼───┼───┤    (6 cols × 3 rows)          │
│     │   │   │   │   │   │   │    Different pattern than     │
│     ├───┼───┼───┼───┼───┼───┤    homepage for distinction   │
│     │░░░│   │░░░│   │   │░░░│                               │
│     └───┴───┴───┴───┴───┴───┘                               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Copywriting

**Headline:**
> We set out to build a life.  
> The company came from that.

**Body:**
> Clark Creative Group started when Roger and Hattie Clark — childhood friends turned life partners — decided to take everything they knew about design, narrative, and strategy, and put it to work for founders who think the way they do.
>
> You get a lot further when these parts of your life start pulling in the same direction.

**CTA:** "Meet the Team" (scrolls to team section)

---

## Technical Specifications

### File Structure

```
app/
├── about/
│   └── page.tsx              # About page (server component wrapper)
├── components/
│   └── AboutHeroSection.tsx  # Hero section component (client component)
```

### Styling & Patterns

| Element | Specification |
|---------|---------------|
| **Background** | `#f2f2f2` (light) |
| **Grid Background** | Same as homepage: 18×20px grid with `rgba(0,0,0,0.06)` lines |
| **Padding** | `px-8 md:px-6 lg:px-16` (matches homepage) |
| **Headline Font** | `font-clash-display`, semibold |
| **Body Font** | `font-satoshi`, medium, uppercase |
| **Text Color** | `#191919` |
| **CTA Button** | Rounded full, `bg-[#d1d1d1]`, hover `bg-[#e2e2e2]` |

### Decorative Grid Modification

**Creative Change:** Instead of the homepage's 5×4 grid at the bottom, the About page uses:
- **6 columns × 3 rows** (wider, shorter — more "story" feel)
- **Diagonal black cell pattern** (creates visual movement/journey metaphor)
- **Positioned below the content** with adequate spacing

```tsx
// Grid pattern: Diagonal emphasis
const GRID_COLS = 6;
const GRID_ROWS = 3;

// Black cells at diagonal positions (representing "journey")
const diagonalCells = new Set([0, 5, 8, 11, 12, 17]); // corners + center diagonal
```

### Animation Approach

1. **AnimatedCopy** for headline and body text (word slide-up)
2. **No preloader** — page loads directly with entrance animations
3. **Simple scroll-triggered fade** for the decorative grid (using GSAP + ScrollTrigger)

### Component Props

```tsx
interface AboutHeroSectionProps {
  onCtaClick?: () => void; // Optional: scroll to team section
}
```

---

## Implementation Checklist

### Phase 1: Page Setup
- [ ] Create `app/about/page.tsx` with ThemeProvider wrapper
- [ ] Add Header component
- [ ] Set up grid background (copy from homepage)
- [ ] Create `AboutHeroSection.tsx` component

### Phase 2: Hero Content
- [ ] Implement centered headline with `AnimatedCopy`
- [ ] Add body paragraphs with `AnimatedCopy`
- [ ] Style CTA button
- [ ] Create modified 6×3 decorative grid

### Phase 3: Animation
- [ ] Wire up `AnimatedCopy` (no PreloaderContext dependency)
- [ ] Add subtle grid entrance animation
- [ ] Test responsive behavior

### Phase 4: Polish
- [ ] Verify spacing/padding matches homepage
- [ ] Test on mobile, tablet, desktop
- [ ] Ensure smooth navigation from homepage

---

## Responsive Breakpoints

| Breakpoint | Headline Size | Body Width | Grid Size |
|------------|---------------|------------|-----------|
| Mobile | `text-3xl` | `max-w-sm` | Full width, shorter |
| Tablet (`md`) | `text-5xl` | `max-w-lg` | Full width |
| Desktop (`lg`) | `text-6xl` | `max-w-2xl` | Contained |
| Large (`xl/2xl`) | `text-7xl` | `max-w-3xl` | Contained |

---

## Future Sections (Below Hero)

1. **Team Section** — Profiles of Roger & Hattie Clark
2. **Mission/Values** — What drives CCG

These will be implemented in subsequent phases.

---

## Questions Resolved

- ✅ Spline: Reuse homepage scene
- ✅ Grid: Modified pattern (6×3 with diagonal fills)
- ✅ Layout: Full-width centered (Option B)
- ✅ Animations: AnimatedCopy, no preloader
- ✅ CTA: "Meet the Team"
- ✅ Future sections: Team + Mission

---

## Ready to Implement?

Reply with **"go"** to start implementation, or let me know if you'd like to adjust any part of this plan!
