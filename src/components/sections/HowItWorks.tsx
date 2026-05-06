"use client";

import { motion } from "framer-motion";
import { Database, Code2, Play, BarChart3 } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Upload or Connect Data",
    description: "Import historical data or connect to our tick-level feeds across 50+ instruments.",
    icon: <Database className="h-5 w-5" />,
  },
  {
    num: "02",
    title: "Define Your Strategy",
    description: "Write in Python or use our visual builder. Multi-timeframe, multi-instrument support.",
    icon: <Code2 className="h-5 w-5" />,
  },
  {
    num: "03",
    title: "Run the Backtest",
    description: "Execute across years of tick data in seconds with full slippage and spread modeling.",
    icon: <Play className="h-5 w-5" />,
  },
  {
    num: "04",
    title: "Analyze & Export",
    description: "Review equity curves, drawdowns, trade logs. Export as PDF or CSV.",
    icon: <BarChart3 className="h-5 w-5" />,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 lg:py-32 border-t border-sx-border">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="mb-14"
        >
          <span className="inline-block text-[12px] font-mono font-medium text-sx-accent uppercase tracking-wider mb-3">
            How It Works
          </span>
          <h2 className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-h2 text-sx-text leading-[1.1] tracking-[-0.03em] font-semibold">
            From data to edge in 4 steps
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-sx-border rounded-lg overflow-hidden">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="relative bg-sx-bg p-7 group hover:bg-sx-surface transition-colors duration-200"
            >
              {/* Ghost number */}
              <div className="absolute top-4 right-5 font-mono text-[40px] md:text-[52px] lg:text-[62px] font-bold text-sx-border leading-none select-none">
                {step.num}
              </div>

              <div className="relative z-10">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-sx-surface text-sx-text-muted mb-5 group-hover:text-sx-accent transition-colors duration-200">
                  {step.icon}
                </div>
                <h3 className="text-[16px] font-semibold text-sx-text mb-1.5 tracking-extra-tight">
                  {step.title}
                </h3>
                <p className="text-[14px] text-sx-text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
