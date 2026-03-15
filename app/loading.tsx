// Next.js App Router loading convention.
// Creating this file automatically wraps the root route segment with a React
// Suspense boundary, which is the recommended pattern for streaming and
// incremental rendering.  The preloader splash-screen animation itself is
// handled separately via PreloaderProvider in the root layout so that GSAP
// can coordinate with page-content elements.
export default function Loading() {
  return null;
}
