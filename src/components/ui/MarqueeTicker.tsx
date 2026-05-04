"use client";

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
