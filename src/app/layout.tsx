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
  metadataBase: new URL("https://stratifyx.com"),
  openGraph: {
    title: "StratifyX — Test Before You Trade",
    description:
      "Institutional-grade backtesting for Forex, Crypto & Futures.",
    type: "website",
    url: "https://stratifyx.com",
    siteName: "StratifyX",
  },
  twitter: {
    card: "summary_large_image",
    title: "StratifyX — Test Before You Trade",
    description:
      "Institutional-grade backtesting for Forex, Crypto & Futures.",
  },
  alternates: {
    canonical: "https://stratifyx.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "StratifyX",
              applicationCategory: "FinanceApplication",
              description:
                "Institutional-grade backtesting for Forex, Crypto & Futures",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} font-body bg-sx-bg text-sx-text`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-sx-accent focus:text-sx-bg focus:rounded-md focus:text-sm"
        >
          Skip to content
        </a>
        <CustomCursor />
        <NoiseOverlay />
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
