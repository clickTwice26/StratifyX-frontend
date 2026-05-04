"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";

interface QueueItem {
  from: string;
  to: string;
  start: number;
  end: number;
}

const chars =
  "!@#$%^&*()_+-=[]{}|;:',.<>?/`~0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  onComplete?: () => void;
}

export default function TextScramble({
  text,
  className = "",
  delay = 600,
  speed = 30,
  onComplete,
}: TextScrambleProps) {
  const [display, setDisplay] = useState("");
  const frameRef = useRef(0);
  const queueRef = useRef<QueueItem[]>([]);
  const frameRequestRef = useRef<number>(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const oldText = display;
      const length = Math.max(oldText.length, text.length);
      queueRef.current = [];
      frameRef.current = 0;

      for (let i = 0; i < length; i++) {
        const from = oldText[i] || "";
        const to = text[i] || "";
        const start = Math.floor(Math.random() * 20);
        const end = start + Math.floor(Math.random() * 20);
        queueRef.current.push({ from, to, start, end });
      }

      const update = () => {
        let output = "";
        let complete = 0;

        for (let i = 0; i < queueRef.current.length; i++) {
          const { from, to, start, end } = queueRef.current[i];
          if (frameRef.current >= end) {
            complete++;
            output += to;
          } else if (frameRef.current >= start) {
            if (!from || Math.random() < 0.28) {
              output += chars[Math.floor(Math.random() * chars.length)];
            } else {
              output += from;
            }
          } else {
            output += from;
          }
        }

        setDisplay(output);
        frameRef.current++;

        if (complete < queueRef.current.length) {
          frameRequestRef.current = requestAnimationFrame(update);
        } else {
          onComplete?.();
        }
      };

      frameRequestRef.current = requestAnimationFrame(update);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frameRequestRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, delay, speed]);

  return <span className={className}>{display}</span>;
}
