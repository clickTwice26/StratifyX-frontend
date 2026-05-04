import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NoiseOverlay from "@/components/layout/NoiseOverlay";
import CustomCursor from "@/components/ui/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "StratifyX — Test Before You Trade",
  description:
    "Institutional-grade backtesting for Forex, Crypto & Futures. Test your strategies with tick-accurate historical data before risking real capital.",
  keywords: [
    "backtesting",
    "forex",
    "crypto",
    "futures",
    "trading",
    "strategy testing",
    "quantitative trading",
  ],
  openGraph: {
    title: "StratifyX — Test Before You Trade",
    description:
      "Institutional-grade backtesting for Forex, Crypto & Futures.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-body bg-sx-bg text-sx-text`}>
        <CustomCursor />
        <NoiseOverlay />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
