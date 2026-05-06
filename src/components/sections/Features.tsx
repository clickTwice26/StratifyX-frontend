"use client";

import { motion } from "framer-motion";
import { Globe, Code2, BarChart3, GitBranch, Grid3X3, Activity } from "lucide-react";
import { features } from "@/data/features";

const iconMap: Record<string, React.ReactNode> = {
  "multi-asset": <Globe className="h-4 w-4" />,
  "strategy-builder": <Code2 className="h-4 w-4" />,
  analytics: <BarChart3 className="h-4 w-4" />,
  "walk-forward": <GitBranch className="h-4 w-4" />,
  optimization: <Grid3X3 className="h-4 w-4" />,
  execution: <Activity className="h-4 w-4" />,
};

export default function Features() {
  return (
    <section id="features" className="py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="mb-14"
        >
          <span className="inline-block text-[12px] font-mono font-medium text-sx-accent uppercase tracking-wider mb-3">
            Features
          </span>
          <h2 className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-h2 text-sx-text mb-3 leading-[1.1] tracking-[-0.03em] font-semibold">
            Everything you need to test smarter
          </h2>
          <p className="text-[16px] text-sx-text-muted max-w-[480px]">
            From data ingestion to performance analytics — a complete backtesting toolkit.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-sx-border rounded-lg overflow-hidden">
          {features.map((feature, i) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className={`group bg-sx-bg p-7 transition-colors duration-200 hover:bg-sx-surface ${
                feature.size === "lg" ? "lg:col-span-2" : ""
              } ${feature.size === "wide" ? "lg:col-span-2" : ""}`}
            >
              <div className="flex items-center gap-2.5 mb-4">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-sx-surface text-sx-text-muted group-hover:text-sx-accent transition-colors duration-200">
                  {iconMap[feature.id]}
                </div>
                <span className="text-[12px] font-mono text-sx-text-dim uppercase tracking-wider">
                  {feature.label}
                </span>
              </div>
              <h3 className="text-[17px] font-semibold text-sx-text mb-1.5 tracking-extra-tight">
                {feature.title}
              </h3>
              <p className="text-[14px] text-sx-text-muted leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
