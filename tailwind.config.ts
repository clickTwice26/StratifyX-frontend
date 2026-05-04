import type { Config } from "tailwindcss"

const config = {
  darkMode: "class",
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        sx: {
          bg:             '#0A0A0A',
          surface:        '#111111',
          card:           '#141414',
          'card-hover':   '#1A1A1A',
          border:         '#1E1E1E',
          'border-light': '#2A2A2A',
          'border-hover': '#333333',
          accent:         '#2DD4A8',
          'accent-dim':   '#1A8A6A',
          'accent-subtle':'rgba(45, 212, 168, 0.08)',
          white:          '#FFFFFF',
          red:            '#EB5246',
          amber:          '#F5A623',
          text:           '#EDEDEF',
          'text-secondary':'#94949E',
          'text-muted':   '#8E8E99',
          'text-dim':     '#7A7A85',
        },
        border: "var(--sx-border)",
        input: "var(--sx-border)",
        ring: "var(--sx-accent)",
        background: "var(--sx-bg)",
        foreground: "var(--sx-text)",
        primary: {
          DEFAULT: "var(--sx-accent)",
          foreground: "#0A0A0A",
        },
        secondary: {
          DEFAULT: "var(--sx-surface)",
          foreground: "var(--sx-text)",
        },
        muted: {
          DEFAULT: "var(--sx-surface)",
          foreground: "var(--sx-text-muted)",
        },
        accent: {
          DEFAULT: "var(--sx-accent)",
          foreground: "#0A0A0A",
        },
        card: {
          DEFAULT: "var(--sx-card)",
          foreground: "var(--sx-text)",
        },
      },
      fontFamily: {
        heading: ['Inter', '-apple-system', 'system-ui', 'sans-serif'],
        body:    ['Inter', '-apple-system', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'SF Mono', 'Consolas', 'monospace'],
      },
      fontSize: {
        'hero':  ['80px', { lineHeight: '1.05', letterSpacing: '-0.035em', fontWeight: '600' }],
        'h2':    ['54px', { lineHeight: '1.1',  letterSpacing: '-0.03em',  fontWeight: '600' }],
        'h3':    ['32px', { lineHeight: '1.2',  letterSpacing: '-0.02em',  fontWeight: '500' }],
        'stat':  ['62px', { lineHeight: '1',    letterSpacing: '-0.03em',  fontWeight: '600' }],
      },
      borderRadius: {
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        pill: "9999px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards",
      },
      letterSpacing: {
        'extra-tight': '-0.03em',
        'snug': '-0.01em',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
