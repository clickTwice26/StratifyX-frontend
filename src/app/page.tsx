import { lazy, Suspense } from "react";
import Hero from "@/components/sections/Hero";
import { ErrorBoundary } from "@/components/ErrorBoundary";

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
        <ErrorBoundary>
          <Features />
        </ErrorBoundary>
        <ErrorBoundary>
          <HowItWorks />
        </ErrorBoundary>
        <ErrorBoundary>
          <Stats />
        </ErrorBoundary>
        <ErrorBoundary>
          <DemoPreview />
        </ErrorBoundary>
        <ErrorBoundary>
          <Testimonials />
        </ErrorBoundary>
        <ErrorBoundary>
          <Pricing />
        </ErrorBoundary>
        <ErrorBoundary>
          <FAQ />
        </ErrorBoundary>
        <ErrorBoundary>
          <FinalCTA />
        </ErrorBoundary>
      </Suspense>
    </>
  );
}
