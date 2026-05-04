"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, BarChart3 } from "lucide-react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Blog", href: "#blog" },
  { label: "Docs", href: "#docs" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 pt-3 border-b transition-colors duration-300 ${
        scrolled
          ? "border-sx-border bg-sx-bg/80 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-[1440px] px-5 lg:px-6">
        <div className="flex h-14 items-center">
          {/* Logo — left */}
          <a href="/" className="flex items-center gap-3 mr-14 flex-shrink-0 -ml-1">
            <BarChart3 className="h-7 w-7 text-sx-accent" />
            <span className="text-[22px] font-bold tracking-extra-tight text-sx-text">
              StratifyX
            </span>
          </a>

          {/* Nav links — center */}
          <div className="hidden md:flex items-center gap-1 flex-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-1.5 text-[16px] font-medium text-sx-text-muted transition-colors duration-200 hover:text-sx-text rounded-md"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side — Sign in + CTA */}
          <div className="hidden md:flex items-center gap-3 ml-auto">
            <a
              href="#signin"
              className="text-[16px] font-medium text-sx-text-muted transition-colors duration-200 hover:text-sx-text"
            >
              Sign In
            </a>
            <a
              href="#start"
              className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-white text-[#0A0A0A] text-[16px] font-medium tracking-extra-tight transition-colors duration-200 hover:bg-[#E0E0E0]"
            >
              Sign Up
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-md text-sx-text-muted hover:text-sx-text ml-auto"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden glass border-t border-sx-border overflow-hidden"
          >
            <div className="px-6 py-3 space-y-0.5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2.5 text-[14px] text-sx-text-muted hover:text-sx-text transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#signin"
                className="block py-2.5 text-[14px] text-sx-text-muted hover:text-sx-text transition-colors"
              >
                Sign In
              </a>
              <a
                href="#start"
                className="mt-3 block w-full rounded-full bg-white py-2.5 text-center text-[13px] font-medium text-[#0A0A0A]"
              >
                Sign Up
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
