"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type GSAPContext = gsap.Context | null;

export function useGSAP(callback: (ctx: gsap.Context) => void, deps: unknown[] = []) {
  const ctxRef = useRef<GSAPContext>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    ctxRef.current = gsap.context(() => {
      callback(ctxRef.current!);
    });

    return () => {
      ctxRef.current?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ctxRef;
}
