/**
 * Brand tokens — mirrors :root in app/globals.css. Update both when changing the palette.
 */
export const theme = {
  background: "#040b22",
  foreground: "#f6f8ff",
  /** Secondary / supporting body copy on dark backgrounds */
  mutedForeground: "#a8b4cc",
  accent: "#ffc878",
  /** Text on accent (buttons, pills) */
  accentForeground: "#040b22",
  /** CopyReveal wipe blocks; light contrast against dark page bg */
  copyRevealBlock: "#e5e5e5",
  /** Softer sketch / diagram strokes */
  sketchMuted: "#d3d3d3",
  /** Light borders on dark sections (team cards, etc.) */
  borderLight: "#e3e6ee",
  elevated: "#0a1228",
  destructive: "#ff9a9a",
  success: "#a8ffcb",
  cardBorderMuted: "#374151",
} as const;
