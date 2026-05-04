"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // Skip on touch devices
    if ("ontouchstart" in window) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let rafId: number;
    let mouseX = 0;
    let mouseY = 0;

    const move = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const update = () => {
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
      rafId = requestAnimationFrame(update);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.closest("input") ||
        target.closest("textarea");
      setHovering(!!isInteractive);
    };

    document.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", handleOver);
    rafId = requestAnimationFrame(update);

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor hidden lg:block ${hovering ? "hovering" : ""}`}
      aria-hidden="true"
    />
  );
}
