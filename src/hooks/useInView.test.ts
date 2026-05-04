import { renderHook } from "@testing-library/react";
import { useInView } from "./useInView";

describe("useInView", () => {
  it("returns false initially with null ref", () => {
    const ref = { current: null };
    const { result } = renderHook(() => useInView(ref));
    expect(result.current).toBe(false);
  });

  it("accepts custom options", () => {
    const ref = { current: null };
    const { result } = renderHook(() =>
      useInView(ref, { threshold: 0.5, triggerOnce: false })
    );
    expect(result.current).toBe(false);
  });
});
