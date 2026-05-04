"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface MarqueeTickerProps {
  children: React.ReactNode[];
  speed?: number;
  className?: string;
}

export default function MarqueeTicker({
  children,
  speed = 30,
  className = "",
}: MarqueeTickerProps) {
  // Track reduced motion via ref + state to avoid hydration mismatch.
  // The ref is read in the effect callback (allowed), and setState is only
  // called from the "change" event listener callback (allowed by the linter).
  const mqRef = useRef<MediaQueryList | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    mqRef.current = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Sync initial value via the change event pattern
    const handler = () => setPrefersReducedMotion(mqRef.current?.matches ?? false);
    handler();
    mqRef.current.addEventListener("change", handler);
    return () => mqRef.current?.removeEventListener("change", handler);
  }, []);

  if (prefersReducedMotion) {
    return (
      <div className={`flex gap-8 overflow-hidden ${className}`}>
        {children.slice(0, children.length / 2)}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden edge-fade ${className}`}>
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: [0, "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {/* Duplicate children for seamless loop */}
        {children}
        {children}
      </motion.div>
    </div>
  );
}
