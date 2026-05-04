"use client";

import React from "react";

// Minimal SVG brand marks for each broker/exchange
export const BinanceLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
    <path d="M12 2L6.5 7.5 8.5 9.5 12 6l3.5 3.5 2-2L12 2zM2 12l2-2 2 2-2 2-2-2zm4.5 1.5L12 18l5.5-5.5-2-2L12 14l-3.5-3.5-2 2zM16 9.5l2-2L22 12l-2 2-2-2 2-2.5zM12 14l3.5 3.5 2-2L12 10l-5.5 5.5 2 2L12 14z" />
  </svg>
);

export const CMELogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
    <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
  </svg>
);

export const OANDALogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
    <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="1" />
  </svg>
);

export const BybitLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
    <path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z" />
  </svg>
);

export const IBLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
    <path d="M3 4h18v3H3V4zm2 5h2v11H5V9zm4 0h2v11H9V9zm4 0h2v7h4v4h-6V9z" />
  </svg>
);

export const CoinbaseLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5z" />
  </svg>
);

export const KrakenLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
    <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.18L18.36 8 12 11.82 5.64 8 12 4.18zM5 9.5l6.5 3.61v6.78L5 16.28V9.5zm8.5 10.39v-6.78L20 9.5v6.78l-6.5 3.61z" />
  </svg>
);

export const FXCMLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
    <path d="M3 4h4l3 6-3 6H3l3-6L3 4zm7 0h4l3 6-3 6h-4l3-6-3-6zm7 0h4l-3 6 3 6h-4l-3-6 3-6z" />
  </svg>
);

export const DeribitLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
    <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 3.46L18.54 9 12 12.54 5.46 9 12 5.46zM4 8.5l7.5 4.17v7.16L4 15.66V8.5zm9.5 11.33v-7.16L20 8.5v7.16l-6.5 4.17z" />
  </svg>
);

export const TDLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
    <path d="M4 4h16v3H13v13h-3V7H4V4z" />
  </svg>
);

export const logoMap: Record<string, React.FC> = {
  "Binance": BinanceLogo,
  "CME Group": CMELogo,
  "OANDA": OANDALogo,
  "Bybit": BybitLogo,
  "Interactive Brokers": IBLogo,
  "Coinbase": CoinbaseLogo,
  "Kraken": KrakenLogo,
  "FXCM": FXCMLogo,
  "Deribit": DeribitLogo,
  "TD Ameritrade": TDLogo,
};
