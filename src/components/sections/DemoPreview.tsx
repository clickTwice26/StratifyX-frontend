"use client";

import { motion } from "framer-motion";
import { TrendingUp, Calendar } from "lucide-react";
import EquityCurve from "@/components/ui/EquityCurve";

const fakeTrades = [
  { id: 1, side: "BUY", entry: "67,234", exit: "68,102", pnl: "+1.29%", result: "win" },
  { id: 2, side: "SELL", entry: "68,450", exit: "67,890", pnl: "+0.82%", result: "win" },
  { id: 3, side: "BUY", entry: "66,120", exit: "65,890", pnl: "-0.35%", result: "loss" },
  { id: 4, side: "BUY", entry: "65,500", exit: "66,230", pnl: "+1.12%", result: "win" },
  { id: 5, side: "SELL", entry: "67,100", exit: "66,450", pnl: "+0.97%", result: "win" },
  { id: 6, side: "BUY", entry: "66,800", exit: "67,340", pnl: "+0.81%", result: "win" },
];

export default function DemoPreview() {
  return (
    <section className="py-24 lg:py-32 border-t border-sx-border">
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
            See It In Action
          </span>
          <h2 className="text-h2 text-sx-text">
            Your backtesting command center
          </h2>
        </motion.div>

        {/* Demo Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="rounded-lg border border-sx-border bg-sx-card overflow-hidden max-w-[1100px] mx-auto"
        >
          <div className="grid lg:grid-cols-[240px_1fr]">
            {/* Left panel */}
            <div className="border-r border-sx-border p-5 space-y-5 hidden lg:block">
              <div>
                <label className="text-[11px] font-mono text-sx-text-dim uppercase tracking-wider block mb-2">
                  Instrument
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {["BTCUSDT", "EURUSD", "ES1!"].map((inst, i) => (
                    <button
                      key={inst}
                      className={`px-2.5 py-1 rounded-md text-[12px] font-mono transition-colors ${
                        i === 0
                          ? "bg-sx-accent/10 text-sx-accent border border-sx-accent/20"
                          : "text-sx-text-muted border border-sx-border hover:border-sx-border-light"
                      }`}
                    >
                      {inst}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[11px] font-mono text-sx-text-dim uppercase tracking-wider block mb-2">
                  Date Range
                </label>
                <div className="flex items-center gap-2 rounded-md border border-sx-border px-3 py-2 text-[12px] font-mono text-sx-text-muted">
                  <Calendar className="h-3 w-3" />
                  Jan 2024 — Dec 2024
                </div>
              </div>
              <div>
                <label className="text-[11px] font-mono text-sx-text-dim uppercase tracking-wider block mb-2">
                  Strategy
                </label>
                {["EMA Crossover", "RSI Mean Reversion", "MACD Momentum"].map((s, i) => (
                  <div
                    key={s}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-[12px] font-mono ${
                      i === 0
                        ? "bg-sx-accent/5 text-sx-accent"
                        : "text-sx-text-muted hover:text-sx-text"
                    }`}
                  >
                    <div className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "bg-sx-accent" : "bg-sx-border"}`} />
                    {s}
                  </div>
                ))}
              </div>
            </div>

            {/* Right panel */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between px-5 py-3 border-b border-sx-border">
                <div className="flex items-center gap-3">
                  <span className="text-[14px] font-medium text-sx-text">Equity Curve</span>
                  <span className="text-[12px] font-mono text-sx-accent flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +24.7%
                  </span>
                </div>
                <div className="hidden md:flex gap-4 text-[11px] font-mono text-sx-text-dim">
                  <span>Sharpe: <span className="text-sx-text">2.34</span></span>
                  <span>Max DD: <span className="text-sx-red">-8.2%</span></span>
                </div>
              </div>
              <div className="p-4">
                <EquityCurve className="w-full h-44" />
              </div>
              <div className="border-t border-sx-border">
                <div className="px-5 py-2 text-[11px] font-mono text-sx-text-dim uppercase tracking-wider border-b border-sx-border/50">
                  Recent Trades
                </div>
                <table className="w-full">
                  <thead className="sr-only">
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Side</th>
                      <th scope="col">Entry</th>
                      <th scope="col">Exit</th>
                      <th scope="col">P&L</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fakeTrades.map((t, i) => (
                      <tr
                        key={t.id}
                        className={`text-[11px] font-mono ${i % 2 === 0 ? "bg-sx-surface/30" : ""}`}
                      >
                        <td className="px-5 py-2 text-sx-text-dim w-8">#{t.id}</td>
                        <td className={`py-2 text-[12px] ${t.side === "BUY" ? "text-sx-accent" : "text-sx-red"}`}>{t.side}</td>
                        <td className="py-2 text-[12px] text-sx-text-muted text-right pr-2">{t.entry}</td>
                        <td className="py-2 text-[12px] text-sx-text-muted text-right pr-2">{t.exit}</td>
                        <td className={`px-5 py-2 text-[12px] text-right font-medium ${t.result === "win" ? "text-sx-accent" : "text-sx-red"}`}>
                          {t.pnl}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
