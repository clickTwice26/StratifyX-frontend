"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section className="py-24 lg:py-32 border-t border-sx-border">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="mb-14"
        >
          <span className="inline-block text-[11px] font-mono font-medium text-sx-accent uppercase tracking-wider mb-3">
            Testimonials
          </span>
          <h2 className="text-h2 text-sx-text">
            Trusted by serious traders
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-sx-border rounded-lg overflow-hidden">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="bg-sx-bg p-6 hover:bg-sx-surface transition-colors duration-200"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className={`h-3 w-3 ${j < t.rating ? "fill-sx-amber text-sx-amber" : "text-sx-border"}`}
                  />
                ))}
              </div>

              <p className="text-[13px] text-sx-text-secondary leading-relaxed mb-5">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sx-surface border border-sx-border text-[11px] font-mono text-sx-text-muted">
                  {t.initials}
                </div>
                <div>
                  <div className="text-[13px] font-medium text-sx-text">{t.name}</div>
                  <div className="text-[11px] text-sx-text-dim">{t.title}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
