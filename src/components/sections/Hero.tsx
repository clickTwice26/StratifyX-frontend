"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ShadowOverlay from "@/components/ui/ShadowOverlay";
import MarqueeTicker from "@/components/ui/MarqueeTicker";
import { logoMap } from "@/components/ui/BrokerLogos";
import { brokerLogos } from "@/data/testimonials";

const trustStats = [
  "4,200+ traders",
  "12M+ backtests",
  "99.97% uptime",
];

export default function Hero() {
  const marqueeItems = brokerLogos.map((name) => {
    const LogoComponent = logoMap[name];
    return (
      <div
        key={name}
        className="flex items-center gap-3 px-7 whitespace-nowrap"
      >
        <div className="text-sx-text-dim opacity-50">
          {LogoComponent && <LogoComponent />}
        </div>
        <span className="text-[18px] font-semibold text-sx-text-muted tracking-extra-tight">
          {name}
        </span>
      </div>
    );
  });

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden">
      {/* ShadowOverlay background */}
      <div className="absolute inset-0">
        <ShadowOverlay
          sizing="fill"
          color="rgba(45, 212, 168, 0.30)"
          animation={{ scale: 70, speed: 80 }}
          noise={{ opacity: 20, scale: 1.0 }}
        />
      </div>

      {/* Content — left-aligned */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-5 lg:px-6 w-full pt-20 md:pt-28 pb-10 flex-1 flex items-center">
        <div className="max-w-full lg:max-w-[640px]">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="mb-5"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-sx-border px-3 py-1 text-[12px] font-mono font-medium text-sx-text-muted tracking-snug">
              <span className="h-1.5 w-1.5 rounded-full bg-sx-accent blink" />
              Now in Open Beta
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="text-[36px] sm:text-[44px] md:text-[56px] lg:text-hero text-sx-text mb-4 leading-[1.08] tracking-[-0.03em] font-semibold"
          >
            Test Before<br />You Trade.
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            className="text-[16px] md:text-[18px] text-sx-text-secondary leading-relaxed mb-6 md:mb-8 max-w-full md:max-w-[440px]"
          >
            Institutional-grade backtesting for Forex, Crypto &amp; Futures.
            Validate strategies before risking real capital.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6 md:mb-8"
          >
            <a
              href="#start"
              className="inline-flex items-center h-11 md:h-12 px-6 md:px-7 rounded-full bg-white text-[#0A0A0A] text-[14px] md:text-[15px] font-medium tracking-extra-tight transition-colors duration-200 hover:bg-[#E0E0E0]"
            >
              Start for Free
            </a>
            <a
              href="#demo"
              className="inline-flex items-center gap-2 h-11 md:h-12 px-6 md:px-7 rounded-full border border-sx-border-light text-sx-text text-[14px] md:text-[15px] font-medium tracking-extra-tight transition-colors duration-200 hover:border-sx-text-muted"
            >
              Watch Demo
            </a>
          </motion.div>

          {/* Trust bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.5 }}
            className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] md:text-[13px] font-mono text-sx-text-dim"
          >
            {trustStats.map((stat, i) => (
              <span key={stat} className="flex items-center gap-2">
                {i > 0 && <span className="h-1 w-1 rounded-full bg-sx-border-light" />}
                {stat}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Social proof marquee */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="relative z-10 border-t border-sx-border py-5"
      >
        <MarqueeTicker speed={40} className="py-2">
          {marqueeItems}
        </MarqueeTicker>
      </motion.div>
    </section>
  );
}
