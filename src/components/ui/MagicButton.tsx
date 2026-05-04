"use client";

import React from "react";

interface MagicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  icon?: React.ReactNode;
  className?: string;
}

export default function MagicButton({
  children,
  variant = "primary",
  icon,
  className = "",
  ...props
}: MagicButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full text-[15px] font-medium tracking-extra-tight transition-colors duration-200 active:scale-[0.98] h-12 px-7";

  const variants = {
    primary:
      "bg-white text-[#0A0A0A] hover:bg-[#E0E0E0]",
    ghost:
      "border border-sx-border-light text-sx-text hover:border-sx-text-muted hover:text-sx-white",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
