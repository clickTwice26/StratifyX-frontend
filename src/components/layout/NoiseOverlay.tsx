"use client";

import { useRef, useEffect } from "react";

export default function NoiseOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let frame = 0;
    let animationId: number;
    const canvasSize = 256;

    const resize = () => {
      canvas.width = canvasSize;
      canvas.height = canvasSize;
    };

    const drawGrain = () => {
      const imageData = ctx.createImageData(canvasSize, canvasSize);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = 18;
      }

      ctx.putImageData(imageData, 0, 0);
    };

    const loop = () => {
      if (frame % 3 === 0) {
        drawGrain();
      }
      frame++;
      animationId = requestAnimationFrame(loop);
    };

    resize();
    loop();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="noise-overlay"
      style={{ imageRendering: "pixelated" }}
      aria-hidden="true"
    />
  );
}
