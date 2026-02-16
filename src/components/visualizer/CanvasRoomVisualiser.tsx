'use client';

import React, { useRef, useEffect, useCallback, useState } from 'react';

const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;
const COLOR_TRANSITION_MS = 200;

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : { r: 255, g: 255, b: 255 };
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((x) => Math.round(x).toString(16).padStart(2, '0')).join('');
}

interface CanvasRoomVisualiserProps {
  imageSrc: string;
  wallPath: string;
  colorHex: string;
  roomLabel: string;
}

export default function CanvasRoomVisualiser({
  imageSrc,
  wallPath,
  colorHex,
  roomLabel,
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

    const scale = Math.max(CANVAS_WIDTH / imgWidth, CANVAS_HEIGHT / imgHeight);
    const drawWidth = imgWidth * scale;
    const drawHeight = imgHeight * scale;
    const x = (CANVAS_WIDTH - drawWidth) / 2;
    const y = (CANVAS_HEIGHT - drawHeight) / 2;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(img, x, y, drawWidth, drawHeight);

    const color = colorOverride ?? colorHex;
    if (wallPath && color) {
      ctx.save();
      try {
        const path = new Path2D(wallPath);
        ctx.clip(path);
        ctx.globalCompositeOperation = 'multiply';
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      } finally {
        ctx.restore();
      }
    }
  }, [imageSrc, wallPath, colorHex, loadState]);

  const drawRef = useRef(draw);
  useEffect(() => {
    drawRef.current = draw;
  }, [draw]);

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
  }, [draw, colorHex]);

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
