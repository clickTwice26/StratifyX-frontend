export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "What is backtesting and why does it matter?",
    answer:
      "Backtesting is the process of testing a trading strategy against historical data to see how it would have performed. It matters because it helps you validate your strategy before risking real capital — turning speculation into statistical confidence.",
  },
  {
    question: "How accurate is the historical data?",
    answer:
      "Our data is tick-level accurate, sourced directly from exchanges and liquidity providers. We maintain 99.99% data integrity with automated quality checks. Crypto data includes funding rates, and Forex data includes real bid-ask spreads from Tier-1 banks.",
  },
  {
    question: "Which brokers and exchanges are supported?",
    answer:
      "We support data from 50+ venues including Binance, CME Group, OANDA, Interactive Brokers, Bybit, Coinbase, Kraken, FXCM, and Deribit. We also support custom data imports via CSV or API for proprietary feeds.",
  },
  {
    question: "Can I test strategies with realistic execution?",
    answer:
      "Absolutely. Our execution simulator models slippage, spread, commission, and market impact. You can configure latency, order types (market, limit, stop), and partial fills to match your real trading environment.",
  },
  {
    question: "What programming languages can I use?",
    answer:
      "You can write strategies in Python using our SDK, or use our visual strategy builder for no-code backtesting. We also support importing strategies from popular frameworks like Backtrader and Zipline.",
  },
  {
    question: "How fast are the backtests?",
    answer:
      "Our optimized engine processes millions of ticks per second. A typical 1-year crypto backtest completes in under 2 seconds. Parameter optimization across 200+ combinations takes under 10 minutes.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes! The Free tier gives you permanent access with 5 instruments and 100 backtests/month. The Pro plan includes a 14-day free trial with full capabilities — no credit card required.",
  },
  {
    question: "How do I avoid overfitting my strategy?",
    answer:
      "StratifyX includes built-in walk-forward testing that automatically splits your data into in-sample and out-of-sample periods. This helps ensure your strategy performs on unseen data, not just the period it was optimized for.",
  },
];
