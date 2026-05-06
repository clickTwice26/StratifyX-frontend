"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const stats = [
  { value: 4200, suffix: "+", label: "Traders", decimals: 0 },
  { value: 12, suffix: "M+", label: "Backtests run", decimals: 0 },
  { value: 50, suffix: "+", label: "Instruments", decimals: 0 },
  { value: 99.97, suffix: "%", label: "Uptime", decimals: 2 },
  { value: 2, suffix: "ms", prefix: "< ", label: "Execution", decimals: 0 },
];

export default function Stats() {
  return (
    <section className="py-20 border-t border-sx-border">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="text-center lg:text-left"
            >
              <div className="text-[32px] sm:text-[40px] md:text-[50px] lg:text-stat text-sx-text mb-1 leading-[1] tracking-[-0.025em] lg:tracking-[-0.03em] font-semibold">
                <AnimatedCounter
                  end={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  decimals={stat.decimals}
                  duration={2}
                />
              </div>
              <p className="text-[13px] text-sx-text-dim font-mono uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
