# StratifyX Frontend — 4-Phase Remediation Plan

**Goal:** 58/100 → 95/100  
**Current Score:** 58/100  
**Target Score:** 95/100  
**Estimated Effort:** 4 phases over 2–3 weeks

---

## Score Projection by Phase

```
Current:  ██████████████████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  58/100
Phase 1:  ██████████████████████████████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  72/100  (+14)
Phase 2:  ██████████████████████████████████████████████████████████░░░░░░░░░░░░░░  84/100  (+12)
Phase 3:  ██████████████████████████████████████████████████████████████████░░░░░░  91/100  (+7)
Phase 4:  ████████████████████████████████████████████████████████████████████████  95/100  (+4)
```

---

## Phase 1: Fix the Foundation (58 → 72)
**Duration:** 1–2 days  
**Focus:** Fix broken build, remove dead code, fix critical bugs  
**Issues Addressed:** T1, T2, P1, P3, D1, D2, D3, D4, A1, A7

### Step 1.1 — Fix the Broken Build
**Files:** [`src/styles/globals.css`](src/styles/globals.css)

Remove the broken `@fontsource` imports (lines 7–12). These crash the build and are redundant since [`layout.tsx`](src/app/layout.tsx:9) already uses `next/font/google`.

```css
/* REMOVE these lines: */
@import '@fontsource/inter/400.css';
@import '@fontsource/inter/500.css';
@import '@fontsource/inter/600.css';
@import '@fontsource/inter/700.css';
@import '@fontsource/jetbrains-mono/400.css';
@import '@fontsource/jetbrains-mono/500.css';
```

### Step 1.2 — Remove Unused Dependencies
**File:** [`package.json`](package.json)

Run:
```bash
npm uninstall recharts axios gsap zod zustand @fontsource/inter @fontsource/jetbrains-mono @fontsource/syne @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-popover @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-tabs @radix-ui/react-toast
```

This removes ~900KB of dead JavaScript from the bundle.

### Step 1.3 — Fix Broken Color Reference
**File:** [`src/components/ui/BentoCard.tsx:44`](src/components/ui/BentoCard.tsx:44)

Replace `hover:border-sx-violet/30` with `hover:border-sx-accent/30` — `sx-violet` doesn't exist in the Tailwind config.

### Step 1.4 — Fix Dockerfile Compatibility
**File:** [`next.config.js`](next.config.js)

Add `output: "standalone"` for Docker compatibility and remove deprecated `swcMinify`:

```javascript
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",  // ADD
  images: {
    domains: ['localhost'],
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost' },
    ],
  },
  // REMOVE: swcMinify: true,
  // REMOVE: env block (redundant for NEXT_PUBLIC_ vars)
}
```

### Step 1.5 — Create `public/` Directory
Create `public/` with at least a favicon to fix Docker build (`COPY --from=builder /app/public ./public`).

### Step 1.6 — Remove Dead UI Components
Delete unused components that are never imported anywhere:
- `src/components/ui/BentoCard.tsx`
- `src/components/ui/SpotlightCard.tsx`
- `src/components/ui/ParticleGrid.tsx`
- `src/components/ui/TextScramble.tsx`
- `src/components/ui/skiper-ui/skiper40.tsx`

### Step 1.7 — Remove Empty Placeholder Files
Delete or implement:
- `src/hooks/index.ts` (empty `export {}`)
- `src/services/index.ts` (empty `export {}`)
- `src/store/index.ts` (empty `export {}`)
- `src/utils/index.ts` (empty `export {}`)

### Step 1.8 — Convert Data Files to TypeScript
Rename and add types:
- `src/data/features.js` → `src/data/features.ts`
- `src/data/testimonials.js` → `src/data/testimonials.ts`
- `src/data/pricing.js` → `src/data/pricing.ts`
- `src/data/faq.js` → `src/data/faq.ts`

Add proper interfaces:
```typescript
// src/data/features.ts
export interface Feature {
  id: string;
  title: string;
  description: string;
  label: string;
  size: "sm" | "md" | "lg" | "tall" | "wide";
}

export const features: Feature[] = [/* ... */];
```

### Step 1.9 — Remove Unused Types
**File:** [`src/types/index.ts`](src/types/index.ts)

Remove `User`, `ApiResponse`, `PaginatedResponse` interfaces that are never used, or keep them only if they'll be used soon.

### Step 1.10 — Remove Redundant `env` Config
**File:** [`next.config.js`](next.config.js)

Remove the `env` block — `NEXT_PUBLIC_` variables are automatically exposed by Next.js.

### Phase 1 Verification
```bash
npm run build        # Should succeed
npm run lint         # Should pass
npm run type-check   # Should pass
```

**Expected Score After Phase 1: ~72/100**

| Category | Before | After | Change |
|---|---|---|---|
| Architecture | 12 | 14 | +2 |
| Code Quality | 10 | 13 | +3 |
| Performance | 9 | 14 | +5 |
| Accessibility | 8 | 8 | 0 |
| SEO | 6 | 6 | 0 |
| Security | 7 | 7 | 0 |
| Testing | 0 | 0 | 0 |
| Build & DevOps | 6 | 10 | +4 |

---

## Phase 2: Accessibility & SEO (72 → 84)
**Duration:** 2–3 days  
**Focus:** WCAG compliance, SEO fundamentals, security headers  
**Issues Addressed:** X1–X10, S1–S8, SEC3, SEC5, SEC6, A5

### Step 2.1 — Add `prefers-reduced-motion` Support
**File:** [`src/styles/globals.css`](src/styles/globals.css)

Add at the end of the `@layer base` block:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Step 2.2 — Fix Color Contrast (WCAG AA)
**File:** [`src/styles/tokens.css`](src/styles/tokens.css)

Current values fail WCAG AA (4.5:1 minimum). Update:

```css
/* BEFORE (fails contrast) */
--sx-text-dim:      #44444E;  /* 2.1:1 on #0A0A0A */
--sx-text-muted:    #63636E;  /* 3.2:1 on #0A0A0A */

/* AFTER (passes WCAG AA) */
--sx-text-dim:      #7A7A85;  /* 4.6:1 on #0A0A0A */
--sx-text-muted:    #8E8E99;  /* 5.2:1 on #0A0A0A */
```

Also update the corresponding values in [`tailwind.config.ts`](tailwind.config.ts) lines 38–39.

### Step 2.3 — Add Skip-to-Content Link
**File:** [`src/app/layout.tsx`](src/app/layout.tsx)

Add as first child of `<body>`:

```tsx
<body className={`${inter.variable} font-body bg-sx-bg text-sx-text`}>
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-sx-accent focus:text-sx-bg focus:rounded-md focus:text-sm"
  >
    Skip to content
  </a>
  <CustomCursor />
  <NoiseOverlay />
  <Navbar />
  <main id="main-content">{children}</main>
  <Footer />
</body>
```

### Step 2.4 — Add Semantic Table for Trade Data
**File:** [`src/components/sections/DemoPreview.tsx`](src/components/sections/DemoPreview.tsx)

Replace the trade list `<div>` structure (lines 113–131) with a proper `<table>`:

```tsx
<div className="border-t border-sx-border">
  <div className="px-5 py-2 text-[10px] font-mono text-sx-text-dim uppercase tracking-wider border-b border-sx-border/50">
    Recent Trades
  </div>
  <table className="w-full">
    <thead className="sr-only">
      <tr>
        <th>ID</th><th>Side</th><th>Entry</th><th>Exit</th><th>P&L</th>
      </tr>
    </thead>
    <tbody>
      {fakeTrades.map((t, i) => (
        <tr key={t.id} className={`text-[11px] font-mono ${i % 2 === 0 ? "bg-sx-surface/30" : ""}`}>
          <td className="px-5 py-2 text-sx-text-dim w-8">#{t.id}</td>
          <td className={t.side === "BUY" ? "text-sx-accent" : "text-sx-red"}>{t.side}</td>
          <td className="text-sx-text-muted text-right pr-2">{t.entry}</td>
          <td className="text-sx-text-muted text-right pr-2">{t.exit}</td>
          <td className={`px-5 py-2 text-right font-medium ${t.result === "win" ? "text-sx-accent" : "text-sx-red"}`}>{t.pnl}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
```

### Step 2.5 — Add ARIA States to Interactive Elements
**Files:** Multiple

- [`Pricing.tsx:34-51`](src/components/sections/Pricing.tsx:34) — Add `role="group"` and `aria-pressed` to Monthly/Annually toggle buttons
- [`DemoPreview.tsx:52-63`](src/components/sections/DemoPreview.tsx:52) — Add `aria-pressed` to instrument selector buttons
- [`BrokerLogos.tsx`](src/components/ui/BrokerLogos.tsx) — Add `aria-hidden="true"` to decorative SVGs (they're inside a marquee with text labels)

### Step 2.6 — Add `aria-hidden` to Decorative Marquee
**File:** [`src/components/sections/Hero.tsx:134-143`](src/components/sections/Hero.tsx:134)

```tsx
<motion.div
  aria-hidden="true"  // ADD — decorative content
  initial={{ opacity: 0 }}
  // ...
>
```

### Step 2.7 — Add Focus Trap to Mobile Menu
**File:** [`src/components/layout/Navbar.tsx`](src/components/layout/Navbar.tsx)

Add keyboard handling to trap focus when mobile menu is open:

```tsx
useEffect(() => {
  if (!mobileOpen) return;
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') setMobileOpen(false);
  };
  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, [mobileOpen]);
```

### Step 2.8 — Create SEO Files
**Files:** New files in `public/`

Create `public/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://stratifyx.com/sitemap.xml
```

Create `public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://stratifyx.com</loc>
    <lastmod>2026-05-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

### Step 2.9 — Enhance Metadata
**File:** [`src/app/layout.tsx`](src/app/layout.tsx)

```typescript
export const metadata: Metadata = {
  title: "StratifyX — Test Before You Trade",
  description: "Institutional-grade backtesting for Forex, Crypto & Futures. Test your strategies with tick-accurate historical data before risking real capital.",
  keywords: ["backtesting", "forex", "crypto", "futures", "trading", "strategy testing", "quantitative trading"],
  openGraph: {
    title: "StratifyX — Test Before You Trade",
    description: "Institutional-grade backtesting for Forex, Crypto & Futures.",
    type: "website",
    url: "https://stratifyx.com",
    siteName: "StratifyX",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "StratifyX — Test Before You Trade",
    description: "Institutional-grade backtesting for Forex, Crypto & Futures.",
  },
  alternates: {
    canonical: "https://stratifyx.com",
  },
  metadataBase: new URL("https://stratifyx.com"),
};
```

### Step 2.10 — Add JSON-LD Structured Data
**File:** [`src/app/layout.tsx`](src/app/layout.tsx)

Add FAQ schema matching the FAQ section content, and Organization schema:

```tsx
<head>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "StratifyX",
        "applicationCategory": "FinanceApplication",
        "description": "Institutional-grade backtesting for Forex, Crypto & Futures",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
        },
      }),
    }}
  />
</head>
```

### Step 2.11 — Add Security Headers
**File:** [`next.config.js`](next.config.js)

```javascript
async headers() {
  return [{
    source: '/(.*)',
    headers: [
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      { key: 'X-DNS-Prefetch-Control', value: 'on' },
    ],
  }];
},
```

### Step 2.12 — Create `.env.example`
**File:** `.env.example` (new)

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_WS_URL=ws://localhost:8000/ws
NEXT_PUBLIC_APP_NAME=StratifyX
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 2.13 — Add Error Boundary
**File:** `src/components/ErrorBoundary.tsx` (new)

```tsx
"use client";

import React from "react";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="py-20 text-center text-sx-text-muted">
          <p>Something went wrong.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
```

Wrap key sections in [`page.tsx`](src/app/page.tsx):

```tsx
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function Home() {
  return (
    <>
      <Hero />
      <ErrorBoundary><Features /></ErrorBoundary>
      <ErrorBoundary><HowItWorks /></ErrorBoundary>
      <ErrorBoundary><Stats /></ErrorBoundary>
      <ErrorBoundary><DemoPreview /></ErrorBoundary>
      <ErrorBoundary><Testimonials /></ErrorBoundary>
      <ErrorBoundary><Pricing /></ErrorBoundary>
      <ErrorBoundary><FAQ /></ErrorBoundary>
      <FinalCTA />
    </>
  );
}
```

### Phase 2 Verification
```bash
npm run build
npm run lint
npm run type-check
# Manual: Test with screen reader (VoiceOver/NVDA)
# Manual: Run Lighthouse audit (target: Accessibility 90+)
# Manual: Test keyboard navigation
```

**Expected Score After Phase 2: ~84/100**

| Category | Before | After | Change |
|---|---|---|---|
| Architecture | 14 | 15 | +1 |
| Code Quality | 13 | 13 | 0 |
| Performance | 14 | 14 | 0 |
| Accessibility | 8 | 14 | +6 |
| SEO | 6 | 10 | +4 |
| Security | 7 | 9 | +2 |
| Testing | 0 | 0 | 0 |
| Build & DevOps | 6 | 9 | +3 |

---

## Phase 3: Performance & Code Quality (84 → 91)
**Duration:** 2–3 days  
**Focus:** Performance optimization, TypeScript strictness, animation optimization  
**Issues Addressed:** P2, P4, P5, P6, P7, T3–T12, A2–A4, A6

### Step 3.1 — Optimize NoiseOverlay
**File:** [`src/components/layout/NoiseOverlay.tsx`](src/components/layout/NoiseOverlay.tsx)

Add `prefers-reduced-motion` check and visibility API pause:

```tsx
useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  // Skip if user prefers reduced motion
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motionQuery.matches) return;

  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  let frame = 0;
  let animationId: number;
  let isTabVisible = true;
  const canvasSize = 256;

  const handleVisibility = () => {
    isTabVisible = !document.hidden;
  };
  document.addEventListener("visibilitychange", handleVisibility);

  // ... existing resize and drawGrain functions ...

  const loop = () => {
    if (isTabVisible && frame % 3 === 0) {
      drawGrain();
    }
    frame++;
    animationId = requestAnimationFrame(loop);
  };

  resize();
  loop();

  return () => {
    cancelAnimationFrame(animationId);
    document.removeEventListener("visibilitychange", handleVisibility);
  };
}, []);
```

### Step 3.2 — Optimize CustomCursor
**File:** [`src/components/ui/CustomCursor.tsx`](src/components/ui/CustomCursor.tsx)

Use `requestAnimationFrame` throttling and skip on touch devices:

```tsx
useEffect(() => {
  // Skip on touch devices
  if ('ontouchstart' in window) return;

  const cursor = cursorRef.current;
  if (!cursor) return;

  let rafId: number;
  let mouseX = 0;
  let mouseY = 0;

  const move = (e: MouseEvent) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  };

  const update = () => {
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
    rafId = requestAnimationFrame(update);
  };

  document.addEventListener("mousemove", move, { passive: true });
  rafId = requestAnimationFrame(update);

  // ... handleOver stays the same ...

  return () => {
    document.removeEventListener("mousemove", move);
    cancelAnimationFrame(rafId);
  };
}, []);
```

### Step 3.3 — Add Code Splitting for Below-the-Fold Sections
**File:** [`src/app/page.tsx`](src/app/page.tsx)

```tsx
import { lazy, Suspense } from "react";
import Hero from "@/components/sections/Hero";

const Features = lazy(() => import("@/components/sections/Features"));
const HowItWorks = lazy(() => import("@/components/sections/HowItWorks"));
const Stats = lazy(() => import("@/components/sections/Stats"));
const DemoPreview = lazy(() => import("@/components/sections/DemoPreview"));
const Testimonials = lazy(() => import("@/components/sections/Testimonials"));
const Pricing = lazy(() => import("@/components/sections/Pricing"));
const FAQ = lazy(() => import("@/components/sections/FAQ"));
const FinalCTA = lazy(() => import("@/components/sections/FinalCTA"));

export default function Home() {
  return (
    <>
      <Hero />
      <Suspense>
        <Features />
        <HowItWorks />
        <Stats />
        <DemoPreview />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </Suspense>
    </>
  );
}
```

### Step 3.4 — Self-Host ShadowOverlay Assets
**File:** [`src/components/ui/ShadowOverlay.tsx`](src/components/ui/ShadowOverlay.tsx)

Download the two external images from `framerusercontent.com` and place them in `public/assets/`:
- `public/assets/shadow-mask.png`
- `public/assets/noise-texture.png`

Update references:
```tsx
// Line 153: Change URL
maskImage: `url('/assets/shadow-mask.png')`,

// Line 168: Change URL
backgroundImage: `url("/assets/noise-texture.png")`,
```

### Step 3.5 — Fix TypeScript `any` Usage
**Files:** Multiple

- [`TextScramble.tsx:39,47`](src/components/ui/TextScramble.tsx:39) — Create proper interface:
```typescript
interface QueueItem {
  from: string;
  to: string;
  start: number;
  end: number;
}
const queueRef = useRef<QueueItem[]>([]);
```

- [`api-client.ts:65-88`](src/lib/api-client.ts:65) — Use `unknown` instead of `any`:
```typescript
async get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
```

- [`types/index.ts:9`](src/types/index.ts:9) — Change default:
```typescript
export interface ApiResponse<T = unknown> {
```

### Step 3.6 — Use Design Tokens Instead of Hardcoded Colors
**Files:** Multiple

- [`EquityCurve.tsx:98-103`](src/components/ui/EquityCurve.tsx:98) — Replace hardcoded hex with CSS variables:
```tsx
<stop offset="0%" stopColor="var(--sx-accent)" stopOpacity="0.3" />
<stop offset="100%" stopColor="var(--sx-accent)" stopOpacity="0" />
```

- [`ParticleGrid.tsx`](src/components/ui/ParticleGrid.tsx) — If kept, replace `rgba(108, 71, 255, ...)` with accent color
- [`SpotlightCard.tsx`](src/components/ui/SpotlightCard.tsx) — If kept, update default color

### Step 3.7 — Deduplicate Broker Data
**Files:** [`src/components/sections/Hero.tsx`](src/components/sections/Hero.tsx), [`src/data/testimonials.ts`](src/data/testimonials.ts)

Remove the `brokerNames` array from Hero.tsx and import from the data file:

```tsx
import { brokerLogos } from "@/data/testimonials";
// Use brokerLogos instead of brokerNames
```

### Step 3.8 — Add Suspense Boundaries
**File:** [`src/app/layout.tsx`](src/app/layout.tsx)

```tsx
import { Suspense } from "react";

// Wrap Navbar in Suspense for potential async features
<Suspense fallback={<div className="h-14" />}>
  <Navbar />
</Suspense>
```

### Step 3.9 — Optimize MarqueeTicker for Reduced Motion
**File:** [`src/components/ui/MarqueeTicker.tsx`](src/components/ui/MarqueeTicker.tsx)

```tsx
const prefersReducedMotion = typeof window !== 'undefined'
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : false;

// If reduced motion, render static content instead of animated
if (prefersReducedMotion) {
  return <div className={`flex gap-8 ${className}`}>{children.slice(0, children.length / 2)}</div>;
}
```

### Step 3.10 — Add `rel="preconnect"` for External Resources
**File:** [`src/app/layout.tsx`](src/app/layout.tsx)

If ShadowOverlay assets are still external (before Step 3.4):
```tsx
<head>
  <link rel="preconnect" href="https://framerusercontent.com" />
</head>
```

### Phase 3 Verification
```bash
npm run build
npm run type-check
# Run Lighthouse: target Performance 90+
# Check bundle size: npx @next/bundle-analyzer
```

**Expected Score After Phase 3: ~91/100**

| Category | Before | After | Change |
|---|---|---|---|
| Architecture | 15 | 15 | 0 |
| Code Quality | 13 | 15 | +2 |
| Performance | 14 | 15 | +1 |
| Accessibility | 14 | 14 | 0 |
| SEO | 10 | 10 | 0 |
| Security | 9 | 9 | 0 |
| Testing | 0 | 0 | 0 |
| Build & DevOps | 9 | 9 | 0 |

---

## Phase 4: Testing & Polish (91 → 95+)
**Duration:** 3–5 days  
**Focus:** Testing infrastructure, CI/CD, final polish  
**Issues Addressed:** TS1–TS5, D6–D9, SEC1

### Step 4.1 — Set Up Testing Framework
```bash
npm install -D jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom @types/jest
```

**File:** `jest.config.ts` (new)
```typescript
import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({ dir: "./" });

const config: Config = {
  testEnvironment: "jsdom",
  setupFilesAfterSetup: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60,
    },
  },
};

export default createJestConfig(config);
```

**File:** `jest.setup.ts` (new)
```typescript
import "@testing-library/jest-dom";
```

**File:** [`package.json`](package.json) — Add scripts:
```json
"test": "jest",
"test:watch": "jest --watch",
"test:coverage": "jest --coverage"
```

### Step 4.2 — Write Critical Path Tests

**File:** `src/components/sections/Hero.test.tsx` (new)
```tsx
import { render, screen } from "@testing-library/react";
import Hero from "./Hero";

describe("Hero", () => {
  it("renders headline", () => {
    render(<Hero />);
    expect(screen.getByText(/Test Before/)).toBeInTheDocument();
  });

  it("renders CTA buttons", () => {
    render(<Hero />);
    expect(screen.getByText("Start for Free")).toBeInTheDocument();
    expect(screen.getByText("Watch Demo")).toBeInTheDocument();
  });

  it("renders trust stats", () => {
    render(<Hero />);
    expect(screen.getByText(/4,200\+ traders/)).toBeInTheDocument();
  });
});
```

**File:** `src/components/sections/FAQ.test.tsx` (new)
```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import FAQ from "./FAQ";

describe("FAQ", () => {
  it("renders all questions", () => {
    render(<FAQ />);
    expect(screen.getByText(/What is backtesting/)).toBeInTheDocument();
  });

  it("toggles answer on click", () => {
    render(<FAQ />);
    const question = screen.getByText(/What is backtesting/);
    fireEvent.click(question);
    expect(screen.getByText(/Backtesting is the process/)).toBeInTheDocument();
  });
});
```

**File:** `src/components/sections/Pricing.test.tsx` (new)
```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import Pricing from "./Pricing";

describe("Pricing", () => {
  it("renders all tiers", () => {
    render(<Pricing />);
    expect(screen.getByText("Free")).toBeInTheDocument();
    expect(screen.getByText("Pro")).toBeInTheDocument();
    expect(screen.getByText("Institutional")).toBeInTheDocument();
  });

  it("toggles between monthly and annual", () => {
    render(<Pricing />);
    const annualBtn = screen.getByText(/Annually/);
    fireEvent.click(annualBtn);
    expect(screen.getByText("$39")).toBeInTheDocument();
  });
});
```

**File:** `src/hooks/useInView.test.ts` (new)
```tsx
import { renderHook } from "@testing-library/react";
import { useInView } from "./useInView";

describe("useInView", () => {
  it("returns false initially", () => {
    const ref = { current: null };
    const { result } = renderHook(() => useInView(ref));
    expect(result.current).toBe(false);
  });
});
```

**File:** `src/lib/utils.test.ts` (new)
```tsx
import { cn } from "./utils";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("deduplicates tailwind classes", () => {
    expect(cn("px-4", "px-8")).toBe("px-8");
  });
});
```

### Step 4.3 — Set Up E2E Testing
```bash
npm install -D @playwright/test
```

**File:** `playwright.config.ts` (new)
```typescript
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  webServer: {
    command: "npm run dev",
    port: 3000,
  },
  use: {
    baseURL: "http://localhost:3000",
  },
});
```

**File:** `e2e/homepage.spec.ts` (new)
```tsx
import { test, expect } from "@playwright/test";

test("homepage loads and has correct title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/StratifyX/);
});

test("navigation links work", async ({ page }) => {
  await page.goto("/");
  await page.click('a[href="#features"]');
  await expect(page.locator("#features")).toBeVisible();
});

test("FAQ accordion opens", async ({ page }) => {
  await page.goto("/");
  const faqButton = page.locator("button", { hasText: "What is backtesting" });
  await faqButton.click();
  await expect(page.locator("text=Backtesting is the process")).toBeVisible();
});

test("pricing toggle works", async ({ page }) => {
  await page.goto("/");
  await page.click('button:has-text("Annually")');
  await expect(page.locator("text=$39")).toBeVisible();
});
```

### Step 4.4 — Set Up Prettier + Husky + lint-staged
```bash
npm install -D prettier husky lint-staged
```

**File:** `.prettierrc` (new)
```json
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

**File:** [`package.json`](package.json) — Add:
```json
"lint-staged": {
  "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{json,css,md}": ["prettier --write"]
}
```

Initialize husky:
```bash
npx husky init
echo "npx lint-staged" > .husky/pre-commit
```

### Step 4.5 — Add Bundle Analyzer
```bash
npm install -D @next/bundle-analyzer
```

**File:** [`next.config.js`](next.config.js)
```javascript
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
```

### Step 4.6 — Migrate Auth Token to httpOnly Cookies
**File:** [`src/lib/api-client.ts`](src/lib/api-client.ts)

Replace `localStorage` token management with cookie-based auth:

```typescript
private getToken(): string | null {
  if (typeof window !== 'undefined') {
    const match = document.cookie.match(/auth_token=([^;]+)/);
    return match ? match[1] : null;
  }
  return null;
}

private clearToken(): void {
  if (typeof window !== 'undefined') {
    document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure';
  }
}

public setToken(token: string): void {
  if (typeof window !== 'undefined') {
    document.cookie = `auth_token=${token}; path=/; SameSite=Strict; Secure; max-age=86400`;
  }
}
```

### Step 4.7 — Add CI/CD Pipeline
**File:** `.github/workflows/ci.yml` (new)

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test -- --coverage
      - run: npm run build
```

### Step 4.8 — Final Cleanup
- Remove unused `src/components/ui/button.tsx`, `card.tsx`, `input.tsx` if not used (they're shadcn components that may be needed later — keep if planned)
- Remove unused `src/components/ui/MagicButton.tsx` if not used in any section
- Remove `src/components/sections/SocialProof.tsx` if not used (it's not imported in `page.tsx`)
- Update [`tailwind.config.ts`](tailwind.config.ts) content paths to remove references to deleted files
- Run `npm run build` and verify zero warnings

### Phase 4 Verification
```bash
npm run test -- --coverage    # Target: 60%+ coverage
npm run build                  # Zero errors, zero warnings
npm run lint                   # Zero warnings
npm run type-check             # Zero errors
npx playwright test            # All e2e tests pass
# Run Lighthouse: target all categories 90+
```

**Expected Score After Phase 4: 95/100**

| Category | Before | After | Change |
|---|---|---|---|
| Architecture | 15 | 15 | 0 |
| Code Quality | 15 | 15 | 0 |
| Performance | 15 | 15 | 0 |
| Accessibility | 14 | 14 | 0 |
| SEO | 10 | 10 | 0 |
| Security | 9 | 10 | +1 |
| Testing | 0 | 8 | +8 |
| Build & DevOps | 9 | 10 | +1 |

---

## Summary: Score Progression

| Phase | Focus | Duration | Score | Delta |
|---|---|---|---|---|
| **Current** | — | — | **58** | — |
| **Phase 1** | Fix Foundation | 1–2 days | **72** | +14 |
| **Phase 2** | A11y & SEO | 2–3 days | **84** | +12 |
| **Phase 3** | Performance & Quality | 2–3 days | **91** | +7 |
| **Phase 4** | Testing & Polish | 3–5 days | **95** | +4 |

**Total estimated time: 8–13 days of focused work**

---

## Quick Reference: All Issues by Phase

### Phase 1 Issues
T1, T2, P1, P3, D1, D2, D3, D4, A1, A7

### Phase 2 Issues
X1, X2, X3, X4, X5, X6, X7, X8, X9, X10, S1, S2, S3, S4, S5, S6, S7, S8, SEC3, SEC5, SEC6, A5

### Phase 3 Issues
P2, P4, P5, P6, P7, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, A2, A3, A4, A6

### Phase 4 Issues
TS1, TS2, TS3, TS4, TS5, D6, D7, D8, D9, SEC1
