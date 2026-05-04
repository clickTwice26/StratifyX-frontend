# StratifyX Frontend — Full Audit Report

**Date:** 2026-05-04  
**Auditor:** Roo (Automated Code Audit)  
**Stack:** Next.js 14.1 · React 18 · TypeScript 5 · Tailwind CSS 3 · Framer Motion 11 · GSAP 3.15

---

## Overall Score: 58 / 100

| Category | Score | Max | Grade |
|---|---|---|---|
| Architecture & Project Structure | 12 | 15 | B |
| Code Quality & TypeScript | 10 | 15 | C |
| Performance | 9 | 15 | D |
| Accessibility (a11y) | 8 | 15 | D |
| SEO | 6 | 10 | D |
| Security | 7 | 10 | C |
| Testing | 0 | 10 | F |
| Build & DevOps | 6 | 10 | D |

---

## 1. Architecture & Project Structure — 12/15

### ✅ What's Good
- Clean Next.js App Router structure with logical separation (`layout/`, `sections/`, `ui/`)
- Design tokens centralized in [`tokens.css`](src/styles/tokens.css)
- Config centralized in [`src/config/index.ts`](src/config/index.ts)
- Path aliases properly configured in [`tsconfig.json`](tsconfig.json)
- shadcn/ui integration via [`components.json`](components.json)
- Consistent component export patterns

### ❌ Issues Found

| # | Severity | File | Issue |
|---|---|---|---|
| A1 | 🔴 High | `src/data/*.js` | Data files use `.js` extension instead of `.ts` — no type safety for features, testimonials, pricing, FAQ data |
| A2 | 🟡 Medium | `src/hooks/index.ts`, `src/services/index.ts`, `src/store/index.ts`, `src/utils/index.ts` | All placeholder files with `export {}` — dead scaffolding that adds confusion |
| A3 | 🟡 Medium | `src/types/index.ts` | Types defined (`User`, `ApiResponse`, `PaginatedResponse`) but never imported or used anywhere in the codebase |
| A4 | 🟡 Medium | `src/components/sections/Hero.tsx:15-26` | `brokerNames` array duplicates data from [`brokerLogos`](src/data/testimonials.js:52) in testimonials.js |
| A5 | 🟡 Medium | Multiple | No error boundaries — a single component crash will break the entire page |
| A6 | 🟡 Medium | Multiple | No loading states or `<Suspense>` boundaries for async content |
| A7 | 🟢 Low | `BentoCard`, `SpotlightCard`, `ParticleGrid`, `TextScramble` | These UI components exist but are **never used** in any page — dead code |

### 🔧 How to Fix
1. Rename all `.js` data files to `.ts` and add proper interfaces
2. Remove empty placeholder files or implement them
3. Create an `ErrorBoundary` component and wrap key sections
4. Deduplicate broker data into a single source of truth
5. Remove unused components or document them for future use

---

## 2. Code Quality & TypeScript — 10/15

### ✅ What's Good
- TypeScript strict mode enabled
- Consistent interface definitions for component props
- Good use of `as const` for config objects
- Proper `Readonly<>` type for layout props

### ❌ Issues Found

| # | Severity | File | Issue |
|---|---|---|---|
| T1 | 🔴 High | [`globals.css:7-12`](src/styles/globals.css:7) | `@fontsource/inter/400.css` imports **crash the build** — module not found. These are redundant since `layout.tsx` uses `next/font/google` |
| T2 | 🔴 High | [`BentoCard.tsx:44`](src/components/ui/BentoCard.tsx:44) | References `hover:border-sx-violet/30` but `sx-violet` is **not defined** in Tailwind config — broken styling |
| T3 | 🟡 Medium | [`TextScramble.tsx:39`](src/components/ui/TextScramble.tsx:39) | `as any` type assertion — `queueRef.current.push({ from, to, start, end } as any)` |
| T4 | 🟡 Medium | [`TextScramble.tsx:47`](src/components/ui/TextScramble.tsx:47) | Another `as any` — `const { from, to, start, end } = queueRef.current[i] as any` |
| T5 | 🟡 Medium | [`api-client.ts:65-88`](src/lib/api-client.ts:65) | All generic methods default to `T = any` — defeats TypeScript's purpose |
| T6 | 🟡 Medium | [`types/index.ts:9`](src/types/index.ts:9) | `ApiResponse<T = any>` uses `any` default |
| T7 | 🟡 Medium | [`ParticleGrid.tsx:61`](src/components/ui/ParticleGrid.tsx:61) | Hardcoded purple `rgba(108, 71, 255, ...)` — inconsistent with green accent theme |
| T8 | 🟡 Medium | [`SpotlightCard.tsx:14`](src/components/ui/SpotlightCard.tsx:14) | Default `spotlightColor` uses purple — inconsistent with design system |
| T9 | 🟡 Medium | [`EquityCurve.tsx:98-103`](src/components/ui/EquityCurve.tsx:98) | Hardcoded colors `#00FF9D`, `#00D4FF`, `#FF3B5C` instead of design tokens |
| T10 | 🟡 Medium | [`ShadowOverlay.tsx:153`](src/components/ui/ShadowOverlay.tsx:153) | Loads mask image from `framerusercontent.com` — external CDN dependency with no fallback |
| T11 | 🟢 Low | `useGSAP.ts`, `useScrollTrigger.ts`, `useInView.ts`, `TextScramble.tsx` | `eslint-disable-next-line react-hooks/exhaustive-deps` suppresses important dependency warnings |
| T12 | 🟢 Low | [`globals.css:108`](src/styles/globals.css:108) | References `var(--ease-out)` which is defined in tokens.css — works but fragile coupling |

### 🔧 How to Fix
1. **Remove lines 7-12 from [`globals.css`](src/styles/globals.css:7)** — the `@fontsource` imports are broken and redundant
2. Replace `sx-violet` with `sx-accent` in BentoCard
3. Create proper TypeScript interfaces for TextScramble queue items
4. Replace all `any` generics with proper types
5. Use design tokens (`var(--sx-accent)`) instead of hardcoded colors
6. Self-host the ShadowOverlay mask image or use a CSS-only alternative

---

## 3. Performance — 9/15

### ✅ What's Good
- `next/font/google` with `display: "swap"` for optimal font loading
- `IntersectionObserver`-based lazy animations via [`useInView`](src/hooks/useInView.ts)
- `requestAnimationFrame` for smooth 60fps animations
- `viewport={{ once: true }}` on Framer Motion — animations trigger only once
- `passive: true` on scroll listener in [`Navbar.tsx`](src/components/layout/Navbar.tsx:20)
- Dynamic import for GSAP ScrollTrigger plugin

### ❌ Issues Found

| # | Severity | File | Issue |
|---|---|---|---|
| P1 | 🔴 Critical | [`globals.css:7-12`](src/styles/globals.css:7) + [`layout.tsx:9-13`](src/app/layout.tsx:9) | **Duplicate font loading** — `@fontsource` CSS imports AND `next/font/google` both load Inter. Double network requests + build crash |
| P2 | 🔴 High | [`NoiseOverlay.tsx:39-45`](src/components/layout/NoiseOverlay.tsx:39) | Continuous `requestAnimationFrame` loop drawing random pixels **on every page** — significant CPU/GPU drain. Runs even when not visible |
| P3 | 🔴 High | `package.json` | **Massive unused dependencies**: `recharts` (~400KB), `axios`, `gsap`, `zod`, `zustand`, 10+ Radix UI packages — all imported but never used. Estimated **500KB+ of dead JavaScript** |
| P4 | 🟡 Medium | [`CustomCursor.tsx:29-30`](src/components/ui/CustomCursor.tsx:29) | `mousemove` + `mouseover` listeners on `document` — continuous event processing on every mouse movement |
| P5 | 🟡 Medium | [`MarqueeTicker.tsx:20-28`](src/components/ui/MarqueeTicker.tsx:20) | Infinite Framer Motion animation — continuous GPU compositing layer |
| P6 | 🟡 Medium | [`ShadowOverlay.tsx:153`](src/components/ui/ShadowOverlay.tsx:153) | Loads images from external CDN at runtime — no caching control, blocks rendering |
| P7 | 🟡 Medium | [`page.tsx`](src/app/page.tsx) | All 9 sections load synchronously on initial page — no dynamic imports or code splitting |
| P8 | 🟢 Low | [`ParticleGrid.tsx:50-66`](src/components/ui/ParticleGrid.tsx:50) | O(n²) particle connection algorithm — though component appears unused |
| P9 | 🟢 Low | Multiple | No `<link rel="preconnect">` for external resources |
| P10 | 🟢 Low | Multiple | No image optimization strategy (no `<Image>` component usage, no WebP/AVIF) |

### 🔧 How to Fix
1. **Remove `@fontsource` imports from [`globals.css`](src/styles/globals.css:7)** — use only `next/font/google`
2. Add `prefers-reduced-motion` check to [`NoiseOverlay`](src/components/layout/NoiseOverlay.tsx) and pause when tab is hidden
3. **Run `npm uninstall recharts axios gsap zod zustand @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-popover @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-tabs @radix-ui/react-toast`** to remove ~500KB of dead code
4. Use `React.lazy()` + `<Suspense>` for below-the-fold sections
5. Add `document.hidden` check to pause animations when tab is not active
6. Self-host ShadowOverlay assets

---

## 4. Accessibility (a11y) — 8/15

### ✅ What's Good
- `aria-expanded` on FAQ accordion buttons in [`FAQ.tsx:24`](src/components/sections/FAQ.tsx:24)
- `aria-label` on social links and mobile menu toggle
- `aria-hidden="true"` on decorative elements (NoiseOverlay, CustomCursor, ParticleGrid)
- `:focus-visible` outline styles in [`globals.css:65-68`](src/styles/globals.css:65)
- `lang="en"` on `<html>` element
- Semantic HTML: `<section>`, `<nav>`, `<header>`, `<footer>`, `<main>`

### ❌ Issues Found

| # | Severity | File | Issue |
|---|---|---|---|
| X1 | 🔴 High | [`globals.css`](src/styles/globals.css) | **No `prefers-reduced-motion` support** — all animations play regardless of user preference. Critical for users with vestibular disorders |
| X2 | 🔴 High | Multiple | **Color contrast failures**: `text-sx-text-dim` (#44444E) on `bg-sx-bg` (#0A0A0A) = **2.1:1 ratio** (WCAG AA requires 4.5:1). `text-sx-text-muted` (#63636E) on `bg-sx-bg` = **3.2:1** |
| X3 | 🔴 High | [`layout.tsx`](src/app/layout.tsx) | **No skip-to-content link** — keyboard users must tab through entire navbar |
| X4 | 🟡 Medium | [`DemoPreview.tsx:117-130`](src/components/sections/DemoPreview.tsx:117) | Trade data rendered with `<div>` instead of `<table>` — **not accessible to screen readers** |
| X5 | 🟡 Medium | [`Pricing.tsx:33-51`](src/components/sections/Pricing.tsx:33) | Monthly/Annually toggle lacks `role="switch"` or `aria-pressed` |
| X6 | 🟡 Medium | [`DemoPreview.tsx:52-63`](src/components/sections/DemoPreview.tsx:52) | Instrument selector buttons lack `aria-pressed` state |
| X7 | 🟡 Medium | [`BrokerLogos.tsx`](src/components/ui/BrokerLogos.tsx) | SVG logos lack `aria-label` or `role="img"` |
| X8 | 🟡 Medium | [`Hero.tsx:140`](src/components/sections/Hero.tsx:140) | Broker marquee is decorative but not marked `aria-hidden` |
| X9 | 🟢 Low | [`Footer.tsx:92`](src/components/layout/Footer.tsx:92) | All footer links point to `#` — dead links that confuse screen readers |
| X10 | 🟢 Low | [`Navbar.tsx`](src/components/layout/Navbar.tsx) | Mobile menu lacks focus trap — keyboard users can tab behind the overlay |

### 🔧 How to Fix
1. Add to [`globals.css`](src/styles/globals.css):
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```
2. Increase `text-sx-text-dim` to at least `#7A7A85` and `text-sx-text-muted` to at least `#8A8A95`
3. Add skip-to-content link as first child of `<body>`
4. Convert trade data to semantic `<table>` with `<thead>`, `<tbody>`, `<th>`, `<td>`
5. Add `aria-pressed` to toggle buttons
6. Add focus trap to mobile menu

---

## 5. SEO — 6/10

### ✅ What's Good
- Metadata with title, description, keywords in [`layout.tsx:15-34`](src/app/layout.tsx:15)
- OpenGraph tags present
- Semantic HTML structure with proper heading hierarchy
- `lang="en"` attribute

### ❌ Issues Found

| # | Severity | File | Issue |
|---|---|---|---|
| S1 | 🔴 High | Project root | **No `robots.txt`** file |
| S2 | 🔴 High | Project root | **No `sitemap.xml`** file |
| S3 | 🟡 Medium | [`layout.tsx`](src/app/layout.tsx) | **No Twitter Card meta tags** (`twitter:card`, `twitter:title`, `twitter:description`) |
| S4 | 🟡 Medium | [`layout.tsx`](src/app/layout.tsx) | **No canonical URL** |
| S5 | 🟡 Medium | [`layout.tsx`](src/app/layout.tsx) | **No OG image** specified — social shares will have no preview image |
| S6 | 🟡 Medium | Project root | **No structured data** (JSON-LD) for Organization, Product, or FAQ schema |
| S7 | 🟡 Medium | Project root | **No favicon** configured — no `icon` in metadata, no `public/favicon.ico` |
| S8 | 🟢 Low | Project root | No `manifest.json` for PWA support |

### 🔧 How to Fix
1. Create `public/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://stratifyx.com/sitemap.xml
```
2. Create `public/sitemap.xml` or use `next-sitemap` package
3. Add to metadata in [`layout.tsx`](src/app/layout.tsx):
```typescript
twitter: {
  card: "summary_large_image",
  title: "StratifyX — Test Before You Trade",
  description: "Institutional-grade backtesting for Forex, Crypto & Futures.",
},
alternates: {
  canonical: "https://stratifyx.com",
},
```
4. Add JSON-LD structured data for FAQ (matches the FAQ section content)
5. Add favicon files to `public/` directory

---

## 6. Security — 7/10

### ✅ What's Good
- `rel="noopener noreferrer"` on external links in [`Footer.tsx:72`](src/components/layout/Footer.tsx:72)
- Token management with get/set/clear in [`api-client.ts:46-63`](src/lib/api-client.ts:46)
- 401 interceptor handles unauthorized access in [`api-client.ts:36`](src/lib/api-client.ts:36)
- Environment variables for API URL configuration

### ❌ Issues Found

| # | Severity | File | Issue |
|---|---|---|---|
| SEC1 | 🔴 High | [`api-client.ts:48`](src/lib/api-client.ts:48) | **Auth token stored in `localStorage`** — vulnerable to XSS attacks. Should use httpOnly cookies |
| SEC2 | 🟡 Medium | [`next.config.js:14-16`](next.config.js:14) | `env` config redundantly exposes `NEXT_PUBLIC_API_URL` — `NEXT_PUBLIC_` vars are already client-exposed |
| SEC3 | 🟡 Medium | Project root | **No Content Security Policy (CSP)** headers configured |
| SEC4 | 🟡 Medium | [`ShadowOverlay.tsx:153`](src/components/ui/ShadowOverlay.tsx:153) | Loads resources from `framerusercontent.com` — third-party dependency without Subresource Integrity (SRI) |
| SEC5 | 🟢 Low | Project root | **No `.env.example`** file — developers don't know required environment variables |
| SEC6 | 🟢 Low | [`next.config.js`](next.config.js) | No security headers configured (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`) |

### 🔧 How to Fix
1. Migrate auth token to httpOnly cookies with `SameSite=Strict`
2. Remove redundant `env` config from [`next.config.js`](next.config.js)
3. Add security headers via `next.config.js`:
```javascript
async headers() {
  return [{
    source: '/(.*)',
    headers: [
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    ],
  }];
}
```
4. Create `.env.example` with all required variables
5. Self-host ShadowOverlay assets to eliminate third-party dependency

---

## 7. Testing — 0/10

### ❌ Issues Found

| # | Severity | Issue |
|---|---|---|
| TS1 | 🔴 Critical | **Zero test files** — no unit tests, integration tests, or e2e tests exist |
| TS2 | 🔴 Critical | No test framework configured (no Jest, Vitest, or Playwright config) |
| TS3 | 🔴 High | No test scripts in `package.json` beyond `type-check` |
| TS4 | 🟡 Medium | No CI/CD pipeline visible (no `.github/workflows/`, no `Jest` config) |
| TS5 | 🟡 Medium | No test coverage thresholds configured |

### 🔧 How to Fix
1. Install and configure testing stack:
```bash
npm install -D jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom
npm install -D @playwright/test  # for e2e
```
2. Create `jest.config.ts` with path aliases
3. Add test scripts to `package.json`:
```json
"test": "jest",
"test:watch": "jest --watch",
"test:coverage": "jest --coverage",
"test:e2e": "playwright test"
```
4. Write tests for critical paths:
   - Component rendering tests for all sections
   - Hook tests for `useInView`, `useGSAP`
   - API client tests with mocked axios
   - E2e tests for navigation, FAQ accordion, pricing toggle
5. Set minimum coverage threshold to 70%

---

## 8. Build & DevOps — 6/10

### ✅ What's Good
- Multi-stage Dockerfile with proper layer caching in [`Dockerfile`](Dockerfile)
- `type-check` script in `package.json`
- ESLint configured with `next/core-web-vitals`
- PostCSS configured
- `.dockerignore` present

### ❌ Issues Found

| # | Severity | File | Issue |
|---|---|---|---|
| D1 | 🔴 Critical | [`globals.css:7`](src/styles/globals.css:7) | **Build is currently broken** — `@fontsource/inter/400.css` module not found |
| D2 | 🟡 Medium | [`Dockerfile:31`](Dockerfile:31) | References `public` directory but none exists — Docker build will fail |
| D3 | 🟡 Medium | [`Dockerfile:38`](Dockerfile:38) | Uses `output: "standalone"` mode but [`next.config.js`](next.config.js) doesn't set `output: "standalone"` |
| D4 | 🟡 Medium | [`next.config.js:4`](next.config.js:4) | `swcMinify: true` is deprecated in Next.js 14+ (SWC is default) |
| D5 | 🟡 Medium | Project root | No `.env.example` file |
| D6 | 🟡 Medium | Project root | No pre-commit hooks (husky + lint-staged) |
| D7 | 🟡 Medium | Project root | No Prettier configuration |
| D8 | 🟢 Low | Project root | No bundle analyzer configured (`@next/bundle-analyzer`) |
| D9 | 🟢 Low | Project root | No CI/CD configuration |

### 🔧 How to Fix
1. **Fix the build** by removing `@fontsource` imports from [`globals.css`](src/styles/globals.css:7-12)
2. Create `public/` directory with at least a favicon
3. Add `output: "standalone"` to [`next.config.js`](next.config.js) for Docker compatibility
4. Remove deprecated `swcMinify: true`
5. Install and configure:
```bash
npm install -D prettier husky lint-staged @next/bundle-analyzer
```
6. Create `.env.example`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_WS_URL=ws://localhost:8000/ws
NEXT_PUBLIC_APP_NAME=StratifyX
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Priority Action Plan

### 🔴 Immediate (Fix Today)
1. **Fix broken build** — Remove `@fontsource` imports from [`globals.css`](src/styles/globals.css:7-12)
2. **Remove unused dependencies** — `npm uninstall recharts axios gsap zod zustand @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-popover @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-tabs @radix-ui/react-toast` (saves ~500KB+)
3. **Fix `sx-violet` reference** in [`BentoCard.tsx:44`](src/components/ui/BentoCard.tsx:44)

### 🟡 This Week
4. Add `prefers-reduced-motion` support
5. Fix color contrast for `text-sx-text-dim` and `text-sx-text-muted`
6. Add skip-to-content link
7. Convert data files from `.js` to `.ts` with proper types
8. Add `robots.txt` and `sitemap.xml`
9. Add Twitter Card and canonical URL metadata
10. Add security headers to `next.config.js`

### 🟢 This Month
11. Set up testing framework and write critical path tests
12. Add error boundaries
13. Implement code splitting with `React.lazy()` for below-the-fold sections
14. Add Prettier + Husky + lint-staged
15. Create `.env.example`
16. Add JSON-LD structured data
17. Optimize NoiseOverlay to pause when tab is hidden / reduced motion
18. Add CI/CD pipeline

---

## Dependency Audit

### Unused Dependencies (Remove These)
| Package | Size (approx) | Status |
|---|---|---|
| `recharts` | ~400KB | ❌ Never imported |
| `axios` | ~14KB | ❌ Only in unused `api-client.ts` |
| `gsap` | ~30KB | ❌ Only in unused hooks |
| `zod` | ~14KB | ❌ Never imported |
| `zustand` | ~3KB | ❌ Store is empty |
| `@radix-ui/react-accordion` | ~8KB | ❌ Never imported |
| `@radix-ui/react-alert-dialog` | ~8KB | ❌ Never imported |
| `@radix-ui/react-avatar` | ~4KB | ❌ Never imported |
| `@radix-ui/react-checkbox` | ~4KB | ❌ Never imported |
| `@radix-ui/react-dialog` | ~8KB | ❌ Never imported |
| `@radix-ui/react-dropdown-menu` | ~8KB | ❌ Never imported |
| `@radix-ui/react-label` | ~2KB | ❌ Never imported |
| `@radix-ui/react-popover` | ~8KB | ❌ Never imported |
| `@radix-ui/react-select` | ~12KB | ❌ Never imported |
| `@radix-ui/react-separator` | ~2KB | ❌ Never imported |
| `@radix-ui/react-tabs` | ~6KB | ❌ Never imported |
| `@radix-ui/react-toast` | ~8KB | ❌ Never imported |
| `@fontsource/inter` | ~200KB | ❌ Redundant with next/font |
| `@fontsource/jetbrains-mono` | ~100KB | ❌ Not used via @fontsource |
| `@fontsource/syne` | ~80KB | ❌ Never imported anywhere |

**Total removable: ~900KB+ of dead dependencies**

### Actually Used Dependencies
| Package | Used By |
|---|---|
| `next` | Core framework |
| `react` / `react-dom` | Core framework |
| `framer-motion` | All section animations, MarqueeTicker, Pricing, FAQ |
| `lucide-react` | Icons throughout |
| `clsx` + `tailwind-merge` | [`cn()` utility](src/lib/utils.ts) |
| `class-variance-authority` | [`button.tsx`](src/components/ui/button.tsx) |
| `tailwindcss-animate` | Tailwind plugin |
| `@radix-ui/react-slot` | [`button.tsx`](src/components/ui/button.tsx) |

---

## Score Breakdown Summary

```
Architecture & Structure:  ████████████░░░  12/15
Code Quality & TypeScript: ██████████░░░░░  10/15
Performance:               █████████░░░░░░   9/15
Accessibility:             ████████░░░░░░░   8/15
SEO:                       ██████░░░░░░░░░   6/10
Security:                  ███████░░░░░░░░   7/10
Testing:                   ░░░░░░░░░░░░░░░   0/10
Build & DevOps:            ██████░░░░░░░░░   6/10
─────────────────────────────────────────────
TOTAL:                     ████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  58/100
```

### Path to 90+ Score
1. Fix build + remove dead deps → **+8 points** (Performance + Build)
2. Add testing framework + critical tests → **+8 points** (Testing)
3. Fix a11y issues (contrast, reduced-motion, skip-link, semantic tables) → **+7 points** (Accessibility)
4. Add SEO files + metadata → **+3 points** (SEO)
5. Fix TypeScript issues + remove `any` → **+3 points** (Code Quality)
6. Add security headers + CSP → **+2 points** (Security)
7. Add error boundaries + Suspense → **+2 points** (Architecture)

**Projected score after fixes: ~91/100**
