export interface Feature {
  id: string;
  title: string;
  description: string;
  label: string;
  size: "sm" | "md" | "lg" | "tall" | "wide";
}

export const features: Feature[] = [
  {
    id: "multi-asset",
    title: "Multi-Asset Engine",
    description:
      "Backtest across 50+ instruments with tick-accurate historical data spanning Forex, Crypto, and Futures markets.",
    label: "Core",
    size: "lg",
  },
  {
    id: "strategy-builder",
    title: "Strategy Builder",
    description:
      "Define strategies in Python or our visual builder. No coding required for common patterns.",
    label: "Create",
    size: "tall",
  },
  {
    id: "analytics",
    title: "Performance Analytics",
    description:
      "Sharpe ratio, max drawdown, win rate, profit factor — all computed in real-time with professional-grade metrics.",
    label: "Analyze",
    size: "wide",
  },
  {
    id: "walk-forward",
    title: "Walk-Forward Testing",
    description:
      "In-sample / out-of-sample splits to validate strategy robustness and prevent overfitting.",
    label: "Validate",
    size: "md",
  },
  {
    id: "optimization",
    title: "Parameter Optimization",
    description:
      "Grid search and genetic algorithms to find optimal strategy parameters across multiple objectives.",
    label: "Optimize",
    size: "md",
  },
  {
    id: "execution",
    title: "Real-Time Execution Sim",
    description:
      "Slippage, spread, and commission modeling with realistic order book simulation for accurate results.",
    label: "Execute",
    size: "lg",
  },
];
