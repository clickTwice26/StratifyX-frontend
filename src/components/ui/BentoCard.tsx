"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "tall" | "wide";
  glowColor?: string;
}

export default function BentoCard({
  children,
  className = "",
  size = "md",
  glowColor = "108, 71, 255",
}: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty("--glow-x", `${x}%`);
    cardRef.current.style.setProperty("--glow-y", `${y}%`);
  };

  const sizeClasses = {
    sm: "",
    md: "",
    lg: "md:col-span-2 md:row-span-2",
    tall: "md:row-span-2",
    wide: "md:col-span-2",
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`bento-card group relative overflow-hidden rounded-[20px] border border-sx-border bg-sx-card p-6 transition-all duration-300 hover:border-sx-violet/30 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3),0_0_30px_rgba(${glowColor},0.1)] ${sizeClasses[size]} ${className}`}
      style={{
        "--glow-x": "50%",
        "--glow-y": "50%",
        "--glow-color": glowColor,
      } as React.CSSProperties}
    >
      {/* Border glow effect */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(300px circle at var(--glow-x) var(--glow-y), rgba(${glowColor}, 0.15), transparent 60%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
