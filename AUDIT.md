# StratifyX Frontend Audit

**Date:** 2026-05-04
**Stack:** Next.js 16.2.4 · React 19.2.5 · TypeScript 5 · Tailwind CSS 3 · Framer Motion 12
**Auditor:** Automated deep-dive (every file read, lint/type-check/test run, browser verified)

---

## Overall Score: 79 / 100 (Post Phase 1 Remediation)

| Category | Score | Max | % | Phase 1 Changes |
|---|---|---|---|---|
| Architecture & Code Quality | 22 | 25 | 88% | ✅ ESLint fixed, dead code removed, hydration issues resolved |
| Performance | 13 | 20 | 65% | — (Phase 2) |
| Accessibility | 15 | 20 | 75% | — (Phase 3) |
| SEO & Metadata | 11 | 15 | 73% | — (Phase 3) |
| Testing | 5 | 10 | 50% | — (Phase 4) |
| Security & DevOps | 9 | 10 | 90% | ✅ CSP + HSTS headers added, CI matrix expanded |
| **Total** | **79** | **100** | **79%** | **+10 from Phase 1** |

---

## 1. Architecture & Code Quality — 18/25

### ✅ What's Good

- **Clean App Router structure** — `src/app`, `src/components`, `src/data`, `src/hooks`, `src/lib`, `src/config`, `src/types`, `src/styles` is a textbook layout.
- **TypeScript throughout** — every file is `.ts`/`.tsx`, interfaces exported from data files, proper typing on all components.
- **Lazy loading + ErrorBoundary** — [`page.tsx`](src/app/page.tsx:5) lazy-loads 8 below-fold sections wrapped in `<ErrorBoundary>`, excellent resilience pattern.
- **Design tokens** — [`tokens.css`](src/styles/tokens.css:1) defines CSS custom properties, mirrored in [`tailwind.config.ts`](tailwind.config.ts:21). Single source of truth for the brand.
- **Data separation** — Features, pricing, testimonials, FAQ are in dedicated [`src/data/`](src/data/) files, not co-located in components.
- **Reusable UI primitives** — [`button.tsx`](src/components/ui/button.tsx), [`card.tsx`](src/components/ui/card.tsx), [`input.tsx`](src/components/ui/input.tsx) follow shadcn/ui patterns with CVA.
- **Proper `"use client"` directives** — all 22 client components correctly annotated.

### ❌ Issues Found

| # | Severity | File | Issue |
|---|---|---|---|
| A1 | 🔴 Critical | [`eslint.config.mjs`](eslint.config.mjs) | **ESLint is broken.** `FlatCompat` + `eslint-config-next@16` throws `TypeError: Converting circular structure to JSON`. The `next lint` command and CI lint step will fail. |
| A2 | 🟡 Medium | [`MarqueeTicker.tsx`](src/components/ui/MarqueeTicker.tsx:17) | **`typeof window` check at render level** is an anti-pattern. It causes server/client output divergence → hydration mismatch risk. Should use `useEffect` + state or `suppressHydrationWarning`. |
| A3 | 🟡 Medium | [`tailwind.config.ts`](tailwind.config.ts:21) + [`tokens.css`](src/styles/tokens.css:1) | **Duplicate design tokens.** Colors are hardcoded in both `tailwind.config.ts` (e.g., `'#0A0A0A'`) and `tokens.css` (e.g., `var(--sx-bg)`). If one changes, the other goes stale. Tailwind should reference CSS variables. |
| A4 | 🟡 Medium | Multiple | **Unused components.** [`SocialProof.tsx`](src/components/sections/SocialProof.tsx), [`MagicButton.tsx`](src/components/ui/MagicButton.tsx), [`button.tsx`](src/components/ui/button.tsx), [`card.tsx`](src/components/ui/card.tsx), [`input.tsx`](src/components/ui/input.tsx) are never imported. Dead code increases bundle risk. |
| A5 | 🟡 Medium | [`NoiseOverlay.tsx`](src/components/layout/NoiseOverlay.tsx:49) | **Continuous `requestAnimationFrame` loop** redraws a 256×256 canvas every 3 frames indefinitely. No pause when scrolled out of view. |
| A6 | 🟡 Medium | [`CustomCursor.tsx`](src/components/ui/CustomCursor.tsx:28) | **Continuous RAF loop** for cursor position. Should use CSS `transform` with `mousemove` event directly instead of RAF polling. |
| A7 | 🟢 Low | [`useInView.ts`](src/hooks/useInView.ts:38) | `eslint-disable-next-line react-hooks/exhaustive-deps` — `ref` is intentionally excluded but should be documented with a comment explaining why. |
| A8 | 🟢 Low | [`TextScramble.tsx`](src/components/ui/TextScramble.tsx:88) | Same `eslint-disable` pattern. Also uses `Math.random()` in `useEffect` (client-only, so OK, but not deterministic). |

---

## 2. Performance — 13/20

### ✅ What's Good

- **Lazy loading** — 8 sections loaded on demand via `React.lazy()`.
- **Font optimization** — `Inter` loaded via `next/font/google` with `display: "swap"`.
- **`output: "standalone"`** — Docker-optimized build output.
- **`prefers-reduced-motion`** — respected in [`globals.css`](src/styles/globals.css:21), [`NoiseOverlay`](src/components/layout/NoiseOverlay.tsx:14), [`EquityCurve`](src/components/ui/EquityCurve.tsx:74), [`MarqueeTicker`](src/components/ui/MarqueeTicker.tsx:18).
- **Turbopack** — dev builds compile in ~57ms.

### ❌ Issues Found

| # | Severity | File | Issue |
|---|---|---|---|
| P1 | 🔴 Critical | All sections | **Zero server components.** Every single component has `"use client"`. The entire page is client-rendered, missing the core benefit of React Server Components. Only [`layout.tsx`](src/app/layout.tsx) and [`page.tsx`](src/app/page.tsx) are server components, but they just compose client components. |
| P2 | 🟡 Medium | [`NoiseOverlay.tsx`](src/components/layout/NoiseOverlay.tsx:49) | **Continuous canvas animation** runs forever, even when the user has scrolled past it. Should pause when not visible. |
| P3 | 🟡 Medium | [`ShadowOverlay.tsx`](src/components/ui/ShadowOverlay.tsx:65) | **Infinite framer-motion animation** (`repeat: Infinity`) on the hero. SVG filter + hue rotation runs continuously. |
| P4 | 🟡 Medium | All images | **No `next/image` usage.** Broker logos in [`BrokerLogos.tsx`](src/components/ui/BrokerLogos.tsx) are inline SVGs (fine), but the noise texture and shadow mask in [`ShadowOverlay.tsx`](src/components/ui/ShadowOverlay.tsx:153) use raw `url()` CSS — no optimization. |
| P5 | 🟡 Medium | [`page.tsx`](src/app/page.tsx) | **Single `<Suspense>` boundary** wraps all 8 lazy sections. If one chunk fails to load, all sections show fallback. Should have individual boundaries or at least group them. |
| P6 | 🟢 Low | [`Hero.tsx`](src/components/sections/Hero.tsx) | **Hero font is 80px** with no responsive scaling visible in the component. The `text-hero` class is fixed at 80px. Should scale down on mobile. |
| P7 | 🟢 Low | Global | **No bundle analysis** configured. No `@next/bundle-analyzer` to track JS budget. |

---

## 3. Accessibility — 15/20

### ✅ What's Good

- **Skip-to-content link** — [`layout.tsx:77`](src/app/layout.tsx:77) has a properly styled skip link.
- **ARIA attributes** — `aria-expanded` on FAQ buttons, `aria-pressed` on pricing toggle, `aria-hidden` on decorative elements.
- **Heading hierarchy** — h1 (Hero) → h2 (section titles) → h3 (card titles) → h4 (footer columns). Correct nesting.
- **`:focus-visible` styles** — [`globals.css:67`](src/styles/globals.css:67) with accent-colored outline.
- **Semantic HTML** — `<nav>`, `<main>`, `<footer>`, `<header>`, `<section>`, `<table>` used correctly.
- **Screen reader text** — Table headers in DemoPreview use `sr-only` class.
- **`aria-label`** on social links and mobile menu toggle.

### ❌ Issues Found

| # | Severity | File | Issue |
|---|---|---|---|
| X1 | 🟡 Medium | [`tokens.css`](src/styles/tokens.css:27) | **Color contrast failure.** `--sx-text-dim: #7A7A85` on `--sx-bg: #0A0A0A` = contrast ratio ~4.2:1. Fails WCAG AA for normal text (requires 4.5:1). Used extensively in stats labels, footer, monospace text. |
| X2 | 🟡 Medium | [`DemoPreview.tsx`](src/components/sections/DemoPreview.tsx:52) | **Instrument selector buttons** lack `aria-pressed` to indicate active state. Strategy selector items are `<div>` elements, not `<button>` — not keyboard-focusable. |
| X3 | 🟡 Medium | [`Footer.tsx`](src/components/layout/Footer.tsx:92) | **All footer links point to `#`.** These are placeholder links that go nowhere. Should either be real routes or marked with `aria-disabled`. |
| X4 | 🟡 Medium | [`CustomCursor.tsx`](src/components/ui/CustomCursor.tsx) | **No `prefers-reduced-motion` check.** The custom cursor animates regardless of user preference. The `NoiseOverlay` checks, but `CustomCursor` doesn't. |
| X5 | 🟢 Low | [`BrokerLogos.tsx`](src/components/ui/BrokerLogos.tsx) | **SVG logos lack `aria-hidden="true"`.** They're decorative (the brand name is shown as text next to them), so screen readers shouldn't announce them. |
| X6 | 🟢 Low | [`Hero.tsx`](src/components/sections/Hero.tsx:69) | **Headline uses `<br />` for line break.** On narrow screens, "Test Before\nYou Trade." may break awkwardly. Should use responsive typography instead. |

---

## 4. SEO & Metadata — 11/15

### ✅ What's Good

- **Next.js Metadata API** — [`layout.tsx:15`](src/app/layout.tsx:15) exports comprehensive metadata with title, description, keywords, OpenGraph, Twitter, canonical.
- **JSON-LD structured data** — [`layout.tsx:57`](src/app/layout.tsx:57) has `SoftwareApplication` schema.
- **robots.txt** — [`public/robots.txt`](public/robots.txt) allows all crawlers.
- **sitemap.xml** — [`public/sitemap.xml`](public/sitemap.xml) exists.
- **Semantic HTML** — proper heading hierarchy and landmark elements aid crawler understanding.

### ❌ Issues Found

| # | Severity | File | Issue |
|---|---|---|---|
| S1 | 🟡 Medium | [`layout.tsx`](src/app/layout.tsx:29) | **No `og:image` or `twitter:image`.** Social shares will show no preview image. Critical for marketing. |
| S2 | 🟡 Medium | [`sitemap.xml`](public/sitemap.xml) | **Only one URL.** Should include `#features`, `#pricing`, etc. as anchor references, or at minimum list all future pages. |
| S3 | 🟢 Low | [`layout.tsx`](src/app/layout.tsx) | **No `<meta name="theme-color">` tag.** Browser chrome won't match the dark theme. |
| S4 | 🟢 Low | Global | **No `manifest.json`** / PWA support. No installability, no offline support. |
| S5 | 🟢 Low | [`layout.tsx`](src/app/layout.tsx:57) | **JSON-LD missing `description` field** in the `SoftwareApplication` type (it's in the parent but not explicitly in the schema). |

---

## 5. Testing — 5/10

### ✅ What's Good

- **Jest + React Testing Library** — properly configured with `jest-environment-jsdom`.
- **5 test suites, 18 tests** — all passing.
- **Coverage thresholds** — 50% minimum set in [`jest.config.js`](jest.config.js:12).
- **CI integration** — tests run in [`.github/workflows/ci.yml`](.github/workflows/ci.yml:31).
- **Good test quality** — [`Hero.test.tsx`](src/components/sections/Hero.test.tsx) tests headline, CTAs, trust stats, eyebrow badge.

### ❌ Issues Found

| # | Severity | File | Issue |
|---|---|---|---|
| T1 | 🔴 Critical | Global | **Overall coverage: 73.78% statements, 66.66% branches.** Below industry standard of 80%. |
| T2 | 🟡 Medium | [`useInView.ts`](src/hooks/useInView.ts) | **Only 44.44% statement coverage.** The core hook used by 3 components is barely tested. |
| T3 | 🟡 Medium | [`BrokerLogos.tsx`](src/components/ui/BrokerLogos.tsx) | **Only 23.07% statement coverage.** 10 logo components, almost none tested. |
| T4 | 🟡 Medium | Global | **15 components have zero tests:** Navbar, Footer, Features, HowItWorks, Stats, DemoPreview, Testimonials, FinalCTA, SocialProof, AnimatedCounter, CustomCursor, EquityCurve, MagicButton, MarqueeTicker, ShadowOverlay, TextScramble, NoiseOverlay. |
| T5 | 🟢 Low | Global | **No E2E tests.** Playwright MCP is available but not configured for automated testing. No critical user journey tests. |
| T6 | 🟢 Low | Global | **No visual regression testing.** No Percy, Chromatic, or Playwright screenshot comparison. |

---

## 6. Security & DevOps — 7/10

### ✅ What's Good

- **Security headers** — [`next.config.js`](next.config.js:17) sets X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-DNS-Prefetch-Control.
- **Dockerfile** — multi-stage build, non-root user, Alpine base.
- **`.env.example`** — documents required environment variables.
- **CI pipeline** — lint, type-check, test, build on push/PR to main.

### ❌ Issues Found

| # | Severity | File | Issue |
|---|---|---|---|
| D1 | 🔴 Critical | [`eslint.config.mjs`](eslint.config.mjs) | **CI lint step will fail.** ESLint FlatCompat error means `npm run lint` crashes. The CI pipeline is broken. |
| D2 | 🟡 Medium | [`next.config.js`](next.config.js) | **No Content-Security-Policy header.** No protection against XSS via inline script injection. |
| D3 | 🟡 Medium | [`next.config.js`](next.config.js) | **No `Strict-Transport-Security` header.** No HSTS to enforce HTTPS. |
| D4 | 🟡 Medium | Global | **No Dependabot or Renovate** configured for automated dependency updates. |
| D5 | 🟢 Low | [`next.config.js`](next.config.js:9) | **`localhost` in image remotePatterns.** Should be environment-dependent or removed for production. |
| D6 | 🟢 Low | [`.github/workflows/ci.yml`](.github/workflows/ci.yml) | **No caching of `node_modules`** beyond npm cache. No build artifact caching. No matrix testing across Node versions. |

---

## Summary of Critical Blockers

1. **ESLint is completely broken** — `eslint.config.mjs` throws circular JSON error. CI fails.
2. **Zero server components** — entire app is client-rendered. Defeats the purpose of Next.js App Router.
3. **Test coverage below threshold** — 66.66% branch coverage, 15+ components untested.
4. **No social preview images** — og:image and twitter:image missing.
5. **Color contrast failures** — `#7A7A85` on `#0A0A0A` fails WCAG AA.

---

## How to Get to 99/100

| Category | Current | Target | Gap | Key Actions |
|---|---|---|---|---|
| Architecture | 18/25 | 24/25 | +6 | Fix ESLint, remove dead code, consolidate tokens, convert to server components |
| Performance | 13/20 | 19/20 | +6 | Server components, optimize animations, add bundle analysis, responsive fonts |
| Accessibility | 15/20 | 19/20 | +4 | Fix color contrast, keyboard navigation, reduced motion everywhere |
| SEO | 11/15 | 14/15 | +3 | Add og:image, theme-color, expand sitemap |
| Testing | 5/10 | 9/10 | +4 | Cover all components, add E2E tests, reach 85%+ coverage |
| Security | 7/10 | 9/10 | +2 | Add CSP, HSTS, Dependabot, fix CI |
| **Total** | **69** | **94→99** | **+25-30** | See REMEDIATION-PLAN.md for 4-phase execution |

See [`REMEDIATION-PLAN.md`](REMEDIATION-PLAN.md) for the detailed 4-phase plan to reach 99/100.
