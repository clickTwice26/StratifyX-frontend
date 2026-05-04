"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";

// Seeded PRNG (mulberry32) — produces identical sequences on server and client
// to avoid React 19 hydration mismatches caused by Math.random().
function createSeededRandom(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Generate a realistic-looking equity curve
function generateEquityCurveData(points: number = 80) {
  const random = createSeededRandom(42);
  const data: { x: number; y: number }[] = [];
  let equity = 10000;

  for (let i = 0; i < points; i++) {
    const trend = Math.sin(i / 10) * 0.003 + 0.0015;
    const noise = (random() - 0.48) * 200;
    equity = equity * (1 + trend) + noise;
    data.push({ x: i, y: equity });
  }

  return data;
}

// Generate buy/sell markers
function generateTradeMarkers(data: { x: number; y: number }[]) {
  const random = createSeededRandom(137);
  const markers: { x: number; y: number; type: "buy" | "sell" }[] = [];
  for (let i = 5; i < data.length - 5; i += Math.floor(random() * 8) + 5) {
    markers.push({
      x: data[i].x,
      y: data[i].y,
      type: random() > 0.5 ? "buy" : "sell",
    });
  }
  return markers;
}

interface EquityCurveProps {
  className?: string;
}

export default function EquityCurve({ className = "" }: EquityCurveProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.3 });

  // Use useState lazy initializer instead of useRef to avoid accessing refs during render
  const [data] = useState(generateEquityCurveData);
  const [markers] = useState(() => generateTradeMarkers(data));

  // Initialize drawProgress to 1 if user prefers reduced motion (avoids setState in effect)
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [drawProgress, setDrawProgress] = useState(prefersReducedMotion ? 1 : 0);
  const hasAnimated = useRef(false);

  const width = 500;
  const height = 200;
  const padding = { top: 10, right: 10, bottom: 10, left: 10 };

  const minY = Math.min(...data.map((d) => d.y));
  const maxY = Math.max(...data.map((d) => d.y));
  const rangeY = maxY - minY;

  const scaleX = (x: number) =>
    padding.left + (x / (data.length - 1)) * (width - padding.left - padding.right);
  const scaleY = (y: number) =>
    height - padding.bottom - ((y - minY) / rangeY) * (height - padding.top - padding.bottom);

  // SVG path
  const pathD = data
    .map((d, i) => `${i === 0 ? "M" : "L"} ${scaleX(d.x)} ${scaleY(d.y)}`)
    .join(" ");

  // Area path (for gradient fill under curve)
  const areaD =
    pathD +
    ` L ${scaleX(data[data.length - 1].x)} ${height - padding.bottom} L ${scaleX(0)} ${height - padding.bottom} Z`;

  // Animate draw on enter (reduced-motion already handled in useState initializer)
  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    let start: number;
    const duration = 2000;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDrawProgress(eased);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [inView]);

  return (
    <div ref={ref} className={className}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="equity-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--sx-accent)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--sx-accent)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="line-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--sx-accent)" />
            <stop offset="100%" stopColor="var(--sx-accent)" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map((pct) => (
          <line
            key={pct}
            x1={padding.left}
            y1={height * pct}
            x2={width - padding.right}
            y2={height * pct}
            stroke="var(--sx-border)"
            strokeWidth="0.5"
            strokeDasharray="4 4"
          />
        ))}

        {/* Area fill */}
        <path d={areaD} fill="url(#equity-gradient)" opacity={drawProgress} />

        {/* Main line */}
        <path
          d={pathD}
          fill="none"
          stroke="url(#line-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={`${drawProgress * 100}%`}
          strokeDashoffset="0"
          style={{ transition: "stroke-dasharray 0.05s linear" }}
        />

        {/* Trade markers */}
        {markers.map((marker, i) => {
          const markerProgress = marker.x / (data.length - 1);
          if (markerProgress > drawProgress) return null;

          return (
            <g key={i}>
              <circle
                cx={scaleX(marker.x)}
                cy={scaleY(marker.y)}
                r="4"
                fill={marker.type === "buy" ? "var(--sx-accent)" : "var(--sx-red)"}
                opacity="0.9"
              />
              <text
                x={scaleX(marker.x)}
                y={scaleY(marker.y) + (marker.type === "buy" ? 14 : -8)}
                textAnchor="middle"
                fill={marker.type === "buy" ? "var(--sx-accent)" : "var(--sx-red)"}
                fontSize="8"
                fontFamily="var(--font-mono)"
              >
                {marker.type === "buy" ? "▲" : "▼"}
              </text>
            </g>
          );
        })}

        {/* Live dot at the end */}
        {drawProgress > 0.95 && (
          <circle
            cx={scaleX(data[data.length - 1].x)}
            cy={scaleY(data[data.length - 1].y)}
            r="5"
            fill="var(--sx-accent)"
          >
            <animate
              attributeName="r"
              values="4;7;4"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
        )}
      </svg>
    </div>
  );
}
