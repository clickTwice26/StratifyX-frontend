"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import { pricingTiers } from "@/data/pricing";

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="py-24 lg:py-32 border-t border-sx-border">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-12"
        >
          <span className="inline-block text-[12px] font-mono font-medium text-sx-accent uppercase tracking-wider mb-3">
            Pricing
          </span>
          <h2 className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-h2 text-sx-text mb-3 leading-[1.1] tracking-[-0.03em] font-semibold">
            Simple, transparent pricing
          </h2>
          <p className="text-[16px] text-sx-text-muted max-w-[400px] mx-auto mb-8">
            Start free, scale when ready.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-0.5 rounded-full border border-sx-border p-0.5">
            <button
              onClick={() => setAnnual(false)}
              aria-pressed={!annual}
              className={`px-4 py-1.5 rounded-full text-[14px] font-medium transition-colors duration-200 ${
                !annual ? "bg-white text-[#0A0A0A]" : "text-sx-text-muted hover:text-sx-text"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              aria-pressed={annual}
              className={`px-4 py-1.5 rounded-full text-[14px] font-medium transition-colors duration-200 ${
                annual ? "bg-white text-[#0A0A0A]" : "text-sx-text-muted hover:text-sx-text"
              }`}
            >
              Annually
              <span className="ml-1 text-sx-accent">-20%</span>
            </button>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-sx-border rounded-lg overflow-hidden max-w-[960px] mx-auto">
          {pricingTiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className={`relative bg-sx-bg p-7 flex flex-col ${
                tier.highlighted ? "ring-1 ring-sx-accent/30" : ""
              }`}
            >
              {tier.badge && (
                <div className="absolute top-4 right-5">
                  <span className="text-[11px] font-mono text-sx-accent uppercase tracking-wider">
                    {tier.badge}
                  </span>
                </div>
              )}

              <h3 className="text-[19px] font-semibold text-sx-text mb-1 tracking-extra-tight">
                {tier.name}
              </h3>

              <div className="mb-3">
                {tier.price.monthly !== null ? (
                  <div className="flex items-baseline gap-1">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={annual ? "a" : "m"}
                        initial={{ y: 6, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -6, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="text-[32px] sm:text-[36px] md:text-[40px] font-semibold text-sx-text tracking-extra-tight"
                      >
                        ${annual ? tier.price.annual : tier.price.monthly}
                      </motion.span>
                    </AnimatePresence>
                    <span className="text-[14px] text-sx-text-muted">/mo</span>
                  </div>
                ) : (
                  <div className="text-[32px] sm:text-[36px] md:text-[40px] font-semibold text-sx-text tracking-extra-tight">
                    Custom
                  </div>
                )}
              </div>

              <p className="text-[14px] text-sx-text-muted mb-5">{tier.description}</p>

              <ul className="space-y-2.5 mb-7 flex-1">
                {tier.features.map((f) => (
                  <li key={f.text} className="flex items-start gap-2 text-[14px]">
                    {f.included ? (
                      <Check className="h-3.5 w-3.5 text-sx-accent mt-0.5 flex-shrink-0" />
                    ) : (
                      <X className="h-3.5 w-3.5 text-sx-text-dim mt-0.5 flex-shrink-0" />
                    )}
                    <span className={f.included ? "text-sx-text-secondary" : "text-sx-text-dim"}>
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full h-11 rounded-full text-[14px] font-medium tracking-extra-tight transition-colors duration-200 ${
                  tier.highlighted
                    ? "bg-white text-[#0A0A0A] hover:bg-[#E0E0E0]"
                    : "border border-sx-border-light text-sx-text hover:border-sx-text-muted"
                }`}
              >
                {tier.cta}
              </button>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-[13px] text-sx-text-dim mt-6 font-mono">
          14-day free trial · No credit card required · Cancel anytime
        </p>
      </div>
    </section>
  );
}
