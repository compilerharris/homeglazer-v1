'use client';

import React, { useRef, useEffect, useCallback, useState, forwardRef, useImperativeHandle } from 'react';

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

export interface CanvasAdvancedRoomVisualiserProps {
  imageSrc: string;
  wallMasks: Record<string, string>;
  assignments: Record<string, string>;
  loadingMasks?: boolean;
}

export interface CanvasAdvancedRoomVisualiserRef {
  toDataURL: (type?: string) => string | null;
  isReady: () => boolean;
}

const CanvasAdvancedRoomVisualiser = forwardRef<CanvasAdvancedRoomVisualiserRef, CanvasAdvancedRoomVisualiserProps>(
  function CanvasAdvancedRoomVisualiser({ imageSrc, wallMasks, assignments, loadingMasks = false }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const prevAssignmentsRef = useRef<Record<string, string> | null>(null);
    const animationRef = useRef<number | null>(null);
    const [loadState, setLoadState] = useState<'loading' | 'loaded' | 'error'>('loading');

    useImperativeHandle(ref, () => ({
      toDataURL: (type = 'image/png') => {
        const canvas = canvasRef.current;
        if (!canvas) {
          // #region agent log
          fetch('http://127.0.0.1:7242/ingest/21adcf91-15ca-4563-a889-6dc1018faf8e',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'ea0ce9'},body:JSON.stringify({sessionId:'ea0ce9',location:'CanvasAdvancedRoomVisualiser.tsx:41',message:'toDataURL called but canvas is null',data:{hasCanvas:!!canvas,loadState},timestamp:Date.now(),runId:'pdf-debug',hypothesisId:'I'})}).catch(()=>{});
          // #endregion
          return null;
        }
        
        // Ensure image is loaded before capturing (critical for production S3 images)
        if (loadState !== 'loaded' || !imageRef.current || !imageRef.current.complete) {
          // #region agent log
          fetch('http://127.0.0.1:7242/ingest/21adcf91-15ca-4563-a889-6dc1018faf8e',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'ea0ce9'},body:JSON.stringify({sessionId:'ea0ce9',location:'CanvasAdvancedRoomVisualiser.tsx:45',message:'Canvas not ready for capture',data:{loadState,hasImageRef:!!imageRef.current,imageComplete:imageRef.current?.complete,imageNaturalWidth:imageRef.current?.naturalWidth},timestamp:Date.now(),runId:'pdf-debug',hypothesisId:'I'})}).catch(()=>{});
          // #endregion
          console.warn('[CanvasAdvancedRoomVisualiser] Canvas not ready for capture:', { loadState, hasImage: !!imageRef.current, imageComplete: imageRef.current?.complete });
          return null;
        }
        
        try {
          const dataUrl = canvas.toDataURL(type);
          // #region agent log
          fetch('http://127.0.0.1:7242/ingest/21adcf91-15ca-4563-a889-6dc1018faf8e',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'ea0ce9'},body:JSON.stringify({sessionId:'ea0ce9',location:'CanvasAdvancedRoomVisualiser.tsx:52',message:'toDataURL succeeded',data:{hasDataUrl:!!dataUrl,dataUrlLength:dataUrl?.length || 0,loadState,hasImageRef:!!imageRef.current,imageComplete:imageRef.current?.complete},timestamp:Date.now(),runId:'pdf-debug',hypothesisId:'I'})}).catch(()=>{});
          // #endregion
          return dataUrl;
        } catch (err) {
          // #region agent log
          fetch('http://127.0.0.1:7242/ingest/21adcf91-15ca-4563-a889-6dc1018faf8e',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'ea0ce9'},body:JSON.stringify({sessionId:'ea0ce9',location:'CanvasAdvancedRoomVisualiser.tsx:55',message:'toDataURL failed',data:{error:err?.toString(),errorMessage:err instanceof Error ? err.message : String(err),loadState,hasImageRef:!!imageRef.current,imageSrc},timestamp:Date.now(),runId:'pdf-debug',hypothesisId:'J'})}).catch(()=>{});
          // #endregion
          console.error('[CanvasAdvancedRoomVisualiser] toDataURL error:', err);
          return null;
        }
      },
      isReady: () => {
        return loadState === 'loaded' && !!imageRef.current && imageRef.current.complete;
      },
    }), [loadState, imageSrc]);

    const draw = useCallback((assignmentsOverride?: Record<string, string>) => {
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

      const currentAssignments = assignmentsOverride ?? assignments;
      const wallKeys = Object.keys(wallMasks);

      for (const wallKey of wallKeys) {
        const pathData = wallMasks[wallKey];
        const color = currentAssignments[wallKey];
        if (!pathData || !color) continue;

        ctx.save();
        try {
          const path = new Path2D(pathData);
          ctx.clip(path);
          ctx.globalCompositeOperation = 'multiply';
          ctx.globalAlpha = 0.7;
          ctx.fillStyle = color;
          ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        } finally {
          ctx.restore();
        }
      }
    }, [imageSrc, wallMasks, assignments, loadState]);

    const drawRef = useRef(draw);
    useEffect(() => {
      drawRef.current = draw;
    }, [draw]);

    useEffect(() => {
      setLoadState('loading');
      console.log('[CanvasAdvancedRoomVisualiser] Loading image:', imageSrc);
      
      const isCrossOrigin = imageSrc.startsWith('http://') || imageSrc.startsWith('https://');
      
      // Try loading with crossOrigin first for cross-origin images (S3)
      // If that fails, we'll retry without crossOrigin as fallback
      const attemptLoad = (useCrossOrigin: boolean) => {
        const img = new Image();
        
        if (useCrossOrigin && isCrossOrigin) {
          img.crossOrigin = 'anonymous';
        }
        
        img.onload = () => {
          console.log('[CanvasAdvancedRoomVisualiser] Image loaded successfully:', imageSrc, 'crossOrigin:', img.crossOrigin);
          imageRef.current = img;
          setLoadState('loaded');
          prevAssignmentsRef.current = { ...assignments };
          drawRef.current();
        };
        
        img.onerror = (error) => {
          console.error('[CanvasAdvancedRoomVisualiser] Failed to load image:', imageSrc, 'crossOrigin:', img.crossOrigin, 'useCrossOrigin:', useCrossOrigin);
          
          // If we tried with crossOrigin and it failed, retry without it (fallback for misconfigured CORS)
          if (useCrossOrigin && isCrossOrigin) {
            console.log('[CanvasAdvancedRoomVisualiser] Retrying without crossOrigin as fallback...');
            attemptLoad(false);
          } else {
            // Final failure
            console.error('[CanvasAdvancedRoomVisualiser] Final error details:', {
              imageSrc,
              error,
              crossOrigin: img.crossOrigin,
              naturalWidth: img.naturalWidth,
              naturalHeight: img.naturalHeight,
            });
            imageRef.current = null;
            setLoadState('error');
            drawRef.current();
          }
        };
        
        img.src = imageSrc;
      };
      
      // Start with crossOrigin for cross-origin images, without for same-origin
      attemptLoad(isCrossOrigin);

      return () => {
        imageRef.current = null;
      };
    }, [imageSrc]);

    useEffect(() => {
      const prev = prevAssignmentsRef.current;
      const wallKeys = Object.keys(wallMasks);

      const needsTransition = prev && wallKeys.some((k) => prev[k] !== assignments[k]);

      if (!needsTransition) {
        prevAssignmentsRef.current = { ...assignments };
        draw(assignments);
        return;
      }

      if (animationRef.current) cancelAnimationFrame(animationRef.current);

      const start = performance.now();
      const prevAssignments = prev ?? assignments;

      const tick = () => {
        const elapsed = performance.now() - start;
        const t = Math.min(elapsed / COLOR_TRANSITION_MS, 1);
        const eased = t * (2 - t);

        const interpolated: Record<string, string> = {};
        for (const wallKey of wallKeys) {
          const fromHex = prevAssignments[wallKey];
          const toHex = assignments[wallKey];
          if (!toHex) continue;
          if (!fromHex || fromHex === toHex) {
            interpolated[wallKey] = toHex;
            continue;
          }
          const from = hexToRgb(fromHex);
          const to = hexToRgb(toHex);
          const r = from.r + (to.r - from.r) * eased;
          const g = from.g + (to.g - from.g) * eased;
          const b = from.b + (to.b - from.b) * eased;
          interpolated[wallKey] = rgbToHex(r, g, b);
        }

        draw(interpolated);

        if (t < 1) {
          animationRef.current = requestAnimationFrame(tick);
        } else {
          prevAssignmentsRef.current = { ...assignments };
          animationRef.current = null;
        }
      };

      animationRef.current = requestAnimationFrame(tick);
      return () => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
      };
    }, [draw, assignments, wallMasks]);

    return (
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="absolute inset-0 w-full h-full object-cover"
        role="img"
        aria-label="Room preview with wall colours"
        onContextMenu={(e) => e.preventDefault()}
      />
    );
  }
);

export default CanvasAdvancedRoomVisualiser;
