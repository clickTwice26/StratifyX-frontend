"use client";

import MarqueeTicker from "@/components/ui/MarqueeTicker";
import { brokerLogos } from "@/data/testimonials";

export default function SocialProof() {
  const items = brokerLogos.map((logo) => (
    <div
      key={logo}
      className="flex items-center gap-2 px-5 text-[13px] font-medium text-sx-text-dim whitespace-nowrap"
    >
      <div className="h-5 w-5 rounded bg-sx-surface border border-sx-border flex items-center justify-center text-[9px] font-mono text-sx-text-muted">
        {logo.charAt(0)}
      </div>
      {logo}
    </div>
  ));

  return (
    <section className="py-5 border-y border-sx-border">
      <MarqueeTicker speed={35} className="py-1">
        {items}
      </MarqueeTicker>
    </section>
  );
}
