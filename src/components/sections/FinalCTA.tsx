"use client";

import { motion } from "framer-motion";
import { Shield, Lock, FileCheck, ArrowRight } from "lucide-react";

const badges = [
  { icon: <Shield className="h-3.5 w-3.5" />, label: "SOC 2 Type II" },
  { icon: <Lock className="h-3.5 w-3.5" />, label: "256-bit Encryption" },
  { icon: <FileCheck className="h-3.5 w-3.5" />, label: "GDPR Compliant" },
];

export default function FinalCTA() {
  return (
    <section className="py-28 lg:py-36 border-t border-sx-border">
      <div className="mx-auto max-w-[600px] px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-h2 text-sx-text mb-3 leading-[1.1] tracking-[-0.03em] font-semibold"
        >
          Your edge starts here.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="text-[16px] text-sx-text-muted mb-8"
        >
          Join thousands of traders who test smarter.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <a
            href="#start"
            className="inline-flex items-center gap-2 h-12 px-8 rounded-full bg-white text-[#0A0A0A] text-[16px] font-medium tracking-extra-tight transition-colors duration-200 hover:bg-[#E0E0E0]"
          >
            Create Free Account
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-3 md:gap-5 mt-8 text-[11px] md:text-[12px] text-sx-text-dim font-mono"
        >
          {badges.map((b) => (
            <div key={b.label} className="flex items-center gap-1.5">
              <span className="text-sx-text-dim">{b.icon}</span>
              {b.label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
