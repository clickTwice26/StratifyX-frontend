"use client";

import { useEffect, RefObject } from "react";
import { gsap } from "gsap";

let ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger | null = null;

export function useScrollTrigger(
  ref: RefObject<HTMLElement | null>,
  animation: (trigger: HTMLElement) => gsap.core.Timeline | gsap.core.Tween,
  deps: unknown[] = []
) {
  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;

    const init = async () => {
      if (!ScrollTrigger) {
        const mod = await import("gsap/ScrollTrigger");
        ScrollTrigger = mod.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);
      }

      const el = ref.current;
      if (!el) return;

      animation(el);
    };

    init();

    return () => {
      ScrollTrigger?.getAll().forEach((t) => t.kill());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export function useScrollTriggerBatch(
  selector: string,
  animation: (elements: Element[]) => gsap.core.Timeline | gsap.core.Tween,
  deps: unknown[] = []
) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const init = async () => {
      if (!ScrollTrigger) {
        const mod = await import("gsap/ScrollTrigger");
        ScrollTrigger = mod.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);
      }

      const elements: Element[] = gsap.utils.toArray(selector);
      if (elements.length === 0) return;

      animation(elements);
    };

    init();

    return () => {
      ScrollTrigger?.getAll().forEach((t) => t.kill());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
