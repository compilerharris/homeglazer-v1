'use client';

import React, { useRef, useEffect, useCallback, useState } from 'react';

const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;
const COLOR_TRANSITION_MS = 100;

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : { r: 255, g: 255, b: 255 };
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((x) => Math.round(x).toString(16).padStart(2, '0')).join('');
}

interface WallLayer {
  path: string;
  color: string;
}

interface CanvasRoomVisualiserProps {
  imageSrc: string;
  wallPath: string;
  colorHex: string;
  roomLabel: string;
  /** Optional: different color per wall layer. When provided, overrides wallPath + colorHex. */
  wallLayers?: WallLayer[];
}

export default function CanvasRoomVisualiser({
  imageSrc,
  wallPath,
  colorHex,
  roomLabel,
  wallLayers,
}: CanvasRoomVisualiserProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const prevColorRef = useRef<string | null>(null);
  const animationRef = useRef<number | null>(null);
  const [loadState, setLoadState] = useState<'loading' | 'loaded' | 'error'>('loading');

  const draw = useCallback((colorOverride?: string) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 3) : 1;

    // Use display size for buffer to avoid non-integer scaling (causes banding on mobile).
    const displayW = Math.max(rect.width, 1);
    const displayH = Math.max(rect.height, 1);
    canvas.width = Math.round(displayW * dpr);
    canvas.height = Math.round(displayH * dpr);
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // object-cover: uniform scale to fill, center crop (avoids squashing on tall/narrow viewports)
    const scale = Math.max(
      (displayW * dpr) / CANVAS_WIDTH,
      (displayH * dpr) / CANVAS_HEIGHT
    );
    const offsetX = (displayW * dpr - CANVAS_WIDTH * scale) / 2;
    const offsetY = (displayH * dpr - CANVAS_HEIGHT * scale) / 2;
    ctx.translate(offsetX / scale, offsetY / scale);
    ctx.scale(scale, scale);

    const img = imageRef.current;
    if (!img || !img.complete || img.naturalWidth === 0) {
      ctx.fillStyle = '#e5e7eb';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.fillStyle = '#6b7280';
      ctx.font = '16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(loadState === 'error' ? 'Image unavailable' : 'Loading...', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
      return;
    }

    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    const imgScale = Math.max(CANVAS_WIDTH / imgWidth, CANVAS_HEIGHT / imgHeight);
    const drawWidth = imgWidth * imgScale;
    const drawHeight = imgHeight * imgScale;
    const x = (CANVAS_WIDTH - drawWidth) / 2;
    const y = (CANVAS_HEIGHT - drawHeight) / 2;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(img, x, y, drawWidth, drawHeight);

    const layers =
      wallLayers?.length && !colorOverride
        ? wallLayers
        : wallPath && (colorOverride ?? colorHex)
          ? [{ path: wallPath, color: colorOverride ?? colorHex }]
          : [];

    for (const layer of layers) {
      const color = colorOverride ?? layer.color;
      if (!layer.path || !color) continue;
      ctx.save();
      try {
        const path = new Path2D(layer.path);
        ctx.clip(path);
        ctx.globalCompositeOperation = 'multiply';
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      } finally {
        ctx.restore();
      }
    }
  }, [imageSrc, wallPath, colorHex, wallLayers, loadState]);

  const drawRef = useRef(draw);
  useEffect(() => {
    drawRef.current = draw;
  }, [draw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ro = new ResizeObserver(() => drawRef.current());
    ro.observe(canvas);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    setLoadState('loading');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imageRef.current = img;
      setLoadState('loaded');
      prevColorRef.current = colorHex;
      drawRef.current();
    };
    img.onerror = () => {
      imageRef.current = null;
      setLoadState('error');
      drawRef.current();
    };
    img.src = imageSrc;

    return () => {
      imageRef.current = null;
    };
  }, [imageSrc]);

  useEffect(() => {
    // When using wallLayers, skip single-color animation and redraw immediately
    if (wallLayers?.length) {
      prevColorRef.current = colorHex;
      draw();
      return;
    }

    const prevColor = prevColorRef.current;
    if (prevColor === null || prevColor === colorHex) {
      prevColorRef.current = colorHex;
      draw(colorHex);
      return;
    }

    if (animationRef.current) cancelAnimationFrame(animationRef.current);

    const start = performance.now();
    const from = hexToRgb(prevColor);
    const to = hexToRgb(colorHex);

    const tick = () => {
      const elapsed = performance.now() - start;
      const t = Math.min(elapsed / COLOR_TRANSITION_MS, 1);
      const eased = t * (2 - t);
      const r = from.r + (to.r - from.r) * eased;
      const g = from.g + (to.g - from.g) * eased;
      const b = from.b + (to.b - from.b) * eased;
      draw(rgbToHex(r, g, b));

      if (t < 1) {
        animationRef.current = requestAnimationFrame(tick);
      } else {
        prevColorRef.current = colorHex;
        animationRef.current = null;
      }
    };

    animationRef.current = requestAnimationFrame(tick);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [draw, colorHex, wallLayers]);

  return (
    <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="w-full h-full object-cover"
        role="img"
        aria-label={`${roomLabel} room with wall color preview`}
        onContextMenu={(e) => e.preventDefault()}
    />
  );
}
